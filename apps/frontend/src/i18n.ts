import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "menu": "Menu",
                    "ourLocation": "Our Location",
                    "myOrders": "My Orders",
                    "yourCart": "Your Cart",
                    "cartEmpty": "Your cart is empty.",
                    "makeOrder": "Make Order",
                    "total": "Total",
                    "confirmOrder": "Confirm Your Order",
                    "items": "Items",
                    "addComment": "Add a comment to your order (optional)",
                    "commentPlaceholder": "Any special requests or notes?",
                    "cancel": "Cancel",
                    "confirm": "Confirm Order",
                    "sortByDate": "Sort by Date",
                    "sortByStatus": "Sort by Status",
                    "status": "Status",
                    "estimatedTime": "Estimated time",
                    "comment": "Comment",
                    "addToCart": "Add to Cart",
                    "popular": "Popular",
                    "chefRecommends": "Chef Recommends"
                }
            },
            de: {
                translation: {
                    "menu": "Menü",
                    "ourLocation": "Unser Standort",
                    "myOrders": "Meine Bestellungen",
                    "yourCart": "Ihr Warenkorb",
                    "cartEmpty": "Ihr Warenkorb ist leer.",
                    "makeOrder": "Bestellung aufgeben",
                    "total": "Gesamt",
                    "confirmOrder": "Bestätigen Sie Ihre Bestellung",
                    "items": "Artikel",
                    "addComment": "Fügen Sie einen Kommentar zu Ihrer Bestellung hinzu (optional)",
                    "commentPlaceholder": "Besondere Wünsche oder Anmerkungen?",
                    "cancel": "Abbrechen",
                    "confirm": "Bestellung bestätigen",
                    "sortByDate": "Nach Datum sortieren",
                    "sortByStatus": "Nach Status sortieren",
                    "status": "Status",
                    "estimatedTime": "Geschätzte Zeit",
                    "comment": "Kommentar",
                    "addToCart": "In den Warenkorb",
                    "popular": "Beliebt",
                    "chefRecommends": "Empfehlung des Küchenchefs"
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });
