export const formatBookingProduct = (data) => {
  const transformedData = [];

  data.forEach((product) => {
    const categoryIndex = transformedData.findIndex(
      (item) => item.booking_categories_id.id === product.booking_categories_id.id
    );

    const transformedProduct = {
      id: product.id,
      name: product.name,
      list_price: product.list_price,
      duration: product.duration,
      description_sale: product.description_sale,
    };

    if (categoryIndex === -1) {
      transformedData.push({
        booking_categories_id: product.booking_categories_id,
        product: [transformedProduct],
      });
    } else {
      transformedData[categoryIndex].product.push(transformedProduct);
    }
  });

  return transformedData;
};
