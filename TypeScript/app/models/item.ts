export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateQuality() {
        if (this.sellIn <= 0) {
            return this.quality -= 2;
        }
        return this.quality -= 1;
    }
}