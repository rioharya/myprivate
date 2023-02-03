const { Telegraf } = require('telegraf')
var  Web3  = require('web3')
var mysql = require('mysql')
var Tx = require('ethereumjs-tx').Transaction;
const common = require('ethereumjs-common');
var {ParseMode} = require('telegram')
const { ethers } = require('ethers')
var isUser = false;
let wlcMsg, button
var con = mysql.createConnection({
  host: "198.54.115.185",
  user: "ncoihhud_root",
  password: "T_3WzAwfd2jGBJ9",
  database: "ncoihhud_sniperbot"
});

const extra = require('telegraf/extra')
const markup = extra.markdown()

var options = {
    keepAlive: true,
    withCredentials: false,
    timeout: 20000, // ms
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        },
        {
            
        }
    ]
};
// var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/0ab54a5956724e27871ff1588c7f6a62'));
var web3 = new Web3(new Web3.providers.HttpProvider('https://dry-falling-darkness.bsc.discover.quiknode.pro/3c99e03c8bec1820fe6624d1b8104cf2d0d4cdc0/', options));
const chain = common.default.forCustomChain(
    'mainnet',{
      name: 'bnb',
      networkId: 56,
      chainId: 56
    },
    'istanbul');

const bot = new Telegraf('5379781448:AAFu7sM90oWmRU6MoLpNEY2gs-vg-AqYFq4');
web3.eth.transactionBlockTimeout = 10;
// console.log(web3.eth.getProtocolVersion);
// console.log(web3.eth.currentProvider)
var BN = web3.utils.BN;
const PancakeABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
    const pancakeFactoryABI = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const pancakeFactoryAddr = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
    const pancakeRouterAddr = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
    const PairABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const wbnb = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
    const erc20ABI = [
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "balance",
              "type": "uint256"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
              {
                  "name": "_spender",
                  "type": "address"
              },
              {
                  "name": "_value",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [
              {
                  "name": "",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
              {
                  "name": "_owner",
                  "type": "address"
              },
              {
                  "name": "_spender",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];

async function getTokenDetail(sender, tokenAddress){
 
        var tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress)
        var tokendecimal =  await tokenContract.methods.decimals().call();
        var tokenbalance = await tokenContract.methods.balanceOf(sender).call()
        var adjustedBalance = tokenbalance / Math.pow(10, tokendecimal)
        var tokenName = await tokenContract.methods.name().call()
        var tokenSymbol = await tokenContract.methods.symbol().call()
        
        return await tokendecimal,tokenName,tokenSymbol,adjustedBalance
}

async function buytokenBSC(sender,privateKey,amount,tokenAddress,chatid) {
    // var get = getTokenDetail(sender, tokenAddress)
    // console.log(get)
    try {
      var amountToBuyWith = web3.utils.toHex(amount);
    // var privateKey = Buffer.from(targetAccount.privateKey.slice(2), 'hex')  ;
    // var abiArray = JSON.parse(JSON.parse(fs.readFileSync('onlyone-abi.json','utf-8')));
    // var tokenAddress = '0xb899db682e6d6164d885ff67c1e676141deaaa40'; // ONLYONE contract address
    var WBNBAddress = wbnb; // WBNB token address
    
    // var onlyOneWbnbCakePairAddress = '0xd22fa770dad9520924217b51bf7433c4a26067c2';
    // var pairAbi = JSON.parse(fs.readFileSync('cake-pair-onlyone-bnb-abi.json', 'utf-8'));
    // var pairContract = new web3.eth.Contract(pairAbi, onlyOneWbnbCakePairAddress/*, {from: targetAccount.address}*/);
    var amountOutMin = '100' + Math.random().toString().slice(2,6);
    var pancakeSwapRouterAddress = pancakeRouterAddr;

    var routerAbi = PancakeABI
    var contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, {from: sender});
    var data = contract.methods.swapExactETHForTokens(
        web3.utils.toHex(amountOutMin),
        [WBNBAddress,
         tokenAddress],
        sender,
        web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
    );

    var count = await web3.eth.getTransactionCount(sender);
    // console.log(count)
    var rawTransaction = {
        "from":sender,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(290000),
        "to":pancakeSwapRouterAddress,
        "value":web3.utils.toHex(amountToBuyWith),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };

    var transaction = new Tx(rawTransaction, { 'common': chain });
    transaction.sign(privateKey);

    var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    .on('transactionHash', function(hash){
        wlcMsg = "Buy "+web3.utils.fromWei(amount, 'ether')+" BNB is pending \nhttps://bscscan.com/tx/"+hash
        bot.telegram.sendMessage(chatid, wlcMsg, markup)
        // console.error("Transaction Hash: "+hash)
    })
    .on('confirmation', function(confirmationNumber, receipt){

    })
    .on('receipt', async function(receipt){
        
        // console.log("receipt: "+receipt.status)
        var tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress)
        var tokendecimal =  await tokenContract.methods.decimals().call()
        var tokenbalance = await tokenContract.methods.balanceOf(sender).call()
        var adjustedBalance = tokenbalance / Math.pow(10, tokendecimal)
        var tokenName = await tokenContract.methods.name().call()
        var tokenSymbol = await tokenContract.methods.symbol().call()
        // console.log(tokendecimal, tokenbalance, adjustedBalance, tokenName, tokenSymbol)
        wlcMsg = "Buy Transaction Success: https://bscscan.com/tx/"+receipt.transactionHash+"\nToken Balance: "+adjustedBalance+" "+tokenSymbol
        bot.telegram.sendMessage(chatid, wlcMsg, markup)
        allowancetokenBSC(tokenAddress,sender,chatid,privateKey)
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        wlcMsg = `${error.message}`
        bot.telegram.sendMessage(chatid, wlcMsg)
    });
    } catch (error) {
      wlcMsg = `Error: ${error.message}`
        bot.telegram.sendMessage(chatid, wlcMsg)
    }
    
    // console.log(result) 
    // return result;
}

async function selltokenBSC(sender,privateKey,tokenAddress,chatid,percent) {
  try {
    // var tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress)
    var tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress)
        var tokendecimal =  await tokenContract.methods.decimals().call()
        var tokenbalance = await tokenContract.methods.balanceOf(sender).call()
        var adjustedBalance = tokenbalance / Math.pow(10, tokendecimal)
        // var tokenName = await tokenContract.methods.name().call()
        var tokenSymbol = await tokenContract.methods.symbol().call()
        // console.log(tokendecimal, tokenbalance, adjustedBalance, tokenName, tokenSymbol)
        var tokenbalancepercent = tokenbalance*(percent/100)
        // console.log(tokenbalancepercent)


    // var amountToBuyWith = web3.utils.toHex(amount);
    // var privateKey = Buffer.from(targetAccount.privateKey.slice(2), 'hex')  ;
    // var abiArray = JSON.parse(JSON.parse(fs.readFileSync('onlyone-abi.json','utf-8')));
    // var tokenAddress = '0xb899db682e6d6164d885ff67c1e676141deaaa40'; // ONLYONE contract address
    var WBNBAddress = wbnb; // WBNB token address
        
    // var onlyOneWbnbCakePairAddress = '0xd22fa770dad9520924217b51bf7433c4a26067c2';
    // var pairAbi = JSON.parse(fs.readFileSync('cake-pair-onlyone-bnb-abi.json', 'utf-8'));
    // var pairContract = new web3.eth.Contract(pairAbi, onlyOneWbnbCakePairAddress/*, {from: targetAccount.address}*/);
    var amountOutMin = '100' + Math.random().toString().slice(2,6);
    var pancakeSwapRouterAddress = pancakeRouterAddr;

    var routerAbi = PancakeABI
    var contract = new web3.eth.Contract(routerAbi, pancakeSwapRouterAddress, {from: sender});
    var getAmountInMax = await contract.methods.getAmountsOut(tokenbalancepercent, [tokenAddress,WBNBAddress]).call()
    var getAmountInMaxs = (getAmountInMax[1]*10/100).toString().split(".");
    console.log(getAmountInMaxs[0])
    var data = contract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
        web3.utils.toHex(tokenbalancepercent.toString()),
        web3.utils.toHex((getAmountInMaxs[0]).toString()),
        [tokenAddress,
          WBNBAddress],
        sender,
        web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
    );
    var count = await web3.eth.getTransactionCount(sender);
    // console.log(count)
    var rawTransaction = {
        "from":sender,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(500000),
        "to":pancakeSwapRouterAddress,
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };
    
    var transaction = new Tx(rawTransaction, { 'common': chain });
    transaction.sign(privateKey);
    
    web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    .on('transactionHash', function(hash){
        wlcMsg = "Sell "+tokenbalancepercent+""+tokenSymbol+" is pending \nhttps://bscscan.com/tx/"+hash
        bot.telegram.sendMessage(chatid, wlcMsg, markup)
        // console.log("Transaction Hash: "+hash)
    })
    .on('confirmation', function(confirmationNumber, receipt){

    })
    .on('receipt', async function(receipt){
        
        // console.log("receipt: "+receipt.status)
        
        wlcMsg = "Sell Transaction Success: https://bscscan.com/tx/"+receipt.transactionHash
        bot.telegram.sendMessage(chatid, wlcMsg, markup)
    })
    .on('error', function(error) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        wlcMsg = `Error: ${error.message}`
        bot.telegram.sendMessage(chatid, wlcMsg)
        // console.error("Error:", error, "Receipt:", receipt)
    });
    // console.log(result)
    // return result;
    } catch (error) {
      console.error({error})
    }
    
}

