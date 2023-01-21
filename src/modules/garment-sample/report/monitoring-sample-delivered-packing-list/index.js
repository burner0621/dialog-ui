export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Monitoring Packing List' },
            // { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Sample' },
        ]);

        this.router = router;
    }
}