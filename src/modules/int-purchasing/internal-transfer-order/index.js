export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Transfer Order Internal' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Transfer Order Internal' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Transfer Order Internal' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Transfer Order Internal' }
        ]);

        this.router = router;
    }
}