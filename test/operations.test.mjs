import { expect } from "chai";
import { buyOrder, sellOrder, showOrders } from "../dist/controllers/operationsController.js";

describe("operationsController", () => {
  describe("buyOrder", () => {
    it("should create a buy order successfully", async () => {
      const req = {
        body: {
          produkto_id: 1,
          kiekis: 5,
        },
      };

      let responseStatus = 0;
      let responseBody = {};

      const res = {
        status: status => {
          responseStatus = status;
          return res;
        },
        json: data => {
          responseBody = data;
        },
      };

      await buyOrder(req, res, () => {});

      expect(responseStatus).to.equal(200);
      expect(responseBody.success).to.be.true;
      expect(responseBody.message).to.equal("Buy order was successful");
    });
  });

  describe("sellOrder", () => {
    it("should create a sell order successfully", async () => {
      const req = {
        body: {
          produkto_id: 1,
          kiekis: 5,
        },
      };

      let responseStatus = 0;
      let responseBody = {};

      const res = {
        status: status => {
          responseStatus = status;
          return res;
        },
        json: data => {
          responseBody = data;
        },
      };

      await sellOrder(req, res, () => {});

      expect(responseStatus).to.equal(200);
      expect(responseBody.success).to.be.true;
      expect(responseBody.message).to.equal("Sell order was successful");
    });
  });

  describe("showOrders", () => {
    it("should retrieve all orders successfully", async () => {
      let responseStatus = 0;
      let responseBody = {};

      const res = {
        status: status => {
          responseStatus = status;
          return res;
        },
        json: data => {
          responseBody = data;
        },
      };

      await showOrders({}, res, () => {});

      expect(responseStatus).to.equal(200);
      expect(responseBody.message).to.be.an("array");
    });
  });
});
