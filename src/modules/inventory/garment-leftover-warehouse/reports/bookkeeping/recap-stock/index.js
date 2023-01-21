export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Report Rekap Perediaan Gudang Sisa' },

        ]);

        this.router = router;
    }
}