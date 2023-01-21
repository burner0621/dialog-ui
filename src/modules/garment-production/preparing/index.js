export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Preparing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Preparing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Preparing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Preparing' },
        ]);

        this.router = router;
    }
}