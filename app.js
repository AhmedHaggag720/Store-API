require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRoutes = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json());


//rootes


// routes 

app.get('/', (req, res, next) => {
    res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRoutes);
app.use(errorMiddleware);
app.use(notFoundMiddleware);



const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();