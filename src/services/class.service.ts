import { AssignLessonToClassRequest, Class, ClassLesson } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Class[]> => {
  let result$ = AxiosService.get<Class[]>(`classes/get`);
  return result$;
};

const insert = (row: Class): Promise<Class> => {
  let result$ = AxiosService.post<Class>(`classes/insert`, row);
  return result$;
};

const modify = (key: string, row: Class): Promise<Class> => {
  let result$ = AxiosService.put<Class>(`classes/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Class> => {
  let result$ = AxiosService.remove<Class>(`classes/delete/${key}`);
  return result$;
};

const assignLessonsToClass = (payload: AssignLessonToClassRequest) => {
  let result$ = AxiosService.post<void>(
    `classes/assign-lessons-to-class`,
    payload
  );
  return result$;
};

const getClassLessons = (classId: string): Promise<ClassLesson[]> => {
  let result$ = AxiosService.get<ClassLesson[]>(
    `classes/get-class-lessons/${classId}`
  );
  return result$;
};

export const ClassService = {
  getAll,
  insert,
  modify,
  remove,
  assignLessonsToClass,
  getClassLessons,
};
