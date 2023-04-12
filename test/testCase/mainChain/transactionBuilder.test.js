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
        await tronWebBuilder.newTestAccountsInMain(29);
        accounts = await tronWebBuilder.getTestAccountsInMain(29);
    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.transactionBuilder, TronWeb.TransactionBuilder);
        });

    });

    describe('#sendTrx()', function () {

        it(`should send 10 trx from default address to accounts[1]`, async function () {
            const params = [
                [accounts.b58[1], 10, {permissionId: 2}],
                [accounts.b58[1], 10]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(...param);

                const parameter = txPars(transaction);

                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 10);
                assert.equal(parameter.value.owner_address, ADDRESS_HEX);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2] ? param[2]['permissionId'] : 0);
            }
        });

        it(`should send 10 trx from accounts[0] to accounts[1]`, async function () {
            const params = [
                [accounts.b58[1], 10, accounts.b58[0], {permissionId: 2}],
                [accounts.b58[1], 10, accounts.b58[0]]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(...param);
                const parameter = txPars(transaction);

                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 10);
                assert.equal(parameter.value.owner_address, accounts.hex[0]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.TransferContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[3] ? param[3]['permissionId'] : 0);
            }
        });

        it('should throw if an invalid address is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx('40f0b27e3d16060a5b0e8e995120e00', 10),
                'Invalid recipient address provided'
            );
        });

        it('should throw if an invalid amount is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[2], -10),
                'Invalid amount provided'
            );
        });

        it('should throw if an invalid origin address is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, '40f0b27e3d16060a5b0e8e995120e00'),
                'Invalid origin address provided'
            );
        });


        it('should throw if trying to transfer to itself', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, accounts.hex[3]),
                'Cannot transfer TRX to the same account'
            );
        });

        it('should throw if trying to transfer from an account with not enough funds', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendTrx(accounts.hex[3], 10, emptyAccount.address.base58),
                null,
                'ContractValidateException'
            );
        });
    });

    describe('#createToken()', function () {

        // This test passes only the first time because, in order to test updateToken, we broadcast the token creation

        it(`should allow accounts[2] to create a TestToken`, async function () {

            const options = getTokenOptions();
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[2]);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

            }
        });

        it(`should allow accounts[8] to create a TestToken with voteScore and precision`, async function () {
            const options = getTokenOptions();
            options.voteScore = 5;
            options.precision = 4;

            for (let i = 0; i < 2; i++) {
                if (i === 1) {
                    options.permissionId = 2;
                    options.saleStart = Date.now() + 500;
                    options.saleEnd = Date.now() + 60000;
                }
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[8 + i]);

                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.vote_score, options.voteScore);
                assert.equal(parameter.value.precision, options.precision);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(parameter.value.owner_address, accounts.hex[8 + i]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);

                await broadcaster.broadcaster(null, accounts.pks[8 + i], transaction)

                const tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[8 + i])
                const tokenID = tokenList[options.name].id
                const token = await tronWeb.trx.getTokenByID(tokenID)

                assert.equal(token.vote_score, options.voteScore);
                assert.equal(token.precision, options.precision);
            }
        });

        it(`should create a TestToken passing any number as a string`, async function () {
            const options = getTokenOptions();
            options.totalSupply = '100'
            options.frozenAmount = '5'
            options.frozenDuration = '2'
            options.saleEnd = options.saleEnd.toString()
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[25]);
                const parameter = txPars(transaction);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it(`should create a TestToken without freezing anything`, async function () {
            const options = getTokenOptions();
            options.totalSupply = '100'
            options.frozenAmount = '0'
            options.frozenDuration = '0'
            options.saleEnd = options.saleEnd.toString()
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[1]);
                const parameter = txPars(transaction);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
                console.log("asd")
            }
        });

        it(`should allow create a TestToken with precision is 0 or 6`, async function () {
            const options = getTokenOptions();

            options.precision = 0;
            let transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[11]);
            let parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true));
            const precision = typeof (parameter.value.precision) === 'number' ? (parameter.value.precision) : 0;
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.vote_score, options.voteScore);
            assert.equal(precision, options.precision);
            assert.equal(parameter.value.total_supply, options.totalSupply);
            await assertEqualHex(parameter.value.abbr, options.abbreviation);
            assert.equal(parameter.value.owner_address, accounts.hex[11]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
            await broadcaster.broadcaster(null, accounts.pks[11], transaction)
            await wait(10)
            let tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[11])
            let tokenID = tokenList[options.name].id
            let token = await tronWeb.trx.getTokenByID(tokenID)
            const tokenPrecision = typeof (token.precision) === 'number' ? (token.precision) : 0;
            assert.equal(tokenPrecision, options.precision);

            options.precision = 6;
            options.saleStart = Date.now() + 500;
            options.saleEnd = Date.now() + 60000;
            transaction = await tronWeb.transactionBuilder.createToken(options, accounts.b58[12]);
            parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true));
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.vote_score, options.voteScore);
            assert.equal(parameter.value.precision, options.precision);
            assert.equal(parameter.value.total_supply, options.totalSupply);
            await assertEqualHex(parameter.value.abbr, options.abbreviation);
            assert.equal(parameter.value.owner_address, accounts.hex[12]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
            await broadcaster.broadcaster(null, accounts.pks[12], transaction)
            await wait(10)
            tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[12])
            tokenID = tokenList[options.name].id
            token = await tronWeb.trx.getTokenByID(tokenID)
            assert.equal(token.precision, options.precision);
        });

        it('should throw if an invalid name is passed', async function () {

            const options = getTokenOptions();
            options.name = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token name provided'
            );

        });

        it('should throw if an invalid abbrevation is passed', async function () {

            const options = getTokenOptions();
            options.abbreviation = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token abbreviation provided'
            );

        });

        it('should throw if an invalid supply amount is passed', async function () {

            const options = getTokenOptions();
            options.totalSupply = [];

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Supply amount must be a positive integer'
            );

        });

        it('should throw if TRX ratio is not a positive integer', async function () {

            const options = getTokenOptions();
            options.trxRatio = {};

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'TRX ratio must be a positive integer'
            );

        });

        it('should throw if token ratio is not a positive integer', async function () {

            const options = getTokenOptions();
            options.tokenRatio = 'tokenRatio';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Token ratio must be a positive integer'
            );

        });

        it('should throw if sale start is invalid', async function () {

            const options = getTokenOptions();
            options.saleStart = Date.now() - 1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale start timestamp provided'
            );

            options.saleStart = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale start timestamp provided'
            );

        });

        it('should throw if sale end is invalid', async function () {

            const options = getTokenOptions();
            options.saleEnd = Date.now() - 1000;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale end timestamp provided'
            );

            options.saleEnd = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid sale end timestamp provided'
            );

        });

        it('should throw if an invalid description is passed', async function () {

            const options = getTokenOptions();
            options.description = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token description provided'
            );

            options.description = '';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token description provided'
            );

        });

        it('should throw if an invalid url is passed', async function () {

            const options = getTokenOptions();
            options.url = 123;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

            options.url = '';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

            options.url = '//www.example.com';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid token url provided'
            );

        });

        it('should throw if freeBandwidth is invalid', async function () {

            const options = getTokenOptions();
            options.freeBandwidth = -1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Free bandwidth amount provided'
            );

            options.freeBandwidth = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Free bandwidth amount provided'
            );

        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = getTokenOptions();

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            console.log("accounts.b58[22]:"+util.inspect(accounts.b58[22],true,null,true))
            await assertThrow(
                tronWeb.transactionBuilder.createToken(options,accounts.b58[22]),
                'Invalid Free bandwidth limit provided'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Free bandwidth limit provided'
            );

        });

        it('should throw if frozen supply is invalid', async function () {

            const options = getTokenOptions();
            options.frozenAmount = -1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Frozen supply provided'
            );

            options.frozenAmount = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Frozen supply provided'
            );
        });

        it('should throw if frozen duration is invalid', async function () {
            const options = getTokenOptions();

            options.frozenDuration = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'Invalid Frozen duration provided'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            const options = getTokenOptions();

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options, '0xzzzww'),
                'Invalid issuer address provided'
            );

        });

        it('should throw if precision is invalid', async function () {

            const options = getTokenOptions();
            options.precision = -1;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'precision must be a positive integer >= 0 and <= 6'
            );

            options.precision = 7;

            await assertThrow(
                tronWeb.transactionBuilder.createToken(options),
                'precision must be a positive integer >= 0 and <= 6'
            );

        });

        describe('#createAsset()', function () {

            // This test passes only the first time because, in order to test updateToken, we broadcast the token creation

            it(`should allow accounts[2] to create a TestToken`, async function () {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createAsset(options, accounts.b58[2]);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.total_supply, options.totalSupply);
                await assertEqualHex(parameter.value.abbr, options.abbreviation);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AssetIssueContract');
            });
        });

    });

    describe('#createAccount()', function () {
        it('should create an account by account[3]', async function () {
            const inactiveAccount1 = await tronWeb.createAccount();
            const inactiveAccountAddress1 = inactiveAccount1.address.base58;
            const inactiveAccount2 = await tronWeb.createAccount();
            const inactiveAccountAddress2 = inactiveAccount2.address.base58;

            // permissionId
            let transaction = await tronWeb.transactionBuilder.createAccount(inactiveAccountAddress1, accounts.hex[3], {permissionId: 2});
            let parameter = txPars(transaction);
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.owner_address, accounts.hex[3]);
            assert.equal(parameter.value.account_address, tronWeb.address.toHex(inactiveAccountAddress1).toLowerCase());
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountCreateContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);

            let updateTx = await broadcaster.broadcaster(null, accounts.pks[3], transaction);
            console.log("updateTx1.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);
            console.log("inactiveAccountAddress1:"+inactiveAccountAddress1)
            const in1 = await tronWeb.trx.getAccount(inactiveAccountAddress1);
            assert.equal(in1.address.toLowerCase(), inactiveAccount1.address.hex.toLowerCase());

            // no permissionId
            transaction = await tronWeb.transactionBuilder.createAccount(inactiveAccountAddress2, accounts.hex[3]);
            parameter = txPars(transaction);
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.owner_address, accounts.hex[3]);
            assert.equal(parameter.value.account_address, tronWeb.address.toHex(inactiveAccountAddress2).toLowerCase());
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountCreateContract');

            updateTx = await broadcaster.broadcaster(null, accounts.pks[3], transaction);
            console.log("updateTx2.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);
            const in2 = await tronWeb.trx.getAccount(inactiveAccountAddress2);
            assert.equal(in2.address.toLowerCase(), inactiveAccount2.address.hex.toLowerCase());
        });

        it('should throw if an invalid accountAddress is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.createAccount(123, accounts.b58[4]),
                'Invalid account address provided'
            );
        });

        it('should throw if the issuer address is invalid', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.createAccount(accounts.b58[4], '0xzzzww'),
                'Invalid origin address provided'
            );
        });
    });

    describe('#updateAccount()', function () {

        it(`should update accounts[3]`, async function () {
            const newName = 'New name'
            const params = [
                [newName, accounts.b58[3], {permissionId: 2}],
                [newName, accounts.b58[3]]
            ];

            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.updateAccount(...param);
                const parameter = txPars(transaction);

                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.account_name, newName);
                assert.equal(parameter.value.owner_address, accounts.hex[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountUpdateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2] ? param[2]['permissionId'] : 0);
            }
        });

        it('should throw if an invalid name is passed', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateAccount(123, accounts.b58[4]),
                'Invalid Name provided'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateAccount('New name', '0xzzzww'),
                'Invalid origin address provided'
            );

        });

    });

    describe('#setAccountId()', function () {

        it(`should set account id accounts[4]`, async function () {

            const ids = ['abcabc110', 'testtest', 'jackieshen110'];

            for (let id of ids) {
                let accountId = TronWeb.toHex(id);
                const transaction = await tronWeb.transactionBuilder.setAccountId(accountId, accounts.b58[4]);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.account_id, accountId.slice(2));
                assert.equal(parameter.value.owner_address, accounts.hex[4]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.SetAccountIdContract');
            }

        });

        it('should throw invalid account id error', async function () {

            // account id length should be between 8 and 32
            const ids = ['', '12', '616161616262626231313131313131313131313131313131313131313131313131313131313131']
            for (let id of ids) {
                await assertThrow(
                    tronWeb.transactionBuilder.setAccountId(id, accounts.b58[4]),
                    'Invalid accountId provided'
                );
            }

        });

        it('should throw invalid owner address error', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.setAccountId(TronWeb.toHex('testtest001'), '0xzzzww'),
                'Invalid origin address provided'
            );

        });

        it(`should set account id accounts[4] by multiSign`, async function () {
            const params = [
                [TronWeb.toHex('abcabc220'), accounts.b58[4], {permissionId: 2}],
                [TronWeb.toHex('abcab0000'), accounts.b58[4], {permissionId: 0}],
                [TronWeb.toHex('testtest'), accounts.b58[4]],
            ]

            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                console.log("parameter",parameter);
                assert.equal(parameter.value.account_id, param[0].slice(2));
                assert.equal(parameter.value.owner_address, accounts.hex[4]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.SetAccountIdContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2] ? param[2]['permissionId'] : 0);
            }

        });

        function randomString(e) {
            e = e || 32;
            var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
                a = t.length,
                n = "";
            for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
            return n
        }

        it('shoule set account id by multiSign transaction',async function() {
            const accountsl = {
                b58: [],
                hex: [],
                pks: []
            }
            const idxS = 0;
            const idxE = 2;
            const threshold = 2;
            tronWeb = tronWebBuilder.createInstance();
            const sendTrxTx = await tronWeb.trx.sendTrx(accounts.b58[0], 5000000000);
            const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.b58[1], 500000000);
            assert.isTrue(sendTrxTx.result);
            assert.isTrue(sendTrxTx2.result);
            await wait(15);

            accountsl.pks.push(accounts.pks[1]);
            accountsl.b58.push(accounts.b58[1]);
            accountsl.hex.push(accounts.hex[1]);
            accountsl.pks.push(accounts.pks[0]);
            accountsl.b58.push(accounts.b58[0]);
            accountsl.hex.push(accounts.hex[0]);
            let ownerPk = accounts.pks[1]
            let ownerAddressBase58 = accounts.b58[1];
            let ownerAddress = accounts.hex[1];
            console.log("ownerAddress: "+ownerAddress + "    ownerAddressBase58：" + ownerAddressBase58)

            // update account permission
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = 1;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
            activePermission.keys = [];

            ownerPermission.keys.push({ address: ownerAddress, weight: 1 });
            for (let i = idxS; i < idxE; i++) {
                let address = accountsl.hex[i];
                let weight = 1;
                activePermission.keys.push({ address: address, weight: weight });
            }

            const updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                ownerAddress,
                ownerPermission,
                null,
                [activePermission]
            );

            console.log("updateTransaction:"+util.inspect(updateTransaction))
            await wait(30);
            const updateTx = await broadcaster.broadcaster(null, ownerPk, updateTransaction);
            console.log("updateTx:"+util.inspect(updateTx))
            console.log("updateTx.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);

            const accountID = TronWeb.toHex(randomString(10))
            const param = [accountID, ownerAddressBase58, {permissionId: 2}]
            const transaction = await tronWeb.transactionBuilder.setAccountId(...param);
            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accountsl.pks[i], 2);
            }

            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            await wait(30);
            const ans = await tronWeb.trx.getAccount(ownerAddress);
            assert.isTrue(result.result);
            assert.equal(accountID.replace(/^0x/, ''),ans.account_id,"setaccountID error!")
        });
    });

    describe('#updateToken()', function () {

        let tokenOptions
        let tokenID

        before(async function () {

            this.timeout(10000)

            tokenOptions = getTokenOptions();
            await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[2]), accounts.pks[2])

            let tokenList
            while (!tokenList) {
                await wait(1)
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[2])
            }
            tokenID = tokenList[tokenOptions.name].id
        });

        it(`should allow accounts[2] to update a TestToken`, async function () {
            for (let i = 0; i < 2; i++) {
                if (i === 1) UPDATED_TEST_TOKEN_OPTIONS.permissionId = 2;
                const transaction = await tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.description, UPDATED_TEST_TOKEN_OPTIONS.description);
                await assertEqualHex(parameter.value.url, UPDATED_TEST_TOKEN_OPTIONS.url);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, UPDATED_TEST_TOKEN_OPTIONS.permissionId || 0);
            }
        });

        it('should throw if an invalid description is passed', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.description = 123;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token description provided'
            );

            options.description = '';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token description provided'
            );

        });


        it('should throw if an invalid url is passed', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.url = 123;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

            options.url = '';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

            options.url = '//www.example.com';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Invalid token url provided'
            );

        });

        it('should throw if freeBandwidth is invalid', async function () {

            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);
            options.freeBandwidth = -1;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth amount must be a positive integer'
            );

            options.freeBandwidth = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[2]),
                'Free bandwidth amount must be a positive integer'
            );

        });

        it('should throw if freeBandwidthLimit is invalid', async function () {
            const options = _.clone(UPDATED_TEST_TOKEN_OPTIONS);

            options.freeBandwidth = 10;
            delete options.freeBandwidthLimit;

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[20]),
                'Free bandwidth limit must be a positive integer'
            );

            options.freeBandwidthLimit = 'something';

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(options, accounts.hex[20]),
                'Free bandwidth limit must be a positive integer'
            );

        });

        it('should throw if the issuer address is invalid', async function () {

            await assertThrow(
                tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, '0xzzzww'),
                'Invalid issuer address provided'
            );

        });

        describe('#updateAsset()', async function () {
            it(`should allow accounts[2] to update a TestToken`, async function () {
                const transaction = await tronWeb.transactionBuilder.updateAsset(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[2]);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                await assertEqualHex(parameter.value.description, UPDATED_TEST_TOKEN_OPTIONS.description);
                await assertEqualHex(parameter.value.url, UPDATED_TEST_TOKEN_OPTIONS.url);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
            });
        });

    });

    describe('#purchaseToken()', function () {

        let tokenOptions
        let tokenID

        before(async function () {

            this.timeout(10000)

            tokenOptions = getTokenOptions();

            await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[5]), accounts.pks[5])

            let tokenList
            while (!tokenList) {
                await wait(1)
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[5])
            }
            console.log("tokenList:"+util.inspect(tokenList,true,null,true))
            tokenID = tokenList[tokenOptions.name].id
            assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
        });

        it('should verify that the asset has been created', async function () {

            let token
            token = await tronWeb.trx.getTokenByID(tokenID)
            assert.equal(token.id, tokenID)
            assert.equal(token.name, tokenOptions.name)
        })

        it(`should allow accounts[2] to purchase a token created by accounts[5]`, async function () {
            this.timeout(20000)

            const params = [
                [accounts.b58[5], tokenID, 20, accounts.b58[2], {permissionId: 2}],
                [accounts.b58[5], tokenID, 20, accounts.b58[2]]
            ];

            for (let param of params) {
                await wait(5)
                const transaction = await tronWeb.transactionBuilder.purchaseToken(...param);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.amount, 20);
                assert.equal(parameter.value.owner_address, accounts.hex[2]);
                assert.equal(parameter.value.to_address, accounts.hex[5]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ParticipateAssetIssueContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);
            }
        });

        it("should throw if issuerAddress is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken('sasdsadasfa', tokenID, 20, accounts.b58[2]),
                'Invalid issuer address provided'
            )

        });

        it("should throw if issuerAddress is not the right one", async function () {
            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[4], tokenID, 20, accounts.b58[2]),
                null,
                'The asset is not issued by'
            )
        });

        it("should throw if the token Id is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], 123432, 20, accounts.b58[2]),
                'Invalid token ID provided'
            )
        });

        it("should throw if token does not exist", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], '1110000', 20, accounts.b58[2]),
                null,
                'No asset named '
            )

        });

        it("should throw if buyer address is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], tokenID, 20, 'sasdadasdas'),
                'Invalid buyer address provided'
            )

        });

        it("should throw if amount is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], tokenID, -3, accounts.b58[2]),
                'Invalid amount provided'
            )

            await assertThrow(
                tronWeb.transactionBuilder.purchaseToken(accounts.b58[5], tokenID, "some-amount", accounts.b58[2]),
                'Invalid amount provided'
            )
        });
    });

    describe('#sendToken()', function () {

        let tokenOptions
        let tokenID

        before(async function () {

            this.timeout(30000)

            tokenOptions = getTokenOptions();

            await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[6]), accounts.pks[6])

            let tokenList
            while (!tokenList) {
                await wait(1)
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[6])
            }
            console.log("tokenList2:"+util.inspect(tokenList,true,null,true))
            tokenID = tokenList[tokenOptions.name].id
        });

        it('should verify that the asset has been created', async function () {

            let token
            token = await tronWeb.trx.getTokenByID(tokenID)
            assert.equal(token.id, tokenID)
            assert.equal(token.name, tokenOptions.name)
        })

        it("should allow accounts [7]  to send a token to accounts[1]", async function () {

            this.timeout(30000)

            const params = [
                [accounts.b58[1], 5, tokenID, accounts.b58[7], {permissionId: 2}],
                [accounts.b58[1], 5, tokenID, accounts.b58[7]]
            ];

            for (let param of params) {
                await wait(4)

                await broadcaster.broadcaster(tronWeb.transactionBuilder.purchaseToken(accounts.b58[6], tokenID, 50, accounts.b58[7]), accounts.pks[7])

                await wait(10)

                const transaction = await tronWeb.transactionBuilder.sendToken(...param)

                const parameter = txPars(transaction)

                assert.equal(parameter.value.amount, 5)
                assert.equal(parameter.value.owner_address, accounts.hex[7]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);

            }

        });


        it("should allow accounts [6]  to send a token to accounts[1]", async function () {

            const params = [
                [accounts.b58[1], 5, tokenID, accounts.b58[6], {permissionId: 2}],
                [accounts.b58[1], 5, tokenID, accounts.b58[6]]
            ];

            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.sendToken(...param)

                const parameter = txPars(transaction);

                assert.equal(parameter.value.amount, 5)
                assert.equal(parameter.value.owner_address, accounts.hex[6]);
                assert.equal(parameter.value.to_address, accounts.hex[1]);
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);
            }

        });

        it("should throw if recipient address is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendToken('sadasfdfsgdfgssa', 5, tokenID, accounts.b58[7]),
                'Invalid recipient address provided'
            )

        });

        it("should throw if the token Id is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 5, 143234, accounts.b58[7]),
                'Invalid token ID provided'
            )
        });

        it("should throw if origin address is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 5, tokenID, 213253453453),
                'Invalid origin address provided'
            )

        });

        it("should throw if amount is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], -5, tokenID, accounts.b58[7]),
                'Invalid amount provided'
            )

            await assertThrow(
                tronWeb.transactionBuilder.sendToken(accounts.b58[1], 'amount', tokenID, accounts.b58[7]),
                'Invalid amount provided'
            )
        });
    });

    describe("#createProposal", async function () {

        let parameters = [{"key": 0, "value": 100000}, {"key": 1, "value": 2}]
        const witnessAccount = "TT1smsmhxype64boboU8xTuNZVCKP1w6qT"

        it('should allow the SR account to create a new proposal as a single object', async function () {

            const inputs = [
                [parameters[0], witnessAccount, {permissionId: 2}],
                [parameters[0], witnessAccount]
            ];
            await tronWeb.trx.sendTrx(witnessAccount,10000000000,{privateKey: PRIVATE_KEY})
            for (let input of inputs) {
                const transaction = await tronWeb.transactionBuilder.createProposal(...input)

                const parameter = txPars(transaction);

                assert.equal(parameter.value.owner_address, "41bafb56091591790e00aa05eaddcc7dc1474b5d4b");
                assert.equal(parameter.value.parameters[0].value, parameters[0].value);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, input[2] ? input[2]['permissionId'] : 0);
            }

        })

        it('should allow the SR account to create a new proposal as an array of objects', async function () {

            const inputs = [
                [parameters, witnessAccount, {permissionId: 2}],
                [parameters, witnessAccount]
            ];

            for (let input of inputs) {
                const transaction = await tronWeb.transactionBuilder.createProposal(...input)

                const parameter = txPars(transaction);

                assert.equal(parameter.value.owner_address, "41bafb56091591790e00aa05eaddcc7dc1474b5d4b");
                assert.equal(parameter.value.parameters[0].value, parameters[0].value);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalCreateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, input[2] ? input[2]['permissionId'] : 0);
            }

        })

        it("should throw if issuer address is invalid", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.createProposal(parameters, 'sadasdsffdgdf'),
                'Invalid issuer address provided'
            )

        });


        it("should throw if the issuer address is not an SR", async function () {

            await assertThrow(
                tronWeb.transactionBuilder.createProposal(parameters, accounts.b58[0]),
                null,
                `Witness[${accounts.hex[0]}] not exists`
            )

        });

        // TODO Complete throws

    });

    describe("#deleteProposal", async function () {


        let proposals;
        const witnessAccount = "TT1smsmhxype64boboU8xTuNZVCKP1w6qT"
        const witnessKey = "9FD8E129DE181EA44C6129F727A6871440169568ADE002943EAD0E7A16D8EDAC"

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

            const params = [
                [proposals[0].proposal_id, witnessAccount, {permissionId: 2}],
                [proposals[0].proposal_id, witnessAccount]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.deleteProposal(...param,)
                const parameter = txPars(transaction);

                assert.equal(parameter.value.owner_address, "41bafb56091591790e00aa05eaddcc7dc1474b5d4b");
                assert.equal(parameter.value.proposal_id, proposals[0].proposal_id);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ProposalDeleteContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[2] ? 2 : 0);
            }

        })

        it('should throw trying to cancel an already canceled proposal', async function () {

            await broadcaster.broadcaster(await tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id, witnessAccount), witnessKey);

            await assertThrow(
                tronWeb.transactionBuilder.deleteProposal(proposals[0].proposal_id, witnessAccount),
                null,
                `Proposal[${proposals[0].proposal_id}] canceled`);

        })

        // TODO add invalid params throws

    });

    describe("#voteProposal", function () {
        let proposals;

        before(async function () {
            const sendTrxTransaction = await tronWeb.transactionBuilder.sendTrx(accounts.b58[5], 10000e6);
            await broadcaster.broadcaster(sendTrxTransaction, PRIVATE_KEY);
            waitChainData('tx', sendTrxTransaction.txID);
            const applyForSrTransaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[5], 'url.tron.network');
            await broadcaster.broadcaster(applyForSrTransaction, accounts.pks[5]);
            waitChainData('tx', applyForSrTransaction.txID);
            let parameters = [{ "key": 0, "value": 100000 }, { "key": 1, "value": 2 }]

            await broadcaster.broadcaster(tronWeb.transactionBuilder.createProposal(parameters, WITNESS_ACCOUNT), WITNESS_KEY)
            await wait(45);
            proposals = await tronWeb.trx.listProposals();
            console.log("proposals: "+util.inspect(proposals,true,null,true))

        })

        it('should allow vote proposal', async function () {

            const params = [
                [proposals[0].proposal_id, true, accounts.b58[5], { permissionId: 2 }],
                [proposals[0].proposal_id, true, accounts.b58[5]]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.voteProposal(...param)
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }

        })
    });

    describe("#applyForSR", async function () {

        let url = 'https://xtron.network';

        it('should allow accounts[0] to apply for SR', async function () {

            const transaction = await tronWeb.transactionBuilder.applyForSR(accounts.b58[10], url);
            const parameter = txPars(transaction);

            assert.equal(parameter.value.owner_address, accounts.hex[10]);
            await assertEqualHex(parameter.value.url, url);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WitnessCreateContract');
        });

        // TODO add invalid params throws
    });

    describe.skip("#freezeBalance", async function () {

        it('should allows accounts[1] to freeze its balance', async function () {
            const params = [
                [100e6, 3, 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                [100e6, 3, 'BANDWIDTH', accounts.b58[1]]
            ];

            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.freezeBalance(...param)

                const parameter = txPars(transaction);
                // jlog(parameter)
                assert.equal(parameter.value.owner_address, accounts.hex[1]);
                assert.equal(parameter.value.frozen_balance, 100e6);
                assert.equal(parameter.value.frozen_duration, 3);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id || 0, param[4] ? param[4]['permissionId'] : 0);
            }
        })

        // TODO add invalid params throws

    });

    describe.skip("#unfreezeBalance", async function () {

        // TODO this is not fully testable because the minimum time before unfreezing is 3 days
        async function freezeBandWith() {
            const transaction = await tronWeb.transactionBuilder.freezeBalance(100e6, 0, 'BANDWIDTH', accounts.b58[1]);
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
        };

        it('should unfreeze balance', async function () {
            const params = [
                ['BANDWIDTH', accounts.b58[1], { permissionId: 2 }],
                ['BANDWIDTH', accounts.b58[1]]
            ];

            for (let param of params) {
                await freezeBandWith();
                const transaction = await tronWeb.transactionBuilder.unfreezeBalance(...param)
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
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
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.withdrawBlockRewards(
                    ...param
                );
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);

            }
        });
    });

    describe("#vote", async function () {
        let url = 'https://xtron.network';
        before(async function () {
            /**
             * Execute this method when Proposition 70 is not enabled
             */
            // await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalance(100e6, 3, 'BANDWIDTH', accounts.b58[11]), accounts.pks[11])
            /**
             * Execute this method when Proposition 70 is enabled
             */
            await broadcaster.broadcaster(tronWeb.transactionBuilder.freezeBalanceV2(100e6,'BANDWIDTH', accounts.b58[11]), accounts.pks[11])
        })

        it('should allows accounts[1] to vote for accounts[0] as SR', async function () {
            let votes = {}
            votes[tronWeb.address.toHex(WITNESS_ACCOUNT)] = 5

            const transaction = await tronWeb.transactionBuilder.vote(votes, accounts.b58[11])
            const parameter = txPars(transaction);

            assert.equal(parameter.value.owner_address, accounts.hex[11]);
            assert.equal(parameter.value.votes[0].vote_address, tronWeb.address.toHex(WITNESS_ACCOUNT));
            assert.equal(parameter.value.votes[0].vote_count, 5);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.VoteWitnessContract');
        })

    });

    describe("#createSmartContract", async function () {

        it('should create a smart contract with default parameters', async function () {

            const options = {
                abi: testRevert.abi,
                bytecode: testRevert.bytecode
            };
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const tx = await tronWeb.transactionBuilder.createSmartContract(options)
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 100);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 1e7);
                assert.equal(tx.raw_data.fee_limit, 15e7);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
        });

        it('should create a smart contract with array parameters', async function () {
            this.timeout(20000);
            const bals = [1000, 2000, 3000, 4000];
            const options = {
                abi: arrayParam.abi,
                bytecode: arrayParam.bytecode,
                permissionId: 2,
                parameters: [
                    [accounts.hex[16], accounts.hex[17], accounts.hex[18], accounts.hex[19]],
                    [bals[0], bals[1], bals[2], bals[3]]
                ]
            };
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, accounts.hex[0]);
            await broadcaster.broadcaster(null, accounts.pks[0], transaction);
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
            for (let j = 16; j <= 19; j++) {
                let bal = await deployed.balances(accounts.hex[j]).call();
                bal = bal.toNumber();
                assert.equal(bal, bals[j - 16]);
            }
        });

        it('should create a smart contract with array[3] parameters', async function () {
            const options = {
                abi: testAddressArray.abi,
                bytecode: testAddressArray.bytecode,
                permissionId: 2,
                parameters: [
                    [accounts.hex[16], accounts.hex[17], accounts.hex[18]]
                ]
            };
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options, accounts.hex[0]);
            await broadcaster.broadcaster(null, accounts.pks[0], transaction);
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
            }
        });

        it('should create a smart contract with trctoken and stateMutability parameters', async function () {
            // before token balance
            const accountbefore = await tronWeb.trx.getAccount(ADDRESS_HEX);
            const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);
            const options = {
                abi: trcTokenTest070.abi,
                bytecode: trcTokenTest070.bytecode,
                parameters: [
                    accounts.hex[16], TOKEN_ID, 123
                ],
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                feeLimit: FEE_LIMIT
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

        it('should create a smart contract and verify the parameters', async function () {

            const options = {
                abi: testRevert.abi,
                bytecode: testRevert.bytecode,
                userFeePercentage: 30,
                originEnergyLimit: 9e6,
                feeLimit: 9e8
            };
            for (let i = 0; i < 2; i++) {
                if (i === 1) options.permissionId = 2;
                const tx = await tronWeb.transactionBuilder.createSmartContract(options)
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 30);
                assert.equal(tx.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 9e6);
                assert.equal(tx.raw_data.fee_limit, 9e8);
                assert.equal(tx.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
            }
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
                assert.isTrue(Object.keys(contract.abi).length > 0)

                // clear abi
                const transaction = await tronWeb.transactionBuilder.clearABI(contractAddress, ownerAddress, param[2]);
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

        it('shoule clear contract abi by multiSign transaction',async function() {
            const accountsl = {
                b58: [],
                hex: [],
                pks: []
            }
            const idxS = 0;
            const idxE = 2;
            const threshold = 2;
            tronWeb = tronWebBuilder.createInstance();
            const sendTrxTx = await tronWeb.trx.sendTrx(accounts.b58[7], 5000000000);
            const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.b58[6], 500000000);
            assert.isTrue(sendTrxTx.result);
            assert.isTrue(sendTrxTx2.result);
            await wait(15);

            accountsl.pks.push(accounts.pks[6]);
            accountsl.b58.push(accounts.b58[6]);
            accountsl.hex.push(accounts.hex[6]);
            accountsl.pks.push(accounts.pks[7]);
            accountsl.b58.push(accounts.b58[7]);
            accountsl.hex.push(accounts.hex[7]);
            let ownerPk = accounts.pks[7]

            // update account permission
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = 1;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0300000000000000000000000000000000000000000000000000';
            activePermission.keys = [];

            ownerPermission.keys.push({ address: accounts.hex[7], weight: 1 });
            for (let i = idxS; i < idxE; i++) {
                let address = accountsl.hex[i];
                let weight = 1;
                activePermission.keys.push({ address: address, weight: weight });
            }

            const updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                accounts.hex[7],
                ownerPermission,
                null,
                [activePermission]
            );

            console.log("updateTransaction:"+util.inspect(updateTransaction))
            await wait(30);
            const updateTx = await broadcaster.broadcaster(null, ownerPk, updateTransaction);
            console.log("updateTx:"+util.inspect(updateTx))
            console.log("updateTx.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);

            const param = [transactions[0], accounts.hex[7], {permissionId: 2}];

            const contractAddress = param[0].contract_address;
            const ownerAddress = param[1];

            // verify contract abi before
            const contract = await tronWeb.trx.getContract(contractAddress);
            assert.isTrue(Object.keys(contract.abi).length > 0)

            // clear abi
            const transaction = await tronWeb.transactionBuilder.clearABI(contractAddress, ownerAddress, param[2]);
            const parameter = txPars(transaction);
            assert.isTrue(!transaction.visible &&
                transaction.raw_data.contract[0].parameter.type_url === 'type.googleapis.com/protocol.ClearABIContract');
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.contract_address, tronWeb.address.toHex(contractAddress));
            assert.equal(parameter.value.owner_address, tronWeb.address.toHex(ownerAddress));
            assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);

            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accountsl.pks[i], 2);
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result)
            let contract1;
            // verify contract abi after
            while (true) {
                contract1 = await tronWeb.trx.getContract(contractAddress);
                if (Object.keys(contract1.abi).length > 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.isTrue(Object.keys(contract1.abi).length === 0);
        });

        it('should throw Invalid contract address provided', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.clearABI(null, accounts.hex[1]),
                'Invalid contract address provided'
            );
        });

        it('should throw Invalid owner address provided', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.clearABI(transactions[0].contract_address, null),
                'Invalid owner address provided'
            );
        });
    });

    describe("#updateBrokerage", async function () {

        before(async function () {
            await broadcaster.broadcaster(tronWeb.transactionBuilder.sendTrx(accounts.b58[1], 10000e6), PRIVATE_KEY);
            await broadcaster.broadcaster(tronWeb.transactionBuilder.applyForSR(accounts.b58[1], 'abc.tron.network'), accounts.pks[1])
        })

        it('should update sr brokerage successfully', async function () {
            // const transaction = await tronWeb.transactionBuilder.updateBrokerage(10, accounts.hex[1]);
            const params = [
                [10, accounts.hex[3], {permissionId: 2}],
                [20, accounts.hex[3]]
            ];
            for (const param of params) {
                const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.brokerage, param[0]);
                assert.equal(parameter.value.owner_address, param[1]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateBrokerageContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[2]?.permissionId);
            }
        });

        //before run this case, docker needs to execute ：1.createproposal 30 1 ; 2.approveproposal 1 true
        it('shoule update sr brokerage by multiSign transaction',async function() {
            const accountsl = {
                b58: [],
                hex: [],
                pks: []
            }
            const idxS = 0;
            const idxE = 2;
            const threshold = 2;
            tronWeb = tronWebBuilder.createInstance();
            const sendTrxTx = await tronWeb.trx.sendTrx(accounts.b58[1], 5000000000);
            const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.b58[2], 500000000);
            assert.isTrue(sendTrxTx.result);
            assert.isTrue(sendTrxTx2.result);
            await wait(15);

            accountsl.pks.push(accounts.pks[2]);
            accountsl.b58.push(accounts.b58[2]);
            accountsl.hex.push(accounts.hex[2]);
            accountsl.pks.push(accounts.pks[1]);
            accountsl.b58.push(accounts.b58[1]);
            accountsl.hex.push(accounts.hex[1]);
            let ownerPk = accounts.pks[1]
            let ownerAddressBase58 = accounts.b58[1];
            let ownerAddress = accounts.hex[1];
            console.log("ownerAddress: "+ownerAddress + "    ownerAddressBase58：" + ownerAddressBase58)

            // update account permission
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = 1;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            let witnessPermission = { type: 1, permission_name: 'witness' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0200000000000000000000000000000000000000000000000000';
            activePermission.keys = [];
            witnessPermission.threshold = 1;
            witnessPermission.keys = [];

            ownerPermission.keys.push({ address: ownerAddress, weight: 1 });
            witnessPermission.keys.push({ address:ownerAddress, weight: 1 })
            for (let i = idxS; i < idxE; i++) {
                let address = accountsl.hex[i];
                let weight = 1;
                activePermission.keys.push({ address: address, weight: weight });
            }

            const updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                ownerAddress,
                ownerPermission,
                witnessPermission,
                [activePermission]
            );

            console.log("updateTransaction:"+util.inspect(updateTransaction))
            await wait(30);
            const updateTx = await broadcaster.broadcaster(null, ownerPk, updateTransaction);
            console.log("updateTx:"+util.inspect(updateTx))
            console.log("updateTx.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);

            const cnt = 30
            const param = [cnt, ownerAddress, {permissionId: 2}];
            const transaction = await tronWeb.transactionBuilder.updateBrokerage(...param);
            //
            let signedTransaction = transaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accountsl.pks[i], 2);
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            assert.isTrue(result.result); //It takes about 3-5 minutes for the modification to succeed！
        });

        it('should throw invalid brokerage provided error', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.updateBrokerage(null, accounts.hex[1]),
                'Invalid brokerage provided'
            );
        });

        it('should throw brokerage must be an integer between 0 and 100 error', async function () {
            let brokerages = [-1, 101]
            for (let brokerage of brokerages) {
                await assertThrow(
                    tronWeb.transactionBuilder.updateBrokerage(brokerage, accounts.hex[1]),
                    'Brokerage must be an integer between 0 and 100'
                );
            }
        });

        it('should throw invalid owner address provided error', async function () {
            await assertThrow(
                tronWeb.transactionBuilder.updateBrokerage(10, 'abcd'),
                'Invalid owner address provided'
            );
        });

    });

    describe("#withdrawBlockRewards", async function () {
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
                await broadcaster.broadcaster(null, accounts.pks[i], transaction);
                assert.equal(transaction.txID.length, 64);
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
            let transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1]);
            let parameter = txPars(transaction);

            assert.equal(transaction.txID.length, 64);
            assert.equal(TronWeb.toUtf8(parameter.value.first_token_id), tokenNames[0]);
            assert.equal(TronWeb.toUtf8(parameter.value.second_token_id), tokenNames[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ExchangeCreateContract');
            assert.isUndefined(transaction.raw_data.contract[0].Permission_id);

            transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[0], 10e3, tokenNames[1], 10e3, accounts.hex[toIdx1], {permissionId: 2});
            parameter = txPars(transaction);

            assert.equal(transaction.txID.length, 64);
            assert.equal(TronWeb.toUtf8(parameter.value.first_token_id), tokenNames[0]);
            assert.equal(TronWeb.toUtf8(parameter.value.second_token_id), tokenNames[1]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ExchangeCreateContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
        });

    });

    describe("#createTRXExchange", async function () {
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
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id;
        });
        it(`should inject exchange tokens`, async function () {
            const params = [
                [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                [exchangeId, tokenNames[0], 10]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                    ...param
                );
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
        it(`should withdraw exchange tokens`, async function () {
            const params = [
                [exchangeId, tokenNames[0], 10, { permissionId: 2 }],
                [exchangeId, tokenNames[0], 10]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                    ...param
                );
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
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
            // console.log(tokenNames, 99999999);
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
            await broadcaster.broadcaster(transaction);
            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id;
        });
        it(`should trade exchange tokens`, async function () {
            const params = [
                [exchangeId, tokenNames[0], 10, 5, { permissionId: 2 }],
                [exchangeId, tokenNames[0], 10, 5]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(
                    ...param
                );
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

    describe("#updateSetting", function () {
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
            const params = [
                [transaction.contract_address, 10, accounts.b58[3], { permissionId: 2 }],
                [transaction.contract_address, 20, accounts.b58[3]]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.updateSetting(
                    ...param
                );
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
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
            const params = [
                [transaction.contract_address, 10e6, accounts.b58[3], { permissionId: 2 }],
                [transaction.contract_address, 10e6, accounts.b58[3]]
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.updateEnergyLimit(
                    ...param
                );
                const authResult =
                    TronWeb.utils.transaction.txCheck(transaction);
                assert.equal(authResult, true);
            }
        });
    });

    describe("#accountPermissionUpdate", function () {
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
        it(`should update account permissions`, async function () {
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
                [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives, {permissionId: 2}],
                [accounts.hex[6], permissionData.owner, permissionData.witness, permissionData.actives],
            ];
            for (let param of params) {
                const transaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                    ...param
                );
                const parameter = txPars(transaction);
                assert.equal(transaction.txID.length, 64);
                assert.equal(parameter.value.owner_address, param[0]);
                // assert.deepEqual(parameter.value.owner, param[1]);
                // assert.deepEqual(parameter.value.witness, param[2]);
                // assert.deepEqual(parameter.value.actives, param[3]);
                assert.equal(parameter.type_url, 'type.googleapis.com/protocol.AccountPermissionUpdateContract');
                assert.equal(transaction.raw_data.contract[0].Permission_id, param[4]?.permissionId);
            }
        });

        it('shoule update account permissions by multiSign transaction',async function() {
            const accountsl = {
                b58: [],
                hex: [],
                pks: []
            }
            const idxS = 0;
            const idxE = 2;
            const threshold = 2;
            tronWeb = tronWebBuilder.createInstance();
            const sendTrxTx = await tronWeb.trx.sendTrx(accounts.b58[8], 5000000000);
            const sendTrxTx2 = await tronWeb.trx.sendTrx(accounts.b58[9], 500000000);
            assert.isTrue(sendTrxTx.result);
            assert.isTrue(sendTrxTx2.result);
            await wait(15);

            accountsl.pks.push(accounts.pks[8]);
            accountsl.b58.push(accounts.b58[8]);
            accountsl.hex.push(accounts.hex[8]);
            accountsl.pks.push(accounts.pks[9]);
            accountsl.b58.push(accounts.b58[9]);
            accountsl.hex.push(accounts.hex[9]);

            // update account permission
            let ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = threshold;
            ownerPermission.keys  = [];
            let activePermission = { type: 2, permission_name: 'active0' };
            activePermission.threshold = threshold;
            activePermission.operations = '7fff1fc0037e0300000000000000000000000000000000000000000000000000';
            activePermission.keys = [];

            for (let i = idxS; i < idxE; i++) {
                let address = accountsl.hex[i];
                let weight = 1;
                ownerPermission.keys.push({ address: address, weight: weight });
                activePermission.keys.push({ address: address, weight: weight });
            }

            let updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                accounts.hex[8],
                ownerPermission,
                null,
                [activePermission]
            );

            console.log("updateTransaction:"+util.inspect(updateTransaction))
            await wait(30);
            const updateTx = await broadcaster.broadcaster(null, accounts.pks[8], updateTransaction);
            console.log("updateTx:"+util.inspect(updateTx))
            console.log("updateTx.txID:"+updateTx.transaction.txID)
            assert.equal(updateTx.transaction.txID.length, 64);
            await wait(30);

            let res = await tronWeb.trx.getAccount(accounts.b58[8])
            assert.equal(res.owner_permission.threshold,2,"ownerPermission set 2 users error!")

            ownerPermission = { type: 0, permission_name: 'owner' };
            ownerPermission.threshold = 1;
            ownerPermission.keys  = [];
            ownerPermission.keys.push({ address: accounts.hex[8], weight: 1 });
            updateTransaction = await tronWeb.transactionBuilder.updateAccountPermissions(
                accounts.hex[8],
                ownerPermission,
                null,
                [activePermission]
            );
            let signedTransaction = updateTransaction;
            for (let i = idxS; i < idxE; i++) {
                signedTransaction = await tronWeb.trx.multiSign(signedTransaction, accountsl.pks[i], 0);
            }
            assert.equal(signedTransaction.signature.length, 2);

            // broadcast multi-sign transaction
            const result = await tronWeb.trx.broadcast(signedTransaction);
            await wait(30);
            assert.isTrue(result.result)
            res = await tronWeb.trx.getAccount(accounts.b58[8])
            assert.equal(res.owner_permission.threshold, 1, "multiSign updateAccountPermissions error!")
        });
    });

    describe("Alter existent transactions", async function () {

        describe("#extendExpiration", async function () {

            it('should extend the expiration', async function () {

                const receiver = accounts.b58[20]
                const sender = accounts.hex[21]
                const privateKey = accounts.pks[21]
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                transaction = await tronWeb.transactionBuilder.extendExpiration(transaction, 3600);
                await broadcaster.broadcaster(null, privateKey, transaction);

                assert.notEqual(transaction.txID, previousId)
                assert.equal(balance - await tronWeb.trx.getUnconfirmedBalance(sender), 10);

            });

        });

        describe("#addUpdateData", async function () {

            it('should add a data field', async function () {

                this.timeout(90000)

                const receiver = accounts.b58[22]
                const sender = accounts.hex[23]
                const privateKey = accounts.pks[23]
                const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const data = "Sending money to Bill.";
                transaction = await tronWeb.transactionBuilder.addUpdateData(transaction, data);
                const id = transaction.txID;
                await broadcaster.broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                assert.equal(balance - await tronWeb.trx.getUnconfirmedBalance(sender), 10);
                const unconfirmedTx = await tronWeb.trx.getTransaction(id)
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);

            });

        });

        describe("#alterTransaction", async function () {

            // before(async function() {
            //     await wait(4);
            // })

            it('should alter the transaction adding a data field', async function () {

                const receiver = accounts.b58[24]
                const sender = accounts.hex[25]
                const privateKey = accounts.pks[25]
                // const balance = await tronWeb.trx.getUnconfirmedBalance(sender);

                let transaction = await tronWeb.transactionBuilder.sendTrx(receiver, 10, sender);
                const previousId = transaction.txID;
                const data = "Sending money to Bill.";
                transaction = await tronWeb.transactionBuilder.alterTransaction(transaction, {data});
                const id = transaction.txID;
                console.log("id: "+id)
                assert.notEqual(id, previousId)
                await broadcaster.broadcaster(null, privateKey, transaction);
                await waitChainData('tx', id);
                const unconfirmedTx = await tronWeb.trx.getTransaction(id)
                assert.equal(tronWeb.toUtf8(unconfirmedTx.raw_data.data), data);

            });

        });
    });

    describe("#rawParameter", async function () {
        let param1;
        let param2;
        let contractAddress1;
        let contractAddress2;
        let contractAddress3;
        const totalSupply = 100000000000000000;

        before(async function () {
            param1 = await publicMethod.to64String(ADDRESS_HEX)+ await publicMethod.to64String(TronWeb.fromDecimal(totalSupply));
            param2 = await publicMethod.to64String(accounts.hex[25])+await publicMethod.to64String(TronWeb.fromDecimal(123));
            const tx1 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: [],
                    bytecode: tronToken.bytecode,
                    rawParameter: param1,
                },
                ADDRESS_BASE58
            ), PRIVATE_KEY);
            contractAddress1 = tronWeb.address.fromHex(tx1.transaction.contract_address)

            const tx2 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: [{}],
                    bytecode: tronToken.bytecode,
                    rawParameter: param1,
                },
                ADDRESS_BASE58
            ), PRIVATE_KEY)
            contractAddress2 = tronWeb.address.fromHex(tx2.transaction.contract_address)

            const tx3 = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: tronToken.abi,
                    bytecode: tronToken.bytecode,
                    rawParameter: param1,
                },
                ADDRESS_BASE58
            ), PRIVATE_KEY)
            contractAddress3 = tronWeb.address.fromHex(tx3.transaction.contract_address)
        })

        it("abi is []", async function () {
            // abi:[]
            const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress1, "transfer(address,uint256)",
                {
                    rawParameter: param2,
                },
                [], ADDRESS_BASE58);
            const triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
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
            assert.equal("SUCCESS", triggerInfo.receipt.result);

            const functionSelector = 'balanceOf(address)';
            let param3 = await publicMethod.to64String(ADDRESS_HEX);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress1, functionSelector, {rawParameter: param3},
                [], ADDRESS_BASE58);
            let ownerBalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(ownerBalanceAfter, totalSupply-123);

            let param4 = await publicMethod.to64String(accounts.hex[25]);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress1, functionSelector, {rawParameter: param4},
                [], ADDRESS_BASE58);
            let newAccount1BalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(newAccount1BalanceAfter, 123);
        });
        it("abi is [{}]", async function () {
            // abi:[{}]
            const triggerTransaction2 = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress2, "transfer(address,uint256)",
                {
                    rawParameter: param2,
                },
                [], ADDRESS_BASE58);
            const triggerTx2 = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction2.transaction);
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
            assert.equal("SUCCESS", triggerInfo2.receipt.result);

            const functionSelector = 'balanceOf(address)';
            let param3 = await publicMethod.to64String(ADDRESS_HEX);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress2, functionSelector, {rawParameter: param3},
                [], ADDRESS_BASE58);
            let ownerBalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(ownerBalanceAfter, totalSupply-123);

            let param4 = await publicMethod.to64String(accounts.hex[25]);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress2, functionSelector, {rawParameter: param4},
                [], ADDRESS_BASE58);
            let newAccount1BalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(newAccount1BalanceAfter, 123);
        });

        it('trigger have abi with address and number', async function () {
            // triggerSmartContract
            const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress3, "transfer(address,uint256)",
                {
                    rawParameter: param2,
                },
                [], ADDRESS_BASE58);
            await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTransaction.transaction.txID.length, 64);
            while (true) {
                triggerInfo3 = await tronWeb.trx.getTransactionInfo(triggerTransaction.transaction.txID);
                if (Object.keys(triggerInfo3).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo3:"+util.inspect(triggerInfo3))
                    break;
                }
            }
            assert.equal("SUCCESS", triggerInfo3.receipt.result);

            const functionSelector = 'balanceOf(address)';
            let param3 = await publicMethod.to64String(ADDRESS_HEX);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress3, functionSelector, {rawParameter: param3},
                [], ADDRESS_BASE58);
            let ownerBalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(ownerBalanceAfter, totalSupply-123);

            let param4 = await publicMethod.to64String(accounts.hex[25]);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress3, functionSelector, {rawParameter: param4},
                [], ADDRESS_BASE58);
            let newAccount1BalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(newAccount1BalanceAfter, 123);
        });

        it("abi is {}", async function () {
            // clear abi
            console.log("clear abi")
            const clearAbiTransaction = await tronWeb.transactionBuilder.clearABI(contractAddress3, ADDRESS_BASE58);
            console.log("clearAbiTransaction:"+util.inspect(clearAbiTransaction))
            const clearAbiTx = await broadcaster.broadcaster(null, PRIVATE_KEY, clearAbiTransaction);
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
            const triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress3, "transfer(address,uint256)",
                {
                    rawParameter: param2,
                },
                [], ADDRESS_BASE58);
            await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTransaction.transaction.txID.length, 64);
            while (true) {
                triggerInfo4 = await tronWeb.trx.getTransactionInfo(triggerTransaction.transaction.txID);
                if (Object.keys(triggerInfo4).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("triggerInfo4:"+util.inspect(triggerInfo4))
                    break;
                }
            }
            assert.equal("SUCCESS", triggerInfo4.receipt.result);

            const functionSelector = 'balanceOf(address)';
            let param3 = await publicMethod.to64String(ADDRESS_HEX);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress3, functionSelector, {rawParameter: param3},
                [], ADDRESS_BASE58);
            let ownerBalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(ownerBalanceAfter, totalSupply-246);

            let param4 = await publicMethod.to64String(accounts.hex[25]);
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(contractAddress3, functionSelector, {rawParameter: param4},
                [], ADDRESS_BASE58);
            let newAccount1BalanceAfter = tronWeb.BigNumber(transaction.constant_result[0], 16);
            assert.equal(newAccount1BalanceAfter, 246);
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
            assert.ok(equals(check[0], outputValues[0]));
        });

        it('should create or trigger a smart contract with funcABIV2 (V2 input test send )', async function () {
            const issuerAddress = accounts.hex[0];
            const issuerPk = accounts.pks[0];

            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: funcABIV2_3.abi,
                    bytecode: funcABIV2_3.bytecode,
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
                .contract(funcABIV2_3.abi, transaction.contract_address)
            let txID = await deployed.setStruct(['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY','TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY','TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY']).send();
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            let check = await deployed.s(0).call();
            assert.ok(equals(check, ['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY','TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY','TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY']));
        });

        it('should create or trigger a smart contract with funcABIV2 (V2 input trcToken )', async function () {
            const issuerAddress = accounts.hex[0];
            const issuerPk = accounts.pks[0];

            const transaction = await tronWeb.transactionBuilder.createSmartContract(
                {
                    abi: funcABIV2_4.abi,
                    bytecode: funcABIV2_4.bytecode,
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
                .contract(funcABIV2_4.abi, transaction.contract_address);
            let txID = await deployed.setStruct(['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY', 1000100, 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY']).send();
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            let check = await deployed.s(0).call();
            assert.ok(equals(check, ['TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY', 1000100, 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY']));
        });
    });

    describe("#encodeABIV2 test1 V1 input", async function () {
        const tronWeb = tronWebBuilder.createInstance();
        let contractInstance;
        let contractAddress;
        before(async function () {
            // createSmartContract
            const options = {
                abi: abiV2Test1.abi,
                bytecode: abiV2Test1.bytecode,
                feeLimit:FEE_LIMIT,
                funcABIV2: abiV2Test1.abi[0],
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
            contractInstance = await tronWeb.contract(abiV2Test1.abi,contractAddress);
            const originAddress = await contractInstance.origin().call();
            assert.ok(equals(originAddress, ADDRESS_BASE58));
            const token = parseInt(await contractInstance.token().call(), 10);
            assert.ok(equals(token, TOKEN_ID));
            const strs = await contractInstance.getStrs().call();
            assert.ok(equals(strs, ["q","w","e"]));
            const bys = await contractInstance.getBys().call();
            assert.ok(equals(bys, ["0xf579f9c22b185800e3b6e6886ffc8584215c05a5","0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f"]));
        })

        it('triggerSmartContract&triggerConstantContract', async function () {
            // strs
            let triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeStrs(string[])", {feeLimit:FEE_LIMIT}, [
                    {type: 'string[]', value: ["o","p"]}
                ], ADDRESS_BASE58);
            let triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            let triggerInfo;
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            let transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getStrs()",
                {},
                []);
            assert.equal(transaction.constant_result[0].substr(320,64),'6f00000000000000000000000000000000000000000000000000000000000000')
            assert.equal(transaction.constant_result[0].substr(448,64),'7000000000000000000000000000000000000000000000000000000000000000')

            // bys
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeBys(bytes[])", {feeLimit:FEE_LIMIT}, [
                    {type: 'bytes[]', value: ["0x298fa36a9e2ebd6d3698e552987294fa8b65cd00","0x60f68c9b9e50"]}
                ], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getBys()",
                {},
                []);
            assert.equal(transaction.constant_result[0].substr(320,40),'298fa36a9e2ebd6d3698e552987294fa8b65cd00')
            assert.equal(transaction.constant_result[0].substr(448,12),'60f68c9b9e50')

            // bool
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeBool(bool)", {feeLimit:FEE_LIMIT},
                [
                    {type: 'bool', value: false}
                ], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getBool()",
                {},
                []);
            assert.equal(parseInt(transaction.constant_result[0].substr(63,1),16),0);

            // int
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeInt(int256)", {feeLimit:FEE_LIMIT},
                [
                    {type: 'int256', value: 37497}
                ], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getInt()",
                {},
                []);
            assert.equal(parseInt(transaction.constant_result[0],16),37497);

            // negativeInt
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeNegativeInt(int256)", {feeLimit:FEE_LIMIT},
                [
                    {type: 'int256', value: -37497}
                ], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);

            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getNegativeInt()",
                {},
                []);
            assert.equal(transaction.constant_result[0],'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6d87');
        });
    });

    describe("#encodeABIV2 test1 V2 input", async function () {
        const tronWeb = tronWebBuilder.createInstance();
        let contractInstance;
        let contractAddress;
        before(async function () {
            // createSmartContract
            const options = {
                abi: abiV2Test1.abi,
                bytecode: abiV2Test1.bytecode,
                feeLimit:FEE_LIMIT,
                funcABIV2: abiV2Test1.abi[0],
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
            contractAddress="41674f4632185a848b5cb18172de090112c6ab5676";
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
            contractInstance = await tronWeb.contract(abiV2Test1.abi,contractAddress);
            const originAddress = await contractInstance.origin().call();
            assert.ok(equals(originAddress, ADDRESS_BASE58));
            const token = parseInt(await contractInstance.token().call(), 10);
            assert.ok(equals(token, TOKEN_ID));
            const strs = await contractInstance.getStrs().call();
            assert.ok(equals(strs, ["q","w","e"]));
            const bys = await contractInstance.getBys().call();
            assert.ok(equals(bys, ["0xf579f9c22b185800e3b6e6886ffc8584215c05a5","0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f"]));
        })

        it('send&call', async function () {
            // strs
            await contractInstance.changeStrs(["z","x"]).send({}, PRIVATE_KEY);
            const strs = await contractInstance.getStrs().call();
            assert.ok(equals(strs, ["z","x"]));

            // bys
            await contractInstance.changeBys(["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"]).send({}, PRIVATE_KEY);
            const bys = await contractInstance.getBys().call();
            assert.ok(equals(bys, ["0x60F68C9B9e50".toLowerCase(),"0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"]));

            // data
            let txid=await contractInstance.changeMapAll(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[687],[9,0,23,1],ADDRESS_BASE58,TOKEN_ID).send({}, PRIVATE_KEY);
            let triggerInfo;
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(txid);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.equal(triggerInfo.contractResult[0].substr(88,40),ADDRESS_HEX.substr(2))
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),9)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),0)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),23)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),1)

            // changeMapAll2--3ceng struct
            txid=await contractInstance.changeMapAll2(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[687],[9,0,23,1],"TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s",1000007]]).send({}, PRIVATE_KEY);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(txid);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(0,64),16),1000007)
            assert.equal(triggerInfo.contractResult[0].substr(88,40),"5ab90009b529c5406b4f8a6fc4dab8a2bc778c75")
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),9)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),0)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),23)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),1)

            // changeMapAll3--4ceng struct
            txid=await contractInstance.changeMapAll3(0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[[67],[11,2,2323,1001],"TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s",1000007]]]).send({}, PRIVATE_KEY);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(txid);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(0,64),16),1000007)
            assert.equal(triggerInfo.contractResult[0].substr(88,40),"5ab90009b529c5406b4f8a6fc4dab8a2bc778c75")
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),11)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),2)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),2323)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),1001)

            // StructArray
            txid=await contractInstance.changeStructArray([3],[4]).send({}, PRIVATE_KEY);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(txid);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            const structArray = await contractInstance.getStructArray().call();
            assert.equal(structArray[1],3);
            assert.equal(structArray[2],4);
            contractInstance.getStructArray().call((err, data)=>{
                assert.equal(data.toString(),structArray.toString())
            });

            // bool
            await contractInstance.changeBool(true).send({}, PRIVATE_KEY);
            const bool = await contractInstance.getBool().call();
            assert.ok(equals(bool, true));

            // int
            await contractInstance.changeInt(68236424).send({}, PRIVATE_KEY);
            const intValue = await contractInstance.getInt().call();
            assert.ok(equals(intValue, 68236424));

            // negativeInt
            await contractInstance.changeNegativeInt(-68236424).send({}, PRIVATE_KEY);
            const negativeIntValue = await contractInstance.getNegativeInt().call();
            assert.ok(equals(negativeIntValue, -68236424));
            contractInstance.getNegativeInt().call((err, data)=>{
                assert.equal(data.toString(),negativeIntValue.toString())
            });
        });

        it('triggerSmartContract&triggerConstantContract', async function () {
            // strs
            let triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeStrs(string[])", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[15],parametersV2:[["o","p"]]}, [], ADDRESS_BASE58);
            let triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            let triggerInfo;
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            let transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getStrs()",
                {},
                []);
            assert.equal(transaction.constant_result[0].substr(320,64),'6f00000000000000000000000000000000000000000000000000000000000000')
            assert.equal(transaction.constant_result[0].substr(448,64),'7000000000000000000000000000000000000000000000000000000000000000')

            // bys
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeBys(bytes[])", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[9],parametersV2:[["0x298fa36a9e2ebd6d3698e552987294fa8b65cd00","0x60f68c9b9e50"]]}, [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getBys()",
                {},
                []);
            assert.equal(transaction.constant_result[0].substr(320,40),'298fa36a9e2ebd6d3698e552987294fa8b65cd00')
            assert.equal(transaction.constant_result[0].substr(448,12),'60f68c9b9e50')

            // data
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeMapAll(uint256,string[],uint256,bytes[],(uint256),uint256[],address,trcToken)", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[11],parametersV2:[0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[687],[9,0,23,1],ADDRESS_BASE58,TOKEN_ID]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            console.log("triggerInfo:"+util.inspect(triggerInfo))
            assert.equal(triggerInfo.contractResult[0].substr(88,40),ADDRESS_HEX.substr(2))
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),9)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),0)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),23)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),1)

            // changeMapAll2--3ceng struct
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeMapAll2(uint256,string[],uint256,bytes[],(((uint256),uint256[],address,trcToken)))", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[12],parametersV2:[0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[683],[5,6,68,9],"TV75jZpdmP2juMe1dRwGrwpV6AMU6mr1EU",1000008]]]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(0,64),16),1000008)
            assert.equal(triggerInfo.contractResult[0].substr(88,40),'d1e7a6bc354106cb410e65ff8b181c600ff14292')
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),5)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),6)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),68)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),9)

            // changeMapAll2--4ceng struct
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeMapAll3(uint256,string[],uint256,bytes[],((((uint256),uint256[],address,trcToken))))", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[13],parametersV2:[0,["a","s"],0,["0x60F68C9B9e50","0x298fa36a9e2ebd6d3698e552987294fa8b65cd00"],[[[[683],[5,6,68,9],"TV75jZpdmP2juMe1dRwGrwpV6AMU6mr1EU",1000008]]]]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            console.log("changeMapAll3:"+util.inspect(triggerInfo))
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(0,64),16),1000008)
            assert.equal(triggerInfo.contractResult[0].substr(88,40),'d1e7a6bc354106cb410e65ff8b181c600ff14292')
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(192,64),16),4)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(256,64),16),5)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(320,64),16),6)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(384,64),16),68)
            assert.equal(parseInt(triggerInfo.contractResult[0].substr(448,64),16),9)

            // StructArray
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeStructArray((uint256),(uint256))", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[16],parametersV2:[[909],[404]]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            console.log("StructArray  tx: "+triggerTx.transaction.txID)
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getStructArray()",
                {},
                []);
            assert.equal(parseInt(transaction.constant_result[0].substr(transaction.constant_result[0].length-128,64),16),909);
            assert.equal(parseInt(transaction.constant_result[0].substr(transaction.constant_result[0].length-64,64),16),404);

            // bool
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeBool(bool)", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[8],parametersV2:[false]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getBool()",
                {},
                []);
            assert.equal(parseInt(transaction.constant_result[0].substr(63,1),16),0);

            // int
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeInt(int256)", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[10],parametersV2:[37497]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);
            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getInt()",
                {},
                []);
            assert.equal(parseInt(transaction.constant_result[0],16),37497);

            // negativeInt
            triggerTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                contractAddress, "changeNegativeInt(int256)", {feeLimit:FEE_LIMIT,funcABIV2:abiV2Test1.abi[14],parametersV2:[-37497]},
                [], ADDRESS_BASE58);
            triggerTx = await broadcaster.broadcaster(null, PRIVATE_KEY, triggerTransaction.transaction);
            assert.equal(triggerTx.transaction.txID.length, 64);

            while (true) {
                triggerInfo = await tronWeb.trx.getTransactionInfo(triggerTx.transaction.txID);
                if (Object.keys(triggerInfo).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            transaction = await tronWeb.transactionBuilder.triggerConstantContract(
                contractAddress,
                "getNegativeInt()",
                {},
                []);
            assert.equal(transaction.constant_result[0],'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6d87');
        });
    });

    describe("#freezeBalanceV2", async function () {
        it('has amount resource address[account0] options', async function () {
            let transaction = await tronWeb.transactionBuilder.freezeBalanceV2(4e6, 'BANDWIDTH', accounts.b58[0], {permissionId: 2});
            let tx = await broadcaster.broadcaster(null, accounts.pks[0], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.frozen_balance, 4e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
            let accountInfo = await tronWeb.trx.getAccount(accounts.b58[0]);
            let accountResource = await tronWeb.trx.getAccountResources(accounts.b58[0])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[0].amount, 4e6);
            assert.equal(accountResource.tronPowerLimit, 4);

            transaction = await tronWeb.transactionBuilder.freezeBalanceV2(3e6, 'ENERGY', accounts.hex[0]);
            tx = await broadcaster.broadcaster(null, accounts.pks[0], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.frozen_balance, 3e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            accountInfo = await tronWeb.trx.getAccount(accounts.hex[0]);
            accountResource = await tronWeb.trx.getAccountResources(accounts.b58[0])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[1].type, 'ENERGY');
            assert.equal(accountInfo.frozenV2[1].amount, 3e6);
            assert.equal(accountResource.tronPowerLimit, 7);
        })

        it('has amount resource address[account1] options', async function () {
            let transaction = await tronWeb.transactionBuilder.freezeBalanceV2(5e6, 'ENERGY', accounts.b58[1], {permissionId: 2});
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.value.frozen_balance, 5e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
            let accountInfo = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResource = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[1].type, 'ENERGY');
            assert.equal(accountInfo.frozenV2[1].amount, 5e6);
            assert.equal(accountResource.tronPowerLimit, 5);

            transaction = await tronWeb.transactionBuilder.freezeBalanceV2(6e6, 'BANDWIDTH', accounts.hex[1]);
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.frozen_balance, 6e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            accountInfo = await tronWeb.trx.getAccount(accounts.hex[1]);
            accountResource = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[0].amount, 6e6);
            assert.equal(accountResource.tronPowerLimit, 11);
        })

        it('no params use default value', async function () {
            let accountResourceBeofre = await tronWeb.trx.getAccountResources()
            let accountBefore = await tronWeb.trx.getAccount();
            let transaction = await tronWeb.transactionBuilder.freezeBalanceV2(1e6);
            let tx = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.frozen_balance, 1e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.FreezeBalanceV2Contract');
            let accountResourceAfter = await tronWeb.trx.getAccountResources()
            let accountAfter = await tronWeb.trx.getAccount();
            console.log("accountResourceAfter: "+util.inspect(accountResourceAfter,true,null,true))
            console.log("accountAfter: "+util.inspect(accountAfter,true,null,true))
            assert.equal(accountAfter.frozenV2[0].amount, accountBefore.frozenV2[0].amount+1e6);
            assert.equal(accountResourceAfter.tronPowerLimit, accountResourceBeofre.tronPowerLimit+1);
        })

        it('should throw if owner address is invalid', async function () {
            const params = [
                [100e6, 'BANDWIDTH', 'ddssddd', {permissionId: 2}],
                [100e6, 'BANDWIDTH', 'ddssddd'],
                [100e6, 'ENERGY', 'ddssddd', {permissionId: 2}],
                [100e6, 'ENERGY', 'ddssddd']
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.freezeBalanceV2(...param),
                    'Invalid origin address provided'
                )
            }
        })

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                ['-100', 'BANDWIDTH', accounts.b58[1]],
                ['-100', 'ENERGY', accounts.b58[1], {permissionId: 2}],
                ['-100', 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.freezeBalanceV2(...param),
                    'Invalid amount provided'
                )
            }
        })

        it('should throw if resource is invalid', async function () {
            const params = [
                [100e6, 'aabbccdd', accounts.b58[1], {permissionId: 2}],
                [100e6, 'aabbccdd', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.freezeBalanceV2(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                )
            }
        })
    });

    // need excute #freezeBalanceV2 before
    describe("#unfreezeBalanceV2", async function () {
        it('has amount resource address[account0] options', async function () {
            let transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(3e6, 'BANDWIDTH', accounts.b58[0], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[0], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.unfreeze_balance, 3e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
            let accountInfo = await tronWeb.trx.getAccount(accounts.b58[0]);
            let accountResource = await tronWeb.trx.getAccountResources(accounts.b58[0])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[0].amount, 1e6);
            assert.equal(accountInfo.unfrozenV2[0].unfreeze_amount, 3e6);
            assert.equal(accountResource.tronPowerLimit, 4);

            transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(2e6, 'ENERGY', accounts.b58[0])
            tx = await broadcaster.broadcaster(null, accounts.pks[0], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[0]);
            assert.equal(parameter.value.unfreeze_balance, 2e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            accountInfo = await tronWeb.trx.getAccount(accounts.hex[0]);
            accountResource = await tronWeb.trx.getAccountResources(accounts.b58[0])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[1].type, 'ENERGY');
            assert.equal(accountInfo.frozenV2[1].amount, 1e6);
            assert.equal(accountResource.tronPowerLimit, 2);
        })

        it('has amount resource address[account1] options', async function () {
            let transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(5e6, 'ENERGY', accounts.b58[1], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.unfreeze_balance, 5e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id, 2);
            let accountInfo = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResource = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.equal(accountInfo.frozenV2[1].type, 'ENERGY');
            assert.isUndefined(accountInfo.frozenV2[1].amount);
            assert.equal(accountResource.tronPowerLimit, 6);

            transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(6e6, 'BANDWIDTH', accounts.b58[1])
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.unfreeze_balance, 6e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            accountInfo = await tronWeb.trx.getAccount(accounts.hex[1]);
            accountResource = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountInfo: "+util.inspect(accountInfo,true,null,true))
            console.log("accountResource: "+util.inspect(accountResource,true,null,true))
            assert.isUndefined(accountInfo.frozenV2[0].amount);
            assert.isUndefined(accountResource.tronPowerLimit);
        })

        it('no params use default value', async function () {
            let accountResourceBeofre = await tronWeb.trx.getAccountResources()
            let accountBefore = await tronWeb.trx.getAccount();
            let transaction = await tronWeb.transactionBuilder.unfreezeBalanceV2(1e6);
            let tx = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            console.log("tx:"+util.inspect(tx))
            console.log("tx.txID:"+tx.transaction.txID)
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            console.log("parameter: "+util.inspect(parameter,true,null,true))
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.unfreeze_balance, 1e6);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract');
            let accountResourceAfter = await tronWeb.trx.getAccountResources()
            let accountAfter = await tronWeb.trx.getAccount();
            console.log("accountResourceAfter: "+util.inspect(accountResourceAfter,true,null,true))
            console.log("accountAfter: "+util.inspect(accountAfter,true,null,true))
            assert.equal(accountAfter.frozenV2[0].amount, accountBefore.frozenV2[0].amount-1e6);
            assert.equal(accountResourceAfter.tronPowerLimit, accountResourceBeofre.tronPowerLimit-1);
        })

        it('should throw if owner address is invalid', async function () {
            const params = [
                [100e6, 'BANDWIDTH', 'ddssddd', {permissionId: 2}],
                [100e6, 'BANDWIDTH', 'ddssddd'],
                [100e6, 'ENERGY', 'ddssddd', {permissionId: 2}],
                [100e6, 'ENERGY', 'ddssddd']
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.unfreezeBalanceV2(...param),
                    'Invalid origin address provided'
                )
            }
        })

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                ['-100', 'BANDWIDTH', accounts.b58[1]],
                ['-100', 'ENERGY', accounts.b58[1], {permissionId: 2}],
                ['-100', 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.unfreezeBalanceV2(...param),
                    'Invalid amount provided'
                )
            }
        })

        it('should throw if resource is invalid', async function () {
            const params = [
                [100e6, 'aabbccdd', accounts.b58[1], {permissionId: 2}],
                [100e6, 'aabbccdd', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.unfreezeBalanceV2(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                )
            }
        })
    });

    describe("#delegateResource", async function () {
        before(async () => {
            const transaction = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'BANDWIDTH', accounts.b58[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction);

            const transaction2 = await tronWeb.transactionBuilder.freezeBalanceV2(100e6, 'ENERGY', accounts.hex[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction2);

            const transaction3 = await tronWeb.transactionBuilder.freezeBalanceV2(50e6);
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction3);
            await wait(40);
        });

        it('resource is BANDWIDTH and multisign、normal and lock is default false', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, 10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1])
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[0].amount, accountAfter1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter2.delegated_frozenV2_balance_for_bandwidth, accountAfter1.delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource is ENERGY and multisign、normal and lock is default false', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY', accounts.b58[1], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[1].amount, accountBefore1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter1.account_resource.delegated_frozenV2_balance_for_energy, 10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY', accounts.b58[1])
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[1].amount, accountAfter1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter2.account_resource.delegated_frozenV2_balance_for_energy, accountAfter1.account_resource.delegated_frozenV2_balance_for_energy+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource is BANDWIDTH and multisign、normal and lock is true', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], true, {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.lock, true);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore1.delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH',accounts.b58[1], true)
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.lock, true);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[0].amount, accountAfter1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter2.delegated_frozenV2_balance_for_bandwidth, accountAfter1.delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource is BANDWIDTH and multisign、normal and lock is false', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1], false, {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore1.delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'BANDWIDTH',  accounts.b58[1], false)
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[0].amount, accountAfter1.frozenV2[0].amount-10e6);
            assert.equal(accountAfter2.delegated_frozenV2_balance_for_bandwidth, accountAfter1.delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource is ENERGY and multisign、normal and lock is true', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY', accounts.b58[1], true, {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(40);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.lock, true);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[1].amount, accountBefore1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter1.account_resource.delegated_frozenV2_balance_for_energy,  accountBefore1.account_resource.delegated_frozenV2_balance_for_energy+10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY',accounts.b58[1], true)
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.lock, true);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[1].amount, accountAfter1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter2.account_resource.delegated_frozenV2_balance_for_energy, accountAfter1.account_resource.delegated_frozenV2_balance_for_energy+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource is ENERGY and multisign、normal and lock is false', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            console.log("accountBefore1: "+util.inspect(accountBefore1,true,null,true))
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY', accounts.b58[1], false, {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[1].amount, accountBefore1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter1.account_resource.delegated_frozenV2_balance_for_energy, accountBefore1.account_resource.delegated_frozenV2_balance_for_energy + 10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7], 'ENERGY',  accounts.b58[1], false)
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[1].amount, accountAfter1.frozenV2[1].amount-10e6);
            assert.equal(accountAfter2.account_resource.delegated_frozenV2_balance_for_energy, accountAfter1.account_resource.delegated_frozenV2_balance_for_energy+10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('resource、ownerAddress、lock is default', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(ADDRESS_BASE58);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(ADDRESS_BASE58)
            let transaction = await tronWeb.transactionBuilder.delegateResource(10e6, accounts.b58[7])
            let tx = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.resource);
            assert.isUndefined(parameter.value.lock);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.DelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter1 = await tronWeb.trx.getAccount(ADDRESS_HEX);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(ADDRESS_HEX)
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount-10e6);
            const accountBefore_delegated_frozenV2_balance_for_bandwidth = accountBefore1.delegated_frozenV2_balance_for_bandwidth?accountBefore1.delegated_frozenV2_balance_for_bandwidth:0;
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore_delegated_frozenV2_balance_for_bandwidth+10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);
        })

        it('should throw if owner address is invalid', async function () {
            const params = [
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd', {permissionId: 2}],
                [100e6, accounts.b58[7], 'BANDWIDTH',  'ddssddd'],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd', {permissionId: 2}],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd']
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Invalid origin address provided'
                )
            }
        })

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', accounts.b58[7], 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                ['-100', accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
                ['-100', accounts.b58[7], 'ENERGY', accounts.b58[1], {permissionId: 2}],
                ['-100', accounts.b58[7], 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Invalid amount provided'
                )
            }
        })

        it('should throw if resource is invalid', async function () {
            const params = [
                [100e6, accounts.b58[7], 'aabbccdd', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[7], 'aabbccdd', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                )
            }
        })

        it('should throw if receiver address is invalid', async function () {
            const params = [
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1]],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1], {permissionId: 2}],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Invalid receiver address provided'
                )
            }
        })

        it('should throw if receiver address is the same as from address', async function () {
            const params = [
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1]],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.delegateResource(...param),
                    'Receiver address must not be the same as owner address'
                )
            }
        })
    });

    describe("#undelegateResource", async function () {
        before(async () => {
            await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(60e6, 'BANDWIDTH', accounts.b58[1]));
            await broadcaster.broadcaster(null, accounts.pks[1], await tronWeb.transactionBuilder.freezeBalanceV2(60e6, 'ENERGY', accounts.b58[1]));
            await broadcaster.broadcaster(null, PRIVATE_KEY, await tronWeb.transactionBuilder.freezeBalanceV2(60e6));
            await wait(40);
            const transaction = await tronWeb.transactionBuilder.delegateResource(50e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            const transaction2 = await tronWeb.transactionBuilder.delegateResource(50e6, accounts.b58[7], 'ENERGY', accounts.b58[1]);
            await broadcaster.broadcaster(null, accounts.pks[1], transaction2);
            const transaction3 = await tronWeb.transactionBuilder.delegateResource(50e6, accounts.b58[7]);
            await broadcaster.broadcaster(null, PRIVATE_KEY, transaction3);
            await wait(30);
        });

        it('resource is BANDWIDTH and multisign、normal address', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.undelegateResource(10e6, accounts.hex[7], 'BANDWIDTH', accounts.hex[1], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.resource);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount+10e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore1.delegated_frozenV2_balance_for_bandwidth-10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.undelegateResource(10e6, accounts.b58[7], 'BANDWIDTH', accounts.b58[1])
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.resource);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[0].amount, accountAfter1.frozenV2[0].amount+10e6);
            assert.equal(accountAfter2.delegated_frozenV2_balance_for_bandwidth, accountAfter1.delegated_frozenV2_balance_for_bandwidth-10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceAfter1.tronPowerLimit);
        })

        it('resource is ENERGY and multisign、normal address', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            let transaction = await tronWeb.transactionBuilder.undelegateResource(10e6, accounts.hex[7], 'ENERGY', accounts.hex[1], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[1].amount, accountBefore1.frozenV2[1].amount+10e6);
            assert.equal(accountAfter1.account_resource.delegated_frozenV2_balance_for_energy, accountBefore1.account_resource.delegated_frozenV2_balance_for_energy-10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

            transaction = await tronWeb.transactionBuilder.undelegateResource(10e6, accounts.b58[7], 'ENERGY', accounts.b58[1])
            tx = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.equal(parameter.value.resource, 'ENERGY');
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter2 = await tronWeb.trx.getAccount(accounts.b58[1]);
            let accountResourceAfter2 = await tronWeb.trx.getAccountResources(accounts.b58[1])
            console.log("accountAfter2: "+util.inspect(accountAfter2,true,null,true))
            console.log("accountResourceAfter2: "+util.inspect(accountResourceAfter2,true,null,true))
            assert.equal(accountAfter2.frozenV2[1].amount, accountAfter1.frozenV2[1].amount+10e6);
            assert.equal(accountAfter2.account_resource.delegated_frozenV2_balance_for_energy, accountAfter1.account_resource.delegated_frozenV2_balance_for_energy-10e6);
            assert.equal(accountResourceAfter2.tronPowerLimit, accountResourceAfter1.tronPowerLimit);
        })

        it('resource、ownerAddress is default', async function () {
            let accountBefore1 = await tronWeb.trx.getAccount();
            let accountResourceBefore1 = await tronWeb.trx.getAccountResources()
            let transaction = await tronWeb.transactionBuilder.undelegateResource(10e6, accounts.hex[7])
            let tx = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, ADDRESS_HEX);
            assert.equal(parameter.value.receiver_address, accounts.hex[7]);
            assert.equal(parameter.value.balance, 10e6);
            assert.isUndefined(parameter.value.resource);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UnDelegateResourceContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 0);
            let accountAfter1 = await tronWeb.trx.getAccount();
            let accountResourceAfter1 = await tronWeb.trx.getAccountResources()
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            console.log("accountResourceAfter1: "+util.inspect(accountResourceAfter1,true,null,true))
            assert.equal(accountAfter1.frozenV2[0].amount, accountBefore1.frozenV2[0].amount+10e6);
            assert.equal(accountAfter1.delegated_frozenV2_balance_for_bandwidth, accountBefore1.delegated_frozenV2_balance_for_bandwidth-10e6);
            assert.equal(accountResourceAfter1.tronPowerLimit, accountResourceBefore1.tronPowerLimit);

        })

        it('should throw if owner address is invalid', async function () {
            const params = [
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd', {permissionId: 2}],
                [100e6, accounts.b58[7], 'BANDWIDTH', 'ddssddd'],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd', {permissionId: 2}],
                [100e6, accounts.b58[7], 'ENERGY', 'ddssddd']
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Invalid origin address provided'
                )
            }
        })

        it('should throw if frozen balance is invalid', async function () {
            const params = [
                ['-100', accounts.b58[7], 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                ['-100', accounts.b58[7], 'BANDWIDTH', accounts.b58[1]],
                ['-100', accounts.b58[7], 'ENERGY', accounts.b58[1], {permissionId: 2}],
                ['-100', accounts.b58[7], 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Invalid amount provided'
                )
            }
        })

        it('should throw if resource is invalid', async function () {
            const params = [
                [100e6, accounts.b58[7], 'aabbccdd', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[7], 'aabbccdd', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'
                )
            }
        })

        it('should throw if receiver address is invalid', async function () {
            const params = [
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                [100e6, 'adskjkkk', 'BANDWIDTH', accounts.b58[1]],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1], {permissionId: 2}],
                [100e6, 'adskjkkk', 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Invalid receiver address provided'
                )
            }
        })

        it('should throw if receiver address is the same as from address', async function () {
            const params = [
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[1], 'BANDWIDTH', accounts.b58[1]],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1], {permissionId: 2}],
                [100e6, accounts.b58[1], 'ENERGY', accounts.b58[1]]
            ];

            for (let param of params) {
                await assertThrow(
                    tronWeb.transactionBuilder.undelegateResource(...param),
                    'Receiver address must not be the same as owner address'
                )
            }
        })
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
            assert.isTrue(accountBefore1.unfrozenV2[0].unfreeze_amount > 0);
            let transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(accounts.b58[3], {permissionId: 2})
            let tx = await broadcaster.broadcaster(null, accounts.pks[3], transaction);
            console.log("tx:"+util.inspect(tx))
            assert.equal(tx.transaction.txID.length, 64);
            await wait(30);
            let parameter = txPars(transaction);
            assert.equal(parameter.value.owner_address, accounts.hex[3]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract');
            assert.equal(transaction.raw_data.contract[0].Permission_id || 0, 2);
            let accountAfter1 = await tronWeb.trx.getAccount(accounts.b58[3]);
            console.log("accountAfter1: "+util.inspect(accountAfter1,true,null,true))
            assert.isUndefined(accountAfter1.unfrozenV2);

            await broadcaster.broadcaster(null, accounts.pks[3], await tronWeb.transactionBuilder.unfreezeBalanceV2(10e6, 'ENERGY', accounts.hex[3]));
            await wait(35);
            let accountBefore2 = await tronWeb.trx.getAccount(accounts.b58[3]);
            console.log("accountBefore2: "+util.inspect(accountBefore2,true,null,true))
            assert.isTrue(accountBefore2.unfrozenV2[0].unfreeze_amount > 0);
            transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze(accounts.hex[3])
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
            let transaction = await tronWeb.transactionBuilder.withdrawExpireUnfreeze()
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

    describe("#estimateEnergy", async function () {

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
            // contractAddressWithTrctoken = 'TNm3SMJsk15nqTn3TVaoBSg9JWQ3G2JzHr';
        })

        it('estimateEnergy simple', async function () {
            const issuerAddress = accounts.hex[6];
            const functionSelector = 'testPure(uint256,uint256)';
            const parameter = [
                {type: 'uint256', value: 1},
                {type: 'uint256', value: 2}
            ]
            const options1 = {estimateEnery: true, confirmed: true};
            let energyRequired1;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options1.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddress, functionSelector, options1,
                    parameter, issuerAddress);
                console.log("result1: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired1 = result.energy_required;
            }

            const options2 = {estimateEnery: true};
            let energyRequired2;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options2.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddress, functionSelector, options2,
                    parameter, issuerAddress);
                console.log("result2: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired2 = result.energy_required;
            }
            assert.equal(energyRequired1,energyRequired2)
        });

        it('estimateEnergy with array[2] parameters', async function () {
            const functionSelector = 'transferWith2(address[2],uint256[2])';
            const parameter = [
                {type: 'address[2]', value: [accounts.hex[16], accounts.hex[17]]},
                {type: 'uint256[2]', value: [123456, 123456]}
            ]
            const options1 = {estimateEnery: true, confirmed: true};
            let energyRequired1;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options1.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithArray, functionSelector, options1,
                    parameter, accounts.hex[6]);
                console.log("result1: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired1 = result.energy_required;
            }

            const options2 = {estimateEnery: true};
            let energyRequired2;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options2.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithArray, functionSelector, options2,
                    parameter, accounts.hex[6]);
                console.log("result2: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired2 = result.energy_required;
            }
            assert.equal(energyRequired1,energyRequired2)
        });

        it('estimateEnergy with array[] parameters', async function () {
            const functionSelector = 'transferWithArray(address[],uint256[])';
            const parameter = [
                {type: 'address[]', value: [accounts.hex[16], accounts.hex[17]]},
                {type: 'uint256[]', value: [123456, 123456]}
            ]
            const options1 = {estimateEnery: true, confirmed: true};
            let energyRequired1;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options1.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithArray, functionSelector, options1,
                    parameter, accounts.hex[6]);
                console.log("result1: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired1 = result.energy_required;
            }

            const options2 = {estimateEnery: true};
            let energyRequired2;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options2.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithArray, functionSelector, options2,
                    parameter, accounts.hex[6]);
                console.log("result2: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired2 = result.energy_required;
            }
            assert.equal(energyRequired1,energyRequired2)
        });

        it('estimateEnergy with trctoken payable parameters', async function () {
            // before balance
            const accountTrxBalanceBefore = await tronWeb.trx.getBalance(contractAddressWithTrctoken);
            const accountbefore = await tronWeb.trx.getAccount(contractAddressWithTrctoken);
            const accountTrc10BalanceBefore = accountbefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
            const toAddressBefore = await tronWeb.trx.getAccount(accounts.hex[17]);
            const toAddressTrc10BalanceBefore = toAddressBefore.assetV2?toAddressBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value:0;
            console.log("accountTrxBalanceBefore:"+accountTrxBalanceBefore);
            console.log("accountTrc10BalanceBefore:"+accountTrc10BalanceBefore);
            console.log("toAddressTrc10BalanceBefore:"+toAddressTrc10BalanceBefore);

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
            console.log("transaction: "+util.inspect(transaction,true,null,true))
            console.log("res: "+util.inspect(res,true,null,true))
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(transaction.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("tx: "+util.inspect(tx,true,null,true))
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
            assert.equal(toAddressTrc10BalanceAfter,toAddressTrc10BalanceBefore+123);

            const options1 = {
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                estimateEnery: true,
                confirmed: true
            };
            let energyRequired1;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options1.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithTrctoken, functionSelector, options1,
                    parameter, ADDRESS_HEX);
                console.log("result1: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired1 = result.energy_required;
            }

            const options2 = {
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                estimateEnery: true
            };
            let energyRequired2;
            for (let i = 0; i < 2; i++) {
                if (i === 1) options2.permissionId = 2;
                const result = await tronWeb.transactionBuilder.estimateEnergy(contractAddressWithTrctoken, functionSelector, options2,
                    parameter, ADDRESS_HEX);
                console.log("result2: "+util.inspect(result,true,null,true))
                assert.isTrue(result.result.result);
                assert.isDefined(result.energy_required);
                assert.isNumber(result.energy_required);
                energyRequired2 = result.energy_required;
            }
            assert.equal(energyRequired1,energyRequired2)

            const transaction2 = await tronWeb.transactionBuilder.triggerSmartContract(contractAddressWithTrctoken,  functionSelector, options,
                parameter, ADDRESS_HEX);
            const res2 = await broadcaster.broadcaster(null, PRIVATE_KEY, transaction2.transaction);
            console.log("transaction2: "+util.inspect(transaction2,true,null,true))
            console.log("res2: "+util.inspect(res2,true,null,true))
            while (true) {
                const tx2 = await tronWeb.trx.getTransactionInfo(transaction2.transaction.txID);
                if (Object.keys(tx2).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    console.log("tx2: "+util.inspect(tx2,true,null,true))
                    break;
                }
            }

            const options3 = {
                callValue:321,
                tokenId:TOKEN_ID,
                tokenValue:1e3,
                _isConstant: true
            };
            const transaction3 = await tronWeb.transactionBuilder.triggerConstantContract(contractAddressWithTrctoken,  functionSelector, options3,
                parameter, ADDRESS_HEX);
            console.log("transaction3: "+util.inspect(transaction3,true,null,true))
        });
    });
});
