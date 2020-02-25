const { COINMARKETCAP_API_KEY } = require('../test/secrets')
const { Converter } = require('../dist')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const converter = new Converter('coinmarketcap', COINMARKETCAP_API_KEY)
  const balanceInUSD = await converter.convert('0.01', 'USD', 'FIL')
  // eslint-disable-next-line no-console
  console.log('balanceInUSD', balanceInUSD)
})()
