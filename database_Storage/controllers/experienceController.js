const getExperience = (req, res) => {
    res.json({message : " Get Experience"})
}

const setExperience = (req, res) => {
    res.json({message : " Set Experience"})
}

const updateExperience = (req, res) => {
    res.json({message : `Update Experience at ${req.params.id}`})
}

const deleteExperience = (req, res) => {
    res.json({message : `Delete Experience at ${req.params.id}`})
}

module.exports = {
getExperience,
setExperience,
updateExperience,
deleteExperience
}

