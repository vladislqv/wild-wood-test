import { useCartStore } from "@/store/cart";
import { Category, FoodItem } from "@/types";
import { motion } from "framer-motion";
import { Bean, Egg, Leaf, Milk, Nut, Utensils, Wheat } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cart } from "./cart";
import useSWR from "swr";
import { BACKEND_URL } from "@/utils/env";

const AllergenIcon = ({ type }: { type: string }) => {
    const iconStyle = "w-6 h-6 text-white bg-green-800 rounded-full p-1";

    switch (type) {
        case 'egg':
            return <Egg className={iconStyle} />;
        case 'nuts':
            return <Nut className={iconStyle} />;
        case 'milk':
            return <Milk className={iconStyle} />;
        case 'vegan':
            return <Leaf className={iconStyle} />;
        case 'gluten':
            return <Wheat className={iconStyle} />;
        case 'soy':
            return <Bean className={iconStyle} />;
        default:
            return null;
    }
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Menu() {
    const locale = useTranslation().i18n.language;
    const { data, error, isLoading } = useSWR<(FoodItem & { category: { name: string } })[]>(`${BACKEND_URL}/products/${locale}`, fetcher);

    const addToCart = useCartStore((state) => state.addToCart);

    const { t } = useTranslation();

    const [activeCategory, setActiveCategory] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredData, setFilteredData] = useState<typeof data>([]);

    // Обновляем категории и устанавливаем активную категорию при получении данных
    useEffect(() => {
        if (data) {
            const uniqueCategories = data
                .map((item) => item.category.name)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((name) => ({ name, icon: Utensils }));

            setCategories(uniqueCategories);

            // Устанавливаем первую категорию как активную
            if (uniqueCategories.length > 0 && activeCategory === '') {
                setActiveCategory(uniqueCategories[0].name);
            }
        }
    }, [data]);

    // Фильтруем продукты по активной категории
    useEffect(() => {
        if (data && activeCategory) {
            const filtered = data.filter((item) => item.category.name === activeCategory);
            setFilteredData(filtered);
        }
    }, [data, activeCategory]);

    return (
        <>
            <div className="mb-8 overflow-x-auto">
                <div className="flex space-x-4">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                                activeCategory === category.name
                                    ? 'bg-white text-green-800'
                                    : 'bg-green-800 bg-opacity-50 text-white hover:bg-opacity-75'
                            }`}
                            onClick={() => {
                                setActiveCategory(category.name);
                            }}
                        >
                            <span className="text-2xl mb-2">
                                {React.createElement(category.icon)}
                            </span>
                            <span className="text-sm">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-6 text-white">{t('menu')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {isLoading && <p>{t('loading')}</p>}
                        {error && <p>{t('error')}</p>}
                        {filteredData && filteredData.map((item) => (
                            <motion.div
                                key={item.id}
                                className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-6">
                                    <div className="relative mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                        {(item.isPopular || item.isSpecial) && (
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                                                {item.isPopular ? t('popular') : t('chefRecommends')}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">{item.name}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-green-800 font-bold text-lg">€{item.price.toFixed(2)}</span>
                                        <div className="flex space-x-2">
                                            {item.allergens.map((allergen, index) => (
                                                <AllergenIcon key={index} type={allergen} />
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        className="w-full bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                                        onClick={() => addToCart(item)}
                                    >
                                        {t('addToCart')}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <Cart />
            </div>
        </>
    )
}
