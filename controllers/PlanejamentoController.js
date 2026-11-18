
import Planejamento from '../models/Planejamento.js';
import Grupo from '../models/Grupo.js';

const PlanejamentoController = {

    // INDEX - Página inicial
    exibir: async (req, res) => {
    try {
        const planejamento = await Planejamento.findOne()
            .populate('grupo');

        const planejamentos = await Planejamento.find()
            .populate('grupo');

        res.render('planejamento/index', {
            planejamento,
            planejamentos
        });

    } catch (erro) {
        console.log('ERRO AO ABRIR:', erro);
        res.status(500).send('Erro ao abrir o planejamento.');
    }
},
    // LST - Listar planejamentos
    listar: async (req, res) => {
        try {
            const planejamentos = await Planejamento.find()
                .populate('grupo');

            res.render('planejamento/lst', {
                planejamentos
            });

        } catch (erro) {
            console.log('ERRO AO LISTAR:', erro);
            res.status(500).send('Erro ao listar planejamentos.');
        }
    },

    // ADD - Abrir cadastro
    add: async (req, res) => {
        try {
            const grupos = await Grupo.find();

            res.render('planejamento/add', {
                grupos
            });

        } catch (erro) {
            console.log('ERRO AO ABRIR CADASTRO:', erro);
            res.status(500).send('Erro ao abrir cadastro.');
        }
    },

    // SALVAR novo planejamento
    salvar: async (req, res) => {
        try {
            const { grupo } = req.body;

            if (!grupo) {
                return res.status(400).send('Selecione um grupo.');
            }

            const existe = await Planejamento.findOne({ grupo });

            if (existe) {
                return res.status(400).send(
                    'Este grupo já possui um planejamento.'
                );
            }

            const encontros = [];

            for (let i = 1; i <= 20; i++) {
                encontros.push({
                    numero: i,
                    data: '',
                    tema: '',
                    status: 'Pendente',
                    observacao: ''
                });
            }

            const planejamento = new Planejamento({
                grupo,
                encontros
            });

            await planejamento.save();

            res.redirect(`/planejamento/edt/${planejamento._id}`);

        } catch (erro) {
            console.log('ERRO AO SALVAR:', erro);
            res.status(500).send('Erro ao salvar planejamento.');
        }
    },

    // EDT - Abrir edição
    edt: async (req, res) => {
        try {
            const planejamento = await Planejamento.findById(req.params.id)
                .populate('grupo');

            if (!planejamento) {
                return res.status(404).send('Planejamento não encontrado.');
            }

            res.render('planejamento/edt', {
                planejamento
            });

        } catch (erro) {
            console.log('ERRO AO ABRIR EDIÇÃO:', erro);
            res.status(500).send('Erro ao abrir edição.');
        }
    },

    // ATUALIZAR planejamento
    atualizar: async (req, res) => {
        try {
            const planejamento = await Planejamento.findById(req.params.id);

            if (!planejamento) {
                return res.status(404).send('Planejamento não encontrado.');
            }

            const temas = [].concat(req.body.tema || []);
            const status = [].concat(req.body.status || []);
            const observacoes = [].concat(req.body.observacao || []);

            for (let i = 0; i < planejamento.encontros.length; i++) {
                planejamento.encontros[i].tema = temas[i] || '';
                planejamento.encontros[i].status = status[i] || 'Pendente';
                planejamento.encontros[i].observacao = observacoes[i] || '';
            }

            await planejamento.save();

            res.redirect('/planejamento/lst');

        } catch (erro) {
            console.log('ERRO AO ATUALIZAR:', erro);
            res.status(500).send('Erro ao atualizar planejamento.');
        }
    },

    // DEL - Abrir confirmação
    del: async (req, res) => {
        try {
            const planejamento = await Planejamento.findById(req.params.id)
                .populate('grupo');

            if (!planejamento) {
                return res.status(404).send('Planejamento não encontrado.');
            }

            res.render('planejamento/del', {
                planejamento
            });

        } catch (erro) {
            console.log('ERRO AO ABRIR EXCLUSÃO:', erro);
            res.status(500).send('Erro ao abrir exclusão.');
        }
    },

    // EXCLUIR planejamento
    excluir: async (req, res) => {
        try {
            const planejamento = await Planejamento.findByIdAndDelete(
                req.params.id
            );

            if (!planejamento) {
                return res.status(404).send('Planejamento não encontrado.');
            }

            res.redirect('/planejamento/lst');

        } catch (erro) {
            console.log('ERRO AO EXCLUIR:', erro);
            res.status(500).send('Erro ao excluir planejamento.');
        }
    }

};

export default PlanejamentoController;
