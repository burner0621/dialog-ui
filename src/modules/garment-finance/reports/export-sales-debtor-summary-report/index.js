export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Debitur Penjualan Ekspor (IDR)' },
        ]);

        this.router = router;
    }
}
