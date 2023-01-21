export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Verifikasi Nota Intern' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Verifikasi Nota Intern' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Verifikasi Nota Intern' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Verifikasi Nota Intern' }
        ]);

        this.router = router;
    }
}
