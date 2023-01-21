export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Verifikasi Disposisi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Verifikasi Disposisi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Verifikasi Disposisi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Verifikasi Disposisi' },
            { route: 'monitoring-purchase/:no', moduleId: './monitoring-purchase', name: 'monitoring-purchase-request', nav: false, title: 'View:Detail Purchase Request' }
        ]);

        this.router = router;
    }
}
