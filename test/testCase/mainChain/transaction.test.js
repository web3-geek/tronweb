const chai = require('chai');
const tronWebBuilder = require('../util/tronWebBuilder');
const TronWeb = tronWebBuilder.TronWeb;
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const waitChainData = require('../util/waitChainData');
const { testRevert, testConstant, trcTokenTest070} = require('../util/contracts');
const ethers = require('ethers');
const AbiCoder = ethers.utils.AbiCoder;
const util = require('util');
const assert = chai.assert;

const {
    ADDRESS_BASE58,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved,
    UPDATED_TEST_TOKEN_OPTIONS,
    WITNESS_ACCOUNT,
    WITNESS_KEY,
    WITNESS_ACCOUNT2,
    WITNESS_KEY2, TOKEN_ID, ADDRESS_HEX, FEE_LIMIT
} = require('../util/config');
const publicMethod = require("../util/PublicMethod");

describe('TronWeb.utils.transaction', function () {
    let accounts;
    let tronWeb;
    let isAllowSameTokenNameApproved

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(30);
        accounts = await tronWebBuilder.getTestAccountsInMain(30);
        isAllowSameTokenNameApproved = await isProposalApproved(tronWeb, 'getAllowSameTokenName')
    });

    describe('#txCheck', function () {
        let params

        const commonAssertPb = (transaction) => {
            const transactionPb = TronWeb.utils.transaction.txJsonToPb(transaction);
            const rawDataBytes = transactionPb.getRawData().serializeBinary();
            const txID = TronWeb.utils.ethersUtils.sha256(rawDataBytes);
            const txPbToTxID = TronWeb.utils.transaction.txPbToTxID(transactionPb);
            assert.equal(txPbToTxID.replace(/^0x/, ''), transaction.txID);
            assert.equal(txID.replace(/^0x/, ''), transaction.txID);
        };

        const commonAssertFalsePb = (transaction) => {
            console.log("transaction:"+util.inspect(transaction,true,null,true))
            const authResult = TronWeb.utils.transaction.txCheck(transaction);
            assert.equal(authResult, true);
            commonAssertPb(transaction);

            const cop2 = JSON.parse(JSON.stringify(transaction))
            cop2.raw_data_hex = cop2.raw_data_hex + '00';
            const authResult2 = TronWeb.utils.transaction.txCheck(cop2);
            assert.equal(authResult2, false);

            const cop3 = JSON.parse(JSON.stringify(transaction))
            cop3.txID = cop3.txID + '00'
            const authResult3 = TronWeb.utils.transaction.txCheck(cop3);
            assert.equal(authResult3, false);

            const cop4 = JSON.parse(JSON.stringify(transaction))
            cop4.raw_data.ref_block_bytes = cop4.raw_data.ref_block_bytes + '00';
            const authResult4 = TronWeb.utils.transaction.txCheck(cop4);
            assert.equal(authResult4, false);

            const cop5 = JSON.parse(JSON.stringify(transaction))
            cop5.raw_data.ref_block_hash = cop5.raw_data.ref_block_hash + '12';
            const authResult5 = TronWeb.utils.transaction.txCheck(cop5);
            assert.equal(authResult5, false);

            const cop6 = JSON.parse(JSON.stringify(transaction))
            cop6.raw_data.expiration = cop6.raw_data.expiration + '12';
            const authResult6 = TronWeb.utils.transaction.txCheck(cop6);
            assert.equal(authResult6, false);

            const cop7 = JSON.parse(JSON.stringify(transaction))
            cop7.raw_data.timestamp = cop7.raw_data.timestamp + '12';
            const authResult7 = TronWeb.utils.transaction.txCheck(cop7);
            assert.equal(authResult7, false);

            const cop8 = JSON.parse(JSON.stringify(transaction))
            cop8.raw_data.data = '31';
            console.log("cop8:"+util.inspect(cop8,true,null,true))
            const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
            assert.equal(authResult8, false);

            const cop13 = JSON.parse(JSON.stringify(transaction))
            if (cop13.raw_data.contract[0].Permission_id) {
                cop13.raw_data.contract[0].Permission_id = 0;
                let authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                assert.equal(authResult13, false);
            }
        };

        describe('#case TransferContract', function () {
            before(() => {
                params = [
                    [accounts.b58[1], 10, { permissionId: 2 }],
                    [accounts.b58[1], 10]
                ];
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.amount = cop8.raw_data.contract[0].parameter.value.amount + '12';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = cop9.raw_data.contract[0].parameter.value.owner_address + '1';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.to_address = cop10.raw_data.contract[0].parameter.value.to_address + '1';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop13.raw_data.contract[0].Permission_id = '1';
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case TransferAssetContract', function () {

            let tokenOptions
            let tokenID

            before(async function () {
                tokenOptions = getTokenOptions();
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[3], 100e6), PRIVATE_KEY);
                let createTx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[3]), accounts.pks[3])
                assert.equal(createTx.transaction.txID.length, 64);

                let tokenList
                await waitChainData('token', accounts.b58[3]);
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[3]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
                console.log("tokenID:"+tokenID)
            });

            it(`it should return true`, async function () {
                const params = [
                    [accounts.b58[1], 5, tokenID, accounts.b58[3], { permissionId: 2 }],
                    [accounts.b58[1], 5, tokenID, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendToken(
                        ...param
                    );
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.amount = cop8.raw_data.contract[0].parameter.value.amount + '12';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = cop9.raw_data.contract[0].parameter.value.owner_address + '1';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.to_address = cop10.raw_data.contract[0].parameter.value.to_address + '1';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.asset_name = cop11.raw_data.contract[0].parameter.value.asset_name + '1';
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop13.raw_data.contract[0].Permission_id = '1';
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case ParticipateAssetIssueContract', function () {

            let tokenOptions
            let tokenID

            before(async function () {
                tokenOptions = getTokenOptions();
                tokenOptions.saleEnd += 60 * 60 * 1000;
                await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[2]), accounts.pks[2])
                await wait(45);
                let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[2])
                console.log("tokenList: "+util.inspect(tokenList,true,null,true))
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
                assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
                params = [
                    [accounts.b58[2], tokenID, 20, accounts.b58[0], { permissionId: 2 }],
                    [accounts.b58[2], tokenID, 20, accounts.b58[0]]
                ];

                await wait(4);
            });

            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.purchaseToken(
                        ...param
                    );
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.amount = cop8.raw_data.contract[0].parameter.value.amount + '12';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = cop9.raw_data.contract[0].parameter.value.owner_address + '1';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.to_address = cop10.raw_data.contract[0].parameter.value.to_address + '1';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.asset_name = cop11.raw_data.contract[0].parameter.value.asset_name + '1';
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop13.raw_data.contract[0].Permission_id = '1';
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case TriggerSmartContract', function () {

            let transaction;
            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: trcTokenTest070.abi,
                    bytecode: trcTokenTest070.bytecode,
                    parameters: [
                        accounts.hex[1], TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit: 9e7,
                }, ADDRESS_HEX);
                await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
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

            it('should trigger smart contract successfully', async function () {
                const contractAddress = transaction.contract_address;
                const issuerAddress = ADDRESS_HEX;
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

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    transaction = await tronWeb.transactionBuilder.triggerSmartContract(
                        contractAddress,
                        functionSelector,
                        options,
                        parameter,
                        issuerAddress,
                    );
                    commonAssertFalsePb(transaction.transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop8.raw_data.contract[0].parameter.value.data = '07fb8ea600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '410c14c0d81393da7f28c17cfb324ec8162a1db145';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop10.raw_data.contract[0].parameter.value.contract_address = '4156e9b76e35d29a710bb11427bbcd4790f18c6297';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop11.raw_data.contract[0].parameter.value.token_id = 89878323;
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop12.raw_data.contract[0].parameter.value.call_token_value = 987654321;
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop13.raw_data.contract[0].parameter.value.call_value = 123456789;
                    const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                    assert.equal(authResult13, false);

                    const cop14 = JSON.parse(JSON.stringify(transaction.transaction))
                    cop14.raw_data.fee_limit = 123890123;
                    const authResult14 = TronWeb.utils.transaction.txCheck(cop14);
                    assert.equal(authResult14, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction.transaction))
                    if (i === 1) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe.skip('#case FreezeBalanceContract', function () {

            it('it should return true', async function () {
                const params1 = [
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [100e6, 3, 'ENERGY', accounts.b58[1]]
                ];
                const params2 = [
                    [100e6, 3, 'ENERGY', accounts.b58[1], accounts.b58[2], { permissionId: 2 }],
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1], accounts.b58[2],]
                ];

                for (let param of params1) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.frozen_duration = '5';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.frozen_balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[2] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[2] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }

                for (let param of params2) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.frozen_duration = '5';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.frozen_balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[2] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[2] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.receiver_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[5]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            })
        });

        describe.skip('#case UnfreezeBalanceContract', function () {
            // this is not fully testable because the minimum time before unfreezing is 3 days
            before(async function(){
                await broadcaster.broadcaster(await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'ENERGY', accounts.b58[1]), accounts.pks[1]);
                await broadcaster.broadcaster(await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1]);
                await broadcaster.broadcaster(await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'ENERGY', accounts.b58[1],accounts.b58[2]), accounts.pks[1]);
                await broadcaster.broadcaster(await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'BANDWIDTH', accounts.b58[1],accounts.b58[2]), accounts.pks[1]);
                await wait(40);
            });

            it('it should return true', async function () {
                const params1 = [
                    ['ENERGY', accounts.b58[1], accounts.b58[2], { permissionId: 2 }],
                    ['BANDWIDTH', accounts.b58[1], accounts.b58[2]]
                ];
                const params2 = [
                    ['BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    ['ENERGY', accounts.b58[1]]
                ];

                for (let param of params1) {
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[0] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[0] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.receiver_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
                for (let param of params2) {
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[0] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[0] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            })
        });

        describe('#case FreezeBalanceV2Contract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e7, 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                    [10e7, 'BANDWIDTH', accounts.b58[1]]
                ];
            });

            it('should return true', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                    commonAssertFalsePb(transaction);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.frozen_balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[1] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[1] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case UnfreezeBalanceV2Contract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e6, 'ENERGY', accounts.b58[1]],
                    [10e6, 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                ];
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'BANDWIDTH',accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'ENERGY',accounts.b58[1]));
                await wait(40);
            });

            it('should return true', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param);
                    commonAssertFalsePb(transaction);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.unfreeze_balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[1] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[1] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case DelegateResourceContract', function () {
            let params = [];

            before(async () => {
                params = [
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1], false, { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], true]
                ];
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'ENERGY', accounts.b58[1]));
                await wait(3);
            });

            it('should return true', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.receiver_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[2] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[2] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    if (param[4] === true) {
                        cop12.raw_data.contract[0].parameter.value.lock = false
                    } else if (param[4] === false) {
                        cop12.raw_data.contract[0].parameter.value.lock = true
                    }
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[5]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case UnDelegateResourceContract', function () {
            let params = [];

            before(async () => {
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'ENERGY', accounts.b58[1]));
                await wait(40);
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.delegateResource(40e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.delegateResource(40e6, accounts.b58[2], 'ENERGY', accounts.b58[1]));
                await wait(40);
                params = [
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1]]
                ];
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.receiver_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.balance = 1234;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (param[2] === 'ENERGY') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'BANDWIDTH'
                    } else if (param[2] === 'BANDWIDTH') {
                        cop11.raw_data.contract[0].parameter.value.resource = 'ENERGY'
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case WithdrawExpireUnfreezeContract', function () {
            let params = [];

            before(async () => {
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'ENERGY', accounts.hex[1]));
                await wait(40);
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', accounts.hex[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.b58[1]));
                await wait(40);
                params.push(...[
                    [accounts.b58[1], { permissionId: 2 }],
                    [accounts.hex[1]]
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param);
                    commonAssertFalsePb(transaction);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[1]) {
                        cop18.raw_data.contract[0].Permission_id = 3;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case WithdrawBalanceContract', function () {
            // this is not fully testable because the minimum time before withdrawBlockRewards is 1 days
            // witnessAccount does not have any reward
            before(async () => {
                /*await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[1]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                console.log("sr:"+accounts.b58[1]);*/
                // await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[2]), accounts.pks[2])
                // await wait(6);
                // await broadcaster.broadcaster(await tronWeb.transactionBuilder.vote({['TEnSEdAhhjGxFaKp1B9Z8apreac4BWuvwA']: 2,}, accounts.b58[2]), accounts.pks[2]);
                // await wait(60);
            });

            it(`it should return true`, async function () {
                const params = [
                    [WITNESS_ACCOUNT, { permissionId: 2 }],
                    [WITNESS_ACCOUNT]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(
                        ...param
                    );
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[1]) {
                        cop18.raw_data.contract[0].Permission_id = 3;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case WitnessCreateContract", async function () {

            let url = 'https://xtron.network';

            it('should allow accounts[1] to apply for SR, it should return true', async function () {

                const params = [
                    [accounts.b58[1], url, { permissionId: 2 }],
                    [accounts.b58[1], url]
                ];

                for (let param of params) {
                    const sendTrxTransaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 11000e6);
                    await broadcaster.broadcaster(sendTrxTransaction, PRIVATE_KEY);
                    const transaction = await tronWeb.transactionBuilder.applyForSR(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '414f32099bbbce9bba471bc6004141ddf0656c68ef';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.url = '68747470733a2f2f7874726f6e2e6e6574776f726b313233';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop18.raw_data.contract[0].Permission_id = 3;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            });

        });

        describe('#case VoteWitnessContract', function () {

            let url = 'https://xtron.network';

            before(async function () {
                // await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[0], 10000e6), PRIVATE_KEY);
                // await broadcaster.broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[0], url), accounts.pks[0])
                await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            })

            it('should allows accounts.b58[1] to vote for accounts[0] as SR, it should return true', async function () {
                const list = [
                    [
                        {
                            [WITNESS_ACCOUNT]: 5,
                        },
                    ],
                    [
                        {
                            [WITNESS_ACCOUNT2]: 5,
                        },
                        2,
                    ]
                ]
                for (const [votes, Permission_id] of list) {
                    const transaction = await tronWeb.transactionBuilder.vote(
                        votes,
                        accounts.b58[1],
                        { permissionId: Permission_id }
                    );
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.votes[0].vote_address = '41dcb7d0d06f19d1cf51151efe2e6eca87c7dff48a';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.votes[0].vote_count = '6';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (Permission_id) {
                        cop18.raw_data.contract[0].Permission_id = 3;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            })
        });

        describe("#case CreateSmartContract", function () {
            it('should create a smart contract with default parameters, it should return true', async function () {
                const options = {
                    abi: trcTokenTest070.abi,
                    bytecode: trcTokenTest070.bytecode,
                    parameters: [
                        accounts.hex[16], TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit: 8e7,
                    name: 'trcTokenTest070'
                };
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(options)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.fee_limit = cop8.raw_data.fee_limit+"1";
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.visible = true;
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, true);

                    // contract_address not verify
                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.contract_address = '4133faf8cb13901e2fc834f01eaab0dc921a2d1c8d';
                    // console.log("cop10:"+util.inspect(cop10,true,null,true))
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, true);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.owner_address = '4156e9b76e35d29a710bb11427bbcd4790f18c6297';
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.new_contract.bytecode = cop12.raw_data.contract[0].parameter.value.new_contract.bytecode+'12';
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    cop13.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent = '99';
                    const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                    assert.equal(authResult13, false);

                    const cop14 = JSON.parse(JSON.stringify(transaction))
                    cop14.raw_data.contract[0].parameter.value.new_contract.origin_address = '4156e9b76e35d29a710bb11427bbcd4790f18c6297';
                    const authResult14 = TronWeb.utils.transaction.txCheck(cop14);
                    assert.equal(authResult14, false);

                    const cop15 = JSON.parse(JSON.stringify(transaction))
                    cop15.raw_data.contract[0].parameter.value.new_contract.abi.entrys = testConstant.abi;
                    const authResult15 = TronWeb.utils.transaction.txCheck(cop15);
                    assert.equal(authResult15, false);

                    const cop16 = JSON.parse(JSON.stringify(transaction))
                    cop16.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit = cop16.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit+"2";
                    const authResult16 = TronWeb.utils.transaction.txCheck(cop16);
                    assert.equal(authResult16, false);

                    const cop17 = JSON.parse(JSON.stringify(transaction))
                    cop17.raw_data.contract[0].parameter.value.token_id = 2974972934797;
                    const authResult17 = TronWeb.utils.transaction.txCheck(cop17);
                    assert.equal(authResult17, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    cop18.raw_data.contract[0].parameter.value.call_token_value = 123456789;
                    const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                    assert.equal(authResult18, false);

                    const cop19 = JSON.parse(JSON.stringify(transaction))
                    cop19.raw_data.contract[0].parameter.value.new_contract.call_value = 987654321;
                    console.log("cop19:"+util.inspect(cop19,true,null,true))
                    const authResult19 = TronWeb.utils.transaction.txCheck(cop19);
                    assert.equal(authResult19, false);

                    const cop20 = JSON.parse(JSON.stringify(transaction))
                    cop20.raw_data.contract[0].parameter.value.new_contract.name = cop20.raw_data.contract[0].parameter.value.new_contract.name+'31';
                    const authResult20 = TronWeb.utils.transaction.txCheck(cop20);
                    assert.equal(authResult20, false);

                    const cop21 = JSON.parse(JSON.stringify(transaction))
                    if (i === 1) {
                        cop21.raw_data.contract[0].Permission_id = 3;
                        const authResult21 = TronWeb.utils.transaction.txCheck(cop21);
                        assert.equal(authResult21, false);
                    }
                }
            });
        });

        describe("#case ClearABIContract", function () {

            let transaction;
            let contract;
            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
            })

            it('should clear contract abi, it should return true', async function () {
                this.timeout(10000);

                const contractAddress = transaction.contract_address;
                const ownerAddress = accounts.hex[3];

                const params = [
                    // [contractAddress, ownerAddress, { permissionId: 2 }], // Not supported temporarily
                    [contractAddress, ownerAddress]
                ];

                for (let param of params) {
                    // verify contract abi before
                    contract = await tronWeb.trx.getContract(contractAddress);
                    assert.isTrue(Object.keys(contract.abi).length > 0)

                    // clear abi
                    transaction = await tronWeb.transactionBuilder.clearABI(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.contract_address = '41dcb7d0d06f19d1cf51151efe2e6eca87c7dff48a';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);
                }
            });
        });

        describe("#case UpdateBrokerageContract", async function () {

            it('should auth sr brokerage successful', async function () {
                let params = [
                    // [10, accounts.hex[1], { permissionId: 2 }], // No suppored for multiSign
                    [10, WITNESS_ACCOUNT]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.brokerage = '11';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);
                }
            });
        });

        describe("#case AssetIssueContract", function () {
            it(`should allow accounts[4] to create a TestToken`, async function () {

                const options = getTokenOptions();
                const createrAccountIdx = 4;
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[createrAccountIdx]);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.trx_num = '11';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.frozen_supply[0].frozen_amount = '6';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.frozen_supply[0].frozen_days = '2';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.total_supply = cop11.raw_data.contract[0].parameter.value.total_supply+"1";
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.num = '3';
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    cop13.raw_data.contract[0].parameter.value.end_time = '1670133202167';
                    const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                    assert.equal(authResult13, false);

                    const cop14 = JSON.parse(JSON.stringify(transaction))
                    cop14.raw_data.contract[0].parameter.value.description = '5573656c657373207574696c69747920746f6b656e31';
                    const authResult14 = TronWeb.utils.transaction.txCheck(cop14);
                    assert.equal(authResult14, false);

                    const cop15 = JSON.parse(JSON.stringify(transaction))
                    cop15.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult15 = TronWeb.utils.transaction.txCheck(cop15);
                    assert.equal(authResult15, false);

                    const cop16 = JSON.parse(JSON.stringify(transaction))
                    cop16.raw_data.contract[0].parameter.value.url = '68747470733a2f2f6578616d706c652d7574746f6a63707335707131322e636f6d2f';
                    const authResult16 = TronWeb.utils.transaction.txCheck(cop16);
                    assert.equal(authResult16, false);

                    const cop17 = JSON.parse(JSON.stringify(transaction))
                    cop17.raw_data.contract[0].parameter.value.free_asset_net_limit = '102';
                    const authResult17 = TronWeb.utils.transaction.txCheck(cop17);
                    assert.equal(authResult17, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    cop18.raw_data.contract[0].parameter.value.start_time = '1670133143167';
                    const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                    assert.equal(authResult18, false);

                    const cop19 = JSON.parse(JSON.stringify(transaction))
                    cop19.raw_data.contract[0].parameter.value.public_free_asset_net_limit = '1002';
                    const authResult19 = TronWeb.utils.transaction.txCheck(cop19);
                    assert.equal(authResult19, false);

                    const cop20 = JSON.parse(JSON.stringify(transaction))
                    cop20.raw_data.contract[0].parameter.value.name = '546f6b656e7574746f6a63707335707131';
                    const authResult20 = TronWeb.utils.transaction.txCheck(cop20);
                    assert.equal(authResult20, false);

                    const cop21 = JSON.parse(JSON.stringify(transaction))
                    cop21.raw_data.contract[0].parameter.value.abbr = '54544f4a43505335505131';
                    const authResult21 = TronWeb.utils.transaction.txCheck(cop21);
                    assert.equal(authResult21, false);

                    if (i === 1) {
                        const cop22 = JSON.parse(JSON.stringify(transaction))
                        cop22.raw_data.contract[0].Permission_id = 4;
                        const authResult22 = TronWeb.utils.transaction.txCheck(cop22);
                        assert.equal(authResult22, false);
                    }
                }
            });
        });

        describe("#case UpdateAssetContract", function () {
            let tokenOptions
            let tokenID

            before(async function () {
                tokenOptions = getTokenOptions();
                await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[4]), accounts.pks[4])

                let tokenList
                while (!tokenList) {
                    tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[4])
                }
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
            });

            it(`should allow accounts[3] to update a TestToken`, async function () {
                for (let i = 0; i < 2; i++) {
                    const options = JSON.parse(JSON.stringify(UPDATED_TEST_TOKEN_OPTIONS))
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.updateToken(options, accounts.b58[4]);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.new_public_limit = '99';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.description = '56657279207573656c657373207574696c69747920746f6b656e31';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.url = cop11.raw_data.contract[0].parameter.value.url+"31";
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.new_limit = '9';
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    if (i === 1) {
                        const cop13 = JSON.parse(JSON.stringify(transaction))
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case AccountCreateContract", function () {
            it(`should create accounts[3]`, async function () {
                const newAccount = await TronWeb.createAccount();
                const params = [
                    [newAccount.address.base58, accounts.b58[3], { permissionId: 2 }],
                    [newAccount.address.base58, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.createAccount(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '418a01d9d35e53daefc2bd080e9db13976305d8a28';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.account_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop10.raw_data.contract[0].Permission_id = 3;
                        const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                        assert.equal(authResult10, false);
                    }
                }
            });
        });

        describe("#case AccountUpdateContract", function () {
            it(`should update accounts[3]`, async function () {
                const newName = 'New name'
                const params = [
                    [newName, accounts.b58[3], { permissionId: 2 }],
                    [newName, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.account_name = cop8.raw_data.contract[0].parameter.value.account_name+"31";
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop10.raw_data.contract[0].Permission_id = 4;
                        const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                        assert.equal(authResult10, false);
                    }
                }
            });
        });

        describe("#case SetAccountIdContract", function () {
            it(`should set account id accounts[3]`, async function () {

                for (let i = 0; i < 2; i++) {
                    let accountId = TronWeb.toHex('abcabc110');
                    let param = [accountId, accounts.b58[3]]
                    // TODO
                    /*if (i === 1) {
                        accountId = TronWeb.toHex('testtest11323');
                        param = [accountId, accounts.b58[3], { permissionId: 2 }]
                    }*/
                    const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.account_id = cop8.raw_data.contract[0].parameter.value.account_id+"31";
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);
/*
                    if (i === 1) {
                        const cop10 = JSON.parse(JSON.stringify(transaction))
                        cop10.raw_data.contract[0].Permission_id = 0;
                        const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                        assert.equal(authResult10, false);
                    }*/
                }
            });
        });

        describe("#case ProposalCreateContract", function () {

            it('should allow the SR account to create a new proposal as a single object', async function () {
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
                const inputs = [
                    [parameters[0], WITNESS_ACCOUNT, { permissionId: 2 }],
                    [parameters[1], WITNESS_ACCOUNT]
                ];
                for (let input of inputs) {
                    const transaction = await tronWeb.transactionBuilder.createProposal(...input)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.parameters[0].value = '3';
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.parameters[0].key = '6';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    if (input[2]) {
                        cop11.raw_data.contract[0].Permission_id = 1;
                        const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                        assert.equal(authResult11, false);
                    }
                }
            })
        });

        describe("#case ProposalDeleteContract", function () {
            let proposals;

            before(async function () {
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
                await wait(45);
                proposals = await tronWeb.trx.listProposals();
            })

            it('should allow the SR to delete its own proposal', async function () {
                const params = [
                    [proposals[0].proposal_id, WITNESS_ACCOUNT, { permissionId: 2 }],
                    [proposals[0].proposal_id, WITNESS_ACCOUNT]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.proposal_id = cop9.raw_data.contract[0].parameter.value.proposal_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    if (param[2]) {
                        cop10.raw_data.contract[0].Permission_id = 1;
                        const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                        assert.equal(authResult10, false);
                    }
                }
            });
        });

        describe("#case ProposalApproveContract", function () {
            let proposals;

            before(async function () {
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

                await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
                await wait(45);
                proposals = await tronWeb.trx.listProposals();
            })

            it('should allow vote proposal with approve true', async function () {
                const params = [
                    [proposals[0].proposal_id, true, WITNESS_ACCOUNT2, { permissionId: 2 }],
                    [proposals[0].proposal_id, true, WITNESS_ACCOUNT2]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.proposal_id = cop9.raw_data.contract[0].parameter.value.proposal_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.is_add_approval = false;
                    console.log("cop10:"+util.inspect(cop10,true,null,true))
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            })

            it('should allow vote proposal with approve false', async function () {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.voteProposal(proposals[0].proposal_id, true, WITNESS_ACCOUNT2), WITNESS_KEY2)
                await wait(6);
                const params = [
                    [proposals[0].proposal_id, false, WITNESS_ACCOUNT2, { permissionId: 2 }],
                    [proposals[0].proposal_id, false, WITNESS_ACCOUNT2]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.proposal_id = cop9.raw_data.contract[0].parameter.value.proposal_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.is_add_approval = true;
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop18 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop18.raw_data.contract[0].Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheck(cop18);
                        assert.equal(authResult18, false);
                    }
                }
            })
        });

        describe("#case ExchangeCreateContract", function () {
            const idxS = 5;
            const idxE = 7;
            const toIdx1 = 2;
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }

            });

            it('should create token exchange', async function () {
                const params = [
                    [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]],
                    [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], { permissionId: 2 }]
                ];
                for (let param of params) {
                    let transaction = await tronWeb.transactionBuilder.createTokenExchange(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.first_token_balance = 10001;
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.first_token_id = cop10.raw_data.contract[0].parameter.value.first_token_id+"31";
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.second_token_id = cop11.raw_data.contract[0].parameter.value.second_token_id+"31";
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.second_token_balance = 10002;
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[5]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case TRXExchangeCreateContract", function () {
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[7]);
                await broadcaster.broadcaster(null, accounts.pks[7], transaction);
                await waitChainData('token', accounts.hex[7]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[7]);
                await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                await broadcaster.broadcaster(null, accounts.pks[7], await tronWeb.transactionBuilder.sendToken(
                    accounts.hex[toIdx2],
                    10e4,
                    token[Object.keys(token)[0]]['id'],
                    token[Object.keys(token)[0]]['owner_address']
                ));
                await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                tokenNames.push(token[Object.keys(token)[0]]['id']);

            });

            it('should create token exchange', async function () {
                const params = [
                    [tokenNames[0], 10e3, 10e3, accounts.hex[toIdx2]],
                    [tokenNames[0], 10e3, 10e3, accounts.hex[toIdx2], { permissionId: 2 }]
                ];
                for (let param of params) {
                    let transaction = await tronWeb.transactionBuilder.createTRXExchange(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.first_token_balance = 10001;
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.first_token_id = cop10.raw_data.contract[0].parameter.value.first_token_id+"31";
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.second_token_id = cop11.raw_data.contract[0].parameter.value.second_token_id+"31";
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.second_token_balance = 10002;
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case ExchangeInjectContract", function () {
            const idxS = 8;
            const idxE = 10;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await wait(45);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                await wait(6);
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.exchange_id = cop9.raw_data.contract[0].parameter.value.exchange_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.token_id = cop10.raw_data.contract[0].parameter.value.token_id+"31";
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.quant = 8;
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case ExchangeWithdrawContract", function () {
            const idxS = 0;
            const idxE = 2;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;

                transaction.raw_data_hex = transaction.raw_data_hex + '00';
                const authResult2 =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult2, false);

            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.exchange_id = cop9.raw_data.contract[0].parameter.value.exchange_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.token_id = cop10.raw_data.contract[0].parameter.value.token_id+"31";
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.quant = 8;
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case ExchangeTransactionContract", function () {
            const idxS = 10;
            const idxE = 12;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                await wait(6);
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });
            it(`it should return true`, async function () {
                const params = [
                    [exchangeId, tokenNames[0], 10, 5, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10, 5]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.exchange_id = cop9.raw_data.contract[0].parameter.value.exchange_id+"1";
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.token_id = cop10.raw_data.contract[0].parameter.value.token_id+"31";
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.quant = 8;
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);

                    const cop12 = JSON.parse(JSON.stringify(transaction))
                    cop12.raw_data.contract[0].parameter.value.expected = 7;
                    const authResult12 = TronWeb.utils.transaction.txCheck(cop12);
                    assert.equal(authResult12, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[4]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case UpdateSettingContract", function () {
            let transaction;
            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
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
            it(`it should return true`, async function () {
                const params = [
                    [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 20, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateSetting(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.consume_user_resource_percent = 19;
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.contract_address = '4163782857ab7122835d70a432af114121112d4eec';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop13.raw_data.contract[0].Permission_id = 3;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case UpdateEnergyLimitContract", function () {
            let transaction;
            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
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
            it(`it should return true`, async function () {
                const params = [
                    [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 10e6, accounts.b58[3]]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(...param);
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.origin_energy_limit = 10000009;
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.contract_address = '4163782857ab7122835d70a432af114121112d4eec';
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop13 = JSON.parse(JSON.stringify(transaction))
                    if (param[3]) {
                        cop13.raw_data.contract[0].Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheck(cop13);
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe("#case AccountPermissionUpdateContract", function () {
            before(async () => {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[6], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[6], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[6]);
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
            it(`it should return true`, async function () {
                const permissionData = {
                    "owner": {
                      "type": 0,
                      "keys": [
                        {
                          "address": accounts.hex[6],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "permission_name": "owner"
                    },
                    "witness": {
                      "keys": [
                        {
                          "address": accounts.hex[6],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "id": 1,
                      "type": 1,
                      "permission_name": "witness"
                    },
                    "owner_address": accounts.hex[6],
                    "actives": [
                      {
                        "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                        "keys": [
                          {
                            "address": accounts.hex[6],
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
                const params = [
                    [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives] // No suppored for multiSign
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                        ...param
                    );
                    commonAssertFalsePb(transaction);

                    const cop8 = JSON.parse(JSON.stringify(transaction))
                    cop8.raw_data.contract[0].parameter.value.owner_address = '41ecaf9d37c4cbbf65f588ba04f77c08bde46fa2ed';
                    const authResult8 = TronWeb.utils.transaction.txCheck(cop8);
                    assert.equal(authResult8, false);

                    const cop9 = JSON.parse(JSON.stringify(transaction))
                    cop9.raw_data.contract[0].parameter.value.owner = {
                        "type": 0,
                        "keys": [
                            {
                                "address": accounts.hex[0],
                                "weight": 2
                            }
                        ],
                        "threshold": 2,
                        "permission_name": "owner"
                    };
                    const authResult9 = TronWeb.utils.transaction.txCheck(cop9);
                    assert.equal(authResult9, false);

                    const cop10 = JSON.parse(JSON.stringify(transaction))
                    cop10.raw_data.contract[0].parameter.value.witness = {
                        "keys": [
                            {
                                "address": accounts.hex[2],
                                "weight": 3
                            }
                        ],
                        "threshold": 2,
                        "id": 5,
                        "type": 0,
                        "permission_name": "owner"
                    };
                    const authResult10 = TronWeb.utils.transaction.txCheck(cop10);
                    assert.equal(authResult10, false);

                    const cop11 = JSON.parse(JSON.stringify(transaction))
                    cop11.raw_data.contract[0].parameter.value.actives = [
                        {
                            "operations": "7fff1fc0034e0000000000000000000000000000000000000000000000000000",
                            "keys": [
                                {
                                    "address": accounts.hex[5],
                                    "weight": 5
                                }
                            ],
                            "threshold": 2,
                            "id": 1,
                            "type": 3,
                            "permission_name": "witness"
                        }
                    ];
                    const authResult11 = TronWeb.utils.transaction.txCheck(cop11);
                    assert.equal(authResult11, false);
                }
            });
        });
    });

    describe('#txCheckWithArgs', function () {

        const commonAssertFalsePbWithArgs = (transaction, data, param) => {
            console.log("transaction:"+util.inspect(transaction,true,null,true))
            const authResult = TronWeb.utils.transaction.txCheckWithArgs(transaction, data, param[3] || {});
            assert.equal(authResult, true);
            commonAssertPbWithArgs(transaction, data, param[3] || {});

            const cop2 = JSON.parse(JSON.stringify(transaction))
            cop2.raw_data_hex = cop2.raw_data_hex + '00';
            const authResult2 = TronWeb.utils.transaction.txCheckWithArgs(cop2, data, param[3] || {});
            assert.equal(authResult2, false);

            const cop3 = JSON.parse(JSON.stringify(transaction))
            cop3.txID = cop3.txID + '00'
            const authResult3 = TronWeb.utils.transaction.txCheckWithArgs(cop3, data, param[3] || {});
            assert.equal(authResult3, false);

            const cop4 = JSON.parse(JSON.stringify(transaction))
            cop4.raw_data.ref_block_bytes = cop4.raw_data.ref_block_bytes + '00';
            const authResult4 = TronWeb.utils.transaction.txCheckWithArgs(cop4, data, param[3] || {});
            assert.equal(authResult4, false);

            const cop5 = JSON.parse(JSON.stringify(transaction))
            cop5.raw_data.ref_block_hash = cop5.raw_data.ref_block_hash + '12';
            const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(cop5, data, param[3] || {});
            assert.equal(authResult5, false);

            const cop6 = JSON.parse(JSON.stringify(transaction))
            cop6.raw_data.expiration = cop6.raw_data.expiration + '12';
            const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(cop6, data, param[3] || {});
            assert.equal(authResult6, false);

            const cop7 = JSON.parse(JSON.stringify(transaction))
            cop7.raw_data.timestamp = cop7.raw_data.timestamp + '12';
            const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(cop7, data, param[3] || {});
            assert.equal(authResult7, false);

            const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, data, {data:'31'});
            assert.equal(authResult8, false);

            const cop13 = JSON.parse(JSON.stringify(transaction))
            if (cop13.raw_data.contract[0].Permission_id) {
                cop13.raw_data.contract[0].Permission_id = 1;
                // Verify that txCheckWithArgs takes param from data for verification
                let authResult13 = TronWeb.utils.transaction.txCheckWithArgs(cop13, data, param[3] || {});
                assert.equal(authResult13, true);
                const dataCop13 = JSON.parse(JSON.stringify(data))
                dataCop13.Permission_id = 1;
                authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, param[3] || {});
                assert.equal(authResult13, false);
            }
        };

        const commonAssertPbWithArgs = (transaction, args, options) => {
            const transactionPb = TronWeb.utils.transaction.txJsonToPbWithArgs(transaction, args, options);
            const rawDataBytes = transactionPb.getRawData().serializeBinary();
            const txID = TronWeb.utils.ethersUtils.sha256(rawDataBytes);
            const txPbToTxID = TronWeb.utils.transaction.txPbToTxID(transactionPb);
            assert.equal(txID.replace(/^0x/, ''), transaction.txID);
            assert.equal(txPbToTxID.replace(/^0x/, ''), transaction.txID);
        };

        describe('#case TransferContract', function () {
            let params = [];
            const generateData = (param) => {
                return {
                    to_address: TronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.defaultAddress.hex,
                    amount: param[1],
                    Permission_id: param[2]?.permissionId,
                  };
            }
            before(() => {
                params = [
                    [accounts.b58[1], 10, { permissionId: 2 }],
                    [accounts.b58[1], 10]
                ];
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.amount = 15;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.to_address = '415624c12e308b03a1a6b21d9b86e3942fac1ab92b';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[3] || {});
                    assert.equal(authResult10, false);

                    if (param[2]) {
                        const dataCop13 = JSON.parse(JSON.stringify(data))
                        dataCop13.Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, param[3] || {});
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case TransferAssetContract', function () {

            let tokenOptions
            let tokenID
            let params = [];

            const generateData = (param) => {
                return {
                    to_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[3]),
                    asset_name: tronWeb.fromUtf8(param[2]),
                    amount: parseInt(param[1]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {

                tokenOptions = getTokenOptions();

                await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[13]), accounts.pks[13])

                let tokenList
                await waitChainData('token', accounts.b58[13]);
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[13]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }

                params = [
                    [accounts.b58[1], 5, tokenID, accounts.b58[13], { permissionId: 2 }],
                    [accounts.b58[1], 5, tokenID, accounts.b58[13]]
                ];
            });

            it(`it should return true`, async function () {

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendToken(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.amount = 15;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.to_address = '415624c12e308b03a1a6b21d9b86e3942fac1ab92b';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[3] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.asset_name = dataCop11.asset_name+"31";
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    if (param[4]) {
                        const dataCop13 = JSON.parse(JSON.stringify(data))
                        dataCop13.Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, param[5] || {});
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case ParticipateAssetIssueContract', function () {

            let tokenOptions
            let tokenID
            let params = [];

            const generateData = (param) => {
                return {
                    to_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[3]),
                    asset_name: tronWeb.fromUtf8(param[1]),
                    amount: parseInt(param[2]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {
                tokenOptions = getTokenOptions();
                tokenOptions.saleEnd += 60 * 60 * 1000;
                let createTx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[12]), accounts.pks[12])
                assert.equal(createTx.transaction.txID.length, 64);
                await waitChainData('token', accounts.b58[12]);
                let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[12]);
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
                console.log("tokenID:"+tokenID)
                assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
                params = [
                    [accounts.b58[12], tokenID, 20, accounts.b58[0], { permissionId: 2 }],
                    [accounts.b58[12], tokenID, 20, accounts.b58[0]]
                ];
                await wait(4);
            });

            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.purchaseToken(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.amount = 15;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.to_address = '415624c12e308b03a1a6b21d9b86e3942fac1ab92b';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[3] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.asset_name = dataCop11.asset_name+"31";
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    if (param[4]) {
                        const dataCop13 = JSON.parse(JSON.stringify(data))
                        dataCop13.Permission_id = 1;
                        const authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, param[3] || {});
                        assert.equal(authResult13, false);
                    }
                }
            });
        });

        describe('#case TriggerSmartContract', function () {
            let transaction;
            let params = [];

            const generateData = (param) => {
                const args = {
                    contract_address: tronWeb.address.toHex(param[0]),
                    owner_address: param[4],
                };

                let parameters = param[3];
                const abiCoder = new AbiCoder();
                let types = [];
                const values = [];
                for (let i = 0; i < parameters.length; i++) {
                    let {type, value} = parameters[i];
                    if (type === 'address')
                        value = tronWeb.address.toHex(value).replace(/^(41)/, '0x');
                    else if (type.match(/^([^\x5b]*)(\x5b|$)/)[0] === 'address[')
                        value = value.map(v => tronWeb.address.toHex(v).replace(/^(41)/, '0x'));
                    types.push(type);
                    values.push(value);
                }
                types = types.map(type => {
                    if (/trcToken/.test(type)) {
                        type = type.replace(/trcToken/, 'uint256')
                    }
                    return type
                })
                parameters = abiCoder.encode(types, values).replace(/^0x/, '');
                args.function_selector = param[1].replace('/\s+/g', '');
                args.parameter = parameters;
                args.Permission_id = param[2].permissionId;
                args.call_value = param[2].callValue;
                args.token_id = param[2].tokenId;
                args.call_token_value = param[2].tokenValue;
                args.fee_limit = param[2].feeLimit;
                return args;
            };

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: trcTokenTest070.abi,
                    bytecode: trcTokenTest070.bytecode,
                    parameters: [
                        accounts.hex[1], TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit: 9e7,
                }, ADDRESS_HEX);
                await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                await waitChainData('tx', transaction.txID);

                params = [
                    [
                        transaction.contract_address,
                        'TransferTokenTo(address,trcToken,uint256)',
                        {
                            callValue:321,
                            tokenId:TOKEN_ID,
                            tokenValue:1e3,
                            feeLimit:FEE_LIMIT
                        },
                        [
                            {type: 'address', value: accounts.hex[17]},
                            {type: 'trcToken', value: TOKEN_ID},
                            {type: 'uint256', value: 123}
                        ],
                        ADDRESS_HEX,
                    ],
                    [
                        transaction.contract_address,
                        'TransferTokenTo(address,trcToken,uint256)',
                        {
                            callValue:321,
                            tokenId:TOKEN_ID,
                            tokenValue:1e3,
                            feeLimit:FEE_LIMIT,
                            permissionId: 2
                        },
                        [
                            {type: 'address', value: accounts.hex[17]},
                            {type: 'trcToken', value: TOKEN_ID},
                            {type: 'uint256', value: 123}
                        ],
                        ADDRESS_HEX,
                    ]
                ];
            })

            it('should trigger smart contract successfully', async function () {
                for (const param of params) {
                    transaction = await tronWeb.transactionBuilder.triggerSmartContract(...param);
                    const data = generateData(param);
                    console.log("data:"+util.inspect(data,true,null,true))
                    commonAssertFalsePbWithArgs(transaction.transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.contract_address = '419f7e587aec7061359f5304b898bab53f0374fcbe';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.function_selector = 'testPure(uint256,address)';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop10, param[3] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.parameter = '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003';
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    dataCop12.call_value = 1;
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop12, param[3] || {});
                    assert.equal(authResult12, false);

                    // args.fee_limit
                    const dataCop13 = JSON.parse(JSON.stringify(data))
                    dataCop13.fee_limit = 160000000;
                    let authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop13, param[3] || {});
                    assert.equal(authResult13, false);
                    // options.fee_limit
                    authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, data, {fee_limit:160000001});
                    assert.equal(authResult13, false);

                    const dataCop14 = JSON.parse(JSON.stringify(data))
                    dataCop14.call_token_value = 987654321;
                    const authResult14 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop14, param[3] || {});
                    assert.equal(authResult14, false);

                    const dataCop15 = JSON.parse(JSON.stringify(data))
                    dataCop15.token_id = 12345678;
                    const authResult15 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop15, param[3] || {});
                    assert.equal(authResult15, false);

                    if (param[2].permissionId) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction.transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe.skip('#case FreezeBalanceContract', function () {
            let params = [];
            let params2 = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[3]),
                    frozen_balance: parseInt(param[0]),
                    frozen_duration: parseInt(param[1]),
                    resource: param[2],
                    Permission_id: param[4]?.permissionId,
                };
            };
            const generateData2 = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[3]),
                    frozen_balance: parseInt(param[0]),
                    frozen_duration: parseInt(param[1]),
                    resource: param[2],
                    receiver_address: tronWeb.address.toHex(param[4]),
                    Permission_id: param[5]?.permissionId,
                };
            };

            before(() => {
                params = [
                    [100e6, 3, 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1]]
                ];
                params2 = [
                    [100e6, 3, 'ENERGY', accounts.b58[1], accounts.b58[2], { permissionId: 2 }],
                    [100e6, 3, 'BANDWIDTH', accounts.b58[1], accounts.b58[2]],
                ];
            })

            it('it should return true1', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[4] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.frozen_balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[4] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.frozen_duration = parseInt(4);
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[4] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[4] || {});
                    assert.equal(authResult11, false);

                    if (param[4]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });

            it('it should return true2', async function () {
                for (let param of params2) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                    const data = generateData2(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[5] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.frozen_balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[5] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.frozen_duration = parseInt(4);
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[5] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[5] || {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    if (dataCop12.receiver_address) {
                        dataCop12.receiver_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    }
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop12, param[5] || {});
                    assert.equal(authResult12, false);

                    if (param[5]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe.skip('#case UnfreezeBalanceContract', function () {

            async function freezeBalance() {
                const transaction1 = await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster.broadcaster(transaction1, accounts.pks[1]);
                await waitChainData('tx', transaction1.txID);

                const transaction2 = await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'ENERGY', accounts.b58[2]);
                await broadcaster.broadcaster(transaction2, accounts.pks[2]);
                await waitChainData('tx', transaction2.txID);

                const transaction3 = await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'BANDWIDTH', accounts.b58[1], accounts.b58[2]);
                await broadcaster.broadcaster(transaction3, accounts.pks[1]);
                await waitChainData('tx', transaction3.txID);

                const transaction4 = await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'ENERGY', accounts.b58[2], accounts.b58[3]);
                await broadcaster.broadcaster(transaction4, accounts.pks[2]);
                await waitChainData('tx', transaction4.txID);
            };

            it('it should return true1', async function () {
                const params = [
                    ['BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    ['ENERGY', accounts.b58[2]]
                ];

                for (let param of params) {
                    await freezeBalance();
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    const data = {
                        owner_address: tronWeb.address.toHex(param[1]),
                        resource: param[0],
                        Permission_id: param[2]?.permissionId,
                    }
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[2] || {});
                    assert.equal(authResult8, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[2] || {});
                    assert.equal(authResult11, false);

                    if (param[2]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            })

            it('it should return true2', async function () {
                const params = [
                    ['BANDWIDTH', accounts.b58[1], accounts.b58[2], { permissionId: 2 }],
                    ['ENERGY', accounts.b58[2], accounts.b58[3]]
                ];

                for (let param of params) {
                    await freezeBalance();
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                    const data = {
                        owner_address: tronWeb.address.toHex(param[1]),
                        resource: param[0],
                        receiver_address: param[2],
                        Permission_id: param[3]?.permissionId,
                    }
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    if (dataCop12.receiver_address) {
                        dataCop12.receiver_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    }
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop12, param[3] || {});
                    assert.equal(authResult12, false);

                    if (param[3]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            })
        });

        describe('#case FreezeBalanceV2Contract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    frozen_balance: parseInt(param[0]),
                    resource: param[1],
                    owner_address: tronWeb.address.toHex(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e6, 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                    [10e6, 'BANDWIDTH', accounts.b58[1]]
                ]);
            });

            it('should return true', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.frozen_balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    if (param[3]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case UnfreezeBalanceV2Contract', function () {
            const params = [];
            before(async () => {
                const transaction1 = await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'BANDWIDTH', accounts.b58[1]);
                await broadcaster.broadcaster(transaction1, accounts.pks[1]);
                await waitChainData('tx', transaction1.txID);

                const transaction2 = await tronWeb.transactionBuilder.freezeBalanceV2(20e6, 'ENERGY', accounts.b58[2]);
                await broadcaster.broadcaster(transaction2, accounts.pks[2]);
                await waitChainData('tx', transaction2.txID);
            });

            it('should return true', async function () {
                params.push(...[
                    [10e6, 'BANDWIDTH', accounts.b58[1]],
                    [10e6, 'ENERGY', accounts.b58[2], { permissionId: 2 }],
                ]);

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(...param)
                    const data = {
                        owner_address: tronWeb.address.toHex(param[2]),
                        unfreeze_balance: param[0],
                        resource: param[1],
                        Permission_id: param[3]?.permissionId,
                    }
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.unfreeze_balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[3] || {});
                    assert.equal(authResult11, false);

                    if (param[3]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case DelegateResourceContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    balance: parseInt(param[0]),
                    resource: param[2],
                    owner_address: tronWeb.address.toHex(param[3]),
                    receiver_address: tronWeb.address.toHex(param[1]),
                    lock: param[4],
                    Permission_id: param[5]?.permissionId,
                };
            };

            before(async () => {
                params.push(...[
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], false, { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1], false],
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1], true, { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], true]
                ]);
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'ENERGY', accounts.b58[1]));
                await wait(40);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.delegateResource(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[5] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[5] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.receiver_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[5] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[5] || {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    if (dataCop12.lock === true) {
                        dataCop12.lock = false;
                    } else {
                        dataCop12.lock = true;
                    }
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop12, param[5] || {});
                    assert.equal(authResult12, false);

                    if (param[5]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case UnDelegateResourceContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    balance: parseInt(param[0]),
                    resource: param[2],
                    owner_address: tronWeb.address.toHex(param[3]),
                    receiver_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async () => {
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(50e6, 'ENERGY', accounts.b58[1]));
                await wait(40);
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.delegateResource(40e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.delegateResource(40e6, accounts.b58[2], 'ENERGY', accounts.b58[1]));
                await wait(40);
                params.push(...[
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1]],
                    [10e6, accounts.b58[2], 'BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                    [10e6, accounts.b58[2], 'ENERGY', accounts.b58[1]]
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.undelegateResource(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[4] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.balance = parseInt(123e6);
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[4] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.receiver_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[4] || {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    if (dataCop11.resource === 'ENERGY') {
                        dataCop11.resource = 'BANDWIDTH';
                    } else {
                        dataCop11.resource = 'ENERGY';
                    }
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, param[4] || {});
                    assert.equal(authResult11, false);

                    if (param[4]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case WithdrawExpireUnfreezeContract', function () {
            const params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[0]),
                    Permission_id: param[1]?.permissionId,
                };
            };

            before(async () => {
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH', accounts.b58[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'ENERGY', accounts.hex[1]));
                await wait(40);
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'BANDWIDTH', accounts.hex[1]));
                await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.b58[1]));
                await wait(40);
                params.push(...[
                    [accounts.b58[1], { permissionId: 2 }],
                    [accounts.b58[1]]
                ]);
            });

            it('should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[1] || {});
                    assert.equal(authResult8, false);

                    if (param[1]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case WithdrawBalanceContract', function () {

            /*before(async () => {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[11], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[11], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[1]);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                console.log("sr:"+accounts.b58[11]);
                await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[2]), accounts.pks[2])
                await wait(6);
                await broadcaster.broadcaster(await tronWeb.transactionBuilder.vote({[accounts.b58[11]]: 50,}, accounts.b58[2]), accounts.pks[2]);
                await wait(60);
            });*/

            it(`it should return true`, async function () {
                const params = [
                    [WITNESS_ACCOUNT, { permissionId: 2 }],
                    [WITNESS_ACCOUNT]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(...param);
                    const data = {
                        owner_address: tronWeb.address.toHex(param[0]),
                        Permission_id: param[1]?.permissionId,
                    };
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    if (param[1]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe("#case WitnessCreateContract", async function () {

            let url = 'https://xtron.network';
            let params = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[0]),
                    url: tronWeb.fromUtf8(param[1]),
                    Permission_id: param[2]?.permissionId,
                };
            };

            before(() => {
                params = [
                    [accounts.b58[13], url, { permissionId: 2 }],
                    [accounts.b58[13], url],
                ];
            });

            it('should allow accounts[1] to apply for SR, it should return true', async function () {
                for (const param of params) {
                    const sendTrxTransaction = tronWeb.transactionBuilder.sendTrx(param[0], 11000e6);
                    await broadcaster.broadcaster(sendTrxTransaction, PRIVATE_KEY);
                    const transaction = await tronWeb.transactionBuilder.applyForSR(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.url = tronWeb.fromUtf8('https://xtron.network123');
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    if (param[2]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe('#case VoteWitnessContract', function () {

            let url = 'https://xtron.network';
            let params = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(accounts.b58[1]),
                    votes: Object.entries(param[0]).map(([address, voteCount]) => {
                        return {
                            vote_address: TronWeb.address.toHex(address),
                            vote_count: parseInt(voteCount),
                        };
                    }),
                    Permission_id: param[2]?.permissionId,
                };
            };

            before(async function () {
                params = [
                    [
                        {
                            [accounts.hex[12]]: 5,
                        },
                        accounts.b58[1],
                    ],
                    [
                        {
                            [accounts.hex[12]]: 5,
                        },
                        accounts.b58[1],
                        2,
                    ]
                ];
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[12], 10000e6), PRIVATE_KEY);
                await broadcaster.broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[12], url), accounts.pks[12])
                await wait(45);
                await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[1]), accounts.pks[1])
            })

            it('should allows accounts.b58[1] to vote for accounts[12] as SR, it should return true', async function () {
                for (const param of params) {
                    const transaction = await tronWeb.transactionBuilder.vote(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, param[3] || {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.votes[0].vote_address = '419bda2710106f8e466f46e1cbefc93b7bc8392f92';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, param[3] || {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.votes[0].vote_count = 6;
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, param[3] || {});
                    assert.equal(authResult10, false);

                    if (param[2]) {
                        const dataCop16 = JSON.parse(JSON.stringify(data))
                        dataCop16.Permission_id = 1;
                        const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, param[3] || {});
                        assert.equal(authResult16, false);
                    }
                }
            });
        });

        describe("#case CreateSmartContract", function () {
            it('should create a smart contract with default parameters, it should return true', async function () {
                const options = {
                    abi: trcTokenTest070.abi,
                    bytecode: trcTokenTest070.bytecode,
                    parameters: [
                        accounts.hex[16], TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit: 8e7,
                    name: 'trcTokenTest070'
                };
                const ptr = await publicMethod.to64String(accounts.hex[16].replace(/^(41)/, ''))+ await publicMethod.to64String(TronWeb.fromDecimal(TOKEN_ID))+ await publicMethod.to64String(TronWeb.fromDecimal(123));
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(options)
                    const data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        fee_limit: parseInt(options.feeLimit),
                        call_value: 321,
                        consume_user_resource_percent: 100,
                        origin_energy_limit: 10_000_000,
                        abi: JSON.stringify(options.abi),
                        bytecode: options.bytecode,
                        parameter: ptr,
                        name: 'trcTokenTest070',
                        token_id: TOKEN_ID,
                        call_token_value: 1e3,
                        Permission_id: options.permissionId,
                    };
                    console.log("data:"+util.inspect(data,true,null,true))

                    commonAssertFalsePbWithArgs(transaction,data, {});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.consume_user_resource_percent = 98;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.origin_energy_limit = 12_345_678;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.abi = JSON.stringify(testConstant.abi);
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.bytecode = testConstant.bytecode;
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.name = '14214sd';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.parameter = '0000000000000000000000000000000000000000000000000000000000000003';
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    dataCop12.call_value = 1;
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop12, {});
                    assert.equal(authResult12, false);

                    // args.fee_limit
                    const dataCop13 = JSON.parse(JSON.stringify(data))
                    dataCop13.fee_limit = 160000000;
                    let authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, {});
                    assert.equal(authResult13, false);
                    // options.fee_limit
                    authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, data, {fee_limit:160000001});
                    assert.equal(authResult13, false);

                    // contract_address not verify
                    const cop14 = JSON.parse(JSON.stringify(transaction))
                    cop14.contract_address = '4133faf8cb13901e2fc834f01eaab0dc921a2d1c8d';
                    console.log("cop14:"+util.inspect(cop14,true,null,true))
                    const authResult14 = TronWeb.utils.transaction.txCheckWithArgs(cop14, data, {});
                    assert.equal(authResult14, true);

                    const dataCop15 = JSON.parse(JSON.stringify(data))
                    dataCop15.token_id = 92794787;
                    console.log("dataCop15:"+util.inspect(dataCop15,true,null,true))
                    const authResult15 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop15, {});
                    assert.equal(authResult15, false);

                    const dataCop16 = JSON.parse(JSON.stringify(data))
                    dataCop16.call_token_value = 697249720;
                    const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, {});
                    assert.equal(authResult16, false);

                    const dataCop17 = JSON.parse(JSON.stringify(data))
                    dataCop17.parameter = '000000000000000000000000948c275c39cc79422a638cb5732da3abd4f9b41c00000000000000000000000000000000000000000000000000000000000f42410000000000000000000000000000000000000000000000000000000000000010';
                    const authResult17 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop17, {});
                    assert.equal(authResult17, false);

                    if (i === 1) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ClearABIContract", function () {

            let transaction;
            let contract;
            let params = [];

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params = [
                    // [transaction.contract_address, accounts.hex[3], { permissionId: 2 }],
                    [transaction.contract_address, accounts.hex[3]],
                ]
            })

            it('should clear contract abi, it should return true', async function () {
                const contractAddress = transaction.contract_address;
                // verify contract abi before
                contract = await tronWeb.trx.getContract(contractAddress);
                assert.isTrue(Object.keys(contract.abi).length > 0)

                for (const param of params) {
                    // clear abi
                    transaction = await tronWeb.transactionBuilder.clearABI(...param);
                    const data = {
                        contract_address: tronWeb.address.toHex(param[0]),
                        owner_address: param[1],
                        Permission_id: param[2]?.permissionId,
                    };
                    commonAssertFalsePbWithArgs(transaction,data, {});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.contract_address = '4133faf8cb13901e2fc834f01eaab0dc921a2d1c8d';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);
                }
            });
        });

        describe("#case UpdateBrokerageContract", async function () {
            before(async () => {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[13], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[13], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[13]);
                await waitChainData('tx', transaction.txID);
            });
            it('should auth sr brokerage successful', async function () {
                const transaction = await tronWeb.transactionBuilder.updateBrokerage(10, accounts.hex[13]);
                const data = {
                    brokerage: 10,
                    owner_address: accounts.hex[13],
                };
                commonAssertFalsePbWithArgs(transaction,data,{});

                const dataCop8 = JSON.parse(JSON.stringify(data))
                dataCop8.owner_address = '41dbcbb15421a82413789af066dd6fde5d60ab6daa';
                const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                assert.equal(authResult8, false);

                const dataCop9 = JSON.parse(JSON.stringify(data))
                dataCop9.brokerage = 12;
                const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                assert.equal(authResult9, false);
            });
        });

        describe("#case AssetIssueContract", function () {
            it(`should allow accounts[2] to create a TestToken`, async function () {

                const options = getTokenOptions();
                const createrAccountIdx = 15;
                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[createrAccountIdx]);
                    const {
                        name = false,
                        abbreviation = false,
                        description = false,
                        url = false,
                        totalSupply = 0,
                        trxRatio = 1, // How much TRX will `tokenRatio` cost?
                        tokenRatio = 1, // How many tokens will `trxRatio` afford?
                        saleStart = Date.now(),
                        saleEnd = false,
                        freeBandwidth = 0, // The creator's "donated" bandwidth for use by token holders
                        freeBandwidthLimit = 0, // Out of `totalFreeBandwidth`, the amount each token holder get
                        frozenAmount = 0,
                        frozenDuration = 0,
                        // for now there is no default for the following values
                    } = options;
                    const data = {
                        owner_address: accounts.hex[createrAccountIdx],
                        name: tronWeb.fromUtf8(name),
                        abbr: tronWeb.fromUtf8(abbreviation),
                        description: tronWeb.fromUtf8(description),
                        url: tronWeb.fromUtf8(url),
                        total_supply: parseInt(totalSupply),
                        trx_num: parseInt(trxRatio),
                        num: parseInt(tokenRatio),
                        start_time: parseInt(saleStart),
                        end_time: parseInt(saleEnd),
                        free_asset_net_limit: parseInt(freeBandwidth),
                        public_free_asset_net_limit: parseInt(freeBandwidthLimit),
                        frozen_supply: {
                            frozen_amount: parseInt(frozenAmount),
                            frozen_days: parseInt(frozenDuration)
                        },
                        Permission_id: options.permissionId,
                    }
                    console.log("data:"+util.inspect(data,true,null,true))
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.name = '546f6b656e7574746f6a63707335707131';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.abbr = dataCop7.abbr+'31';
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.description = dataCop8.description+'31';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.url = dataCop9.url+'31';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.total_supply = 123456789;
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.trx_num = 12234;
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, {});
                    assert.equal(authResult11, false);

                    const dataCop12 = JSON.parse(JSON.stringify(data))
                    dataCop12.num = 12234;
                    const authResult12 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop12, {});
                    assert.equal(authResult12, false);

                    const dataCop13 = JSON.parse(JSON.stringify(data))
                    dataCop13.start_time = 1670133143167;
                    let authResult13 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop13, {});
                    assert.equal(authResult13, false);

                    const dataCop14 = JSON.parse(JSON.stringify(data))
                    dataCop14.end_time = 1670133743167;
                    const authResult14 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop14, {});
                    assert.equal(authResult14, false);

                    const dataCop15 = JSON.parse(JSON.stringify(data))
                    dataCop15.free_asset_net_limit = 123;
                    const authResult15 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop15, {});
                    assert.equal(authResult15, false);

                    const dataCop16 = JSON.parse(JSON.stringify(data))
                    dataCop16.public_free_asset_net_limit = 1234;
                    const authResult16 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop16, {});
                    assert.equal(authResult16, false);

                    const dataCop17 = JSON.parse(JSON.stringify(data))
                    dataCop17.frozen_supply = { frozen_amount: 7, frozen_days: 2 };
                    const authResult17 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop17, {});
                    assert.equal(authResult17, false);

                    if (i === 1) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case UpdateAssetContract", function () {
            let tokenOptions
            let tokenID

            before(async function () {
                tokenOptions = getTokenOptions();
                await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[14]), accounts.pks[14])

                let tokenList
                while (!tokenList) {
                    tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[14])
                }
                if (isAllowSameTokenNameApproved) {
                    tokenID = tokenList[tokenOptions.name].id
                } else {
                    tokenID = tokenList[tokenOptions.name].name
                }
            });

            it(`should allow accounts[13] to update a TestToken`, async function () {
                for (let i = 0; i < 2; i++) {
                    const data = {
                        new_public_limit: UPDATED_TEST_TOKEN_OPTIONS.freeBandwidthLimit,
                        url: tronWeb.fromUtf8(UPDATED_TEST_TOKEN_OPTIONS.url),
                        description: tronWeb.fromUtf8(UPDATED_TEST_TOKEN_OPTIONS.description),
                        owner_address: accounts.hex[14],
                        new_limit: UPDATED_TEST_TOKEN_OPTIONS.freeBandwidth,
                    }
                    const options = JSON.parse(JSON.stringify(UPDATED_TEST_TOKEN_OPTIONS))
                    if (i === 1) {
                        options.permissionId = 2;
                        data.Permission_id = 2;
                    }
                    const transaction = await tronWeb.transactionBuilder.updateToken(options, accounts.b58[14]);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.new_public_limit = '99';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.description = dataCop9.description+'31';
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    const dataCop10 = JSON.parse(JSON.stringify(data))
                    dataCop10.url = dataCop10.url+'31';
                    const authResult10 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop10, {});
                    assert.equal(authResult10, false);

                    const dataCop11 = JSON.parse(JSON.stringify(data))
                    dataCop11.new_limit = 66;
                    const authResult11 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop11, {});
                    assert.equal(authResult11, false);

                    if (i === 1) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case AccountCreateContract", function () {
            const generateData = (param) => {
                return {
                    account_address: tronWeb.address.toHex(param[0]),
                    owner_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[2]?.permissionId
                };
            };

            it(`should create a new account`, async function () {
                const newAccount = await TronWeb.createAccount();
                const params = [
                    [newAccount.address.base58, accounts.b58[3], { permissionId: 2 }],
                    [newAccount.address.base58, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.createAccount(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, param[3] || {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.account_address = '4171cd59226b590a2bf3d10d9bee9621e53226b288';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, param[3] || {});
                    assert.equal(authResult6, false);

                    if (param[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case AccountUpdateContract", function () {
            const generateData = (param) => {
                return {
                    account_name: tronWeb.fromUtf8(param[0]),
                    owner_address: tronWeb.address.toHex(param[1]),
                    Permission_id: param[2]?.permissionId
                };
            };

            it(`should update accounts[3]`, async function () {
                const newName = 'New name'
                const params = [
                    [newName, accounts.b58[3], { permissionId: 2 }],
                    [newName, accounts.b58[3]]
                ];

                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,param);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, param[3] || {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.account_name = dataCop6.account_name+'31';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, param[3] || {});
                    assert.equal(authResult6, false);

                    if (param[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case SetAccountIdContract", function () {
            it(`should set account id accounts[3]`, async function () {
                for (let i = 0; i < 2; i++) {
                    let accountId = TronWeb.toHex('abcabc110');
                    let param = [accountId, accounts.b58[3]]
                    // TODO
                    /*if (i === 1) {
                        param = [accountId, accounts.b58[3], { permissionId: 2 }]
                    }*/
                    const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
                    const data = {
                        account_id: accountId,
                        owner_address: accounts.hex[3],
                    };
                    commonAssertFalsePbWithArgs(transaction,data, {});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.account_id = TronWeb.toHex('12947971423974');
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);
/*
                    if (i === 1) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }*/
                }
            });
        });

        describe("#case ProposalCreateContract", function () {
            let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
            let params = [];
            const generateData = (input) => {
                return {
                    owner_address: tronWeb.address.toHex(input[1]),
                    parameters: [input[0]],
                    Permission_id: input[2]?.permissionId,
                };
            };

            before(async () => {
                params = [
                    [parameters[0], accounts.b58[14], { permissionId: 2 }],
                    [parameters[1], accounts.b58[14]]
                ];
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[14], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[14], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[14]);
                await waitChainData('tx', transaction.txID);
            });

            it('should allow the SR account to create a new proposal as a single object', async function () {
                for (let input of params) {
                    const transaction = await tronWeb.transactionBuilder.createProposal(...input)
                    const data = generateData(input);
                    commonAssertFalsePbWithArgs(transaction,data, input);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.parameters[0] = { "key": 5, "value": 12323423 };
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    if (input[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ProposalDeleteContract", function () {
            let proposals;
            let params = [];
            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(WITNESS_ACCOUNT),
                    proposal_id: param[0],
                    Permission_id: param[2]?.permissionId,
                };
            };

            before(async function () {
                // comments below should be uncomment when first run
                // const transaction = await tronWeb.transactionBuilder.applyForSR(ADDRESS_BASE58, 'url.tron.network');
                // await broadcaster.broadcaster(transaction, PRIVATE_KEY);
                // await waitChainData('tx', transaction.txID);

                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
                const result = await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
                await wait(45);
                await tronWeb.trx.getTransaction(result.transaction.txID);
                proposals = await tronWeb.trx.listProposals();
                params = [
                    [proposals[0].proposal_id, WITNESS_ACCOUNT, { permissionId: 2 }],
                    [proposals[0].proposal_id, WITNESS_ACCOUNT]
                ];
            })

            it('should allow the SR to delete its own proposal', async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data, param);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.proposal_id = 27394792437;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    if (param[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ProposalApproveContract", function () {
            let proposals;
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    proposal_id: parseInt(param[0]),
                    is_add_approval: param[1],
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]
                await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
                await wait(45);
                proposals = await tronWeb.trx.listProposals();
            })

            it('approve proposal with true', async function () {
                params = [
                    [proposals[0].proposal_id, true, WITNESS_ACCOUNT2, { permissionId: 2 }],
                    [proposals[0].proposal_id, true, WITNESS_ACCOUNT2]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data, param);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.proposal_id = 27394792437;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.is_add_approval = false;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });

            it('approve proposal with false', async function () {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.voteProposal(proposals[0].proposal_id, true, WITNESS_ACCOUNT2), WITNESS_KEY2)
                params = [
                    [proposals[0].proposal_id, false, WITNESS_ACCOUNT2, { permissionId: 2 }],
                    [proposals[0].proposal_id, false, WITNESS_ACCOUNT2]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data, param);

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.proposal_id = 27394792437;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.is_add_approval = true;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ExchangeCreateContract", function () {
            const idxS = 18;
            const idxE = 20;
            const toIdx1 = 2;
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
            });

            it('should create token exchange', async function () {
                const params = [
                    [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]],
                    [tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], {permissionId: 2 }]
                ];
                for (let param of params) {
                    let transaction = await tronWeb.transactionBuilder.createTokenExchange(...param);
                    let data = {
                        owner_address: accounts.hex[toIdx1],
                        first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                        first_token_balance: 10e3,
                        second_token_id: tronWeb.fromUtf8(tokenNames[1]),
                        second_token_balance: 10e3,
                        Permission_id: param[5]?.permissionId,
                    };
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.first_token_id = dataCop6.first_token_id+'31';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.first_token_balance = 29792749;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.second_token_id = dataCop8.second_token_id+'31';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.second_token_balance = 8023407;
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    if (param[5]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case TRXExchangeCreateContract", function () {
            const toIdx2 = 1;
            let tokenNames = [];

            before(async function () {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[20]);
                await broadcaster.broadcaster(null, accounts.pks[20], transaction);
                await waitChainData('token', accounts.hex[20]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[20]);
                await wait(10);
                await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                await broadcaster.broadcaster(null, accounts.pks[20], await tronWeb.transactionBuilder.sendToken(
                    accounts.hex[toIdx2],
                    10e4,
                    token[Object.keys(token)[0]]['id'],
                    token[Object.keys(token)[0]]['owner_address']
                ));
                await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            });

            it('should create trx exchange', async function () {
                const params = [
                    [tokenNames[0], 10e3, 10e3, accounts.hex[toIdx2]],
                    [tokenNames[0], 10e3,10e3, accounts.hex[toIdx2], {permissionId: 2 }]
                ];
                for (let param of params) {
                    let transaction = await tronWeb.transactionBuilder.createTRXExchange(...param);
                    let data = {
                        owner_address: accounts.hex[toIdx2],
                        first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                        first_token_balance: 10e3,
                        second_token_id: '5f',
                        second_token_balance: 10e3,
                        Permission_id: param[4]?.permissionId,
                    };
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.first_token_id = dataCop6.first_token_id+'31';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.first_token_balance = 29792749;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.second_token_id = dataCop8.second_token_id+'31';
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.second_token_balance = 8023407;
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    if (param[4]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ExchangeInjectContract", function () {
            const idxS = 22;
            const idxE = 24;
            let tokenNames = [];
            let exchangeId = '';
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                await wait(45);
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
            });
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.exchange_id = 8023480;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.token_id = dataCop7.token_id+'31';
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.quant = 1234;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ExchangeWithdrawContract", function () {
            const idxS = 24;
            const idxE = 26;
            let tokenNames = [];
            let exchangeId = '';
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params = [
                    [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10]
                ];
            });
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.exchange_id = 8023480;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.token_id = dataCop7.token_id+'31';
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.quant = 1234;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case ExchangeTransactionContract", function () {
            const idxS = 26;
            const idxE = 28;
            let tokenNames = [];
            let exchangeId = '';
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.defaultAddress.hex,
                    exchange_id: parseInt(param[0]),
                    token_id: tronWeb.fromUtf8(param[1]),
                    quant: parseInt(param[2]),
                    expected: param[3],
                    Permission_id: param[4]?.permissionId,
                };
            };

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                await broadcaster.broadcaster(transaction);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
                params = [
                    [exchangeId, tokenNames[0], 10, 5, { permissionId: 2 }],
                    [exchangeId, tokenNames[0], 10, 5]
                ];
            });
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(
                        ...param
                    );
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.exchange_id = 8023480;
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.token_id = dataCop7.token_id+'31';
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.quant = 1234;
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    const dataCop9 = JSON.parse(JSON.stringify(data))
                    dataCop9.expected = 7;
                    const authResult9 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop9, {});
                    assert.equal(authResult9, false);

                    if (param[4]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case UpdateSettingContract", function () {
            let transaction;
            let contract;
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    contract_address: tronWeb.address.toHex(param[0]),
                    consume_user_resource_percent: param[1],
                    Permission_id: param[3]?.permissionId,
                };
            };

            before(async function () {
                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params = [
                    [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 20, accounts.b58[3]]
                ];
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateSetting(
                        ...param
                    );
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.contract_address = '41d2c52e603670e69fdad97557b7c66d42a35260e0';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.consume_user_resource_percent = 66;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case UpdateEnergyLimitContract", function () {
            let transaction;
            let params = [];

            const generateData = (param) => {
                return {
                    owner_address: tronWeb.address.toHex(param[2]),
                    contract_address: tronWeb.address.toHex(param[0]),
                    origin_energy_limit: param[1],
                    Permission_id: param[3]?.permissionId
                };
            };

            before(async function () {
                this.timeout(20000);

                transaction = await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[3]);
                await broadcaster.broadcaster(null, accounts.pks[3], transaction);
                await waitChainData('tx', transaction.txID);
                params = [
                    [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                    [transaction.contract_address, 10e6, accounts.b58[3]]
                ];
            })
            it(`it should return true`, async function () {
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(
                        ...param
                    );
                    const data = generateData(param);
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.contract_address = '41d2c52e603670e69fdad97557b7c66d42a35260e0';
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.origin_energy_limit = 6666;
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    if (param[3]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe("#case AccountPermissionUpdateContract", function () {
            before(async () => {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[17], 10000e6), PRIVATE_KEY);
                const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[17], 'url.tron.network');
                await broadcaster.broadcaster(transaction, accounts.pks[17]);
                await waitChainData('tx', transaction.txID);
            });
            it(`it should return true`, async function () {
                const permissionData = {
                    "owner": {
                      "type": 0,
                      "keys": [
                        {
                          "address": accounts.hex[17],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "permission_name": "owner"
                    },
                    "witness": {
                      "keys": [
                        {
                          "address": accounts.hex[17],
                          "weight": 1
                        }
                      ],
                      "threshold": 1,
                      "id": 1,
                      "type": 1,
                      "permission_name": "witness"
                    },
                    "owner_address": accounts.hex[17],
                    "actives": [
                      {
                        "operations": "7fff1fc0033e0000000000000000000000000000000000000000000000000000",
                        "keys": [
                          {
                            "address": accounts.hex[17],
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
                const params = [
                    [accounts.hex[17], permissionData.owner, permissionData.witness, permissionData.actives]
                ];
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                        ...param
                    );
                    const data = {
                        owner_address: param[0],
                        owner: param[1],
                        witness: param[2],
                        actives: param[3][0],
                        Permission_id: param[4]?.permissionId,
                    };
                    commonAssertFalsePbWithArgs(transaction,data,{});

                    const dataCop5 = JSON.parse(JSON.stringify(data))
                    dataCop5.owner_address = '41effcede51fb10c5a32ed5c7d5a0250d3ce8faf86';
                    const authResult5 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop5, {});
                    assert.equal(authResult5, false);

                    const dataCop6 = JSON.parse(JSON.stringify(data))
                    dataCop6.owner = {
                        "type": 0,
                        "keys": [
                            {
                                "address": accounts.hex[7],
                                "weight": 1
                            }
                        ],
                        "threshold": 2,
                        "permission_name": "owner"
                    };
                    const authResult6 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop6, {});
                    assert.equal(authResult6, false);

                    const dataCop7 = JSON.parse(JSON.stringify(data))
                    dataCop7.witness = {
                        "keys": [
                            {
                                "address": accounts.hex[6],
                                "weight": 2
                            }
                        ],
                        "threshold": 3,
                        "id": 2,
                        "type": 1,
                        "permission_name": "witness"
                    };
                    const authResult7 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop7, {});
                    assert.equal(authResult7, false);

                    const dataCop8 = JSON.parse(JSON.stringify(data))
                    dataCop8.actives = [
                        {
                            "operations": "7fff1fc0031e0000000000000000000000000000000000000000000000000000",
                            "keys": [
                                {
                                    "address": accounts.hex[9],
                                    "weight": 1
                                }
                            ],
                            "threshold": 1,
                            "id": 2,
                            "type": 2,
                            "permission_name": "active"
                        }
                    ];
                    const authResult8 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop8, {});
                    assert.equal(authResult8, false);

                    if (param[4]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });

        describe('#case commonOptions', function () {
            it('should include feeLimit and auth true', async function () {
                const data = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    feeLimit: 8e7
                };
                for (let i = 0; i < 2; i++) {
                    if (i === 1) data.permissionId = 2;
                    const transaction = await tronWeb.transactionBuilder.createSmartContract(data)
                    const args = {
                        owner_address: tronWeb.defaultAddress.hex,
                        call_value: 0,
                        consume_user_resource_percent: 100,
                        origin_energy_limit: 10_000_000,
                        abi: JSON.stringify(data.abi),
                        bytecode: data.bytecode,
                        parameter: '',
                        name: '',
                        Permission_id: data.permissionId,
                    };
                    const options = {
                        fee_limit: data.feeLimit,
                    };
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction, args, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction, args, options);

                    if (i === 1) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, data[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
            it('should include data and auth true', async function () {
                const params = [
                    [accounts.b58[1], 10]
                ];
                const generateData = (param) => {
                    return {
                        to_address: TronWeb.address.toHex(param[0]),
                        owner_address: tronWeb.defaultAddress.hex,
                        amount: param[1],
                        Permission_id: param[2]?.permissionId,
                      };
                };
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const data = generateData(param);
                    const options = {
                        data: tronWeb.toHex('111'),
                    };
                    const transaction2 = await tronWeb.transactionBuilder.addUpdateData(
                        transaction,
                        options.data,
                        'hex',
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction2, data, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction2, data, options);

                    const authResult2 =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction2, data, {
                            data: tronWeb.toHex('112'),
                        });
                    assert.equal(authResult2, false);

                    if (param[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
            it('should include expiration and auth true', async function () {
                const params = [
                    [accounts.b58[1], 10]
                ];
                const generateData = (param) => {
                    return {
                        to_address: TronWeb.address.toHex(param[0]),
                        owner_address: tronWeb.defaultAddress.hex,
                        amount: param[1],
                        Permission_id: param[2]?.permissionId,
                      };
                };
                for (let param of params) {
                    const transaction = await tronWeb.transactionBuilder.sendTrx(
                        ...param
                    );
                    const data = generateData(param);
                    const options = {
                        expiration: 60 * 60 * 1000 * 24 * 100,
                    };
                    const transaction2 = await tronWeb.transactionBuilder.extendExpiration(
                        transaction,
                        options.expiration / 1000,
                    );
                    const authResult =
                        TronWeb.utils.transaction.txCheckWithArgs(transaction2, data, options);
                    assert.equal(authResult, true);
                    commonAssertPbWithArgs(transaction2, data, options);

                    if (param[2]) {
                        const dataCop18 = JSON.parse(JSON.stringify(data))
                        dataCop18.Permission_id = 1;
                        const authResult18 = TronWeb.utils.transaction.txCheckWithArgs(transaction, dataCop18, param[3] || {});
                        assert.equal(authResult18, false);
                    }
                }
            });
        });
    });
});
