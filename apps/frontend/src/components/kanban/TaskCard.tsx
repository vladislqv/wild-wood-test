import { useState, useEffect } from 'react';
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, Clock, ChevronDown, ChevronUp, EuroIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnId } from "./KanbanBoard";
import { Separator } from "@/components/ui/separator";
import { GetOrdersReturnType } from "@/types";

// Константы для временных рамок (в минутах)
const TIME_THRESHOLDS = {
  recent: 5,
  warning: 15
};

// Константы для цветовых кодов
const COLOR_CODES = {
  recent: '#e6ffee',  // светло-зеленый
  warning: '#fff9e6', // светло-желтый
  danger: '#ffe6e6'   // светло-красный
};

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: GetOrdersReturnType & { createdAt: string };
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

const getTimeAgo = (createdAt: string): { time: string; status: 'recent' | 'warning' | 'danger' } => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));

  if (diffInMinutes < TIME_THRESHOLDS.recent) {
    return { time: `${diffInMinutes} min ago`, status: 'recent' };
  } else if (diffInMinutes < TIME_THRESHOLDS.warning) {
    return { time: `${diffInMinutes} min ago`, status: 'warning' };
  } else {
    return { time: `${diffInMinutes} min ago`, status: 'danger' };
  }
};

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const [timeInfo, setTimeInfo] = useState(getTimeAgo(task.content.createdAt));
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getTimeAgo(task.content.createdAt));
    }, 60000); // Обновление каждую минуту

    return () => clearInterval(timer);
  }, [task.content.createdAt]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition: `${transition}, background-color 0.3s ease`,
    transform: CSS.Translate.toString(transform),
    backgroundColor: COLOR_CODES[timeInfo.status],
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  const { id, items, total, status, tableNumber } = task.content;

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 flex flex-row items-center justify-between border-b border-border">
        <CardTitle className="text-lg font-semibold">Order #{id}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className='text-xs' variant={status === 'Preparing' ? "outline" : status === 'Ready' ? "default" : 'secondary'}>
            {status}
          </Badge>
          <Button
            variant="ghost"
            {...attributes}
            {...listeners}
            className="p-1 text-muted-foreground h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Positions:</h4>
          <ul className="list-disc list-inside text-sm">
            {(showAllItems ? items : items.slice(0, 3)).map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="truncate">{item.name}</span>
                <span className="text-muted-foreground ml-2">x{item.quantity || 1}</span>
              </li>
            ))}
            {items.length > 3 && !showAllItems && (
              <li
                className="text-muted-foreground cursor-pointer flex items-center"
                onClick={toggleShowAllItems}
              >
                ...and {items.length - 3} more
                <ChevronDown className="h-4 w-4 ml-1" />
              </li>
            )}
            {showAllItems && (
              <li
                className="text-muted-foreground cursor-pointer flex items-center"
                onClick={toggleShowAllItems}
              >
                Show less
                <ChevronUp className="h-4 w-4 ml-1" />
              </li>
            )}
          </ul>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Table: {tableNumber}</h4>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timeInfo.time}</span>
          </div>
          <div className="flex items-center space-x-1 font-semibold">
            <EuroIcon className="h-4 w-4" />
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}