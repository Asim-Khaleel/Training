
const asyncHandler = require('express-async-handler');
const Experience = require('../model/experienceModel');

const getExperience = asyncHandler(async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

const setExperience = asyncHandler(async (req, res) => {
  const { company, startDate, endDate, description } = req.body;

  const experience = await Experience.create({
    company,
    startDate,
    endDate,
    description,
  });

  res.status(201).json({ message: 'Experience created successfully', data: experience });
});

const updateExperience = asyncHandler(async (req, res) => {
  const { company, startDate, endDate, description } = req.body;

  const experience = await Experience.findById(req.params.id);

  if (experience) {
    experience.company = company || experience.company;
    experience.startDate = startDate || experience.startDate;
    experience.endDate = endDate || experience.endDate;
    experience.description = description || experience.description;

    await experience.save();

    res.json({ message: `Experience updated at ${req.params.id}`, data: experience });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    await experience.remove();
    res.json({ message: `Experience deleted at ${req.params.id}` });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

module.exports = {
  getExperience,
  setExperience,
  updateExperience,
  deleteExperience,
};
