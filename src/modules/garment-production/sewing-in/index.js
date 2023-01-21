export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sewing In' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sewing In' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sewing In' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sewing In' },
        ]);
        this.router = router;
    }
}