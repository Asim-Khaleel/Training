const mongoose = require('mongoose')

const experienceSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please add company name'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please add starting date'],
      
    },
    endDate: {
        type: Date,
        required: [true, 'Please add end date'],
      },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  
)

module.exports = mongoose.model('Experience', experienceSchema)