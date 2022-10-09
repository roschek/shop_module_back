require('dotenv').config()
const models = require('./models/models')
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/ErrorHandlerModdleware')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router)



app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started ad port: ${PORT}`))
  } catch(e) {
    console.log(e)
  }
}

start()
