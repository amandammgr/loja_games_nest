import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controllers/produto.controller";
import { CategoriaModule } from "../categoria/categoria.module";
import { CategoriaService } from "../categoria/services/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers: [ProdutoService, CategoriaService], // onde está definido as regras da aplicação
    controllers: [ProdutoController], // classe que é a porta de entrada da aplicação, todas as requisições de postagem é ela q controla
    exports: [TypeOrmModule]
})
export class ProdutoModule {}