export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Flow Pengeluaran' },
        ]);

        this.router = router;
    }
}