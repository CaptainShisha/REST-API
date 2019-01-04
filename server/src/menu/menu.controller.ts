import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
    HttpException,
    HttpStatus,
    Param,
    Body,
    ValidationPipe,
    FileInterceptor,
    UseInterceptors,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import {
    MenuService,
} from './menu.service';
import {
    MenuRegisterDTO,
} from '../models/menu-register.dto';
import {
    FileService,
} from '../core/file.service';
import {
    join,
} from 'path';
import { unlink } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('menu')
export class MenuController {

    constructor(private readonly menuService: MenuService) {}

    @Get()
    async getAllMenuItems(@Body() body): Promise < MenuRegisterDTO[] > {

        return await this.menuService.getAll();
    }
    @UseGuards(AuthGuard(), RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        limits: FileService.fileLimit(1, 2 * 1024 * 1024),
        storage: FileService.storage(['public', 'images']),
        fileFilter: (req, file, cb) => FileService.fileFilter(req, file, cb, '.png', '.jpg'),
    }))
    async addItemToMenu(@Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) product: MenuRegisterDTO,

                        @UploadedFile() file,
    ): Promise < string > {
        const folder = join('.', 'images');
        if (!file) {
            product.image_url = join(folder, 'default.jpg');
        } else {
            product.image_url = join(folder, file.filename);
        }
        try {
            await this.menuService.addProduct(product);
            return JSON.stringify('Product was added!');
        } catch (error) {
            await new Promise((resolve, reject) => {

                if (file) {
                unlink(join('.', file.path), (err) => {
                    if (err) {
                    reject(error.message);
                    }
                    resolve();
                });
            }
                resolve();
        });
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
    @UseGuards(AuthGuard(), RolesGuard)
    @Delete(':product_name')
    async deleteItemFromMenu(@Param('product_name') param: string): Promise < string > {
        try {
            const productFound = await this.menuService.deleteProduct(param);
            return `${param} was deleted!`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    @UseGuards(AuthGuard(), RolesGuard)
    @Put(':id')
    async updateItemInMenu(@Param('id') param: number, @Body() body: MenuRegisterDTO): Promise<string> {
        try {
            await this.menuService.editProduct(body, param);
            return `${body.product_name} was edited!`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':product_name')
    async showMenuItem(@Param('product_name') param: string): Promise < MenuRegisterDTO > {
        try {
            const productFound = await this.menuService.getProductByName(param);
            return productFound;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
