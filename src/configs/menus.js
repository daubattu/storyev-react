const menus = [
  {
    path: '/',
    name: 'Thong ke',
    icon: 'home'
  },
  {
    path: "/users",
    name: "Nguoi dung",
    icon: "user",
    subMenus: [
      {
        path: "/users/:id",
        name: "Chi tiet nguoi dung",
        hiden: true        
      }
    ]
  },
  {
    path: "/stories",
    name: "Truyen chem",
    icon: "book",
    subMenus: [
      {
        path: "/stories/add",
        name: "Them truyen chem",
        hiden: true        
      },
      {
        path: "/stories/edit/:id",
        name: "Chỉnh sửa truyen chem",
        hiden: true        
      },
      {
        path: "/stories/:id",
        name: "Chi tiet truyen chem",
        hiden: true        
      }
    ]
  },
  {
    path: "/new-words",
    name: "Tu moi",
    icon: "tag"
  }
];

export default menus;