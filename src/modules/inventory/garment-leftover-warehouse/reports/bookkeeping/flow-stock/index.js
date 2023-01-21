export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Report Stock Gudang Sisa - BARANG JADI' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View : Report Stock Gudang Sisa  - BARANG JADI' },
        ]);

        this.router = router;
    }
}