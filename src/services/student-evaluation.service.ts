import { StudentEvaluation } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<StudentEvaluation[]> => {
  let result$ = AxiosService.get<StudentEvaluation[]>(`student-evaluation/get`);
  return result$;
};

const insert = (row: StudentEvaluation): Promise<StudentEvaluation> => {
  let result$ = AxiosService.post<StudentEvaluation>(
    `student-evaluation/insert`,
    row
  );
  return result$;
};

const modify = (
  key: string,
  row: StudentEvaluation
): Promise<StudentEvaluation> => {
  let result$ = AxiosService.put<StudentEvaluation>(
    `student-evaluation/update/${key}`,
    row
  );
  return result$;
};

const remove = (key: string): Promise<StudentEvaluation> => {
  let result$ = AxiosService.remove<StudentEvaluation>(
    `student-evaluation/delete/${key}`
  );
  return result$;
};

export const StudentEvaluationService = {
  getAll,
  insert,
  modify,
  remove,
};

