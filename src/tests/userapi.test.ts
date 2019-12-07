process.env.NODE_ENV = "test";
import "mocha";
import { Express } from "express";
import { expect, assert, should, use } from "chai";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as chaiEach from "chai-each";
use(chaiHttp);
use(chaiEach);
import testLoader from "./test.loader";
import logger from "../loaders/winston";

describe("Connection", function() {
  let appIns: Express;
  before(done => {
    testLoader()
      .then(async res => {
        appIns = res.app;
        const conn = res.dbConn;
        await conn.db.dropDatabase();
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  describe("/api/v1/user :: Users Api", () => {
    it("GET : /api/v1/user >> SHOULD RETURN AN empty array", done => {
      chai
        .request(appIns)
        .get("/api/v1/user")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.keys("total", "message", "users");
          expect(res.body.users).to.be.an("array");
          assert(res.body.users.length == 0);
          done();
        });
    });

    it("POST : /api/v1/user >> First entry : SHOULD Return a message and user object", done => {
      chai
        .request(appIns)
        .post("/api/v1/user")
        .send({
          username: "myusername",
          email: "me@xydev.io",
          password: "password"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.all.keys("message", "user");
          expect(res.body.message).to.be.a("string");
          expect(res.body.user).to.be.an("object");
          expect(res.body.user).to.not.have.property("password");
          done();
        });
    });

    it("POST : /api/v1/user >> Second entry : SHOULD Return an error message as duplicate email", done => {
      chai
        .request(appIns)
        .post("/api/v1/user")
        .send({
          username: "myusername",
          email: "me@xydev.io",
          password: "password"
        })
        .end((err, res) => {
          expect(res.status).to.be.gte(400);
          expect(res.body).to.have.property("message");
          done();
        });
    });
    it("POST : /api/v1/user >> Third entry : SHOULD Pass and Return a message and user object", done => {
      chai
        .request(appIns)
        .post("/api/v1/user")
        .send({
          username: "myusername",
          email: "me2@xydev.io",
          password: "password"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.all.keys("message", "user");
          expect(res.body.message).to.be.a("string");
          expect(res.body.user).to.be.an("object");
          expect(res.body.user).to.not.have.property("password");
          done();
        });
    });

    it("GET : /api/v1/user >> SHOULD RETURN A LIST OF USERS", done => {
      chai
        .request(appIns)
        .get("/api/v1/user")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.keys("total", "message", "users");
          expect(res.body.users).to.be.an("array");
          expect(res.body.users).to.each.have.property("username");
          expect(res.body.users).to.each.have.property("email");
          expect(res.body.users).to.each.have.property("username");
          expect(res.body.users).to.each.have.property("email");
          expect(res.body.users).to.each.not.have.property("password");

          done();
        });
    });
  });
});
