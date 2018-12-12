import { Controller, Get, Post, Delete, Put } from '@nestjs/common';

@Controller('menu')
export class MenuController {

    @Get()
    getAllMenuItems(): string {
    return ;
    }
//samo za admin da se pushta nqkakwo DTO
    @Post()
    addItemToMenu(): any {

    }
//za admina triene na predmet ot meniuto
    @Delete()
    deleteItemFromMenu(): any {

    }
//editvane na daden item from menu
    @Put(':id')
    updateItemInMenu():any {

    }
//find item in the menu and show it
    @Get(':id')
    showMenuItem():any {

    }
}
