export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Outstanding Penjualan Ekspor' },
        ]);

        this.router = router;
    }
}
