const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');


exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quantity _id')   // to select what i wanna show.
    .populate('product', 'name')
    .exec()   // to make it a real promise
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}


exports.orders_create_order = (req, res, next) => {
    // check whether a product exists with the id
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(), //ObjectId() as a func is used here to automatically generate an id.
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Order stored',
                    createdOrder: {
                        _id: result.id,
                        product: result.product,
                        quantity: result.quantity
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        };



exports.orders_get_order= (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
    });
}


exports.orders_delete_order =  (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        productId: 'ID',
                        quantity: 'Number'
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
        });
     });
}
