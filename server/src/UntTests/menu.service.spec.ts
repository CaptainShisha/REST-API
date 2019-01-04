import { MenuService } from './../menu/menu.service';
import { TestingModule, Test } from '@nestjs/testing';
import { Repository } from 'typeorm';


describe('MenuService', () => {
    const menuRepositoryMock = {
        find: jest.fn(_ => []),
    };

    beforeEach(() => {
        // const module: TestingModule = await Test.createTestingModule({
        //     providers: [MenuService, { provide: Repository , useValue: menuRepositoryMock }],
        // }).compile();
        // service = {}
        //service = 
    });
    it('should be defined', async () => {
        const service: MenuService = new MenuService(menuRepositoryMock as any);
        const menuProducts = await service.getAll();
        expect(menuRepositoryMock.find).toHaveBeenCalled();
        expect(menuProducts).toEqual([]);
        expect(menuRepositoryMock.find).toHaveBeenCalledWith({where: { is_deleted: false}});
    });
});
