import { ClassService } from "./class.service";
import { InstallmentService } from "./installment.service";
import { LessonService } from "./lesson.service";
import { StudentEvaluationService } from "./student-evaluation.service";
import { StudentService } from "./student.service";
import { TeacherService } from "./teacher.service";

const get = (
  serviceName:
    | "STUDENT"
    | "STUDENT_EVALUATION"
    | "INSTALLMENT"
    | "TEACHER"
    | "CLASS"
    | "LESSON"
) => {
  switch (serviceName) {
    case "STUDENT":
      return StudentService;

    case "STUDENT_EVALUATION":
      return StudentEvaluationService;

    case "INSTALLMENT":
      return InstallmentService;

    case "TEACHER":
      return TeacherService;

    case "CLASS":
      return ClassService;

    case "LESSON":
      return LessonService;

    default:
      return undefined;
  }
};

export const GetService = {
  get,
};
