import { CartDao } from "../daos/index.dao.js";
import { OrderDao } from "../daos/index.dao.js";
import { OrderDto } from "../dtos/index.dto.js";
import Response from "../libs/Response.js";
import dontenv from 'dotenv';
import sendMailEthereal from "../nodemailerConfig.js";

dontenv.config()


const orderPost = async (req, res) => {
    const order = {
        user: {
            userId: req.params.id,
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
        },
        order: {
            products: req.body.products,
            totalItems: req.body.totalItems,
            total: req.body.total,
            cartId: req.body.cartId
        }
    }

    const htmlMail = `
        <h1 style="color: navy">COMPRA REALIZADA CON EXITO!!</h1>
        <h2>Datos del comprador</h2>
        <div>
            <p>E-Mail: ${order.user.email}</p>
            <p>Nombre: ${order.user.name}</p>
            <p>Dirección: ${order.user.address}</p>
        </div>
        <div>
            <h3 style="color: navy">PRODUCTOS</h3>
            <div>${JSON.stringify(order.order.products)}</div>
            <h3 style="color: navy">TOTAL</h3>
            <div>${order.order.totalItems} items - $${order.order.total}</div>
        </div>
    `
    try {
        const orderResponse = await OrderDao.save(order);
        if (orderResponse.success) {
            await CartDao.emptyCartById(order.order.cartId)

            const orderDto = new OrderDto(order, orderResponse._id)

            res.json(new Response({ success: "pedido cargado correctamente", order: orderDto }, "pedido cargado correctamente"))

            /* send purchase mail */

            await sendMailEthereal(pedido.user.email, `Nuevo pedido de ${order.user.name} (${order.user.email})`, htmlMail)
        } else {
            res.json({ error: "no se pudo cargar el pedido" })
        }
    } catch (err) {
        console.log(`(USER ${req.params.id}) Error guardando en carro: `, err)
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}


export default orderPost ;