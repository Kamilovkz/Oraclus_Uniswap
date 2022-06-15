import logo from './logo.svg';
import './App.css';
import { createClient } from 'urql'
import {useEffect, useState } from 'react'

const apiURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

const query = `
  query {
    pairs {
      id
      token0 {
        symbol
        name
        totalSupply
        totalLiquidity
      }
      token1 {
        symbol
        name
        totalSupply
        totalLiquidity
      }
    }
  }
`


const client = createClient({
  url: apiURL
})

function App() {
  const [pairs, setTokens] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    const response = await client.query(query).toPromise()
    console.log('response:', response)
    setTokens(response.data.pairs)
  }
  return (
    <div className="App">
      {
        pairs.map((pair, index) => (
          <div key = {index}>
            <a>Token0</a> <br></br>
            <a> Name: {pair.token0.name}</a> 
            <br></br>
            <a> Symbol: {pair.token0.symbol}</a> 
            <br></br>
            <a> Total Liquidity: {pair.token0.totalLiquidity}</a> 
            <br></br>
            <a> Total Supply: {pair.token0.totalSupply}</a> 
            <br></br> <br></br>
            <a>Token1</a> <br></br>
            <a> Name: {pair.token1.name}</a> 
            <br></br>
            <a> Symbol: {pair.token1.symbol}</a> 
            <br></br>
            <a> Total Liquidity: {pair.token1.totalLiquidity}</a> 
            <br></br>
            <a> Total Supply: {pair.token1.totalSupply}</a> 
            <br></br> <br></br>
            <a> Pair Address: {pair.id}</a> 
            {/* <a href={token.metadataURI} target="_blank">Metadata</a>  */}
          </div>
        ))
      }
    </div>
  );
}

export default App;
