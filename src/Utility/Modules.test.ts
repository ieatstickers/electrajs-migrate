import { Modules } from "./Modules";
import clearAllMocks = jest.clearAllMocks;
import fs from "fs";

jest.mock("fs", () => {
  return {
    promises: {
      readFile: jest.fn()
    }
  }
});

describe("Modules", () => {
  
  describe("import", () => {
    
    it("returns all exports when no export name is provided", async () => {
      const module = await Modules.import(`${__dirname}/EsModule.testing.ts`);
      expect(module).toEqual({ default: "defaultExport", namedExport: "namedExport" });
    });
    
    it("returns the named export when an export name is provided", async () => {
      const module = await Modules.import("namedExport", `${__dirname}/EsModule.testing.ts`);
      expect(module).toEqual("namedExport");
    });
    
  });
  
  describe("require", () => {
    
    beforeEach(() => {
      global.__non_webpack_require__ = jest.fn().mockImplementation((modulePath) => {
        return require(modulePath);
      });
    });
    
    afterEach(() => {
      clearAllMocks();
    });
    
    it("returns all exports when no export name is provided", () => {
      const module = Modules.require(`${__dirname}/CommonJsDefault.testing.ts`);
      expect(module).toEqual("defaultExport");
      expect(global.__non_webpack_require__).toHaveBeenCalledWith(`${__dirname}/CommonJsDefault.testing.ts`);
    });
    
    it("returns the named export when an export name is provided", () => {
      const module = Modules.require("namedExport", `${__dirname}/CommonJsNamed.testing.ts`);
      expect(module).toEqual("namedExport");
      expect(global.__non_webpack_require__).toHaveBeenCalledWith(`${__dirname}/CommonJsNamed.testing.ts`);
    });
    
  });
  
  describe("isCommonJS", () => {
    
    it("returns true when the package.json type is not module", async () => {
      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({ type: "commonjs" }));
      const isCommonJS = await Modules.isCommonJS();
      expect(isCommonJS).toEqual(true);
    });
    
    it("returns true when the package.json type is not set", async () => {
      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({}));
      const isCommonJS = await Modules.isCommonJS();
      expect(isCommonJS).toEqual(true);
    });
    
    it("returns false when the package.json type is module", async () => {
      (fs.promises.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({ type: "module" }));
      const isCommonJS = await Modules.isCommonJS();
      expect(isCommonJS).toEqual(false);
    });
    
    it("throws an error when the package.json cannot be found", async () => {
      (fs.promises.readFile as jest.Mock).mockImplementation(() => {
        throw new Error("ENOENT: no such file or directory, open 'package.json'");
      });
      await expect(Modules.isCommonJS()).rejects
        .toThrow("Command must be run from the root of your project containing a valid package.json file.");
    });
  });

});
