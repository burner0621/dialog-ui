export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penyerahan Dokumen Pembelian Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penyerahan Dokumen Pembelian Garment' },
        ]);

        this.router = router;
    }
}
