const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatMoneyToBRL(value: string): string {
  return moneyFormatter.format(Number(value));
}

export { formatMoneyToBRL };
