export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Pertanggungjawaban Barang Reject dan Scrap' }
        ]);
        this.router = router;
    }
}
