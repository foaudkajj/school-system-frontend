import StudentEvaluationService from "./student-evaluation.service";
import StudentService from "./student.service";

export const get = (serviceName: "STUDENT" | "STUDENT_EVALUATION") => {
  switch (serviceName) {
    case "STUDENT":
      return StudentService;

    case "STUDENT_EVALUATION":
      return StudentEvaluationService;
    default:
      return undefined;
  }
};

const GetService = {
  get,
};

export default GetService;
