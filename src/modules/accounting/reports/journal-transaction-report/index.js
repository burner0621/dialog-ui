export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Journal Transaksi' },
        ]);

        this.router = router;
    }
}
