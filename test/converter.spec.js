const assert = require('assert')
const { Converter } = require('../')

describe('Converter', () => {
  let converter
  before('cache conversion rate', () => {
    converter = new Converter(
      'USD',
      'coinmarketcap',
      null,
      'http://localhost:80',
    )
  })

  it('should return instances of BigNumber', () => {
    assert.equal(converter instanceof Converter, true)
  })

  it('should throw an error if rate is not cached', async () => {
    assert.throws(() => {
      converter.fromFIL(1)
    })
  })

  // LOCAL TESTS:

  // it('should return instances of BigNumber from .fromFil', async () => {
  //   await converter.cacheConversionRate()
  //   const USD = converter.fromFIL(1)

  //   assert.equal(typeof USD, 'number')
  // })

  // it('should return instances of BigNumber from .toFil', async () => {
  //   await converter.cacheConversionRate()
  //   const USD = converter.toFIL(1)

  //   assert.equal(typeof USD, 'number')
  // })
})
