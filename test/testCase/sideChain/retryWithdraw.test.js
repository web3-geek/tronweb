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
    let mainOracleAddress;
    before(async function () {
        // generate a new account
        // newOtherAccount = await tronWeb.utils.accounts.generateAccount();
        // newOtherAccountKey = newOtherAccount.privateKey;
        newOtherAccountKey = "04E873F2920C6282FA70D0B5F485B7F456BBCD07771DD64FD46958B5A7C6DBA9";
        console.log("newOtherAccountKey:"+newOtherAccountKey)
        assert.equal(newOtherAccountKey.length, 64);
        newOtherAddress = tronWeb.address.fromPrivateKey(newOtherAccountKey);
        console.log("newOtherAddress:"+newOtherAddress)

        // mainOracleAddress
        mainOracleAddress = tronWeb.address.fromPrivateKey(ORACLE_PRIVATE_KEY);

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

        // depositTrx
        let mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
        let sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
        let mDepositTrxBalanceBefore = mAccountBefore.balance;
        let sDepositTrxBalanceBefore = sAccountBefore.balance;
        console.log('mDepositTrxBalanceBefore: ' + mDepositTrxBalanceBefore);
        console.log('sDepositTrxBalanceBefore: ' + sDepositTrxBalanceBefore);
        const depositTrxNum = 10e6;
        let depositTrxMap = await publicMethod.depositTrx(depositTrxNum);
        let depositTrxTxFee = depositTrxMap.get("depositTxFee");
        let mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
        let sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
        let mDepositTrxBalanceAfter = mAccountAfter.balance;
        let sDepositTrxBalanceAfter = sAccountAfter.balance;
        console.log('mDepositTrxBalanceAfter: ' +  mDepositTrxBalanceAfter)
        console.log('sDepositTrxBalanceAfter: ' +  sDepositTrxBalanceAfter)
        // assert.equal(mDepositTrxBalanceAfter, mDepositTrxBalanceBefore - depositTrxNum - depositTrxTxFee - DEPOSIT_FEE);
        assert.equal(sDepositTrxBalanceAfter, parseInt(sDepositTrxBalanceBefore) + parseInt(depositTrxNum));

        // depositTrc10
        mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
        let mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
        console.log("mAccountTrc10Before.assetV2:"+mTrc10BalanceBefore);
        sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
        let sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
        console.log("sAccountTrc10Before.assetV2:"+sTrc10BalanceBefore);
        const depositTrc10Num = 1000;
        let depositTrc10Map = await publicMethod.depositTrc10(depositTrc10Num);
        mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
        sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
        let mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
        console.log("mAccountAfter.assetV2:"+mTrc10BalanceAfter);
        let sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
        console.log("sAccountAfter.assetV2:"+sTrc10BalanceAfter);
        assert.equal(mTrc10BalanceBefore - depositTrc10Num,mTrc10BalanceAfter);
        assert.equal(parseInt(sTrc10BalanceBefore) + parseInt(depositTrc10Num),sTrc10BalanceAfter);

        // depositTrc20
        // approve
        let approveNum = 100;
        let approveTrc20Map = await publicMethod.approveTrc20(approveNum, trc20ContractAddress);
        let approveTrc20TxFee = approveTrc20Map.get("approveTxFee");
        // depositTrc20
        let mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(trc20ContractAddress);
        let mTrc20BalanceBefore = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
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
        assert.equal(parseInt(sTrc20BalanceBefore) + parseInt(depositTrc20Num),sTrc20BalanceAfter);

        // depositTrc721
        // approve
        let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, trc721ContractAddress);
        let approveTrc721TxFee = approveTrc721Map.get("approveTxFee");
        // depositTrc721
        let depositTrc721Map = await publicMethod.depositTrc721(trc721Id, trc721ContractAddress);
        let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
        let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
        let sTrc721OwnerResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
            sideChainTrc721ContractAddress,
            'ownerOf(uint256)',
            {_isConstant: true},
            [{type: 'uint256', value: trc721Id}]);
        let sTrc721OwnerAfter = sTrc721OwnerResultAfter && sTrc721OwnerResultAfter.result ? sTrc721OwnerResultAfter.constant_result[0].toLocaleString().toLowerCase() : 0;
        sTrc721OwnerAfter = "41"+sTrc721OwnerAfter.substr(24);
        assert.equal(mTrc721BalanceAfter.toUpperCase(),SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase())
        assert.equal(sTrc721OwnerAfter.toUpperCase(),ADDRESS_HEX.toUpperCase())
    });
    describe('#retryWithdraw', function () {
        it('retryWithdraw normal(mainOracle balance is zero)', async function () {
            // freezeBalance mainOracle for get bandwidth
            const freezeForBandwidthTx = await tronWeb.sidechain.mainchain.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {privateKey:ORACLE_PRIVATE_KEY});
            // console.log("freezeForBandwidthTx:"+freezeForBandwidthTx.inspect(freezeTx))
            assert.isTrue(freezeForBandwidthTx.result);
            await wait(15);
            let freezeForBandwidthRes = await tronWeb.sidechain.mainchain.trx.getTransaction(freezeForBandwidthTx.txid);
            // console.log("freezeForBandwidthRes:"+JSON.stringify(freezeForBandwidthRes))
            assert.equal("SUCCESS",freezeForBandwidthRes.ret[0].contractRet)

            // get mainOracle balance
            let mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
            let mainOracleBalance = mainOracleAccount.balance;
            console.log("mainOracleBalance:"+mainOracleBalance)

            // transfer mainOracle's all trx balance to other account
            const sendTrxTx = await tronWeb.sidechain.mainchain.trx.sendTrx(newOtherAddress, mainOracleBalance, {privateKey: ORACLE_PRIVATE_KEY});
            console.log("sendTrxTx:"+JSON.stringify(sendTrxTx))
            assert.isTrue(sendTrxTx.result);
            await wait(15);
            let sendTrxRes = await tronWeb.sidechain.mainchain.trx.getTransaction(sendTrxTx.txid);
            assert.equal("SUCCESS",sendTrxRes.ret[0].contractRet)
            mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
            console.log("mainOracleAccount:"+JSON.stringify(mainOracleAccount))
            mainOracleBalance = typeof(mainOracleAccount.balance)=="undefined"?0:mainOracleAccount.balance;
            if (mainOracleBalance > 0 ) {
                await wait(30);
                mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
                console.log("mainOracleAccount:"+JSON.stringify(mainOracleAccount))
                mainOracleBalance = typeof(mainOracleAccount.balance)=="undefined"?0:mainOracleAccount.balance;
            }
            assert.equal(0, parseInt(mainOracleBalance));

            // withdrawTrx,will fail
            let mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            let sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mWithdrawTrxBalanceBefore = mAccountBefore.balance;
            let sWithdrawTrxBalanceBefore = sAccountBefore.balance;
            console.log('mWithdrawTrxBalanceBefore: ' + mWithdrawTrxBalanceBefore);
            console.log('sWithdrawTrxBalanceBefore: ' + sWithdrawTrxBalanceBefore);
            const withdrawTrxNum = 10e6;
            let withdrawTrxMap = await publicMethod.withdrawTrx(withdrawTrxNum);
            let withdrawTxFee = withdrawTrxMap.get("withdrawTxFee");
            let withdrawTrxNonce = withdrawTrxMap.get("withdrawNonce");
            let mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            let sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mWithdrawTrxBalanceAfter = mAccountAfter.balance;
            let sWithdrawTrxBalanceAfter = sAccountAfter.balance;
            console.log('mWithdrawTrxBalanceAfter: ' +  mWithdrawTrxBalanceAfter)
            console.log('sWithdrawTrxBalanceAfter: ' +  sWithdrawTrxBalanceAfter)
            assert.equal(mWithdrawTrxBalanceAfter, mWithdrawTrxBalanceBefore);
            // assert.equal(sWithdrawTrxBalanceAfter, sWithdrawTrxBalanceBefore - withdrawTrxNum - withdrawTxFee - WITHDRAW_FEE);

            // withdrawTrc10,will fail
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            let mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10Before.assetV2:"+mTrc10BalanceBefore);
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            let sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
            console.log("sAccountTrc10Before.assetV2:"+sTrc10BalanceBefore);
            const withdrawTrc10Num = 1000;
            let withdrawTrc10Map = await publicMethod.withdrawTrc10(withdrawTrc10Num);
            let withdrawTrc10Nonce = withdrawTrc10Map.get("withdrawNonce");
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            let mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountAfter.assetV2:"+mTrc10BalanceAfter);
            let sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("sAccountAfter.assetV2:"+sTrc10BalanceAfter);
            assert.equal(mTrc10BalanceBefore,mTrc10BalanceAfter);
            assert.equal(sTrc10BalanceBefore-withdrawTrc10Num,sTrc10BalanceAfter);

            // withdrawTrc20,will fail
            let mTrc20Contract = await tronWeb.sidechain.mainchain.contract().at(trc20ContractAddress);
            let mTrc20BalanceBefore = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            console.log("mTrc20BalanceBefore："+mTrc20BalanceBefore);
            let sTrc20balanceResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            let sTrc20BalanceBefore = sTrc20balanceResultBefore && sTrc20balanceResultBefore.result ? new tronWeb.BigNumber(sTrc20balanceResultBefore.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceBefore:"+sTrc20BalanceBefore);
            const withdrawTrc20Num = 100;
            let withdrawTrc20Map = await publicMethod.withdrawTrc20(withdrawTrc20Num, sideChainTrc20ContractAddress);
            let withdrawTrc20Nonce = withdrawTrc20Map.get("withdrawNonce");
            let mTrc20BalanceAfter = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
            let sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            let sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
            assert.equal(mTrc20BalanceBefore,mTrc20BalanceAfter.toString());
            assert.equal(parseInt(sTrc20BalanceBefore) - parseInt(withdrawTrc20Num),sTrc20BalanceAfter);

            // withdrawTrc721,will fail
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
            let mTrc721BalanceBefore = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase(), mTrc721BalanceBefore.toUpperCase())
            let sTrc721OwnerResultBefore=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc721ContractAddress,
                'ownerOf(uint256)',
                {_isConstant: true},
                [{type: 'uint256', value: trc721Id}]);
            let sTrc721OwnerBefore = sTrc721OwnerResultBefore && sTrc721OwnerResultBefore.result ? sTrc721OwnerResultBefore.constant_result[0].toLocaleString().toLowerCase() : 0;
            sTrc721OwnerBefore = "41"+sTrc721OwnerBefore.substr(24);
            assert.equal(sTrc721OwnerBefore.toUpperCase(),ADDRESS_HEX.toUpperCase())
            let withdrawTrc721Map = await publicMethod.withdrawTrc721(trc721Id, sideChainTrc721ContractAddress);
            let withdrawTrc721Nonce = withdrawTrc721Map.get("withdrawNonce");
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase(), mTrc721BalanceAfter.toUpperCase())
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
            let newOtherAccount = await tronWeb.sidechain.mainchain.trx.getAccount(newOtherAddress);
            let newOtherBalance = newOtherAccount.balance;
            // transfer other account's all trx balance to oracle
            const sendTrxTx2 = await tronWeb.sidechain.mainchain.trx.sendTrx(mainOracleAddress, newOtherBalance-1000000, { privateKey: newOtherAccountKey});
            assert.isTrue(sendTrxTx2.result);
            await wait(15);
            let sendTrxRes2 = await tronWeb.sidechain.mainchain.trx.getTransaction(sendTrxTx2.txid);
            assert.equal("SUCCESS",sendTrxRes2.ret[0].contractRet)
            mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
            mainOracleBalance = typeof(mainOracleAccount.balance)=="undefined"?0:mainOracleAccount.balance;
            if (mainOracleBalance <= 0) {
                await wait(30);
                mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
                mainOracleBalance = typeof(mainOracleAccount.balance)=="undefined"?0:mainOracleAccount.balance;
            }
            assert.isTrue(mainOracleBalance > 0);

            // retry withdrawTrx,will success
            // withdrawTrx,will fail
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            mWithdrawTrxBalanceBefore = mAccountBefore.balance;
            sWithdrawTrxBalanceBefore = sAccountBefore.balance;
            console.log('mWithdrawTrxBalanceBefore: ' + mWithdrawTrxBalanceBefore);
            console.log('sWithdrawTrxBalanceBefore: ' + sWithdrawTrxBalanceBefore);
            const retryWithdrawTrxId = await tronWeb.sidechain.retryWithdraw(withdrawTrxNonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryWithdrawTrxId.length, 64);
            console.log("retryWithdrawTrxId: "+retryWithdrawTrxId);
            await wait(90);
            const retryWithdrawTrxInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(retryWithdrawTrxId);
            assert.equal("SUCCESS", retryWithdrawTrxInfo.receipt.result);
            const retryWithdrawTrxFee = typeof(retryWithdrawTrxInfo.fee)=="undefined"?0:retryWithdrawTrxInfo.fee;
            console.log('retryWithdrawTrxFee: ' + retryWithdrawTrxFee)
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            mWithdrawTrxBalanceAfter = mAccountAfter.balance;
            sWithdrawTrxBalanceAfter = sAccountAfter.balance;
            console.log('mWithdrawTrxBalanceAfter: ' +  mWithdrawTrxBalanceAfter)
            console.log('sWithdrawTrxBalanceAfter: ' +  sWithdrawTrxBalanceAfter)
            assert.equal(mWithdrawTrxBalanceAfter, parseInt(mWithdrawTrxBalanceBefore) + parseInt(withdrawTrxNum));
            assert.equal(sWithdrawTrxBalanceAfter, sWithdrawTrxBalanceBefore - retryWithdrawTrxFee - RETRY_DEPOSIT_FEE);

            // withdrawTrc10,will success
            mAccountBefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            mTrc10BalanceBefore = mAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10Before.assetV2:"+mTrc10BalanceBefore);
            sAccountBefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            sTrc10BalanceBefore = sAccountBefore.assetV2 ? sAccountBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value : 0;
            console.log("sAccountTrc10Before.assetV2:"+sTrc10BalanceBefore);
            const retryWithdrawTrc10Id = await tronWeb.sidechain.retryWithdraw(withdrawTrc10Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryWithdrawTrc10Id.length, 64);
            console.log("retryWithdrawTrc10Id: "+retryWithdrawTrc10Id);
            await wait(90);
            const retryWithdrawTrc10Info = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(retryWithdrawTrc10Id);
            assert.equal("SUCCESS", retryWithdrawTrc10Info.receipt.result);
            mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            mTrc10BalanceAfter = mAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("mAccountTrc10After.assetV2:"+mTrc10BalanceAfter);
            sTrc10BalanceAfter = sAccountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("sAccountTrc10After.assetV2:"+sTrc10BalanceAfter);
            assert.equal(parseInt(mTrc10BalanceBefore) + parseInt(withdrawTrc10Num),mTrc10BalanceAfter);
            assert.equal(sTrc10BalanceBefore,sTrc10BalanceAfter);

            // withdrawTrc20,will success
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
            const retryWithdrawTrc20Id = await tronWeb.sidechain.retryWithdraw(withdrawTrc20Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryWithdrawTrc20Id.length, 64);
            console.log("retryWithdrawTrc20Id: "+retryWithdrawTrc20Id);
            await wait(90);
            const retryWithdrawTrc20Info = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(retryWithdrawTrc20Id);
            assert.equal("SUCCESS", retryWithdrawTrc20Info.receipt.result);
            mTrc20BalanceAfter = await mTrc20Contract.balanceOf(ADDRESS_BASE58).call();
            console.log("mTrc20BalanceAfter："+mTrc20BalanceAfter);
            sTrc20balanceResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainTrc20ContractAddress,
                'balanceOf(address)',
                {_isConstant: true},
                [{type: 'address', value: ADDRESS_BASE58}]);
            sTrc20BalanceAfter = sTrc20balanceResultAfter && sTrc20balanceResultAfter.result ? new tronWeb.BigNumber(sTrc20balanceResultAfter.constant_result[0], 16).valueOf() : 0;
            console.log("sTrc20BalanceAfter:"+sTrc20BalanceAfter);
            assert.equal(parseInt(mTrc20BalanceBefore) + parseInt(withdrawTrc20Num),mTrc20BalanceAfter.toString());
            assert.equal(sTrc20BalanceBefore,sTrc20BalanceAfter);

            // withdrawTrc721,will success
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
            const retryWithdrawTrc721Id = await tronWeb.sidechain.retryWithdraw(withdrawTrc721Nonce, RETRY_DEPOSIT_FEE, FEE_LIMIT);
            assert.equal(retryWithdrawTrc721Id.length, 64);
            console.log("retryWithdrawTrc721Id: "+retryWithdrawTrc721Id);
            await wait(90);
            const retryWithdrawTrc721Info = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(retryWithdrawTrc721Id);
            assert.equal("SUCCESS", retryWithdrawTrc721Info.receipt.result);
            mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(trc721ContractAddress);
            mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(ADDRESS_HEX.toUpperCase(), mTrc721BalanceAfter.toUpperCase())
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainTrc721ContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );

        });
    });
    after(async function () {
        // transfer other account's all trx balance to oracle
        // get other account balance
        let newOtherAccount = await tronWeb.sidechain.mainchain.trx.getAccount(newOtherAddress);
        let newOtherBalance = newOtherAccount.balance;
        if (newOtherBalance > 1800000) {
            const sendTrxTx = await tronWeb.sidechain.mainchain.trx.sendTrx(mainOracleAddress, newOtherBalance-1000000, { privateKey: newOtherAccountKey});
            assert.isTrue(sendTrxTx.result);
            await wait(15);
            let sendTrxRes = await tronWeb.sidechain.mainchain.trx.getTransaction(sendTrxTx.txid);
            assert.equal("SUCCESS",sendTrxRes.ret[0].contractRet)
            let mainOracleAccount = await tronWeb.sidechain.mainchain.trx.getAccount(mainOracleAddress);
            let mainOracleBalance = mainOracleAccount.balance;
            assert.isTrue(mainOracleBalance > 0);
        }
    });
});









