export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Pengiriman Barang Gudang Jadi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pengiriman Barang Gudang Jadi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pengiriman Barang Gudang Jadi' }
        ]);

        this.router = router;
    }
}