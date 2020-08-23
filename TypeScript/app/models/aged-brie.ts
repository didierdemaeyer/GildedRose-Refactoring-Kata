import { Item } from "../gilded-rose";

export class AgedBrie extends Item {
    constructor(sellIn: number, quality: number) {
        super('Aged Brie', sellIn, quality);
    }

    updateQuality() {
        if (this.sellIn <= 0) {
            return this.quality += 2;
        }
        return this.quality += 1;
    }
}