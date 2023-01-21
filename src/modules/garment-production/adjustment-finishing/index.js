export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Adjustment Finishing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Adjustment Finishing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Adjustment Finishing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Adjustment Finishing' },
        ]);
        this.router = router;
    }
}