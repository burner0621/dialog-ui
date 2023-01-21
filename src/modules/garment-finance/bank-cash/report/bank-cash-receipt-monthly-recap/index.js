export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Rekap memo per Bulan' }
        ]);
        this.router = router;
    }
}
