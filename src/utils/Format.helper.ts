export const formatPrice = (price: number, currency: string) =>
  price.toLocaleString('vi-VN', {
    style: 'currency',
    currency,
  });

export const formatName = (name: string) => {
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
