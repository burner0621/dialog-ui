export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Revisi Tanggal Bon Keluar Unit ' },
        ]);

        this.router = router;
    }
}