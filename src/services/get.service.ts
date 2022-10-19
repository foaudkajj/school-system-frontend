import { InstallmentService } from "./installment.service";
import { StudentEvaluationService } from "./student-evaluation.service";
import { StudentService } from "./student.service";
import { TeacherService } from "./teacher.service";

const get = (
  serviceName: "STUDENT" | "STUDENT_EVALUATION" | "INSTALLMENT" | "TEACHER"
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

    default:
      return undefined;
  }
};

export const GetService = {
  get,
};
