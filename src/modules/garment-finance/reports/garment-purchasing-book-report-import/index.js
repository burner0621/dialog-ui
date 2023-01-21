export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Buku Pembelian Import' },
        ]);

        this.router = router;
    }
}
