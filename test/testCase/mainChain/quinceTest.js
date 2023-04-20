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

    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        account0_hex = "4199401720e0f05456f60abc65fca08696fa698ee0";
        account0_b58 = "TPwXAV3Wm25x26Q6STrFYCDMM4F59UhXL7";

    });

    describe('#sendTrx()', function () {
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
            });
    });

    //freeze v2 is open, old freeze is closed
    /*describe('#freezebalance()', function() {
        it(`should freeze 1 TRX  for default address`, async function () {
                            data = {
                                        owner_address: tronWeb.defaultAddress.hex,
                                        frozen_balance: 1000000,
                                        frozen_duration: 3,
                                    };
                            console.log("data:",data);
                            tx1 = await tronWeb.fullNode.request('wallet/freezebalance', data, 'post');
                            console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                            param = [tronWeb.defaultAddress.hex, 1000000, 3,{permissionId: 2},tx1];
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
    });*/

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

            param = [2000000, 'BANDWIDTH', tronWeb.defaultAddress.base58, {permissionId: 2},tx1];
            const tx2 = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
            console.log('TronWeb ',JSON.stringify(tx2, null, 2));
            if (!_.isEqual(tx1,tx2)) {
                console.error('freezeBalanceV2 not equal');
                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
            } else {
                console.info('freezeBalanceV2 goes well');
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
    //tronweb 报错：TypeError: Cannot create property 'type' on boolean 'false'
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

    describe.only('#updateToken()', function () {
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
