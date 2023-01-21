export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bon Retur Barang - Pembelian' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bon Retur Barang - Pembelian' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bon Retur Barang - Pembelian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bon Retur Barang - Pembelian' }
        ]);

        this.router = router;
    }
}
