const {User, Cart, Product, Transaction, PurchasedItem} = require("../models")

class TransController {
  static async showAll(req, res, next) {
    try {
      let transactions = await Transaction.findAll({
        where: {
          UserId: +req.user.id
        },
        include: {
          model: PurchasedItem
        }
      })

      res.status(200).json(transactions)
    }

    catch(err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    try {
      let user = await User.findByPk(+req.user.id, {
        include: {
          model: Product,
          through: {
            attributes: ["quantity"]
          }
        }
      })
      
      if(user.Products.length) {
        let input = {
          UserId: +req.user.id,
          purchase_date: new Date()
        }

        let newTransaction = await Transaction.create(input)

        input = []

        user.Products.forEach(product => {
          let purchasedItem = {
            TransactionId: newTransaction.id,
            ProductId: product.id,
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            category: product.category,
            detail: product.detail,
            quantity: product.Cart.quantity 
          }

          input.push(purchasedItem)
        })

        let purchasedItems = await PurchasedItem.bulkCreate(input)

        let result = await Cart.destroy({
          where: {
            UserId: +req.user.id
          }
        })

        for(let n = 0; n < user.Products.length; n++ ) {
          let newQuantity = user.Products[n].stock - user.Products[n].Cart.quantity

          Product.update({stock: newQuantity}, {
            where: {
              id: user.Products[n].id
            }
          })
            .then(data => {

            })
            .catch(err => {
              throw err
            })
        }

        res.status(201).json(purchasedItems)

      } else {
        throw {name: "NoProductInCart"}
      }
    }

    catch(err) {
      next(err)
    }


  }

  static async showOne(req, res, next) {
    try {
      let foundTransaction = await Transaction.findByPk(+req.params.id, {
        include: PurchasedItem
      })

      if(!foundTransaction) throw {name: "TransactionNotFound"}

      res.status(200).json(foundTransaction)
    }

    catch(err) {
      next(err)
    }
  }

}

module.exports = TransController