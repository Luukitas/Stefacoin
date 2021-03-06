import Curso from '../entities/curso.entity';
import CursoRepository from '../repositories/curso.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import AlunoRepository from '../repositories/aluno.repository';
import BusinessException from '../utils/exceptions/business.exception';

export default class CursoController {
  
  async obterPorId(id: number): Promise<Curso> {
    Validador.validarParametros([{ id }]);
    return await CursoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Curso> = {}): Promise<Curso> {
    return await CursoRepository.obter(filtro);
  }

  async listar(filtro: FilterQuery<Curso> = {}): Promise<Curso[]> {
    return await CursoRepository.listar(filtro);
  }

  async incluir(curso: Curso) {
    const { nome, descricao, aulas, idProfessor } = curso;
    Validador.validarParametros([{ nome }, { descricao }, { aulas }, { idProfessor }]);

    const id = await CursoRepository.incluir(curso);

    return new Mensagem('Aula incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, curso: Curso) {
    const { nome, descricao, aulas, idProfessor } = curso;
    Validador.validarParametros([{ id }, { nome }, { descricao }, { aulas }, { idProfessor }]);

    await CursoRepository.alterar({ id }, curso);

    return new Mensagem('Aula alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);
    let cursando = false
    let lista = await AlunoRepository.listar()
    for(let l of lista) {
      if(l.cursos != undefined){
        for(let curso of l.cursos){
          if(curso.id == id){
            cursando = true
          }
        }
      }
    }
    if(cursando == true){
      throw new BusinessException('Você não pode excluir este curso, pois há alunos cursando ele')
    }
    else{
      await CursoRepository.excluir({ id });
  
      return new Mensagem('Aula excluido com sucesso!', {
        id,
      });
    }
  }
}
