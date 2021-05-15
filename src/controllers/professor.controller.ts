import Professor from '../entities/professor.entity';
import ProfessorRepository from '../repositories/professor.repository';
import { FilterQuery } from '../utils/database/database';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import CursoController from './curso.controller';
import CursoRepository from '../repositories/curso.repository';

export default class ProfessorController {
  async obterPorId(id: number): Promise<Professor> {
    Validador.validarParametros([{ id }]);

    return await ProfessorRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<Professor> {
    return await ProfessorRepository.obter(filtro);
  }

  // #pegabandeira
  async listar(filtro: FilterQuery<Professor> = { tipo: 1}): Promise<Professor[]> {
    return await ProfessorRepository.listar(filtro);
  }

  // #pegabandeira
  async incluir(professor: Professor) {
    const { nome, email, senha } = professor;

    const usuarioExistente = await this.obter({email})

    if(usuarioExistente){
      throw new BusinessException('O usuario com este email já existente')
    }
    if(typeof(professor.nome || professor.email || professor.senha) != 'string'){
      throw new BusinessException('Insira valores válidos')
    }else{
      Validador.validarParametros([{ nome }, { email }, { senha }]);
      professor.tipo = 1;
  
      const id = await ProfessorRepository.incluir(professor);
  
      return new Mensagem('Professor incluido com sucesso!', {
        id,
      });
    }

  }

  async alterar(id: number, professor: Professor) {
    const { nome, email, senha } = professor;

    Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);

    await ProfessorRepository.alterar({ id }, professor);

    return new Mensagem('Professor alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);
    let lista = await CursoRepository.listar({idProfessor: id})
    if(lista.length !=0) {
      throw new BusinessException('Não foi possível excluir Professor, ele esta atrelado a um curso')
    }else{
      await ProfessorRepository.excluir({ id });
      return new Mensagem('Professor excluido com sucesso!', {
        id,
      });
    }
  }
}
