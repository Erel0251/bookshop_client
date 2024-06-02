import { Category } from './Category';
import { Review } from './Review';

export interface Book {
  id: number;
  title: string;
  author?: string;
  overview?: string;
  publisher: string;
  isbn: string;
  img_urls: string[];
  price: number;
  sale_price: number;
  status: string;
  currency: string;
  inventory?: number;
  category: Category;
  reviews: Review[];
}
