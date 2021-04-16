# E-commerce-server - Documentation
* RESTful endpoint for seller product's and customer cart's CRUD operation
* powered with express and postgres (with sequelize)

## Deployed at: https://ecommerce-server-02azure.herokuapp.com/

## Endpoints 

<details>
<summary>1. POST /register</summary>

&nbsp;

> Register a new user ( as customer )

&nbsp;

**Request Body**
``` JS
{
  username: "otong322 <alphanumeric>" 
  email: "otong@mail.com",
  password: "pass123"
}
```

**Response (201)**
``` JSON
{
  "id": 1,
  "username": "otong322",
  "email": "otong@mail.com"
}
```

**Response (400) (validation error: example: username is using non alphanumeric and incorrect email format)**
``` JSON
{
  "error": [
    "Please fill username with alphanumeric characters only",
    "Please fill your email with following format: example@mail.com"
  ]
}
```

**Response (400) (Email or username is already registered)**
``` JSON
{
  "error": "This username or email is already registered"
}
```
</details>

---

<details>
<summary>2. POST /login</summary>

&nbsp;

> Logging in a user

&nbsp;

**Request Body**
``` JS
{
  username: "lilynano",
  password: "lilily"
}
```

**Response (200)**
``` JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsaWx5bmFubyIsImlhdCI6MTYxNzcwMjYwNX0.qjLvckyJeKDSlYKZDqZiAHqazqiUU_zzFNYdu3uXD08",
    "username": "lilynano",
    "role": "admin"
```

**Response (400) (id and/or password is empty or null)**
``` JSON
{
  "error": "Please fill both of the fields"
}
```

**Response (400) (id and/or password isn't matched with any user)**
``` JSON
{
  "error": "Incorrect Username or Password"
}
```

</details>

---

<details>
<summary>3. GET /products</summary>

&nbsp;

> View all products 

&nbsp;

**Response (200)**
``` JSON
[
    {
        "id": 6,
        "name": "Raigeki LOB SR unlimited",
        "image_url": "https://i.imgur.com/47TZSQe.jpg",
        "price": 280000,
        "stock": 3,
        "category": "single",
        "detail": "Near Mint condition",
        "createdAt": "2021-04-12T14:04:15.948Z",
        "updatedAt": "2021-04-12T14:04:15.948Z"
    },
    {
        "id": 7,
        "name": "Pokeball Leather Deck Case",
        "image_url": "https://i.imgur.com/IfY0Mj2.jpg",
        "price": 80000,
        "stock": 9,
        "category": "accessory",
        "detail": "High quality deckbox that is enough for 100 large-sized TCG",
        "createdAt": "2021-04-12T14:04:15.948Z",
        "updatedAt": "2021-04-12T14:04:15.948Z"
    },
    ...
]
```
</details>

---
<details>
<summary>4. POST /products</summary>

&nbsp;

> Add a new product 

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Body**
``` JS
{
  name: "smartpon galaksi syamsyung S322",
  image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  price: 32200000,
  stock: 2,
  category: "gadget"
}
```

**Response (201)**
``` JSON
{
  "id": 3,
  "name": "smartpon galaksi syamsyung S322",
  "image_url": "https://i.kym-cdn.com/entries/icons/facebook/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.jpg",
  "price": 32200000,
  "stock": 2,
  "detail": null,
  "category": "gadget",
  "updatedAt": "2021-06-06T09:54:55.311Z",
  "createdAt": "2021-06-06T09:54:55.311Z"
}
```

**Response (400) (validation error, ex: empty name and invalid image_url)**
``` JSON
{
  "error": [
    "Product name can't be empty",
    "image_url must be an URL link"
  ]
}
```
</details>

---
<details>
<summary>5. GET /products/:id</summary>

&nbsp;

> View one product with matched Id

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Product id that you want to get>"
}
```

**Response (200)**
``` JSON
{
  "id": 6,
  "name": "Raigeki LOB SR unlimited",
  "image_url": "https://i.imgur.com/47TZSQe.jpg",
  "price": 280000,
  "stock": 3,
  "category": "single",
  "detail": "Near Mint condition",
  "createdAt": "2021-04-12T14:04:15.948Z",
  "updatedAt": "2021-04-12T14:04:15.948Z"
},
```

**Response (404) (id isn't matched with any task)**
``` JSON
{
    "error": "Product with this id is not found"
}
```

</details>

---

<details>
<summary>6. PUT /products/:id</summary>

&nbsp;

> Update a product's data

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Product id that you want to update>"
}
```

**Request Body**
``` JS
{
  name: "Edited Name",
  image_url: "https://edited.com/image.jpg",
  price: 3000,
  stock: 10,
  category: "edited cat",
  detail: "edited detail"
}
```

