export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penerimaan Dokumen Disposisi Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Dokumen Disposisi Garment' },
        ]);

        this.router = router;
    }
}
