const {PRIVATE_KEY, ADDRESS_BASE58, FEE_LIMIT, TOKEN_ID, ADDRESS_HEX} = require('../util/config');
const testRevertContract = require('../util/contracts').testRevert;
const testSetValContract = require('../util/contracts').testSetVal;
const outputNameTest1 = require('../util/contracts').outputNameTest1;
const outputNameTest2 = require('../util/contracts').outputNameTest2;
const testEmptyAbi = require('../util/contracts').testEmptyAbi;
const TestCustomError = require('../util/contracts').TestCustomError;
const tronWebBuilder = require('../util/tronWebBuilder');
const assertThrow = require('../util/assertThrow');
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const TronWeb = tronWebBuilder.TronWeb;
const chai = require('chai');
const util = require('util');
const assert = chai.assert;
const _ = require('lodash');
const { equals, getValues } = require('../util/testUtils');

describe('#contract.index', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        emptyAccount = await TronWeb.createAccount();
        await tronWebBuilder.newTestAccountsInMain(1);
        accounts = await tronWebBuilder.getTestAccountsInMain(1);
    });

    describe('#customError', function () {
        let customError;

        before(async function () {
            const tx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: TestCustomError.abi,
                bytecode: TestCustomError.bytecode
            }, accounts.b58[0]), accounts.pks[0]);
            customError = await tronWeb.contract(TestCustomError.abi, tx.transaction.contract_address);
        })

        it('should revert with custom error', async () => {
            const txid = await customError.test(111).send();
            console.log("txid: "+txid);
            await wait(40);
            const data = await tronWeb.trx.getTransactionInfo(txid);
            const errorData = data.contractResult;
            const expectedErrorData =
                TronWeb.sha3('CustomError(uint256,uint256)', false).slice(0, 8) +
                '000000000000000000000000000000000000000000000000000000000000006f' + // 111
                '0000000000000000000000000000000000000000000000000000000000000001'; // 1
            assert.equal(errorData, expectedErrorData);
        })
    })
});

