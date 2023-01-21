export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Retur Barang Dari Buyer' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Retur Barang Dari Buyer' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Retur Barang Dari Buyer' },
            //{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Retur Barang Dari Buyer' },
        ]);

        this.router = router;
    }
}