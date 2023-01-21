export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Memo Pembelian Job Garment' },
        ]);

        this.router = router;
    }
}
