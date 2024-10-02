import { Order } from "@/types";
import { BACKEND_URL } from "@/utils/env";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from 'swr';

export default function Orders() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data: ordersData, error, isLoading } = useSWR(`${BACKEND_URL}/orders/${locale}`, fetcher, {
        refreshInterval: 5000, // обновление каждые 5 секунд
    });

    const mapOrders = (ordersFromBackend: any[]): Order[] => {
        return ordersFromBackend.map(order => ({
            id: order.id,
            items: order.items.map((item: any) => `${item.name} x${item.quantity}`),
            total: order.total,
            status: order.status,
            estimatedTime: order.estimatedTime,
            comment: order.comment,
        }));
    };

    // Преобразуем данные и мемоизируем результат
    const orders = useMemo(() => {
        return ordersData ? mapOrders(ordersData) : [];
    }, [ordersData]);

    // Локальное состояние для сортировки
    const [sortedOrders, setSortedOrders] = useState<Order[]>([]);

    // Обновляем sortedOrders при изменении orders
    useEffect(() => {
        setSortedOrders(orders);
    }, [orders]);

    const sortOrders = (criteria: 'date' | 'status'): void => {
        const sorted = [...sortedOrders];
        if (criteria === 'date') {
            sorted.sort((a, b) => b.id - a.id);
        } else if (criteria === 'status') {
            const statusOrder: { [key: string]: number } = { 'Accepted': 0, 'Preparing': 1, 'Ready': 2 };
            sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        }
        setSortedOrders(sorted);
    };

    if (isLoading) return <p>{t('loading')}</p>;
    if (error) return <p>{t('errorLoadingOrders')}</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">{t('myOrders')}</h2>
            <div className="mb-6">
                <button onClick={() => sortOrders('date')} className="mr-4 px-4 py-2 bg-white text-green-800 rounded-md hover:bg-gray-200 transition duration-300">
                    {t('sortByDate')}
                </button>
                <button onClick={() => sortOrders('status')} className="px-4 py-2 bg-white text-green-800 rounded-md hover:bg-gray-200 transition duration-300">
                    {t('sortByStatus')}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedOrders.map(order => (
                    <motion.div
                        key={order.id}
                        className="bg-white bg-opacity-90 rounded-lg shadow-md p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="font-bold text-xl mb-2 text-green-800">{t('order')} #{order.id}</div>
                        <div className="text-gray-700 mb-2">{t('items')}: {order.items.join(', ')}</div>
                        <div className="text-gray-700 mb-4">{t('total')}: €{order.total.toFixed(2)}</div>
                        <div className="mb-2">
                            {t('status')}:
                            <span className={`ml-2 px-3 py-1 rounded-full text-white ${order.status === 'Accepted' ? 'bg-yellow-500' :
                                order.status === 'Preparing' ? 'bg-blue-500' :
                                    'bg-green-500'
                                }`}>
                                {t(order.status.toLowerCase())}
                            </span>
                        </div>
                        {order.status === 'Preparing' && order.estimatedTime && (
                            <div className="text-gray-700">
                                {t('estimatedTime')}: {order.estimatedTime} {t('minutes')}
                            </div>
                        )}
                        {order.comment && (
                            <div className="mt-4">
                                <strong className="text-green-800">{t('comment')}:</strong> {order.comment}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
