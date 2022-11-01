import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";




@Injectable()
export class CategoriaService {
    constructor (

        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>

    ) { }

async findAll(): Promise<Categoria[]> {

    return await this.CategoriaRepository.find({
        relations: {
        produto: true 

        }

    }
    );

}

async findById(id: number): Promise <Categoria> {

    let categoria = await this.CategoriaRepository.findOne({

        where: {
            id
        },
        relations: {
         produto: true
        }

    }) 

    if (!Categoria)
    throw new HttpException('Catgeoria não existe', HttpStatus.NOT_FOUND)

    return categoria
}

async findByEsporte(esporte: string): Promise<Categoria[]>{
    return await this.CategoriaRepository.find({
        where:{
            esporte: ILike(`%${esporte} %`) //o ilike busca exatamente o titulo.
        },
        relations: {
        produto: true
        }
    })
}

async findByAventura(aventura: string): Promise<Categoria[]>{
    return await this.CategoriaRepository.find({
        where:{
            aventura: ILike(`%${aventura} %`) //o ilike busca exatamente o titulo.
        },
        relations: {
        produto: true
        }
    })
}

async findByAcao(acao: string): Promise<Categoria[]>{
    return await this.CategoriaRepository.find({
        where:{
            acao: ILike(`%${acao} %`) //o ilike busca exatamente o titulo.
        },
        relations: {
        produto: true
        }
    })
}


async create(categoria: Categoria): Promise<Categoria>{                //o async é para continuar rodando em segundo plano.

    return await this.CategoriaRepository.save(categoria)
} 

async  update(categoria: Categoria): Promise<Categoria>{
    let buscarCategoria = await this.findById(categoria.id)

    if (!buscarCategoria || !categoria.id)
        throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)

        return await this.CategoriaRepository.save(categoria)
}

async delete (id: number): Promise<DeleteResult>{
    let buscarPostagem = await this.findById(id)
    if(!buscarPostagem)
    throw  new HttpException('Categoria nao encontrada', HttpStatus.NOT_FOUND)
    return await this.CategoriaRepository.delete(id)
}

}
