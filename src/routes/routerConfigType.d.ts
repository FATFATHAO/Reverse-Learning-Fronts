export type routerConfigType = {
  path: string;
  auth?: (number | string)[];
  element?: FC<unknown>;
  children?: routerConfigType[] | RouteObject[];
};