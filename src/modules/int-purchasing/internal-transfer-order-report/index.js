export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Internal Transfer Order' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Internal Transfer Order' },
        ]);

        this.router = router;
    }
}
