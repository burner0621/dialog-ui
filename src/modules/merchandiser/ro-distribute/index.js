export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Daftar' },
            // { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'Detail' },
            // { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Ubah' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Buat' }
        ]);

        this.router = router;
    }
}