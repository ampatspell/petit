export const isReference = arg => arg?.isReference;

export const unwrapReference = arg => isReference(arg) ? arg.model : arg;
