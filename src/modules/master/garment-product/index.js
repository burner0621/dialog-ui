export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Garment Products' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Garment Product' }
        ]);
    }
}
