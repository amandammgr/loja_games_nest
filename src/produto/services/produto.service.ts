import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable() // indica que é uma classe de serviço
export class ProdutoService {
    constructor(
        @InjectRepository(Produto) // cria uma injeção de dependência
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) {}

    async findAll(): Promise<Produto[]>{ // metodo de busca
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        });

}

async findById(id: number): Promise<Produto>{

    let buscaProduto = await this.produtoRepository.findOne({
        where:{
            id
        },
        relations:{
            categoria: true
        }
    });

    if (!buscaProduto)
        throw new HttpException ('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return buscaProduto;
}

async findByNome(nome: string): Promise<Produto[]>{
    return await this.produtoRepository.find({
        where:{
            nome: ILike(`%${nome}%`)
        },
        relations:{
            categoria: true
        }
    })
}

async create(produto: Produto): Promise<Produto>{
    if(produto.categoria){
        let categoria = await this.categoriaService.findById(produto.categoria.id)

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    }



    return await this.produtoRepository.save(produto);
}

async update(produto: Produto): Promise<Produto>{
    let buscaProduto = await this.findById(produto.id);

    if(!buscaProduto || !produto.id)
        throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
    
    if (produto.categoria){

        let categoria = await this.categoriaService.findById(produto.categoria.id)

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    }
    return await this.produtoRepository.save(produto);
}

async delete(id: number): Promise<DeleteResult>{

    let buscaProduto = await this.findById(id)

    if(!buscaProduto)
        throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.delete(id);
    
}


}