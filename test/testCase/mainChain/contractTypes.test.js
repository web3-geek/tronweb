const {funcContractTypesCall} = require('../util/contracts');
const broadcaster = require('../util/broadcaster');
const tronWebBuilder = require('../util/tronWebBuilder');
const publicMethod = require('../util/PublicMethod');
const wait = require('../util/wait');
const util = require('util');
const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const txPars = require('../util/txPars');
const testConstantParameters = require('../util/contracts').testConstantParameters;
const TronWeb = tronWebBuilder.TronWeb;

const {
    ADDRESS_HEX,
    ADDRESS_BASE58,
    UPDATED_TEST_TOKEN_OPTIONS,
    PRIVATE_KEY,
    getTokenOptions,
    isProposalApproved,
    TOKEN_ID
} = require('../util/config');

describe('TronWeb.transactionBuilder', function () {
    let contractAddress;
    let contractAddress1;
    let contractConstantAddress;
    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(2);
        accounts = await tronWebBuilder.getTestAccountsInMain(2);
        const sendTrxTx = await tronWeb.trx.sendTrx(accounts.hex[0], 1000000000);
        // const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.hex[1], 50000000);
        // console.log("sendTrxTx1:"+JSON.stringify(sendTrxTx))
        // console.log("sendTrxTx2:"+JSON.stringify(sendTrxTx2))
        assert.isTrue(sendTrxTx.result);
        // assert.isTrue(sendTrxTx2.result);
        await wait(5);

        const options = {
            abi: funcContractTypesCall.abi,
            bytecode: funcContractTypesCall.bytecode,
            parameters: [accounts.hex[0], TOKEN_ID, ["1"], ["0xdCad3a6d3569DF655070DEd0"]],
            feeLimit: 1000e6
        };
        const createTransaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
        // console.log("createTransaction:" + util.inspect(createTransaction))
        const createTx = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction);
        // console.log("createTx:" + util.inspect(createTx))
        assert.equal(createTx.transaction.txID.length, 64);
        let createInfo;
        while (true) {
            createInfo = await tronWeb.trx.getTransactionInfo(createTx.transaction.txID);
            if (Object.keys(createInfo).length === 0) {
                await wait(3);
                continue;
            } else {
                console.log("createInfo:" + util.inspect(createInfo))
                break;
            }
        }
        contractAddress = createInfo.contract_address;
        console.log("contractAddress:" + contractAddress);

        const createTransaction1 = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
        // console.log("createTransaction:" + util.inspect(createTransaction))
        const createTx1 = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction1);
        // console.log("createTx:" + util.inspect(createTx))
        assert.equal(createTx1.transaction.txID.length, 64);
        let createInfo1;
        while (true) {
            createInfo1 = await tronWeb.trx.getTransactionInfo(createTx1.transaction.txID);
            if (Object.keys(createInfo1).length === 0) {
                await wait(3);
                continue;
            } else {
                console.log("createInfo1:" + util.inspect(createInfo1))
                break;
            }
        }
        contractAddress1 = createInfo1.contract_address;
        console.log("contractAddress1:" + contractAddress1)


        const options2 = {
            abi: testConstantParameters.abi,
            bytecode: testConstantParameters.bytecode,
            parameters: [],
            feeLimit: 1000e6
        };
        const createTransaction2 = await tronWeb.transactionBuilder.createSmartContract(options2, ADDRESS_BASE58);
        // console.log("createTransaction:" + util.inspect(createTransaction))
        const createTx2 = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction2);
        // console.log("createTx:" + util.inspect(createTx))
        assert.equal(createTx2.transaction.txID.length, 64);
        let createInfo2;
        while (true) {
            createInfo2 = await tronWeb.trx.getTransactionInfo(createTx2.transaction.txID);
            if (Object.keys(createInfo2).length === 0) {
                await wait(3);
                continue;
            } else {
                console.log("createInfo2:" + util.inspect(createInfo2))
                break;
            }
        }
        contractConstantAddress = createInfo2.contract_address;
        console.log("contractConstantAddress:" + contractConstantAddress)
    });

    describe('contractTypes SmartContract test start()', function () {
        it('should triggerSmartContract(type is Int) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000001efa6ad');
            //abiV2
            const functionSelector = 'changeInt(int256)';
            const parameter = [1];
            const options = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[18],parametersV2:parameter};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector,options,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result);
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000001');
            //abiV1
            parameter1 = [{type: 'int256', value: 5}];
            const options1 = {feeLimit: 1000e6};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector,options1,
                parameter1, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result);
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000005');
        });

        it('should triggerSmartContract(type is NegativeInt) successfully', async function () {
            const issuerAddress = ADDRESS_HEX;
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getNegativeInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffe105953');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'int256', value: 1}];
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeNegativeInt(int256)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getNegativeInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000001");

            //abiV2
            const parameter1 = [5];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[22],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeNegativeInt(int256)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getNegativeInt()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000005");
        });

        it('should triggerSmartContract(type is changeUint) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getUint()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '000000000000000000000000000000000000000000000000000000000166654f');
            //abiv1
            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'uint256', value: 1}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeUint(uint256)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getUint()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            console.log("transaction.constant_result: "+util.inspect(transaction.constant_result,true,null,true))
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000001");

            //abiV2
            const parameter1 = [5];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[24],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeUint(uint256)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getUint()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000005");


        });

        it('should triggerSmartContract(type is changeAddress) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getAddress()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, "000000000000000000000000"+accounts.hex[0].slice(2));

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'address', value: ADDRESS_BASE58}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeAddress(address)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getAddress()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            // console.log(transaction.constant_result,"---=======",ADDRESS_HEX);
            assert.equal(transaction.constant_result,"000000000000000000000000"+ADDRESS_HEX.slice(2));

            //abiV2
            const parameter1 = ["TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[15],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeAddress(address)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getAddress()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"0000000000000000000000005ab90009b529c5406b4f8a6fc4dab8a2bc778c75");

        });

        it('should triggerSmartContract(type is changeBytes32) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes32()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000dcad3a6d3569df655070ded0');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'bytes32', value: "0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a"}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeBytes32(bytes32)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction2 = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes32()', {},
                [], issuerAddress);
            assert.isTrue(transaction2.result.result &&
                transaction2.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction2.constant_result,"b55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a");

            //abiV2
            const parameter1 = ["0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd231088"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[17],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeBytes32(bytes32)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes32()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"b55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd231088");

        });

        it('should triggerSmartContract(type is changeBytes) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'bytes', value: "0x06"}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeBytes(bytes)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010600000000000000000000000000000000000000000000000000000000000000");

            //abiV2
            const parameter1 = ["0x08"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[16],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeBytes(bytes)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getBytes()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010800000000000000000000000000000000000000000000000000000000000000");

        });

        it('should triggerSmartContract(type is changeString) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getString()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000063132337177650000000000000000000000000000000000000000000000000000');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'string', value: "1q2w"}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeString(string)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getString()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000043171327700000000000000000000000000000000000000000000000000000000");

            //abiV2
            const parameter1 = ["abe321"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[23],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeString(string)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getString()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000066162653332310000000000000000000000000000000000000000000000000000");

        });

        it('should triggerSmartContract(type is ActionChoices) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getActionChoices()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '0000000000000000000000000000000000000000000000000000000000000001');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'uint8', value: "2"}];
            console.log("issuerAddress:",issuerAddress)
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeActionChoices(uint8)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getActionChoices()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000002");

            //abiV2
            const parameter1 = ["3"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[14],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeActionChoices(uint8)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getActionChoices()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000003");
        });

        it('should triggerSmartContract(type is int64[]) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt64NegativeArray()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000002fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'int64[]', value: [1,-12,3]}];
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeInt64NegativeArray(int64[])', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt64NegativeArray()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff40000000000000000000000000000000000000000000000000000000000000003");

            //abiV2
            const parameter1 = [[1,3]];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[21],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeInt64NegativeArray(int64[])",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt64NegativeArray()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003");

        });

        it('should triggerSmartContract(type is uint32[2][]) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt32Array()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'uint32[2][]', value: [[5, 6], [7, 8], [9, 10]]}];
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeInt32Array(uint32[2][])', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt32Array()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000000000000a");

            //abiV2
            const parameter1 = [[[2, 4], [3, 5], [4, 6]]];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[20],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeInt32Array(uint32[2][])",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt32Array()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006");

        });

        it('should triggerSmartContract(type is uint256[2][2]) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt256Array()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, '000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000021000000000000000000000000000000000000000000000000000000000000002c');

            const options = {feeLimit: 1000000000};
            parameterN = [{type: 'uint256[2][2]', value:[[100, 122], [133, 144]]}];
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'changeInt256Array(uint256[2][2])', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt256Array()', {},
                [], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            // console.log(transaction.constant_result);
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000007a00000000000000000000000000000000000000000000000000000000000000850000000000000000000000000000000000000000000000000000000000000090");

            //abiV2
            const parameter1 = [[[1, 2], [3, 4]]];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[19],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "changeInt256Array(uint256[2][2])",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getInt256Array()', {},
                [], issuerAddress);
            assert.equal(transaction.constant_result,"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000004");

        });

        it('should triggerSmartContract(type is setMappinga(uint256)) successfully', async function () {
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getMappinga(address)', {},
                [{type: 'address', value:"THph9K2M2nLvkianrMGswRhz5hjSA9fuH7"}], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result, await publicMethod.to64String("0"));

            const options = {feeLimit: 1000000000};
            const val = 1111;
            parameterN = [{type: 'uint256', value:val}];
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, 'setMappinga(uint256)', options,
                parameterN, issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getMappinga(address)', {},
                [{type: 'address', value:issuerAddress}], issuerAddress);
            assert.isTrue(transaction.result.result &&
                transaction.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            assert.equal(transaction.constant_result,await publicMethod.to64String(val.toString(16)));

            //abiV2
            const parameter1 = ["10"];
            options1 = {feeLimit: 1000e6,funcABIV2:funcContractTypesCall.abi[40],parametersV2:parameter1};
            transaction0 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddress, "setMappinga(uint256)",options1,
                [], issuerAddress);
            assert.isTrue(transaction0.result.result &&
                transaction0.transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.TriggerSmartContract');
            transaction = await broadcaster.broadcaster(null, accounts.pks[0], transaction0.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress, 'getMappinga(address)', {},
                [{type: 'address', value:issuerAddress}], issuerAddress);
            assert.equal(transaction.constant_result,"000000000000000000000000000000000000000000000000000000000000000a");
        });
    });

    describe('contractTypes call/send test start()', function () {
        it('should call/send(type is Int) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getInt().call();
            const Before = parseInt(dataBefore._hex, 16);
            assert.equal(Before, 32482989);

            const val = 123;
            let result = await contractInstance.changeInt(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(parseInt(result._hex, 16),val);

            const dataAfter = await contractInstance.getInt().call();
            const After = parseInt(dataAfter._hex, 16);
            assert.equal(After, val);
        });

        it('should call/send(type is NegativeInt) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getNegativeInt().call();
            const Before = parseInt(dataBefore._hex, 16);
            assert.equal(Before, -32482989);

            const val = -1123;
            let result = await contractInstance.changeNegativeInt(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(parseInt(result._hex, 16),val);

            const dataAfter = await contractInstance.getNegativeInt().call();
            const After = parseInt(dataAfter._hex, 16);
            assert.equal(After, val);
        });

        it('should call/send(type is changeUint) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getUint().call();
            const Before = parseInt(dataBefore._hex, 16);
            assert.equal(Before, 23487823);

            const val = 1123;
            let result = await contractInstance.changeUint(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(parseInt(result._hex, 16),val);

            const dataAfter = await contractInstance.getUint().call();
            const After = parseInt(dataAfter._hex, 16);
            assert.equal(After, val);
        });

        it('should call/send(type is changeAddress) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getAddress().call();
            assert.equal(dataBefore, accounts.hex[0]);

            const val = accounts.hex[1];
            let result = await contractInstance.changeAddress(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result,val);

            const dataAfter = await contractInstance.getAddress().call();
            assert.equal(dataAfter, val);
        });

        it('should call/send(type is changeBytes32) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getBytes32().call();
            assert.equal(dataBefore, "0x0000000000000000000000000000000000000000dcad3a6d3569df655070ded0");

            const val = "0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a";
            let result = await contractInstance.changeBytes32(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result,val);

            const dataAfter = await contractInstance.getBytes32().call();
            assert.equal(dataAfter, val);
            contractInstance.getBytes32().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is changeBytes) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getBytes().call();
            assert.equal(dataBefore, "0x000000");

            const val = "0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105890";
            let result = await contractInstance.changeBytes(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result,val);

            const dataAfter = await contractInstance.getBytes().call();
            assert.equal(dataAfter, val);
            contractInstance.getBytes().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is changeString) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getString().call();
            assert.equal(dataBefore, "123qwe");

            const val = "b55a21aaee0ce8f1c8ff122344400403lkkhhj";
            let result = await contractInstance.changeString(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result,val);

            const dataAfter = await contractInstance.getString().call();
            assert.equal(dataAfter, val);
        });

        it('should call/send(type is ActionChoices) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getActionChoices().call();
            assert.equal(dataBefore, 1);

            const val = "3";
            let result = await contractInstance.changeActionChoices(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result,val);

            const dataAfter = await contractInstance.getActionChoices().call();
            assert.equal(dataAfter, val);
            contractInstance.getActionChoices().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is int64[]) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getInt64NegativeArray().call();
            assert.equal(parseInt(dataBefore[0]._hex, 16), -1);
            assert.equal(parseInt(dataBefore[1]._hex, 16), 2);
            assert.equal(parseInt(dataBefore[2]._hex, 16), -3);

            const val = [-111,123];
            let result = await contractInstance.changeInt64NegativeArray(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(parseInt(result[0]._hex, 16), val[0]);
            assert.equal(parseInt(result[1]._hex, 16), val[1]);

            const dataAfter = await contractInstance.getInt64NegativeArray().call();
            assert.equal(parseInt(dataAfter[0]._hex, 16), val[0]);
            assert.equal(parseInt(dataAfter[1]._hex, 16), val[1]);
            contractInstance.getInt64NegativeArray().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is uint32[2][]) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getInt32Array().call();
            assert.equal(dataBefore[0][0], 1);
            assert.equal(dataBefore[0][1], 2);
            assert.equal(dataBefore[1][0], 3);
            assert.equal(dataBefore[1][1], 4);
            assert.equal(dataBefore[2][0], 5);
            assert.equal(dataBefore[2][1], 6);

            const val = [[122, 332], [991, 884]];
            let result = await contractInstance.changeInt32Array(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result[0][0], val[0][0]);
            assert.equal(result[0][1], val[0][1]);
            assert.equal(result[1][0], val[1][0]);
            assert.equal(result[1][1], val[1][1]);

            const dataAfter = await contractInstance.getInt32Array().call();
            assert.equal(dataAfter[0][0], val[0][0]);
            assert.equal(dataAfter[0][1], val[0][1]);
            assert.equal(dataAfter[1][0], val[1][0]);
            assert.equal(dataAfter[1][1], val[1][1]);
            contractInstance.getInt32Array().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is uint256[2][2]) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getInt256Array().call();
            assert.equal(parseInt(dataBefore[0][0]._hex, 16), 11);
            assert.equal(dataBefore[0][1], 22);
            assert.equal(dataBefore[1][0], 33);
            assert.equal(dataBefore[1][1], 44);

            const val = [[100, 122], [133, 144]];
            let result = await contractInstance.changeInt256Array(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            })
            assert.equal(result[0][0], val[0][0]);
            assert.equal(result[0][1], val[0][1]);
            assert.equal(result[1][0], val[1][0]);
            assert.equal(result[1][1], val[1][1]);

            const dataAfter = await contractInstance.getInt256Array().call();
            assert.equal(dataAfter[0][0], val[0][0]);
            assert.equal(dataAfter[0][1], val[0][1]);
            assert.equal(dataAfter[1][0], val[1][0]);
            assert.equal(dataAfter[1][1], val[1][1]);
            contractInstance.getInt256Array().call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });

        it('should call/send(type is setMappinga(uint256)) successfully', async function () {
            const contractInstance = await tronWeb.contract(funcContractTypesCall.abi,contractAddress1);
            const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);
            const dataBefore = await contractInstance.getMappinga(address).call();
            assert.equal(dataBefore, 0);

            const val = 1122;
            let result = await contractInstance.setMappinga(val).send({
                feeLimit:1000000000,
                callValue:0,
                tokenId:0,
                tokenValue:0,
                shouldPollResponse:true
            });
            assert.equal(result, val);

            const dataAfter = await contractInstance.getMappinga(address).call();
            assert.equal(dataAfter, val);
            contractInstance.getMappinga(address).call((err, data)=>{
                assert.equal(data.toString(),dataAfter.toString())
            });
        });
    });

    describe('trigger contract constantMethod with parameters',function(){
        it('trigger constantMethod with paramters', async function () {
            const options = getTokenOptions();

            options.precision = 0;
            let transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[0]);
            let parameter = txPars(transaction);
            await broadcaster.broadcaster(null, accounts.pks[0], transaction)
            let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[0])
            let tokenID = tokenList[options.name].id
            let token = await tronWeb.trx.getTokenByID(tokenID)
            console.log(tokenID,token)

            const options1 = {
                parameters: [],
                callValue:0,
                tokenId:tokenID,
                tokenValue:1
            };
            const issuerAddress = accounts.hex[0];
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractConstantAddress, 'getm()', options1,
                [], issuerAddress);
            assert.equal(transaction.constant_result[0].slice(0,64), '0000000000000000000000000000000000000000000000000000000000000001');
            const t = await publicMethod.to64String(parseInt(tokenID).toString(16))
            assert.equal(t,transaction.constant_result[0].slice(64));
        });
    });
});
