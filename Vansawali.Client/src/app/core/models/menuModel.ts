

    export class MenuModel{
        public UserView:Array<any>= [ {
            title: 'Login',
            url: '/login',
            icon: 'login'
        },
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Sajara',
            url: '/sajara',
            icon: 'sajara'
        }];
        public AdminView:Array<any>= [{
            title: 'Logout',
            url: null,
            icon: 'logout'
        },
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Sajara',
            url: '/sajara',
            icon: 'sajara'
        },
        {
            title: 'Admin',
            url: '/admin',
            icon: 'admin'
        }];
    }

export let Menu=new MenuModel();