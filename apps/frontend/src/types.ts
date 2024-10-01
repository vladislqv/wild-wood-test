export type Allergen = 'egg' | 'nuts' | 'milk' | 'vegan' | 'gluten' | 'soy' | string;

export interface FoodItem {
    id: number;
    name: string;
    price: number;
    description: string;
    cookTime: string;
    allergens: Allergen[];
    isSpecial?: boolean;
    isPopular?: boolean;
    ingredients: string[];
    image: string;
}

export interface CartItem extends FoodItem {
    quantity: number;
}

export type OrderStatus = 'Accepted' | 'Preparing' | 'Ready';

export interface Order {
    id: number;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    estimatedTime?: number;
    comment: string;
}

export interface Category {
    name: string;
    icon: React.ElementType;
}

export interface GetOrdersReturnType {
    id: number;
    items: {
        name: string;
        description: string;
        category: {
            name: string;
        };
        quantity: number;
    }[];
    total: number;
    status: OrderStatus;
    estimatedTime?: number;
    comment: string;
    createdAt: Date;
}