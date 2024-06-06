// Under the database, categories is stored with their parent id,
// in client side, we using graphql to get the categories as and array of objects called categories.
// We need to convert this array of objects to a tree structure.

import { Category } from '../types/Category';

export const CategoryTree = (categories: Category[]) => {
  const categoryTree: Category[] = [];
  const lookup: Record<string, Category> = {};

  categories.forEach((category) => {
    lookup[category.id] = { ...category, children: [] };
  });

  categories.forEach((category) => {
    if (category.father && lookup[category.father.id]) {
      lookup[category.father.id].children?.push(lookup[category.id]);
    } else {
      categoryTree.push(lookup[category.id]);
    }
  });

  console.log(categoryTree);

  return categoryTree;
};
