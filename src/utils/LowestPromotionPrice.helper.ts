import { Book } from '../types/Book';

interface Promotion {
  promotion_books: Book[];
}

export const LowestPromotionPrice = (data: Promotion[]) => {
  // we have list of data, which is from multiple promotion events
  // maybe some of them will share the same book with different price
  // we need to find the lowest price of the book
  // and return the final list of books with the lowest price
  const bookMap: Record<string, number> = {};
  data.map((promotion) => {
    promotion.promotion_books.map((book) => {
      if (bookMap[book.id]) {
        if (bookMap[book.id] > book.sale_price) {
          bookMap[book.id] = book.sale_price;
        }
      } else {
        bookMap[book.id] = book.sale_price;
      }
    });
  });

  // filter the book with the lowest price
  const books: Book[] = [];
  data.map((promotion) => {
    promotion.promotion_books.map((book) => {
      if (bookMap[book.id] === book.sale_price) {
        books.push(book);
      }
    });
  });

  return books.filter((book, index, self) => {
    return index === self.findIndex((t) => t.id === book.id);
  });
};
