import { Container } from "../../DI/Container";
import { NewCommand } from "./NewCommand";
import { Log } from "../../Utility/Log/Log";


jest.mock("../../Utility/Log/Log");
jest.mock("../../DI/Container");

describe("NewCommand", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      expect(newCommand).toHaveProperty("migrationName", "CreateUsersTable");
      expect(newCommand).toHaveProperty("migrationDir", "app");
    });
    
  });
  
  describe("execute", () => {
  
  
  });
  
});