async function allowancetokenBSC(tokenAddress, walletAddress,chatid, privateKey){
  var contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  contract.methods.allowance(walletAddress, pancakeRouterAddr)
            .call()
            .then(function (res, err) {
              if (parseInt(res) >= 10000000000000) {
                wlcMsg = "Token Approved"
                bot.telegram.sendMessage(chatid, wlcMsg)
            }
            else {
              approvetokenBSC(tokenAddress, walletAddress, chatid, privateKey)              
            }
            })
}

async function approvetokenBSC(_tokenAddress,_walletAddress,_chatid, _privateKey){
try {
  var rtr = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
  var contract = new web3.eth.Contract(erc20ABI, _tokenAddress)
  var data = contract.methods.approve(
    rtr,'115792089237316195423570985008687907853269984665640564039457584007913129639935'
  );

  var count = await web3.eth.getTransactionCount(_walletAddress);
  // console.log(count)
  var rawTransaction = {
      "from":_walletAddress,
      "gasPrice":web3.utils.toHex(5000000000),
      "gasLimit":web3.utils.toHex(300000),
      "to":_tokenAddress,
      "data":data.encodeABI(),
      "nonce":web3.utils.toHex(count)
  };

  var transaction = new Tx(rawTransaction, { 'common': chain });
  // console.log(_privateKey)
  transaction.sign(_privateKey);

  var rst = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
  // console.error(rst.receipt)
  if(rst.status){
    wlcMsg = "Token Approved\nHash: https://bscscan.com/tx/"+rst.transactionHash
  bot.telegram.sendMessage(_chatid, wlcMsg)
  // console.log(result)
  }
} catch (error) {
  wlcMsg = `Error: ${error.message}`
  bot.telegram.sendMessage(_chatid, wlcMsg)
}
  

}

