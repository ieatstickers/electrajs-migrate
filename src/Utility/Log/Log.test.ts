
import chalk from "chalk";
import { Log } from "./Log";

console.log = jest.fn();

jest.mock("chalk", () => {
  return {
    redBright: jest.fn().mockImplementation((message: string) => `red: ${message}`),
    greenBright: jest.fn().mockImplementation((message: string) => `green: ${message}`),
    yellowBright: jest.fn().mockImplementation((message: string) => `yellow: ${message}`),
    blueBright: jest.fn().mockImplementation((message: string) => `blue: ${message}`)
  };
});

describe("Log", () => {
  
  describe("red", () => {
    
    it("calls chalk.redBright with the provided message", () => {
      const message = "This is a test message";
      Log.red(message);
      expect(chalk.redBright).toHaveBeenCalledWith(message);
      expect(console.log).toHaveBeenCalledWith(`red: ${message}`);
    });
    
  });
  
  describe("green", () => {
    
    it("calls chalk.greenBright with the provided message", () => {
      const message = "This is a test message";
      Log.green(message);
      expect(chalk.greenBright).toHaveBeenCalledWith(message);
      expect(console.log).toHaveBeenCalledWith(`green: ${message}`);
    });
    
  });
  
  describe("yellow", () => {
    
    it("calls chalk.yellowBright with the provided message", () => {
      const message = "This is a test message";
      Log.yellow(message);
      expect(chalk.yellowBright).toHaveBeenCalledWith(message);
      expect(console.log).toHaveBeenCalledWith(`yellow: ${message}`);
    });
    
  });
  
  describe("blue", () => {
    
    it("calls chalk.blueBright with the provided message", () => {
      const message = "This is a test message";
      Log.blue(message);
      expect(chalk.blueBright).toHaveBeenCalledWith(message);
      expect(console.log).toHaveBeenCalledWith(`blue: ${message}`);
    });
    
  });
  
});
