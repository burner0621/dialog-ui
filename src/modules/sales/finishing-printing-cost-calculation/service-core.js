import { RestService } from '../../../utils/rest-service';

const productSingleByNameServiceUri = 'master/products';
const uomServiceUri = 'master/uoms';

export class ServiceCore extends RestService {

  constructor(http, aggregator, config) {
    super(http, aggregator, config, "core");
  }

  getById(id) {
    var endpoint = `${productSingleByNameServiceUri}/${id}`;
    return super.get(endpoint)
      .then((result) => {
        return result;
      })
  }

  getUomByUnit(unit) {
    var endpoint = `${uomServiceUri}?keyword=${unit}`;
    return super.get(endpoint)
      .then((result) => {
        if (result && result.length > 0) {
          return result[0];
        } else {
          return null;
        }
      })
  }

}
