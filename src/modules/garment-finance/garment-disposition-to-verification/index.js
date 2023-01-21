export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penyerahan Dokumen Disposisi Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penyerahan Dokumen Disposisi Garment' },
        ]);

        this.router = router;
    }
}
