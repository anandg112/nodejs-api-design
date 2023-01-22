import prisma from "../db"


// Get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({data: user.products})
}

//Get one
export const getOneProduct = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: userId
        }
    })

    res.json({data: product})
}


export const createProduct = async(req, res, next) => {

    try {
        const userId = req.user.id

        const product = await prisma.product.create({
            data : {
                name: req.body.name,
                belongsToId: userId
            }
        })
    
        res.json({data: product})
    } catch(e) {
        next(e)
    }

}


export const updateProduct = async(req, res) => {

    const productUpdated = await prisma.product.update({
       where: {
        id_belongsToId: {
            id: req.params.id,
            belongsToId: req.user.id
        }
       },
       data: {
        name: req.body.name
       }
    })

    res.json({data: productUpdated})
}

export const deleteProduct = async(req, res) => {

    const productDeleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
    })

    res.json({data: productDeleted})
}

