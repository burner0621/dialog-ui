export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Saldo Akhir Per Jenis' }
        ]);
        this.router = router;
    }
}