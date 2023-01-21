export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Rate Mingguan - USD' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Rate Mingguan - USD' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Rate Mingguan - USD' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Rate Mingguan - USD' }
        ]);
    }
}
