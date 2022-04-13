const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointURL = "/todos/";
let firstTodo;

describe(endpointURL, () => {
  test("GET " + endpointURL, async () => {
    const response = await request(app).get(endpointURL);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  test("Get by Id " + endpointURL, async () => {
    const response = await request(app).get(endpointURL + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  test("GET todoby id doesn't exist" + endpointURL + ":todoId", async () => {
    const response = await request(app).get(
      endpointURL + "5d5fff416bef3c07ecf11f77"
    );
    expect(response.statusCode).toBe(404);
  });

  it("POST" + endpointURL, async () => {
    const response = await request(app).post(endpointURL).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it(
    "Should return error 500 on malformet data with POST " + endpointURL,
    async () => {
      const response = await request(app)
        .post(endpointURL)
        .send({ title: "Missing done property" });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );
});
