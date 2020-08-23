import { Item } from "../gilded-rose";

export class Sulfuras extends Item {
    constructor(sellIn: number, quality: number) {
        super('Sulfuras, Hand of Ragnaros', sellIn, quality);
    }

    updateQuality() {
        return;
    }
}