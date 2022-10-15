export const navigation = [
  {
    text: "الصفحة الرئيسية",
    path: "/home",
    icon: "home",
  },
  {
    text: "إدارة الطلاب",
    icon: "fa-solid fa-users",
    items: [
      {
        text: "المسجلين",
        icon: "fa-solid fa-user",
        path: "/students",
      },
      {
        text: "التقييم",
        icon: "fa-solid fa-chalkboard-user",
        path: "/student-evaluation",
      },
      {
        text: "الدفعات",
        icon: "fa-solid fa-credit-card",
        path: "/installments",
      },
    ],
  },
  {
    text: "Examples",
    icon: "folder",
    items: [
      {
        text: "Profile",
        path: "/profile",
      },
      {
        text: "Display Data",
        path: "/display-data",
      },
    ],
  },
];
