import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true, })
    title: string;

    @Column('numeric', { default: 0 })
    price: number;

    @Column('text', { nullable: true })
    description: string;

    @Column('text', { unique: true })
    slug: string;

    @Column('int', { default: 0 })
    stock: number;

    @Column('text', { array: true, default: [] })
    sizes: string[];

    @Column('text')
    gender: string;


    @BeforeInsert()
    checkSlugInsert(){ //! posso usar o this aqui porque o slug é uma propriedade da entidade
        if(!this.slug) this.slug = this.title.toLowerCase().replaceAll(' ', '-').replaceAll("'", '')
    }
}