bot.command('approve', ctx => {
  con.query("SELECT * FROM user WHERE telegramId = '"+ctx.from.id+"'",function (err, result) {
    try {
      var results=JSON.parse(JSON.stringify(result))
      let sender = results[0].walletAdd;
      let text = ctx.message.text;
      const myArray = text.split(" ");
      const tokenaddress = myArray[1];
      let pk = results[0].walletPk;
      var filterpk = pk.split("0x");
      var PrivateKey = Buffer.from(filterpk[1], 'hex');

allowancetokenBSC(tokenaddress,sender,ctx.from.id,PrivateKey);
// console.log(res);
      } catch (error) {
          console.error(error)
      }
  })
})

bot.command('buy', ctx => {
    con.query("SELECT * FROM user WHERE telegramId = '"+ctx.from.id+"'",async function (err, result) {
    // console.log(ctx.message.text)
        if (err) throw err;
        if (result.length > 0) {
            try {
            var results=JSON.parse(JSON.stringify(result))
            let sender = results[0].walletAdd;
    let pk = results[0].walletPk;
    var filterpk = pk.split("0x");
    PrivateKey = Buffer.from(filterpk[1], 'hex');
    let text = ctx.message.text;
    const myArray = text.split(" ");
    const tokenaddress = myArray[1];
    const amountbnb = web3.utils.toWei(myArray[2], 'ether');
    
    buytokenBSC(sender,PrivateKey,amountbnb,tokenaddress,ctx.from.id);
    
    // console.log(res);
            } catch (error) {
                console.error(error)
            }
            
          }
          
      });
    

})

