import { Modules } from "./Modules";

describe("Modules", () => {
  
  describe("import", () => {
    
    it("returns all exports when no export name is provided", async () => {
      const module = await Modules.import(`${__dirname}/Modules.test.ts`);
      expect(module).toEqual({ default: "defaultExport", namedExport: "namedExport" });
    });
    
    it("returns the named export when an export name is provided", async () => {
      const module = await Modules.import("namedExport", `${__dirname}/Modules.test.ts`);
      expect(module).toEqual("namedExport");
    });
    
  });

});

export default "defaultExport";
export const namedExport = "namedExport";
