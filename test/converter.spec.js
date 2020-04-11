const BigNumber = require('bignumber.js')
const { Converter, FilecoinNumber } = require('../')

describe('Converter', () => {
  describe('Setup', () => {
    let converter
    beforeAll(() => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
    })

    it('returns instances of Converter', () => {
      expect(converter instanceof Converter).toEqual(true)
    })

    it('throws an error if toFIL is called before rate is cached', () => {
      expect(() => converter.toFIL(1)).toThrow()
    })

    it('throws an error if fromFIL is called before rate is cached', () => {
      expect(() => converter.fromFIL(1)).toThrow()
    })

    it('caches conversion rates', async () => {
      await converter.cacheConversionRate()
      const cachedConversionRate = converter.getCachedConversionRate()
      expect(cachedConversionRate instanceof BigNumber).toEqual(true)
      expect(typeof cachedConversionRate.toNumber()).toEqual('number')
    })
  })

  describe('toFIL', () => {
    let converter
    beforeAll(async () => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
      await converter.cacheConversionRate()
    })

    it('throws an error if a type other than BN, Number, or String is passed', () => {
      expect(() => converter.toFIL({ hello: 'there' })).toThrow()
      expect(() => converter.toFIL([1])).toThrow()
      expect(() => converter.toFIL(new Set([1]))).toThrow()
    })

    it('returns instance of FilecoinNumber for numbers, strings, FilecoinNumbers, and BigNumbers as valid amount vals', () => {
      expect(converter.toFIL(1) instanceof FilecoinNumber).toBe(true)
      expect(converter.toFIL('1') instanceof FilecoinNumber).toBe(true)
      expect(
        converter.toFIL(new BigNumber('1')) instanceof FilecoinNumber,
      ).toBe(true)
      expect(
        converter.toFIL(new FilecoinNumber('1', 'fil')) instanceof
          FilecoinNumber,
      ).toBe(true)
    })

    it('calculates the conversion by dividing the Filecoin amount by the rate', () => {
      const fil = new BigNumber(100)
      const rate = converter.getCachedConversionRate()
      const manuallyCalculatedFilAmount = fil.dividedBy(rate)
      const filAmount = converter.toFIL(100)
      expect(filAmount.toString()).toEqual(
        manuallyCalculatedFilAmount.toString(),
      )
    })
  })

  describe('fromFIL', () => {
    let converter
    beforeAll(async () => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
      await converter.cacheConversionRate()
    })

    it('throws an error if a type other than BN, Number, or String is passed', () => {
      expect(() => converter.fromFIL({ hello: 'there' })).toThrow()
      expect(() => converter.fromFIL([1])).toThrow()
      expect(() => converter.fromFIL(new Set([1]))).toThrow()
    })

    it('accepts numbers, strings, FilecoinNumbers, and BigNumbers as valid amount vals', () => {
      expect(converter.fromFIL(1) instanceof BigNumber).toBe(true)
      expect(converter.fromFIL('1') instanceof BigNumber).toBe(true)
      expect(converter.fromFIL(new BigNumber('1')) instanceof BigNumber).toBe(
        true,
      )
      expect(
        converter.fromFIL(new FilecoinNumber('1', 'fil')) instanceof BigNumber,
      ).toBe(true)
    })

    it('returns an instance of BigNumber', () => {
      const num = converter.fromFIL('1')
      expect(num instanceof BigNumber).toEqual(true)
    })

    it('calculates the conversion by multiplying the Filecoin amount by the rate', () => {
      const fil = new BigNumber(100)
      const rate = converter.getCachedConversionRate()
      const manuallyCalculatedFilAmount = fil.multipliedBy(rate)
      const filAmount = converter.fromFIL(100)
      expect(filAmount.toString()).toEqual(
        manuallyCalculatedFilAmount.toString(),
      )
    })
  })
})
