export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Finishing In' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Finishing In' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Finishing In' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Finishing In' },
        ]);
        this.router = router;
    }
}