**Response (200)**
``` JSON
{
  "id": 6,
  "name": "Edited Name",
  "image_url": "https://edited.com/image.jpg",
  "price": 3000,
  "stock": 10,
  "category": "edited cat",
  "detail": "edited detail",
  "createdAt": "2021-04-12T14:04:15.948Z",
  "updatedAt": "2021-04-12T14:04:15.948Z"
},
```
**Response (400) (validation error, example: null name)**
``` JSON
{
  "error": [
    "Please fill the product's name"
  ]
}
```
**Response (404) (id isn't matched with any product)**
``` JSON
{
    "error": "Product with this id is not found"
}
```
</details>

---

<details>
<summary>7. DELETE /products/:id</summary>

&nbsp;

> Delete a product

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Parameters**
``` JSON
{
  "id": "<Product id that you want to delete>"
}
```

**Response (200) (with params id = 5)**
``` JSON
{
    "message": "Product with id 5 has been successfully deleted"
}
```

**Response (404) (id isn't matched with any product)**
``` JSON
{
    "error": "Product with this id is not found"
}
```
</details>

---

<details>
<summary>8. GET /carts</summary>

&nbsp;

> Show all user's product in cart

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Response (200) (will show as empty array if there is no product in user's cart)**
``` JSON
[
  {
    "id": 3,
    "name": "Custom Playmat: Trails of Cold Steel 3",
    "image_url": "https://i.imgur.com/6EkDeLT.png",
    "price": 270000,
    "stock": 2,
    "category": "accessory",
    "detail": "Custom 30 x 45 cm rubber playmat featuring Trails of Cold Steel 3!",
    "createdAt": "2021-04-13T13:37:27.005Z",
    "updatedAt": "2021-04-13T13:37:27.005Z",
    "Cart": {
      "quantity": 1
    }
  },
  {
    "id": 2,
    "name": "Pokeball Leather Deck Case",
    "image_url": "https://i.imgur.com/IfY0Mj2.jpg",
    "price": 80000,
    "stock": 9,
    "category": "accessory",
    "detail": "High quality deckbox that is enough for 100 large-sized TCG",
    "createdAt": "2021-04-13T13:37:27.005Z",
    "updatedAt": "2021-04-13T13:37:27.005Z",
    "Cart": {
      "quantity": 3
    }
  }
]
```

**Response (400) (using admin token key)**
``` JSON
{
  "error": "You are not authorized for this action"
}
```
</details>

---

<details>
<summary>9. POST /carts</summary>

&nbsp;

> Add a product to user's cart. Will patch the cart instead by adding the quantity from POST input if user already own that product in their cart

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Body**
``` JS
{
  ProductId: "<ProductId that you want to add to the cart>",
  quantity: 2 //Number of product that you want to add
}
```

**Response (201)**
``` JSON
{
  "UserId": 2,
  "ProductId": 4,
  "quantity": 2,
  "updatedAt": "2021-04-13T14:27:27.516Z",
  "createdAt": "2021-04-13T14:27:27.516Z"
}
```
**Response (200) (Product already exist in user's cart)**
``` JSON
{
  "UserId": 2,
  "ProductId": 3,
  "quantity": 2,
  "createdAt": "2021-04-13T13:37:27.063Z",
  "updatedAt": "2021-04-13T14:39:52.220Z"
}
```

**Response (400) (Product is not exist yet in cart AND negative or 0 quantity)**
> 0 or negative quantity will substract to the current cart if that product is already exist, and will throw error from PATCH endpoint if the substracted quantity is not a positive number

``` JSON
{
  "error": [
    "Quantity must be a positive number"
  ]
}
```

**Response (400) (quantity is greater than that product's stock)**
``` JSON
{
  "error": "You can't have a quantity with more than product's stock value"
}
```

</details>

---
<details>
<summary>10. PATCH /carts</summary>

&nbsp;

> Update the quantity of a product in user's cart

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Body**
``` JS
{
  ProductId: "<ProductId that you want to update in the cart>",
  quantity: 2 //Number of product that you want to update into
}
```

**Response (200)**
``` JSON
{
  "UserId": 2,
  "ProductId": 3,
  "quantity": 2,
  "createdAt": "2021-04-13T13:37:27.063Z",
  "updatedAt": "2021-04-13T14:39:52.220Z"
}
```

**Response (400) (quantity is greater than that product's stock)**
``` JSON
{
  "error": "You can't have a quantity with more than product's stock value"
}
```
</details>

---
<details>
<summary>11. DELETE /carts</summary>

&nbsp;

> Delete a product from user's cart

&nbsp;

**Request Header**
``` JSON
{
  "access_token": "<your access token>"
}
```

**Request Body**
``` JS
{
  ProductId: "<ProductId that you want to delete from the cart>",
}
```

**Response (200)**
``` JSON
{
  "message": "Item has been successfully removed from your cart"
}
```

**Response (404) (ProductId isn't matched with any product in your cart)**
``` JSON
{
    "error": "Cart with this product id is not found"
}
```
</details>

---

