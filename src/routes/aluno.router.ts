import express, { NextFunction, Request, Response } from 'express';
import AlunoController from '../controllers/aluno.controller';
import Aluno from '../entities/aluno.entity';
import Mensagem from '../utils/mensagem';

const router = express.Router();

router.post('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mensagem: Mensagem = await new AlunoController().incluir(req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.put('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mensagem: Mensagem = await new AlunoController().alterar(Number(id), req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.delete('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mensagem: Mensagem = await new AlunoController().excluir(Number(id));
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.get('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let retornoAluno: any = ''
    const { id } = req.params;
    const aluno: Aluno = await new AlunoController().obterPorId(Number(id));
    retornoAluno = {
      nome: aluno.nome,
        email: aluno.email,
        tipo: aluno.tipo,
        id: aluno.id,
        idade: aluno.idade,
        formacao: aluno.formacao,
        cursos: aluno.cursos
    }
    res.json(retornoAluno);
  } catch (e) {
    next(e);
  }
});

router.get('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listaAluno: any = []
    const alunos: Aluno[] = await new AlunoController().listar();
    for(let a of alunos){
      listaAluno.push({
        nome: a.nome,
        email: a.email,
        tipo: a.tipo,
        id: a.id,
        idade: a.idade,
        formacao: a.formacao,
        cursos: a.cursos
      });
    }
    res.json(listaAluno);
  } catch (e) {
    next(e);
  }
});

export default router;
