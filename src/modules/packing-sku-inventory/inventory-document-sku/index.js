export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Dokumen Inventory SKU' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Dokumen Inventory SKU' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Dokumen Inventory SKU' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Dokumen Inventory SKU' },
        ]);

        this.router = router;
    }
}
