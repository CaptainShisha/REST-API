import { MenuRegisterDTO } from './../models/menu-register.dto';
import { MenuController } from './../menu/menu.controller';
import { MenuService } from '../menu/menu.service';

describe('MenuController', () => {
    describe('getAllMenuItems method', () => {
        it('should call MenuService getAll method', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'getAll').mockImplementation(() => {
                return 'all';
            });

            // Act
            await menuController.getAllMenuItems('one');
            // Assert
            expect(service.getAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteItemFromMenu method', () => {
        it('should call deleteProduct method', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'deleteProduct').mockImplementation(() => {
                return 'deleted';
            });

            // Act
            await menuController.deleteItemFromMenu('Duner');
            // Assert
            expect(service.deleteProduct).toHaveBeenCalledTimes(1);
        });

        it('should throw error when there is no such product', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'deleteProduct').mockImplementation(() => {
                throw new Error('No such product');
            });

            // Act & Assert
            try {
                await menuController.deleteItemFromMenu('Duner');
            } catch (e) {
                expect(e.message).toContain('No such product');
            }
        });

        it('should return status bad request', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'deleteProduct').mockImplementation(() => {
                throw new Error('No such product');
            });

            // Act & Assert
            try {
                await menuController.deleteItemFromMenu('Duner');
            } catch (e) {
                expect(e.status).toBe(400);
            }
        });

        it('should return success message', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'deleteProduct').mockImplementation(() => {
                return 'deleted';
            });

            // Act
            const test = await menuController.deleteItemFromMenu('Duner');
            // Assert
            expect(test).toBe(`Duner was deleted!`);
        });
    });

    describe('updateItemInMenu method', () => {
        it('should call editProduct method from service', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'editProduct').mockImplementation(() => {
                return 'edited';
            });
            const item = new MenuRegisterDTO();

            // Act
            await menuController.updateItemInMenu(1, item);
            // Assert
            expect(service.editProduct).toHaveBeenCalledTimes(1);
        });

        it('should throw error when there is no such product', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'editProduct').mockImplementation(() => {
                throw new Error('No such product');
            });
            const item = new MenuRegisterDTO();

            // Act & Assert
            try {
                await menuController.updateItemInMenu(1, item);
            } catch (e) {
                expect(e.message).toContain('No such product');
            }
        });

        it('should return status bad request', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'editProduct').mockImplementation(() => {
                throw new Error('No such product');
            });
            const item = new MenuRegisterDTO();
            // Act & Assert
            try {
                await menuController.updateItemInMenu(1, item);
            } catch (e) {
                expect(e.status).toBe(400);
            }
        });

        it('should return succsess message if product was edited', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'editProduct').mockImplementation(() => {
                return 'success';
            });
            const item = new MenuRegisterDTO();
            item.product_name = 'Duner';
            // Act
            const test = await menuController.updateItemInMenu(1, item);
            // Assert
            expect(test).toBe(`Duner was edited!`);
        });
    });

    describe('showMenuItem method', () => {
        it('should call getProductByName method from service', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'getProductByName').mockImplementation(() => {
                return 'got';
            });
            // Act
            await menuController.showMenuItem('Duner');
            // Assert
            expect(service.getProductByName).toHaveBeenCalledTimes(1);
        });

        it('should throw error when there is no such product', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'getProductByName').mockImplementation(() => {
                throw new Error('No such product');
            });

            // Act & Assert
            try {
                await menuController.showMenuItem('Duner');
            } catch (e) {
                expect(e.message).toContain('No such product');
            }
        });

        it('should return status bad request', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'getProductByName').mockImplementation(() => {
                throw new Error('No such product');
            });

            // Act & Assert
            try {
                await menuController.showMenuItem('Duner');
            } catch (e) {
                expect(e.status).toBe(400);
            }
        });

        it('should return succsess message if product was found', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => 'Duner'),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'getProductByName').mockImplementation(() => {
                return 'Duner';
            });
            // Act
            const test = await menuController.showMenuItem('Duner');
            // Assert
            expect(test).toBe(`Duner`);
        });
    });

    describe('addItemToMenu method', () => {
        it('should call addProduct from service', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'addProduct').mockImplementation(() => {
                return 'Added';
            });
            const item = new MenuRegisterDTO();
            // Act
            await menuController.addItemToMenu(item, null);
            // Assert
            expect(service.addProduct).toHaveBeenCalledTimes(1);
        });

        it('should return succsess message if product was added', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'addProduct').mockImplementation(() => {
                return 'Added';
            });
            const item = new MenuRegisterDTO();
            // Act
            const test = await menuController.addItemToMenu(item, null);
            // Assert
            expect(test).toBe(JSON.stringify('Product was added!'));
        });

        it('should throw error when there is no such product', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'addProduct').mockImplementation(() => {
                throw new Error('Product already exists');
            });
            const item = new MenuRegisterDTO();
            // Act & Assert
            try {
                await menuController.addItemToMenu(item, null);
            } catch (e) {
                expect(e.message).toContain('Product already exists');
            }
        });

        it('should return status conflict', async () => {
            // Arrange
            const menuRepositoryMock = {
                find: jest.fn(_ => []),
            };
            const service: MenuService = new MenuService(menuRepositoryMock as any);
            const menuController = new MenuController(service);

            jest.spyOn(service, 'addProduct').mockImplementation(() => {
                throw new Error('Product already exists');
            });
            const item = new MenuRegisterDTO();

            // Act & Assert
            try {
                await menuController.addItemToMenu(item, null);
            } catch (e) {
                expect(e.status).toBe(409);
            }
        });
    });
});
