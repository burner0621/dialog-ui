export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Lusi Pakan - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Lusi Pakan - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Lusi Pakan - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Lusi Pakan - Dyeing/Printing' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Lusi Pakan - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}