describe('#contract.method', function () {

    let accounts;
    let tronWeb;
    let emptyAccount;

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(3);
        accounts = await tronWebBuilder.getTestAccountsInMain(3);
        emptyAccount = await TronWeb.createAccount();
    });

    describe('#send()', function () {

        let testRevert
        let testSetVal

        before(async function () {
            const tx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
            console.log("tx.transaction.contract_address:"+tx.transaction.contract_address);

            const tx2 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testSetValContract.abi,
                bytecode: testSetValContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testSetVal = await tronWeb.contract().at(tx2.transaction.contract_address)
            console.log("tx2.transaction.contract_address:"+tx2.transaction.contract_address);

        })

        it("should set accounts[2] as the owner and check it with getOwner(1)", async function () {
            console.log("setOwnerBegin:");
            console.log("accounts.b58[2]:"+accounts.b58[2]);
            await testRevert.setOwner(accounts.b58[2]).send()
            console.log("accounts.b58[2]:"+accounts.b58[2]);
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if trying to set TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs as the owner", async function () {
            this.timeout(30000)
            await assertThrow(testRevert.setOwner('TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs').send({shouldPollResponse: true}),
                null,
                'REVERT'
            )
        });

        it("should set the val to 123", async function () {
            this.timeout(30000)
            let result = await testSetVal.set(123).send({
                shouldPollResponse: true,
                keepTxID: true
            })
            assert.equal(result[0].length, 64)
            assert.equal(result[1].toNumber(), 123)
        });

    });

    describe('#empty abi()', function () {

        let testRevert
        let testSetVal

        before(async function () {
            const tx1 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testEmptyAbi.abi,
                bytecode: testEmptyAbi.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress1 = tronWeb.address.fromHex(tx1.transaction.contract_address)
            console.log("contractAddress1:"+contractAddress1);

            const tx2 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi:[{}],
                bytecode: testEmptyAbi.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress2 = tronWeb.address.fromHex(tx2.transaction.contract_address)
            console.log("contractAddress2:"+contractAddress2);

            const tx3 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testSetValContract.abi,
                bytecode: testSetValContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            contractAddress3 = tronWeb.address.fromHex(tx3.transaction.contract_address)
            console.log("contractAddress3:"+contractAddress3);

        })

        it("abi is []", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // abi:[]
            const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress1, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction:"+util.inspect(triggerTransaction))
            const triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            console.log("triggerTx:"+util.inspect(triggerTx))
            assert.equal(triggerTx.transaction.txID.length, 64);
            let triggerInfo;
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo:"+util.inspect(triggerInfo))
                    break;
                }
            }
            const contractResult = triggerInfo &&new tronWeb.BigNumber(triggerInfo.contractResult[0], 16).valueOf();
            console.log("contractResult: "+contractResult);
        });
        it("abi is [{}]", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // abi:[{}]
            const triggerTransaction2 = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress2, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction2:"+util.inspect(triggerTransaction2))
            const triggerTx2 = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction2.transaction);
            console.log("triggerTx2:"+util.inspect(triggerTx2))
            assert.equal(triggerTx2.transaction.txID.length, 64);
            let triggerInfo2;
            while (true) {
                triggerInfo2 = await tronWeb.trx.getTransactionInfo(triggerTx2.transaction.txID);
                if (Object.keys(triggerInfo2).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo2:"+util.inspect(triggerInfo2))
                    break;
                }
            }
            const contractResult2 = triggerInfo2 &&new tronWeb.BigNumber(triggerInfo2.contractResult[0], 16).valueOf();
            console.log("contractResult2: "+contractResult2);
        });
        it("abi is {}", async function () {
            const functionSelector = 'set(uint256)';
            const parameter = [
                {type: 'uint256', value: 123}
            ]
            // clear abi
            const clearAbiTransaction = await tronWeb.transactionBuilder.clearABI(contractAddress3, accounts.b58[0]);
            console.log("clearAbiTransaction:"+util.inspect(clearAbiTransaction))
            const clearAbiTx = await broadcaster.broadcaster(null, accounts.pks[0], clearAbiTransaction);
            while (true) {
                let clearAbiInfo = await tronWeb.trx.getTransactionInfo(clearAbiTx.transaction.txID);
                if (Object.keys(clearAbiInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("clearAbiInfo:"+util.inspect(clearAbiInfo))
                    break;
                }
            }
            // abi:{}
            const triggerTransaction3 = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress3, functionSelector, {}, parameter, ADDRESS_BASE58);
            console.log("triggerTransaction3:"+util.inspect(triggerTransaction3))
            const triggerTx3 = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction3.transaction);
            console.log("triggerTx3:"+util.inspect(triggerTx3))
            assert.equal(triggerTx3.transaction.txID.length, 64);
            let triggerInfo3;
            while (true) {
                triggerInfo3 = await tronWeb.trx.getTransactionInfo(triggerTx3.transaction.txID);
                if (Object.keys(triggerInfo3).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo3:"+util.inspect(triggerInfo3))
                    break;
                }
            }
            const contractResult3 = triggerInfo3 &&new tronWeb.BigNumber(triggerInfo3.contractResult[0], 16).valueOf();
            console.log("contractResult3: "+contractResult3);

        });

    });

    describe('#call()', function () {

        let testRevert

        before(async function () {
            const tx = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
                abi: testRevertContract.abi,
                bytecode: testRevertContract.bytecode
            }, accounts.b58[0]), accounts.pks[0])
            testRevert = await tronWeb.contract().at(tx.transaction.contract_address)
            await testRevert.setOwner(accounts.b58[2]).send()
        })

        it("should getOwner(1) and get accounts[2]", async function () {
            assert.equal(await testRevert.getOwner(1).call(), accounts.hex[2])
        })

        it("should revert if call getOwner(2)", async function () {
            await assertThrow(testRevert.getOwner(2).call()
            )
        })

        it("should revert if call getOwner2()", async function () {
            await assertThrow(testRevert.getOwner2(2).call()
            )
        })

    });

    describe("#call()&send()-outputs-name-test1", async function () {
        const tronWeb = tronWebBuilder.createInstance();
        let contractInstance;
        let contractAddress;
        before(async function () {
            // createSmartContract
            const options = {
                abi: outputNameTest1.abi,
                bytecode: outputNameTest1.bytecode,
                feeLimit:FEE_LIMIT,
                funcABIV2: outputNameTest1.abi[0],
                parametersV2: [
                    [5],
                    ADDRESS_BASE58,
                    TOKEN_ID,
                    ["q","w","e"],
                    ["0xf579f9c22b185800e3b6e6886ffc8584215c05a5","0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f"]
                ],
            };
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            console.log("transaction.txID:"+transaction.txID)
            assert.equal(transaction.txID.length, 64);
            let createInfo;
            while (true) {
                createInfo = await tronWeb.trx.getTransactionInfo(transaction.txID);
                if (Object.keys(createInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    contractAddress = transaction.contract_address;
                    console.log("contractAddress:"+contractAddress)
                    break;
                }
            }
            contractInstance = await tronWeb.contract(outputNameTest1.abi,contractAddress);
            const originAddress = await contractInstance.origin().call();
            assert.ok(equals(originAddress, ADDRESS_BASE58));
            const token = parseInt(await contractInstance.token().call(), 10);
            assert.ok(equals(token, TOKEN_ID));
            const strs = await contractInstance.getStrs().call();
            assert.equal(util.inspect(strs), "[ [ 'q', 'w', 'e' ], stringArrayData: [ 'q', 'w', 'e' ] ]");
            assert.ok(equals(strs.stringArrayData, ["q", "w", "e"]));
            const bys = await contractInstance.getBys().call();
            assert.equal(util.inspect(bys), "[\n"
                + "  [\n"
                + "    '0xf579f9c22b185800e3b6e6886ffc8584215c05a5',\n"
                + "    '0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f'\n"
                + "  ],\n"
                + "  bytesArrayData: [\n"
                + "    '0xf579f9c22b185800e3b6e6886ffc8584215c05a5',\n"
                + "    '0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f'\n"
                + "  ]\n"
                + "]");
            assert.ok(equals(bys.bytesArrayData, ["0xf579f9c22b185800e3b6e6886ffc8584215c05a5","0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f"]));
        })

        it('send&call', async function () {
            // strs
            let result = await contractInstance.changeStrs(["z","x"]).send({shouldPollResponse:true}, PRIVATE_KEY);
            const strs = await contractInstance.getStrs().call();
            assert.equal(util.inspect(result), util.inspect(strs));
            assert.equal(util.inspect(strs), "[ [ 'z', 'x' ], stringArrayData: [ 'z', 'x' ] ]");
            assert.ok(equals(strs.stringArrayData, ["z","x"]));

            // bys
            result = await contractInstance.changeBys(["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"]).send({shouldPollResponse:true}, PRIVATE_KEY);
            const bys = await contractInstance.getBys().call();
            assert.equal(util.inspect(result), util.inspect(bys));
            assert.equal(util.inspect(bys), "[\n"
                + "  [ '0x60f68c9b9e50', '0x298fa36a9e2ebd6d3698e552987294fa8b65cd00' ],\n"
                + "  bytesArrayData: [ '0x60f68c9b9e50', '0x298fa36a9e2ebd6d3698e552987294fa8b65cd00' ]\n"
                + "]");
            assert.ok(equals(bys.bytesArrayData, ["0x60F68C9B9e50".toLowerCase(),"0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"]));

            // data
            result = await contractInstance.changeMapAll(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[687],[9,0,23,1],ADDRESS_BASE58,TOKEN_ID).send({shouldPollResponse:true}, PRIVATE_KEY);
            assert.equal(util.inspect(result), "[\n"
                + "  BigNumber { _hex: '0x00', _isBigNumber: true },\n"
                + "  '415624c12e308b03a1a6b21d9b86e3942fac1ab92b',\n"
                + "  [\n"
                + "    BigNumber { _hex: '0x09', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x00', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x17', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x01', _isBigNumber: true }\n"
                + "  ],\n"
                + "  uintData: BigNumber { _hex: '0x00', _isBigNumber: true },\n"
                + "  addressData: '415624c12e308b03a1a6b21d9b86e3942fac1ab92b',\n"
                + "  uintArrayDate: [\n"
                + "    BigNumber { _hex: '0x09', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x00', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x17', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x01', _isBigNumber: true }\n"
                + "  ]\n"
                + "]");

            // changeMapAll2--3ceng struct
            result = await contractInstance.changeMapAll2(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[687],[9,0,23,1],"TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s",1000007]]).send({shouldPollResponse:true}, PRIVATE_KEY);
            assert.equal(util.inspect(result), "[\n"
                + "  BigNumber { _hex: '0x0f4247', _isBigNumber: true },\n"
                + "  '415ab90009b529c5406b4f8a6fc4dab8a2bc778c75',\n"
                + "  [\n"
                + "    BigNumber { _hex: '0x09', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x00', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x17', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x01', _isBigNumber: true }\n"
                + "  ],\n"
                + "  tokenData: BigNumber { _hex: '0x0f4247', _isBigNumber: true },\n"
                + "  addressData: '415ab90009b529c5406b4f8a6fc4dab8a2bc778c75'\n"
                + "]");

            // changeMapAll3--4ceng struct
            result = await contractInstance.changeMapAll3(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[[67],[11,2,2323,1001],"TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s",1000007]]]).send({shouldPollResponse:true}, PRIVATE_KEY);
            assert.equal(util.inspect(result), "[\n"
                + "  BigNumber { _hex: '0x0f4247', _isBigNumber: true },\n"
                + "  '415ab90009b529c5406b4f8a6fc4dab8a2bc778c75',\n"
                + "  [\n"
                + "    BigNumber { _hex: '0x0b', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x02', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x0913', _isBigNumber: true },\n"
                + "    BigNumber { _hex: '0x03e9', _isBigNumber: true }\n"
                + "  ],\n"
                + "  tokenData: BigNumber { _hex: '0x0f4247', _isBigNumber: true }\n"
                + "]");

            // StructArray
            result = await contractInstance.changeStructArray([3],[4]).send({shouldPollResponse:true}, PRIVATE_KEY);
            console.log("result3:"+util.inspect(result))

            const structArray = await contractInstance.getStructArray().call();
            console.log("structArray:"+util.inspect(structArray))
            assert.equal(util.inspect(result), util.inspect(structArray));
            contractInstance.getStructArray().call((err, data)=>{
                assert.equal(data.toString(),structArray.toString())
            });

            // bool
            result = await contractInstance.changeBool(true).send({shouldPollResponse:true}, PRIVATE_KEY);
            const bool = await contractInstance.getBool().call();
            assert.equal(util.inspect(result), util.inspect(bool));
            assert.equal(util.inspect(bool), "[ true, boolData: true ]");
            assert.ok(equals(bool.boolData, true));

            // int
            result = await contractInstance.changeInt(68236424).send({shouldPollResponse:true}, PRIVATE_KEY);
            const intValue = await contractInstance.getInt().call();
            assert.equal(util.inspect(result), util.inspect(intValue));
            assert.equal(util.inspect(result), "[\n"
                + "  BigNumber { _hex: '0x04113488', _isBigNumber: true },\n"
                + "  intData: BigNumber { _hex: '0x04113488', _isBigNumber: true }\n"
                + "]");
            assert.ok(equals(intValue.intData, 68236424));
        });
    });

    describe("#call()&send()-outputs-name-test2", async function () {
        let contractAddress1;
        let contractInstance;
        let accounts;
        let tronWeb;
        let emptyAccount;
        before(async function () {
            emptyAccount = await TronWeb.createAccount();
            tronWeb = tronWebBuilder.createInstance();
            await tronWebBuilder.newTestAccountsInMain(2);
            accounts = await tronWebBuilder.getTestAccountsInMain(2);
            const sendTrxTx = await tronWeb.trx.sendTrx(accounts.hex[0], 1000000000);
            assert.isTrue(sendTrxTx.result);
            await wait(5);

            const options = {
                abi: outputNameTest2.abi,
                bytecode: outputNameTest2.bytecode,
                parameters: [accounts.hex[0], TOKEN_ID, ["1"], ["0xdCad3a6d3569DF655070DEd0"]],
                feeLimit: 1000e6
            };
            const createTransaction1 = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
            const createTx1 = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction1);
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
            contractInstance = await tronWeb.contract(outputNameTest2.abi,contractAddress1);
        });

        describe('contractTypes call/send test start()', function () {
            it('should call/send(type is Int) successfully', async function () {
                const val = 123;
                let result = await contractInstance.changeInt(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  BigNumber { _hex: '0x7b', _isBigNumber: true },\n"
                    + "  intData: BigNumber { _hex: '0x7b', _isBigNumber: true }\n"
                    + "]");
                const dataAfter = await contractInstance.getInt().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                const After = parseInt(dataAfter.intData._hex, 16);
                assert.equal(After, val);
            });

            it('should call/send(type is changeUint) successfully', async function () {
                const val = 1123;
                let result = await contractInstance.changeUint(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  BigNumber { _hex: '0x0463', _isBigNumber: true },\n"
                    + "  uintData: BigNumber { _hex: '0x0463', _isBigNumber: true }\n"
                    + "]");
                const dataAfter = await contractInstance.getUint().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                const After = parseInt(dataAfter.uintData._hex, 16);
                assert.equal(After, val);
            });

            it('should call/send(type is changeAddress) successfully', async function () {
                const val = accounts.hex[1];
                let result = await contractInstance.changeAddress(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                const dataAfter = await contractInstance.getAddress().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.addressData, val);
            });

            it('should call/send(type is changeBytes32) successfully', async function () {
                const val = "0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a";
                let result = await contractInstance.changeBytes32(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  '0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a',\n"
                    + "  bytes32Data: '0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105a'\n"
                    + "]");
                const dataAfter = await contractInstance.getBytes32().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.bytes32Data, val);
                contractInstance.getBytes32().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is changeBytes) successfully', async function () {
                const val = "0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105890";
                let result = await contractInstance.changeBytes(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  '0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105890',\n"
                    + "  bytesData: '0xb55a21aaee0ce8f1c8ffaa0dbd23105cb55a21aaee0ce8f1c8ffaa0dbd23105890'\n"
                    + "]");

                const dataAfter = await contractInstance.getBytes().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.bytesData, val);
                contractInstance.getBytes().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is changeString) successfully', async function () {
                const val = "b55a21aaee0ce8f1c8ff122344400403lkkhhj";
                let result = await contractInstance.changeString(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  'b55a21aaee0ce8f1c8ff122344400403lkkhhj',\n"
                    + "  stringData: 'b55a21aaee0ce8f1c8ff122344400403lkkhhj'\n"
                    + "]");

                const dataAfter = await contractInstance.getString().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.stringData, val);
            });

            it('should call/send(type is ActionChoices) successfully', async function () {
                const val = "3";
                let result = await contractInstance.changeActionChoices(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[ 3, enumData: 3 ]");

                const dataAfter = await contractInstance.getActionChoices().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.enumData, val);
                contractInstance.getActionChoices().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is int64[]) successfully', async function () {
                const val = [-111,123];
                let result = await contractInstance.changeInt64NegativeArray(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  [\n"
                    + "    BigNumber { _hex: '-0x6f', _isBigNumber: true },\n"
                    + "    BigNumber { _hex: '0x7b', _isBigNumber: true }\n"
                    + "  ],\n"
                    + "  int64Data: [\n"
                    + "    BigNumber { _hex: '-0x6f', _isBigNumber: true },\n"
                    + "    BigNumber { _hex: '0x7b', _isBigNumber: true }\n"
                    + "  ]\n"
                    + "]");

                const dataAfter = await contractInstance.getInt64NegativeArray().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(parseInt(dataAfter.int64Data[0]._hex, 16), val[0]);
                assert.equal(parseInt(dataAfter.int64Data[1]._hex, 16), val[1]);
                contractInstance.getInt64NegativeArray().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is uint32[2][]) successfully', async function () {
                const val = [[122, 332], [991, 884]];
                let result = await contractInstance.changeInt32Array(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  [ [ 122, 332 ], [ 991, 884 ] ],\n"
                    + "  uint32ArrayData: [ [ 122, 332 ], [ 991, 884 ] ]\n"
                    + "]");

                const dataAfter = await contractInstance.getInt32Array().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.uint32ArrayData[0][0], val[0][0]);
                assert.equal(dataAfter.uint32ArrayData[0][1], val[0][1]);
                assert.equal(dataAfter.uint32ArrayData[1][0], val[1][0]);
                assert.equal(dataAfter.uint32ArrayData[1][1], val[1][1]);
                contractInstance.getInt32Array().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is uint256[2][2]) successfully', async function () {
                const val = [[100, 122], [133, 144]];
                let result = await contractInstance.changeInt256Array(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                })
                assert.equal(util.inspect(result), "[\n"
                    + "  [ [ [BigNumber], [BigNumber] ], [ [BigNumber], [BigNumber] ] ],\n"
                    + "  uint256ArrayData: [ [ [BigNumber], [BigNumber] ], [ [BigNumber], [BigNumber] ] ]\n"
                    + "]");

                const dataAfter = await contractInstance.getInt256Array().call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.uint256ArrayData[0][0], val[0][0]);
                assert.equal(dataAfter.uint256ArrayData[0][1], val[0][1]);
                assert.equal(dataAfter.uint256ArrayData[1][0], val[1][0]);
                assert.equal(dataAfter.uint256ArrayData[1][1], val[1][1]);
                contractInstance.getInt256Array().call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });

            it('should call/send(type is setMappinga(uint256)) successfully', async function () {
                const address = tronWeb.address.fromPrivateKey(PRIVATE_KEY);

                const val = 1122;
                let result = await contractInstance.setMappinga(val).send({
                    feeLimit:1000000000,
                    callValue:0,
                    tokenId:0,
                    tokenValue:0,
                    shouldPollResponse:true
                });
                assert.equal(util.inspect(result), "[\n"
                    + "  BigNumber { _hex: '0x0462', _isBigNumber: true },\n"
                    + "  uint256Data: BigNumber { _hex: '0x0462', _isBigNumber: true }\n"
                    + "]");

                const dataAfter = await contractInstance.getMappinga(address).call();
                assert.equal(util.inspect(result), util.inspect(dataAfter));
                assert.equal(dataAfter.uint256Data, val);
                contractInstance.getMappinga(address).call((err, data)=>{
                    assert.equal(data.toString(),dataAfter.toString())
                });
            });
        });
    });
});
