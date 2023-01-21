export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sewing In' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sewing In' },
        ]);
        this.router = router;
    }
}