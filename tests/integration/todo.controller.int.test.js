const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointURL = "/todos/";
let firstTodo, newTodoId;
const nonExistingTodoId = "5d5fff416bef3c07ecf11f77";

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
    newTodoId = response.body._id;
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

  it("PUT " + endpointURL, async () => {
    const testData = { title: "Make integration test for PUT", done: true };
    const res = await request(app)
      .put(endpointURL + newTodoId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  it("should return 404 on PUT " + endpointURL, async () => {
    const testData = { title: "Make integration test for PUT", done: true };
    const res = await request(app)
      .put(endpointURL + nonExistingTodoId)
      .send(testData);
    expect(res.statusCode).toBe(404);
  });
});
