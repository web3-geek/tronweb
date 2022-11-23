const chalk = require('chalk')
const TronWeb = require('../../setup/TronWeb');
// const TronWeb = require('tronweb')
const jlog = require('./jlog')
const util = require('util');
var fs = require('fs')


const {FULL_NODE_API, SOLIDITY_NODE_API, EVENT_API, PRIVATE_KEY, SUN_NETWORK, SIDE_CHAIN, TEST_TRON_GRID_API} = require('./config')


const createInstanceSide = (extraOptions = {}, sideExtraOptions = {}) => {
    let options = Object.assign({
        // fullHost: SIDE_CHAIN.fullNode,
        fullNode: SIDE_CHAIN.fullNode,
        solidityNode: SIDE_CHAIN.solidityNode,
        eventServer: SIDE_CHAIN.eventServer,
        privateKey: PRIVATE_KEY,
    }, extraOptions)
    let sideOptions = Object.assign({
        // fullHost: SIDE_CHAIN.sideOptions.fullNode,
        fullNode: SIDE_CHAIN.sideOptions.fullNode,
        solidityNode: SIDE_CHAIN.sideOptions.solidityNode,
        eventServer: SIDE_CHAIN.sideOptions.eventServer,
        mainGatewayAddress: SIDE_CHAIN.sideOptions.mainGatewayAddress,
        sideGatewayAddress: SIDE_CHAIN.sideOptions.sideGatewayAddress,
        sideChainId: SIDE_CHAIN.sideOptions.sideChainId
    }, sideExtraOptions);
    return new TronWeb(options, sideOptions);
}

const createInstance = (extraOptions = {}) => {
    let options = Object.assign({
        fullNode: SIDE_CHAIN.fullNode,
        solidityNode: SIDE_CHAIN.solidityNode,
        eventServer: SIDE_CHAIN.eventServer,
        // fullHost: FULL_NODE_API,
        // solidityNode: SOLIDITY_NODE_API,
        // eventServer: EVENT_API,
        // fullHost: TEST_TRON_GRID_API,
        privateKey: PRIVATE_KEY,
    }, extraOptions)
    return new TronWeb(options);
}

let instance

const getInstance = () => {
    if (!instance) {
        instance = createInstance()
    }
    return instance
}

const newTestAccounts = async (amount) => {
    const tronWeb = createInstance();

    console.log(chalk.blue(`Generating ${amount} new accounts...`))
    await tronWeb.fullNode.request('/admin/temporary-accounts-generation?accounts=' + amount);
    const lastCreated = await getTestAccounts(-1)
    jlog(lastCreated.b58)
}

const newTestAccountsInMain = async (amount) => {
    const tronWeb = createInstance();

    let accounts="";
    for (let i = 0; i < amount; i++) {
        const newAccount1 = await tronWeb.createAccount();
        await tronWeb.trx.sendTrx(newAccount1.address.hex,10000000000,{privateKey: PRIVATE_KEY})
        if (i == amount-1) {
            accounts+=newAccount1.privateKey;
        } else {
            accounts+=newAccount1.privateKey+"\n";
        }
    }

    fs.writeFile('./accountsInMain', accounts, function (error) {
        if (error) {
            console.log('生成新账户失败')
        } else {
            console.log('生成新账户成功了')
        }
    })
}

const getTestAccountsInMain = async () => {
    let accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = createInstance();

    return new Promise((resolve,reject)=>{
        fs.readFile('./accountsInMain',function (error, data) {
            if (error) {
                console.log('读取文件失败了')
                reject(err);
            } else {
                var array = data.toString().split("\n");
                // var num = array.length >= number ? number : array.length;
                // console.log("num:"+num)
                // array.forEach(function(i) {
                //
                // });
                for(i in array) {
                    accounts.pks.push(array[i]);

                    let addr = tronWeb.address.fromPrivateKey(array[i]);
                    accounts.b58.push(addr);
                    accounts.hex.push(tronWeb.address.toHex(addr));
                }
                console.log("accounts:"+util.inspect(accounts,true,null,true));
                return resolve(accounts);
            }
        })
    })
}

const getTestAccounts = async (block) => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const tronWeb = createInstance();
    const accountsJson = await tronWeb.fullNode.request('/admin/accounts-json');
    const index = typeof block === 'number'
        ? (block > -1 && block < accountsJson.more.length ? block : accountsJson.more.length - 1)
        : undefined
    accounts.pks = typeof block === 'number'
        ? accountsJson.more[index].privateKeys
        : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = tronWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
}

module.exports = {
    createInstance,
    getInstance,
    createInstanceSide,
    newTestAccounts,
    newTestAccountsInMain,
    getTestAccounts,
    getTestAccountsInMain,
    TronWeb
}

