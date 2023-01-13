const tronWebBuilder = require('./tronWebBuilder');
const wait = require('./wait');
const util = require('util');

const broadcaster = async (func, pk, transaction) => {
    const tronWeb = tronWebBuilder.createInstance();
    if( !transaction) {
        transaction = await func;
    }
    // console.log("transaction:"+util.inspect(transaction,true,null,true))
    const signedTransaction = await tronWeb.trx.sign(transaction, pk);
    console.log("signedTransaction:"+util.inspect(signedTransaction,true,null,true))
    let result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.trx.sendRawTransaction(signedTransaction)
    };

    let times = 0;
    while (times++ <= 10 && result.receipt.toString().indexOf("code") != -1 &&
    result.receipt.code == "SERVER_BUSY") {
        console.log("retry num is " + times);
        result = {
            transaction,
            signedTransaction,
            receipt: await tronWeb.trx.sendRawTransaction(signedTransaction)
        };
        await wait(1);
    }
    return Promise.resolve(result);
}

const broadcasterInSideChain = async (func, pk, transaction) =>  {
    const tronWeb = tronWebBuilder.createInstanceSide();
    if( !transaction) {
        transaction = await func;
    }
    // const signedTransaction = await tronWeb.sidechain.sign(transaction, pk);
    const signedTransaction = await tronWeb.sidechain.signTransaction(pk, transaction);
    console.log("signedTransaction:"+util.inspect(signedTransaction))
    let result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.sidechain.sidechain.trx.sendRawTransaction(signedTransaction)
    };

    let times = 0;
    while (times++ <= 10 && result.receipt.toString().indexOf("code") != -1 &&
    result.receipt.code == "SERVER_BUSY") {
        console.log("retry num is " + times);
        result = {
            transaction,
            signedTransaction,
            receipt: await tronWeb.sidechain.sidechain.trx.sendRawTransaction(signedTransaction)
        };
        await wait(1);
    }
    return Promise.resolve(result);
}

const broadcasterInSideMain = async (func, pk, transaction) =>  {
    const tronWeb = tronWebBuilder.createInstanceSide();
    if( !transaction) {
        transaction = await func;
    }
    // const signedTransaction = await tronWeb.sidechain.sign(transaction, pk);
    const signedTransaction = await tronWeb.sidechain.mainchain.trx.signTransaction(transaction, pk);
    // console.log("signedTransaction:"+JSON.stringify(signedTransaction))
    let result = {
        transaction,
        signedTransaction,
        receipt: await tronWeb.sidechain.mainchain.trx.sendRawTransaction(signedTransaction)
    };

    let times = 0;
    while (times++ <= 10 && result.receipt.toString().indexOf("code") != -1 &&
    result.receipt.code == "SERVER_BUSY") {
        console.log("retry num is " + times);
        result = {
            transaction,
            signedTransaction,
            receipt: await tronWeb.sidechain.mainchain.trx.sendRawTransaction(signedTransaction)
        };
        await wait(1);
    }
    return Promise.resolve(result);
}

module.exports = {
    broadcaster,
    broadcasterInSideChain,
    broadcasterInSideMain
}
