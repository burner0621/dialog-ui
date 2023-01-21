export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Adjustment Sewing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Adjustment Sewing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Adjustment Sewing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Adjustment Sewing' },
        ]);
        this.router = router;
    }
}