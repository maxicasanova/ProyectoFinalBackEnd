import { ProductDto } from "../dtos/index.dto.js";
import { ProductoDao } from "../daos/index.dao.js";
import Response from "../libs/Response.js";

const getAllProducts = async (req, res) => {
    try {
        const data = await ProductoDao.getAll()
        const productDtos = [];
        data.forEach(product => {
            productDtos.push(new ProductDto(product))
        })
        res.json(new Response(productDtos, "success retrieving products"));
    } catch {
        console.log("error retrieving products")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

const getProductById = async (req, res) => {
    if (req.params.id) {
        try {
            const data = await ProductoDao.getById(req.params.id);
            const productDto = new ProductDto(data);
            res.json(new Response(productDto, "success retrieving product"));
        } catch {
            console.log("error retrieving product")
            res.status(500).json(new Response(null, "internal server error", true, 500))
        }
    } else {
        getAllProducts(req, res);
    }

}

const postProduct = async (req, res) => {
    try {
        const data = await ProductoDao.save(req.body)
        const productDto = new ProductDto(data)
        res.status(201).json(new Response(productDto, "success posting product"))
    } catch {
        console.log("error posting product")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

const putProduct = async (req, res) => {
    try {
        const data = await ProductoDao.saveById(req.params.id, req.body)
        res.json(new Response(data, "success updating product"));
    } catch {
        console.log("error updating product")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

const deleteProductById = async (req, res) => {
    try {
        const data = await ProductoDao.deleteById(req.params.id)
        res.json(new Response(data, "success deleting product"));
    } catch {
        console.log("error deleting product")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    }
}

const getProductsByCategory = async (req, res) =>{
    try{
        const data = await ProductoDao.getAllByCategory(req.params.category)
        const productDtos = [];
        data.forEach(product => {
            productDtos.push(new ProductDto(product))
        })
        res.json(new Response(productDtos, "success retrieving products"));
    } catch{
        console.log("error retrieving products by category")
        res.status(500).json(new Response(null, "internal server error", true, 500))
    };
}

export default { getAllProducts, getProductById, postProduct, putProduct, deleteProductById, getProductsByCategory }