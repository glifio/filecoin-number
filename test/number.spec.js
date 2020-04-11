const { FilecoinNumber, BigNumber } = require('../')

describe('FilecoinNumber', () => {
  it('should return instances of BigNumber', () => {
    const filecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    expect(BigNumber.isBigNumber(filecoinNum)).toBe(true)
  })

  it('converts the same number into both fil and attofil denominations', () => {
    const attoFilecoinNum = new FilecoinNumber('5000000000000000', 'attofil')
    expect(attoFilecoinNum.toFil()).toEqual('0.005')
    expect(attoFilecoinNum.toAttoFil()).toEqual('5000000000000000')

    const filecoinNum = new FilecoinNumber('0.005', 'fil')
    expect(filecoinNum.toFil()).toEqual('0.005')
    expect(filecoinNum.toAttoFil()).toEqual('5000000000000000')
  })

  it('throws error if no denom is specified in constructor', () => {
    expect(() => new FilecoinNumber('0.005')).toThrow(
      'No Filecoin denomination passed in constructor.',
    )
  })

  it('throws error if invalid denom is specified in constructor', () => {
    expect(() => new FilecoinNumber('0.005', 'fakefil')).toThrow(
      'Unsupported denomination passed in constructor.',
    )
  })
})
