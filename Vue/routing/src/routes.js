// import User from "./components/user/User";
// import UserStart from "./components/user/UserStart";
// import UserEdit from "./components/user/UserEdit";
// import UserDetail from "./components/user/UserDetail";
import Home from "./components/Home";
import Header from "./components/Header"

const User = resolve => {
  require.ensure(['./components/user/User'], () => {
    resolve(require('./components/user/User'));
  });
};
const UserStart = resolve => {
  require.ensure(['./components/user/UserStart'], () => {
    resolve(require('./components/user/UserStart'));
  });
};
const UserEdit = resolve => {
  require.ensure(['./components/user/UserEdit'], () => {
    resolve(require('./components/user/UserEdit'));
  });
};
const UserDetail = resolve => {
  require.ensure(['./components/user/UserDetail'], () => {
    resolve(require('./components/user/UserDetail'));
  });
};

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
      component: UserDetail,
      beforeEnter: (to, from, next) => {
        // some logic here
        next();
      }
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
