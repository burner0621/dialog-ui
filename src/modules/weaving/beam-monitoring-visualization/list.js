import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.router = router;
    this.service = service;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
    this.phase = ["EmptyStock", "Warping", "Sizing", "Reaching", "Tying", "Loom"]
    this.map = [];

    for (var phase of this.phase) {
      this.map[phase] = {
        beam: []
      };
    }

    this.stages = [{
        name: "Stok Kosong",
        phase: "EmptyStock",
        map: this.map["EmptyStock"]
      },
      {
        name: "Proses Sizing",
        phase: "Sizing",
        map: this.map["Sizing"]
      },
      {
        name: "Proses Reaching",
        phase: "Reaching",
        map: this.map["Reaching"]
      },
      {
        name: "Proses Loom",
        phase: "Loom",
        map: this.map["Loom"]
      }
    ];

    this.index = 0;
    this.count = 0;
  }

  async activate() {
    await this.getData();
  }

  async getData() {
    await this.service.search()
      .then((result) => {
        this.count = result.length;

        for (var data of result) {
          var phase = "EmptyStock";
          var beamPosition = data.Position;
          switch (beamPosition) {
            case 1:
              phase = "Sizing";
              break;
            case 2:
              phase = "Reaching";
              break;
            case 3:
              phase = "Loom";
              break;
            default:
              phase = "EmptyStock";
              break;
          }

          var stage = this.stages.find(o => o.name == name);

          var obj = {
            beamNumber: data.BeamNumber ? data.BeamNumber : "-",
            entryDate: data.BeamEntryDate ? moment(data.BeamEntryDate).format("DD MMM YYYY") : "-",
            orderNumber: data.OrderNumber ? data.OrderNumber : "-",
            constructionNumber: data.ConstructionNumber ? data.ConstructionNumber : "-",
            stockLength: data.StockLength ? data.StockLength : 0
          };

          // stage.beamTotal += data.length;
          this.map[phase].beam.push(obj);
        }

        // if (this.totalData != this.count) {
        //   this.page++;
        // this.getData();
        // }
      });
  }
}
