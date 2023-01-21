export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Flow Barang Produksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Flow Barang Produksi' },
        ]);

        this.router = router;
    }
}