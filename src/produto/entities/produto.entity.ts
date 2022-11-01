import { IsNotEmpty } from "class-validator"
import { Categoria } from "src/categoria/entities/categoria.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"



@Entity({name:"tb_produto"})
export class Produto {                                      //significa que o nome de classe sempre com a 1 letra maiuscula
    
    @PrimaryGeneratedColumn()
    id: number


    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({ nullable: false})
    preco: number

    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({length: 255, nullable: false})
    lancamento: string

    @IsNotEmpty ()                                      //significa que  nao pode ser vazio
    @Column({length: 255, nullable: false})
    descricao: string
    

    @OneToMany(()  => Categoria, (categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })
    categoria: Categoria []
    



}    