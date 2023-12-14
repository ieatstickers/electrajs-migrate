import { Container } from "../../DI/Container";
import { StatusCommand } from "./StatusCommand";
import { Log } from "../../Utility/Log";


jest.mock("../../Utility/Log");
jest.mock("../../DI/Container");

describe("StatusCommand", () => {
  
  describe("execute", () => {
    
    it(`logs "No migrations found" if there are no migrations`, async () => {
      (Container.getConfig as jest.Mock).mockReturnValue({ migrationDirs: { "group1": { name: "Group 1" } } });
      (Container.getProjectMigrations as jest.Mock).mockResolvedValue({ "group1": [] });
      await (new StatusCommand()).execute();
      expect(Log.yellow).toHaveBeenCalledWith("Group 1");
      expect(Log.red).toHaveBeenCalledWith("  * No migrations found *");
      
    });
    
    it("logs migration names, marking executed ones in green and non-executed in red", async () => {
      (Container.getConfig as jest.Mock).mockReturnValue({ migrationDirs: { "group1": { name: "Group 1" } } });
      (Container.getProjectMigrations as jest.Mock).mockResolvedValue({
        "group1": [
          { name: "Migration1", executed: "2023-01-31 12:00:00" },
          { name: "Migration2", executed: null }
        ]
      });
      await (new StatusCommand()).execute();
      expect(Log.yellow).toHaveBeenCalledWith("Group 1");
      expect(Log.green).toHaveBeenCalledWith("  Migration1");
      expect(Log.red).toHaveBeenCalledWith("  Migration2");
    });
    
  });
  
});
