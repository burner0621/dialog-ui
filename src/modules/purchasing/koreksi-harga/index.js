export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Koreksi Harga' }, 
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Koreksi Harga' }, 
        ]);

        this.router = router;
    }
}
