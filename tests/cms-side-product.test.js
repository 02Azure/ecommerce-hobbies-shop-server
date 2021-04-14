const request = require("supertest")
const app = require("../app")
const jwt = require("jsonwebtoken")
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const hashPassword = require("../helpers/password-hasher")
//PENTING: remove contraint dulu jika baru pertama kali di migrate di db test
//hapus / comment kedua remove constraint jika mau menjalankan tes kedua kalinya/seterusnya 

beforeAll(() => {
  return queryInterface.removeConstraint('Carts', "fkeycart2user", {})

  .then(() => {
    return queryInterface.removeConstraint('Carts', "fkeycart2product", {})
  })

  .then(() => {
    return queryInterface.bulkDelete("Users", null, {truncate: true, restartIdentity: true})
  })

  .then(() => {
    return queryInterface.bulkInsert("Users", [
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
  })

  .then(() => {
    return queryInterface.bulkDelete("Products", null, {truncate: true, restartIdentity: true})
  })

  .then(() => {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Raigeki LOB SR unlimited",
        image_url: "https://i.imgur.com/47TZSQe.jpg",
        price: 280000,
        stock: 3,
        category: "single",
        detail: "Near Mint condition",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pokeball Leather Deck Case",
        image_url: "https://i.imgur.com/IfY0Mj2.jpg",
        price: 80000,
        stock: 9,
        category: "accessory",
        detail: "High quality deckbox that is enough for 100 large-sized TCG",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  })

  .catch(err => {
    console.log(err)
  })

})

// VAR FOR INPUT==================================				
let validAdminToken = jwt.sign({id: 1, username: "lilynano"}, process.env.SECRET_CODE || "secret") //valid admin user accesstoken (lily)
let nonAdminToken = jwt.sign({id: 2, username: "otong322"}, process.env.SECRET_CODE || "secret") //valid token but not an admin user (otong)

let validCreateProduct = { //example valid product
  name: "smartpon galaksi syamsyung S322",
  image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  price: 32200000,
  stock: 2,
  category: "gadget"
}

let emptyNameProduct = {
  name: "",
  image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  price: 32200000,
  stock: 2,
  category: "gadget"
}

let negativePriceStock = {
  name: "smartpon galaksi syamsyung S322",
  image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  price: -30000,
  stock: -5,
  category: "gadget"
}

let nonURLnonNumberPrice = {
  name: "smartpon galaksi syamsyung S322",
  image_url: "bukan url~",
  price: "tiga puluh ribu",
  stock: 4,
  category: "gadget"
}

let validEditProduct = {
  name: "smartpon yaoming 6s",
  image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  price: 8000000,
  stock: 4,
  category: "gadget"
}

let prodId = 1
let deletedProdId = 2
// ================================ SUCCESS CASE =======================================
// GET ALL PRODUCTS CASE
describe("Shows all products ==> GET /products", () => {
  test("Responds with json: array of the product ", done => {
    return request(app)
      .get("/products")
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// CREATE PRODUCT CASE
describe("Create a new product ==> POST /products", () => {
  test("Responds with json: a new product object ( at least ) { name, image_url, price, stock, category } ", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(validCreateProduct)

      .then(response => {
        let {status, body} = response
        let {name, image_url, price, stock, category} = validCreateProduct

        expect(status).toBe(201)
        expect(body).toHaveProperty("name", name)
        expect(body).toHaveProperty("image_url", image_url)
        expect(body).toHaveProperty("price", price)
        expect(body).toHaveProperty("stock", stock)
        expect(body).toHaveProperty("category", category)
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// GET ONE PRODUCT CASE
describe("Show one product ==> GET /products/:id", () => {
  test("Responds with json: object of a product with matched Id ( at least ) { name, image_url, price, stock, category } ", done => {
    return request(app)
      .get(`/products/2`)
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(200)
        expect(body).toHaveProperty("name", "Pokeball Leather Deck Case")
        expect(body).toHaveProperty("image_url", "https://i.imgur.com/IfY0Mj2.jpg")
        expect(body).toHaveProperty("price", 80000)
        expect(body).toHaveProperty("stock", 9)
        expect(body).toHaveProperty("category", "accessory")
        expect(body).toHaveProperty("detail", "High quality deckbox that is enough for 100 large-sized TCG")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// UPDATE PRODUCT CASE
describe("Update product details: name/image/price/stock/category ==> PUT /products/:id", () => {
  test("Responds with json: object of a product with updated details ( at least ) { name, image_url, price, stock, category } ", done => {
    return request(app)
      .put(`/products/2`)
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(validEditProduct)

      .then(response => {
        let {status, body} = response
        let {name, image_url, price, stock, category} = validEditProduct
        
        expect(status).toBe(200)

        expect(body).toHaveProperty("name", name)
        expect(body).toHaveProperty("image_url", image_url)
        expect(body).toHaveProperty("price", price)
        expect(body).toHaveProperty("stock", stock)
        expect(body).toHaveProperty("category", category)
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// DELETE PRODUCT CASE
describe("Delete a product ==> DELETE /products/:id", () => {
  test("Responds with json: object of a product with updated details ( at least ) { name, image_url, price, stock, category } ", done => {
    return request(app)
      .delete(`/products/${prodId}`)
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      
      .then(response => {
        let {status, body} = response
        let deleteSuccessfullMessage = `Product with Id ${prodId} has been successfully deleted`

        expect(status).toBe(200)
        expect(body).toEqual({message: deleteSuccessfullMessage})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// ================================ FAILED CASE =======================================
// CREATE PRODUCT CASE
describe("Failed Create a new product - no access_token ==> POST /products", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .send(validCreateProduct)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "Invalid access token"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Create a new product - valid token but not an admin user ==> POST /products", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", nonAdminToken)
      .send(validCreateProduct)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "You are not authorized for this action"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Create a new product - validation error: name is empty ==> POST /products", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(emptyNameProduct)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body.error).toContain("Product name can't be empty")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Create a new product - validation error: stock and price is a negative number ==> POST /products", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(negativePriceStock)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body.error).toContain("Price must be 0 or a positive number")
        expect(body.error).toContain("Stock must be 0 or a positive number")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})


describe("Failed Create a new product - validation error: image_url is not url and price is not a positive number ==> POST /products", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(nonURLnonNumberPrice)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body.error).toContain("image_url must be an URL link")
        expect(body.error).toContain("Price must be 0 or a positive number")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

// UPDATE PRODUCT CASE
describe("Failed Update product details - no access_token ==> PUT /products/:id", () => {
  test("Responds with json: {error: message}", done => {
    return request(app)
      .put(`/products/2`)
      .set("Accept", "application/json")
      .send(validEditProduct)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "Invalid access token"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Update product details - valid token but not an admin user ==> PUT /products/:id", () => {
  test("Responds with json: {error: message}", done => {
    return request(app)
      .put(`/products/${prodId}`)
      .set("Accept", "application/json")
      .set("access_token", nonAdminToken)
      .send(validEditProduct)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "You are not authorized for this action"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Update product details - validation error: stock and price is not a positive number ==> PUT /products/:id", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .put(`/products/1`)
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(negativePriceStock)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body.error).toContain("Price must be 0 or a positive number")
        expect(body.error).toContain("Stock must be 0 or a positive number")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})


describe("Failed Create a new product - validation error: image_url is not url and price is not a positive number ==>  PUT /products/:id", () => {
  test("Responds with json {error: message}", done => {
    return request(app)
      .put(`/products/1`)
      .set("Accept", "application/json")
      .set("access_token", validAdminToken)
      .send(nonURLnonNumberPrice)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(400)
        expect(body.error).toContain("image_url must be an URL link")
        expect(body.error).toContain("Price must be 0 or a positive number")
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

//DELETE PRODUCT CASE
describe("Failed Delete a product - no access_token ==> DELETE /products/:id", () => {
  test("Responds with json: {error: message}", done => {
    return request(app)
      .delete(`/products/1`)
      .set("Accept", "application/json")

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "Invalid access token"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})

describe("Failed Delete a product details - valid token but not an admin user ==> DELETE /products/:id", () => {
  test("Responds with json: {error: message}", done => {
    return request(app)
      .delete(`/products/1`)
      .set("Accept", "application/json")
      .set("access_token", nonAdminToken)

      .then(response => {
        let {status, body} = response

        expect(status).toBe(401)
        expect(body).toEqual({error: "You are not authorized for this action"})
        done()
      })

      .catch(err => {
        console.log(err)
      })
  })
})
