export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Purchase Order External' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Purchase Order External' },
        ]);

        this.router = router;
    }
}