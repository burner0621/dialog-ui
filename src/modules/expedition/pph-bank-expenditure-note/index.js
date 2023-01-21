export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pengajuan Pembayaran PPH' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pengajuan Pembayaran PPH' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pengajuan Pembayaran PPH' },
        ]);

        this.router = router;
    }
}
