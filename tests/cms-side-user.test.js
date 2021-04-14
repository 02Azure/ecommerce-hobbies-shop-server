const request = require("supertest")
const app = require("../app")
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const hashPassword = require("../helpers/password-hasher")

// VAR FOR INPUT==================================
let validUserAdmin = {
  username: "lilynano",
  password: "lilily"
}

let wrongPassword = {
  username: "lilynano",
  password: "wrongpass"
}

let nonExistent = {
  username: "nonexistentuser",
  password: "anything"
}

let emptyOrNull = {
  username: "",
  password: ""
}

beforeAll(done => {
  queryInterface.bulkInsert("Users", [
    {
      username: "lilynano",
      email: "lilynano@mail.com",
      password: hashPassword("lilily"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "otong322",
      email: "otong@mail.com",
      password: hashPassword("pass123"),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  .then(() => {
    done()
  })

  .catch(err => {
    done(err)
  })
})

afterAll(done => {
  queryInterface.bulkDelete("Users", null, {truncate: true, restartIdentity: true, cascade: true})

  .then(() => {
    done()
  })

  .catch(err => {
    done(err)
  })
})

// ================================ SUCCESS CASE =======================================
//LOGIN CASE
describe("User (admin) login ==> POST /login ", () => {
  test("Responds with json: { username, access_token } ", done => {
    return request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(validUserAdmin) //req.body

      .then(response => {
        let {status, body} = response

        expect(status).toBe(200)
        expect(body).toEqual(
          {
            username: "lilynano",
            access_token: expect.any(String)
          }
        )
        done()
      })

      .catch(err => {
        done(err)
      })
  })
})

// ================================ FAILED CASE =======================================
//LOGIN CASE
describe("Failed User (admin) login - wrong password ==> POST /login ", () => {
  test("Responds with json: { error: message } ", done => {
    return request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(wrongPassword)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body).toEqual({error: "Incorrect Username or Password"})
        done()
      })

      .catch(err => {
        done(err)
      })
  })
})


describe("Failed User (admin) login - username is not found in db ==> POST /login ", () => {
  test("Responds with json: { error: message } ", done => {
    return request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(nonExistent)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body).toEqual({error: "Incorrect Username or Password"})
        done()
      })

      .catch(err => {
        done(err)
      })
  })
})

describe("Failed User (admin) login - username and/or password is empty or null ==> POST /login ", () => {
  test("Responds with json: { error: message } ", done => {
    return request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(emptyOrNull) 

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body).toEqual({error: "Please fill both of the fields"})
        done()
      })

      .catch(err => {
        done(err)
      })
  })
})
