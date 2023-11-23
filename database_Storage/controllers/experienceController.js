const asyncHandler = require('express-async-handler')

const Experience = require('../model/experienceModel')


const getExperience =asyncHandler(async (req, res) => {

    const experience = await Experience.find()
    res.json(experience)
})


const setExperience = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }
      const experience = await Experience.create()
    res.json({message : " Set Experience"})
})

const updateExperience = asyncHandler(async (req, res) => {
    res.json({message : `Update Experience at ${req.params.id}`})
})

const deleteExperience = asyncHandler(async (req, res) => {
    res.json({message : `Delete Experience at ${req.params.id}`})
})

module.exports = {
getExperience,
setExperience,
updateExperience,
deleteExperience
}

