export interface Search {
  name?: string;
  location?: [];
  category?: string;
  priceMin?: number;
  priceMax?: number;
  delivery?: boolean;
  available?: boolean;
  isRentable?: boolean;
  isService?: boolean;
}
