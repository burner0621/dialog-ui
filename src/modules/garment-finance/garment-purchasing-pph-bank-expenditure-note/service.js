import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "garment-purchasing-pph-bank-expenditure-note";

export class Service extends RestService 
  {
  
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
        // return Promise.resolve(this.dataDummy);
    }

    posting(args){
        // return Promise.resolve(this.dataDummy);
        let endpoint = `${serviceUri}/posting`;
        return super.post(endpoint,args);
      }

    getPdfById(args){
      let endpoint = `${serviceUri}/pdf/${args}`;
      return super.getPdf(endpoint);
    }
    
    // getUnitPaymentOrders(info) {
    //   let endpoint = `${serviceUri}/loader/unit-payment-orders`;
    //   return super.list(endpoint, info);
    //   // return Promise.resolve(this.dataDummy);
    // }

    getById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        let endpoint = `${serviceUri}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }


    // dataDummy =
    // {
    //     "apiVersion": "1.0.0",
    //     "data": [
    //       {
    //         "Id": 48,
    //         "Date": "2020-11-09T17:00:00+00:00",
    //         "No": "Test",
    //         "CreatedUtc": "2020-11-10T08:17:03.9486861",
    //         "BankAccountName": "Test",
    //         "IncomeTaxName": "Test",
    //         "IncomeTaxRate": 1.5,
    //         "TotalDPP": 400,
    //         "TotalIncomeTax": 6,
    //         "Currency": "Test",
    //         "Items": [
    //           {
    //             "NumberOfNI": "Test",
    //             "PPHBankExpenditureNoteId": 48
    //           },
    //           {
    //             "NumberOfNI": "Test2",
    //             "PPHBankExpenditureNoteId": 48
    //           }
    //         ],
    //         "LastModifiedUtc": "2020-11-10T08:17:36.8551998",
    //         "IsPosted": false
    //       },
    //       {
    //         "Id": 47,
    //         "Date": "2020-11-08T17:00:00+00:00",
    //         "No": "Test",
    //         "CreatedUtc": "2020-11-09T03:16:49.3287015",
    //         "BankAccountName": "Test",
    //         "IncomeTaxName": "Test",
    //         "IncomeTaxRate": 1.5,
    //         "TotalDPP": 10,
    //         "TotalIncomeTax": 0.15,
    //         "Currency": "Test",
    //         "Items": [
    //           {
    //             "NumberOfNI": "Test",
    //             "PPHBankExpenditureNoteId": 47
    //           }
    //         ],
    //         "LastModifiedUtc": "2020-11-09T03:17:06.2211152",
    //         "IsPosted": false
    //       },
    //       {
    //         "Id": 46,
    //         "Date": "2020-11-05T17:00:00+00:00",
    //         "No": "Test",
    //         "CreatedUtc": "2020-11-06T03:50:52.0487259",
    //         "BankAccountName": "Test",
    //         "IncomeTaxName": "Test",
    //         "IncomeTaxRate": 1.5,
    //         "TotalDPP": 24,
    //         "TotalIncomeTax": 0.36,
    //         "Currency": "Test",
    //         "Items": [
    //           {
    //             "NumberOfNI": "Test",
    //             "PPHBankExpenditureNoteId": 46
    //           }
    //         ],
    //         "LastModifiedUtc": "2020-11-06T03:50:52.0487455",
    //         "IsPosted": false
    //       },
    //       {
    //         "Id": 45,
    //         "Date": "2020-11-03T17:00:00+00:00",
    //         "No": "Test",
    //         "CreatedUtc": "2020-11-04T04:10:53.8956958",
    //         "BankAccountName": "Test",
    //         "IncomeTaxName": "Test",
    //         "IncomeTaxRate": 1.5,
    //         "TotalDPP": 420,
    //         "TotalIncomeTax": 6.3,
    //         "Currency": "Test",
    //         "Items": [
    //           {
    //             "NumberOfNI": "Test",
    //             "PPHBankExpenditureNoteId": 45
    //           }
    //         ],
    //         "LastModifiedUtc": "2020-11-04T04:14:22.3330199",
    //         "IsPosted": true
    //       }
    //     ],
    //     "info": {
    //       "count": 16,
    //       "total": 16,
    //       "order": {
    //         "LastModifiedUtc": "desc"
    //       },
    //       "page": 1,
    //       "size": 25
    //     },
    //     "message": "Ok",
    //     "statusCode": 200
    //   };

}