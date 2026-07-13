const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { db, UserModel } = require('./db')

const app = express()
const PORT = process.env.PORT|| 8080

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/users', async (req, res) => {
  const users = await UserModel.findAll()

  console.log('YAY!!! I got the users ......')
  res.json(users)
})

app.get('/health', (req, res) => {
  res.json({
    ok: 'health is okay!'
  })
})

app.get((req, res, next) => {
  res.send('404 - You should not be here!')
})

app.get((err, req, res, next) => {
  res.sendStatus(500)
  console.log(err)
})


db.sync()
  .then(() => {
    console.log('DB connected!!')

    app.listen(PORT, () => {
      console.log('Server is running on PORT...', PORT)
    })
  })
  .catch((er) => {
    console.log(er)
  })