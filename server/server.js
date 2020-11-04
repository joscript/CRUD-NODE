const express = require('express');
const apiRouter = require('./routes');

const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.json());
app.use('/api/users', apiRouter)

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
})