export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sewing Out' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sewing Out' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sewing Out' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sewing Out' },
        ]);
        this.router = router;
    }
}