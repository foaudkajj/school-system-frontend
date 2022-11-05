import { withNavigationWatcher } from "./contexts/navigation";
import {
  HomePage,
  DisplayDataPage,
  ProfilePage,
  StudentsPage,
  StudentEvaluationPage,
  InstallemntPage,
  TeacherPage,
  ClassLessonPage,
  UserPage,
} from "./pages";

const routes = [
  {
    path: "/display-data",
    component: <DisplayDataPage />,
  },
  {
    path: "/profile",
    component: <ProfilePage />,
  },
  {
    path: "/home",
    component: <HomePage />,
  },
  {
    path: "/students",
    component: <StudentsPage />,
  },
  {
    path: "/student-evaluation",
    component: <StudentEvaluationPage />,
  },
  {
    path: "/installments",
    component: <InstallemntPage />,
  },
  {
    path: "/teachers",
    component: <TeacherPage />,
  },
  {
    path: "/class-lesson",
    component: <ClassLessonPage />,
  },
  {
    path: "/users",
    component: <UserPage />,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
