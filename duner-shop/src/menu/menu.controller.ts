import { Controller, Get, Post, Delete, Put, HttpException, HttpStatus, Param, Body, ValidationPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuRegisterDTO } from '../models/menu-register.dto';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) { }

    @Get()
    async getAllMenuItems(@Body() body): Promise<MenuRegisterDTO[]> {

        return await this.menuService.getAll()
    }
    //samo za admin da se pushta nqkakwo DTO
    @Post()
    async addItemToMenu(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) product: MenuRegisterDTO): Promise<string> {
        try {
            await this.menuService.addProduct(product);
            return 'Product was added!';
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
    //za admina triene na predmet ot meniuto
    @Delete(':product_name')
    async deleteItemFromMenu(@Param('product_name') param: string): Promise<string> {
        try {
            const productFound = await this.menuService.deleteProduct(param);
            return `${param} was deleted!`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    //edit item from menu work in progress
    // @Put(':id')
    // async updateItemInMenu(@Param('id') param: number, @Body() body: MenuRegisterDTO): Promise<string> {
    //     try {
    //         const editedProduct = await this.menuService.editProduct(body, param);
    //         return `${body.product_name} was edited!`;
    //     } catch (error) {
    //         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //     }
    // }

    //find item in the menu and show it
    @Get(':product_name')
    async showMenuItem(@Param('product_name') param: string): Promise<MenuRegisterDTO> {
        try {
            const productFound = await this.menuService.getProductByName(param);
            return productFound;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
