import { caeserEncode, caesarDecode } from "../libs/caeserCode";

describe("test caeser code password library", () => {
  test("test encode", () => {
    const message = "Hello, world!";
    expect(caeserEncode(message, 3)).toEqual("Khoor, zruog!");
  });

  test("test caeser decode", () => {
    const message = "Khoor, zruog!";
    expect(caesarDecode(message, 3)).toEqual("Hello, world!");
  });
});
