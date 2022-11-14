import { Order } from '../models/index.model.js'

const save = async (objeto) => {
    const objetoModel = new Order(objeto);
    try {
        const obj = await objetoModel.save();
        return { success: `cargado con id ${obj._id}`, _id: obj._id };
    } catch (err) {
        console.log("error guardando.", err);
    }
}

export default save;