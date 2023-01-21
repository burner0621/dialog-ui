export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Finishing Printing Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Finishing Printing Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Finishing Printing Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Finishing Printing Reports'}
    ]);

    this.router = router;
  }
}