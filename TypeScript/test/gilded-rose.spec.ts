import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
// import { Item, GildedRose } from '../app/gilded-rose-old';

describe('Gilded Rose', function () {

    context('Random item', function () {
        it('should degrade in quality by 1 when sell by date is not passed', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 10, 10),
                new Item('Random item', 1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(9, 'Random item 1')
            expect(items[1].quality).equals(9, 'Random item 2')
        })

        it('should degrade in quality by 2 when sell by date is passed', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 0, 10),
                new Item('Random item', -1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(8, 'Random item 1')
            expect(items[1].quality).equals(8, 'Random item 2')
        })

        it('should never degrade in quality below 0', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 10, 0),
                new Item('Random item', 1, 0),
                new Item('Random item', 0, 0),
                new Item('Random item', -1, 0),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(0, 'Random item 1')
            expect(items[1].quality).equals(0, 'Random item 2')
            expect(items[2].quality).equals(0, 'Random item 3')
            expect(items[3].quality).equals(0, 'Random item 4')
        })
    })

    context('Sulfuras, Hand of Ragnaros', function () {
        it('should always have a quality of 80', function () {
            const gildedRose = new GildedRose([
                new Item('Sulfuras, Hand of Ragnaros', 1, 80),
                new Item('Sulfuras, Hand of Ragnaros', 0, 80),
                new Item('Sulfuras, Hand of Ragnaros', -1, 80)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(80, 'Sulfuras, Hand of Ragnaros 1')
            expect(items[1].quality).equals(80, 'Sulfuras, Hand of Ragnaros 2')
            expect(items[2].quality).equals(80, 'Sulfuras, Hand of Ragnaros 3')
        })
    })

    context('Aged Brie', function () {
        it('should increase in quality', function () {
            const gildedRose = new GildedRose([
                new Item('Aged Brie', 1, 10),
                new Item('Aged Brie', 0, 10),
                new Item('Aged Brie', -1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(11, 'Aged Brie 1')
            expect(items[1].quality).equals(11, 'Aged Brie 2')
            expect(items[2].quality).equals(11, 'Aged Brie 3')
        })

        it('should never increase in quality over 50', function () {
            const gildedRose = new GildedRose([
                new Item('Aged Brie', 1, 50),
                new Item('Aged Brie', 0, 50),
                new Item('Aged Brie', -1, 50),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(50, 'Aged Brie 1')
            expect(items[1].quality).equals(50, 'Aged Brie 2')
            expect(items[2].quality).equals(50, 'Aged Brie 3')
        })
    })

    context('Backstage passes to a TAFKAL80ETC concert', function () {
        it('should increase in quality by 1 when sell by date is more than 10 days away', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(11, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(11, 'Backstage passes to a TAFKAL80ETC concert 2')
        })

        it('should increase in quality by 2 when sell by date is 10 days or less away', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(12, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(12, 'Backstage passes to a TAFKAL80ETC concert 2')
        })

        it('should increase in quality by 3 when sell by date is 5 days or less away', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(13, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(13, 'Backstage passes to a TAFKAL80ETC concert 2')
        })

        it('should have a quality of 0 when sell by date is passed', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', -10, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(0, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(0, 'Backstage passes to a TAFKAL80ETC concert 2')
        })

        it('should never increase in quality over 50', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 15, 50),
                new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50),
                new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50),
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 2')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 3')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 4')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 5')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 6')
        })
    })

    context('Conjured Item', function () {
        it('should degrade in quality by 2 when sell by date is not passed', function () {
            const gildedRose = new GildedRose([
                new Item('Conjured Item', 10, 10),
                new Item('Conjured Item', 1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(8, 'Conjured Item 1')
            expect(items[1].quality).equals(8, 'Conjured Item 2')
        })

        it('should degrade in quality by 4 when sell by date is passed', function () {
            const gildedRose = new GildedRose([
                new Item('Conjured Item', 0, 10),
                new Item('Conjured Item', -1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(6, 'Conjured Item 1')
            expect(items[1].quality).equals(6, 'Conjured Item 2')
        })

        it('should never degrade in quality below 0', function () {
            const gildedRose = new GildedRose([
                new Item('Conjured Item', 10, 0),
                new Item('Conjured Item', 1, 0),
                new Item('Conjured Item', 0, 0),
                new Item('Conjured Item', -1, 0),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(0, 'Conjured Item 1')
            expect(items[1].quality).equals(0, 'Conjured Item 2')
            expect(items[2].quality).equals(0, 'Conjured Item 3')
            expect(items[3].quality).equals(0, 'Conjured Item 4')
        })
    })

});
