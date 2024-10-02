import { useMemo, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task, TaskCard } from "./TaskCard";
import type { Column } from "./BoardColumn";
import { hasDraggableData } from "./utils";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import useSWR from 'swr';
import { GetOrdersReturnType } from "@/types"; // Импортируйте ваш интерфейс Order
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "@/utils/env";

const defaultCols = [
  {
    id: "Accepted" as const,
    title: "Accepted",
  },
  {
    id: "Preparing" as const,
    title: "Preparing",
  },
  {
    id: "Ready" as const,
    title: "Ready",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

type OrderStatus = 'Accepted' | 'Preparing' | 'Ready';

export function KanbanBoard() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const [columns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data: ordersData } = useSWR<GetOrdersReturnType[]>(`http://localhost:3000/orders/${locale}`, fetcher, {
    refreshInterval: 5000,
  });

  // Преобразуем заказы в задачи и мемоизируем результат
  const tasks = useMemo(() => {
    if (!ordersData) return [];
    return ordersData.map(order => ({
      id: order.id.toString(),
      columnId: order.status as ColumnId,
      content: order,
    })) as Task[];
  }, [ordersData]);

  // Локальное состояние задач для перетаскивания
  const [tasksState, setTasksState] = useState<Task[]>([]);

  // Обновляем tasksState при изменении tasks
  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  // Предотвращаем бесконечные перерендеры, мемоизируя tasksIds
  useMemo(() => tasksState.map(task => task.id), [tasksState]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: coordinateGetter,
    // })
  );

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasksState.filter((task) => task.columnId === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${startColumnIdx + 1
          } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.columnId;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${active.data.current.task.content
          } at position: ${taskPosition + 1} of ${tasksInColumn.length
          } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${over.data.current.column.title
          } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task ${active.data.current.task.content
            } was moved over column ${column?.title} in position ${taskPosition + 1
            } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${tasksInColumn.length
          } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${active.data.current.column.title
          } was dropped into position ${overColumnPosition + 1} of ${columnsId.length
          }`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${taskPosition + 1
            } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${tasksInColumn.length
          } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasksState.filter((task) => task.columnId === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasksState.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeId === overId) return;

    const isActiveATask = activeData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      const newColumnId = overId as ColumnId;
      const updatedTasks = tasksState.map((task) => {
        if (task.id === activeId) {
          const updatedTask = { ...task, columnId: newColumnId };
          // Обновляем статус заказа на бэкенде
          updateOrderStatus(Number(task.id), newColumnId);
          return updatedTask;
        }
        return task;
      });
      setTasksState(updatedTasks);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Перетаскиваем задачу поверх другой задачи
    if (isActiveATask && isOverATask) {
      setTasksState((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.columnId !== overTask.columnId
        ) {
          const updatedTask = { ...activeTask, columnId: overTask.columnId };
          // Обновляем статус заказа на бэкенде
          updateOrderStatus(Number(activeTask.id), overTask.columnId);
          const newTasks = [...tasks];
          newTasks[activeIndex] = updatedTask;
          return arrayMove(newTasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Перетаскиваем задачу поверх колонки
    if (isActiveATask && isOverAColumn) {
      setTasksState((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          const updatedTask = { ...activeTask, columnId: overId as ColumnId };
          // Обновляем статус заказа на бэкенде
          updateOrderStatus(Number(activeTask.id), overId as OrderStatus);
          const newTasks = [...tasks];
          newTasks[activeIndex] = updatedTask;
          return newTasks;
        }
        return tasks;
      });
    }
  }

  async function updateOrderStatus(orderId: number, newStatus: OrderStatus) {
    try {
      await fetch(`${BACKEND_URL}/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
    }
  }
}
