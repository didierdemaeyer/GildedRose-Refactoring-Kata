export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

enum ItemNames {
    AgedBrie = 'Aged Brie',
    BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
    Sulfuras = 'Sulfuras, Hand of Ragnaros',
    ConjuredItem = 'Conjured Item',
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const { name, sellIn, quality } = this.items[i];
            let newQuality = quality;

            switch (name) {
                case ItemNames.AgedBrie:
                    newQuality = this.updateQualityOfAgedBrie(sellIn, quality)
                    break
                case ItemNames.BackstagePasses:
                    newQuality = this.updateQualityOfBackstagePasses(sellIn, quality)
                    break
                case ItemNames.Sulfuras:
                    break
                case ItemNames.ConjuredItem:
                    newQuality = this.updateQualityOfConjuredItem(sellIn, quality)
                    break
                default:
                    newQuality = this.updateQualityOfItem(sellIn, quality)
                    break
            }

            if (name !== ItemNames.Sulfuras) {
                this.items[i].sellIn--;
            }

            this.items[i].quality = newQuality
        }

        return this.items;
    }

    updateQualityOfItem(sellIn: number, quality: number): number {
        let newQuality;

        if (sellIn <= 0) {
            newQuality = quality - 2;
        } else {
            newQuality = quality - 1;
        }

        if (newQuality < 0) {
            newQuality = 0;
        }

        return newQuality;
    }

    updateQualityOfConjuredItem(sellIn: number, quality: number): number {
        let newQuality;

        if (sellIn <= 0) {
            newQuality = quality - 4;
        } else {
            newQuality = quality - 2;
        }

        if (newQuality < 0) {
            newQuality = 0;
        }

        return newQuality;
    }

    updateQualityOfBackstagePasses(sellIn: number, quality: number): number {
        let newQuality;

        if (sellIn <= 0) {
            newQuality = 0;
        } else if (sellIn <= 5) {
            newQuality = quality + 3;
        } else if (sellIn <= 10) {
            newQuality = quality + 2;
        } else {
            newQuality = quality + 1;
        }

        if (newQuality > 50) {
            newQuality = 50;
        }

        return newQuality;
    }

    updateQualityOfAgedBrie(sellIn: number, quality: number): number {
        let newQuality = quality + 1;

        if (newQuality > 50) {
            newQuality = 50;
        }

        return newQuality;
    }
}
