export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Buku Pembelian Lokal Valas' },
        ]);

        this.router = router;
    }
}
