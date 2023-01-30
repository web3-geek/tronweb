const {PRIVATE_KEY,ORACLE_PRIVATE_KEY, RETRY_DEPOSIT_FEE, DEPOSIT_FEE, WITHDRAW_FEE, TOKEN_ID, FEE_LIMIT, ADDRESS_BASE58, ADDRESS_HEX, SIDE_CHAIN} = require('../util/config');
const trc721Contract = require('../util/contracts').trc721Contract;
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../util/assertThrow');
const publicMethod = require('../util/PublicMethod');
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const chai = require('chai');
const util = require('util');
const assert = chai.assert;

describe('TronWeb Instance', function() {
    const tronWeb = tronWebBuilder.createInstanceSide();
    let createTrc20TxId;
    let trc20ContractAddress;
    let sideChainTrc20ContractAddress;
    let createTrc721TxId;
    let trc721ContractAddress;
    let trc721Id;
    let sideChainTrc721ContractAddress;
    let newOtherAccountKey;
    let newOtherAccount;
    let newOtherAddress;
    let sideOracleAddress;
    before(async function () {
        // generate a new account
        // newOtherAccount = await tronWeb.utils.accounts.generateAccount();
        // newOtherAccountKey = newOtherAccount.privateKey;
        newOtherAccountKey = "04E873F2920C6282FA70D0B5F485B7F456BBCD07771DD64FD46958B5A7C6DBA9";
        console.log("newOtherAccountKey:"+newOtherAccountKey)
        assert.equal(newOtherAccountKey.length, 64);
        newOtherAddress = tronWeb.address.fromPrivateKey(newOtherAccountKey);
        console.log("newOtherAddress:"+newOtherAddress)

        // sideOracleAddress
        sideOracleAddress = tronWeb.address.fromPrivateKey(ORACLE_PRIVATE_KEY);

        // deploy trc20、721contract
        let deployTrc20Map = await publicMethod.deployTrc20ContractAndMapping();
        createTrc20TxId = deployTrc20Map.get("createTxId");
        trc20ContractAddress = deployTrc20Map.get("contractAddress");
        sideChainTrc20ContractAddress = deployTrc20Map.get("sideChainContractAddress");
        let deployTrc721Map = await publicMethod.deployTrc721ContractAndMappingAndMint();
        trc721Id = deployTrc721Map.get("trc721Id");
        createTrc721TxId = deployTrc721Map.get("createTxId");
        trc721ContractAddress = deployTrc721Map.get("contractAddress");
        sideChainTrc721ContractAddress = deployTrc721Map.get("sideChainContractAddress");
    });
    describe('#retryDeposit', function () {
        it('retryDeposit normal(sideOracle balance is zero)', async function () {
            // freezeBalance sideOracle for get bandwidth
            const freezeForBandwidthTx = await tronWeb.sidechain.sidechain.trx.freezeBalance(20e6, 3, 'BANDWIDTH', {privateKey:ORACLE_PRIVATE_KEY});
            // console.log("freezeForBandwidthTx:"+freezeForBandwidthTx.inspect(freezeTx))
            assert.isTrue(freezeForBandwidthTx.result);
            await wait(15);
            let freezeForBandwidthRes = await tronWeb.sidechain.sidechain.trx.getTransaction(freezeForBandwidthTx.txid);
            // console.log("freezeForBandwidthRes:"+JSON.stringify(freezeForBandwidthRes))
            assert.equal("SUCCESS",freezeForBandwidthRes.ret[0].contractRet)

            // get sideOracle balance
            let sideOracleAccount = await tronWeb.sidechain.sidechain.trx.getAccount(sideOracleAddress);
            let sideOracleBalance = sideOracleAccount.balance;
            console.log("sideOracleBalance:"+sideOracleBalance)

            // transfer sideOracle's all trx balance to other account
            const sendTrxTx = await tronWeb.sidechain.sidechain.trx.sendTrx(newOtherAddress, sideOracleBalance, {privateKey: ORACLE_PRIVATE_KEY});
            console.log("sendTrxTx:"+JSON.stringify(sendTrxTx))
            assert.isTrue(sendTrxTx.result);
            await wait(15);
            let sendTrxRes = await tronWeb.sidechain.sidechain.trx.getTransaction(sendTrxTx.txid);
            assert.equal("SUCCESS",sendTrxRes.ret[0].contractRet)
            sideOracleAccount = await tronWeb.sidechain.sidechain.trx.getAccount(sideOracleAddress);
            console.log("sideOracleAccount:"+JSON.stringify(sideOracleAccount))
            sideOracleBalance = typeof(sideOracleAccount.balance)=="undefined"?0:sideOracleAccount.balance;
            assert.equal(0, parseInt(sideOracleBalance));

            // depositTrx,will fail
            let mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            let sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mDepositTrxBalanceBefore = mAccountBefore.balance;
            let sDepositTrxBalanceBefore = sAccountBefore.balance;
            console.log('mDepositTrxBalanceBefore: ' + mDepositTrxBalanceBefore);
            console.log('sDepositTrxBalanceBefore: ' + sDepositTrxBalanceBefore);
            const depositTrxNum = 10e6;
            let depositTrxMap = await publicMethod.depositTrx(depositTrxNum);
            let depositTxFee = depositTrxMap.get("depositTxFee");
            let depositTrxNonce = depositTrxMap.get("depositNonce");
            let mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            let sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mDepositTrxBalanceAfter = mAccountAfter.balance;
            let sDepositTrxBalanceAfter = sAccountAfter.balance;
            console.log('mDepositTrxBalanceAfter: ' +  mDepositTrxBalanceAfter)
            console.log('sDepositTrxBalanceAfter: ' +  sDepositTrxBalanceAfter)
            // assert.equal(mDepositTrxBalanceAfter, mDepositTrxBalanceBefore - depositTrxNum - depositTxFee - DEPOSIT_FEE);
            assert.equal(sDepositTrxBalanceAfter, sDepositTrxBalanceBefore);

            // depositTrc10,will fail
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            let mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10Before.assetV2:"+mTrc10BalanceBefore);
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            let sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
            console.log("sAccountTrc10Before.assetV2:"+sTrc10BalanceBefore);
            const depositTrc10Num = 1000;
            let depositTrc10Map = await publicMethod.depositTrc10(depositTrc10Num);
            let depositTrc10Nonce = depositTrc10Map.get("depositNonce");
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountAfter.assetV2:"+mTrc10BalanceAfter);
            let sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("sAccountAfter.assetV2:"+sTrc10BalanceAfter);
            assert.equal(mTrc10BalanceBefore-depositTrc10Num,mTrc10BalanceAfter);
            assert.equal(sTrc10BalanceBefore,sTrc10BalanceAfter);

            // depositTrc20,will fail
            // approve
            let approveNum = 100;
            let approveTrc20Map = await publicMethod.approveTrc20(approveNum, trc20ContractAddress);
            let approveTrc20TxFee = approveTrc20Map.get("approveTxFee");
            // depositTrc20
            let mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(trc20ContractAddress);
            let mTrc20BalanceBefore = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            // mTrc20BalanceBefore = parseInt(mTrc20BalanceBefore, 16);
            console.log("mTrc20BalanceBefore："+mTrc20BalanceBefore);
            let sTrc20balanceResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            let sTrc20BalanceBefore = sTrc20balanceResultBefore && sTrc20balanceResultBefore.result ? new tronWeb.BigNumber(sTrc20balanceResultBefore.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceBefore:"+sTrc20BalanceBefore);
            const depositTrc20Num = 100;
            let depositTrc20Map = await publicMethod.depositTrc20(depositTrc20Num, trc20ContractAddress);
            let depositTrc20Nonce = depositTrc20Map.get("depositNonce");
            let mTrc20BalanceAfter = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            // mTrc20BalanceAfter = parseInt(mTrc20BalanceAfter, 16);
            console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
            let sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            let sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
            assert.equal(mTrc20BalanceBefore-depositTrc20Num,mTrc20BalanceAfter.toString());
            assert.equal(parseInt(sTrc20BalanceBefore),sTrc20BalanceAfter);

            // depositTrc721,will fail
            // approveTrc721
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, trc721ContractAddress);
            let approveTrc721TxFee = approveTrc721Map.get("approveTxFee");
            // depositTrc721
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
            let mTrc721BalanceBefore = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(mTrc721BalanceBefore,ADDRESS_HEX)
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainTrc721ContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );
            let depositTrc721Map = await publicMethod.depositTrc721(trc721Id, trc721ContractAddress);
            let depositTrc721Nonce = depositTrc721Map.get("depositNonce");
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(mTrc721BalanceAfter.toUpperCase(),SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase())
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainTrc721ContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );

            // get other account balance
            let newOtherAccount = await tronWeb.sidechain.sidechain.trx.getAccount(newOtherAddress);
            let newOtherBalance = newOtherAccount.balance;
            // transfer other account's all trx balance to oracle
            const sendTrxTx2 = await tronWeb.sidechain.sidechain.trx.sendTrx(sideOracleAddress, newOtherBalance-1000000, { privateKey: newOtherAccountKey});
            assert.isTrue(sendTrxTx2.result);
            await wait(15);
            let sendTrxRes2 = await tronWeb.sidechain.sidechain.trx.getTransaction(sendTrxTx2.txid);
            assert.equal("SUCCESS",sendTrxRes2.ret[0].contractRet)
            sideOracleAccount = await tronWeb.sidechain.sidechain.trx.getAccount(sideOracleAddress);
            sideOracleBalance = sideOracleAccount.balance;
            assert.isTrue(sideOracleBalance > 0);

            // retry depositTrx,will success
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            mDepositTrxBalanceBefore = mAccountBefore.balance;
            sDepositTrxBalanceBefore = sAccountBefore.balance;
            console.log('mDepositTrxBalanceBefore: ' + mDepositTrxBalanceBefore);
            console.log('sDepositTrxBalanceBefore: ' + sDepositTrxBalanceBefore);
            const retryDepositTrxId = await tronWeb.sidechain.retryDeposit(depositTrxNonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryDepositTrxId.length, 64);
            console.log("retryDepositTrxId: "+retryDepositTrxId);
            await wait(90);
            const retryDepositTrxInfo = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(retryDepositTrxId);
            assert.equal("SUCCESS", retryDepositTrxInfo.receipt.result);
            const retryDepositTrxFee = typeof(retryDepositTrxInfo.fee)=="undefined"?0:retryDepositTrxInfo.fee;
            console.log('retryDepositTrxFee: ' + retryDepositTrxFee)
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            mDepositTrxBalanceAfter = mAccountAfter.balance;
            sDepositTrxBalanceAfter = sAccountAfter.balance;
            console.log('mDepositTrxBalanceAfter: ' +  mDepositTrxBalanceAfter)
            console.log('sDepositTrxBalanceAfter: ' +  sDepositTrxBalanceAfter)
            // assert.equal(mDepositTrxBalanceAfter, mDepositTrxBalanceBefore - retryDepositTrxFee - RETRY_DEPOSIT_FEE);
            assert.equal(sDepositTrxBalanceAfter, parseInt(sDepositTrxBalanceBefore) + parseInt(depositTrxNum));

            // depositTrc10,will success
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10Before.assetV2:"+mTrc10BalanceBefore);
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
            console.log("sAccountTrc10Before.assetV2:"+sTrc10BalanceBefore);
            const retryDepositTrc10Id = await tronWeb.sidechain.retryDeposit(depositTrc10Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryDepositTrc10Id.length, 64);
            console.log("retryDepositTrc10Id: "+retryDepositTrc10Id);
            await wait(90);
            const retryDepositTrc10Info = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(retryDepositTrc10Id);
            assert.equal("SUCCESS", retryDepositTrc10Info.receipt.result);
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10After.assetV2:"+mTrc10BalanceAfter);
            sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("sAccountTrc10After.assetV2:"+sTrc10BalanceAfter);
            assert.equal(mTrc10BalanceBefore,mTrc10BalanceAfter);
            assert.equal(parseInt(sTrc10BalanceBefore) + parseInt(depositTrc10Num),sTrc10BalanceAfter);

            // depositTrc20,will success
            mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(trc20ContractAddress);
            mTrc20BalanceBefore = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            console.log("mTrc20BalanceBefore："+mTrc20BalanceBefore);
            sTrc20balanceResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            sTrc20BalanceBefore = sTrc20balanceResultBefore && sTrc20balanceResultBefore.result ? new tronWeb.BigNumber(sTrc20balanceResultBefore.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceBefore:"+sTrc20BalanceBefore);
            const retryDepositTrc20Id = await tronWeb.sidechain.retryDeposit(depositTrc20Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryDepositTrc20Id.length, 64);
            console.log("retryDepositTrc20Id: "+retryDepositTrc20Id);
            await wait(90);
            const retryDepositTrc20Info = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(retryDepositTrc20Id);
            assert.equal("SUCCESS", retryDepositTrc20Info.receipt.result);
            mTrc20BalanceAfter = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
            sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
            assert.equal(mTrc20BalanceBefore,mTrc20BalanceAfter.toString());
            assert.equal(parseInt(sTrc20BalanceBefore) + parseInt(depositTrc20Num),sTrc20BalanceAfter);

            // depositTrc721,will success
            mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
            mTrc721BalanceBefore = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase(), mTrc721BalanceBefore.toUpperCase())
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainTrc721ContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );
            const retryDepositTrc721Id = await tronWeb.sidechain.retryDeposit(depositTrc721Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryDepositTrc721Id.length, 64);
            console.log("retryDepositTrc721Id: "+retryDepositTrc721Id);
            await wait(90);
            const retryDepositTrc721Info = await tronWeb.sidechain.mainchain.trx.getTransactionInfo(retryDepositTrc721Id);
            assert.equal("SUCCESS", retryDepositTrc721Info.receipt.result);
            mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
            mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            let sTrc721OwnerResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc721ContractAddress,
                'ownerOf(uint256)',
                {_isConstant: true},
                [{type: 'uint256', value: trc721Id}]);
            let sTrc721OwnerAfter = sTrc721OwnerResultAfter && sTrc721OwnerResultAfter.result ? sTrc721OwnerResultAfter.constant_result[0].toLocaleString().toLowerCase() : 0;
            sTrc721OwnerAfter = "41"+sTrc721OwnerAfter.substr(24);
            assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase(), mTrc721BalanceAfter.toUpperCase())
            assert.equal(sTrc721OwnerAfter,ADDRESS_HEX)

        });
    });
    after(async function () {
        // transfer other account's all trx balance to oracle
        // get other account balance
        let newOtherAccount = await tronWeb.sidechain.sidechain.trx.getAccount(newOtherAddress);
        let newOtherBalance = newOtherAccount.balance;
        if (newOtherBalance > 1800000) {
            const sendTrxTx = await tronWeb.sidechain.sidechain.trx.sendTrx(sideOracleAddress, newOtherBalance-1000000, { privateKey: newOtherAccountKey});
            assert.isTrue(sendTrxTx.result);
            await wait(15);
            let sendTrxRes = await tronWeb.sidechain.sidechain.trx.getTransaction(sendTrxTx.txid);
            assert.equal("SUCCESS",sendTrxRes.ret[0].contractRet)
            let sideOracleAccount = await tronWeb.sidechain.sidechain.trx.getAccount(sideOracleAddress);
            let sideOracleBalance = sideOracleAccount.balance;
            assert.isTrue(sideOracleBalance > 0);
        }
    });
});









