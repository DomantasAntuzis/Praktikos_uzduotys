import { expect } from "chai";
import { addItem, updateItem, showItems } from "../dist/controllers/productsController.js";

describe("productsController", () => {
  describe("addItem", () => {
    it("should add a new item successfully", async () => {
      const req = {
        body: {
          pavadinimas: "Test Item",
          aprasymas: "Test item",
          pirkimo_suma: 10,
          pardavimo_suma: 20,
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

      await addItem(req, res, () => {});

      expect(responseStatus).to.equal(200);
      expect(responseBody.success).to.be.true;
      expect(responseBody.message).to.equal("Item added successfully");
      expect(responseBody.data).to.have.property("id");
      expect(responseBody.data.pavadinimas).to.equal(req.body.pavadinimas);
      expect(responseBody.data.aprasymas).to.equal(req.body.aprasymas);
      expect(responseBody.data.pirkimo_suma).to.equal(req.body.pirkimo_suma);
      expect(responseBody.data.pardavimo_suma).to.equal(req.body.pardavimo_suma);
    });
  });

  describe("updateItem", () => {
    it("should update an existing item successfully", async () => {
      const req = {
        body: {
          id: "1",
          pavadinimas: "Updated Item",
          aprasymas: "Updated Item",
          pardavimo_suma: 70,
          likutis: 0,
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
  
      await updateItem(req, res, () => {});
  
      expect(responseStatus).to.equal(200);
      expect(responseBody.message).to.equal("Item updated successfully");
    });
  
    it("should handle error when item is not found", async () => {
      const req = {
        body: {
          id: "100",
          pavadinimas: "Updated Item",
          aprasymas: "updated Item",
          pirkimo_suma: 15,
          pardavimo_suma: 25,
          likutis: 10,
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

      await updateItem(req, res, () => {});
  
      expect(responseStatus).to.equal(404);
      expect(responseBody.error).to.equal("Item not found");
    });
  });
  

  describe("showItems", () => {
    it("should retrieve all items successfully", async () => {
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

      await showItems({}, res, () => {});

      expect(responseStatus).to.equal(200);
      expect(responseBody.message).to.be.an("array");
    });
  });
});
