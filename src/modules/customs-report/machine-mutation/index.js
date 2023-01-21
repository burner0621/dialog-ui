export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Pertanggungjawaban Mutasi Mesin dan Peralatan' }
        ]);
        this.router = router;
    }
}
