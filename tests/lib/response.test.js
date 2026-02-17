const { response } = require("../../src/lib/response");

describe("response helper", () => {
  it("should return a formatted API Gateway response", () => {
    const result = response(200, { message: "ok" });

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: "ok" });
    expect(result.headers["Content-Type"]).toBe("application/json");
    expect(result.headers["Access-Control-Allow-Origin"]).toBe("*");
  });

  it("should stringify the body", () => {
    const result = response(201, { id: "123" });
    expect(typeof result.body).toBe("string");
  });
});
