export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Weaving Sales Contract' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Weaving Sales Contract' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Weaving Sales Contract' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Weaving Sales Contract' },
        ]);

        this.router = router;
    }
}