export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Subcon Contract' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Subcon Contract' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Subcon Contract' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Subcon Contract' },
        ]);
        this.router = router;
    }
}