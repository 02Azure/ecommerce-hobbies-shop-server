const {Cart} = require("../models")

class CartController {
  static async showAll(req, res, next) {
    try {
      let carts = await Cart.findAll()
      res.status(200).json(carts)
    }

    catch(err) {
      next(err)
    }
  }

  static async showOne(req, res, next) {
    try {
      let foundCart = Cart.findByPk(+req.params.id)

      if(!foundCart) throw {name: "CartNotFound"}

      res.status(200).json(foundCart)
    }

    catch(err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    let input = {
      UserId: req.user.id,
      ProductId: req.body.ProductId,
      quantity: +req.body.quantity
    }
    //find dulu cari apakah sudah ada cart dengan product id dan user id yang sama

    try {
      let foundCart = await Cart.findOne({
        where: {
          UserId: input.UserId,
          ProductId: input.ProductId
        }
      })

      if(foundCart) {
        req.params.id = foundCart.id
        req.body.quantity = +foundCart.quantity + +input.quantity
        this.update(req, res, next)

      } else {
        //cek apakah melebihi stock product {}
        let newCart = await Cart.create(input)
        res.status(201).json(newCart)
      }

    }

    catch(err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    let input = {
      quantity: +req.body.quantity
    }

    try {
        //cek apakah melebihi stock product {}
      let updatedCart = Cart.update(input, {
        where: {
          id: +req.params.id
        },
        returning: true
      })

      if(!updatedCart[0]) throw {name: "CartNotFound"}

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
          id: +req.params.id
        }
      })

      if(!deletedCart) throw {name: "CartNotFound"} 
      res.status(200).json({message: `Cart with Id ${req.params.id} has been successfully deleted`})
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = CartController