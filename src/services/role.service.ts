import { Role } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Role[]> => {
  let result$ = AxiosService.get<Role[]>(`roles/get`);
  return result$;
};

const insert = (row: Role): Promise<Role> => {
  let result$ = AxiosService.post<Role>(`roles/insert`, row);
  return result$;
};

const modify = (key: string, row: Role): Promise<Role> => {
  let result$ = AxiosService.put<Role>(`roles/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Role> => {
  let result$ = AxiosService.remove<Role>(`roles/delete/${key}`);
  return result$;
};

export const RoleService = {
  getAll,
  insert,
  modify,
  remove,
};
