const bent = require('bent')

class Converter {
  constructor(currency, oracle, oracleKey, oracleGateway) {
    if (!currency) throw new Error('No currency passed.')
    if (oracle !== 'coinmarketcap') {
      throw new Error('We only support coinmarketcap as an oracle rn.')
    }

    this.currency = currency
    this.oracle = oracle
    this.oracleKey = oracleKey || ''
    this.oracleGateway = oracleGateway || 'https://pro-api.coinmarketcap.com/'
  }

  cacheConversionRate = async () => {
    this.rate = await this.convert(1, 'FIL', this.currency)
  }

  toFil = async amount => {
    if (this.rate) {
      return amount / this.rate
    }

    const price = await this.convert(amount, this.currency, 'FIL')
    return price
  }

  fromFil = async amount => {
    if (this.rate) {
      return this.rate / amount
    }

    const price = await this.convert(amount, 'FIL', this.currency)
    return price
  }

  convert = async (amount, from, to) => {
    const get = bent('GET', 'json', {
      'X-CMC_PRO_API_KEY': this.oracleKey,
    })

    const res = await get(
      `${this.oracleGateway}/v1/tools/price-conversion?symbol=${from}&amount=${amount}&convert=${to}`,
    )

    if (!res.data || !res.data.quote || !res.data.quote[to])
      throw new Error('No conversion price found.')

    return res.data.quote[to].price
  }
}

module.exports = Converter
