
import conexao from '../config/conexao.js';
import mongoose from 'mongoose';

const grupoSchema = new mongoose.Schema({
    nome: String,
    ano: Number,
    dia: String,
    primeiroEncontro: String
});

const Grupo = conexao.model('Grupo', grupoSchema);

export default Grupo;
