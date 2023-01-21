import { RestService } from '../../../utils/rest-service';
const serviceUri = 'dyeing-printing-packaging-note';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }
    getListDummy(args){
        var data = [
            {
             "id":1,
             "date"    :"2020-01-01",
             "noBon"   :"PC.20.001" ,
             "noSpp"   :"P01"       ,
             "buyer"   :"Dadang"    ,
             "shift"   :"Pagi"      ,
             "material":"PC 01010"  ,
             "unit"    :"Unit 1"    ,        
             "warna"   :"White"     ,
             "motif"   :"M01"       ,
             "grade"   :"A"         ,
             "mtr"     :"200"       ,
             "yds"     :"100"       ,
             "saldo"   :"-100"
            },
            {
             "id":2, 
             "date"    :"2020-01-01",
             "noBon"   :"PC.20.001" ,
             "noSpp"   :"P03"       ,
             "buyer"   :"Juleha"    ,
             "shift"   :"Siang"      ,
             "material":"AU21"  ,
             "unit"    :"Unit 1"    ,        
             "warna"   :"Chocolate"     ,
             "motif"   :"DS"       ,
             "grade"   :"B"         ,
             "mtr"     :"200"       ,
             "yds"     :"100"       ,
             "saldo"   :"-100"
            },
            { 
             "id":3,
             "date"    :"2020-01-01",
             "noBon"   :"PC.20.001" ,
             "noSpp"   :"P02"       ,
             "buyer"   :"Opie"    ,
             "shift"   :"Pagi"      ,
             "material":"PC 01010"  ,
             "unit"    :"Unit 1"    ,        
             "warna"   :"White"     ,
             "motif"   :"M01"       ,
             "grade"   :"A"         ,
             "mtr"     :"200"       ,
             "yds"     :"100"       ,
             "saldo"   :"-100"
            }
            
        ]
        return Promise.resolve().then(result => {return data;});
    }
    getDummy(args){
        var data = {
             "id":1,
             "date"    :"2020-01-01",
             "noBon"   :"PC.20.001" ,
             "noSpp"   :"P01"       ,
             "buyer"   :"Dadang"    ,
             "shift"   :"Pagi"      ,
             "material":"PC 01010"  ,
             "unit"    :"Unit 1"    ,        
             "warna"   :"White"     ,
             "motif"   :"M01"       ,
             "grade"   :"A"         ,
             "mtr"     :"200"       ,
             "yds"     :"100"       ,
             "saldo"   :"-100"
            }
        return Promise.resolve().then(result => {return data;});
    }
}