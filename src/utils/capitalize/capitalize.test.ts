import capitalize from "./capitalize";

describe("capitalize", () => {
  test("capitalizes the first letter of a lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("capitalizes the first letter and makes the rest lowercase", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  test("handles already capitalized words correctly", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  test("handles single-letter words", () => {
    expect(capitalize("a")).toBe("A");
  });

  test("handles empty string input", () => {
    expect(capitalize("")).toBe("");
  });

  test("handles strings with spaces", () => {
    expect(capitalize(" hello")).toBe(" hello"); // It doesn't trim spaces
  });

  test("handles strings with special characters", () => {
    expect(capitalize("!hello")).toBe("!hello");
  });
});
