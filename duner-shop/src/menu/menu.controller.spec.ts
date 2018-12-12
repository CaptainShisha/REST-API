import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';

describe('Menu Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MenuController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MenuController = module.get<MenuController>(MenuController);
    expect(controller).toBeDefined();
  });
});
