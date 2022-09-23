const {PRIVATE_KEY, TOKEN_ID, DEPOSIT_FEE, WITHDRAW_FEE, MAPPING_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN} = require('./config');
const trc721Contract = require('./contracts').trc721Contract;
const trc20Contract = require('./contracts').trc20Contract;
const tronWebBuilder = require('./tronWebBuilder');
const broadcaster = require('./broadcaster');
const jlog = require('./jlog')
const wait = require('./wait');
const HashMap = require('hashmap') ;
const chalk = require('chalk')
const util = require('util');
const chai = require('chai');
const assert = chai.assert;

const accAdd = async (A, B) => {
    var r1,r2,m;
    try{r1=A.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=B.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (A*m+B*m)/m
}

const sumBigNumber = async (a, b) => {
    var res = '',
        temp = 0;
    a = a.toString().split('');
    b = b.toString().split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}

const reduce = async (a, b) => {
    console.log("a:"+a)
    console.log("b:"+b)
    a = a.toString().split('');
    b = b.toString().split('');
    var aMaxb = a.length > b.length; // 标记A是否大于B
    if(a.length == b.length)
    {
        for(var i=0, len=a.length; i<len; i++)
        {
            if(a[i] == b[i]) continue;
            aMaxb = a[i] > b[i];
            break;
        }
    }
    if(!aMaxb){
        a = [b, b = a][0]; // 只要A不比B大都交换
    }
    var result = '';
    while(a.length)
    {
        var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
        if(temp >= 0) {
            result = temp + result;
        } else{
            result = temp + 10 + result;
            a[a.length-1]--; // 由于已经保证了a一定大于等于b，所以不存在a[i-1]为undefined的情况
        }
    }
    var resultEnd = (aMaxb?'':'-') + result.replace(/^0*/g, '');// 去掉前面可能的无效0
    if(resultEnd === '-'){
        resultEnd = '0'
    }
    return resultEnd;
}

const depositTrx = async (depositNum) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let depositNonce = "";
    let depositTxFee = "";
    const depositId = await tronWeb.sidechain.depositTrx(depositNum, DEPOSIT_FEE,FEE_LIMIT);
    // console.log("depositId:"+depositId)
    assert.equal(depositId.length, 64);
    await wait(90);
    const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
    assert.equal("SUCCESS", depositInfo.receipt.result);
    depositNonce = depositInfo.contractResult[0];
    depositNonce = tronWeb.BigNumber(depositNonce, 16).valueOf();
    // console.log("depositInfo:"+depositInfo)
    depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
    console.log('depositTxFee: ' + depositTxFee)

    map.set("depositNonce", depositNonce);
    map.set("depositTxFee", depositTxFee);
    return map;
}

const withdrawTrx = async (withdrawNum) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let withdrawNonce = "";
    let withdrawTxFee = "";
    const withdrawId = await tronWeb.sidechain.withdrawTrx(withdrawNum, WITHDRAW_FEE,FEE_LIMIT);
    console.log("withdrawId: "+withdrawId);
    assert.equal(withdrawId.length, 64);
    await wait(90);
    const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
    assert.equal("SUCCESS", withdrawInfo.receipt.result);
    withdrawNonce = withdrawInfo.contractResult[0];
    withdrawNonce = tronWeb.BigNumber(withdrawNonce, 16).valueOf();
    withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
    console.log('withdrawTxFee: ' + withdrawTxFee)

    map.set("withdrawNonce", withdrawNonce);
    map.set("withdrawTxFee", withdrawTxFee);
    return map;
}

const depositTrc10 = async (depositNum) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let depositNonce = "";
    let depositTxFee = "";

    const depositId = await tronWeb.sidechain.depositTrc10(TOKEN_ID, depositNum, DEPOSIT_FEE, FEE_LIMIT);
    console.log('depositId: ' + depositId)
    assert.equal(depositId.length, 64);
    await wait(80);
    const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
    assert.equal("SUCCESS", depositInfo.receipt.result);
    depositNonce = depositInfo.contractResult[0];
    depositNonce = tronWeb.BigNumber(depositNonce, 16).valueOf();
    depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
    console.log('depositTxFee: ' + depositTxFee)

    map.set("depositNonce", depositNonce);
    map.set("depositTxFee", depositTxFee);
    return map;
}

