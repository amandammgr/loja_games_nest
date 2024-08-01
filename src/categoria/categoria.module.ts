import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService], // onde está definido as regras da aplicação
    controllers: [CategoriaController], // classe que é a porta de entrada da aplicação, todas as requisições de postagem é ela q controla
    exports: [TypeOrmModule]
})
export class CategoriaModule {}



