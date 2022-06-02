import { formatMoneyToBRL } from "./formatMoneyToBRL";

describe("Format Money To BRL", () => {
  it("should be able to format money to brl", async () => {
    const response = formatMoneyToBRL("00000020.00");

    expect(response).toEqual("R$\xa020,00");
  });
});
