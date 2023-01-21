module.exports = [
    {
        route: ['', 'Welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: false,
        title: 'Home',
        auth: true,
        settings: {
            permission: { "*": 0 }

        }
    }
    ]
