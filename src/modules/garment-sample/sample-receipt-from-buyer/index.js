export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Penerimaan Barang Jadi Sample Dari Buyer' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Barang Jadi Sample Dari Buyer' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Penerimaan Barang Jadi Sample Dari Buyer' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Penerimaan Barang Jadi Sample Dari Buyer' },
        ]);

        this.router = router;
    }
}