import StudentService from "./student.service";

export const get = (serviceName: "STUDENT") => {
  switch (serviceName) {
    case "STUDENT":
      return StudentService;

    default:
      return undefined;
  }
};

const GetService = {
  get,
};

export default GetService;
