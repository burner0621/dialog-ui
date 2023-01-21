export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit' },
        ]);

        this.router = router;
    }
}
