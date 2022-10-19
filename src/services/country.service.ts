import { Country } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Country[]> => {
  let result$ = AxiosService.get<Country[]>(`countries/get`);
  return result$;
};

const insert = (row: Country): Promise<Country> => {
  let result$ = AxiosService.post<Country>(`countries/insert`, row);
  return result$;
};

const modify = (key: string, row: Country): Promise<Country> => {
  let result$ = AxiosService.put<Country>(`countries/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Country> => {
  let result$ = AxiosService.remove<Country>(`countries/delete/${key}`);
  return result$;
};

export const CountryService = {
  getAll,
  insert,
  modify,
  remove,
};
