import request from "supertest";
import { ApiService } from "./serve";

// Tests use supertest which doesn't require the server to be listening

describe("API Server", () => {
  describe("GET /", () => {
    it("should return 200 and welcome message", async () => {
      const response = await request(ApiService).get("/");
      expect(response.status).toBe(200);
      expect(response.text).toContain("Welcome to TeamPulse API");
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(ApiService).get("/non-existent-route");
      expect(response.status).toBe(404);
    });
  });

  describe("Server State", () => {
    it("should have CORS enabled", async () => {
      const response = await request(ApiService).get("/");
      expect(response.headers["access-control-allow-origin"]).toBeDefined();
    });
  });
});
