import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  
  private readonly logger = new Logger('ProductsService')
  //! Injeta o repositorio de produtos para usar no service usando o typeorm que seria nosso entity da tabela com o nome de Product
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}


  async create(createProductDto: CreateProductDto) {
    try{
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)
      return product
    }catch(error){
      this.handleError(error)
    }
  }

  findAll() {
    return this.productRepository.find(); //! o find é um método do typeorm que retorna todos os produtos da tabela se nao tiver um where
  }

  findOne(id: string) {
  
    return this.productRepository.findOneBy({id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} productDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }


  private handleError(error: any): never{

    if(error.code === '23505') throw new BadRequestException('Produto já cadastrado');


    this.logger.error(`Erro ao processar a operação ${error.message}`)
    throw new InternalServerErrorException('Erro ao processar a operação')
  }
}
