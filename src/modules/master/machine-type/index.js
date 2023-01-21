export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Machine Type' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Machine Type' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Machine Type' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Machine Type' },
        ]);

        this.router = router;
    }
}
