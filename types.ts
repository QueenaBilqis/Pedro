export interface Product {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
    images: string[];
    description: string;
    category: string;
    isNew?: boolean;
    isEco?: boolean;
    isSoldOut?: boolean;
    video?: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface User {
    name: string;
    email: string;
    tier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
    points: number;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    amount: number;
    status: 'In Transit' | 'Delivered' | 'Processing';
    items: string[];
}