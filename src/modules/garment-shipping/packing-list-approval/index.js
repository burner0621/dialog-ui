export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View' },
            { route: 'approve/:id', moduleId: './edit', name: 'approve', nav: false, title: 'Approve' },
        ]);

        this.router = router;
    }
}
