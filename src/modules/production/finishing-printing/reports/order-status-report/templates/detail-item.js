export class DetailItem {
    reasons = ["", "Tunggu Material", "Tunggu Acc Buyer","Tunggu Acc Sample","Tunggu Embalase","Tunggu Test Lab","Problem Produksi","Tunngu Celup Ground Dyeing","Tunggu Antrian CRF","Kapasitas Mesin Tidak Cukup"];

    activate(item) {
        this.data = item.data;
        this.error = item.error;
    }
}
