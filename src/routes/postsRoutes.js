import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImg, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
// linux ou mac
// const upload = multer({dest:"./uploads"})

const routes = (app) => {
    //Permite que o servidor interprete requisicoes JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    //Rota para criar um post
    app.post("/posts", postarNovoPost);
    //Rota para subir uma imagem
    app.post("/upload", upload.single("img"), uploadImg);
    
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;