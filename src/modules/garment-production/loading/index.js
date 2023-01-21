export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Loading' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Loading' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Loading' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Loading' },
        ]);
        this.router = router;
    }
}