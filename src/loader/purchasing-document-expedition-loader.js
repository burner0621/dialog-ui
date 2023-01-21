import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'expedition/purchasing-document-expeditions';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10  })
        .then(results => {
            var data=[];
            for (var a of results.data){
                if(data.lengh==0){
                    data.push(a);
                }
                else{
                    var dup= data.find(c=>c.UnitPaymentOrderNo==a.UnitPaymentOrderNo);
                    if(!dup){
                        data.push(a);
                    }
                }
            }
            return data;
        });
}
