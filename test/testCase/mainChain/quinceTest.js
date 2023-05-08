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
    FEE_LIMIT
} = require('../util/config');
const { equals, getValues } = require('../util/testUtils');


describe('TronWeb.transactionBuilder', function () {

    let account0_b58;
    let account0_hex;
    let tronWeb;
    let emptyAccount;
    let accounts;


    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        account0_hex = "4199401720e0f05456f60abc65fca08696fa698ee0";
        account0_b58 = "TPwXAV3Wm25x26Q6STrFYCDMM4F59UhXL7";
        await tronWebBuilder.newTestAccountsInMain(1);
        accounts = await tronWebBuilder.getTestAccountsInMain(1);

    });

    describe.only('#sendTrx()', function () {
            it(`should send 10 trx from default address to account0_b58`, async function () {
                data = {
                            //owner_address: this.tronWeb.defaultAddress.base58,
                            owner_address: tronWeb.defaultAddress.hex,
                            to_address: account0_hex,
                            amount: 10,
                            visible: false,
                            Permission_id: 2
                        };
                tx1 = await tronWeb.fullNode.request('wallet/createtransaction', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                param = [account0_hex, 10,tronWeb.defaultAddress.hex,{permissionId: 2},tx1];
                const tx2 = await tronWeb.transactionBuilder.sendTrx(...param);
                console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                if (!_.isEqual(tx1,tx2)) {
                    console.error('sendTrx not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('sendTrx goes well');
                }

                transactionExtendE = await tronWeb.transactionBuilder.extendExpiration(tx2, 3600);
                console.log("transactionExtendE: ",JSON.stringify(transactionExtendE, null, 2));
                const note = "Sending money to Bill.";
                transactionUpdate = await tronWeb.transactionBuilder.addUpdateData(tx2, note);
                console.log("transactionUpdate: ",JSON.stringify(transactionUpdate, null, 2))

                result = await broadcaster.broadcaster(null, accounts.pks[6], transactionUpdate);
                console.log("result: ",JSON.stringify(result, null, 2))
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transactionUpdate.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                                        continue;
                                    } else {
                                        break;
                                    }
                                }
                                console.log("111111");

            });
    });

    //freeze v2 is open, old freeze is closed
    describe('#freezebalance()', function() {
        it(`should freeze 1 TRX  for default address`, async function () {
                            param = [1000000, 0,'ENERGY', accounts.hex[0], accounts.hex[0]];
                            const tx2 = await tronWeb.transactionBuilder.freezeBalance(...param);
                            console.log('TronWeb ',JSON.stringify(tx2, null, 2));

                            data = {
                                        owner_address: accounts.hex[0],
                                        frozen_balance: 1000000,
                                        frozen_duration: 3,
                                        receiver_address: accounts.hex[0],
                                        Permission_id: 2,
                                        visible: false
                                    };
                            console.log("data:",data);
                            tx1 = await tronWeb.fullNode.request('wallet/freezebalance', data, 'post');
                            console.log('TronGrid ', JSON.stringify(tx1, null, 2));


                            /*const result = await broadcaster.broadcaster(null, PRIVATE_KEY, tx2);
                            console.log('Result ', JSON.stringify(result, null, 2));
                            while (true) {
                                                const tx = await tronWeb.trx.getTransactionInfo(tx2.txID);
                                                if (Object.keys(tx).length === 0) {
                                                    await wait(3);
                                                    continue;
                                                } else {
                                                    break;
                                                }
                                            }*/

                            if (!_.isEqual(tx1,tx2)) {
                                console.error('freezebalance not equal');
                                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                            } else {
                                console.info('freezebalance goes well');
                            }
        });
    });


    //freeze v2 is open, old freeze is closed
    describe('#unfreezeBalance()', function() {
            it(`should freeze 1 TRX  for default address`, async function () {
                                data = {
                                            owner_address: tronWeb.defaultAddress.hex,
                                            resource: 'BANDWIDTH',
                                            receiver_address: '41DC3B38A9331424275182065422A44FA3B642A67F',
                                            visible: false
                                        };

                                console.log("data:",data);
                                tx1 = await tronWeb.fullNode.request('wallet/unfreezebalance', data, 'post');
                                console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                                param = ['BANDWIDTH', tronWeb.defaultAddress.base58, 'TW3gc2omYjk3hazrRq6hRWjJaiHfxPV59j', {},tx1];
                                const tx2 = await tronWeb.transactionBuilder.unfreezeBalance(...param);
                                console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                                /*const result = await broadcaster.broadcaster(null, PRIVATE_KEY, tx2);
                                console.log('Result ', JSON.stringify(result, null, 2));
                                while (true) {
                                                    const tx = await tronWeb.trx.getTransactionInfo(tx2.txID);
                                                    if (Object.keys(tx).length === 0) {
                                                        await wait(3);
                                                        continue;
                                                    } else {
                                                        break;
                                                    }
                                                }*/

                                if (!_.isEqual(tx1,tx2)) {
                                    console.error('freezebalance not equal');
                                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                                } else {
                                    console.info('freezebalance goes well');
                                }
            });
        });

    describe('#freezeBalanceV2()', function () {
        it(`should freezeV2 2 TRX for default address`, async function () {
            data = {
                owner_address: tronWeb.defaultAddress.hex,
                frozen_balance: 2000000,
                resource: 'BANDWIDTH',
                visible: false,
                Permission_id: 2
            };
            console.log("data:",data);
            tx1 = await tronWeb.fullNode.request('wallet/freezebalancev2', data, 'post');
            console.log('TronGrid ', JSON.stringify(tx1, null, 2));

            param = [10000000000, 'BANDWIDTH', tronWeb.defaultAddress.base58, {permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('freezeBalanceV2 not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
            } else {
                console.info('freezeBalanceV2 goes well');
            }
            result = await broadcaster.broadcaster(null, PRIVATE_KEY, tx2);
            console.log("result: ",result);
            let createInfo
            while (true) {
                createInfo = await tronWeb.trx.getTransactionInfo(tx2.txID);
                if (Object.keys(createInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        });
    });

    describe('#unfreezeBalanceV2()', function () {
        it(`should unfreezeBalanceV2 1 TRX from default address`, async function () {
                    data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        unfreeze_balance: 1000000,
                        resource: 'BANDWIDTH',
                        visible: false,
                        Permission_id: 2
                    };
                    console.log("data:",data);
                    tx1 = await tronWeb.fullNode.request('wallet/unfreezebalancev2', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                    param = [1000000, "BANDWIDTH", tronWeb.defaultAddress.hex,{permissionId: 2},tx1];
                    const tx2 = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
                    console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                    if (!_.isEqual(tx1,tx2)) {
                        console.error('unfreezeBalanceV2 not equal');
                        console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('unfreezeBalanceV2 goes well');
                    }
        });
    });

    describe('#delegateResource()', function () {
            it(`should delegateResource 2 TRX for default address`, async function () {
                data = {
                    owner_address: tronWeb.defaultAddress.hex,
                    receiver_address: account0_hex,
                    balance: 1000000,
                    resource: 'BANDWIDTH',
                    lock: false,
                    visible: false,
                    Permission_id: 2
                };
                console.log("data:",data);
                tx1 = await tronWeb.fullNode.request('wallet/delegateresource', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                param = [1000000,account0_hex, 'BANDWIDTH', tronWeb.defaultAddress.base58,false, {permissionId: 2},tx1];
                const tx2 = await tronWeb.transactionBuilder.delegateResource(...param);
                console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                if (!_.isEqual(tx1,tx2)) {
                    console.error('delegateResource not equal');
                    console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('delegateResource goes well');
                }
            });
    });

    describe('#undelegateResource()', function () {
                it(`should undelegateResource 2 TRX for default address`, async function () {
                    data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        receiver_address: account0_hex,
                        balance: 1000000,
                        resource: 'BANDWIDTH',
                        visible: false,
                        Permission_id: 2
                    };
                    console.log("data:",data);
                    tx1 = await tronWeb.fullNode.request('wallet/undelegateresource', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                    param = [1000000,account0_hex, 'BANDWIDTH', tronWeb.defaultAddress.base58, {permissionId: 2},tx1];
                    const tx2 = await tronWeb.transactionBuilder.undelegateResource(...param);
                    console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                    if (!_.isEqual(tx1,tx2)) {
                        console.error('undelegateResource not equal');
                        console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('undelegateResource goes well');
                    }
                });
    });

    describe("#withdrawExpireUnfreeze", async function () {
            before(async () => {
                await broadcaster.broadcaster(null, accounts.pks[3], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'BANDWIDTH', accounts.hex[3]));
                await broadcaster.broadcaster(null, accounts.pks[3], await tronWeb.transactionBuilder.freezeBalanceV2(500e6, 'ENERGY', accounts.hex[3]));
                await broadcaster.broadcaster(null, PRIVATE_KEY, await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'ENERGY'));
                await wait(40);
            })

            it('multisign、normal address', async function () {
                await broadcaster.broadcaster(null, accounts.pks[3], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', accounts.hex[3]));
                await wait(35);
                let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[3]);
                console.log("accountBefore1: ",accountBefore1.unfrozenV2[0].unfreeze_amount)   //9931945444，944260,
                assert.isTrue(accountBefore1.unfrozenV2[0].unfreeze_amount > 0);

                data = {
                    owner_address:accounts.hex[3],
                    visible:false,
                    Permission_id:2
                }
                gridtx = await tronWeb.fullNode.request('wallet/withdrawexpireunfreeze', data, 'post');
                console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                let transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(accounts.b58[3], {permissionId: 2},gridtx)
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                if (!_.isEqual(gridtx,transaction)) {
                    console.error('withdrawExpireUnfreeze bandwidth not equal');
                    console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('withdrawExpireUnfreeze bandwidth goes well');
                }

                let tx = await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                console.log("tx:"+util.inspect(tx))
                assert.equal(tx.transaction.txID.length, 64);
                await wait(30);
                let parameter = txPars(transaction);
                assert.equal(parameter.value.owner_address, accounts.hex[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
                let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[3]);

                console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))  //"9931945454，944260,"
                assert.isUndefined(accountAfter1.unfrozenV2);

                await broadcaster.broadcaster(null, accounts.pks[3], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.hex[3]));
                await wait(35);
                let accountBefore2 = await tronWeb.trx.getAccount(accounts.b58[3]);
                console.log("accountBefore2: "+util.inspect(accountBefore2,true,null,true))
                assert.isTrue(accountBefore2.unfrozenV2[0].unfreeze_amount > 0);

                data = {
                    owner_address:accounts.hex[3],
                    visible:false
                }
                gridtx = await tronWeb.fullNode.request('wallet/withdrawexpireunfreeze', data, 'post');
                console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(accounts.hex[3],{},gridtx)
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                if (!_.isEqual(gridtx,transaction)) {
                    console.error('withdrawExpireUnfreeze energy no permissionId not equal');
                    console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('withdrawExpireUnfreeze energy no permissionId goes well');
                }

                tx = await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                console.log("tx:"+util.inspect(tx))
                assert.equal(tx.transaction.txID.length, 64);
                await wait(30);
                parameter = txPars(transaction);
                assert.equal(parameter.value.owner_address, accounts.hex[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
                let accountAfter2 = await tronWeb.trx.getAccount(accounts.hex[3]);
                console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
                assert.isUndefined(accountAfter2.unfrozenV2);
            })

            it('use default address', async function () {
                await broadcaster.broadcaster(null, PRIVATE_KEY, await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY'));
                await wait(35);
                let accountBefore1 = await tronWeb.trx.getAccount();
                console.log("accountBefore1: "+util.inspect(accountBefore1,true,null,true))
                assert.isTrue(accountBefore1.unfrozenV2[0].unfreeze_amount > 0);
                data = {
                    owner_address:tronWeb.defaultAddress.hex,
                    visible:false
                }
                gridtx = await tronWeb.fullNode.request('wallet/withdrawexpireunfreeze', data, 'post');
                console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                let transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(tronWeb.defaultAddress.hex, {},gridtx)
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                if (!_.isEqual(gridtx,transaction)) {
                    console.error('withdrawExpireUnfreeze energy default user not equal');
                    console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                } else {
                    console.info('withdrawExpireUnfreeze energy default user goes well');
                }

                let tx = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                console.log("tx:"+util.inspect(tx))
                assert.equal(tx.transaction.txID.length, 64);
                await wait(30);
                let parameter = txPars(transaction);
                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
                let accountAfter1 = await tronWeb.trx.getAccount();
                console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
                assert.isUndefined(accountAfter1.unfrozenV2);
            })

            it('should throw if owner address is invalid', async function () {
                const params = [
                    ['ddssddd', {permissionId: 2}],
                    ['ddssddd']
                ];

                for (let param of params) {
                    await assertThrow(
                        tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param),
                        'Invalid origin address provided'
                    )
                }
            })
        });

    describe('#createAccount()', function () {
            it(`should createAccount`, async function () {
                        new_acccount = await tronWeb.createAccount()
                        console.log('new_acccount:', new_acccount.address.hex);
                        data = {
                            owner_address: tronWeb.defaultAddress.hex,
                            account_address: new_acccount.address.hex,
                            visible: false,
                            Permission_id: 2
                        };
                        console.log("data:",data);
                        tx1 = await tronWeb.fullNode.request('wallet/createaccount', data, 'post');
                        console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                        param = [new_acccount.address.hex, tronWeb.defaultAddress.hex,{permissionId: 2},tx1];
                        const tx2 = await tronWeb.transactionBuilder.createAccount(...param);
                        console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                        if (!_.isEqual(tx1,tx2)) {
                            console.error('createAccount not equal');
                            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                        } else {
                            console.info('createAccount goes well');
                        }
            });
    });

    describe('#updateAccount()', function () {
            it(`should update Account name for new account`, async function () {
                        new_acccount = await tronWeb.createAccount();
                        await tronWeb.trx.sendTrx(new_acccount.address.hex,1000,{privateKey: PRIVATE_KEY});
                        data = {
                            owner_address: new_acccount.address.hex,
                            account_name: tronWeb.fromUtf8("Hello"),
                            visible: false,
                            Permission_id: 2
                        };
                        console.log("data:",data);
                        tx1 = await tronWeb.fullNode.request('wallet/updateaccount', data, 'post');
                        console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                        param = ['Hello', new_acccount.address.hex,{permissionId: 2},tx1];
                        const tx2 = await tronWeb.transactionBuilder.updateAccount(...param);
                        console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                        if (!_.isEqual(tx1,tx2)) {
                            console.error('updateAccount not equal');
                            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                        } else {
                            console.info('updateAccount goes well');
                        }
            });
    });

    describe('#updateAccountPermissions()', function () {
                it(`updateAccountPermissions to tronWeb.defaultAddress.hex`, async function () {
                            const permissionData = {
                                            "owner": {
                                                "type": 0,
                                                "keys": [
                                                    {
                                                        "address": tronWeb.defaultAddress.hex,
                                                        "weight": 1
                                                    }
                                                ],
                                                "threshold": 1,
                                                "permission_name": "owner"
                                            },
                                            "witness": {
                                                "keys": [
                                                    {
                                                        "address": tronWeb.defaultAddress.hex,
                                                        "weight": 1
                                                    }
                                                ],
                                                "threshold": 1,
                                                "id": 1,
                                                "type": 1,
                                                "permission_name": "witness"
                                            },
                                            "owner_address": tronWeb.defaultAddress.hex,
                                            "actives": [
                                                {
                                                    "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                                                    "keys": [
                                                        {
                                                            "address": tronWeb.defaultAddress.hex,
                                                            "weight": 1
                                                        }
                                                    ],
                                                    "threshold": 1,
                                                    "id": 2,
                                                    "type": 2,
                                                    "permission_name": "active"
                                                }
                                            ]
                                        };

                            data = {
                                owner_address: tronWeb.defaultAddress.hex,
                                owner: permissionData.owner,
                                witness:permissionData.witness,
                                actives:permissionData.actives,
                                visible: false,
                                Permission_id: 2
                            };
                            console.log("data:",data);
                            tx1 = await tronWeb.fullNode.request('wallet/accountpermissionupdate', data, 'post');
                            console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                            console.log("permissionData.active:",permissionData.active);

                            param = [tronWeb.defaultAddress.hex, permissionData.owner,permissionData.witness, permissionData.actives, {permissionId: 2},tx1];
                            const tx2 = await tronWeb.transactionBuilder.updateAccountPermissions(...param);
                            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                            if (!_.isEqual(tx1,tx2)) {
                                console.error('updateAccountPermissions not equal');
                                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                            } else {
                                console.info('updateAccountPermissions goes well');
                            }
                        });
            });

    describe('#sendToken()', function () {
        it(`should send 0.1 1000323  from default address to account0_b58`, async function () {
                    data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        to_address: account0_hex,
                        asset_name: tronWeb.fromUtf8("1000340"),
                        amount: 1,
                        visible: false,
                        Permission_id: 2
                    };
                    console.log("data:",data);
                    tx1 = await tronWeb.fullNode.request('wallet/transferasset', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                    param = [account0_hex, 1, "1000340", tronWeb.defaultAddress.hex,{permissionId: 2},tx1];
                    const tx2 = await tronWeb.transactionBuilder.sendToken(...param);
                    console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                    if (!_.isEqual(tx1,tx2)) {
                        console.error('sendToken not equal');
                        console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('sendToken goes well');
                    }
        });
    });

    describe('#purchaseToken()', function () {
            it(`should purchaseToken`, async function () {
                        /*new_acccount = await tronWeb.createAccount();
                        await tronWeb.trx.sendTrx(new_acccount.address.hex,1500000000,{privateKey: PRIVATE_KEY});
                        cur_ts = (new Date()).valueOf();
                        start_ts = cur_ts+305000;
                        end_ts = cur_ts+315360000000;
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
                                         };
                        const txOrign = await tronWeb.transactionBuilder.createToken(options,new_acccount.address.hex);
                        console.log("new_acccount.privateKey: ",new_acccount.privateKey);
                        result = await broadcaster.broadcaster(null, new_acccount.privateKey, txOrign);
                        console.log("result: ",result)
                        while (true) {
                            const tx = await tronWeb.trx.getTransactionInfo(txOrign.txID);
                            if (Object.keys(tx).length === 0) {
                                await wait(3);
                                continue;
                            } else {
                                break;
                            }
                        }*/
                        issueAddress_hex ='41df1c31bde12557b065c418a356dc4792eeef836f';
                        const data = {
                            owner_address: tronWeb.defaultAddress.hex,
                            to_address: issueAddress_hex,
                            asset_name: tronWeb.fromUtf8('1005059'),
                            amount: 1,
                            visible: false,
                            Permission_id: 2
                        }

                        tx1 = await tronWeb.fullNode.request('wallet/participateassetissue', data, 'post');
                        console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                        param = [issueAddress_hex, "1005059", 1, tronWeb.defaultAddress.hex, {permissionId: 2},tx1];
                        console.log("param: ",param);
                        const tx2 = await tronWeb.transactionBuilder.purchaseToken(...param);
                        console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                        if (!_.isEqual(tx1,tx2)) {
                            console.error('purchaseToken not equal');
                            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                        } else {
                            console.info('purchaseToken goes well');
                        };

                    });
    });

    describe('#createToken()', function () {
            it(`should create trc10 Token`, async function () {
                        new_acccount = await tronWeb.createAccount();
                        await tronWeb.trx.sendTrx(new_acccount.address.hex,15000,{privateKey: PRIVATE_KEY});
                        cur_ts = (new Date()).valueOf();
                        start_ts = cur_ts+305000;
                        end_ts = cur_ts+315360000000;
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
                                    owner_address: new_acccount.address.hex,
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
                        console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                        const tx2 = await tronWeb.transactionBuilder.createToken(options,new_acccount.address.hex,tx1);


                        console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                        if (!_.isEqual(tx1,tx2)) {
                            console.error('createToken not equal');
                            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                        } else {
                            console.info('createToken goes well');
                        }
                    });
    });

    describe('#updateToken()', function () {
                it(`updateToken 1000323 for tronWeb.defaultAddress.hex`, async function () {
                            data = {
                                owner_address: tronWeb.defaultAddress.hex,
                                url: tronWeb.fromUtf8('www.1000323.com'),
                                description: tronWeb.fromUtf8('1000323test'),
                                new_limit: 100,
                                new_public_limit: 10000,
                                visible: false,
                                Permission_id: 2
                            };
                            console.log("data:",data);
                            tx1 = await tronWeb.fullNode.request('wallet/updateasset', data, 'post');
                            console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                            const options =  {
                                    url: 'www.1000323.com',
                                    description: '1000323test',
                                    freeBandwidth: 100,
                                    freeBandwidthLimit: 10000,
                                    permissionId: 2
                                };
                            const tx2 = await tronWeb.transactionBuilder.updateToken(options,tronWeb.defaultAddress.hex,tx1);
                            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                            if (!_.isEqual(tx1,tx2)) {
                                console.error('updateToken not equal');
                                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                            } else {
                                console.info('updateToken goes well');
                            }
                });
            });
  });
