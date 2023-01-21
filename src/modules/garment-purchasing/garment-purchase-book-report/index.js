export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Buku Harian Pembelian Term Of Payment' },
        ]);

        this.router = router;
    }
}