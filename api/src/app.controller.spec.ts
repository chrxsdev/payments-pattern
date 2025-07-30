import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return health status from AppService', () => {
    const result = { status: 'ok' };
    // Mock the getHealth method of AppService
    jest.spyOn(appController['appService'], 'getHealth').mockReturnValue(result);

    expect(appController.getHealth()).toBe(result);
  });
});
