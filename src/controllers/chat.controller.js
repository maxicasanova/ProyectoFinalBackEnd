import { ChatDao } from "../daos/index.dao.js";
import { ChatDto } from '../dtos/index.dto.js';
import Response from "../libs/Response.js";

const getAllChats = async () => {
    try {
        const data = await ChatDao.getAll();
        const chatDtos = [];
        data.forEach(chat => {
            chatDtos.push(new ChatDto(chat))
        });
        return new Response(chatDtos, "success retrieving chats");
    } catch (err){
        console.log("error retrieving chats", err);
        return 500, { error: 'error retrieving chats'};
    }
}

const saveChat = async (mensaje) => {
    try {
        const data = await ChatDao.save(mensaje);
        const chatDto = new ChatDto(data)
        return new Response(chatDto, "success saving chat");
    } catch {
        console.log("error saving chat")
        return (new Response(null, "internal server error", true, 500));
    }
}

const getChatsByMail = async (req, res) =>{
    try{
        const data = await ChatDao.getAllByMail(req.params.category)
        const chatDtos = [];
        data.forEach(chat => {
            chatDtos.push(new ChatDto(chat))
        });
        res.redirect('/chat')
        // return new Response(chatDtos, "success retrieving chats");
    } catch{
        console.log("error retrieving products by category")
        return new Response(null, "internal server error", true, 500);
    };
}

export default { getAllChats, saveChat, getChatsByMail }