const withdrawTrc10 = async (withdrawNum) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let withdrawNonce = "";
    let withdrawTxFee = "";

    const withdrawId = await tronWeb.sidechain.withdrawTrc10(TOKEN_ID, withdrawNum, WITHDRAW_FEE, FEE_LIMIT);
    console.log('withdrawId: ' + withdrawId)
    assert.equal(withdrawId.length, 64);
    await wait(90);
    const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
    assert.equal("SUCCESS", withdrawInfo.receipt.result);
    withdrawNonce = withdrawInfo.contractResult[0];
    withdrawNonce = tronWeb.BigNumber(withdrawNonce, 16).valueOf();
    withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
    console.log('withdrawTxFee: ' + withdrawTxFee)

    map.set("withdrawNonce", withdrawNonce);
    map.set("withdrawTxFee", withdrawTxFee);
    return map;
}

const approveTrc20 = async (approveNum, contractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let approveTxFee = "";

    const approveId = await tronWeb.sidechain.approveTrc20(approveNum, FEE_LIMIT, contractAddress)
    console.log("approveId: "+approveId);
    assert.equal(approveId.length, 64);
    await wait(90);
    const approveInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(approveId);
    assert.equal("SUCCESS", approveInfo.receipt.result);
    approveTxFee = typeof(approveInfo.fee)=="undefined"?0:approveInfo.fee;
    console.log('approveTxFee: ' + approveTxFee)

    map.set("approveTxFee", approveTxFee);
    return map;
}

const depositTrc20 = async (depositNum, contractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let depositNonce = "";
    let depositTxFee = "";

    const depositId = await tronWeb.sidechain.depositTrc20(depositNum, DEPOSIT_FEE, FEE_LIMIT, contractAddress);
    console.log("depositId: "+depositId);
    assert.equal(depositId.length, 64);
    await wait(80);
    const depositInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
    assert.equal("SUCCESS", depositInfo.receipt.result);
    depositNonce = depositInfo.contractResult[0];
    depositNonce = tronWeb.BigNumber(depositNonce, 16).valueOf();
    depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
    console.log('depositTxFee: ' + depositTxFee)

    map.set("depositNonce", depositNonce);
    map.set("depositTxFee", depositTxFee);
    return map;
}

const withdrawTrc20 = async (withdrawNum, sideChainContractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let withdrawNonce = "";
    let withdrawTxFee = "";

    const withdrawId = await tronWeb.sidechain.withdrawTrc20(withdrawNum, WITHDRAW_FEE, FEE_LIMIT, sideChainContractAddress);
    assert.equal(withdrawId.length, 64);
    console.log("withdrawId: "+withdrawId);
    await wait(80);
    const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
    assert.equal("SUCCESS", withdrawInfo.receipt.result);
    withdrawNonce = withdrawInfo.contractResult[0];
    withdrawNonce = tronWeb.BigNumber(withdrawNonce, 16).valueOf();
    withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
    console.log('withdrawTxFee: ' + withdrawTxFee)

    map.set("withdrawNonce", withdrawNonce);
    map.set("withdrawTxFee", withdrawTxFee);
    return map;
}

const approveTrc721 = async (trc721Id, contractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let approveTxFee = "";

    const approveId = await tronWeb.sidechain.approveTrc721(trc721Id, FEE_LIMIT, contractAddress)
    console.log("approveId: "+approveId);
    assert.equal(approveId.length, 64);
    await wait(90);
    const approveInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(approveId);
    assert.equal("SUCCESS", approveInfo.receipt.result);
    approveTxFee = typeof(approveInfo.fee)=="undefined"?0:approveInfo.fee;
    console.log('approveTxFee: ' + approveTxFee)

    map.set("approveTxFee", approveTxFee);
    return map;
}

