export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Dokumen Inventory' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Dokumen Inventory' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Dokumen Inventory' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Dokumen Inventory' },
        ]);

        this.router = router;
    }
}
