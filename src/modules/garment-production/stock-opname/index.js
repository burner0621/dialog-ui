export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'download', moduleId: './download', name: 'download', nav: false, title: 'Download' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View' },
        ]);
        this.router = router;
    }
}