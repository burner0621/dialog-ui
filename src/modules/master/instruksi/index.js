export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Instruksi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Instruksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Instruksi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Instruksi' },
        ]);
    }
}