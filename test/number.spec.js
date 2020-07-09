const { FilecoinNumber, BigNumber } = require('../')

describe('FilecoinNumber', () => {
  test('should return instances of BigNumber', () => {
    const filecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    expect(BigNumber.isBigNumber(filecoinNum)).toBe(true)
  })

  it('converts the same number into both fil and attofil denominations', () => {
    const attoFilecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    expect(attoFilecoinNum.toFil()).toBe('0.005')
    expect(attoFilecoinNum.toAttoFil()).toBe('5000000000000000')

    const filecoinNum = new FilecoinNumber('0.005', 'fil')
    expect(filecoinNum.toFil()).toBe('0.005')
    expect(filecoinNum.toAttoFil()).toBe('5000000000000000')
  })

  test('throws error if no denom is specified in constructor', () => {
    expect(() => new FilecoinNumber('0.005')).toThrow()
  })

  test('throws error if no denom is specified in constructor', () => {
    expect(() => new FilecoinNumber('0.005', 'ottofil')).toThrow()
  })

  test('does not use scientific notation', () => {
    const fil = new FilecoinNumber('1000000000000', 'fil')
    expect(fil.toAttoFil().includes('e')).toBe(false)
  })
})
