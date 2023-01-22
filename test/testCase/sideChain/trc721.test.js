const {PRIVATE_KEY,ADDRESS_HEX, MAPPING_FEE, DEPOSIT_FEE, WITHDRAW_FEE, FEE_LIMIT, ADDRESS_BASE58, SIDE_CHAIN} = require('../util/config');
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
    let createTxId;
    let contractAddress;
    let trc721Id;
    let sideChainContractAddress;
    before(async function () {
        let deployMap = await publicMethod.deployTrc721ContractAndMappingAndMint();
        trc721Id = deployMap.get("trc721Id");
        createTxId = deployMap.get("createTxId");
        contractAddress = deployMap.get("contractAddress");
        sideChainContractAddress = deployMap.get("sideChainContractAddress");
    });
    describe('#depositTrc721', function () {
        it('deposit trc721 from main chain to side chain', async function () {
            await wait(10);
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // approveTrc721
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, contractAddress);
            let approveTxFee = approveTrc721Map.get("approveTxFee");
            const mAccountAfter1 = await tronWeb.sidechain.mainchain.trx.getAccount();
            const mTrxBalanceAfter1 = mAccountAfter1.balance;
            console.log('mTrxBalanceAfter1: ' + mTrxBalanceAfter1);
            assert.equal(mTrxBalanceBefore-approveTxFee,mTrxBalanceAfter1);

            // depositTrc721
            let depositTrc721Map = await publicMethod.depositTrc721(trc721Id, contractAddress);
            let depositTxFee = depositTrc721Map.get("depositTxFee");

            // after trx balance
            const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceAfter = mAccountAfter.balance;
            const sTrxBalanceAfter = sAccountAfter.balance;
            console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
            console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
            assert.equal(mTrxBalanceBefore-depositTxFee-approveTxFee,mTrxBalanceAfter);
            assert.equal(sTrxBalanceBefore,sTrxBalanceAfter);

            // after token balance
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(contractAddress);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            let sTrc721OwnerResultAfter=await tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                sideChainContractAddress,
                'ownerOf(uint256)',
                {_isConstant: true},
                [{type: 'uint256', value: trc721Id}]);
            let sTrc721OwnerAfter = sTrc721OwnerResultAfter && sTrc721OwnerResultAfter.result ? sTrc721OwnerResultAfter.constant_result[0].toLocaleString().toLowerCase() : 0;
            sTrc721OwnerAfter = "41"+sTrc721OwnerAfter.substr(24);
            assert.equal(mTrc721BalanceAfter.toUpperCase(),SIDE_CHAIN.sideOptions.mainGatewayAddress_hex.toUpperCase())
            assert.equal(sTrc721OwnerAfter.toUpperCase(),ADDRESS_HEX.toUpperCase())
        });

        it('depositTrc721 with the defined private key', async function () {
            let mintMap = await publicMethod.mintTrc721(contractAddress,1003);
            trc721Id = mintMap.get("trc721Id");
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, contractAddress);
            const options = {};
            const txID = await tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE, FEE_LIMIT, contractAddress, options, PRIVATE_KEY);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('depositTrc721 with permissionId in options object', async function () {
            let mintMap = await publicMethod.mintTrc721(contractAddress,1004);
            trc721Id = mintMap.get("trc721Id");
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, contractAddress);
            const options = { permissionId: 0 };
            const txID = await tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE, FEE_LIMIT, contractAddress, options);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('depositTrc721 with permissionId in options object and the defined private key', async function () {
            let mintMap = await publicMethod.mintTrc721(contractAddress,1005);
            trc721Id = mintMap.get("trc721Id");
            let approveTrc721Map = await publicMethod.approveTrc721(trc721Id, contractAddress);
            const options = { permissionId: 0 };
            const txID = await tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE, FEE_LIMIT, contractAddress, options, PRIVATE_KEY);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('should throw if an invalid num is passed', async function () {
            await assertThrow(
                tronWeb.sidechain.depositTrc721(100.01, DEPOSIT_FEE, FEE_LIMIT, contractAddress),
                'Invalid num provided'
            );
        });

        it('should throw if an invalid fee limit is passed', async function () {
            const feeLimit = 100000000000;
            await assertThrow(
                tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE, feeLimit, contractAddress),
                'Contract validate error : feeLimit must be >= 0 and <= 1000000000'
            );
        });

        it('should throw if an invalid contract address is passed', async function () {
            await assertThrow(
                tronWeb.sidechain.depositTrc721(trc721Id, DEPOSIT_FEE, FEE_LIMIT, 'aaaaaaaaaa'),
                'Invalid contractAddress address provided'
            );
        });
    });

    describe('#mappingTrc721', function () {
        it('mappingTrc721 with the defined private key', async function () {
            let deployMap = await publicMethod.deployTrc721Contract();
            createTxId = deployMap.get("createTxId");
            const options = {};
            const txID = await tronWeb.sidechain.mappingTrc721(createTxId, MAPPING_FEE, FEE_LIMIT, options, PRIVATE_KEY);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('mappingTrc721 with permissionId in options object', async function () {
            const options = { permissionId: 0 };
            const txID = await tronWeb.sidechain.mappingTrc721(createTxId, MAPPING_FEE, FEE_LIMIT, options);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('mappingTrc721 with permissionId in options object and the defined private key', async function () {
            const options = { permissionId: 0 };
            const txID = await tronWeb.sidechain.mappingTrc721(createTxId, MAPPING_FEE, FEE_LIMIT, options, PRIVATE_KEY);
            assert.equal(txID.length, 64);
            console.log("txID: "+txID)
            await wait(20)
        });

        it('should throw if an invalid trxHash', async function () {
            const trxHash = '';
            await assertThrow(
                tronWeb.sidechain.mappingTrc721(trxHash, MAPPING_FEE, FEE_LIMIT),
                'Invalid trxHash provided'
            );
        });

        it('should throw if an invalid fee limit is passed', async function () {
            const feeLimit = 100000000000;
            await assertThrow(
                tronWeb.sidechain.mappingTrc721(createTxId, MAPPING_FEE, feeLimit),
                'Contract validate error : feeLimit must be >= 0 and <= 1000000000'
            );
        });
    });

    describe('#withdrawTrc721', async function () {
        const tronWeb = tronWebBuilder.createInstanceSide();
        it('withdraw trc721 from side chain to main chain', async function () {
            // before trx balance
            const mAccountbefore = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountbefore = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceBefore = mAccountbefore.balance;
            const sTrxBalanceBefore = sAccountbefore.balance;
            console.log('mTrxBalanceBefore: ' + mTrxBalanceBefore);
            console.log('sTrxBalanceBefore: ' + sTrxBalanceBefore);

            // withdrawTrc721
            let withdrawTrc721Map = await publicMethod.withdrawTrc721(trc721Id, sideChainContractAddress);
            let withdrawTxFee = withdrawTrc721Map.get("withdrawTxFee");

            // after trx balance
            const mAccountAfter = await tronWeb.sidechain.mainchain.trx.getAccount();
            const sAccountAfter = await tronWeb.sidechain.sidechain.trx.getAccount();
            const mTrxBalanceAfter = mAccountAfter.balance;
            const sTrxBalanceAfter = sAccountAfter.balance;
            console.log('mTrxBalanceAfter: ' + mTrxBalanceAfter);
            console.log('sTrxBalanceAfter: ' + sTrxBalanceAfter);
            assert.equal(mTrxBalanceBefore,mTrxBalanceAfter);
            assert.equal(sTrxBalanceBefore-withdrawTxFee-WITHDRAW_FEE,sTrxBalanceAfter);

            // after token balance
            let mTrc721Contract = await tronWeb.sidechain.mainchain.contract().at(contractAddress);
            let mTrc721BalanceAfter = await mTrc721Contract.ownerOf(trc721Id).call()
            assert.equal(mTrc721BalanceAfter,ADDRESS_HEX)
            await assertThrow(
                tronWeb.sidechain.sidechain.transactionBuilder.triggerSmartContract(
                    sideChainContractAddress,
                    'ownerOf(uint256)',
                    {_isConstant: true},
                    [{type: 'uint256', value: trc721Id}]
                ),
                'REVERT opcode executed'
            );
        });
    });
});




