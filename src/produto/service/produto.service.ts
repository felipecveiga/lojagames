import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";




@Injectable()
export class ProdutoService {
   
    
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {

        return await this.produtoRepository.find({                    //o await ele é a função espera que vai esperar a linha de cima acontecer
            relations: {
            categoria: true
            }
        });  


    }
    

    async findById(id: number): Promise <Produto> {

            let produto = await this.produtoRepository.findOne({

                where: {
                    id
                },
                relations: {
                categoria: true
                }
            })
            
            
            if (!produto)
            throw new HttpException('Produto não existe', HttpStatus.NOT_FOUND)
            
            return produto
        }


        async findByNome(nome: string): Promise<Produto[]>{
            return await this.produtoRepository.find({
                where:{
                    nome: ILike(`%${nome} %`)         //o ilike busca exatamente o titulo.
                },
                relations:{
                categoria: true
                }
            })
        }


        async findByPreco(preco: number): Promise<Produto[]>{
            return await this.produtoRepository.find({
                where:{
                    preco      
                },
                relations:{
                categoria: true
                }
            })
        }


        async findByDescricao(descricao: string): Promise<Produto[]>{
            return await this.produtoRepository.find({
                where:{
                    descricao: ILike(`%${descricao} %`)         //o ilike busca exatamente o titulo.
                },
                relations:{
                categoria: true
                }
            })
        }

        async create(produto: Produto): Promise<Produto>{                //o async é para continuar rodando em segundo plano.

            return await this.produtoRepository.save(produto)
        } 

        async  update(produto: Produto): Promise<Produto>{
            let buscarProduto = await this.findById(produto.id)
        
            if (!buscarProduto || !buscarProduto.id)
                throw new HttpException('produto não existe', HttpStatus.NOT_FOUND)
        
                return await this.produtoRepository.save(produto)
        }

        async delete (id: number): Promise<DeleteResult>{
            let buscarProduto = await this.findById(id)
            if(!buscarProduto)
            throw  new HttpException('produto nao encontrada', HttpStatus.NOT_FOUND)
            return await this.produtoRepository.delete(id)
        }

    }


    
