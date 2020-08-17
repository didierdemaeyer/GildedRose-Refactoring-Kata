import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
// import { Item, GildedRose } from '../app/gilded-rose-old';

// function getTestItems(name)

describe('Gilded Rose', function () {

    // days
    // 11
    // 10
    // 6
    // 5
    //

    // 50
    // 49
    // 48
    // 47
    // 11
    // 10
    // 6
    // 5
    // 1
    // 0
    // -1

    context('Random item', function () {
        it('should degrade in quality when sell by date is not passed', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 10, 10),
                new Item('Random item', 5, 10),
                new Item('Random item', 1, 10),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(9, 'Random item 1')
            expect(items[1].quality).equals(9, 'Random item 2')
            expect(items[2].quality).equals(9, 'Random item 3')
        })

        it('should degrade in quality twice as fast when sell by date is passed', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 0, 10),
                new Item('Random item', -1, 10),
                new Item('Random item', -10, 10)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(8, 'Random item 1')
            expect(items[1].quality).equals(8, 'Random item 2')
            expect(items[2].quality).equals(8, 'Random item 3')
        })

        it('should never degrade quality below 0', function () {
            const gildedRose = new GildedRose([
                new Item('Random item', 10, 0),
                new Item('Random item', 5, 0),
                new Item('Random item', 1, 0),
                new Item('Random item', 0, 0),
                new Item('Random item', -1, 0),
                new Item('Random item', -10, 0)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(0, 'Random item 1')
            expect(items[1].quality).equals(0, 'Random item 2')
            expect(items[2].quality).equals(0, 'Random item 3')
            expect(items[3].quality).equals(0, 'Random item 4')
            expect(items[4].quality).equals(0, 'Random item 5')
            expect(items[5].quality).equals(0, 'Random item 6')
        })
    })

    context('Sulfuras, Hand of Ragnaros', function () {
        it('should always keep quality of 80', function () {
            const gildedRose = new GildedRose([
                new Item('Sulfuras, Hand of Ragnaros', 10, 80),
                new Item('Sulfuras, Hand of Ragnaros', 5, 80),
                new Item('Sulfuras, Hand of Ragnaros', 0, 80),
                new Item('Sulfuras, Hand of Ragnaros', -1, 80)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(80, 'Sulfuras, Hand of Ragnaros 1')
            expect(items[1].quality).equals(80, 'Sulfuras, Hand of Ragnaros 2')
            expect(items[2].quality).equals(80, 'Sulfuras, Hand of Ragnaros 3')
            expect(items[3].quality).equals(80, 'Sulfuras, Hand of Ragnaros 4')
        })
    })

    context('Aged Brie', function () {
        it('should increase in quality', function () {
            const gildedRose = new GildedRose([
                new Item('Aged Brie', 10, 10),
                new Item('Aged Brie', 5, 10),
                new Item('Aged Brie', 1, 10),
                new Item('Aged Brie', 0, 10),
                new Item('Aged Brie', -1, 10),
                new Item('Aged Brie', -10, 10)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(11, 'Aged Brie 1')
            expect(items[1].quality).equals(11, 'Aged Brie 2')
            expect(items[2].quality).equals(11, 'Aged Brie 3')
            expect(items[3].quality).equals(11, 'Aged Brie 4') // TODO: Bug? -> Quality increases by 2 after sell by date is passed
            expect(items[4].quality).equals(11, 'Aged Brie 5')
            expect(items[5].quality).equals(11, 'Aged Brie 6')
        })

        it('should never increase quality over 50', function () {
            const gildedRose = new GildedRose([
                new Item('Aged Brie', 10, 50),
                new Item('Aged Brie', 5, 50),
                new Item('Aged Brie', 1, 50),
                new Item('Aged Brie', 0, 50),
                new Item('Aged Brie', -1, 50),
                new Item('Aged Brie', -10, 50)
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(50, 'Aged Brie 1')
            expect(items[1].quality).equals(50, 'Aged Brie 2')
            expect(items[2].quality).equals(50, 'Aged Brie 3')
            expect(items[3].quality).equals(50, 'Aged Brie 4')
            expect(items[4].quality).equals(50, 'Aged Brie 5')
            expect(items[5].quality).equals(50, 'Aged Brie 6')
        })
    })

    context('Backstage passes to a TAFKAL80ETC concert', function () {
        it('should increase quality by 1 when sell by date is 10 days or more away', function () {
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

        it('should never increase in quality over 50', function () {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 50, 10),
                new Item('Backstage passes to a TAFKAL80ETC concert', 50, 5),
            ]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 1')
            expect(items[1].quality).equals(50, 'Backstage passes to a TAFKAL80ETC concert 2')
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
    })

    context('Conjured item', function () {
        // TODO
    })

    // 'Aged Brie'
    // 'Backstage passes to a TAFKAL80ETC concert'
    // 'Sulfuras, Hand of Ragnaros'
    // 'Conjured item'

    // const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
    // const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0)])
    // const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 0)])
    // const gildedRose = new GildedRose([new Item('Conjured item', 0, 0)])

});
