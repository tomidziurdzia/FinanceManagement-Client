export const formatAmount = (amount = 0) => {
  return amount?.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
};
