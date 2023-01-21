export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'LAPORAN EKSPEDISI DISPOSISI PEMBAYARAN' },
        ]);

        this.router = router;
    }
}
