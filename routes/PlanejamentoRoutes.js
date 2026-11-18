
import express from 'express';
import PlanejamentoController from '../controllers/PlanejamentoController.js';

const router = express.Router();

router.get('/', PlanejamentoController.exibir);

router.get('/lst', PlanejamentoController.listar);

router.get('/add', PlanejamentoController.add);
router.post('/add', PlanejamentoController.salvar);

router.get('/edt/:id', PlanejamentoController.edt);
router.post('/edt/:id', PlanejamentoController.atualizar);

router.get('/del/:id', PlanejamentoController.del);
router.post('/del/:id', PlanejamentoController.excluir);

export default router;

