export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Laporan Stock Dyeing Printing' },
        ]);

        this.router = router;
    }
}