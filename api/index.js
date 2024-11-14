const express = require('express')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { v2: cloudinary } = require('cloudinary')
const connectMongoDB = require('./config/connectMongoDB')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 8000

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

app.get('/', (req, res) => {
  res.send('Hello, this is your Car Management API!!')
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


/// TODO: 
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500
//   const message = err.message || 'Internal Server Error'
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   })
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!!`)
  connectMongoDB()
})
