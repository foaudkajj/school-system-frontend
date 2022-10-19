import { Installment } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Installment[]> => {
  let result$ = AxiosService.get<Installment[]>(`installments/get`);
  return result$;
};

const insert = (row: Installment): Promise<Installment> => {
  let result$ = AxiosService.post<Installment>(`installments/insert`, row);
  return result$;
};

const modify = (key: string, row: Installment): Promise<Installment> => {
  let result$ = AxiosService.put<Installment>(
    `installments/update/${key}`,
    row
  );
  return result$;
};

const remove = (key: string): Promise<Installment> => {
  let result$ = AxiosService.remove<Installment>(`installments/delete/${key}`);
  return result$;
};

export const InstallmentService = {
  getAll,
  insert,
  modify,
  remove,
};
