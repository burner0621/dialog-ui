import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'material-distribution-notes';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory-azure");

    return endpoint.find(`${resource}/${filter.Id}`)
        .then(result => {
            let data = result.data;

            let details = [];

            for (let item of data.MaterialDistributionNoteItems) {
                let d = item.MaterialDistributionNoteDetails.filter(p => p.Supplier.name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 || p.Supplier.code.toUpperCase().indexOf(keyword.toUpperCase()) !== -1);
                details = details.concat(d);
            }

            let group = [];

            for (let detail of details) {
                let exists = group.find(p => p.name === detail.Supplier.name);

                if (!exists) {
                    group.push({
                        _id:detail.Supplier._id,
                        name: detail.Supplier.name,
                        details: [detail]
                    });
                }
                else {
                    exists.details.push(detail);
                }
            }

            //console.log(group);

            return group;
        });
}