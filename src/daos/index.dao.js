import dotenv from "dotenv";

dotenv.config();

let ProductoDao;
let CartDao;
let UserDao;


switch (process.env.DATABASE.toUpperCase()) {
    case "MONGO":
        ProductoDao = await import("./product.dao.js");
        CartDao = await import("./cart.dao.js");
        UserDao = await import("./user.dao.js");
    break;
}

export { ProductoDao, CartDao, UserDao };