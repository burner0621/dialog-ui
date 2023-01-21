export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Term of Payment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Term of Payment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Term of Payment' }
        ]);

        this.router = router;
    }
}
