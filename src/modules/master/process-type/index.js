export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Jenis Proses' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jenis Proses' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jenis Proses' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jenis Proses' },
            
        ]);

        this.router = router;
    }
}
