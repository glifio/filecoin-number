# Filecoin number

[![Travis CI](https://travis-ci.org/openworklabs/filecoin-number.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-number)

A wrapper class built around javascript's [bignumber](https://github.com/MikeMcl/bignumber.js). Most questions are best answered from the bignumber readme and docs.

## Usage

```js
import { FilecoinNumber, Converter } from '@openworklabs/filecoin-number'

// pass a valid bignumber argument, and a denomination (one of 'fil' or 'attofil') to the constructor.
const filecoinNumber = new FilecoinNumber('10000', 'attofil')

// filecoinNumber is an instance of BigNumber, so you can use it as such
filecoinNumber.multiply(7)

// it comes with 2 additional instance methods for showing the filecoin number in attofil or fil
const inAttoFil = filecoinNumber.toAttoFil()
const inFil = filecoinNumber.toFil()

// Use the Converter to convert currencies
const USDConverter = new Converter(
  'USD',
  'coinmarketcap',
  COINMARKETCAP_API_KEY, // OPTIONAL
  COINMARKETCAP_PROXY_URL, // OPTIONAL
)
await USDConverter.cacheConversionRate()
const USD = await USDConverter.fromFil(1)
```
