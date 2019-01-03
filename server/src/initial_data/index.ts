import { User } from './../entity/User';
import "reflect-metadata";
import { ProductTypes } from './../entity/producttypes';
import { createConnection } from 'typeorm';
import { Menu } from './../entity/Menu';
import * as bcrypt from 'bcrypt';

createConnection().then(async connection => {
    const typesRepository = connection.getRepository(ProductTypes);
    const typeOne = new ProductTypes();
    typeOne.producttype = 'Food';

    const typeTwo = new ProductTypes();
    typeTwo.producttype = 'Drink';

    typesRepository.create(typeOne);
    typesRepository.create(typeTwo);

    await typesRepository.save([typeOne, typeTwo]);

    const MenuRepository = connection.getRepository(Menu);
    const ProductInMenu = new Menu();
    ProductInMenu.product_description = 'Very good!';
    ProductInMenu.product_name = 'Mqso';
    ProductInMenu.product_price = 16;
    ProductInMenu.product_type = 1;
    ProductInMenu.product_weight = 690;
    ProductInMenu.image_url = 'src\\public\\images\\default.png'

    MenuRepository.create(ProductInMenu);

    await MenuRepository.save([ProductInMenu]);

    const UserRepository = connection.getRepository(User);
    const UserToAdd = new User();
    UserToAdd.email = 'a@us.co';
    UserToAdd.firstName = 'Gosho';
    UserToAdd.lastName = 'Hrasto';
    UserToAdd.phoneNumber = '0898696969';
    UserToAdd.username = 'Golemiq';
    UserToAdd.streetName = 'Pravata';
    UserToAdd.streetNumber = '69';
    const pass = 'golemiq';
    UserToAdd.password = await bcrypt.hash(pass, 10);

    await UserRepository.create(UserToAdd);

    await UserRepository.save([UserToAdd]);

    connection.close();

}).catch(error => console.log(error));
