const express = require('express')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { v2: cloudinary } = require('cloudinary')
const connectMongoDB = require('./config/connectMongoDB')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const path = require('path')

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 8000

// const __dirname = path.resolve() // CommonJS workaround for compatibility
console.log(__dirname)

// Use express-fileupload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/', // Specify the directory for temporary files
  }),
)

app.use(express.json({ limit: '5mb' })) // to parse req.body
app.use(express.urlencoded({ extended: true })) //to parse form data(urlencoded)

app.use(cookieParser())

// app.get('/', (req, res) => {
//   res.send('Hello, this is your Car Management API!!')
// })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client','dist','index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!!`)
  connectMongoDB()
})
