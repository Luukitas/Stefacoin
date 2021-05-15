import express, { NextFunction, Request, Response } from 'express';
import AlunoController from '../controllers/aluno.controller';
import ProfessorController from '../controllers/professor.controller';
import Mensagem from '../utils/mensagem';
import AlunoRouter from './aluno.router'

const router = express.Router();

router.post('/cadastro/aluno', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mensagem: Mensagem = await new AlunoController().incluir(req.body);
      res.json(mensagem);
    } catch (e) {
      next(e);
    }
});

router.post('/cadastro/professor', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mensagem: Mensagem = await new ProfessorController().incluir(req.body);
      res.json(mensagem);
    } catch (e) {
      next(e);
    }
  });

export default router;