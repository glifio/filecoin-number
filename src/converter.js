const bent = require('bent')

class Converter {
  constructor(oracle, oracleKey) {
    if (oracle !== 'coinmarketcap') {
      throw new Error('We only support coinmarketcap as an oracle rn.')
    }

    this.oracle = oracle
    this.oracleKey = oracleKey
  }

  convert = async (amount, from, to) => {
    if (!amount) throw new Error('No amount passed.')
    if (!from) throw new Error('No `from` currency passed.')
    if (!to) throw new Error('No `to` currency passed.')

    const get = bent('GET', 'json')

    const res = await get(
      `http://localhost:80/v1/tools/price-conversion?symbol=${from.toUpperCase()}&amount=${amount}&convert=${to.toUpperCase()}`,
    )

    if (!res.data || !res.data.quote || !res.data.quote[to])
      throw new Error('No conversion price found.')

    return res.data.quote[to].price
  }
}

module.exports = Converter
