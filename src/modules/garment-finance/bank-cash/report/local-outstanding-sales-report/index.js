export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Outstanding Penjualan Lokal' },
        ]);

        this.router = router;
    }
}
