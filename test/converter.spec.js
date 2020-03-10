/* eslint-env mocha */
const { expect } = require('chai')
const BigNumber = require('bignumber.js')
const { Converter, FilecoinNumber } = require('../')

describe('Converter', () => {
  describe('Setup', () => {
    let converter
    before('tests', () => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
    })

    it('should return instances of Converter', () => {
      expect(converter instanceof Converter).to.equal(true)
    })

    it('should throw an error if toFIL is called before rate is cached', () => {
      expect(() => converter.toFIL(1)).to.throw()
    })

    it('should throw an error if fromFIL is called before rate is cached', () => {
      expect(() => converter.fromFIL(1)).to.throw()
    })

    it('should cache conversion rates', async () => {
      await converter.cacheConversionRate()
      const cachedConversionRate = converter.getCachedConversionRate()
      expect(cachedConversionRate instanceof BigNumber).to.equal(true)
      expect(typeof cachedConversionRate.toNumber()).to.equal('number')
    })
  })

  describe('toFIL', () => {
    let converter
    before('tests', async () => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
      await converter.cacheConversionRate()
    })

    it('throws an error if a type other than BN, Number, or String is passed', () => {
      expect(() => converter.toFIL({ hello: 'there' })).to.throw()
      expect(() => converter.toFIL([1])).to.throw()
      expect(() => converter.toFIL(new Set([1]))).to.throw()
    })

    it('accepts numbers, strings, FilecoinNumbers, and BigNumbers as valid amount vals', () => {
      expect(() => converter.toFIL(1)).to.not.throw()
      expect(() => converter.toFIL('1')).to.not.throw()
      expect(() => converter.toFIL(new BigNumber('1'))).to.not.throw()
      expect(() => converter.toFIL(new FilecoinNumber('1', 'fil')))
    })

    it('Returns an instance of FilecoinNumber', () => {
      const num = converter.toFIL('1')
      expect(num instanceof FilecoinNumber).to.equal(true)
    })

    it('Calculates the conversion by dividing the Filecoin amount by the rate', () => {
      const fil = new BigNumber(100)
      const rate = converter.getCachedConversionRate()
      const manuallyCalculatedFilAmount = fil.dividedBy(rate)
      const filAmount = converter.toFIL(100)
      expect(filAmount.toString()).to.equal(
        manuallyCalculatedFilAmount.toString(),
      )
    })
  })

  describe('fromFIL', () => {
    let converter
    before('tests', async () => {
      converter = new Converter('USD', {
        apiURL: 'https://cmc-proxy.openworklabs.com',
      })
      await converter.cacheConversionRate()
    })

    it('throws an error if a type other than BN, Number, or String is passed', () => {
      expect(() => converter.fromFIL({ hello: 'there' })).to.throw()
      expect(() => converter.fromFIL([1])).to.throw()
      expect(() => converter.fromFIL(new Set([1]))).to.throw()
    })

    it('accepts numbers, strings, FilecoinNumbers, and BigNumbers as valid amount vals', () => {
      expect(() => converter.fromFIL(1)).to.not.throw()
      expect(() => converter.fromFIL('1')).to.not.throw()
      expect(() => converter.fromFIL(new BigNumber('1'))).to.not.throw()
      expect(() => converter.fromFIL(new FilecoinNumber('1', 'fil')))
    })

    it('Returns an instance of BigNumber', () => {
      const num = converter.fromFIL('1')
      expect(num instanceof BigNumber).to.equal(true)
    })

    it('Calculates the conversion by multiplying the Filecoin amount by the rate', () => {
      const fil = new BigNumber(100)
      const rate = converter.getCachedConversionRate()
      const manuallyCalculatedFilAmount = fil.multipliedBy(rate)
      const filAmount = converter.fromFIL(100)
      expect(filAmount.toString()).to.equal(
        manuallyCalculatedFilAmount.toString(),
      )
    })
  })
})
