import prisma from "../db";


// Get all updates

export const getUpdates = async(req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
        res.json({data: updates})
}

// Get One Update

export const getOneUpdate = async(req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id,
        }
    })

    res.json({data: update})
}


// Create update

export const createUpdate = async(req, res) => {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        res.status(401)
        res.json({message: "This product doesn't belong to you!"})
    }
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })

    res.json({data: update})
}

// Update update 

export const updateUpdate = async(req, res) => {
    const updateId = req.params.id

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === updateId)

    if (!match) {
        res.status(400)
        res.json({message: 'Product update not found'})
    }

    const updateUpdated = await prisma.update.update({
        where: {
            id: updateId
        },
        data: req.body
    })

    res.json({data: updateUpdated})
}

// Delete update

export const deleteUpdate = async(req, res) => {
    const updateId = req.params.id

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === updateId)

    if (!match) {
        res.status(400)
        res.json({message: 'Product update not found'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: updateId
        }
    })

    res.json({data: deleted})

}