import { stringHasOnlyNumericCharacters } from "./stringHasOnlyNumericCharacters";

describe("String Has Only Numeric Characters", () => {
  it("should be able to verify if string has only valid", async () => {
    const response = stringHasOnlyNumericCharacters(
      "21290001192110001210904475617405975870000002000"
    );

    expect(response).toEqual(true);
  });

  it("should not be able to verify if string has not only valid", async () => {
    const response = stringHasOnlyNumericCharacters(
      "2129000119211000121090447561740597587000000200H"
    );

    expect(response).toEqual(false);
  });
});
