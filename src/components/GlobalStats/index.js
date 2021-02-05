// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use'
import { useGlobalData, useEthPrice } from '../../contexts/GlobalData'
import { formattedNum } from '../../utils'

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`

const Box = styled.div`
  padding: 1rem 2rem;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  border-radius: 12x;
  width: 17%;
  > div {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
`
export default function GlobalStats() {
  const below816 = useMedia('(max-width: 816px)')

  const {
    oneDayVolumeUSD,
    oneDayTxns,
    txnChange,
    totalLiquidityUSD,
    liquidityChangeUSD,
    volumeChangeUSD,
  } = useGlobalData()
  //txnChange is the transaction cahnge per 24hrs
  //oneDayTxns is the total number of transaction per 24 hours
  //totalLiquidityUSD is th
  const [ethPrice] = useEthPrice()
  const formattedEthPrice = ethPrice ? formattedNum(ethPrice, true) : '-'

  return (
    <Header>
      <div style={{ justifyContent: 'space-between', display: below816 ? 'none' : 'flex' }}>
        <Box>
          <p>Ethereum price</p>
          <div>
            <h2>{formattedEthPrice}</h2>
          </div>
        </Box>
        <Box>
          <p>Total Liquidity</p>
          <div>
            <h2>${parseInt(totalLiquidityUSD)}</h2>
            <p style={{ color: liquidityChangeUSD >= 0 ? 'green' : 'red' }}>
              {liquidityChangeUSD >= 0 ? '+' : ''}
              {liquidityChangeUSD.toFixed(2)}%
            </p>
          </div>
        </Box>
        <Box>
          <p>Volume (24 hours)</p>
          <div>
            <h2>${parseInt(oneDayVolumeUSD)}</h2>
            <p style={{ color: volumeChangeUSD >= 0 ? 'green' : 'red' }}>
              {volumeChangeUSD >= 0 ? '+' : ''}
              {volumeChangeUSD.toFixed(2)}%
            </p>
          </div>
        </Box>
        <Box>
          <p>Transaction (24 hours)</p>
          <div>
            <h2>{parseInt(oneDayTxns)}</h2>
            <p style={{ color: txnChange >= 0 ? 'green' : 'red' }}>
              {txnChange >= 0 ? '+' : ''}
              {txnChange.toFixed(2)}%
            </p>
          </div>
        </Box>
      </div>
    </Header>
  )
}
