import { useCartStore } from "@/store/cart";
import { Allergen, Category, FoodItem } from "@/types";
import { motion } from "framer-motion";
import { Bean, Coffee, Egg, IceCream, Leaf, Milk, Nut, Soup, Star, Utensils, Wheat } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cart } from "./cart";


// Mock data
const foodItems: FoodItem[] = [
    { id: 1, name: 'Special Pasta', price: 15.99, description: 'Homemade pasta with secret sauce', cookTime: '20 min', allergens: ['gluten', 'milk'], isSpecial: true, isPopular: true, ingredients: ['pasta', 'tomato', 'cheese'], image: '/placeholder.svg?height=200&width=300' },
    { id: 2, name: 'Grilled Salmon', price: 22.50, description: 'Fresh salmon with lemon butter', cookTime: '25 min', allergens: [], isPopular: true, ingredients: ['salmon', 'lemon', 'butter'], image: '/placeholder.svg?height=200&width=300' },
    { id: 3, name: 'Vegetarian Pizza', price: 18.99, description: 'Thin crust pizza with fresh veggies', cookTime: '15 min', allergens: ['gluten', 'milk'], ingredients: ['dough', 'tomato sauce', 'vegetables', 'cheese'], image: '/placeholder.svg?height=200&width=300' },
    { id: 4, name: 'Chicken Salad', price: 12.99, description: 'Mixed greens with grilled chicken', cookTime: '10 min', allergens: ['egg'], ingredients: ['chicken', 'lettuce', 'tomato', 'cucumber'], image: '/placeholder.svg?height=200&width=300' },
    { id: 5, name: 'Beef Burger', price: 16.50, description: 'Juicy beef patty with all the fixings', cookTime: '15 min', allergens: ['gluten', 'milk'], ingredients: ['beef', 'bun', 'lettuce', 'tomato', 'cheese'], image: '/placeholder.svg?height=200&width=300' },
    { id: 6, name: 'Chocolate Cake', price: 8.99, description: 'Rich chocolate cake with ganache', cookTime: '5 min', allergens: ['gluten', 'milk', 'egg'], isPopular: true, ingredients: ['flour', 'sugar', 'cocoa', 'eggs'], image: '/placeholder.svg?height=200&width=300' },
];

const AllergenIcon = ({ type }: { type: Allergen }) => {
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

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState<string>('Main Courses');

    const addToCart = useCartStore((state) => state.addToCart);

    const { t } = useTranslation();

    const categories: Category[] = [
        { name: 'Appetizers', icon: Soup },
        { name: 'Main Courses', icon: Utensils },
        { name: 'Desserts', icon: IceCream },
        { name: 'Drinks', icon: Coffee },
        { name: 'Specials', icon: Star },
    ];

    return (
        <>
            <div className="mb-8 overflow-x-auto">
                <div className="flex space-x-4">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${activeCategory === category.name
                                ? 'bg-white text-green-800'
                                : 'bg-green-800 bg-opacity-50 text-white hover:bg-opacity-75'
                                }`}
                            onClick={() => {
                                setActiveCategory(category.name);
                                // scrollToCategory(category.name);
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
                        {foodItems.map((item) => (
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
                                        <span className="text-green-800 font-bold text-lg">${item.price.toFixed(2)}</span>
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