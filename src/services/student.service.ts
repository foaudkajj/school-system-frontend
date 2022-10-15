import { Student } from "../models";
import AxiosService from "./axios.service";

const getAll = (): Promise<Student[]> => {
  let result$ = AxiosService.get<Student[]>(`students/get`);
  return result$;
};

const insert = (row: Student): Promise<Student> => {
  let result$ = AxiosService.post<Student>(`students/insert`, row);
  return result$;
};

const modify = (key: string, row: Student): Promise<Student> => {
  let result$ = AxiosService.put<Student>(`students/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Student> => {
  let result$ = AxiosService.remove<Student>(`students/delete/${key}`);
  return result$;
};

const StudentService = {
  getAll,
  insert,
  modify,
  remove,
};

export default StudentService;
