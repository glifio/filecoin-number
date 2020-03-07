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

  it('should return instances of BigNumber from .fromFil', async () => {
    await converter.cacheConversionRate()
    const USD = await converter.fromFil(1)

    assert.equal(typeof USD, 'number')
  })

  it('should return instances of BigNumber from .toFil', async () => {
    await converter.cacheConversionRate()
    const USD = await converter.toFil(1)

    assert.equal(typeof USD, 'number')
  })
})
