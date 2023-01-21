export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Laporan Rekap BUK Sample' },
        ]);

        this.router = router;
    }
}