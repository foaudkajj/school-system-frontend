import { withNavigationWatcher } from "./contexts/navigation";
import {
  HomePage,
  DisplayDataPage,
  ProfilePage,
  StudentsPage,
  StudentEvaluationPage,
  InstallemntPage,
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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
