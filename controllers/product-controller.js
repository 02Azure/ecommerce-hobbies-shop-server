const {Product} = require("../models")

class ProductController {
  static async showAll(req, res, next) {
    try {
      let products = await Product.findAll()
      res.status(200).json(products)
    }

    catch(err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    let input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      detail: req.body.detail
    }

    try {
      let newProduct = await Product.create(input)
      res.status(201).json(newProduct)
    }

    catch(err) {
      next(err)
    }
  }

  static async showOne(req, res, next) {
    try {
      let foundProduct = Product.findByPk(+req.params.id)

      if(!foundProduct) throw {name: "ProductNotFound"}

      res.status(200).json(foundProduct)
    }

    catch(err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    let input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      detail: req.body.detail
    }

    try {
      let updatedProduct = Product.update(input, {
        where: {
          id: +req.params.id
        },
        returning: true
      })

      if(!updatedProduct[0]) throw {name: "ProductNotFound"}

      res.status(200).json(...updatedProduct[1])
    }

    catch(err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      let deletedProduct = await Product.destroy({
        where: {
          id: +req.params.id
        }
      })

      if(!deletedProduct) throw {name: "ProductNotFound"} 
      res.status(200).json({message: `Product with Id ${req.params.id} has been successfully deleted`})
    }

    catch(err) {
      next(err)
    }
  }
}

module.exports = ProductController
