if(process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env || 3000
const cors = require("cors")
const errorHandler = require("./middlewares/error-handler")
const index = require("./routes/index-route")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/", index)

app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`)
// })