const depositTrc721 = async (trc721Id, contractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let depositNonce = "";
    let depositTxFee = "";

    const depositId = await tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE,FEE_LIMIT, contractAddress);
    console.log("depositId: "+depositId);
    assert.equal(depositId.length, 64);
    await wait(90);
    const depositInfo =await tronWeb.sidechain.mainchain.trx.getTransactionInfo(depositId);
    // console.log("depositInfo: "+util.inspect(depositInfo));
    assert.equal("SUCCESS", depositInfo.receipt.result);
    depositNonce = depositInfo.contractResult[0];
    depositNonce = tronWeb.BigNumber(depositNonce, 16).valueOf();
    depositTxFee = typeof(depositInfo.fee)=="undefined"?0:depositInfo.fee;
    console.log('depositTxFee: ' + depositTxFee)

    map.set("depositNonce", depositNonce);
    map.set("depositTxFee", depositTxFee);
    return map;
}

const withdrawTrc721 = async (trc721Id, sideChainContractAddress) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let withdrawNonce = "";
    let withdrawTxFee = "";

    const withdrawId = await tronWeb.sidechain.withdrawTrc721(trc721Id, WITHDRAW_FEE,FEE_LIMIT, sideChainContractAddress);
    console.log("withdrawId: "+withdrawId);
    assert.equal(withdrawId.length, 64);
    await wait(90);
    const withdrawInfo =await tronWeb.sidechain.sidechain.trx.getTransactionInfo(withdrawId);
    assert.equal("SUCCESS", withdrawInfo.receipt.result);
    withdrawNonce = withdrawInfo.contractResult[0];
    withdrawNonce = tronWeb.BigNumber(withdrawNonce, 16).valueOf();
    withdrawTxFee = typeof(withdrawInfo.fee)=="undefined"?0:withdrawInfo.fee;
    console.log('withdrawTxFee: ' + withdrawTxFee)

    map.set("withdrawNonce", withdrawNonce);
    map.set("withdrawTxFee", withdrawTxFee);
    return map;
}

const deployTrc20ContractAndMapping = async () =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let createTxId = "";
    let contractAddress = "";
    let sideChainContractAddress = "";
    let deployMap = await deployTrc20Contract();
    createTxId = deployMap.get("createTxId");
    contractAddress = deployMap.get("contractAddress");
    let mappingMap = await mappingTrc20Contract(contractAddress, createTxId);
    sideChainContractAddress = mappingMap.get("sideChainContractAddress");

    map.set("createTxId", createTxId);
    map.set("contractAddress", contractAddress);
    map.set("sideChainContractAddress", sideChainContractAddress);
    return map;
}

const deployTrc20Contract = async () =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let createTxId = "";
    let contractAddress = "";
    // deploy trc20 contract in mainChain
    const options = {
        abi: trc20Contract.abi,
        bytecode: trc20Contract.bytecode,
        parameters: [ADDRESS_BASE58],
        feeLimit:FEE_LIMIT,
    };
    const createTransaction = await tronWeb.sidechain.mainchain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
    const createTx = await broadcaster.broadcasterInSideMain(null, PRIVATE_KEY, createTransaction);
    // console.log("createTx:"+util.inspect(createTx))
    createTxId = createTx.transaction.txID;
    console.log("createTxId:"+createTxId)
    assert.equal(createTxId.length, 64);
    let createInfo;
    while (true) {
        createInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(createTxId);
        if (Object.keys(createInfo).length === 0) {
            await wait(3);
            continue;
        } else {
            // console.log("createInfo:"+util.inspect(createInfo))
            break;
        }
    }
    assert.equal("SUCCESS", createInfo.receipt.result);
    contractAddress = createInfo.contract_address;
    contractAddress = tronWeb.address.fromHex(contractAddress)
    console.log("contractAddress:"+tronWeb.address.fromHex(contractAddress))

    map.set("createTxId", createTxId);
    map.set("contractAddress", contractAddress);
    return map;
}

