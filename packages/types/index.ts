export * from "./builtin-types";
export * from "./core";

declare global {
  type BuiltinType = import("./builtin-types").BuiltinType;
  type AppMetaInput = import("./core").AppMetaInput;
  type AppMetaOutput = import("./core").AppMetaOutput;
}
