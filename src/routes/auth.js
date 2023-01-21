module.exports = [
    {
        route: 'auth/accounts',
        name: 'accounts',
        moduleId: './modules/auth/account/index',
        nav: true,
        title: 'Account',
        auth: true,
        settings: {
            group: "Auth",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'auth/roles',
        name: 'roles',
        moduleId: './modules/auth/role/index',
        nav: true,
        title: 'Role',
        auth: true,
        settings: {
            group: "Auth",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    }]
