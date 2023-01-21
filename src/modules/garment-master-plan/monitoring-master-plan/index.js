export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Report Master Plan' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Report Master Plan' },
        ]);

        this.router = router;
    }
}