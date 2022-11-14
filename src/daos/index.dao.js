import dotenv from "dotenv";

dotenv.config();

let ProductoDao;
let CartDao;
let UserDao;
let ChatDao;
let OrderDao;


switch (process.env.DATABASE.toUpperCase()) {
    case "MONGO":
        ProductoDao = await import("./product.dao.js");
        CartDao = await import("./cart.dao.js");
        UserDao = await import("./user.dao.js");
        ChatDao = await import("./chat.dao.js");
        OrderDao = await import("./order.dao.js");
    break;
}

export { ProductoDao, CartDao, ChatDao, UserDao, OrderDao };