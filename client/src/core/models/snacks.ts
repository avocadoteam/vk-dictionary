export type SnackModel = {
  message: string;
  type: SnackType
}

export enum SnackType {
  Error = 0,
  Success
}