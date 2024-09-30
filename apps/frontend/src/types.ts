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

export interface Order {
    id: number;
    items: string[];
    total: number;
    status: 'Accepted' | 'Preparing' | 'Ready';
    estimatedTime?: number;
    comment: string;
}

export interface Category {
    name: string;
    icon: React.ElementType;
}