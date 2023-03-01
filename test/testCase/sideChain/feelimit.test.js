const {ADDRESS_BASE58,PRIVATE_KEY, FEE_LIMIT} = require('../util/config');
const testDeployRevert = require('../util/contracts').testDeployRevert;
const testTriggerError = require('../util/contracts').testTriggerError;
const tronWebBuilder = require('../util/tronWebBuilder');
const broadcaster = require('../util/broadcaster');
const wait = require('../util/wait');
const chai = require('chai');
const assert = chai.assert;
const util = require('util');

describe('TronWeb feelimit test', function() {
    describe('#mainChain', function() {
        const tronWeb = tronWebBuilder.createInstance();
        before(async function () {
            const accountBalanceBefore = await tronWeb.trx.getBalance(ADDRESS_BASE58);
            console.log('accountBalanceBefore: ' + accountBalanceBefore);
            await tronWeb.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, ADDRESS_BASE58)
            // await broadcaster.broadcaster(null, PRIVATE_KEY, await tronWeb.transactionBuilder.freezeBalanceV2(10e6, 'BANDWIDTH',ADDRESS_BASE58));
            await wait(9);
            let accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
            while (accountBalanceAfter!=(accountBalanceBefore-10e6)) {
                await wait(3);
                accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
            }
        })
        describe('#use default feelimit', function () {
            it('createSmartContract use default feelimit in mainChain', async function () {
                // before create
                const accountBalanceBefore = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // createSmartContract
                const options = {
                    abi: testDeployRevert.abi,
                    bytecode: testDeployRevert.bytecode,
                    callValue: 20
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
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const createTxFee = typeof(createInfo.fee)=="undefined"?0:createInfo.fee;
                console.log('createTxFee: ' + createTxFee)

                // after create
                assert.equal(createInfo.result, "FAILED");
                assert.equal(createInfo.receipt.result, "OUT_OF_ENERGY");
                if (createTxFee == 0) {
                    assert.equal(createInfo.receipt.energy_usage_total, 15e5);
                } else {
                    assert.equal(createTxFee, 15e7);
                }
                const accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                assert.equal(accountBalanceBefore-createTxFee, accountBalanceAfter);
            });
            it('triggerSmartContract use default feelimit in mainChain', async function () {
                // createSmartContract
                const options = {
                    abi: testTriggerError.abi,
                    bytecode: testTriggerError.bytecode,
                };
                const createTransaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                console.log("createTransaction:"+util.inspect(createTransaction))
                const createTx = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction);
                console.log("createTx:"+util.inspect(createTx))
                console.log("createTx.transaction.txID:"+createTx.transaction.txID)
                assert.equal(createTx.transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.trx.getTransactionInfo(createTx.transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const contractAddress = createInfo.contract_address;

                // before trigger
                const accountBalanceBefore = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // triggerSmartContract
                const functionSelector = 'testBadJumpDestination()';
                const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                    contractAddress, functionSelector, {}, [], ADDRESS_BASE58);
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
                const triggerTxFee = typeof(triggerInfo.fee)=="undefined"?0:triggerInfo.fee;
                console.log('triggerTxFee: ' + triggerTxFee)

                // after create
                assert.equal(triggerInfo.result, "FAILED");
                assert.equal(triggerInfo.receipt.result, "BAD_JUMP_DESTINATION");
                if (triggerTxFee == 0) {
                    assert.equal(triggerInfo.receipt.energy_usage_total, 15e5);
                } else {
                    assert.equal(triggerTxFee, 15e7);
                }
                const accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                assert.equal(accountBalanceBefore-triggerTxFee, accountBalanceAfter);
            });
        });

        describe('#use customized feelimit', function () {
            it('createSmartContract use customized feelimit in mainChain', async function () {
                // before create
                const accountBalanceBefore = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // createSmartContract
                const options = {
                    abi: testDeployRevert.abi,
                    bytecode: testDeployRevert.bytecode,
                    feeLimit:FEE_LIMIT,
                    callValue: 20
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
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const createTxFee = typeof(createInfo.fee)=="undefined"?0:createInfo.fee;
                console.log('createTxFee: ' + createTxFee)

                // after create
                assert.equal(createInfo.result, "FAILED");
                assert.equal(createInfo.receipt.result, "OUT_OF_ENERGY");
                const accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                if (createTxFee == 0) {
                    assert.equal(createInfo.receipt.energy_usage_total, 1e7);
                    assert.equal(accountBalanceBefore, accountBalanceAfter);
                } else {
                    assert.equal(createTxFee, FEE_LIMIT);
                    assert.equal(accountBalanceBefore-FEE_LIMIT, accountBalanceAfter);
                }
            });
            it('triggerSmartContract use customized feelimit in mainChain', async function () {
                // createSmartContract
                const options = {
                    abi: testTriggerError.abi,
                    bytecode: testTriggerError.bytecode,
                };
                const createTransaction = await tronWeb.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                console.log("createTransaction:"+util.inspect(createTransaction))
                const createTx = await broadcaster.broadcaster(null, PRIVATE_KEY, createTransaction);
                console.log("createTx:"+util.inspect(createTx))
                console.log("createTx.transaction.txID:"+createTx.transaction.txID)
                assert.equal(createTx.transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.trx.getTransactionInfo(createTx.transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const contractAddress = createInfo.contract_address;

                // before trigger
                const accountBalanceBefore = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // triggerSmartContract
                const functionSelector = 'testBadJumpDestination()';
                const triggerOptions = {
                    feeLimit:FEE_LIMIT
                };
                const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                    contractAddress, functionSelector, triggerOptions, [], ADDRESS_BASE58);
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
                const triggerTxFee = typeof(triggerInfo.fee)=="undefined"?0:triggerInfo.fee;
                console.log('triggerTxFee: ' + triggerTxFee)

                // after create
                assert.equal(triggerInfo.result, "FAILED");
                assert.equal(triggerInfo.receipt.result, "BAD_JUMP_DESTINATION");
                const accountBalanceAfter = await tronWeb.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                if (triggerTxFee == 0) {
                    assert.equal(triggerInfo.receipt.energy_usage_total, 1e7);
                    assert.equal(accountBalanceBefore, accountBalanceAfter);
                } else {
                    assert.equal(triggerTxFee, FEE_LIMIT);
                    assert.equal(accountBalanceBefore-FEE_LIMIT, accountBalanceAfter);
                }
            });

        });
    });
    describe('#sideChain', function() {
        const tronWeb = tronWebBuilder.createInstanceSide();
        before(async function () {
            await tronWeb.sidechain.sidechain.trx.freezeBalance(10e6, 3, 'BANDWIDTH', {}, ADDRESS_BASE58);
            let accountBalanceBefore1 = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
            console.log('accountBalanceBefore1: ' + accountBalanceBefore1);
            while (true) {
                let accountBalanceBefore2 = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                if (accountBalanceBefore1 == accountBalanceBefore2) {
                    console.log('accountBalanceBefore2: ' + accountBalanceBefore2);
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        })
        describe('#use default feelimit', function () {
            it('createSmartContract use default feelimit in sideChain', async function () {
                // before create
                const accountBalanceBefore = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // createSmartContract
                const options = {
                    abi: testDeployRevert.abi,
                    bytecode: testDeployRevert.bytecode,
                    callValue: 20
                };
                const transaction = await tronWeb.sidechain.sidechain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, transaction);
                console.log("transaction.txID:"+transaction.txID)
                assert.equal(transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const createTxFee = typeof(createInfo.fee)=="undefined"?0:createInfo.fee;
                console.log('createTxFee: ' + createTxFee)

                // after create
                assert.equal(createInfo.result, "FAILED");
                assert.equal(createInfo.receipt.result, "OUT_OF_ENERGY");
                if (createTxFee == 0) {
                    assert.equal(createInfo.receipt.energy_usage_total, 15e5);
                } else {
                    assert.equal(createTxFee, 15e7);
                }
                const accountBalanceAfter = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                assert.equal(parseInt(accountBalanceBefore)-createTxFee, accountBalanceAfter);
            });
            it('triggerSmartContract use default feelimit in sideChain', async function () {
                // createSmartContract
                const options = {
                    abi: testTriggerError.abi,
                    bytecode: testTriggerError.bytecode,
                };
                const createTransaction = await tronWeb.sidechain.sidechain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                console.log("createTransaction:"+util.inspect(createTransaction))
                const createTx = await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, createTransaction);
                console.log("createTx:"+util.inspect(createTx))
                console.log("createTx.transaction.txID:"+createTx.transaction.txID)
                assert.equal(createTx.transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(createTx.transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const contractAddress = createInfo.contract_address;

                // before trigger
                const accountBalanceBefore = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // triggerSmartContract
                const functionSelector = 'testBadJumpDestination()';
                const triggerTransaction = await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    contractAddress, functionSelector, {}, [], ADDRESS_BASE58);
                console.log("triggerTransaction:"+util.inspect(triggerTransaction))
                const triggerTx = await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, triggerTransaction.transaction);
                console.log("triggerTx:"+util.inspect(triggerTx))
                assert.equal(triggerTx.transaction.txID.length, 64);
                let triggerInfo;
                while (true) {
                    triggerInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(triggerTx.transaction.txID);
                    if (Object.keys(triggerInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("triggerInfo:"+util.inspect(triggerInfo))
                        break;
                    }
                }
                const triggerTxFee = typeof(triggerInfo.fee)=="undefined"?0:triggerInfo.fee;
                console.log('triggerTxFee: ' + triggerTxFee)

                // after create
                assert.equal(triggerInfo.result, "FAILED");
                assert.equal(triggerInfo.receipt.result, "BAD_JUMP_DESTINATION");
                if (triggerTxFee == 0) {
                    assert.equal(triggerInfo.receipt.energy_usage_total, 15e5);
                } else {
                    assert.equal(triggerTxFee, 15e7);
                }
                const accountBalanceAfter = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                assert.equal(parseInt(accountBalanceBefore)-triggerTxFee, accountBalanceAfter);
            });
        });

        describe('#use customized feelimit', function () {
            it('createSmartContract use customized feelimit in sideChain', async function () {
                // before create
                const accountBalanceBefore = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // createSmartContract
                const options = {
                    abi: testDeployRevert.abi,
                    bytecode: testDeployRevert.bytecode,
                    feeLimit:FEE_LIMIT,
                    callValue: 20
                };
                const transaction = await tronWeb.sidechain.sidechain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, transaction);
                console.log("transaction.txID:"+transaction.txID)
                assert.equal(transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const createTxFee = typeof(createInfo.fee)=="undefined"?0:createInfo.fee;
                console.log('createTxFee: ' + createTxFee)

                // after create
                assert.equal(createInfo.result, "FAILED");
                assert.equal(createInfo.receipt.result, "OUT_OF_ENERGY");
                const accountBalanceAfter = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                if (createTxFee == 0) {
                    assert.equal(createInfo.receipt.energy_usage_total, 1e7);
                    assert.equal(parseInt(accountBalanceBefore), accountBalanceAfter);
                } else {
                    assert.equal(createTxFee, FEE_LIMIT);
                    assert.equal(parseInt(accountBalanceBefore)-FEE_LIMIT, accountBalanceAfter);
                }
            });
            it('triggerSmartContract use customized feelimit in sideChain', async function () {
                // createSmartContract
                const options = {
                    abi: testTriggerError.abi,
                    bytecode: testTriggerError.bytecode,
                };
                const createTransaction = await tronWeb.sidechain.sidechain.transactionBuilder.createSmartContract(options, ADDRESS_BASE58);
                console.log("createTransaction:"+util.inspect(createTransaction))
                const createTx = await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, createTransaction);
                console.log("createTx:"+util.inspect(createTx))
                console.log("createTx.transaction.txID:"+createTx.transaction.txID)
                assert.equal(createTx.transaction.txID.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(createTx.transaction.txID);
                    if (Object.keys(createInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                const contractAddress = createInfo.contract_address;

                // before trigger
                const accountBalanceBefore = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceBefore: ' + accountBalanceBefore);

                // triggerSmartContract
                const functionSelector = 'testBadJumpDestination()';
                const triggerOptions = {
                    feeLimit:FEE_LIMIT
                };
                const triggerTransaction = await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    contractAddress, functionSelector, triggerOptions, [], ADDRESS_BASE58);
                console.log("triggerTransaction:"+util.inspect(triggerTransaction))
                const triggerTx = await broadcaster.broadcasterInSideChain(null, PRIVATE_KEY, triggerTransaction.transaction);
                console.log("triggerTx:"+util.inspect(triggerTx))
                assert.equal(triggerTx.transaction.txID.length, 64);
                let triggerInfo;
                while (true) {
                    triggerInfo = await tronWeb.sidechain.sidechain.trx.getTransactionInfo(triggerTx.transaction.txID);
                    if (Object.keys(triggerInfo).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("triggerInfo:"+util.inspect(triggerInfo))
                        break;
                    }
                }
                const triggerTxFee = typeof(triggerInfo.fee)=="undefined"?0:triggerInfo.fee;
                console.log('triggerTxFee: ' + triggerTxFee)

                // after create
                assert.equal(triggerInfo.result, "FAILED");
                assert.equal(triggerInfo.receipt.result, "BAD_JUMP_DESTINATION");
                const accountBalanceAfter = await tronWeb.sidechain.sidechain.trx.getBalance(ADDRESS_BASE58);
                console.log('accountBalanceAfter: ' + accountBalanceAfter);
                assert.equal(parseInt(accountBalanceBefore)-FEE_LIMIT, accountBalanceAfter);
                if (triggerTxFee == 0) {
                    assert.equal(triggerInfo.receipt.energy_usage_total, 1e7);
                    assert.equal(parseInt(accountBalanceBefore), accountBalanceAfter);
                } else {
                    assert.equal(triggerTxFee, FEE_LIMIT);
                    assert.equal(parseInt(accountBalanceBefore)-FEE_LIMIT, accountBalanceAfter);
                }
            });
        });
    });
});

