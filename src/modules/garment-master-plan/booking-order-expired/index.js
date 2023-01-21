export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Booking' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Booking' },
            { route: 'detail/:id', moduleId: './detail', name: 'detail', nav: false, title: 'Detail: Master Plan' }
        ]);

        this.router = router;
    }
}