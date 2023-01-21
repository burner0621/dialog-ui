export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Verifikasi Surat Perintah Bayar' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Verifikasi Surat Perintah Bayar' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Verifikasi Surat Perintah Bayar' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Verifikasi Surat Perintah Bayar' },
            { route: 'monitoring-purchase/:no', moduleId: './monitoring-purchase', name: 'monitoring-purchase-request', nav: false, title: 'View:Detail Purchase Request' }
        ]);

        this.router = router;
    }
}
