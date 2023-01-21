export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Retur Proses' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Retur Proses' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Retur Proses' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Retur Proses' },
        ]);
        this.router = router;
    }
}