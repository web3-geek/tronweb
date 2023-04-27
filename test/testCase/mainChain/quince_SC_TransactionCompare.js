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

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        //account0_hex = "4199401720e0f05456f60abc65fca08696fa698ee0";
        //account0_b58 = "TPwXAV3Wm25x26Q6STrFYCDMM4F59UhXL7";
        await tronWebBuilder.newTestAccountsInMain(7);
        accounts = await tronWebBuilder.getTestAccountsInMain(7);

    });

    /*describe("#createSmartContract", async function () {
            it('should create a smart contract with default parameters', async function () {
                const options = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    feeLimit: 1000000000,
                    originEnergyLimit: 10000000,
                    name: tronWeb.fromUtf8('TestRevert'),
                    callValue: 0,
                    userFeePercentage: 0
                };
                const data = {
                               owner_address: tronWeb.defaultAddress.hex,
                               abi: testRevert.abi,
                               bytecode: testRevert.bytecode,
                               fee_limit: 1000000000,
                               origin_energy_limit: 10000000,
                               name: tronWeb.fromUtf8("TestRevert"),
                               call_value: 0,
                               consume_user_resource_percent: 0,
                               visible: false
                                };


                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.createSmartContract(options,tronWeb.defaultAddress.hex, tx1)
                console.log('TronWeb ', JSON.stringify(tx2, null, 2));
                result = await broadcaster.broadcaster(null, tronWeb.defaultAddress.privateKey, tx2);
                console.log("result: ",result)
                while (true) {
                                                const tx = await tronWeb.trx.getTransactionInfo(tx2.txID);
                                                if (Object.keys(tx).length === 0) {
                                                    await wait(3);
                                                    continue;
                                                } else {
                                                    break;
                                                }
                               }

                if (!_.isEqual(tx1,tx2)) {
                          console.error('smart contract with default parameters not equal');
                          //console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                          //console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));

                } else {
                          console.info('smart contract with default parameters goes well');
                }

            });

            it('should create a smart contract with array parameters', async function () {
                this.timeout(20000);
                const bals = [1000, 2000, 3000, 4000];
                accounthex16 = '41a8fa2c3c08ff90722a74cb76c32a663ea66f405f';
                accounthex17 = '415f9de5466bdd95081132bf6437d5bf0ba131f7c4';
                accounthex18 = '410403ae7004f315c441bbde8c3a1b067299519454';
                accounthex19 = '4128bb4d954aa0768bff59997c2de50282d5b4a8de';
                const options = {
                    abi: arrayParam.abi,
                    bytecode: arrayParam.bytecode,
                    feeLimit: 1000000000,
                    originEnergyLimit: 10000000,
                    name: tronWeb.fromUtf8('ArrayParam'),
                    callValue: 0,
                    userFeePercentage: 0,
                    permissionId: 2,
                    parameters: [
                        [accounthex16, accounthex17, accounthex18, accounthex19],
                        [bals[0], bals[1], bals[2], bals[3]]
                    ]
                };
                const data = {
                     owner_address: accounts.hex[0],
                     abi: arrayParam.abi,
                     bytecode: arrayParam.bytecode,
                     fee_limit: 1000000000,
                     origin_energy_limit: 10000000,
                     name: tronWeb.fromUtf8("ArrayParam"),
                     call_value: 0,
                     consume_user_resource_percent: 0,
                     visible: false,
                     Permission_id: 2,
                     parameter: '000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000004000000000000000000000000a8fa2c3c08ff90722a74cb76c32a663ea66f405f0000000000000000000000005f9de5466bdd95081132bf6437d5bf0ba131f7c40000000000000000000000000403ae7004f315c441bbde8c3a1b06729951945400000000000000000000000028bb4d954aa0768bff59997c2de50282d5b4a8de000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000007d00000000000000000000000000000000000000000000000000000000000000bb80000000000000000000000000000000000000000000000000000000000000fa0',
                };
                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const tx2 = await tronWeb.transactionBuilder.createSmartContract(options, accounts.hex[0], tx1);
                console.log('TronWeb ', JSON.stringify(tx2, null, 2));

                if (!_.isEqual(tx1,tx2)) {
                                                          console.error('smart contract with ArrayParam not equal');
                                                          console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                                                          console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));

                                                    } else {
                                                          console.info('smart contract with ArrayParam goes well');
                }
                *//*const result = await broadcaster.broadcaster(null, accounts.pks[0], tx2);
                console.log('Result ', JSON.stringify(result, null, 2));
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(tx2.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }

                const deployed = await tronWeb.contract().at(transaction.contract_address);
                for (let j = 16; j <= 19; j++) {
                    let bal = await deployed.balances(accounts.hex[j]).call();
                    bal = bal.toNumber();
                    assert.equal(bal, bals[j - 16]);
                }*//*
            });

            it('should create a smart contract with array[3] parameters', async function () {
                const options = {
                    abi: testAddressArray.abi,
                    bytecode: testAddressArray.bytecode,
                    feeLimit: 1000000000,
                    originEnergyLimit: 10000000,
                    name: tronWeb.fromUtf8('TestAddressArray'),
                    callValue: 0,
                    userFeePercentage: 0,
                    parameters: [
                                            [accounts.hex[16], accounts.hex[17], accounts.hex[18]]
                                ]

                };

                gridParameter = "000000000000000000000000"+accounts.hex[16].slice(2)+"000000000000000000000000"+accounts.hex[17].slice(2)+"000000000000000000000000"+accounts.hex[18].slice(2);

                data = {
                                     owner_address: accounts.hex[0],
                                     abi: testAddressArray.abi,
                                     bytecode: testAddressArray.bytecode,
                                     fee_limit: 1000000000,
                                     origin_energy_limit: 10000000,
                                     name: tronWeb.fromUtf8("TestAddressArray"),
                                     call_value: 0,
                                     consume_user_resource_percent: 0,
                                     parameter:  gridParameter,
                                     visible: false
                };
                console.log("data: ",data);

                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const transaction = await tronWeb.transactionBuilder.createSmartContract(options, accounts.hex[0],tx1);
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));

                if (!_.isEqual(tx1,transaction)) {
                                                          console.error('smart contract with array[3] not equal');
                                                          console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                                                          console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                                                          console.info('smart contract with array[3] goes well');
                }


                *//*result = await broadcaster.broadcaster(null, accounts.pks[0], transaction);
                console.log("wqq result: ",result);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                const deployed = await tronWeb.contract().at(transaction.contract_address);
                for (let j = 16; j <= 18; j++) {
                    let bal = await deployed.balanceOf(accounts.hex[j]).call();
                    bal = bal.toNumber();
                    assert.equal(bal, 100000000);
                }*//*
            });

            it('should create a smart contract with trctoken and stateMutability parameters', async function () {
                console.log("debug: ",ADDRESS_HEX);
                accounthex16='410d740043839f4dfafb88f428da1ef5b64c5fca64'  //PRI: 5D55DA2E81D2AF4F549DEBB15B1171F1041C97FEA84280DE49E55190C4D24C5B
                paramsFromWeb = '0000000000000000000000000d740043839f4dfafb88f428da1ef5b64c5fca6400000000000000000000000000000000000000000000000000000000000f4241000000000000000000000000000000000000000000000000000000000000007b';
                // before token balance
                const accountbefore = await tronWeb.trx.getAccount(ADDRESS_HEX);
                const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);

                data = {
                                                     owner_address: ADDRESS_HEX,
                                                     abi: trcTokenTest070.abi,
                                                     bytecode: trcTokenTest070.bytecode,
                                                     name: tronWeb.fromUtf8("TestAddressArray"),
                                                     parameter: paramsFromWeb,
                                                     call_value: 321,
                                                     token_id:TOKEN_ID,
                                                     call_token_value:1e3,
                                                     fee_limit: FEE_LIMIT,
                                                     origin_energy_limit: 10e6,
                                                     consume_user_resource_percent: 100,
                                                     visible: false
                };
                console.log("data: ",data);

                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                const options = {
                    abi: trcTokenTest070.abi,
                    bytecode: trcTokenTest070.bytecode,
                    name: tronWeb.fromUtf8("TestAddressArray"),
                    parameters: [
                        accounthex16, TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit: FEE_LIMIT
                };
                const transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_HEX, tx1);
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));

                if (!_.isEqual(tx1,transaction)) {
                     console.error('smart contract with trctoken and stateMutability parameters not equal');
                     console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                     console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                     console.info('smart contract with trctoken and stateMutability parameters goes well');
                }
                *//*result = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                console.log("result: ",result);
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
                assert.equal(toAddressTrc10BalanceAfter,123);*//*
            });

            it('should create a smart contract with payable parameters', async function () {
                accounthex13 = '41ba040ec1530ea9f965685a7b4b2ca7c9f02e2601'
                paramsFromWeb = '000000000000000000000000ba040ec1530ea9f965685a7b4b2ca7c9f02e260100000000000000000000000000000000000000000000000000000000000f4241000000000000000000000000000000000000000000000000000000000000007b';
                // before token balance
                const accountbefore = await tronWeb.trx.getAccount(ADDRESS_HEX);
                const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);

                data = {
                                                                     owner_address: ADDRESS_HEX,
                                                                     abi: trcTokenTest059.abi,
                                                                     bytecode: trcTokenTest059.bytecode,
                                                                     fee_limit: 150000000,
                                                                     origin_energy_limit: 10e6,
                                                                     name: tronWeb.fromUtf8("trcTokenTest"),
                                                                     parameter: paramsFromWeb,
                                                                     call_value: 321,
                                                                     token_id:TOKEN_ID,
                                                                     call_token_value:1e3,
                                                                     consume_user_resource_percent: 0,
                                                                     visible: false
                };
                console.log("data: ",data);
                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                const options = {
                    abi: trcTokenTest059.abi,
                    bytecode: trcTokenTest059.bytecode,
                    name: tronWeb.fromUtf8("trcTokenTest"),
                    parameters: [
                        accounthex13, TOKEN_ID, 123
                    ],
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    userFeePercentage: 0
                };

                const transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_HEX,tx1);
                console.log('TronWeb ', JSON.stringify(transaction, null, 2));

                if (!_.isEqual(tx1,transaction)) {
                    console.error('smart contract with payable parameters not equal');
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                    console.info('smart contract with payable parameters goes well');
                }

                *//*await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
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
                assert.equal(toAddressTrc10BalanceAfter,123);*//*
            });

            it('should create a smart contract and verify the parameters', async function () {
                data = {
                                                     owner_address: accounts.hex[0],
                                                     abi: testRevert.abi,
                                                     bytecode: testRevert.bytecode,
                                                     fee_limit: 9e8,
                                                     origin_energy_limit: 9e6,
                                                     name: tronWeb.fromUtf8("TestRevert"),
                                                     consume_user_resource_percent: 30,
                                                     visible: false
                };
                console.log("data: ",data);
                tx1 = await tronWeb.fullNode.request('wallet/deploycontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));

                const options = {
                    abi: testRevert.abi,
                    bytecode: testRevert.bytecode,
                    name: tronWeb.fromUtf8("TestRevert"),
                    userFeePercentage: 30,
                    originEnergyLimit: 9e6,
                    feeLimit: 9e8
                };

                const tx = await tronWeb.transactionBuilder.createSmartContract(options,accounts.hex[0],tx1)
                console.log("TronWeb ",  JSON.stringify(tx, null, 2))
                if (!_.isEqual(tx1,tx)) {
                    console.error('smart contract and verify the parameters not equal');
                    console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                    console.log(JSON.stringify(tx.raw_data.contract[0].parameter.value, null, 2));

                } else {
                    console.info('smart contract and verify the parameters goes well');
                }

                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 30);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 9e6);
                assert.equal(tx.raw_data.fee_limit, 9e8);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            });
        });*/

    describe("#triggerSmartContract", async function () {

            let transaction;
            let contractAddress;
            let contractAddressWithArray;
            let contractAddressWithTrctoken;
            contractAddress='417f02b2806d9fc4d390041e315bae7886c17e7137';
            contractAddressWithArray = '4112857cd6f3aa53e8f21656091f51556cf66a1f83';
            contractAddressWithTrctoken= '41e78c7595907e29359c38c15c797e87a4df1af00e';
            console.log("wqqtest: triggerSmartContract")

            /*before(async function () {
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
                console.log("contractAddress: ",contractAddress);
                console.log("contractAddressWithArray: ",contractAddressWithArray);
                console.log("contractAddressWithTrctoken: ",contractAddressWithTrctoken);
            })*/

            //need check again,TRNWB-25
            it('should trigger smart contract successfully', async function () {
                const issuerAddress = accounts.hex[6];
                const functionSelector = 'testPure(uint256,uint256)';
                const parameter = [
                    {type: 'uint256', value: 1},
                    {type: 'uint256', value: 2}
                ]
                const options = {};

                data = {
                    owner_address: issuerAddress,
                    contract_address: contractAddress,
                    function_selector: 'testPure(uint256,uint256)',
                    parameter:'00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
                    visible:false
                }

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    if (i === 1) data.Permission_id = 2;
                    tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                    transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, options,
                        parameter, issuerAddress);
                    console.log("TronWeb: ",JSON.stringify(transaction, null, 2));
                    assert.isTrue(transaction.result.result &&
                    transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                    if (!_.isEqual(tx1,transaction)) {
                        console.error('trigger smart contract not equal');
                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));

                    } else {
                        console.info('trigger smart contracts goes well');
                    }

                    transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                    assert.isTrue(transaction.receipt.result)
                    assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
                }
            });

            //after use at, deploy.balance has no result returned.
            it('should trigger smart contract with array[2] parameters', async function () {
                console.log("wqqtest: should trigger smart contract with array[2] parameters")
                accounthex16= '41560ad333aa93dd143b56c302bf87ca4d268ed337';
                accounthex17='41681156754975b6e0f5768e9bb872b4def8311ebd';
                paramsFromWeb = '000000000000000000000000560ad333aa93dd143b56c302bf87ca4d268ed337000000000000000000000000681156754975b6e0f5768e9bb872b4def8311ebd000000000000000000000000000000000000000000000000000000000001e240000000000000000000000000000000000000000000000000000000000001e240';

                const functionSelector = 'transferWith2(address[2],uint256[2])';
                const parameter = [
                    {type: 'address[2]', value: [accounthex16, accounthex17]},
                    {type: 'uint256[2]', value: [123456, 123456]}
                ]


                data = {
                            owner_address: accounts.hex[6],
                            contract_address: contractAddressWithArray,
                            function_selector: 'transferWith2(address[2],uint256[2])',
                            parameter:paramsFromWeb,
                            fee_limit: 150000000,
                            visible:false
                        }
                tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithArray,  functionSelector, {},
                    parameter, accounts.hex[6],tx1);
                console.log("TronWeb: ",JSON.stringify(transaction, null, 2))
                if (!_.isEqual(tx1,transaction)) {
                                    console.error('smart contract and verify the parameters not equal');
                                    console.log(JSON.stringify(tx1.transaction.raw_data.contract[0].parameter.value, null, 2));
                                    console.log(JSON.stringify(transaction.transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                                    console.info('smart contract and verify the parameters goes well');
                }
                result = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                console.log("result: ",result)
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(transaction.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                console.log("111111");
                const deployed = await tronWeb.contract().at(contractAddressWithArray);
                console.log("222222");


                let bal = await deployed.balanceOf(accounthex16).call();
                bal = bal.toNumber();
                assert.equal(bal, 100123456);

                bal = await deployed.balanceOf(accounthex17).call();
                bal = bal.toNumber();
                assert.equal(bal, 100123456);

                console.log("---end---")
            });

            it('should trigger smart contract with array[] parameters', async function () {
                accounthex16 = '41fd4362d55ef2de200b882c4a81f52ab05095e9f5';
                accounthex17 = '41467871d1bc3ed0bae7916d64bbae1a3697900d00';
                accounthex6 = '41d73bf2a11ae9f3f1200888504ecf9780002d1f47';

                const functionSelector = 'transferWithArray(address[],uint256[])';
                const parameter = [
                    {type: 'address[]', value: [accounthex16, accounthex17]},
                    {type: 'uint256[]', value: [123456, 123456]}
                ]

                paramsFromWeb = '000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fd4362d55ef2de200b882c4a81f52ab05095e9f5000000000000000000000000467871d1bc3ed0bae7916d64bbae1a3697900d000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001e240000000000000000000000000000000000000000000000000000000000001e240';
                data = {
                                            owner_address: accounthex6,
                                            contract_address: contractAddressWithArray,
                                            function_selector: 'transferWithArray(address[],uint256[])',
                                            parameter:paramsFromWeb,
                                            fee_limit: 150000000,
                                            visible:false
                }
                tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithArray,  functionSelector, {},
                    parameter, accounthex6,tx1);
                console.log("TronWeb: ",JSON.stringify(transaction, null, 2))
                if (!_.isEqual(tx1,transaction)) {
                                                    console.error('smart contract with array[] parameters not equal');
                                                    console.log(JSON.stringify(tx1.transaction.raw_data.contract[0].parameter.value, null, 2));
                                                    console.log(JSON.stringify(transaction.transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                                                    console.info('smart contract with array[] parameters goes well');
                }
                /*result = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                console.log("result: ",result)
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
                }*/
            });

            it('should trigger smart contract with trctoken payable parameters', async function () {
                // before balance
                const accountTrxBalanceBefore = await tronWeb.trx.getBalance(contractAddressWithTrctoken);
                const accountbefore = await tronWeb.trx.getAccount(contractAddressWithTrctoken);
                const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("accountTrxBalanceBefore:"+accountTrxBalanceBefore);
                console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);

                accounthex17 = '41467871d1bc3ed0bae7916d64bbae1a3697900d00';
                paramsFromWeb = '000000000000000000000000467871d1bc3ed0bae7916d64bbae1a3697900d0000000000000000000000000000000000000000000000000000000000000f4241000000000000000000000000000000000000000000000000000000000000007b';

                const functionSelector = 'TransferTokenTo(address,trcToken,uint256)';
                const parameter = [
                    {type: 'address', value: accounthex17},
                    {type: 'trcToken', value: TOKEN_ID},
                    {type: 'uint256', value: 123}
                ];
                const options = {
                    callValue:321,
                    tokenId:TOKEN_ID,
                    tokenValue:1e3,
                    feeLimit:FEE_LIMIT
                };
                data = {
                                                            owner_address: ADDRESS_HEX,
                                                            contract_address: contractAddressWithTrctoken,
                                                            function_selector: 'TransferTokenTo(address,trcToken,uint256)',
                                                            parameter:paramsFromWeb,
                                                            fee_limit: FEE_LIMIT,
                                                            call_value: 321,
                                                            call_token_value: 1000,
                                                            token_id: 1000001,
                                                            visible:false
                }
                tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                const transaction = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithTrctoken,  functionSelector, options,
                    parameter, ADDRESS_HEX, tx1);
                console.log("TronWeb: ",JSON.stringify(transaction, null, 2))
                if (!_.isEqual(tx1,transaction)) {
                     console.error('smart contract with trctoken payable parameters not equal');
                     console.log(JSON.stringify(tx1.transaction.raw_data.contract[0].parameter.value, null, 2));
                     console.log(JSON.stringify(transaction.transaction.raw_data.contract[0].parameter.value, null, 2));

                } else {
                    console.info('smart contract with trctoken payable parameters goes well');
                }



                /*const res = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction.transaction);
                console.log("res: ",res);
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
                const toAddressAfter = await tronWeb.trx.getAccount(accounthex17);
                const toAddressTrc10BalanceAfter = toAddressAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
                console.log("toAddressTrc10BalanceAfter:"+toAddressTrc10BalanceAfter);
                assert.equal(accountTrxBalanceAfter,(accountTrxBalanceBefore+321));
                assert.equal(accountTrc10BalanceAfter,(accountTrc10BalanceBefore+1e3-123));*/
                //assert.equal(toAddressTrc10BalanceAfter,123);
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

            //todo： timestamp不相等。
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

                paramsFromWeb = '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002';
                data = {
                                                            owner_address: accounts.hex[6],
                                                            contract_address: transaction.contract_address,
                                                            function_selector: 'testPure(uint256,uint256)',
                                                            parameter:paramsFromWeb,
                                                            visible:false
                }

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    if (i === 1) data.Permission_id = 2;
                    tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                    transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, options,
                        parameter, issuerAddress,tx1);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(tx1,transaction)) {
                                         console.error('should trigger constant contract not equal');
                                         console.log(JSON.stringify(tx1.transaction.raw_data.contract[0].parameter.value, null, 2));
                                         console.log(JSON.stringify(transaction.transaction.raw_data.contract[0].parameter.value, null, 2));

                    } else {
                                        console.info('should trigger constant contract goes well');
                    }


                    /*assert.isTrue(transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                    assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                    transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                    assert.isTrue(transaction.receipt.result)
                    assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);*/
                }
            });
        });

    //todo： timestamp不相等。
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
                data = {
                    owner_address: accounts.hex[6],
                    contract_address: transaction.contractAddress,
                    function_selector: 'testPure(uint256,uint256)',
                    parameter:'00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
                    visible:false
                }

                for (let i = 0; i < 2; i++) {
                    if (i === 1) options.permissionId = 2;
                    if (i === 1) data.Permission_id = 2;
                    tx1 = await tronWeb.fullNode.request('wallet/triggersmartcontract', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                    transaction = await tronWeb.transactionBuilder.triggerConfirmedConstantContract(contractAddress, functionSelector, options,
                        parameter, issuerAddress);
                    console.log("TronWeb: ",JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(tx1,transaction)) {
                        console.error('trigger confirmed constant contract not equal');
                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));

                    } else {
                        console.info('trigger confirmed constant contract goes well');
                    }


                    assert.isTrue(transaction.result.result &&
                        transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
                    assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000004');
                    transaction = await broadcaster.broadcaster(null, accounts.pks[6], transaction.transaction);
                    assert.isTrue(transaction.receipt.result)
                    assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
                }
            });
        });



    describe("#triggerSmartContractWithFuncABIV2 (V2 input)", async function () {

            it('should create or trigger a smart contract with funcABIV2 (V2 input)', async function () {
                let coder = tronWeb.utils.abi;
                const issuerAddress = accounts.hex[0];
                const issuerPk = accounts.pks[0];
                const abi = JSON.parse(funcABIV2_2.interface);
                const bytecode = funcABIV2_2.bytecode;
                const outputValues = getValues(JSON.parse(funcABIV2_2.values))
                const transaction = await tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi,
                        bytecode,
                    },
                    issuerAddress
                );
                await broadcaster.broadcaster(null, issuerPk, transaction);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(
                        transaction.txID
                    );
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }

                const deployed = await tronWeb
                    .contract(abi, transaction.contract_address)
                let check = await deployed.test().call();
                console.log("check: ",check)
                console.log("outputValues ",outputValues)
                assert.ok(equals(check[0], outputValues[0]));
            });
    });

    describe("#triggerSmartContractWithFuncABIV2 (V1 input)", async function () {

            it('should create or trigger a smart contract with funcABIV2 (V1 input)', async function () {
                const issuerAddress = accounts.hex[0];
                const issuerPk = accounts.pks[0];

                const transaction = await tronWeb.transactionBuilder.createSmartContract(
                    {
                        abi: funcABIV2.abi,
                        bytecode: funcABIV2.bytecode,
                        funcABIV2: funcABIV2.abi[0],
                        parametersV2: [1]
                    },
                    issuerAddress
                );
                await broadcaster.broadcaster(null, issuerPk, transaction);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(
                        transaction.txID
                    );
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }

                const deployed = await tronWeb
                    .contract()
                    .at(transaction.contract_address);
                let check = await deployed.check().call();
                assert.ok(check.eq(1));

                /* test send method */
                const sendTxId = await deployed.setCheck(8).send({}, issuerPk);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(
                        sendTxId
                    );
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                let check1 = await deployed.check().call();
                assert.ok(check1.eq(8));

                /* test triggersmartcontract */
                const setTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                    transaction.contract_address,
                    "setCheck(uint256)",
                    {
                        funcABIV2: funcABIV2.abi[2],
                        parametersV2: [
                            16
                        ]
                    },
                    [],
                    issuerAddress
                );
                await broadcaster.broadcaster(null, issuerPk, setTransaction.transaction);

                check = await deployed.check().call();
                assert.ok(check.eq(16));
            });
        });

    describe('#updateSetting()', function () {
            let transaction;
                before(async function () {
                    this.timeout(20000);

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
                it(`should update setting`, async function () {

                     data = {
                                    //owner_address: this.tronWeb.defaultAddress.base58,
                                    owner_address: accounts.hex[3],
                                    contract_address: transaction.contract_address,
                                    consume_user_resource_percent: 10,
                                    visible: false,
                                    Permission_id: 2
                             };
                     tx1 = await tronWeb.fullNode.request('wallet/updatesetting', data, 'post');
                     console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                     param = [transaction.contract_address,10,accounts.hex[3],{permissionId: 2},tx1];
                     const tx2 = await tronWeb.transactionBuilder.updateSetting(...param);
                     console.log('TronWeb ',JSON.stringify(tx2, null, 2));
                     if (!_.isEqual(tx1,tx2)) {
                            console.error('updateSetting not equal');
                            console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                            console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                     } else {
                            console.info('updateSetting goes well');
                     }
                });
        });

    describe("#updateEnergyLimit", function () {
                let transaction;
                before(async function () {
                    this.timeout(20000);

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
                it(`should update energy limit`, async function () {
                    const data = {
                                    owner_address: accounts.hex[3],
                                    contract_address: transaction.contract_address,
                                    origin_energy_limit: 10e6,
                                    visible: false,
                                    Permission_id: 2
                                 }
                    tx1 = await tronWeb.fullNode.request('wallet/updatesetting', data, 'post');
                    console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                    const param = [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }, tx1];
                    const tx2 = await tronWeb.transactionBuilder.updateEnergyLimit(...param);
                    console.log('TronWeb ', JSON.stringify(tx2, null, 2));
                    const authResult =TronWeb.utils.transaction.txCheck(tx2);
                    assert.equal(authResult, true);

                    if (!_.isEqual(tx1,tx2)) {
                                                console.error('updateEnergyLimit not equal');
                                                console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                                                console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                         } else {
                                                console.info('updateEnergyLimit goes well');
                                         }
                });
            });

    describe("#clearabi", async function () {

            let transactions = [];
            let contracts = [];
            before(async function () {
                this.timeout(20000);

                transactions.push(await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[7]));
                transactions.push(await tronWeb.transactionBuilder.createSmartContract({
                    abi: testConstant.abi,
                    bytecode: testConstant.bytecode
                }, accounts.hex[7]));
                transactions.forEach(async (tx) => {
                    contracts.push(await broadcaster.broadcaster(null, accounts.pks[7], tx));
                });

                while (true) {
                    const tx1 = await tronWeb.trx.getTransactionInfo(transactions[0].txID);
                    const tx2 = await tronWeb.trx.getTransactionInfo(transactions[1].txID);
                    if (Object.keys(tx1).length === 0 || Object.keys(tx2).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
            })

            it('should clear contract abi', async function () {
                this.timeout(10000);

                const params = [
                    [transactions[0], accounts.hex[7], {permissionId: 2}],
                    [transactions[1], accounts.hex[7]],
                ];
                for (const param of params) {
                    const contractAddress = param[0].contract_address;
                    const ownerAddress = param[1];

                    // verify contract abi before
                    const contract = await tronWeb.trx.getContract(contractAddress);
                    assert.isTrue(Object.keys(contract.abi).length > 0);
                    let data;
                    // clear abi
                    if (param.length === 2) {
                        data = {
                            owner_address: ownerAddress,
                            contract_address:contractAddress,
                            visible:false
                        }
                    }else{
                        data = {
                            owner_address: ownerAddress,
                            contract_address: contractAddress,
                            visible: false,
                            Permission_id: 2
                            }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/clearabi', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    const transaction = await tronWeb.transactionBuilder.clearABI(contractAddress, ownerAddress, param[2],gridtx);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                        console.error('clearabi not equal');
                        console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('clearabi goes well');
                    }

                    const parameter = txPars(transaction);
                    assert.isTrue(!transaction.visible &&
                        transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.ClearABIContract');
                    assert.equal(transaction.txID.length, 64);
                    assert.equal(parameter.value.contract_address, tronWeb.address.toHex(contractAddress));
                    assert.equal(parameter.value.owner_address, tronWeb.address.toHex(ownerAddress));
                    assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);

                    if (param.length === 2) {
                        const res = await broadcaster.broadcaster(null, accounts.pks[7], transaction);
                        assert.isTrue(res.receipt.result);

                        let contract;
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
                    }
                }
            });
    });

    describe("#vote", async function () {
                    let url = 'https://xtron.network';
                    before(async function () {
                        /**
                         * Execute this method when Proposition 70 is not enabled
                         */
                        //await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[11]), accounts.pks[11])
                        param = [100000000,3,'BANDWIDTH', accounts.b58[11]];
                        const transaction = await tronWeb.transactionBuilder.freezeBalance(...param);
                        const result = await broadcaster.broadcaster(null,accounts.pks[11],transaction);
                        console.log("result ",result);

                        /**
                         * Execute this method when Proposition 70 is enabled
                         */
                        /*param = [100000000, 'BANDWIDTH', accounts.b58[11]];
                        const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(...param);
                        const result = await broadcaster.broadcaster(null,accounts.pks[11],transaction);
                        console.log("result ",result);*/
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


                    it('should allows accounts[1] to vote for accounts[0] as SR', async function () {
                        const data = {
                            owner_address: accounts.hex[11],
                            votes: [
                                {   vote_address: tronWeb.address.toHex(WITNESS_ACCOUNT),
                                    vote_count: 5
                                }
                            ],
                            visible: false

                        }
                        tx1 = await tronWeb.fullNode.request('wallet/votewitnessaccount', data, 'post');
                        console.log('TronGrid ', JSON.stringify(tx1, null, 2));
                        let votes = {}
                        votes[tronWeb.address.toHex(WITNESS_ACCOUNT)] = 5
                        const tx2 = await tronWeb.transactionBuilder.vote(votes, accounts.b58[11],{},tx1)
                        console.log('TronWeb ', JSON.stringify(tx2, null, 2));
                        const parameter = txPars(tx2);

                        assert.equal(parameter.value.owner_address, accounts.hex[11]);
                        assert.equal(parameter.value.votes[0].vote_address, tronWeb.address.toHex(WITNESS_ACCOUNT));
                        assert.equal(parameter.value.votes[0].vote_count, 5);
                        assert.equal(parameter.type_url, 'type.googleapis.com/protocol.VoteWitnessContract');

                        if (!_.isEqual(tx1,tx2)) {
                                                                        console.error('vote not equal');
                                                                        console.log(JSON.stringify(tx1.raw_data.contract[0].parameter.value, null, 2));
                                                                        console.log(JSON.stringify(tx2.raw_data.contract[0].parameter.value, null, 2));
                                                  } else {
                                                                        console.info('vote goes well');
                                                  }

                    })

    });

    describe('#withdrawBalance', function () {

            // this is not fully testable because the minimum time before withdrawBlockRewards is 1 days
            // witnessAccount does not have any reward

            it(`should withdraw balance`, async function () {
                const params = [
                    [WITNESS_ACCOUNT, { permissionId: 2 }],
                    [WITNESS_ACCOUNT]
                ];

                for (let i = 0; i < 2; i++) {
                    let data;
                    let param;
                    // clear abi
                    if (i === 0) {
                        data = {
                            owner_address: tronWeb.address.toHex(WITNESS_ACCOUNT),
                            visible:false
                        }

                    }else{
                        data = {
                            owner_address: tronWeb.address.toHex(WITNESS_ACCOUNT),
                            visible: false,
                            Permission_id: 2
                        }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/withdrawbalance', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    if (i === 0) {
                                    param = [WITNESS_ACCOUNT,{}, gridtx];

                    }else{
                                    param = [WITNESS_ACCOUNT, { permissionId: 2 },gridtx];
                          }
                    //console.log("Param ",param)
                    const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(...param);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                                            console.error('withdrawBalance not equal');
                                            console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                            console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                        } else {
                                            console.info('withdrawBalance goes well');
                                        }

                    const authResult =TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                }
            });
        });

    describe("#createProposal", async function () {

            let parametersUsed = [{"key": 0, "value": 100000}, {"key": 1, "value": 2}]
            const witnessAccount = "TT1smsmhxype64boboU8xTuNZVCKP1w6qT"

            it('should allow the SR account to create a new proposal as a single object', async function () {

                await tronWeb.trx.sendTrx(witnessAccount,10000000000,{privateKey: PRIVATE_KEY})
                for (let i = 0; i < 2; i++)  {
                    if (i === 0) {
                        data = {
                            owner_address: tronWeb.address.toHex(witnessAccount),
                            parameters:parametersUsed[0],
                            visible:false
                        }
                    }else{
                        data = {
                            owner_address: tronWeb.address.toHex(witnessAccount),
                            parameters:parametersUsed[1],
                            visible: false,
                            Permission_id: 2
                            }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/proposalcreate', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    if (i === 0) {
                         param = [parametersUsed[0], witnessAccount,{}, gridtx];
                    }else{
                         param = [parametersUsed[1], witnessAccount, {permissionId: 2},gridtx];
                    }
                    const transaction = await tronWeb.transactionBuilder.createProposal(...param)
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2))
                    if (!_.isEqual(gridtx,transaction)) {
                                                                console.error('createProposal case 1 not equal');
                                                                console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                                                console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                                            } else {
                                                                console.info('createProposal case 1 goes well');
                                                            }


                }

            })

            it('should allow the SR account to create a new proposal as an array of objects', async function () {
                for (let i = 0; i < 2; i++)  {
                    if (i === 0) {
                        data = {
                            owner_address: tronWeb.address.toHex(witnessAccount),
                            parameters:parametersUsed,
                            visible:false
                        }
                    }else{
                        data = {
                            owner_address: tronWeb.address.toHex(witnessAccount),
                            parameters:parametersUsed,
                            visible: false,
                            Permission_id: 2
                        }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/proposalcreate', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    if (i === 0) {
                         param = [parametersUsed, witnessAccount,{}, gridtx];
                    }else{
                         param = [parametersUsed, witnessAccount, {permissionId: 2},gridtx];
                    }
                    const transaction = await tronWeb.transactionBuilder.createProposal(...param)
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2))
                    if (!_.isEqual(gridtx,transaction)) {
                        console.error('createProposal case 2 not equal');
                        console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('createProposal case 2 goes well');
                    }


                }
            });
    });

    describe("#deleteProposal", async function () {


            let proposals;
            const witnessAccount = "TT1smsmhxype64boboU8xTuNZVCKP1w6qT";
            const witnessKey = "9FD8E129DE181EA44C6129F727A6871440169568ADE002943EAD0E7A16D8EDAC";

            before(async function () {

                this.timeout(20000)

                let parameters = [{"key": 0, "value": 100000}, {"key": 1, "value": 2}]

                await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, witnessAccount), witnessKey)

                proposals = await tronWeb.trx.listProposals();
                console.log("proposals:"+util.inspect(proposals,true,null,true))
            })

            after(async function () {
                proposals = await tronWeb.trx.listProposals();
                if (proposals[0].state !== 'CANCELED')
                    await broadcaster.broadcaster(tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id, witnessAccount), witnessKey)
            })

            it('should allow the SR to delete its own proposal', async function () {
                for (let i = 0; i < 2; i++) {
                    let data;
                    let param;
                    if (i === 0) {
                        data = {
                        owner_address: tronWeb.address.toHex(witnessAccount),
                        proposal_id: proposals[0].proposal_id,
                        visible:false
                        }

                    }else{
                        data = {
                        owner_address: tronWeb.address.toHex(witnessAccount),
                        proposal_id: proposals[0].proposal_id,
                        visible: false,
                        Permission_id: 2
                        }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/proposaldelete', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                        if (i === 0) {
                             param = [proposals[0].proposal_id, witnessAccount, gridtx];
                        }else{
                             param = [proposals[0].proposal_id, witnessAccount, {permissionId: 2},gridtx];
                        }
                    const transaction = await tronWeb.transactionBuilder.deleteProposal(...param)
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                        console.error('deleteProposal not equal');
                        console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('deleteProposal goes well');
                    }

                    }

            });
    });

    describe("#applyForSR", async function () {

            let url = 'https://xtron.network';

            it('should allow accounts[0] to apply for SR', async function () {
               data = {
                   url:tronWeb.fromUtf8(url),
                   owner_address: accounts.hex[10],
                   visible: false,
               }
               const gridtx = await tronWeb.fullNode.request('wallet/createwitness', data, 'post');
               console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
               const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[10], url,{},gridtx);
               console.log('TronWeb ', JSON.stringify(transaction, null, 2));
               if (!_.isEqual(gridtx,transaction)) {
                   console.error('applyForSR not equal');
                   console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                   console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
               } else {
                   console.info('applyForSR goes well');
               }
               const parameter = txPars(transaction);
               assert.equal(parameter.value.owner_address, accounts.hex[10]);
               await assertEqualHex(parameter.value.url, url);
               assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WitnessCreateContract');
            });
    });

    describe("#updateBrokerage", async function () {

            before(async function () {
                await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
                await broadcaster.broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'abc.tron.network'), accounts.pks[1])
            })

            it('should update sr brokerage successfully', async function () {
                // const transaction = await tronWeb.transactionBuilder.updateBrokerage(10, accounts.hex[1]);
                for (let i = 0; i < 2; i++) {
                    let data;
                    let param;
                    if (i === 0) {
                                        data = {
                                        owner_address: accounts.hex[1],
                                        brokerage: 20,
                                        visible:false
                                        }

                    }else{
                                        data = {
                                        owner_address: accounts.hex[1],
                                        brokerage: 10,
                                        visible: false,
                                        Permission_id: 2
                                        }
                    }
                   const gridtx = await tronWeb.fullNode.request('wallet/updateBrokerage', data, 'post');
                   console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                   if (i === 0) {
                       param = [20, accounts.hex[1],{},gridtx];
                   }else{
                       param = [10, accounts.hex[1], {permissionId: 2},gridtx];
                   }
                    const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                        console.error('updateBrokerage not equal');
                        console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                        console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                        console.info('updateBrokerage goes well');
                    }
                    const parameter = txPars(transaction);
                    assert.equal(transaction.txID.length, 64);
                    assert.equal(parameter.value.brokerage, param[0]);
                    assert.equal(parameter.value.owner_address, param[1]);
                    assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateBrokerageContract');
                    assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);
                }
            });
    });

    describe("#tradeExchangeTokens", async function () {
            const idxS = 27;
            const idxE = 29;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    result = await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    console.log("broadcast result1: ",result)
                    await wait(15);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    console.log("token ",token);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    console.log("tokenById ", token[Object.keys(token)[0]]['id'])
                    result = await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    console.log("broadcast result2 ", result);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                // console.log(tokenNames, 99999999);
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                result = await broadcaster.broadcaster(transaction);
                console.log("broadcast result3 ", result);
                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });

            it(`should trade exchange tokens`, async function () {
                for (let i = 0; i < 2; i++) {
                    let data;
                    let param;
                    if (i === 0) {
                        data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        exchange_id: exchangeId,
                        token_id: tronWeb.fromUtf8(tokenNames[i]),
                        quant: 10,
                        expected: 5,
                        visible:false
                    }

                    }else{
                        data = {
                            owner_address: tronWeb.defaultAddress.hex,
                            exchange_id: exchangeId,
                            token_id: tronWeb.fromUtf8(tokenNames[i]),
                            quant: 10,
                            expected: 5,
                            visible: false,
                            Permission_id: 2
                        }
                    }

                    const gridtx = await tronWeb.fullNode.request('wallet/exchangetransaction', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    if (i === 0) {
                        param = [exchangeId, tokenNames[i], 10, 5, tronWeb.defaultAddress.hex, {}, gridtx];
                    }else{
                        param = [exchangeId, tokenNames[i], 10, 5, tronWeb.defaultAddress.hex, { permissionId: 2 }, gridtx];
                    }
                    const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(...param);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                                            console.error('tradeExchangeTokens not equal');
                                            console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                            console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                        } else {
                                            console.info('tradeExchangeTokens goes well');
                                        }

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);

                    transaction.raw_data_hex = transaction.raw_data_hex + '00';
                    const authResult2 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult2, false);

                    transaction.txID = transaction.txID + '00'
                    const authResult3 =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult3, false);
                }
            });
    });

    describe("#createTokenExchange", async function () {

            const idxS = 13;
            const idxE = 15;
            const toIdx1 = 5;
            const toIdx2 = 6;
            let tokenNames = [];

            before(async function () {
                this.timeout(90000);

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    result1 = await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    console.log("result1: ",result1);
                    await wait(15);
                    assert.equal(transaction.txID.length, 64);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    result2 = await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx1],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    console.log("result2: ",result2);
                    await waitChainData('sendToken', accounts.hex[toIdx1], 0);
                    result3 = await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        accounts.hex[toIdx2],
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    console.log("result3: ",result3);
                    await waitChainData('sendToken', accounts.hex[toIdx2], 0);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }

            });

            it('should create token exchange', async function () {
                data ={
                    owner_address: accounts.hex[toIdx1],
                    first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                    second_token_id: tronWeb.fromUtf8(tokenNames[1]),
                    first_token_balance: 10e3,
                    second_token_balance: 10e3,
                    visible: false
                };
                gridtx = await tronWeb.fullNode.request('wallet/exchangecreate', data, 'post');
                console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                let transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1],{},gridtx);
                console.log('TronWeb ', JSON.stringify(gridtx, null, 2));
                if (!_.isEqual(gridtx,transaction)) {
                                                            console.error('createTokenExchange not equal');
                                                            console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                                            console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                                        } else {
                                                            console.info('createTokenExchange goes well');
                                                        }
                let parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(TronWeb.toUtf8(parameter.value.first_token_id), tokenNames[0]);
                assert.equal(TronWeb.toUtf8(parameter.value.second_token_id), tokenNames[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ExchangeCreateContract');
                assert.isUndefined(transaction.raw_data.contract[0].Permission_id);

                data ={
                                    owner_address: accounts.hex[toIdx1],
                                    first_token_id: tronWeb.fromUtf8(tokenNames[0]),
                                    second_token_id: tronWeb.fromUtf8(tokenNames[1]),
                                    first_token_balance: 10e3,
                                    second_token_balance: 10e3,
                                    visible: false,
                                    Permission_id: 2
                                };
                gridtx = await tronWeb.fullNode.request('wallet/exchangecreate', data, 'post');
                                console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                console.log("TronGrid ",gridtx);
                transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], {permissionId: 2},gridtx);
                console.log("TronWeb ",transaction);
                if (!_.isEqual(gridtx,transaction)) {
                                                         console.error('createTokenExchange not equal');
                                                         console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                                         console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                                     } else {
                                                         console.info('createTokenExchange goes well');
                                                     }
                parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(TronWeb.toUtf8(parameter.value.first_token_id), tokenNames[0]);
                assert.equal(TronWeb.toUtf8(parameter.value.second_token_id), tokenNames[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ExchangeCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
            });

        });

    describe("#injectExchangeTokens", async function () {
            const idxS = 16;
            const idxE = 18;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {

                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    result1 = await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    console.log("result1: ",result1);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    result2 = await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    console.log("result2: ",result2);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                result3 = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
                console.log("result3: ",result3);

                let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                while (!Object.keys(receipt).length) {
                    await wait(5);
                    receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
                }
                exchangeId = receipt.exchange_id;
            });
            it(`should inject exchange tokens`, async function () {
                    for (let i = 0; i < 2; i++) {
                        let data;
                        let param;
                        if (i === 0) {
                            data = {
                                owner_address: tronWeb.defaultAddress.hex,
                                exchange_id: exchangeId,
                                token_id: tronWeb.fromUtf8(tokenNames[0]),
                                quant: 10,
                                visible:false
                            }
                        }else{
                            data = {
                                owner_address: tronWeb.defaultAddress.hex,
                                exchange_id: exchangeId,
                                token_id: tronWeb.fromUtf8(tokenNames[0]),
                                quant: 10,
                                visible: false,
                                Permission_id: 2
                            }
                        }

                        gridtx = await tronWeb.fullNode.request('wallet/exchangeinject', data, 'post');
                        console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                        if (i === 0) {
                              param = [exchangeId, tokenNames[0], 10, tronWeb.defaultAddress.hex, {}, gridtx];
                        }else{
                              param = [exchangeId, tokenNames[0], 10, tronWeb.defaultAddress.hex, { permissionId: 2 }, gridtx];
                        }
                        const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                            ...param
                        );
                        console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                        if (!_.isEqual(gridtx,transaction)) {
                                                                    console.error('injectExchangeTokens not equal');
                                                                    console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                                                                    console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                                                                } else {
                                                                    console.info('injectExchangeTokens goes well');
                                                                }

                        const authResult =
                            TronWeb.utils.transaction.txCheck(transaction);
                        assert.equal(authResult, true);
                }
            });

    });

    describe("#withdrawExchangeTokens", async function () {
            const idxS = 0;
            const idxE = 2;
            let tokenNames = [];
            let exchangeId = '';

            before(async function () {
                // create token
                for (let i = idxS; i < idxE; i++) {
                    const options = getTokenOptions();
                    const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.hex[i]);
                    result1 = await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                    console.log("result1: ",result1);
                    await waitChainData('token', accounts.hex[i]);
                    const token = await tronWeb.trx.getTokensIssuedByAddress(accounts.hex[i]);
                    await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                    result2 = await broadcaster.broadcaster(null, accounts.pks[i], await tronWeb.transactionBuilder.sendToken(
                        tronWeb.defaultAddress.hex,
                        10e4,
                        token[Object.keys(token)[0]]['id'],
                        token[Object.keys(token)[0]]['owner_address']
                    ));
                    console.log("result2: ",result2);
                    tokenNames.push(token[Object.keys(token)[0]]['id']);
                }
                const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
                result3 = await broadcaster.broadcaster(transaction);
                console.log("result3: ",result3);
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
            it(`should withdraw exchange tokens`, async function () {
                for (let i = 0; i < 2; i++) {
                    let data;
                    let param;
                    if (i === 0) {
                        data = {
                        owner_address: tronWeb.defaultAddress.hex,
                        exchange_id: exchangeId,
                        token_id: tronWeb.fromUtf8(tokenNames[0]),
                        quant: 10,
                        visible:false
                        }
                    }else{
                        data = {
                            owner_address: tronWeb.defaultAddress.hex,
                            exchange_id: exchangeId,
                            token_id: tronWeb.fromUtf8(tokenNames[0]),
                            quant: 10,
                            visible: false,
                            Permission_id: 2
                        }
                    }

                    gridtx = await tronWeb.fullNode.request('wallet/exchangewithdraw', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));
                    if (i === 0) {
                         param = [exchangeId, tokenNames[0], 10,tronWeb.defaultAddress.hex, {}, gridtx];
                    }else{
                         param = [exchangeId, tokenNames[0], 10,tronWeb.defaultAddress.hex, {permissionId: 2 }, gridtx];
                    }
                    const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                        ...param
                    );
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                          console.error('withdrawExchangeTokens not equal');
                          console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                          console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                          console.info('withdrawExchangeTokens goes well');
                    }

                    const authResult =
                        TronWeb.utils.transaction.txCheck(transaction);
                    assert.equal(authResult, true);
                }
            });
        });

    describe.only('#setAccountId()', function () {
        it(`should set account id accounts[4]`, async function () {

                const ids = ['abcabc110', 'testtest', 'jackieshen110'];

                for (let id of ids) {
                    let accountId = TronWeb.toHex(id);
                    data = {
                        owner_address: accounts.hex[4],
                        account_id: id,
                        visible: false
                    }
                    gridtx = await tronWeb.fullNode.request('wallet/setaccountid', data, 'post');
                    console.log('TronGrid ', JSON.stringify(gridtx, null, 2));

                    const transaction = await tronWeb.transactionBuilder.setAccountId(id, accounts.b58[4],{},gridtx);
                    console.log('TronWeb ', JSON.stringify(transaction, null, 2));
                    if (!_.isEqual(gridtx,transaction)) {
                         console.error('setAccountId not equal');
                         console.log(JSON.stringify(gridtx.raw_data.contract[0].parameter.value, null, 2));
                         console.log(JSON.stringify(transaction.raw_data.contract[0].parameter.value, null, 2));
                    } else {
                         console.info('setAccountId goes well');
                    }
                    const parameter = txPars(transaction);
                    assert.equal(transaction.txID.length, 64);
                    assert.equal(parameter.value.account_id, accountId.slice(2));
                    assert.equal(parameter.value.owner_address, accounts.hex[4]);
                    assert.equal(parameter.type_url, 'type.googleapis.com/protocol.SetAccountIdContract');
                }
            });
    });
});


