export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Surat Jalan Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Surat Jalan Garment' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Surat Jalan Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Surat Jalan Garment' },
        ]);

        this.router = router;
    }
}