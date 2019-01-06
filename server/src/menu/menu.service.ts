import { Menu } from './../entity/Menu';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuRegisterDTO } from '../models/menu-register.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>) { }

    async getAll() {
        return await this.menuRepository.find({where: { is_deleted: false}});
    }

    async getProductByName(searchProduct: string) {
        const productFound = await this.menuRepository.findOne({ where: { product_name: searchProduct } });
        if (!productFound) {
            throw new Error('No such item!');
        } else if (productFound.is_deleted === true) {
            throw new Error('Item has been deleted');
        }
        return productFound;
    }
    async deleteProduct(searchProduct: string) {
        const productFound = await this.menuRepository.findOne({ where: { product_name: searchProduct } });

        if (!productFound) {
            throw new Error('No such item!');
        } else if (productFound.is_deleted === true) {
            throw new Error('Item has already been deleted');
        }
        productFound.is_deleted = true;
        await this.menuRepository.update(productFound.product_id, productFound);
        return;
    }

    async addProduct(product: MenuRegisterDTO) {
        const productFound = await this.menuRepository.findOne({ where: { product_name: product.product_name } });

        if (productFound) {
            throw new Error('Product already exists');
        }

        await this.menuRepository.create(product);

        const result = await this.menuRepository.save([product]);

        return result;
    }
    async editProduct(product: MenuRegisterDTO, idNumber: number) {

        const productFound = await this.menuRepository.findOne({ where: { product_id: idNumber } });

        if (!productFound) {
            throw new Error('There is no such product');
        }

        productFound.product_description = product.product_description;
        productFound.product_name = product.product_name;
        productFound.product_price = product.product_price;
        productFound.product_type = product.product_type;
        productFound.product_weight = product.product_weight;

        await this.menuRepository.update(idNumber, productFound);

        return `${product.product_name} was updated`;
    }
}
