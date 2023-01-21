export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jenis Lusi - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jenis Lusi - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jenis Lusi - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jenis Lusi - Dyeing/Printing' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Jenis Lusi - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}
