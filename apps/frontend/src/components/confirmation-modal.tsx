import { useAppStore } from "@/store/appStore";
import { getTotalPrice, useCartStore } from "@/store/cart";
import { BACKEND_URL } from "@/utils/env";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSWRMutation from 'swr/mutation';

interface CreateOrderDto {
    items: {
        productId: number;
        quantity: number;
    }[];
    total: number;
    comment: string;
}

const fetcher = async (url: string, { arg }: { arg: CreateOrderDto }) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });
};

export default function ConfirmationModal() {
    const { t } = useTranslation();
    const cartItems = useCartStore((state) => state.items);
    const showConfirmation = useAppStore((state) => state.showConfirmation);
    const setShowConfirmation = useAppStore((state) => state.setShowConfirmation);
    const orderComment = useAppStore((state) => state.orderComment);
    const setOrderComment = useAppStore((state) => state.setOrderComment);

    const setCartItems = useCartStore((state) => state.setCartItems);

    const navigate = useNavigate();

    const { trigger, isMutating, error } = useSWRMutation(
        `${BACKEND_URL}/orders`,
        fetcher,
    );

    const confirmOrder = async (): Promise<void> => {
        try {
            const orderData: CreateOrderDto = {
                items: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                total: getTotalPrice(),
                comment: orderComment,
            };

            await trigger(orderData);

            setCartItems([]);
            setShowConfirmation(false);
            setOrderComment('');

            navigate('/orders');
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
        }
    };

    return (
        <AnimatePresence>
            {showConfirmation && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white p-8 rounded-lg max-w-md w-full"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-800">{t('confirmOrder')}</h3>
                        <p className="mb-4 text-gray-700">{t('total')}: €{getTotalPrice().toFixed(2)}</p>
                        <p className="mb-2 text-gray-700">{t('items')}:</p>
                        <ul className="list-disc list-inside mb-6 text-gray-700">
                            {cartItems.map(item => (
                                <li key={item.id}>{item.name} x{item.quantity}</li>
                            ))}
                        </ul>
                        <div className="mb-6">
                            <label htmlFor="orderComment" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('addComment')}:
                            </label>
                            <textarea
                                id="orderComment"
                                rows={3}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={orderComment}
                                onChange={(e) => setOrderComment(e.target.value)}
                                placeholder={t('commentPlaceholder')}
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition duration-300"
                                onClick={() => {
                                    setShowConfirmation(false);
                                    setOrderComment('');
                                }}
                            >
                                {t('cancel')}
                            </button>
                            <button
                                className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition duration-300"
                                onClick={confirmOrder}
                                disabled={isMutating}
                            >
                                {isMutating ? t('processing') : t('confirm')}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 mt-4">{t('orderError')}</p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
