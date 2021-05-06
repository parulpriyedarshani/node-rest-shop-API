const express = require('express');
const app = express(); // executing express as a function
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// to connect to the mongodb cluster in mongodb atlas.
mongoose.connect(
    "mongodb+srv://node-shop:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shop.whpap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise; // to use the default node.js promise implementation and to stop the depreciation warning

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));   // to make the file public we use static here for uploads file.

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



/** HANDLING CORS ERRORS */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Conrtol-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});


/** ROUTES HANDLING REQUESTS */

//forwarding requests to the product.js file, user.js and same for orders.js
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);



/** ERROR HANDLING */

// for showing error on routes other than /products and /orders.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); // will forward the error request that occurred here instead of the original one
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;