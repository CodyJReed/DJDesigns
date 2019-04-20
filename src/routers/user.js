const express = require("express");

const User = require("../models/user")
const Item = require("../models/item")
const auth = require("../middleware/auth")

const router = new express.Router()

// Sign-up/Create new User
router.post("/users", async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Sign-in/Login User
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

// Sign-out/Logout User
router.post("/user/me/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send("You've been successfully logged out.")
    } catch (e) {
        res.status(500).send()
    }
})

//Retrieve user
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

// Update User
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "telephone"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {

        updates.forEach(update =>  req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Retrieve user cart
router.get("/users/me/cart", auth, async (req, res) => { 
    try { 
        let cart = await Item.find({ userCarts : req.user.id})
        .select("name _id description price stock")

        cart = cart.map(item => {
            if (item.stock <= 0) {
                item.remove()
            } else {
                return item
            }
        })
        
        req.user.cart = cart
        await req.user.save()
        res.send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Add Item to user cart
router.post("/users/me/cart/:id", auth, async (req, res) => {
    try {
        let item = await Item.findById(req.params.id)
        
        if (!item) {
            return res.status(404).send()
        }

        if (item.stock <= 0) {
            
            return res.status(400).send("This Item is out of stock.")
        }
        item.userCarts.push(req.user)
        await item.save()
        req.user.cart.push(item)
        await req.user.save()
        res.send("Item has been add.")
    } catch (e) {
        res.status(400).send(e)
    }
})

// Remove Item from user cart
router.delete("/users/me/cart/:id", auth, async (req, res) => {
    try {
        let item = await Item.findById(req.params.id)

        if (!item) {
            res.status(404).send()
        }
        
        item.userCarts = item.userCarts.filter(user => user != req.user._id.toString())

        await item.save()

        req.user.cart = req.user.cart.filter(i => {
            i._id !== item._id
        })

        await req.user.save()

        res.send({
            message: "Item has been removed",
            cart: req.user.cart
        })

    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete User
router.delete("/users/me", auth,  async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router