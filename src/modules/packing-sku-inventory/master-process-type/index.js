export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Jenis Lebar - Dyeing & Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Jenis Lebar - Dyeing & Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Master Jenis Lebar - Dyeing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Jenis Lebar - Dyeing & Printing' },
        ]);

        this.router = router;
    }
}