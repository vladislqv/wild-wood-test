import { AnimatePresence, motion } from "framer-motion";
import { Globe, MenuIcon } from "lucide-react";
import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <header className="bg-transparent transition-all duration-300">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                className="text-white focus:outline-none lg:hidden"
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                            >
                                <MenuIcon className="h-6 w-6" />
                            </button>
                            <Link to='/' className="text-2xl font-bold text-white ml-4 lg:ml-0">
                                Wild & Wood
                            </Link>
                        </div>
                        <div className="hidden lg:flex items-center space-x-4">
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">{t('menu')}</a>
                            <a href="#" className="text-white hover:text-gray-200 transition duration-300">{t('ourLocation')}</a>
                            <button
                                className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300"
                                onClick={() => navigate('/orders')}
                            >
                                {t('myOrders')}
                            </button>
                            <button
                                className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300"
                                onClick={() => changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
                            >
                                {i18n.language.toUpperCase()}
                            </button>
                        </div>
                    </div>
                </nav>
                <AnimatePresence>
                    {showMobileMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="lg:hidden bg-green-800 bg-opacity-90 py-2"
                        >
                            <a href="#" className="block px-4 py-2 text-white hover:bg-green-700 transition duration-300">{t('menu')}</a>
                            <a href="#" className="block px-4 py-2 text-white hover:bg-green-700 transition duration-300">{t('ourLocation')}</a>
                            <button
                                className="block w-full text-left px-4 py-2 text-white hover:bg-green-700 transition duration-300"
                                onClick={() => {
                                    navigate('/orders');
                                    setShowMobileMenu(false);
                                }}
                            >
                                {t('myOrders')}
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-white hover:bg-green-700 transition duration-300"
                                onClick={() => {
                                    changeLanguage(i18n.language === 'en' ? 'de' : 'en');
                                    setShowMobileMenu(false);
                                }}
                            >
                                <Globe className="h-5 w-5 inline mr-2" />
                                {i18n.language === 'en' ? 'Deutsch' : 'English'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}