import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name: "tb_categoria"})

export class Categoria{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    esporte: string


    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    aventura: string


    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    acao: string


    @UpdateDateColumn()
    data: Date


   @ManyToOne(() => Produto, (produto) => produto.categoria, {
        onDelete: "CASCADE"
    })
        produto: Produto[]
    
        

  
}