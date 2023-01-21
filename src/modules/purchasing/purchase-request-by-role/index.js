export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Purchase Request' }, 
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Purchase Request' }, 
        ]);

        this.router = router;
    }
}