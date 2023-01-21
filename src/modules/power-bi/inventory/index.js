export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Inventory Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Inventory Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Inventory Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Inventory Reports'}
    ]);

    this.router = router;
  }
}