export interface Book {
  id: number;
  title: string;
  author?: string;
  publisher: string;
  img_urls: string[];
  price: number;
  status: string;
  currency: string;
  inventory: number;
}
