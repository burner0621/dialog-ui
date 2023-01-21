export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penerimaan Dokumen Pembelian Garment dari Verifikasi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Dokumen Pembelian Garment dari Verifikasi' },
        ]);

        this.router = router;
    }
}
