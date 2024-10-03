import { useAppStore } from "@/store/appStore";
import { getTotalPrice, useCartStore } from "@/store/cart";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";


export function Cart() {
    const { t } = useTranslation();
    const cartItems = useCartStore((state) => state.items);
    const setCartItems = useCartStore((state) => state.setCartItems);
    const setShowConfirmation = useAppStore((state) => state.setShowConfirmation);

    const updateQuantity = (id: number, increment: number): void => {
        setCartItems(
            cartItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + increment) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const handleMakeOrder = (): void => {
        setShowConfirmation(true);
    };

    return (
        <div className="md:sticky top-0 self-start">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('yourCart')}</h2>
            {cartItems.length === 0 ? (
                <p className="text-white">{t('cartEmpty')}</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <motion.div
                            key={item.id}
                            className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <span className="font-medium text-green-800">{item.name}</span>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-200 rounded text-green-800">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-green-800">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-200 rounded text-green-800">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <span className="w-20 text-right text-green-800">${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => updateQuantity(item.id, -item.quantity)} className="p-1 bg-red-200 rounded text-red-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    <div className="text-xl font-bold text-right text-white">
                        {t('total')}: ${getTotalPrice().toFixed(2)}
                    </div>
                    <button
                        className="w-full bg-white text-green-800 py-2 rounded-md hover:bg-gray-200 transition duration-300 font-bold"
                        onClick={handleMakeOrder}
                    >
                        {t('placeOrder')}
                    </button>
                </div>
            )}
        </div>
    )
}