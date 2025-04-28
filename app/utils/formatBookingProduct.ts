export const formatBookingProduct = (data) => {
  const transformedData = [];

  data?.forEach((product) => {
    const categoryIndex = transformedData.findIndex(
      (item) => item.booking_categories_id.id === product.booking_categories_id.id
    );

    const transformedProduct = {
      id: product.id,
      name: product.name,
      list_price: product.list_price,
      duration: product.duration,
      description_sale: product.description_sale,
      website_sequence_product: product.website_sequence_product,
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

  transformedData.sort(
    (a, b) => a.booking_categories_id.sequence - b.booking_categories_id.sequence
  );

  transformedData.forEach((category) => {
    category.product.sort((a, b) => a.website_sequence_product - b.website_sequence_product);
  });

  return transformedData;
};
