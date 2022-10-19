import { GenericList } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<GenericList[]> => {
  let result$ = AxiosService.get<GenericList[]>(`generic-lists/get`);
  return result$;
};

const getById = (id: string): Promise<GenericList> => {
  let result$ = AxiosService.get<GenericList>(`generic-lists/get/${id}`);
  return result$;
};

const insert = (row: GenericList): Promise<GenericList> => {
  let result$ = AxiosService.post<GenericList>(`generic-lists/insert`, row);
  return result$;
};

const modify = (key: string, row: GenericList): Promise<GenericList> => {
  let result$ = AxiosService.put<GenericList>(
    `generic-lists/update/${key}`,
    row
  );
  return result$;
};

const remove = (key: string): Promise<GenericList> => {
  let result$ = AxiosService.remove<GenericList>(`generic-lists/delete/${key}`);
  return result$;
};

export const GenericListService = {
  getAll,
  getById,
  insert,
  modify,
  remove,
};
