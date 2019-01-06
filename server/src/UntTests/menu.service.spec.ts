import { MenuRegisterDTO } from './../models/menu-register.dto';
import { Menu } from './../entity/Menu';
import { MenuService } from './../menu/menu.service';
import { TestingModule, Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('MenuService', () => {
    describe('findAll method', () => {

        it('should call a find method from the Repository', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.getAll();
            // Assert
            expect(menuRepositoryMock.find).toHaveBeenCalled();
        });

        it('should be equal to empty array', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.getAll();
            // Assert
            expect(menuProducts).toEqual([]);
        });

        it('should have been called with `{where: { is_deleted: false}}`', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.getAll();
            // Assert
            expect(menuRepositoryMock.find).toHaveBeenCalledWith({where: { is_deleted: false}});
        });
    });
    describe('getProductByName method', () => {
        it('should have been called the right string', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.getProductByName('Musaka');
            // Assert
            expect(menuRepositoryMock.findOne).toHaveBeenCalledWith({ where: { product_name: 'Musaka' } });
        });

        it('should have been called the right string', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(_ => ['Musaka']),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.getProductByName('Musaka');
            // Assert
            expect(menuProducts).toEqual(['Musaka']);
        });

        it('should throw error if product is not found', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(_ => false),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act & Assert
            try {
                await service.getProductByName('Musaka');
            } catch (e) {
                expect(e.message).toContain('No such item!');
            }

        });
    });

    describe('deleteProduct method', () => {
        it('shoud throw error if item is not found ', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => false),
                update: jest.fn(() => {
                    return 'deleted';
                }),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act & Assert
            try {
                await service.deleteProduct('Musaka');
            } catch (e) {
                expect(e.message).toContain('No such item!');
            }
        });

        it('shoud thor error if item is not found ', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return { is_deleted: false };
                }),
                update: jest.fn(() => {
                    return 'deleted';
                }),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.deleteProduct('Musaka');
            // Act & Assert
            expect(menuRepositoryMock.findOne).toHaveBeenCalledWith({ where: { product_name: 'Musaka' } });
        });

    });

    describe('addProduct', () => {
        it('should add products', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return false;
                }),
                create: jest.fn(() => {
                    return 'created';
                }),
                save: jest.fn(() => 'Product was added'),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act
            const menuProducts = await service.addProduct(new MenuRegisterDTO());
            // Assert
            expect(menuProducts).toEqual('Product was added');
        });

        it('should add products', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return false;
                }),
                create: jest.fn(() => {
                    return 'created';
                }),
                save: jest.fn(() => 'Product was added'),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const product = new MenuRegisterDTO();
            product.product_name = 'ivan';
            // Act
            const menuProducts = await service.addProduct(product);
            // Assert
            expect(menuRepositoryMock.findOne).toBeCalledWith({ where: { product_name: product.product_name } });
        });

        it('should throw error when there is such product', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return true;
                }),
                create: jest.fn(() => {
                    return 'created';
                }),
                save: jest.fn(() => 'Product was added'),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            // Act & Assert
            try {
                await service.addProduct(new MenuRegisterDTO());
            } catch (e) {
                expect(e.message).toContain('Product already exists');
            }
        });
    });

    describe('editProduct method', () => {
        it('should be called with the right data ', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return new MenuRegisterDTO();
                }),
                update: jest.fn(() => {
                    return 'created';
                }),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const product = new MenuRegisterDTO();
            product.product_name = 'ivan';
            product.product_description = 'Ubavec';
            product.product_price = 5;
            product.product_type = 1;
            product.product_weight = 300;
            // Act
            const menuProducts = await service.editProduct(product, 1);
            // Assert
            expect(menuRepositoryMock.findOne).toBeCalledWith({ where: { product_id: 1 } });
        });

        it('should edit the right product properties ', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return new MenuRegisterDTO();
                }),
                update: jest.fn(() => {
                    return 'created';
                }),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const product = new MenuRegisterDTO();
            product.product_name = 'ivan';
            product.product_description = 'Ubavec';
            product.product_price = 5;
            product.product_type = 1;
            product.product_weight = 300;
            // Act
            const menuProducts = await service.editProduct(product, 1);
            // Assert
            expect(menuProducts).toEqual(`${product.product_name} was updated`);
        });

        it('should throw error when product is not fould', async () => {
            // Arrange
            const menuRepositoryMock = {
                findOne: jest.fn(() => {
                return false;
                }),
                update: jest.fn(() => {
                    return 'created';
                }),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const product = new MenuRegisterDTO();
            product.product_name = 'ivan';
            product.product_description = 'Ubavec';
            product.product_price = 5;
            product.product_type = 1;
            product.product_weight = 300;
            // Act & Assert
            try {
                await await service.editProduct(product, 1);
            } catch (e) {
                expect(e.message).toContain('There is no such product');
            }
        });
    });
});
