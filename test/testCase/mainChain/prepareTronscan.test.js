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
    let broadcastResp;

    before(async function () {
        emptyAccount = await TronWeb.createAccount();
        tronWeb = tronWebBuilder.createInstance();
        console.log('tronweb1111', tronWeb);
        /*accounts={
                   b58: [
                     'TKRcqoPe9ig4RcAt8v5pv91KC7Grgyj5DK',
                     'TNtvAE5u49z3vzwZHeVPUQHYJtFzkaFe2Y'
                   ],
                   hex: [
                     '4167b7d916a7b53f115e84d38e7b4f0798fb80f592',
                     '418dc9e992e11cea1c3e96d73ed2add4878e398c49'
                   ],
                   pks: [
                     '0FB42F4662C3B7DA810E817080AAE75B2783C9412199D07105240F96D5A7A660',
                     '4F72C4E6B5F8D0A21F45588BEEAF5AA423C42418EE71FF2BCFB14F641A3068F5'
                   ]
                 }*/
        accounts={
                           b58: [
                             'TKRcqoPe9ig4RcAt8v5pv91KC7Grgyj5DK',
                             'TL8TJ4UcfShZXWtoowNQCymaKPTG4Lh777'
                           ],
                           hex: [
                             '4167b7d916a7b53f115e84d38e7b4f0798fb80f592',
                             '416f70eecc0b6fcc688673781f0ab2f3c2db45e53b'
                           ],
                           pks: [
                             '0FB42F4662C3B7DA810E817080AAE75B2783C9412199D07105240F96D5A7A660',
                             '8CF41AFD945B65F3EF51C4C2BB6A6E4D11233D8BA2C902A0DB352641CAB51519'
                           ]
                         }
        //await tronWebBuilder.newTestAccountsInMain(6);
        //accounts2 = await tronWebBuilder.getTestAccountsInMain(6);
        accounts2 = {
          b58: [
            'TYo2onkczkT6UD9h81KsMgnfUgxYs7u4Jq',
            'TTcoJEPKP3WX7WpsxCtTAFjWAi4BJ6uQHq',
            'TMCSWXxtRThtvJBJsD9oVDgwD5szbmJhuk',
            'TPtBEKpaqpwyJvRGrmX4wz8jLGMKR12wn5',
            'TVZqgZETX7Wr2CB59vVEdzzzgKScY2WHgX',
            'TUwfyQTUAdCo8UvoVn5rZoWnvgrnH9c7vc'
          ],
          hex: [
            '41fa5e39403efd1d62a5f9755b289e4ea239a7ad22',
            '41c1962867e8d52349593dc0f762f638b944a41d2d',
            '417b2a11343d15ffd8cb39a56cd87704b6f835b0c6',
            '41989e33dc6572148cab6a2e906226a97072b499ef',
            '41d6f726fff04ed4df38730448074c834aa82b99b8',
            '41d0201297fbcbfb8a50929cc51eea76fa5629c4ad'
          ],
          pks: [
            '2BBAA8FD1CE079CA4B5E70856C79F3BE6B4836C66B14541A5C48FFFE6388052F',
            '53A195BA9CBDDB7C99C2DCDCE4A60F747980ADE112B0098FE60BC3C0F4C4F539',
            '04ED3B7B90C15E94626267E07467424C91A494D0904BC21F498CEA4FA8826DFE',
            '39E8D0E0DF2B913B19E47C70E959057E385B672DFBEA5FB2ABF72491C4543C06',
            '4CD95C642DFF6C3B53926C07388FCC64DAD1315822D140AC19A09212AEE7D635',
            'FA06D50C6424749189263FE42769B3FE299D926727277D96C526640E461A6728'
          ]
        }

    });

    describe('#purchaseToken()', function () {
        let tokenOptions;
        let tokenID="1005081";

        /*before(async function () {
            tokenOptions = getTokenOptions();
            broadcastResp = await broadcaster.broadcaster(tronWeb.transactionBuilder.createToken(tokenOptions, accounts.b58[0]), accounts.pks[0])
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            let tokenList
            while (!tokenList) {
                await wait(1)
                tokenList = await tronWeb.trx.getTokensIssuedByAddress(accounts.b58[0])
            }
            console.log("tokenList:"+util.inspect(tokenList,true,null,true))
            tokenID = tokenList[tokenOptions.name].id
            assert.equal(tokenList[tokenOptions.name].abbr, tokenOptions.abbreviation)
        });*/

        it(`should allow accounts[1] to purchase a token created by accounts[0]`, async function () {
            const param = [accounts.b58[0], tokenID, 20, accounts.b58[1]];
            await wait(5)
            const transaction = await tronWeb.transactionBuilder.purchaseToken(...param);
            const parameter = txPars(transaction);
            assert.equal(transaction.txID.length, 64);
            assert.equal(parameter.value.amount, 20);
            assert.equal(parameter.value.owner_address, accounts.hex[1]);
            assert.equal(parameter.value.to_address, accounts.hex[0]);
            assert.equal(parameter.type_url, 'type.googleapis.com/protocol.ParticipateAssetIssueContract');
            broadcastResp = await broadcaster.broadcaster(transaction, accounts.pks[1]);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        });

        it(`should update a TestToken`, async function () {
                    const transaction = await tronWeb.transactionBuilder.updateToken(UPDATED_TEST_TOKEN_OPTIONS, accounts.b58[0]);
                    const parameter = txPars(transaction);
                    assert.equal(transaction.txID.length, 64);
                    await assertEqualHex(parameter.value.description, UPDATED_TEST_TOKEN_OPTIONS.description);
                    await assertEqualHex(parameter.value.url, UPDATED_TEST_TOKEN_OPTIONS.url);
                    assert.equal(parameter.value.owner_address, accounts.hex[0]);
                    assert.equal(parameter.type_url, 'type.googleapis.com/protocol.UpdateAssetContract');
                    broadcastResp = await broadcaster.broadcaster(transaction, accounts.pks[0]);
                    console.log("broadcastResp: ",broadcastResp);
                    while (true) {
                        const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                        if (Object.keys(tx).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            break;
                        }
                    }

                });

    });

    describe('#deploy trc20 token', async function (){
        it('deploy trc20 token', async function() {
            const options = {
                        abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}],
                        bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060408051808201825260068082527f5175696e63650000000000000000000000000000000000000000000000000000602080840191825284518086019095528285527f5155494e434500000000000000000000000000000000000000000000000000009085015282519293926100a3916003916102a8565b5081516100b79060049060208501906102a8565b506005805460ff191660ff92909216919091179055506101049050336100e4640100000000610109810204565b60ff16600a0a6305f5e10002610113640100000000026401000000009004565b610340565b60055460ff165b90565b600160a060020a038216151561018a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6002546101a490826401000000006107a661022d82021704565b600255600160a060020a0382166000908152602081905260409020546101d790826401000000006107a661022d82021704565b600160a060020a0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000828201838110156102a157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102e957805160ff1916838001178555610316565b82800160010185558215610316579182015b828111156103165782518255916020019190600101906102fb565b50610322929150610326565b5090565b61011091905b80821115610322576000815560010161032c565b6108c480620003506000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100b65760e060020a600035046306fdde0381146100bb578063095ea7b31461013857806318160ddd1461017857806323b872dd14610192578063313ce567146101c857806339509351146101e657806370a082311461021257806395d89b4114610238578063a457c2d714610240578063a9059cbb1461026c578063dd62ed3e14610298575b600080fd5b6100c36102c6565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100fd5781810151838201526020016100e5565b50505050905090810190601f16801561012a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101646004803603604081101561014e57600080fd5b50600160a060020a03813516906020013561035c565b604080519115158252519081900360200190f35b610180610372565b60408051918252519081900360200190f35b610164600480360360608110156101a857600080fd5b50600160a060020a03813581169160208101359091169060400135610378565b6101d06103cf565b6040805160ff9092168252519081900360200190f35b610164600480360360408110156101fc57600080fd5b50600160a060020a0381351690602001356103d8565b6101806004803603602081101561022857600080fd5b5035600160a060020a0316610414565b6100c361042f565b6101646004803603604081101561025657600080fd5b50600160a060020a038135169060200135610490565b6101646004803603604081101561028257600080fd5b50600160a060020a0381351690602001356104cc565b610180600480360360408110156102ae57600080fd5b50600160a060020a03813581169160200135166104d9565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103525780601f1061032757610100808354040283529160200191610352565b820191906000526020600020905b81548152906001019060200180831161033557829003601f168201915b5050505050905090565b6000610369338484610504565b50600192915050565b60025490565b60006103858484846105fa565b600160a060020a0384166000908152600160209081526040808320338085529252909120546103c59186916103c0908663ffffffff61074616565b610504565b5060019392505050565b60055460ff1690565b336000818152600160209081526040808320600160a060020a038716845290915281205490916103699185906103c0908663ffffffff6107a616565b600160a060020a031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103525780601f1061032757610100808354040283529160200191610352565b336000818152600160209081526040808320600160a060020a038716845290915281205490916103699185906103c0908663ffffffff61074616565b60006103693384846105fa565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b600160a060020a038316151561054e5760405160e560020a62461bcd0281526004018080602001828103825260248152602001806108756024913960400191505060405180910390fd5b600160a060020a03821615156105985760405160e560020a62461bcd02815260040180806020018281038252602281526020018061082e6022913960400191505060405180910390fd5b600160a060020a03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600160a060020a03831615156106445760405160e560020a62461bcd0281526004018080602001828103825260258152602001806108506025913960400191505060405180910390fd5b600160a060020a038216151561068e5760405160e560020a62461bcd02815260040180806020018281038252602381526020018061080b6023913960400191505060405180910390fd5b600160a060020a0383166000908152602081905260409020546106b7908263ffffffff61074616565b600160a060020a0380851660009081526020819052604080822093909355908416815220546106ec908263ffffffff6107a616565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000828211156107a0576040805160e560020a62461bcd02815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600082820183811015610803576040805160e560020a62461bcd02815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b939250505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373a165627a7a7230582083b69a7ebb780a16f5af24c34a956b350dc1300f6d49a49d45dc7a86f2ab0d060029",
                        feeLimit: 1500000000
                    };
            console.log("tronWeb: ",tronWeb);
            const transaction = await tronWeb.transactionBuilder.createSmartContract(options,accounts.hex[0])
            assert.equal(transaction.raw_data.contract[0].parameter.value.new_contract.consume_user_resource_percent, 100);
            assert.equal(transaction.raw_data.contract[0].parameter.value.new_contract.origin_energy_limit, 1e7);
            broadcastResp = await broadcaster.broadcaster(transaction, accounts.pks[0]);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
        })
    });

    describe("#injectExchangeTokens", async function () {
        const idxS = 0;
        const idxE = 2;
        let tokenNames = [];
        let exchangeId = '';

        before(async function () {

            // create token
            /*for (let i = idxS; i < idxE; i++) {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts2.hex[i]);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], transaction);
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                await waitChainData('token', accounts2.hex[i]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts2.hex[i]);
                await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], await tronWeb.transactionBuilder.sendToken(
                    tronWeb.defaultAddress.hex,
                    10e4,
                    token[Object.keys(token)[0]]['id'],
                    token[Object.keys(token)[0]]['owner_address']
                ));
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }*/
            tokenNames.push("1005081");
            tokenNames.push("1005091");
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10, accounts.hex[1]);
            broadcastResp = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id;

        });
        it(`should inject exchange tokens`, async function () {
            const param = [exchangeId, tokenNames[0], 10,accounts.hex[1]];
            const transaction = await tronWeb.transactionBuilder.injectExchangeTokens(
                ...param
            );
            const authResult =
                TronWeb.utils.transaction.txCheck(transaction);
            assert.equal(authResult, true);
            broadcastResp = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("broadcastResp: ",JSON.stringify(broadcastResp, null, 2));
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

        });
    });

    describe("#withdrawExchangeTokens", async function () {
        const idxS = 2;
        const idxE = 4;
        let tokenNames = [];
        let exchangeId = '29';
        tokenNames = ["1005081","1005091"]
        /*before(async function () {
            // create token
            for (let i = idxS; i < idxE; i++) {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts2.hex[i]);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], transaction);
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                await waitChainData('token', accounts2.hex[i]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts2.hex[i]);
                await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], await tronWeb.transactionBuilder.sendToken(
                    tronWeb.defaultAddress.hex,
                    10e4,
                    token[Object.keys(token)[0]]['id'],
                    token[Object.keys(token)[0]]['owner_address']
                ));
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
            broadcastResp = await broadcaster.broadcaster(transaction);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
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

        });*/
        it(`should withdraw exchange tokens`, async function () {
            const param = [exchangeId, tokenNames[0], 10,accounts.hex[1] ];
            console.log("111111")
            const transaction = await tronWeb.transactionBuilder.withdrawExchangeTokens(
                ...param
            );
            console.log("222222")
            const authResult =
                TronWeb.utils.transaction.txCheck(transaction);
            assert.equal(authResult, true);

            broadcastResp = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }

        });
    });

    describe("#tradeExchangeTokens", async function () {
        const idxS = 4;
        const idxE = 6;
        let tokenNames = [];
        let exchangeId = '';
        exchangeId = '30';
        tokenNames = ["1005081","1005091"]

        /*before(async function () {
            // create token
            for (let i = idxS; i < idxE; i++) {
                const options = getTokenOptions();
                const transaction = await tronWeb.transactionBuilder.createToken(options, accounts2.hex[i]);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], transaction);
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                await waitChainData('token', accounts2.hex[i]);
                const token = await tronWeb.trx.getTokensIssuedByAddress(accounts2.hex[i]);
                await waitChainData('tokenById', token[Object.keys(token)[0]]['id']);
                broadcastResp = await broadcaster.broadcaster(null, accounts2.pks[i], await tronWeb.transactionBuilder.sendToken(
                    tronWeb.defaultAddress.hex,
                    10e4,
                    token[Object.keys(token)[0]]['id'],
                    token[Object.keys(token)[0]]['owner_address']
                ));
                console.log("broadcastResp: ",broadcastResp);
                while (true) {
                    const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                    if (Object.keys(tx).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        break;
                    }
                }
                tokenNames.push(token[Object.keys(token)[0]]['id']);
            }
            // console.log(tokenNames, 99999999);
            const transaction = await tronWeb.transactionBuilder.createTokenExchange(tokenNames[1], 10, tokenNames[0], 10);
            broadcastResp = await broadcaster.broadcaster(transaction);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }
            let receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            while (!Object.keys(receipt).length) {
                await wait(5);
                receipt = await tronWeb.trx.getTransactionInfo(transaction.txID);
            }
            exchangeId = receipt.exchange_id;
        });*/
        it(`should trade exchange tokens`, async function () {
            const param = [exchangeId, tokenNames[0], 10, 5,accounts.hex[1]];
            console.log("param: ",param);
            console.log("11111")
            const transaction = await tronWeb.transactionBuilder.tradeExchangeTokens(
                ...param
            );

            console.log("transaction: ",JSON.stringify(transaction, null, 2))
            broadcastResp = await broadcaster.broadcaster(null, accounts.pks[1], transaction);
            console.log("broadcastResp: ",broadcastResp);
            while (true) {
                const tx = await tronWeb.trx.getTransactionInfo(broadcastResp.transaction.txID);
                if (Object.keys(tx).length === 0) {
                    await wait(3);
                    continue;
                } else {
                    break;
                }
            }


        });
    });
    describe("#tradeExchangeTokens", async function () {
        contract20 = "TYWKWZcXQHHPmLhgrh2ZPkCrgQvTxyfEdA"
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
            transaction = await broadcaster(null, accounts.pks[6], transaction.transaction);
            assert.isTrue(transaction.receipt.result)
            assert.equal(transaction.transaction.raw_data.contract[0].Permission_id || 0, options.permissionId || 0);
        }

    })
});





