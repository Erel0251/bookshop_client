import { Book } from './Book';

export class Category {
  id?: number;
  name?: string;
  description?: string;
  books?: Book[];
  father?: Category;
  children?: Category[];
  isChecked?: boolean = false;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
