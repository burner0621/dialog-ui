export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Bon Pengantar Greige' }
        ]);
        this.router = router;
    }
}
