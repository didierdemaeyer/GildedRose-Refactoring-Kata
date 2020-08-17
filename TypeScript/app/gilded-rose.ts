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
    Conjured = 'Conjured',
}

export class GildedRose {
    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            const { name, sellIn, quality } = item;
            let newQuality = quality;

            switch (name) {
                case ItemNames.AgedBrie:
                    newQuality = this.calculateNewQualityOfAgedBrie(quality)
                    break
                case ItemNames.BackstagePasses:
                    newQuality = this.calculateNewQualityOfBackstagePasses(sellIn, quality)
                    break
                case ItemNames.Sulfuras:
                case ItemNames.Conjured:
                    // do nothing
                    break
                default:
                    newQuality = this.calculateNewQualityOfItem(sellIn, quality)
                    break
            }

            if (name.indexOf('Conjured') !== -1) {
                newQuality = this.calculateNewQualityOfConjured(sellIn, quality)
            }

            if (name !== ItemNames.Sulfuras) {
                item.sellIn--;

                // limit quality (min 0, max 50)
                if (newQuality < 0) {
                    newQuality = 0;
                }
                if (newQuality > 50) {
                    newQuality = 50;
                }
            }

            item.quality = newQuality
        }

        return this.items;
    }

    private calculateNewQualityOfItem(sellIn: number, quality: number): number {
        if (sellIn <= 0) {
            return quality - 2;
        }
        return quality - 1;
    }

    private calculateNewQualityOfConjured(sellIn: number, quality: number): number {
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
