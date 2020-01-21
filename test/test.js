const assert = require('assert')
const BigNumber = require('bignumber.js')

const FilecoinNumber = require('../')

describe('FilecoinNumber', () => {
  it('should return instances of BigNumber', () => {
    const filecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    assert.equal(BigNumber.isBigNumber(filecoinNum), true)
  })

  it('converts the same number into both fil and attofil denominations', () => {
    const attoFilecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    assert.equal(attoFilecoinNum.toFil(), '0.005')
    assert.equal(attoFilecoinNum.toAttoFil(), '5000000000000000')

    const filecoinNum = new FilecoinNumber('0.005', 'fil')
    assert.equal(filecoinNum.toFil(), '0.005')
    assert.equal(filecoinNum.toAttoFil(), '5000000000000000')
  })

  it('throws error if no denom is specified in constructor', () => {
    // assert.throws not working for some reason?
    try {
      new FilecoinNumber('0.005')
    } catch (err) {
      assert.equal(err instanceof Error, true)
      assert.equal(
        err.message,
        'No Filecoin denomination passed in constructor.',
      )
    }
  })

  it('throws error if no denom is specified in constructor', () => {
    // assert.throws not working for some reason?
    try {
      new FilecoinNumber('0.005', 'ottofil')
    } catch (err) {
      assert.equal(err instanceof Error, true)
      assert.equal(
        err.message,
        'Unsupported denomination passed in constructor.',
      )
    }
  })
})
