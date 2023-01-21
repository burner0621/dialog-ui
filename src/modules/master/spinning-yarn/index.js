export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Benang Spinning' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Benang Spinning' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Benang Spinning' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Benang Spinning' }
        ]);
    }
}