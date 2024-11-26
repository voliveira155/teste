import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//Conecta ao banco de dados usando string de conexao fornecida como variavel de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
    //Seleciona o db "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    //Seleciona a colecao "posts" dentro do db
    const colecao = db.collection("posts");
    //Retorna um array com todos os docs da colecao
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
}

// function buscarPostID(id){
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     })
// }

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostID(req.params.id)
//     res.status(200).json(posts[index]);
// });