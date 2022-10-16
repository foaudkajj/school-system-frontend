import { Teacher } from "../models";
import AxiosService from "./axios.service";

const getAll = (): Promise<Teacher[]> => {
  let result$ = AxiosService.get<Teacher[]>(`teachers/get`);
  return result$;
};

const insert = (row: Teacher): Promise<Teacher> => {
  let result$ = AxiosService.post<Teacher>(`teachers/insert`, row);
  return result$;
};

const modify = (key: string, row: Teacher): Promise<Teacher> => {
  let result$ = AxiosService.put<Teacher>(`teachers/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Teacher> => {
  let result$ = AxiosService.remove<Teacher>(`teachers/delete/${key}`);
  return result$;
};

const TeacherService = {
  getAll,
  insert,
  modify,
  remove,
};

export default TeacherService;
