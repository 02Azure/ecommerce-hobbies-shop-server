const {User, Cart, Product} = require("../models")

class CartController {
  static async showAll(req, res, next) {
    try {
      let user = await User.findByPk(+req.user.id, {
        include: {
          model: Product,
          through: {
            attributes: ["quantity"]
          }
        }
      })
      res.status(200).json(user.Products)
    }

    catch(err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    let input = {
      UserId: +req.user.id,
      ProductId: +req.body.ProductId,
      quantity: +req.body.quantity
    }
    try {
      //cek apakah produk yang mau di add itu eksis di db
      let product = await Product.findByPk(input.ProductId)

      if(!product) throw {name: "ProductNotFound"}

      //cek apakah user tersebut sudah memiliki product dengan id tersebut
      let user = await User.findByPk(+req.user.id, {
        include: {
          model: Product,
          where: {
            id: input.ProductId
          }
        }
      })

      //jika sudah ada, 
      if(user) {
        req.body.quantity = +user.Products[0].Cart.quantity + input.quantity
        req.body.ProductId = input.ProductId
        CartController.editQuantity(req, res, next)

      //jika tidak ada,
      } else {
        //cek apakah input melebihi jumlah stock 
        if(input.quantity > product.stock) throw {name: "InvalidQuantity"}
        // jika tidak, buat cart baru
        let newCart = await Cart.create(input)
        res.status(201).json(newCart)
      }
    }

    catch(err) {
      next(err)
    }
  }

  static async editQuantity(req, res, next) {
    let input = {
      quantity: +req.body.quantity
    }

    try {
      //cari cart milik user ini dengan idproduct ini
      let foundCart = await Cart.findOne({
        where: {
          UserId: +req.user.id,
          ProductId: +req.body.ProductId
        }, 
      })

      // //jika belum ada cartnya, error
      if(!foundCart) throw {name: "CartNotFound"}

      //jika sudah ada
      let product = await(Product.findOne({
        where: {
          id: foundCart.ProductId
        }
      }))

      //cek apakah akan melebihi jumlah stock jika diubah ke input baru
      if(input.quantity > product.stock) throw {name: "InvalidQuantity"}
      
      //jika quantity <= stock, maka baru update
      let updatedCart = await Cart.update(input, {
        where: {
          UserId: +req.user.id,
          ProductId: +req.body.ProductId
        },
        returning: true
      })
      res.status(200).json(...updatedCart[1])
    }

    catch(err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      let deletedCart = await Cart.destroy({
        where: {
          UserId: +req.user.id,
          ProductId: +req.body.ProductId
        }
      })

      if(!deletedCart) throw {name: "CartNotFound"} 
      res.status(200).json({message: `Item has been successfully removed from your cart`})
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = CartController