bot.command('sell', ctx => {
  con.query("SELECT * FROM user WHERE telegramId = '"+ctx.from.id+"'",async function (err, result) {
  // console.log(ctx.message.text)
      if (err) throw err;
      if (result.length > 0) {
          try {
          var results=JSON.parse(JSON.stringify(result))
          let sender = results[0].walletAdd;
  let pk = results[0].walletPk;
  var filterpk = pk.split("0x");
  PrivateKey = Buffer.from(filterpk[1], 'hex');
  let text = ctx.message.text;
  
  const myArray = text.split(" ");
  const tokenaddress = myArray[1];
  let percentsplit = myArray[2].split("%")
  var percent = percentsplit[0]
  // const amountbnb = web3.utils.toWei(myArray[2], 'ether');
  
  selltokenBSC(sender,PrivateKey,tokenaddress,ctx.from.id,percent);
  // console.log(res);
          } catch (error) {
              console.error(error)
          }
          
        }
        
    });
  

})

bot.command('create', ctx => {
    // console.log(ctx.from)
    con.query("SELECT * FROM user WHERE telegramId = '"+ctx.from.id+"'", function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            // Action A
            try {
              
            
            var results=JSON.parse(JSON.stringify(result))
            // var nBalance = web3.eth.getBalance(results[0].walletAdd).then(console.log);
            // console.log(typeof(nBalance), nBalance)

            // console.log(web3.eth.getBalance(results[0].walletAdd))
            web3.eth.getBalance(results[0].walletAdd).then(nBalance => {
                const decimals = 18;
                const etherBalance = ethers.utils.formatUnits(nBalance, decimals);
                // console.log(decimals)
            
                wlcMsg = 'Hey '+ctx.from.first_name+' \nHere is detail about your Telesnipe wallet\nWallet Address: `'+results[0].walletAdd+'`\nBalance: '+etherBalance+' BNB';
                
                bot.telegram.sendMessage(ctx.from.id, wlcMsg, markup)
                bot.telegram.sendMessage(ctx.chat.id, "Already has Telesnipe wallet\nDetail sending on direct message", markup)
            })
            .catch(error => {
                console.error(`Error: ${error}`);
            });
            // console.log(nBalances)
            // balance = web3.utils.toWei(nBalance,'ether');
            // console.log(balance)
            // nBalance = web3.utils.toWei(toString(balance), 'ether');
          } catch (error) {
              
          }
          } else {
            // Action B
            try {
              
            
            let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    // let detail = JSON.parse(account);
    const message = 'Here is your Wallet\nAddress : `'+account.address+'`\nPK: `'+account.privateKey+'`\nPlease save/copy _PrivateKey_ into safe place before you start to snipe'
    
        var sql = "INSERT INTO user (telegramId, walletAdd, walletPk) VALUES ('"+ctx.from.id+"', '"+account.address+"', '"+account.privateKey+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
        //   console.log("1 record inserted");
        });
        // console.log(ctx.chat)
        bot.telegram.sendMessage(ctx.chat.id, "Sending wallet detail in DM", markup)
        bot.telegram.sendMessage(ctx.from.id, message, markup)
      } catch (error) {
              
      }
          }
      });    
    
    // console.log(ctx.from.id)
    // ctx.deleteMessage();
    
})

bot.command('test', ctx => {
    // var sender = '0x0F6C7514EC3b6277F509e5E4B217695e88c5f173'

    // const myArray = text.split(" ");
    // const tokenaddress = myArray[1];
    // eko = getTokenDetail(sender, tokenaddress)
    // console.log(ctx.message.from.id)
    bot.telegram.sendMessage(ctx.message.from.id, "helloooooooow", markup)
})

bot.action('tutorial', ctx => {
    // let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    // let detail = JSON.parse(account);
    const message = '/buy CA amountbnb'
        bot.telegram.sendMessage(ctx.chat.id, message, markup)

})

bot.action('delete', ctx => {
    con.query("SELECT * FROM user WHERE telegramId = '"+ctx.from.username+"'", function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            // Action A
            var results=JSON.parse(JSON.stringify(result))
            web3.eth.accounts.wallet.remove(results[0].walletAdd);
           
            const message = 'Your wallet succesfully deleted'
            var sql = "DELETE FROM user WHERE telegramId = '"+ctx.from.username+"'";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });
            bot.telegram.sendMessage(ctx.chat.id, message, { parseMode: 'markdown' })
          }
        })
    // let detail = JSON.parse(account);
})

bot.launch();