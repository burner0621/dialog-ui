export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Step' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Step' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Step' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Step' }
        ]);

        this.router = router;
    }
}