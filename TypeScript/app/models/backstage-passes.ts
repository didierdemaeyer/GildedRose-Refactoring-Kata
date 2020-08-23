import { Item } from "../gilded-rose";

export class BackstagePasses extends Item {
    constructor(sellIn: number, quality: number) {
        super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
    }

    updateQuality() {
        if (this.sellIn <= 0) {
            return this.quality = 0;
        }
        if (this.sellIn <= 5) {
            return this.quality += 3;
        }
        if (this.sellIn <= 10) {
            return this.quality += 2;
        }
        return this.quality += 1;
    }
}