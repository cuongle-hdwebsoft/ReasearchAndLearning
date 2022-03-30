export const generateProducts = () => {
  return Array.from({ length: 9 }).map((id, index: number) => {
    return {
      id: index,
      productName: "Product " + index,
      price: index * 10000,
      inStock: true,
      amount: index,
      categoryName: 1,
      imageUrl: "https://m.media-amazon.com/images/I/41Jgo7WjH1L.jpg",
      isActive: false,
    };
  });
};
