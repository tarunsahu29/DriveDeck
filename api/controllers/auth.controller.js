const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      })
    }

    const userExist = await User.findOne({ username })
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' })
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
      })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username, email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.log('Error in Register controller')
    res.status(500).json({ message: 'Server error' })
  }
}

// Login user
exports.login = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.findOne({ username, email })
    if (!user) {
      // res.clearCookie('token')
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // res.clearCookie('token')
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const { password: pass, ...rest } = user._doc

    // Set token as a cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      })
      .status(200)
      .json(rest)
  } catch (error) {
    console.log('Error in login credentials')
    res.status(500).json({ message: 'Server error' })
  }
}

// Logout user
exports.logout = (req, res) => {
  try {
    res.clearCookie('token')
    res.json({ message: 'Logout successful' })
  } catch (error) {
    console.log('Error in logout controller')
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

//Auth-check
exports.authCheck = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    console.log('Error in authCheck controller', error.message)
    res.status(500).json({
      error: 'Internal server error',
    })
  }
}
