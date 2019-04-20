const express = require("express");
const multer = require("multer")

const Item = require("../models/item")
const admin = require("../middleware/admin")

const router = new express.Router()

// Upload new item(s) to inventory
router.post("/items", admin, async (req, res) => {

    const item = new Item(req.body)

    try {
        await item.save()
        res.status(201).send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Set up multer npm for file uploads
// Accept jpg, jpeg, png
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a JPG, JPEG, or PNG file."))
        }

        cb(undefined, true)

    }
})
// // Upload image file
router.patch("/items/image/:id", admin, upload.single("image"), async (req, res) => {
    let item = await Item.findById(req.params.id)
    if (!item) {
        return res.status(404).send()
    }

    item.image = req.file.buffer
    await item.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) 

// Retrieve all items from inventory
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find({})
        res.send(items)
    } catch (e) {
        res.status(500).send()
    }
})

// Retrieve an item from inventory
router.get("/items/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const item = await Item.findById(_id)
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)

    } catch (e) {
        res.status(500).send()
    }
})

// Update item 
router.patch("/items/:id", admin, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["stock", "price", "name", "description"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete Item 
router.delete("/items/:id", admin, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)

        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router