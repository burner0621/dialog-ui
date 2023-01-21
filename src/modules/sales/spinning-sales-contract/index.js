export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Spinning Sales Contract' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Spinning Sales Contract' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Spinning Sales Contract' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Spinning Sales Contract' },
        ]);

        this.router = router;
    }
}