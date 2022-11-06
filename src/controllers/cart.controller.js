import { CartDao } from "../daos/index.dao.js";
import { CartDto } from '../dtos/index.dto.js'
import { ProductoDao } from "../daos/index.dao.js";
import Response from "../libs/Response.js";

/* add new cart */
const postCart = async (req, res) => {
    try {
        const data = await CartDao.save({ objType: "cart" })
        res.json(new Response(data, "success posting cart"))
    } catch {
        console.log("error posting cart")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}


/*remove items from cart*/
const emptyCartById = async (req, res) => {
    try {
        const data = await CartDao.emptyCartById(req.params.id);
        const cartDto = new CartDto({ _id: req.params.id, productos: data.cart.productos })

        res.json(new Response(cartDto.productos, "success"))
    } catch {
        console.log("error emptying cart")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

/* delete cart */
const deleteCartById = async (req, res) => {
    try {
        /* empty cart first */
        await CartDao.emptyCartById(req.params.id);
        const data = await CartDao.deleteById(req.params.id)
        res.json(new Response(data, "success deleting cart"));
    } catch {
        console.log("error deleting cart")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

/*get all carts */
const getAllCarts = async (req, res) => {
    try {
        const data = await CartDao.getAll();
        res.json(new Response(data, "success retrieving carts"));
    } catch {
        console.log("error retrieving cart")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

/* get products from cart id */
const getAllProductsByCartId = async (req, res) => {
    try {
        const data = await CartDao.getAllByCartId(req.params.id);
        const cartDto = new CartDto({ _id: req.params.id, productos: data })

        res.json(new Response(cartDto.productos, "success retrieving products from cart"))
    } catch {
        console.log("error retrieving products from cart")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

/* add new product to cart */
const postProductByCartId = async (req, res) => {
    try {
        const producto = await ProductoDao.getById(req.params.id_prod);
        if (producto.error) {
            res.json(new Response(producto, "can't find product in cart"))
        } else {
            const data = await CartDao.saveByCartId(req.params.id, producto)
            
            const cartDto = new CartDto({ _id: req.params.id, productos: data.cart.productos })

            res.json(new Response(cartDto.productos, "success posting product"))
        }
    } catch (err) {
        console.log("error posting product by cart id")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

/* delete product from cart */
const deleteProductByCartId = async (req, res) => {
    try {
        const data = await CartDao.deleteByCartId(req.params.id, req.params.id_prod);
        const cartDto = new CartDto({ _id: req.params.id, productos: data.cart.productos })

        res.json(new Response(cartDto.productos, "success deleting product from cart"))
    } catch {
        console.log("error deleting product by cart id")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}


export default { getAllCarts, getAllProductsByCartId, postProductByCartId, postCart, deleteCartById, deleteProductByCartId, emptyCartById }