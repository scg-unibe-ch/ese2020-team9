

export interface SearchRequest {
    name?: string;
    location?: string;
    priceMin?: number;
    priceMax?: number;
    delivery?: boolean;
    available?: boolean;
    category?: string;
}


