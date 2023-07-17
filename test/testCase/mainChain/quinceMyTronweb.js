const tronWebBuilder = require('../util/tronWebBuilder');
const assertEqualHex = require('../util/assertEqualHex');
const waitChainData = require('../util/waitChainData');
const assertThrow = require('../util/assertThrow');
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const TronWeb = tronWebBuilder.TronWeb;
const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const util = require('util');
const {typedDataTest1} = require('../util/contracts');
const { loadTests } = require('../util/disk-utils');
const ethers = require('ethers');

const {
    ADDRESS_BASE58,
    ADDRESS_HEX,
    PRIVATE_KEY,
    getTokenOptions,
    FULL_NODE_API,
    WITNESS_ACCOUNT,
    WITNESS_KEY,
    WITNESS_ACCOUNT2,
    WITNESS_KEY2
} = require('../util/config');
const testRevertContract = require('../util/contracts').testRevert;
const messageCases = require('../../testcases/src/sign-message');
const tests = messageCases.tests;


describe('TronWeb.trx', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        console.log("11111")
        tronWeb = tronWebBuilder.createInstance();
        console.log("22222")
        //tronWeb.isConnected().then(result=>{console.log("tronweb:",result)})
        console.log("33333")
        //await tronWebBuilder.newTestAccountsInMain(43);
        //accounts = await tronWebBuilder.getTestAccountsInMain(43);
        //emptyAccount = await TronWeb.createAccount();
    });
    describe('tronweb()', function () {

            it.only('common usage', async function () {

                //utils
                const value = TronWeb.BigNumber('200000000000000000000001');
                console.log("value:",value);
                assert.equal(value, '200000000000000000000001');


                /*tronWeb.isConnected().then(result=>{console.log("tronweb:",result)})
                let abi = {"entrys":[{"outputs":[{"type":"string"}],"constant":true,"name":"name","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalSupply","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint8"}],"constant":true,"name":"decimals","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","stateMutability":"View","type":"Function"},{"outputs":[{"type":"string"}],"constant":true,"name":"symbol","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","stateMutability":"View","type":"Function"},{"stateMutability":"Nonpayable","type":"Constructor"},{"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"Transfer","type":"Event"},{"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"Approval","type":"Event"}]}
                let contract = await tronWeb.contract(abi.entrys,'TGvhNCbej2zDdTzw1yQAW9VSdhigKCEgBj');
                //console.log("contract: ",contract);
                let result = await contract["totalSupply"]().call();
                const value = TronWeb.BigNumber(result._hex);
                console.log("result: ",result);
                console.log("value: ",value.toString());*/
                //accounts = await tronWebBuilder.getTestAccounts(-1);
                //tronWeb.trx.getChainParameters().then(result=>{console.log("getChainParameters: ",result)})
                /*data = tronWeb.trx.getAccountInfoById("7175696e636554657374313233", {confirmed: true}, false)
                console.log("getAccountById: ",data)*/
                //data = tronWeb.trx.getAccountById("7175696e636554657374313233").then(data=>{console.log("data: ",data)})
                //data = tronWeb.trx.listExchanges().then(data=>{console.log("data: ",data)})
                /*const txJson = await tronWeb.transactionBuilder.sendTrx("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
                const txPb = TronWeb.utils.transaction.txJsonToPb(txJson);
                const txID = tronWeb.utils.transaction.txPbToTxID(txPb);
                console.log("txID",txID);*/

                //broadcast wait
                /*while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }*/

                //JSON.stringify(result, null, 2)
            });
        });


})
