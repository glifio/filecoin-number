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

  toFIL = amount => {
    if (!this.rate)
      throw new Error(
        'Call cacheConversionRate() to get the conversion rate before calling .toFIL.',
      )

    return amount / this.rate
  }

  fromFIL = amount => {
    if (!this.rate)
      throw new Error(
        'Call cacheConversionRate() to get the conversion rate before calling .fromFIL.',
      )

    return amount * this.rate
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
