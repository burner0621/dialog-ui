export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Bukti Pengeluaran Bank DPP + PPN' },
        ]);

        this.router = router;
    }
}
