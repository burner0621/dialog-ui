export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Ekspedisi Penyerahan ke Verifikasi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Ekspedisi Penyerahan ke Verifikasi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Ekspedisi Penyerahan ke Verifikasi' }
        ]);

        this.router = router;
    }
}