const mappingTrc20Contract = async (contractAddress, createTxId) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let mappingNonce = "";
    let sideChainContractAddress = "";
    // mapping
    let mappingId = await tronWeb.sidechain.mappingTrc20(createTxId, MAPPING_FEE, FEE_LIMIT);
    // console.log("mappingTrc20Id:"+util.inspect(mappingId,true,null,true))
    assert.equal(mappingId.length, 64);
    await wait(90);
    const mappingInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(mappingId);
    assert.equal("SUCCESS", mappingInfo.receipt.result);
    // console.log("mappingTrc20Info:"+util.inspect(mappingInfo,true,5,true))
    mappingNonce = mappingInfo.contractResult[0];
    mappingNonce = tronWeb.BigNumber(mappingNonce, 16).valueOf();
    const mappingTxFee = typeof(mappingInfo.fee)=="undefined"?0:mappingInfo.fee;
    // console.log('mappingTxFee: ' + mappingTxFee)

    // mainToSideContractMap
    const sideChainContractResult = await tronWeb.sidechain.sidechain.transactionBuilder.triggerConstantContract(
        SIDE_CHAIN.sideOptions.sideGatewayAddress,
        "mainToSideContractMap(address)",
        {},
        [{type: 'address', value: contractAddress}]);
    console.log("sideChainContractResult:"+util.inspect(sideChainContractResult,true,5,true))
    sideChainContractAddress = sideChainContractResult.constant_result;
    sideChainContractAddress = tronWeb.address.fromHex("41"+sideChainContractAddress.toString().substr(24))
    console.log("sideChainContractAddress:"+sideChainContractAddress);

    map.set("mappingNonce", mappingNonce);
    map.set("sideChainContractAddress", sideChainContractAddress);
    return map;
}

const deployTrc721ContractAndMappingAndMint = async () =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let createTxId;
    let contractAddress;
    let trc721Id;
    let sideChainContractAddress;
    let deployMap = await deployTrc721Contract();
    createTxId = deployMap.get("createTxId");
    contractAddress = deployMap.get("contractAddress");
    let mappingMap = await mappingTrc721Contract(contractAddress, createTxId);
    sideChainContractAddress = mappingMap.get("sideChainContractAddress");
    let mintMap = await mintTrc721(contractAddress,1001);
    trc721Id = mintMap.get("trc721Id");

    map.set("trc721Id", trc721Id);
    map.set("createTxId", createTxId);
    map.set("contractAddress", contractAddress);
    map.set("sideChainContractAddress", sideChainContractAddress);
    return map;
}

const deployTrc721Contract = async () =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let createTxId;
    let contractAddress;
    // deploy trc721 contract in mainChain
    const options = {
        abi: trc721Contract.abi,
        bytecode: trc721Contract.bytecode,
        feeLimit:FEE_LIMIT,
        parameters: [ADDRESS_BASE58,"721s","721"]
    };
    const createTransaction = await tronWeb.sidechain.mainchain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
    // console.log("createTransaction:"+JSON.stringify(createTransaction))
    const createTx = await broadcaster.broadcasterInSideMain(null, PRIVATE_KEY, createTransaction);
    createTxId = createTx.transaction.txID;
    console.log("deployTrc721ContractTxId:"+createTxId)
    // console.log("createTx:"+JSON.stringify(createTx))
    assert.equal(createTxId.length, 64);
    let createInfo;
    while (true) {
        createInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(createTxId);
        if (Object.keys(createInfo).length === 0) {
            await wait(3);
            continue;
        } else {
            // console.log("createInfo:"+util.inspect(createInfo))
            break;
        }
    }
    assert.equal("SUCCESS", createInfo.receipt.result);
    contractAddress = createInfo.contract_address;
    contractAddress = tronWeb.address.fromHex(contractAddress)
    console.log("contractAddress:"+contractAddress)

    map.set("createTxId", createTxId);
    map.set("contractAddress", contractAddress);
    return map;
}

const mappingTrc721Contract = async (contractAddress, createTxId) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    let mappingNonce = "";
    let sideChainContractAddress;
    // mapping
    let mappingId = await tronWeb.sidechain.mappingTrc721(createTxId, MAPPING_FEE, FEE_LIMIT);
    console.log("mappingTrc721Id:"+util.inspect(mappingId,true,null,true))
    assert.equal(mappingId.length, 64);
    await wait(90);
    const mappingInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(mappingId);
    assert.equal("SUCCESS", mappingInfo.receipt.result);
    console.log("mappingTrc721Info:"+util.inspect(mappingInfo,true,5,true))
    mappingNonce = mappingInfo.contractResult[0];
    mappingNonce = tronWeb.BigNumber(mappingNonce, 16).valueOf();
    const mappingTxFee = typeof(mappingInfo.fee)=="undefined"?0:mappingInfo.fee;
    console.log('mappingTxFee: ' + mappingTxFee)

    // mainToSideContractMap
    const sideChainContractResult = await tronWeb.sidechain.sidechain.transactionBuilder.triggerConstantContract(
        SIDE_CHAIN.sideOptions.sideGatewayAddress,
        "mainToSideContractMap(address)",
        {},
        [{type: 'address', value: contractAddress}]);
    // console.log("sideChainContractResult:"+util.inspect(sideChainContractResult,true,5,true))
    sideChainContractAddress = sideChainContractResult.constant_result;
    sideChainContractAddress = tronWeb.address.fromHex("41"+sideChainContractAddress.toString().substr(24))
    console.log("sideChainContractAddress:"+sideChainContractAddress)

    map.set("mappingNonce", mappingNonce);
    map.set("sideChainContractAddress", sideChainContractAddress);
    return map;
}

