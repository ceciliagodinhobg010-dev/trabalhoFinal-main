import conexao from '../config/conexao.js';
import mongoose from 'mongoose';

const encontroSchema = new mongoose.Schema({
    numero: Number,
    data: String,
    tema: String,
    status: {
        type: String,
        default: 'Pendente'
    },
    observacao: String
});

const planejamentoSchema = new mongoose.Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true
    },
    encontros: [encontroSchema]
});

const Planejamento = conexao.model('Planejamento', planejamentoSchema);

export default Planejamento;
