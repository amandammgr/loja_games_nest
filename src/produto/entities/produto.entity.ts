import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";



@Entity({name: "tb_produtos"})
export class Produto {

@PrimaryGeneratedColumn()
id: number

@Transform(({ value }: TransformFnParams) => value?.trim())
@IsNotEmpty()
@Column({length: 100, nullable: false})
nome: string;

@IsNotEmpty()
@Column({length: 255, nullable: false})
console: string;

@IsNumber({maxDecimalPlaces: 2})
@IsNotEmpty()
@Column({type: "decimal", precision: 6, scale: 2})
preco: number;

@IsNotEmpty()
@Column({length: 255, nullable: false})
foto: string;

@ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
})
categoria: Categoria
}