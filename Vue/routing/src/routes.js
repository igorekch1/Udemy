import User from "./components/user/User";
import UserStart from "./components/user/UserStart";
import UserEdit from "./components/user/UserEdit";
import UserDetail from "./components/user/UserDetail";
import Home from "./components/Home";
import Header from "./components/Header"

export const routes = [{
    path: '/',
    name: "home",
    components: {
      default: Home,
      'header-top': Header
    }
  },
  {
    path: '/user',
    components: {
      default: User,
      'header-top': Header
    },
    children: [{
      path: '',
      component: UserStart // if you put / - it will attach to your domain
    }, {
      path: ':id',
      component: UserDetail
    }, {
      path: ':id/edit',
      component: UserEdit,
      name: 'userEdit'
    }],
    props: true
  },
  {
    path: 'redirect-me',
    redirect: '/user'
  },
  {
    path: '*',
    redirect: '/'
  }
];
