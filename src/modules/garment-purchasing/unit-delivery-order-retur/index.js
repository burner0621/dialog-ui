export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: DO Retur' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: DO Retur' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  DO Retur' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: DO Retur' },
        ]);

        this.router = router;
    }
}