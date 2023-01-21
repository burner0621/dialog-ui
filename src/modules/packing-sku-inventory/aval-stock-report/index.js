export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Laporan Stock Gudang Aval' },
        ]);

        this.router = router;
    }
}