export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Hari Libur' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Hari Libur' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Hari Libur' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Hari Libur' }
        ]);
    }
}