const mintTrc721 = async (contractAddress,trc721Id) =>{
    const tronWeb = tronWebBuilder.createInstanceSide();
    let map = new HashMap();
    // mint(address,uint256)
    const functionSelector = 'mint(address,uint256)';
    const mintTransaction = await tronWeb.sidechain.mainchain.transactionBuilder.triggerSmartContract(
        contractAddress,
        functionSelector,
        {},
        [{type: 'address', value: ADDRESS_BASE58},{type: 'uint256', value: trc721Id}]);
    // console.log("mintTransaction:"+util.inspect(mintTransaction))
    const mintTx = await broadcaster.broadcasterInSideMain(null, PRIVATE_KEY, mintTransaction.transaction);
    // console.log("mintTx:"+util.inspect(mintTx))
    assert.equal(mintTx.transaction.txID.length, 64);
    let mintInfo;
    while (true) {
        mintInfo = await tronWeb.sidechain.mainchain.trx.getUnconfirmedTransactionInfo(mintTx.transaction.txID);
        if (Object.keys(mintInfo).length === 0) {
            await wait(3);
            continue;
        } else {
            // console.log("mintInfo:"+util.inspect(mintInfo))
            break;
        }
    }
    assert.equal("SUCCESS", mintInfo.receipt.result);

    map.set("trc721Id", trc721Id);
    await wait(20);
    return map;
}

const deployContract = async (contract, parametersArray = []) =>{
    const tronWeb = tronWebBuilder.createInstance();
    let createTxId = "";
    let contractAddress = "";
    // deploy contract in mainChain
    const options = {
        abi: contract.abi,
        bytecode: contract.bytecode,
        feeLimit:FEE_LIMIT,
        parameters: parametersArray
    };
    const createTransaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
    const createTx = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction);
    createTxId = createTx.transaction.txID;
    console.log("createTxId: "+createTxId)
    assert.equal(createTxId.length, 64);
    let createInfo;
    while (true) {
        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
        if (Object.keys(createInfo).length === 0) {
            await wait(3);
            continue;
        } else {
            // console.log("createInfo:"+util.inspect(createInfo))
            break;
        }
    }
    assert.equal("SUCCESS", createInfo.receipt.result);
    contractAddress = createInfo.contract_address;
    contractAddress = tronWeb.address.fromHex(contractAddress)
    console.log("contractAddress: "+contractAddress)
    return contractAddress;
}

const to64String = async (str) =>{
    str = str.replace('0x', '')
    const l = str.length;
    let sres = "";
    for (var i =0 ; i < 64 -l;i++ ){
        sres +="0";
    }
    sres += str;
    return sres;;
}

const equalIgnoreCase = async (str1, str2) =>{
    assert.equal(str1.toUpperCase(), str2.toUpperCase());
}

module.exports = {
    reduce,
    sumBigNumber,
    accAdd,
    depositTrx,
    withdrawTrx,
    depositTrc10,
    withdrawTrc10,
    approveTrc20,
    depositTrc20,
    withdrawTrc20,
    approveTrc721,
    depositTrc721,
    withdrawTrc721,
    deployTrc20ContractAndMapping,
    deployTrc20Contract,
    mappingTrc20Contract,
    deployTrc721ContractAndMappingAndMint,
    deployTrc721Contract,
    mappingTrc721Contract,
    mintTrc721,
    deployContract,
    to64String,
    equalIgnoreCase
}
