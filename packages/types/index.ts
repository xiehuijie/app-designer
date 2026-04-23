export * from "./builtin-types";
export * from "./core";

declare global {
  type AppMetaInput = import("./core").AppMetaInput;
  type AppMetaOutput = import("./core").AppMetaOutput;

  type TypeDefinitionInput = import("./builtin-types").TypeDefinitionInput;
  type TypeDefinitionOutput = import("./builtin-types").TypeDefinitionOutput;
}
