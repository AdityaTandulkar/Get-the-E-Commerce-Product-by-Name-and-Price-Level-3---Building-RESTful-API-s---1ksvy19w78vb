const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price

app.get("/api/v1/products/:name/:price", (req, res)=>{
    const {name, price} = req.params;

    const filtered = products.find((item) => item.name === name && item.price == price);

    if(filtered){
        res.send({
            status : "success",
            message : "Product fetched successfully",
            data : {
                filtered
            }
        })
    }
    else{
        res.status(404).send({
            status : "failed",
            message : "Product not found!"
        })
    }
})

app.listen(8080)

module.exports = app;
