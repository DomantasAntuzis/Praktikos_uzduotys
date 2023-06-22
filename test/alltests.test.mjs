import chai from "chai";
import chaiHttp from "chai-http";
import app from "../dist/index.js";
import { describe, it } from "mocha";

const { expect } = chai;
chai.use(chaiHttp);

let authToken;

describe("Auth API Tests", () => {
  describe("POST /register", () => {
    it("should register a new user and return 201 status code", done => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          vartotojo_vardas: "testuser",
          slaptazodis: "testpassword",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("message").to.equal("User registered successfully.");
          authToken = res.body.token;
          done();
        });
    });

    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          vartotojo_vardas: "testuser",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("should authenticate a user and return 200 status code with a token", done => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          vartotojo_vardas: "testuser",
          slaptazodis: "testpassword",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message").to.equal("Login successful.");
          expect(res.body).to.have.property("token");
          authToken = res.body.token;
          done();
        });
    });

    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          vartotojo_vardas: "testuser",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe("Product API Tests", () => {
  describe("POST /addItem", () => {
    it("should add a new product and return 201 status code", done => {
      chai
        .request(app)
        .post("/api/addItem")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          pavadinimas: "Test Product",
          aprasymas: "This is a test product",
          pirkimo_suma: 10.0,
          pardavimo_suma: 20.0,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("success").to.be.true;
          expect(res.body).to.have.property("message").to.equal("Item added successfully");
          done();
        });
    });
    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .post("/api/addItem")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          pavadinimas: "Test Product",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("PUT /updateItem", () => {
    it("should update a product and return 200 status code", done => {
      chai
        .request(app)
        .put("/api/updateItem")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          id: 1,
          pavadinimas: "Updated Product",
          aprasymas: "This is an updated product",
          pirkimo_suma: 15.0,
          pardavimo_suma: 25.0,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message").to.equal("Item updated successfully");
          done();
        });
    });

    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .put("/api/updateItem")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          id: 1,
          pavadinimas: "",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe("Order API Tests", () => {
  describe("POST /buyOrder", () => {
    it("should create a buy order and return 200 status code", done => {
      chai
        .request(app)
        .post("/api/buyOrder")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          produkto_id: 1,
          kiekis: 10,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").to.be.true;
          expect(res.body).to.have.property("message").to.equal("Buy order was successful");
          done();
        });
    });

    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .post("/api/buyOrder")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          produkto_id: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("POST /sellOrder", () => {
    it("should create a sell order and return 200 status code", done => {
      chai
        .request(app)
        .post("/api/sellOrder")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          produkto_id: 1,
          kiekis: 5,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").to.be.true;
          expect(res.body).to.have.property("message").to.equal("Sell order was successful");
          done();
        });
    });

    it("should return 400 status code with invalid request data", done => {
      chai
        .request(app)
        .post("/api/sellOrder")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          produkto_id: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe("Not implemented API Tests", () => {
  it("should return a 501 status code and 'Not Implemented' message", done => {
    chai
      .request(app)
      .get("/api/unknown")
      .end((err, res) => {
        expect(res).to.have.status(501);
        expect(res.body).to.have.property("message").to.equal("Not Implemented");
        done();
      });
  });
});
