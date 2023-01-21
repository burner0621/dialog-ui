export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Perubahan Masukan Gudang Aval - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Perubahan Masukan Gudang Aval - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Perubahan Masukan Gudang Aval - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Perubahan Masukan Gudang Aval - Dyeing/Printing' },
        ]);

        this.router = router;
    }
}