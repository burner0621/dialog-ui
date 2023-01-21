export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Bukti Pengeluaran Bank Lain-lain' },
        ]);

        this.router = router;
    }
}
