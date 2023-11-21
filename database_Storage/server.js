const express = require ('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/portfolio/experience', require('./routes/experienceRoute'))

app.listen(port, () => console.log(`Server started on port ${port}`))