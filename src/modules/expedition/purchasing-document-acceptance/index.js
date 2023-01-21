export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Penerimaan Dokumen Pembelian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Dokumen Pembelian' },
        ]);

        this.router = router;
    }
}
