export const navigation = [
  {
    text: "الصفحة الرئيسية",
    path: "/home",
    icon: "home",
  },
  {
    text: "إدارة الطلاب",
    icon: "user",
    items: [
      {
        text: "المسجلين",
        icon: "runner",
        path: "/students",
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
        text: 'Display Data',
        path: '/display-data'
      }
    ],
  },
];
