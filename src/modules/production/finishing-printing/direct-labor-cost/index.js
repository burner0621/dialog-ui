export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Biaya Upah Tenaga Kerja Langsung' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Biaya Upah Tenaga Kerja Langsung' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Biaya Upah Tenaga Kerja Langsung' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Biaya Upah Tenaga Kerja Langsung' }
        ]);

        this.router = router;
    }
}