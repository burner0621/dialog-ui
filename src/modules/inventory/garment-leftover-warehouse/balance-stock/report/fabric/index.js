export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Report Stock Gudang Sisa - FABRIC' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View : Report Stock Gudang Sisa - FABRIC' },
        ]);

        this.router = router;
    }
}