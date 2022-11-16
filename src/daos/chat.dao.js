import { Chat } from '../models/index.model.js';

const save = async (mensaje) => {
    const objetoDoc = new Chat(mensaje);
    try {
        const res = await objetoDoc.save();
        return res;
    }
    catch (err) {
        console.log("Error saving chat. Code: ", err);
        return false;
    }
}

const getAll = async () => {
    try {
        const mensajes = await Chat.find({}, { __v: 0 })
        return mensajes;
    } catch (err) {
        console.log("Error retrieving chat. Code: ", err);
        return false;
    }
}

const getAllByMail = async (mail) => {
    try {
        const mensajes = await Chat.find({ mail: mail }, { __v: 0 })
        return mensajes;
    } catch (err) {
        console.log("Error retrieving chat. Code: ", err);
        return false;
    }
}

export { save, getAll, getAllByMail }