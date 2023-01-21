export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jurnal Penjualan Export' }
        ]);
        this.router = router;
    }
}
