export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jenis Pakan - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jenis Pakan - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jenis Pakan - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jenis Pakan - Dyeing/Printing' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Jenis Pakan - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}
