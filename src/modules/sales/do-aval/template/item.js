import { bindable } from "aurelia-framework";

export class LocalItem {

  avalTypes = ["", "Aval Printex", "Aval Batik Motif Kecil", "Aval Batik Motif Besar", "Aval Printing (10-49 cm)",
    "Aval Kain Kotor", "Aval Tali Kotor", "Aval Sambungan", "Aval Kain Head Cut", "Aval Solid",
    "Aval A (Lap Besar)", "Aval B (Lap Kecil)", "Aval Solid TR", "Aval Batik TW (karantina)"];

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    
  }

}
