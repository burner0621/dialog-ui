export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Adjustment Cutting' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Adjustment Cutting' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Adjustment Cutting' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Adjustment Cutting' },
        ]);
        this.router = router;
    }
}