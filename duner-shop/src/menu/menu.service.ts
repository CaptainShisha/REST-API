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
        return await this.menuRepository.find({});
    }

    async getProductByName(searchProduct: string) {
        const productFound = await this.menuRepository.findOne({ where: { product_name: searchProduct } });
        if (!productFound) {
            throw new Error('No such user!');
        }
        return productFound;
    }
    async deleteProduct(searchProduct: string) {
        const productFound = await this.menuRepository.findOne({ where: { product_name: searchProduct } });
        if (!productFound) {
            throw new Error('No such user!');
        }
        await this.menuRepository.remove(productFound);
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
// must find the right method
    // async editProduct(product: MenuRegisterDTO, idNumber: number) {

    //     const productFound = await this.menuRepository.findOne({ where: { product_id: idNumber } });

    //     if (!productFound) {
    //         throw new Error('There is no such product');
    //     }

    //     await this.menuRepository.update(productFound, product) //create(product);

    //     const result = await this.menuRepository.save([product]);

    //     return result;
    // }
}
