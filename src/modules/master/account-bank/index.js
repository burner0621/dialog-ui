export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Akun Bank' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Akun Bank' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Akun Bank' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Akun Bank' },
            
        ]);

        this.router = router;
    }
}
