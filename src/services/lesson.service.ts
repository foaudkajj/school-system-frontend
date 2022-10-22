import { Lesson } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Lesson[]> => {
  let result$ = AxiosService.get<Lesson[]>(`lessons/get`);
  return result$;
};

const insert = (row: Lesson): Promise<Lesson> => {
  let result$ = AxiosService.post<Lesson>(`lessons/insert`, row);
  return result$;
};

const modify = (key: string, row: Lesson): Promise<Lesson> => {
  let result$ = AxiosService.put<Lesson>(`lessons/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Lesson> => {
  let result$ = AxiosService.remove<Lesson>(`lessons/delete/${key}`);
  return result$;
};

export const LessonService = {
  getAll,
  insert,
  modify,
  remove,
};
