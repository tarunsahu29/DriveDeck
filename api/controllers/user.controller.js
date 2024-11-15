const Car = require('../models/Car')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')

//Create car
exports.createCar = async (req, res) => {
  const { title, description } = req.body
  const tags = req.body['tags[]'] // Access tags using the correct key

  let images = req.files?.images // Access files and check for null

  // Ensure that images are uploaded
  if (!images) {
    return res.status(400).json({ message: 'No images were uploaded.' })
  }

  // If it's a single image, express-fileupload doesn't make it an array, so convert it to an array
  if (!Array.isArray(images)) {
    images = [images]
  }

  // Check if images exceed the limit
  if (images.length > 10) {
    return res
      .status(400)
      .json({ message: 'A maximum of 10 images is allowed.' })
  }

  try {
    // Upload images to Cloudinary concurrently
    const uploadedImages = await Promise.all(
      images.map(
        (image) =>
          cloudinary.uploader.upload(image.tempFilePath, { folder: 'cars' }), // Using tempFilePath for express-fileupload
      ),
    )

    // Store uploaded image URLs and public_ids
    const carImages = uploadedImages.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }))

    // Create and save the car document
    const car = new Car({
      title,
      description,
      tags,
      images: carImages,
      user: req.user._id, // Assuming req.user is set by authentication middleware
    })

    await car.save()
    res.status(201).json({ message: 'Car created successfully', car })
  } catch (error) {
    console.error('Error creating car:', error) // Log the error to get more insights
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// List all cars of the user
exports.listCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id })
    res.json(cars)
  } catch (error) {
    console.error('Error listing cars:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get a specific car by ID
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })

    // Ownership check
    if (car.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to view this car' })
    }

    res.json(car)
  } catch (error) {
    console.error('Error getting car:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update a car
exports.updateCar = async (req, res) => {
  const { title, description } = req.body
  const tags = req.body['tags[]']
  let { imageIdsToDelete } = req.body
  let images = req.files?.images // Access files and check for null

  // Ensure `images` is an array, even if only a single image is uploaded
  if (images && !Array.isArray(images)) {
    images = [images]
  }

  // Parse imageIdsToDelete if it's a stringified array
  if (imageIdsToDelete) {
    imageIdsToDelete = Array.isArray(imageIdsToDelete)
      ? imageIdsToDelete.filter(Boolean) // Filter out null or empty values
      : JSON.parse(imageIdsToDelete).filter(Boolean) // Parse if it's a stringified array
  } else {
    imageIdsToDelete = [] // Ensure it's an empty array if not provided
  }

  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })

    // Ownership check
    if (car.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this car' })
    }

    // Handle image deletions only if `imageIdsToDelete` has valid entries
    if (imageIdsToDelete.length > 0) {
      await Promise.all(
        imageIdsToDelete.map((publicId) =>
          cloudinary.uploader.destroy(publicId),
        ),
      )

      // Remove deleted images from `car.images`
      car.images = car.images.filter(
        (img) => !imageIdsToDelete.includes(img.public_id),
      )
    }

    // Handle new image uploads if any
    if (images && images.length > 0) {
      if (images.length + car.images.length > 10) {
        return res
          .status(400)
          .json({ message: 'A maximum of 10 images is allowed.' })
      }

      // Upload each image and store the result
      const uploadedImages = await Promise.all(
        images.map((image) => {
          if (image.tempFilePath) {
            return cloudinary.uploader.upload(image.tempFilePath, {
              folder: 'cars',
            })
          }
        }),
      )

      // Add only successfully uploaded images
      const newCarImages = uploadedImages
        .filter((result) => result && result.secure_url && result.public_id)
        .map((result) => ({
          url: result.secure_url,
          public_id: result.public_id,
        }))

      car.images.push(...newCarImages)
    }

    // Update car details
    car.title = title || car.title
    car.description = description || car.description
    car.tags = tags || car.tags

    await car.save()
    res.status(200).json({ message: 'Car updated successfully', car })
  } catch (error) {
    console.error('Error updating car:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })

    // Ownership check
    if (car.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this car' })
    }

    // Delete associated images from Cloudinary
    await Promise.all(
      car.images.map((img) => cloudinary.uploader.destroy(img.public_id)),
    )

    await Car.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting car:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.searchCar = async (req, res) => {
  const { keyword } = req.query // Get the search keyword from query params
  const userId = new mongoose.Types.ObjectId(req.user._id)

  try {
    if (!keyword) {
      return res.status(400).json({ message: 'Search keyword is required.' })
    }

    // Search the cars collection for matching keyword in title, description, or tags
    const cars = await Car.find({
      $and: [
        { user: userId },
        {
          $or: [
            { title: { $regex: keyword, $options: 'i' } }, // case-insensitive search
            { description: { $regex: keyword, $options: 'i' } },
            { tags: { $regex: keyword, $options: 'i' } },
          ],
        },
      ],
    })

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: 'No cars found matching your search.' })
    }

    res.status(200).json(cars) // Return the list of matching cars
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}
