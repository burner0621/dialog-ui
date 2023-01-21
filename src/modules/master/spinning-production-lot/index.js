export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Nomor Lot Produksi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Nomor Lot Produksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Nomor Lot Produksi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Nomor Lot Produksi' },
        ]);
    }
}
