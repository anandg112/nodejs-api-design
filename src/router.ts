import {Router} from 'express'
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router()

/**
 * Product
 */

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put("/product/:id", body("name").isString(), handleInputErrors, updateProduct);

router.post("/product", body("name").isString(), handleInputErrors, createProduct);

router.delete("/product/:id", deleteProduct)

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put("/update/:id",
 body("title").optional(),
 body('body').optional(), 
 body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
 body('version').optional(), 
 updateUpdate);

router.post("/update", 
body('title').exists().isString(),
body('body').exists().isString(), 
body('productId').exists().isString(),
createUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */

router.get("/updatepoint", (req, res) => {
    res.json({message: "update point"})
});

router.get("/updatepoint/:id", (req, res) => {
    res.json({ message: "a particular update point"})
});

router.put("/updatepoint/:id",
 body('name').optional().isString(),
 body('description').optional().isString(),
 (req, res) => {
    res.json({message: "Update a update point"})
});

router.post("/updatepoint",
body('name').isString(),
body('description').isString(),
body('updateId').exists().isString(),
 (req, res) => {
    res.json({message: "Create a new update point"})
});

router.delete("/updatepoint/:id", (req, res) => {
    res.json({message: "Delete a Update Point"})
});


export default router

/**
 * Middleware are functions that run right before your handlers run. They can do things like augment the request,
 * log, handle errors, authenticate and pretty much anything else. They look exactly like a handler with one difference
 * Because you can have a list of middleware, there needs to be a mechanism to move into the next middleware function
 * when work is done in the current.
 * 
 * Can add as many middlewares as you want to a route by adding as an array of middlewares
 * example:
 * app.get("/todo/:id", [myMiddleware, my2ndMiddleware], handler);
 */

/**
 * Handlers should only do business-logic and interact with the DB without having to worry about 
 * anything else
 */

/**
 * A unit test is all about testing individual pieces of logic indepedently of each other. You have to make sure
 * you write your code in a way that can be unit tested
 * 
 * Using arguments vs creating closures and exporting your code are all great patterns 
 * to use when creating testable code
 * 
 * Example:
 * 
 * export const action = (value) => {
  console.log(value);
};
 */

/**
 * Unlike a unit test, an integration test will test how an entire route works by actually making a request
 * like a client would then observing what the API sent back and making assertions on that result. We can use jest
 * + supertest to run an integration test
 */