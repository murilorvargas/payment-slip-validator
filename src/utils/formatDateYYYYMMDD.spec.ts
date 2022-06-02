import { formatDateYYYYMMDD } from "./formatDateYYYYMMDD";

describe("Format Date YYYY MM DD", () => {
  it("should be able to format date to yyyy mm dd", async () => {
    const response = formatDateYYYYMMDD(new Date("2018-07-16T03:00:00.000Z"));

    expect(response).toEqual("2018-7-16");
  });
});
