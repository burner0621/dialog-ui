export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Verifikasi Realisasi VB' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Verifikasi Realisasi VB' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Verifikasi Realisasi VB' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Verifikasi Realisasi VB' }
        ]);

        this.router = router;
    }
}
