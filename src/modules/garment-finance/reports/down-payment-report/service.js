import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-down-payments";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
      }
      search(info) {
        // info.isImportSupplier = true;
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
      }
      getXls(info) {
        let endpoint = `${serviceUri}/xls?supplierType=${info.supplierType}&date=${info.date}`;
        return super.getXls(endpoint);
      }
    
    
    //   getXls(info) {
    //     let endpoint = `${serviceUri}/downloads/xls?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${false}&isImportSupplier=${true}`;
    //     return super.getXls(endpoint);
    //   }

    searchDummy(info) {
        var dummyData= [
            {
                "DispositionId": 1,
                "DispositionNo": "201758",
                "DispositionDueDate": "2021-03-24T17:00:00+00:00",
                "DispositionPayments":[
                    {
                        "DispositionPaymentId": 14,
                        "DispositionPaymentNo": "2104MDTR01K0002",
                        "DispositionPaymentDate": "2021-01-05T17:00:00+00:00",
                        "BankExpenditureDate":"2021-01-05T17:00:00+00:00",
                        "BankExpenditureNo":"21PVK00002",
                        "DispositionNo":"201758",
                        "SupplierName":"TAG IT",
                        "DownPaymentDuration":54,
                        "InitialBalanceDispositionAmount":0,
                        "InitialBalancePaymentAmount":338.69,
                        "InitialBalanceCurrencyRate":14105.01,
                        "InitialBalanceCurrencyAmount":4777225.84,
                        "DownPaymentDispositionAmount":0,
                        "DownPaymentDispositionPaymentAmount":0,
                        "DownPaymentCurrencyRate":0,
                        "DownPaymentCurrencyAmount":0,
                        "LastBalanceCurrencyCode":"USD",
                        "LastBalanceCurrencyRate":14105.01,
                        "LastBalanceCurrencyAmount":4777225.84
                    }
                ],
                "MemoDocuments":
                []
            },
            {
                "DispositionId": 2,
                "DispositionNo": "201737/12.20",
                "DispositionDueDate": "2021-03-24T17:00:00+00:00",
                "DispositionPayments":[
                    {
                        "DispositionPaymentId": 14,
                        "DispositionPaymentNo": "21PVK00005",
                        "DispositionPaymentDate": "2021-01-05T17:00:00+00:00",
                        "BankExpenditureDate":"2021-01-05T17:00:00+00:00",
                        "BankExpenditureNo":"21PVK00005",
                        "DispositionNo":"201737/12.20",
                        "SupplierName":"TEXBANK LIMITED",
                        "DownPaymentDuration":54,
                        "InitialBalanceDispositionAmount":0,
                        "InitialBalancePaymentAmount":17512.35,
                        "InitialBalanceCurrencyRate":14105.01,
                        "InitialBalanceCurrencyAmount":247011871.87,
                        "DownPaymentDispositionAmount":0,
                        "DownPaymentDispositionPaymentAmount":0,
                        "DownPaymentCurrencyRate":0,
                        "DownPaymentCurrencyAmount":0,
                        "LastBalanceCurrencyCode":"USD",
                        "LastBalanceCurrencyRate":14105.01,
                        "LastBalanceCurrencyAmount":0
                    },
                    {
                        "DispositionPaymentId": 14,
                        "DispositionPaymentNo": "21PVK00006",
                        "DispositionPaymentDate": "2021-02-11T17:00:00+00:00",
                        "BankExpenditureDate":"2021-02-11T17:00:00+00:00",
                        "BankExpenditureNo":"21PVK00006",
                        "DispositionNo":"201737/12.20",
                        "SupplierName":"TEXBANK LIMITED",
                        "DownPaymentDuration":54,
                        "InitialBalanceDispositionAmount":0,
                        "InitialBalancePaymentAmount":0,
                        "InitialBalanceCurrencyRate":0,
                        "InitialBalanceCurrencyAmount":0,
                        "DownPaymentDispositionAmount":0,
                        "DownPaymentDispositionPaymentAmount":0,
                        "DownPaymentCurrencyRate":0,
                        "DownPaymentCurrencyAmount":0,
                        "LastBalanceCurrencyCode":"USD",
                        "LastBalanceCurrencyRate":14105.01,
                        "LastBalanceCurrencyAmount":0
                    }
                ],
                "MemoDocuments":
                [
                    {
                        "MemoNo":"",
                        "MemoDate":null,
                        "RealizationDownPaymentCurrencyTotal":0,
                        "RealizationDownPaymentCurrencyRate":0,
                        "RealizationDownPaymentCurrencyAmount":0,
                        "InternNoteDate":null,
                        "InternNoteNo":"NI21020079I",
                        "DeliveryOrderNo":"",
                        "DeliveryOrderDate":"",
                        "PaymentNo":"BP210211095112000023",
                        "PaymentDescription":"BP210211095112000023 BP Desc",
                        "PaymentCurrencyCode":"USD",
                        "PaymentCurrencyRate":17262.90,
                        "PaymentCurrencyAmount":244011264.13,
                        "DifferenceCurrencyRate":0,
                    },
                    {
                        "MemoNo":"",
                        "MemoDate":"",
                        "RealizationDownPaymentCurrencyTotal":0,
                        "RealizationDownPaymentCurrencyRate":0,
                        "RealizationDownPaymentCurrencyAmount":0,
                        "InternNoteDate":"",
                        "InternNoteNo":"",
                        "DeliveryOrderNo":"",
                        "DeliveryOrderDate":"",
                        "PaymentNo":"BP210106132136000006",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"USD",
                        "PaymentCurrencyRate":161.5,
                        "PaymentCurrencyAmount":2266654.12,
                        "DifferenceCurrencyRate":0,
                    },
                    {
                        "MemoNo":"",
                        "MemoDate":null,
                        "RealizationDownPaymentCurrencyTotal":0,
                        "RealizationDownPaymentCurrencyRate":0,
                        "RealizationDownPaymentCurrencyAmount":0,
                        "InternNoteDate":null,
                        "InternNoteNo":"NK21020022I",
                        "DeliveryOrderNo":"",
                        "DeliveryOrderDate":"",
                        "PaymentNo":"BP210211095112000023",
                        "PaymentDescription":"BP210211095112000023 BP Desc",
                        "PaymentCurrencyCode":"USD",
                        "PaymentCurrencyRate":-93,
                        "PaymentCurrencyAmount":-1305255.93,
                        "DifferenceCurrencyRate":0,
                    },
                    {
                        "MemoNo":"",
                        "MemoDate":"",
                        "RealizationDownPaymentCurrencyTotal":0,
                        "RealizationDownPaymentCurrencyRate":0,
                        "RealizationDownPaymentCurrencyAmount":0,
                        "InternNoteDate":"",
                        "InternNoteNo":"",
                        "DeliveryOrderNo":"",
                        "DeliveryOrderDate":"",
                        "PaymentNo":"BP210106132136000006",
                        "PaymentDescription":"BP Desc",
                        "PaymentCurrencyCode":"USD",
                        "PaymentCurrencyRate":161.5,
                        "PaymentCurrencyAmount":2266654.12,
                        "DifferenceCurrencyRate":0,
                    },
                ]
            },
            {
                "DispositionId": 3,
                "DispositionNo": "201771/NT/10.20",
                "DispositionDueDate": "2021-03-24T17:00:00+00:00",
                "DispositionPayments":[
                    {
                        "DispositionPaymentId": 14,
                        "DispositionPaymentNo": "21PVK00010",
                        "DispositionPaymentDate": "2021-01-05T17:00:00+00:00",
                        "BankExpenditureDate":"2021-01-07T17:00:00+00:00",
                        "BankExpenditureNo":"21PVK00010",
                        "DispositionNo":"201771/NT/10.20",
                        "SupplierName":"ZHEJIANG SUNRISE GARMENT",
                        "DownPaymentDuration":52,
                        "InitialBalanceDispositionAmount":7325,
                        "InitialBalancePaymentAmount":9239.70,
                        "InitialBalanceCurrencyRate":14105.01,
                        "InitialBalanceCurrencyAmount":116221050,
                        "DownPaymentDispositionAmount":7325,
                        "DownPaymentDispositionPaymentAmount":0,
                        "DownPaymentCurrencyRate":0,
                        "DownPaymentCurrencyAmount":0,
                        "LastBalanceCurrencyCode":"EUR",
                        "LastBalanceCurrencyRate":0,
                        "LastBalanceCurrencyAmount":0
                    }
                ],
                "MemoDocuments":
                [
                    {
                        "MemoNo":"",
                        "MemoDate":null,
                        "RealizationDownPaymentCurrencyTotal":0,
                        "RealizationDownPaymentCurrencyRate":0,
                        "RealizationDownPaymentCurrencyAmount":0,
                        "InternNoteDate":null,
                        "InternNoteNo":"NI21020080I",
                        "DeliveryOrderNo":"",
                        "DeliveryOrderDate":"",
                        "PaymentNo":"BP210211095101000023",
                        "PaymentDescription":"BP210211095101000023 BP Desc",
                        "PaymentCurrencyCode":"EUR",
                        "PaymentCurrencyRate":7325,
                        "PaymentCurrencyAmount":102806448.25,
                        "DifferenceCurrencyRate":0,
                    }
                ]
            }
        ];

        var response = {
            "apiVersion":"1.0.0",
            "data": dummyData,
            "info":{
                "count":25,
                "order":{
                    "LastModifiedUtc":"desc",
                },
                "page":1,
                "size":25,
                "total":149
            },
            "message":"Ok",
            "statusCode":200
        }
        return Promise.resolve(response);
      }
}