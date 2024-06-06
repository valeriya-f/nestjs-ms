import {Test, TestingModule} from "@nestjs/testing";
import {ServiceUsersController} from "./service-users.controller";
import {ServiceUsersService} from "./service-users.service";

describe("ServiceUsersController", () => {
  let serviceUsersController: ServiceUsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceUsersController],
      providers: [ServiceUsersService],
    }).compile();

    serviceUsersController = app.get<ServiceUsersController>(ServiceUsersController);
  });

  describe("root", () => {
    it("should return \"Hello World!\"", () => {
      // expect(serviceUsersController.getHello()).toBe("Hello World!");
    });
  });
});
