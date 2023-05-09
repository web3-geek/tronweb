const {testRevert, testConstant, arrayParam, tronToken, testAddressArray, trcTokenTest070, trcTokenTest059, funcABIV2, funcABIV2_2, funcABIV2_3, funcABIV2_4, abiV2Test1,abiV2Test2, testSetVal,
    testEmptyAbi
} = require('../util/contracts');
const assertThrow = require('../util/assertThrow');
const broadcaster = require('../util/broadcaster');
const pollAccountFor = require('../util/pollAccountFor');
const tronWebBuilder = require('../util/tronWebBuilder');
const assertEqualHex = require('../util/assertEqualHex');
const waitChainData = require('../util/waitChainData');
const publicMethod = require('../util/PublicMethod');
const txPars = require('../util/txPars');
const wait = require('../util/wait');
const jlog = require('../util/jlog');
const util = require('util');
const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const TronWeb = tronWebBuilder.TronWeb;
const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    WITNESS_ACCOUNT,
    WITNESS_KEY,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved,
    TOKEN_ID,
    FEE_LIMIT,
    ACTIVE_PERMISSION_OPERATIONS
} = require('../util/config');
const { equals, getValues } = require('../util/testUtils');


describe('TronWeb.transactionBuilder', function () {
    // let accounts;
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    let tronWeb;
    let emptyAccount;
    const idxS = 0;
    const idxE = 2;
    const threshold = 2;

    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();

        let pk0 = "862227F6583B43CD2240B0C640AACB22340F8E194319900454DA0C81E4A9601E";
        let addr = tronWeb.address.fromPrivateKey(pk0);
        accounts.pks.push(pk0);
        accounts.b58.push(addr);
        accounts.hex.push(tronWeb.address.toHex(addr));
        let pk1 = "F059AB31C8DE3F317A4B3A5B3FDA99550CBDCB575CC067D5D7CF8E45DDC08C6E";
        let addr1 = tronWeb.address.fromPrivateKey(pk1);
        accounts.pks.push(pk1);
        accounts.b58.push(addr1);
        accounts.hex.push(tronWeb.address.toHex(addr1));
        let pk2 = "A2DDA659B98D975C60549D25A2024B57A9C986DF226564BBD346A0BB214470EF";
        let addr2 = tronWeb.address.fromPrivateKey(pk2);
        accounts.pks.push(pk2);
        accounts.b58.push(addr2);
        accounts.hex.push(tronWeb.address.toHex(addr2));

        /*await tronWebBuilder.newTestAccountsInMain(3);
        accounts = await tronWebBuilder.getTestAccountsInMain(3);
        // update account permission
        let ownerPermission = { type: 0, permission_name: 'owner' };
        ownerPermission.threshold = 1;
        ownerPermission.keys  = [];
        let activePermission = { type: 2, permission_name: 'active' };
        activePermission.threshold = threshold;
        activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
        activePermission.keys = [];

        ownerPermission.keys.push({ address: accounts.hex[1], weight: 1 });
        for (let i = idxS; i < idxE; i++) {
            let address = accounts.hex[i];
            let weight = 1;
            activePermission.keys.push({ address: address, weight: weight });
        }
        let data = {
            owner_address: accounts.hex[1],
            actives: activePermission,
            owner: ownerPermission,
            visible: false,
        };
        const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
        console.log('java-tron ', JSON.stringify(tx1, null, 2));
        const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
            accounts.hex[1],
            ownerPermission,
            null,
            [activePermission],
            {},
            tx1
        );
        if (!_.isEqual(tx1,tx2)) {
            console.error('accountpermissionupdate not equal');
            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
        } else {
            console.info('accountpermissionupdate goes well');
        }
        console.log("updateTransaction:"+util.inspect(tx1,true,null,true))
        const updateTx = await broadcaster.broadcaster(null, accounts.pks[1], tx1);
        console.log("updateTx:"+util.inspect(updateTx))
        console.log("updateTx.txID:"+updateTx.transaction.txID)
        assert.equal(updateTx.transaction.txID.length, 64);
        await wait(30);
        const ownerAddress = await tronWeb.trx.getAccount(accounts.b58[1]);
        console.log("ownerAddress:"+JSON.stringify(ownerAddress))
        const sendTrxTx = await tronWeb.trx.sendTrx(accounts.b58[0], 5000000000);
        const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.b58[1], 500000000);
        console.log("sendTrxTx1:"+JSON.stringify(sendTrxTx))
        console.log("sendTrxTx2:"+JSON.stringify(sendTrxTx2))
        assert.isTrue(sendTrxTx.result);
        assert.isTrue(sendTrxTx2.result);
        await wait(15);*/
    });

    describe('#sendTrx()', function () {
        it(`should send 10 trx from default address to account0_b58`, async function () {
            let balanceBefore = await tronWeb.trx.getBalance(accounts.hex[0]);
            console.log("balanceBefore: "+balanceBefore);
            let data = {
                owner_address: accounts.hex[1],
                to_address: accounts.hex[0],
                amount: 10,
                visible: false,
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/createtransaction', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [accounts.hex[0], 10, accounts.b58[1] ,{permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.sendTrx(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('sendTrx not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('sendTrx goes well');
            }

            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);

            let balanceAfter = await tronWeb.trx.getBalance(accounts.hex[0]);
            console.log("balanceBefore: "+balanceBefore);
            assert.equal(balanceAfter, balanceBefore+10);
        });
    });

    describe('#sendToken()', function () {
        let tokenOptions
        let tokenID

        before(async function () {
            let account = await tronWeb.trx.getAccount(accounts.b58[1]);
            if (!account.asset_issued_ID) {
                tokenOptions = getTokenOptions();
                const result = await broadcaster.broadcaster(await tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[1]), accounts.pks[1])
                console.log("result: "+util.inspect(result,true,null,true))
                assert.isTrue(result.receipt.result);
                await wait(30);
                account = await tronWeb.trx.getAccount(accounts.b58[1]);
            }
            tokenID = account.asset_issued_ID;
        });

        it(`should send 1 token from accounts.hex[1] to accounts.hex[0]`, async function () {
            const assetBefore = (await tronWeb.trx.getUnconfirmedAccount(accounts.b58[0])).assetV2.filter((item)=> item.key == tokenID)[0].value;
            let data = {
                owner_address: accounts.hex[1],
                to_address: accounts.hex[0],
                asset_name: tronWeb.fromUtf8(tokenID),
                amount: 1,
                visible: false,
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/transferasset', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            param = [accounts.hex[0], 1, tokenID, accounts.b58[1],{permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.sendToken(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('sendToken not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('sendToken goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);

            const assetAfter = (await tronWeb.trx.getUnconfirmedAccount(accounts.b58[0])).assetV2.filter((item)=> item.key == tokenID)[0].value;
            assert.equal(assetAfter, !assetBefore ? 0 : assetBefore.filter((item)=> item.key == tokenID)[0].value+1);
        });
    });

    describe('#purchaseToken()', function () {
        let tokenOptions
        let tokenID

        before(async function () {
            let account = await tronWeb.trx.getAccount(accounts.b58[1]);
            if (!account.asset_issued_ID) {
                tokenOptions = getTokenOptions();
                const result = await broadcaster.broadcaster(await tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[1]), accounts.pks[1])
                console.log("result: "+util.inspect(result,true,null,true))
                assert.isTrue(result.receipt.result);
                await wait(30);
                account = await tronWeb.trx.getAccount(accounts.b58[1]);
            }
            tokenID = account.asset_issued_ID;
        });

        it(`should purchaseToken`, async function () {
            const assetBefore = (await tronWeb.trx.getUnconfirmedAccount(accounts.b58[1])).assetV2;
            const data = {
                owner_address: accounts.hex[1],
                to_address: accounts.hex[0],
                asset_name: tronWeb.fromUtf8(tokenID),
                amount: 5,
                visible: false,
                Permission_id: 2
            }
            console.log('data ', JSON.stringify(data, null, 2));
            tx1 = await tronWeb.fullNode.request('wallet/participateassetissue', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [accounts.hex[0], tokenID, 5, accounts.hex[1], {permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.purchaseToken(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('purchaseToken not equal');
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('purchaseToken goes well');
            };
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);

            const assetAfter = (await tronWeb.trx.getUnconfirmedAccount(accounts.b58[1])).assetV2.filter((item)=> item.key == tokenID)[0].value;
            assert.equal(assetAfter, !assetBefore ? 0 : assetBefore.filter((item)=> item.key == tokenID)[0].value+1);
        });
    });

    //freeze v2 is open, old freeze is closed
    describe.skip('#freezebalance()', function() {
        it(`should freeze 1 TRX for accounts.hex[1]`, async function () {
            const accountBefore = (await tronWeb.trx.getAccount(accounts.b58[1])).frozen;
            let data = {
                owner_address: accounts.hex[1],
                frozen_balance: 1e6,
                frozen_duration: 3,
                resource: 'BANDWIDTH',
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/freezebalance', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [1e6, 3, 'BANDWIDTH' , accounts.hex[1], accounts.hex[1], {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.freezeBalance(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('freezebalance not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('freezebalance goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);
            const accountAfter = (await tronWeb.trx.getAccount(accounts.b58[1])).frozen[0].frozen_balance;
            console.log("await tronWeb.trx.getAccount(accounts.b58[1]):"+util.inspect(await tronWeb.trx.getAccount(accounts.b58[1])))
            console.log("accountAfter:"+util.inspect(accountAfter))
            assert.equal(accountAfter, !accountBefore ? 0 : accountBefore[0].frozen_balance+1e6);
        });
    });

    describe.skip('#unfreezeBalance()', function() {
        before(async function () {
            const transaction = await tronWeb.transactionBuilder.freezeBalance(1e6, 0, 'BANDWIDTH', accounts.b58[1]);
            const result = await broadcaster.broadcaster(transaction, accounts.pks[1]);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        });
        it(`should unfreeze 1 TRX for accounts.hex[1]`, async function () {
            const accountBefore = (await tronWeb.trx.getAccount(accounts.b58[1])).frozen[0].frozen_balance;
            let data = {
                owner_address: accounts.hex[1],
                resource: 'BANDWIDTH',
                Permission_id: 2
            };
            console.log("data:"+util.inspect(data))
            tx1 = await tronWeb.fullNode.request('wallet/unfreezebalance', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = ['BANDWIDTH' , accounts.hex[1], accounts.hex[1], {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.unfreezeBalance(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('unfreezeBalance not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('unfreezeBalance goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);
            const accountAfter = (await tronWeb.trx.getAccount(accounts.b58[1])).frozen;
            assert.equal(!accountAfter ? 0 : accountAfter[0].frozen_balance, accountBefore-1e6);
        });
    });

    describe('#freezeBalanceV2()', function () {
        it(`should freezeV2 2 TRX for accounts.hex[1]`, async function () {
            const accountBefore = (await tronWeb.trx.getAccount(accounts.b58[1])).frozenV2;
            let data = {
                owner_address: accounts.hex[1],
                frozen_balance: 2e6,
                resource: 'BANDWIDTH',
                visible: false,
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/freezebalancev2', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            let param = [2e6, 'BANDWIDTH', accounts.b58[1], {permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('freezeBalanceV2 not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('freezeBalanceV2 goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(30);
            const accountAfter = (await tronWeb.trx.getAccount(accounts.b58[1])).frozenV2[0].amount;
            assert.equal(accountAfter, !accountBefore ? 0 : accountBefore[0].amount+2e6);
        });
    });

    describe('#unfreezeBalanceV2()', function () {
        before(async function (){
            const accountBefore = (await tronWeb.trx.getAccount(accounts.b58[1])).frozenV2;
            if (!accountBefore) {
                let param = [2e6, 'BANDWIDTH', accounts.b58[1]];
                const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
                console.log("tx:"+util.inspect(tx))
                assert.equal(tx.transaction.txID.length, 64);
                await wait(30);
            }
        });
        it('should unfreezeBalanceV2 1 TRX from accounts.hex[1]', async function () {
            const accountBefore = (await tronWeb.trx.getAccount(accounts.b58[1])).frozenV2;
            let data = {
                owner_address: accounts.hex[1],
                unfreeze_balance: 1e6,
                resource: 'BANDWIDTH',
                visible: false,
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/unfreezebalancev2', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            let param = [1e6, "BANDWIDTH", accounts.b58[1], {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('unfreezeBalanceV2 not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('unfreezeBalanceV2 goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(30);
            const accountAfter = (await tronWeb.trx.getAccount(accounts.b58[1])).frozenV2[0].amount;
            assert.equal(accountAfter, !accountBefore ? 0 : accountBefore[0].amount-1e6);
        });
    });

    describe('#delegateResource()', function () {
        before(async () => {
            const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH', accounts.b58[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            await wait(30);
        });
        it(`should delegateResource 1 TRX for accounts.hex[1]`, async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let data = {
                owner_address: accounts.hex[1],
                receiver_address: accounts.hex[0],
                balance: 1e6,
                resource: 'BANDWIDTH',
                lock: false,
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/delegateresource', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            param = [1e6,accounts.hex[0], 'BANDWIDTH', accounts.b58[1], false, {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.delegateResource(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('delegateResource not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('delegateResource goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(30);

            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount-1e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, 1e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        });
    });

    describe('#undelegateResource()', function () {
        before(async () => {
            await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(6e6, 'BANDWIDTH', accounts.b58[1]));
            await wait(40);
            const transaction = await tronWeb.transactionBuilder.delegateResource(5e6, accounts.b58[0], 'BANDWIDTH', accounts.b58[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            await wait(30);
        });

        it(`should undelegateResource 2 TRX for accounts.hex[0]`, async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let data = {
                owner_address: accounts.hex[1],
                receiver_address: accounts.hex[0],
                balance: 2e6,
                resource: 'BANDWIDTH',
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/undelegateresource', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            param = [2e6, accounts.hex[0], 'BANDWIDTH', accounts.hex[1], {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.undelegateResource(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('undelegateResource not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('undelegateResource goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(30);

            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount+2e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore1.delegated_frozenV2_balance_for_bandwidth-2e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        });
    });

    describe("#withdrawExpireUnfreeze", async function () {
        before(async () => {
            await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(5e6, 'BANDWIDTH', accounts.hex[1]));
            await wait(40);
            await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.unfreezeBalanceV2(3e6, 'BANDWIDTH', accounts.hex[1]));
            await wait(35);
        })
        it('should withdrawExpireUnfreeze for accounts.hex[1]', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            assert.isTrue(accountBefore1.unfrozenV2[0].unfreeze_amount > 0);
            let data = {
                owner_address: accounts.hex[1],
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/withdrawexpireunfreeze', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [accounts.b58[1], {permissionId: 2}, tx1];
            const tx2 = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param)
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('withdrawExpireUnfreeze not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('withdrawExpireUnfreeze goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 0);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(30);

            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            assert.isUndefined(accountAfter1.unfrozenV2);
        })
    });

    describe('#withdrawBlockRewards', function () {
        let witnessAccountHex;
        before(async () => {
            witnessAccountHex = await tronWeb.address.toHex(WITNESS_ACCOUNT);
            const witnessAccount = await tronWeb.trx.getAccount(WITNESS_ACCOUNT);
            if (!witnessAccount.active_permission) {
                // update account permission
                let ownerPermission = { type: 0, permission_name: 'owner' };
                ownerPermission.threshold = 1;
                ownerPermission.keys  = [];
                ownerPermission.keys.push({ address: witnessAccountHex, weight: 1 });
                let activePermission = { type: 2, permission_name: 'active' };
                activePermission.threshold = threshold;
                activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission.keys = [];
                for (let i = idxS; i < idxE; i++) {
                    let address = accounts.hex[i];
                    let weight = 1;
                    activePermission.keys.push({ address: address, weight: weight });
                }

                let activePermission2 = { type: 2, permission_name: 'active2' };
                activePermission2.threshold = 1;
                activePermission2.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission2.keys = [];
                activePermission2.keys.push({ address: witnessAccountHex, weight: 1 });
                let witnessPermission = { type: 1, permission_name: 'witness' };
                witnessPermission.threshold = 1;
                witnessPermission.keys = [];
                witnessPermission.keys.push({ address: witnessAccountHex, weight: 1 });

                let data = {
                    owner_address: witnessAccountHex,
                    actives: activePermission,
                    owner: ownerPermission,
                    witness: witnessPermission,
                    visible: false,
                };
                const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                console.log('java-tron ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                    witnessAccountHex,
                    ownerPermission,
                    witnessPermission,
                    [activePermission,activePermission2],
                    {},
                    tx1
                );
                if (!_.isEqual(tx1,tx2)) {
                    console.error('accountpermissionupdate not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('accountpermissionupdate goes well');
                }
                const updateTx = await broadcaster.broadcaster(null, WITNESS_KEY, tx2);
                console.log("updateTx:"+util.inspect(updateTx))
                console.log("updateTx.txID:"+updateTx.transaction.txID)
                assert.equal(updateTx.transaction.txID.length, 64);
                await wait(30);
            }
        });
        it(`should withdrawBlockRewards`, async function () {
            let data = {
                owner_address: witnessAccountHex,
                Permission_id: 2
            };
            tx1 = await tronWeb.fullNode.request('wallet/withdrawbalance', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [WITNESS_ACCOUNT, { permissionId: 2 }, tx1];
            const tx2 = await tronWeb.transactionBuilder.withdrawBlockRewards(...param)
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('withdrawBlockRewards not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('withdrawBlockRewards goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
        });
    });

    describe("#applyForSR", async function () {
        let url = 'https://xtron.network';
        it('should allow accounts[1] to apply for SR', async function () {
            let data = {
                url: tronWeb.fromUtf8(url),
                owner_address: accounts.hex[1],
                Permission_id: 2
            }
            const gridtx = await tronWeb.fullNode.request('wallet/createwitness', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[1], url,{permissionId: 2}, gridtx);
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('applyForSR not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(transaction, gridtx);
            } else {
                console.info('applyForSR goes well');
            }
            const parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            await assertEqualHex(parameter.value.url, url);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WitnessCreateContract');
            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
        });
    });

    describe("#vote", async function () {
        before(async function () {
            /**
             * Execute this method when Proposition 70 is not enabled
             */
            await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(15e6, 3, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            /**
             * Execute this method when Proposition 70 is enabled
             */
            // await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalanceV2(15e6,'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            await wait(30);
        })
        it('should allows accounts[1] to vote WITNESS_ACCOUNT', async function () {
            const voteCountBefore = (await tronWeb.trx.listSuperRepresentatives()).filter((item)=> item.address == tronWeb.address.toHex(WITNESS_ACCOUNT))[0].voteCount;
            const data = {
                owner_address: accounts.hex[1],
                votes: [
                    {   vote_address: tronWeb.address.toHex(WITNESS_ACCOUNT),
                        vote_count: 15
                    }
                ],
                Permission_id: 2
            }
            tx1 = await tronWeb.fullNode.request('wallet/votewitnessaccount', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            let votes = {}
            votes[tronWeb.address.toHex(WITNESS_ACCOUNT)] = 15
            const tx2 = await tronWeb.transactionBuilder.vote(votes, accounts.b58[1],{permissionId: 2}, tx1)
            console.log('TronWeb ', JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('vote not equal');
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2, tx1);
            } else {
                console.info('vote goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(40);
            const voteCountAfter = (await tronWeb.trx.listSuperRepresentatives()).filter((item)=> item.address == tronWeb.address.toHex(WITNESS_ACCOUNT))[0].voteCount;
            assert.equal(voteCountAfter, voteCountBefore+15);
        })
    });

    describe("#createSmartContract", async function () {
        it('should create a smart contract with array parameters', async function () {
            const bals = [1000, 2000, 3000];
            const data = {
                owner_address: accounts.hex[1],
                abi: arrayParam.abi,
                bytecode: arrayParam.bytecode,
                fee_limit: 1000e6,
                parameter: "0000000000000000000000000000000000000000000000000000000000000040" +
                    "00000000000000000000000000000000000000000000000000000000000000c0" +
                    "0000000000000000000000000000000000000000000000000000000000000003" +
                    await publicMethod.to64String(accounts.hex[0].replace('41', ''))+
                    await publicMethod.to64String(accounts.hex[1].replace('41', ''))+
                    await publicMethod.to64String(accounts.hex[2].replace('41', ''))+
                    "0000000000000000000000000000000000000000000000000000000000000003" +
                    "00000000000000000000000000000000000000000000000000000000000003e8" +
                    "00000000000000000000000000000000000000000000000000000000000007d0" +
                    "0000000000000000000000000000000000000000000000000000000000000bb8",
                origin_energy_limit: 1,
                consume_user_resource_percent: 0,
                Permission_id: 2
            }
            let tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            const options = {
                abi: arrayParam.abi,
                bytecode: arrayParam.bytecode,
                feeLimit: 1000e6,
                originEnergyLimit: 1,
                userFeePercentage: 0,
                parameters: [
                    [accounts.hex[0], accounts.hex[1], accounts.hex[2]],
                    [bals[0], bals[1], bals[2]]
                ],
                permissionId: 2
            };
            const tx2 = await tronWeb.transactionBuilder.createSmartContract(options, accounts.b58[1], tx1);
            console.log('TronWeb ', JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1.raw_data.contract[0].parameter.value.new_contract.bytecode,tx2.raw_data.contract[0].parameter.value.new_contract.bytecode)) {
                console.error('createSmartContract not equal');
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx2.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, tx1.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent);
                assert.equal(tx2.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, tx1.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit);
                assert.equal(tx2.raw_data.expiration, tx1.raw_data.expiration);
                assert.equal(tx2.raw_data.fee_limit, tx1.raw_data.fee_limit);
            } else {
                console.info('createSmartContract goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result);
            await wait(30);
            const deployed = await tronWeb.contract().at(result.transaction.contract_address);
            for (let j = 0; j <= 2; j++) {
                let bal = await deployed.balances(accounts.hex[j]).call();
                bal = bal.toNumber();
                assert.equal(bal, bals[j]);
            }
        });

        it('should create a smart contract with trctoken and stateMutability parameters', async function () {
            let tokenOptions
            let account = await tronWeb.trx.getAccount(accounts.b58[1]);
            if (!account.asset_issued_ID) {
                tokenOptions = getTokenOptions();
                const result = await broadcaster.broadcaster(await tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[1]), accounts.pks[1])
                console.log("result: "+util.inspect(result,true,null,true))
                assert.isTrue(result.receipt.result);
                await wait(30);
                account = await tronWeb.trx.getAccount(accounts.hex[1]);
            }
            let tokenID = account.asset_issued_ID;

            // before token balance
            const accountTrc10BalanceBefore = account.assetV2.filter((item)=> item.key == tokenID)[0].value;
            console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);
            const data = {
                owner_address: accounts.hex[1],
                abi: trcTokenTest070.abi,
                bytecode: trcTokenTest070.bytecode,
                fee_limit: FEE_LIMIT,
                parameter: "0000000000000000000000000000000000000000000000000000000000000040" +
                    "00000000000000000000000000000000000000000000000000000000000000c0" +
                    "0000000000000000000000000000000000000000000000000000000000000003" +
                    await publicMethod.to64String(accounts.hex[0].replace('41', ''))+
                    await publicMethod.to64String(accounts.hex[1].replace('41', ''))+
                    await publicMethod.to64String(accounts.hex[2].replace('41', ''))+
                    "0000000000000000000000000000000000000000000000000000000000000003" +
                    "00000000000000000000000000000000000000000000000000000000000003e8" +
                    "00000000000000000000000000000000000000000000000000000000000007d0" +
                    "0000000000000000000000000000000000000000000000000000000000000bb8",
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                Permission_id: 2
            }
            let tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            const options = {
                abi: trcTokenTest070.abi,
                bytecode: trcTokenTest070.bytecode,
                parameters: [
                    accounts.hex[1], tokenID, 123
                ],
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                feeLimit: FEE_LIMIT
            };
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_HEX);
            const result = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            let createInfo
            while (true) {
                createInfo = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(createInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            // after token balance
            const accountAfter = await tronWeb.trx.getAccount(ADDRESS_HEX);
            const accountTrc10BalanceAfter = accountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrc10BalanceAfter:"+accountTrc10BalanceAfter);
            const toAddressAfter = await tronWeb.trx.getAccount(accounts.hex[16]);
            const toAddressTrc10BalanceAfter = toAddressAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("toAddressTrc10BalanceAfter:"+toAddressTrc10BalanceAfter);
            assert.equal(accountTrc10BalanceAfter,(accountTrc10BalanceBefore-1e3));
            assert.equal(toAddressTrc10BalanceAfter,123);
        });

        it('should create a smart contract with payable parameters', async function () {
            // before token balance
            const accountbefore = await tronWeb.trx.getAccount(ADDRESS_HEX);
            const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);
            const options = {
                abi: trcTokenTest059.abi,
                bytecode: trcTokenTest059.bytecode,
                parameters: [
                    accounts.hex[13], TOKEN_ID, 123
                ],
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3
            };
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_HEX);
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            let createInfo
            while (true) {
                createInfo = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(createInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            // after token balance
            const accountAfter = await tronWeb.trx.getAccount(ADDRESS_HEX);
            const accountTrc10BalanceAfter = accountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrc10BalanceAfter:"+accountTrc10BalanceAfter);
            const toAddressAfter = await tronWeb.trx.getAccount(accounts.hex[13]);
            const toAddressTrc10BalanceAfter = toAddressAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("toAddressTrc10BalanceAfter:"+toAddressTrc10BalanceAfter);
            assert.equal(accountTrc10BalanceAfter,(accountTrc10BalanceBefore-1e3));
            assert.equal(toAddressTrc10BalanceAfter,123);
        });
    });

    describe("#triggerSmartContract", async function () {

        let transaction;
        let contractAddress;
        let contractAddressWithArray;
        let contractAddressWithTrctoken;
        before(async function () {
            transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testConstant.abi,
                bytecode: testConstant.bytecode
            }, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            contractAddress = transaction.contract_address;

            transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testAddressArray.abi,
                bytecode: testAddressArray.bytecode,
                permissionId: 2,
                parameters: [
                    [accounts.hex[16], accounts.hex[17], accounts.hex[18]]
                ]
            }, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            contractAddressWithArray = transaction.contract_address;

            const options = {
                abi: trcTokenTest070.abi,
                bytecode: trcTokenTest070.bytecode,
                parameters: [
                    accounts.hex[18], TOKEN_ID, 123
                ],
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                feeLimit: 9e7,
            };
            transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_HEX);
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            let createInfo
            while (true) {
                createInfo = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(createInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            contractAddressWithTrctoken = transaction.contract_address;
        })

        it('should trigger smart contract successfully', async function () {
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                {type: 'uint256', value: 1},
                {type: 'uint256', value: 2}
            ]
            const options = {};

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, options,
                    parameter, issuerAddress);
                assert.isTrue(transaction.result.result &&
                    transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result)
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it('should trigger smart contract with array[2] parameters', async function () {
            const functionSelector = 'transferWith2(address[2],uint256[2])';
            const parameter = [
                {type: 'address[2]', value: [accounts.hex[16], accounts.hex[17]]},
                {type: 'uint256[2]', value: [123456, 123456]}
            ]
            const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithArray,  functionSelector, {},
                parameter, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const deployed = await tronWeb.contract().at(contractAddressWithArray);
            for (let j = 16; j <= 17; j++) {
                let bal = await deployed.balanceOf(accounts.hex[j]).call();
                bal = bal.toNumber();
                assert.equal(bal, 100123456);
            }
        });

        it('should trigger smart contract with array[] parameters', async function () {
            const functionSelector = 'transferWithArray(address[],uint256[])';
            const parameter = [
                {type: 'address[]', value: [accounts.hex[16], accounts.hex[17]]},
                {type: 'uint256[]', value: [123456, 123456]}
            ]
            const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithArray,  functionSelector, {},
                parameter, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const deployed = await tronWeb.contract().at(contractAddressWithArray);
            for (let j = 16; j <= 17; j++) {
                let bal = await deployed.balanceOf(accounts.hex[j]).call();
                bal = bal.toNumber();
                assert.equal(bal, 100246912);
            }
        });

        it('should trigger smart contract with trctoken payable parameters', async function () {
            // before balance
            const accountTrxBalanceBefore = await tronWeb.trx.getBalance(contractAddressWithTrctoken);
            const accountbefore = await tronWeb.trx.getAccount(contractAddressWithTrctoken);
            const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrxBalanceBefore:"+accountTrxBalanceBefore);
            console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);

            const functionSelector = 'TransferTokenTo(address,trcToken,uint256)';
            const parameter = [
                {type: 'address', value: accounts.hex[17]},
                {type: 'trcToken', value: TOKEN_ID},
                {type: 'uint256', value: 123}
            ];
            const options = {
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                feeLimit:FEE_LIMIT
            };
            const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithTrctoken,  functionSelector, options,
                parameter, ADDRESS_HEX);
            const res = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction.transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            // after token balance
            const accountTrxBalanceAfter = await tronWeb.trx.getBalance(contractAddressWithTrctoken);
            console.log("accountTrxBalanceAfter:"+accountTrxBalanceAfter);
            const accountAfter = await tronWeb.trx.getAccount(contractAddressWithTrctoken);
            const accountTrc10BalanceAfter = accountAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrc10BalanceAfter:"+accountTrc10BalanceAfter);
            const toAddressAfter = await tronWeb.trx.getAccount(accounts.hex[17]);
            const toAddressTrc10BalanceAfter = toAddressAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("toAddressTrc10BalanceAfter:"+toAddressTrc10BalanceAfter);
            assert.equal(accountTrxBalanceAfter,(accountTrxBalanceBefore+321));
            assert.equal(accountTrc10BalanceAfter,(accountTrc10BalanceBefore+1e3-123));
            assert.equal(toAddressTrc10BalanceAfter,123);
        });
    });

    describe("#triggerConstantContract", async function () {

        let transaction;
        before(async function () {

            transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testConstant.abi,
                bytecode: testConstant.bytecode
            }, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        })

        it('should trigger constant contract successfully', async function () {
            this.timeout(20000);

            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                {type: 'uint256', value: 1},
                {type: 'uint256', value: 2}
            ]
            const options = {};

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, options,
                    parameter, issuerAddress);
                assert.isTrue(transaction.result.result &&
                    transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result)
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });
    });

    describe("#triggerComfirmedConstantContract", async function () {

        let transaction;
        before(async function () {
            this.timeout(20000);

            transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testConstant.abi,
                bytecode: testConstant.bytecode
            }, accounts.hex[6]);
            await broadcaster.broadcaster(null, accounts.pks[6], transaction);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        })

        it('should trigger confirmed constant contract successfully', async function () {
            this.timeout(20000);

            const contractAddress = transaction.contract_address;
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                {type: 'uint256', value: 1},
                {type: 'uint256', value: 2}
            ]
            const options = {};

            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                transaction = await tronWeb.transactionBuilder.triggerConfirmedConstantContract(contractAddress, functionSelector, options,
                    parameter, issuerAddress);
                assert.isTrue(transaction.result.result &&
                    transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                assert.isTrue(transaction.receipt.result)
                assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });
    });

    describe("#clearabi", async function () {
        let contractAddress;
        before(async function () {
            const transaction = await tronWeb.transactionBuilder.createSmartContract({
                abi: testConstant.abi,
                bytecode: testConstant.bytecode
            }, accounts.hex[1]);
            console.log("transaction: "+util.inspect(transaction,true,null,true))
            const result = await broadcaster.broadcaster(null, accounts.pks[1], transaction)
            console.log("result: "+util.inspect(result,true,null,true))
            await wait(30);
            const tx1 = await tronWeb.trx.getTransactionInfo(transaction.txID);
            assert.notEqual(Object.keys(tx1).length, 0);
            contractAddress = transaction.contract_address;
        })

        it('should clear contract abi', async function () {
            const param = [contractAddress, accounts.hex[1], {permissionId: 2}];
            const ownerAddress = param[1];

            // verify contract abi before
            let contract = await tronWeb.trx.getContract(contractAddress);
            assert.isTrue(Object.keys(contract.abi).length > 0);
            let data;
            // clear abi
            data = {
                owner_address: ownerAddress,
                contract_address: contractAddress,
                visible: false,
                Permission_id: 2
            }

            const gridtx = await tronWeb.fullNode.request('wallet/clearabi', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            const transaction = await tronWeb.transactionBuilder.clearABI(contractAddress, ownerAddress, param[2],gridtx);
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('clearabi not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('clearabi goes well');
            }

            const parameter = txPars(transaction);
            assert.isTrue(!transaction.visible &&
                transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.ClearABIContract');
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.contract_address, tronWeb.address.toHex(contractAddress));
            assert.equal(parameter.value.owner_address, tronWeb.address.toHex(ownerAddress));
            assert.equal(transaction.raw_data.contract[0].Permission_id, param[2].permissionId);

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            // verify contract abi after
            while (true) {
                contract = await tronWeb.trx.getContract(contractAddress);
                if (Object.keys(contract.abi).length > 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.isTrue(Object.keys(contract.abi).length === 0);
        });
    });

    describe("#updateBrokerage", async function () {
        let witnessAccountHex;
        before(async () => {
            const sendTrxTx = await tronWeb.trx.sendTrx(WITNESS_ACCOUNT, 20000000000);
            assert.isTrue(sendTrxTx.result);
            await wait(30);
            witnessAccountHex = await tronWeb.address.toHex(WITNESS_ACCOUNT);
            const witnessAccount = await tronWeb.trx.getAccount(WITNESS_ACCOUNT);
            if (!witnessAccount.active_permission) {
                // update account permission
                let ownerPermission = { type: 0, permission_name: 'owner' };
                ownerPermission.threshold = 1;
                ownerPermission.keys  = [];
                let activePermission = { type: 2, permission_name: 'active' };
                activePermission.threshold = threshold;
                activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission.keys = [];
                ownerPermission.keys.push({ address: witnessAccountHex, weight: 1 });
                for (let i = idxS; i < idxE; i++) {
                    let address = accounts.hex[i];
                    let weight = 1;
                    activePermission.keys.push({ address: address, weight: weight });
                }

                let activePermission2 = { type: 2, permission_name: 'active2' };
                activePermission2.threshold = 1;
                activePermission2.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission2.keys = [];
                activePermission2.keys.push({ address: witnessAccountHex, weight: 1 });
                let witnessPermission = { type: 1, permission_name: 'witness' };
                witnessPermission.threshold = 1;
                witnessPermission.keys = [];
                witnessPermission.keys.push({ address: witnessAccountHex, weight: 1 });

                let data = {
                    owner_address: witnessAccountHex,
                    actives: [activePermission,activePermission2],
                    owner: ownerPermission,
                    witness: witnessPermission,
                    visible: false,
                };
                const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                console.log('java-tron ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                    witnessAccountHex,
                    ownerPermission,
                    witnessPermission,
                    [activePermission,activePermission2],
                    {},
                    tx1
                );
                if (!_.isEqual(tx1,tx2)) {
                    console.error('accountpermissionupdate not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('accountpermissionupdate goes well');
                }
                const updateTx = await broadcaster.broadcaster(null, WITNESS_KEY, tx2);
                console.log("updateTx:"+util.inspect(updateTx))
                console.log("updateTx.txID:"+updateTx.transaction.txID)
                assert.equal(updateTx.transaction.txID.length, 64);
                await wait(30);
            }
        });

        it('should update sr brokerage successfully', async function () {
            const data = {
                owner_address: witnessAccountHex,
                brokerage: 15,
                Permission_id: 2
            }
            const gridtx = await tronWeb.fullNode.request('wallet/updateBrokerage', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            const param = [15, witnessAccountHex, {permissionId: 2},gridtx];
            const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('updateBrokerage not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('updateBrokerage goes well');
            }
            const parameter = txPars(transaction);
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.brokerage, param[0]);
            assert.equal(parameter.value.owner_address, param[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateBrokerageContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
            }
            assert.equal(signedTransaction.signature.length, 2);

            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result);
            await wait(120);
            const brokerageAfter = await tronWeb.trx.getBrokerage(witnessAccountHex);
            console.log("brokerageAfter:"+util.inspect(brokerageAfter))
            assert.equal(brokerageAfter, 15);
        });
    });

    describe('#createToken()', function () {
        it(`should create trc10 Token`, async function () {
            const cur_ts = (new Date()).valueOf();
            const start_ts = cur_ts+305000;
            const end_ts = cur_ts+315360000000;
            const rnd = Math.random().toString(36).substr(2);
            const options =  {
                name: `Token${rnd}`,
                abbreviation: `T${rnd.substring(2).toUpperCase()}`,
                description: "Useless utility token",
                url: `https://example-${rnd}.com/`,
                totalSupply: 100000000,
                saleEnd: end_ts, // 1 year
                frozenAmount: 5,
                frozenDuration: 1,
                trxRatio: 1,
                tokenRatio: 1,
                saleStart: start_ts,
                freeBandwidth: 100,
                freeBandwidthLimit: 10000,
                precision:6,
                permissionId: 2
            };
            console.log("options:",options);
            const data = {
                owner_address: accounts.hex[1],
                name: tronWeb.fromUtf8(`Token${rnd}`),
                abbr: tronWeb.fromUtf8(`T${rnd.substring(2).toUpperCase()}`),
                description: tronWeb.fromUtf8('Useless utility token'),
                url: tronWeb.fromUtf8(`https://example-${rnd}.com/`),
                total_supply: parseInt(100000000),
                trx_num: parseInt(1),
                num: parseInt(1),
                precision:6,
                start_time: start_ts,
                end_time: end_ts,
                free_asset_net_limit: parseInt(100),
                public_free_asset_net_limit: parseInt(10000),
                frozen_supply: {
                    frozen_amount: parseInt(5),
                    frozen_days: parseInt(1)
                },
                visible: false,
                Permission_id: 2
            }
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/createassetissue', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            const tx2 = await tronWeb.transactionBuilder.createToken(options,accounts.hex[1],tx1);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('createToken not equal');
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx1, tx2);
            } else {
                console.info('createToken goes well');
            }
            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let account = await tronWeb.trx.getAccount(accounts.b58[1]);
            console.log("account.asset_issued_ID: "+account.asset_issued_ID)
            assert.isTrue(account.asset_issued_ID > 0);
        });
    });

    describe('#createAccount()', function () {
        it(`should createAccount`, async function () {
            new_acccount = await tronWeb.createAccount()
            console.log('new_acccount:', new_acccount.address.hex);
            data = {
                owner_address: accounts.hex[1],
                account_address: new_acccount.address.hex,
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/createaccount', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            param = [new_acccount.address.hex, accounts.b58[1],{permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.createAccount(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('createAccount not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx1, tx2);
            } else {
                console.info('createAccount goes well');
            }

            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let account = await tronWeb.trx.getAccount(new_acccount.address.hex);
            console.log("new account: "+util.inspect(account,true,null,true))
            assert.isTrue(account.create_time > 0);
        });
    });

    describe('#updateAccount()', function () {
        it(`should update Account name for new account`, async function () {
            const data = {
                owner_address: accounts.hex[1],
                account_name: tronWeb.fromUtf8("Hello"),
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            const tx1 = await tronWeb.fullNode.request('wallet/updateaccount', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));

            const param = ['Hello', accounts.hex[1],{permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.updateAccount(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('updateAccount not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx1, tx2);
            } else {
                console.info('updateAccount goes well');
            }

            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let account = await tronWeb.trx.getAccount(accounts.hex[1]);
            console.log("account: "+util.inspect(account,true,null,true))
            assert.equal(tronWeb.toUtf8('0x'+account.account_name),'Hello');
        });
    });

    describe('#setAccountId()', function () {
        it(`should set account id accounts[1]`, async function () {
            let accountId = TronWeb.toHex('jackieshen110');
            data = {
                owner_address: accounts.hex[1],
                account_id: accountId,
                visible: false
            }
            gridtx = await tronWeb.fullNode.request('wallet/setaccountid', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));

            const transaction = await tronWeb.transactionBuilder.setAccountId(accountId, accounts.b58[1],{},gridtx);
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('setAccountId not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('setAccountId goes well');
            }
            const parameter = txPars(transaction);
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.account_id, accountId.slice(2));
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.SetAccountIdContract');

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let account = await tronWeb.trx.getAccount(accounts.hex[1]);
            console.log("account: "+util.inspect(account,true,null,true))
            assert.equal(tronWeb.toUtf8('0x'+account.account_id),'jackieshen110');
        });
    });

    describe('#updateToken()', function () {
        let tokenOptions
        let tokenID

        before(async function () {
            let account = await tronWeb.trx.getAccount(accounts.b58[1]);
            if (!account.asset_issued_ID) {
                tokenOptions = getTokenOptions();
                const result = await broadcaster.broadcaster(await tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[1]), accounts.pks[1])
                console.log("result: "+util.inspect(result,true,null,true))
                assert.isTrue(result.receipt.result);
                await wait(30);
                account = await tronWeb.trx.getAccount(accounts.b58[1]);
            }
            tokenID = account.asset_issued_ID;
        });
        it(`updateToken for accounts.hex[1]`, async function () {
            data = {
                owner_address: accounts.hex[1],
                url: tronWeb.fromUtf8('www.1000323.com'),
                description: tronWeb.fromUtf8('1000323test'),
                new_limit: 100,
                new_public_limit: 10000,
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/updateasset', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            const options =  {
                url: 'www.1000323.com',
                description: '1000323test',
                freeBandwidth: 100,
                freeBandwidthLimit: 10000,
                permissionId: 2
            };
            const tx2 = await tronWeb.transactionBuilder.updateToken(options,accounts.b58[1],tx1);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('updateToken not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx1, tx2);
            } else {
                console.info('updateToken goes well');
            }

            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let token = await tronWeb.trx.tronWeb.trx.getTokenByID(tokenID);
            console.log("token: "+util.inspect(token,true,null,true))
            assert.equal(token.free_asset_net_limit, 100);
            assert.equal(token.public_free_asset_net_limit, 10000);
            assert.equal(token.url, 'www.1000323.com');
            assert.equal(token.description, '1000323test');
        });
    });

    describe("#createProposal", async function () {
        let witnessAccountHex;
        before(async () => {
            witnessAccountHex = await tronWeb.address.toHex(WITNESS_ACCOUNT);
            const witnessAccount = await tronWeb.trx.getAccount(WITNESS_ACCOUNT);
            if (!witnessAccount.active_permission) {
                const sendTrxTx = await tronWeb.trx.sendTrx(WITNESS_ACCOUNT, 20000000000);
                assert.isTrue(sendTrxTx.result);
                await wait(30);
                // update account permission
                let ownerPermission = { type: 0, permission_name: 'owner' };
                ownerPermission.threshold = 1;
                ownerPermission.keys  = [];
                let activePermission = { type: 2, permission_name: 'active' };
                activePermission.threshold = threshold;
                activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission.keys = [];
                ownerPermission.keys.push({ address: witnessAccountHex, weight: 1 });
                for (let i = idxS; i < idxE; i++) {
                    let address = accounts.hex[i];
                    let weight = 1;
                    activePermission.keys.push({ address: address, weight: weight });
                }

                let activePermission2 = { type: 2, permission_name: 'active2' };
                activePermission2.threshold = 1;
                activePermission2.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission2.keys = [];
                activePermission2.keys.push({ address: witnessAccountHex, weight: 1 });
                let witnessPermission = { type: 1, permission_name: 'witness' };
                witnessPermission.threshold = 1;
                witnessPermission.keys = [];
                witnessPermission.keys.push({ address: witnessAccountHex, weight: 1 });

                let data = {
                    owner_address: witnessAccountHex,
                    actives: [activePermission,activePermission2],
                    owner: ownerPermission,
                    witness: witnessPermission,
                    visible: false,
                };
                const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                console.log('java-tron ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                    witnessAccountHex,
                    ownerPermission,
                    witnessPermission,
                    [activePermission,activePermission2],
                    {},
                    tx1
                );
                if (!_.isEqual(tx1,tx2)) {
                    console.error('accountpermissionupdate not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('accountpermissionupdate goes well');
                }
                const updateTx = await broadcaster.broadcaster(null, WITNESS_KEY, tx2);
                console.log("updateTx:"+util.inspect(updateTx))
                console.log("updateTx.txID:"+updateTx.transaction.txID)
                assert.equal(updateTx.transaction.txID.length, 64);
                await wait(30);
            }
        });
        it('should allow the SR account to create a new proposal as a single object', async function () {
            let proposals = await tronWeb.trx.listProposals();
            const data = {
                owner_address: witnessAccountHex,
                parameters:{"key": 0, "value": 100000},
                visible: false,
                Permission_id: 2
            }

            const gridtx = await tronWeb.fullNode.request('wallet/proposalcreate', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            param = [{"key": 0, "value": 100000}, WITNESS_ACCOUNT, {permissionId: 2},gridtx];
            const transaction = await tronWeb.transactionBuilder.createProposal(...param)
            console.log('TronWeb ', JSON.stringify(transaction, null, 2))
            if (!_.isEqual(gridtx,transaction)) {
                console.error('createProposal not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('createProposal goes well');
            }

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            let proposalsAfter = await tronWeb.trx.listProposals();
            console.log("proposalsAfter: "+util.inspect(proposalsAfter,true,null,true))
            assert.equal(proposalsAfter.length, proposals.length+1);
        })
    });

    describe("#deleteProposal", async function () {
        let proposals;
        let witnessAccountHex;
        before(async function () {
            witnessAccountHex = await tronWeb.address.toHex(WITNESS_ACCOUNT);
            const witnessAccount = await tronWeb.trx.getAccount(WITNESS_ACCOUNT);
            if (!witnessAccount.active_permission) {
                const sendTrxTx = await tronWeb.trx.sendTrx(WITNESS_ACCOUNT, 20000000000);
                assert.isTrue(sendTrxTx.result);
                await wait(30);
                // update account permission
                let ownerPermission = { type: 0, permission_name: 'owner' };
                ownerPermission.threshold = 1;
                ownerPermission.keys  = [];
                let activePermission = { type: 2, permission_name: 'active' };
                activePermission.threshold = threshold;
                activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission.keys = [];
                ownerPermission.keys.push({ address: witnessAccountHex, weight: 1 });
                for (let i = idxS; i < idxE; i++) {
                    let address = accounts.hex[i];
                    let weight = 1;
                    activePermission.keys.push({ address: address, weight: weight });
                }

                let activePermission2 = { type: 2, permission_name: 'active2' };
                activePermission2.threshold = 1;
                activePermission2.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission2.keys = [];
                activePermission2.keys.push({ address: witnessAccountHex, weight: 1 });
                let witnessPermission = { type: 1, permission_name: 'witness' };
                witnessPermission.threshold = 1;
                witnessPermission.keys = [];
                witnessPermission.keys.push({ address: witnessAccountHex, weight: 1 });

                let data = {
                    owner_address: witnessAccountHex,
                    actives: [activePermission,activePermission2],
                    owner: ownerPermission,
                    witness: witnessPermission,
                    visible: false,
                };
                const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                console.log('java-tron ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                    witnessAccountHex,
                    ownerPermission,
                    witnessPermission,
                    [activePermission,activePermission2],
                    {},
                    tx1
                );
                if (!_.isEqual(tx1,tx2)) {
                    console.error('accountpermissionupdate not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('accountpermissionupdate goes well');
                }
                const updateTx = await broadcaster.broadcaster(null, WITNESS_KEY, tx2);
                console.log("updateTx:"+util.inspect(updateTx))
                console.log("updateTx.txID:"+updateTx.transaction.txID)
                assert.equal(updateTx.transaction.txID.length, 64);
                await wait(30);
            }

            let parameters = [{"key": 0, "value": 100000}, {"key": 1, "value": 2}]
            await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
            await wait(30);
            proposals = await tronWeb.trx.listProposals();
            console.log("proposals:"+util.inspect(proposals,true,null,true))
        })

        after(async function () {
            proposals = await tronWeb.trx.listProposals();
            if (proposals[0].state !== 'CANCELED')
                await broadcaster.broadcaster(tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id, WITNESS_ACCOUNT), WITNESS_KEY)
        })

        it('should allow the SR to delete its own proposal', async function () {
            let data = {
                owner_address: witnessAccountHex,
                proposal_id: proposals[0].proposal_id,
                visible: false,
                Permission_id: 2
            }

            const gridtx = await tronWeb.fullNode.request('wallet/proposaldelete', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            let param = [proposals[0].proposal_id, witnessAccountHex, {permissionId: 2},gridtx];
            const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('deleteProposal not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('deleteProposal goes well');
            }

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);
            let proposals = await tronWeb.trx.listProposals();
            assert.equal(proposals[0].state,'CANCELED');
        });
    });

    describe("#voteProposal", function () {
        let proposalsId;

        let witnessAccountHex;
        before(async function () {
            witnessAccountHex = await tronWeb.address.toHex(WITNESS_ACCOUNT);
            const witnessAccount = await tronWeb.trx.getAccount(WITNESS_ACCOUNT);
            if (!witnessAccount.active_permission) {
                const sendTrxTx = await tronWeb.trx.sendTrx(WITNESS_ACCOUNT, 20000000000);
                assert.isTrue(sendTrxTx.result);
                await wait(30);
                // update account permission
                let ownerPermission = { type: 0, permission_name: 'owner' };
                ownerPermission.threshold = 1;
                ownerPermission.keys  = [];
                let activePermission = { type: 2, permission_name: 'active' };
                activePermission.threshold = threshold;
                activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission.keys = [];
                ownerPermission.keys.push({ address: witnessAccountHex, weight: 1 });
                for (let i = idxS; i < idxE; i++) {
                    let address = accounts.hex[i];
                    let weight = 1;
                    activePermission.keys.push({ address: address, weight: weight });
                }

                let activePermission2 = { type: 2, permission_name: 'active2' };
                activePermission2.threshold = 1;
                activePermission2.operations = ACTIVE_PERMISSION_OPERATIONS;
                activePermission2.keys = [];
                activePermission2.keys.push({ address: witnessAccountHex, weight: 1 });
                let witnessPermission = { type: 1, permission_name: 'witness' };
                witnessPermission.threshold = 1;
                witnessPermission.keys = [];
                witnessPermission.keys.push({ address: witnessAccountHex, weight: 1 });

                let data = {
                    owner_address: witnessAccountHex,
                    actives: [activePermission,activePermission2],
                    owner: ownerPermission,
                    witness: witnessPermission,
                    visible: false,
                };
                const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                console.log('java-tron ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                    witnessAccountHex,
                    ownerPermission,
                    witnessPermission,
                    [activePermission,activePermission2],
                    {},
                    tx1
                );
                if (!_.isEqual(tx1,tx2)) {
                    console.error('accountpermissionupdate not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('accountpermissionupdate goes well');
                }
                const updateTx = await broadcaster.broadcaster(null, WITNESS_KEY, tx2);
                console.log("updateTx:"+util.inspect(updateTx))
                console.log("updateTx.txID:"+updateTx.transaction.txID)
                assert.equal(updateTx.transaction.txID.length, 64);
                await wait(30);
            }

            let parameters = [{ "key": 1, "value": 9999000001 }]
            const result = await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
            console.log("result: "+util.inspect(result,true,null,true))
            await wait(45);
            proposalsId = (await tronWeb.trx.listProposals())[0].proposal_id;
            console.log("proposalsId: "+util.inspect(proposalsId,true,null,true))
        })

        it('should allow vote proposal', async function () {
            let data = {
                owner_address: witnessAccountHex,
                proposal_id: proposalsId,
                is_add_approval: true,
                Permission_id: 2
            }

            const gridtx = await tronWeb.fullNode.request('wallet/proposalapprove', data, 'post');
            console.log('java-tron ', JSON.stringify(gridtx, null, 2));
            let param = [proposalsId, true, WITNESS_ACCOUNT, { permissionId: 2 },gridtx];
            const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
            console.log('TronWeb ', JSON.stringify(transaction, null, 2));
            if (!_.isEqual(gridtx,transaction)) {
                console.error('voteProposal not equal');
                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(gridtx, transaction);
            } else {
                console.info('voteProposal goes well');
            }

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);
            let proposals = await tronWeb.trx.listProposals();
            console.log("proposals[0]: "+util.inspect(proposals[0],true,null,true))
            assert.equal(proposals[0].approvals.length,1);
        })
    });

    describe('#updateAccountPermissions()', function () {
        it(`updateAccountPermissions to tronWeb.defaultAddress.hex`, async function () {
            // update account permission
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = 1;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active' };
            activePermission.threshold = 4;
            activePermission.operations = ACTIVE_PERMISSION_OPERATIONS;
            activePermission.keys = [];

            ownerPermission.keys.push({ address: accounts.hex[1], weight: 1 });
            for (let i = idxS; i < idxE; i++) {
                let address = accounts.hex[i];
                let weight = 2;
                activePermission.keys.push({ address: address, weight: weight });
            }
            let data = {
                owner_address: accounts.hex[1],
                actives: activePermission,
                owner: ownerPermission,
                Permission_id: 2
            };
            const tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
            console.log('java-tron ', JSON.stringify(tx1, null, 2));
            const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(
                accounts.hex[1],
                ownerPermission,
                null,
                [activePermission],
                {permissionId: 2},
                tx1
            );
            if (!_.isEqual(tx1,tx2)) {
                console.error('accountpermissionupdate not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                assert.equal(tx1, tx2);
            } else {
                console.info('accountpermissionupdate goes well');
            }

            let signedTransaction = tx2;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accounts.pks[i], 2);
                console.log("signedTransaction:"+util.inspect(signedTransaction))
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            console.log("result: "+util.inspect(result,true,null,true))
            assert.isTrue(result.result)
            await wait(35);

            const ownerAddress = await tronWeb.trx.getAccount(accounts.b58[1]);
            console.log("ownerAddress:"+util.inspect(ownerAddress,true,null,true))
            assert.equal(ownerAddress.active_permission[0].threshold,4);
        });
    });
  });
