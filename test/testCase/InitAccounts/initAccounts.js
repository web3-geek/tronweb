const {testRevert, testConstant, arrayParam, tronToken, testAddressArray, trcTokenTest070, trcTokenTest059, funcABIV2, funcABIV2_2, funcABIV2_3, funcABIV2_4, abiV2Test1,abiV2Test2, testSetVal,
    testEmptyAbi
} = require('../util/contracts');
//const assertThrow = require('../util/assertThrow');
const broadcaster = require('../util/broadcaster');
//const broadcaster = require('../helpers/broadcaster');
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

let accounts;
//每次执行完本文件，记录执行信息。
//export PRIVATE_KEY='FC8BF0238748587B9617EB6D15D47A66C0E07C1A1959033CF249C6532DC29FE6' && npm run InitA
describe('Init Account', function () {
    let tronWeb;
    let emptyAccount;
    let isAllowSameTokenNameApproved

    describe('#Init Account()', async function () {
        console.log("Begin to generate 29 Accounts, and transfer 1w TRX to these accounts.");
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(29);
        accounts = await tronWebBuilder.getTestAccountsInMain(29);
        isAllowSameTokenNameApproved = await isProposalApproved(tronWeb, 'getAllowSameTokenName')
        await wait(30);
    });
  });

//将生成的结果放到config文件里面。



