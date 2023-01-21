export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Count' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Count' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Count' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Count' }
        ]);

        this.router = router;
    }
}