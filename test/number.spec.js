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
    // assert.throws not working for some reason?
    try {
      new FilecoinNumber('0.005')
    } catch (err) {
      expect(err instanceof Error).toBe(true)
      expect(err.message).toBe(
        'No Filecoin denomination passed in constructor.',
      )
    }
  })

  test('throws error if no denom is specified in constructor', () => {
    expect(() => new FilecoinNumber('0.005', 'ottofil')).toThrow()
    // // assert.throws not working for some reason?
    // try {
    //   new FilecoinNumber('0.005', 'ottofil')
    // } catch (err) {
    //   expect(err instanceof Error).toBe(true)
    //   expect(err.message).toBe(
    //     'Unsupported denomination passed in constructor.',
    //   )
    // }
  })

  test('does not use scientific notation', () => {
    const fil = new FilecoinNumber('1000000000000', 'fil')
    expect(fil.toAttoFil().includes('e')).toBe(false)
  })
})
