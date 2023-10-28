import { extensionInstance } from "../extension/index";
import { eventInstance, OrderUIT } from "./";

jest.mock("../extension/index", () => ({
  extensionInstance: {
    getHtml: jest.fn(() => "some html"),
  },
}));

describe("EventsClass", () => {
  it("should have update subject initialized", () => {
    expect(eventInstance.update).toBeInstanceOf(Function);
  });

  describe("sendEventUI method", () => {
    it("should call extensionInstance.getHtml if order is not OrderUIT.remove", async () => {
      await eventInstance.sendEventUI(OrderUIT.create, { some: "json" });
      expect(extensionInstance.getHtml).toHaveBeenCalledWith({ some: "json" });
    });
  });
});
