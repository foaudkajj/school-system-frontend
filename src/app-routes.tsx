import { withNavigationWatcher } from "./contexts/navigation";
import { HomePage, DisplayDataPage, ProfilePage, StudentsPage, StudentEvaluationPage } from "./pages";

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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
