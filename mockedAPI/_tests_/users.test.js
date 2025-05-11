const supertest = require("supertest");
const app = require("../index.js");
const fs = require("fs");

describe("GET at /", () => {
  test('user should get "Backend API" ', async () => {
    const res = await supertest(app).get("/");

    expect(res.text).toBe("Backend API");
  });
});

describe("POST at /user", () => {
  const dummyData = {
    username: "wasik",
    name: "Mohammed Wasik",
    password: "asdf",
    favouriteFruit: "kathal",
    favouriteMovie: "notting hill",
    favouriteNumber: 666,
  };



  test("user should be able to create new user", async () => {
    const res = await supertest(app).post("/user").send(dummyData);
    expect(res.text).toBe("Account Created");

    const storageData = fs.readFileSync("./storage/account.json", "utf-8");

    const dataObject = JSON.parse(storageData);
  
    const expectedUserData = {
      name: dummyData.name,
      password: dummyData.password,
      favouriteFruit: dummyData.favouriteFruit,
      favouriteMovie: dummyData.favouriteMovie,
      favouriteNumber: dummyData.favouriteNumber,
    };

    expect(dataObject[dummyData.username]).toEqual(expectedUserData);
  });

  test("user should not be able to create with existing username", async () => {
    const resUnhappy = await supertest(app).post("/user").send(dummyData);

    expect(resUnhappy.text).toBe("Account Already Exists");
  });
});

describe("PUT at /user", () => {
    const username = "wasik";
    const updatedDummyData = {
        name: "Mohammed Wasik Ataher",
        password: "asdfasdf",
        favouriteFruit: "kathal,mango",
        favouriteNumber: 666,
      };

  test("user should be able to update account", async () => {

   

    const res = await supertest(app)
      .put(`/user?username=${username}`)
      .send(updatedDummyData);

    expect(res.text).toBe("Account Updated");

    const storageData = fs.readFileSync("./storage/account.json", "utf-8");

    const dataObject = JSON.parse(storageData);

    const expectedUserData = {
      name: updatedDummyData.name,
      password: updatedDummyData.password,
      favouriteFruit: updatedDummyData.favouriteFruit,
      favouriteNumber: updatedDummyData.favouriteNumber,
    };

    expect(dataObject[username]).toEqual(expectedUserData);
  });

  test('user should not be able to update with invalid username', async () => {

    const res = await supertest(app)
    .put(`/user?username=asdfasdf}`)
    .send(updatedDummyData);

    expect(res.text).toBe("Account Does NOT Exist");    
  })
});

describe("DELETE at /user", () => {
  test("user should be able to delete account", async () => {
    const username = "wasik";
    const res = await supertest(app).delete(`/user?username=${username}`);

    expect(res.text).toBe("Account Deleted");
    const storageData = fs.readFileSync("./storage/account.json", "utf-8");
    const dataObject = JSON.parse(storageData);
    expect(dataObject[username]).toBeUndefined();
  });

  test('user should not be able to delete data with invalid username', async () => {

    const res = await supertest(app)
    .delete(`/user?username=asdfasdf}`);

    expect(res.text).toBe("Account Does Not Exist");    
  })

});
