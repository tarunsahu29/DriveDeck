const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String, // Each tag will now be a simple string
      },
    ],
    images: [
      {
        url: {
          type: String, // Cloudinary URL
          required: true,
        },
        public_id: {
          type: String, // Cloudinary public_id for deleting or updating the image
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Car', carSchema)
