export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Penerimaan Dokumen Disposisi Pembelian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Dokumen Disposisi Pembelian' },
        ]);

        this.router = router;
    }
}
