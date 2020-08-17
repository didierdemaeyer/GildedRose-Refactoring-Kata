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
    ConjuredManaCake = 'Conjured Mana Cake',
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
                    newQuality = this.calculateNewQualityOfAgedBrie(quality)
                    break
                case ItemNames.BackstagePasses:
                    newQuality = this.calculateNewQualityOfBackstagePasses(sellIn, quality)
                    break
                case ItemNames.Sulfuras:
                    // do nothing
                    break
                case ItemNames.ConjuredManaCake:
                    newQuality = this.calculateNewQualityOfConjuredManaCake(sellIn, quality)
                    break
                default:
                    newQuality = this.calculateNewQualityOfItem(sellIn, quality)
                    break
            }

            if (name !== ItemNames.Sulfuras) {
                this.items[i].sellIn--;

                // quality min = 0, max = 50
                if (newQuality < 0) {
                    newQuality = 0;
                }
                if (newQuality > 50) {
                    newQuality = 50;
                }
            }

            this.items[i].quality = newQuality
        }

        return this.items;
    }

    private calculateNewQualityOfItem(sellIn: number, quality: number): number {
        if (sellIn <= 0) {
            return quality - 2;
        }
        return quality - 1;
    }

    private calculateNewQualityOfConjuredManaCake(sellIn: number, quality: number): number {
        if (sellIn <= 0) {
            return quality - 4;
        }
        return quality - 2;
    }

    private calculateNewQualityOfBackstagePasses(sellIn: number, quality: number): number {
        if (sellIn <= 0) {
            return 0;
        }
        if (sellIn <= 5) {
            return quality + 3;
        }
        if (sellIn <= 10) {
            return quality + 2;
        }
        return quality + 1;
    }

    private calculateNewQualityOfAgedBrie(quality: number): number {
        return quality + 1;
    }
}
