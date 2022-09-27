const tronWebBuilder = require('../util/tronWebBuilder');
const {FULL_NODE_API, ADDRESS_HEX, PRIVATE_KEY} = require('../util/config');
const assertThrow = require('../util/assertThrow');
const broadcaster = require('../util/broadcaster');
const jlog = require('../util/jlog')
const wait = require('../util/wait')
const TronWeb = tronWebBuilder.TronWeb;
const util = require('util');
const chai = require('chai');
const assert = chai.assert;

describe('TronWeb.lib.event', async function () {

    let accounts
    let tronWeb
    let contractAddress
    let contract
    let eventLength = 0

    before(async function () {
        tronWeb = tronWebBuilder.createInstance();
        await tronWebBuilder.newTestAccountsInMain(5);
        accounts = await tronWebBuilder.getTestAccountsInMain(5);

        const result = await broadcaster.broadcaster(tronWeb.transactionBuilder.createSmartContract({
            abi: [
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "_sender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "_receiver",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "SomeEvent",
                    "type": "event"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_receiver",
                            "type": "address"
                        },
                        {
                            "name": "_someAmount",
                            "type": "uint256"
                        }
                    ],
                    "name": "emitNow",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            bytecode: "0x608060405234801561001057600080fd5b50610145806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bed7111f14610046575b600080fd5b34801561005257600080fd5b50610091600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610093565b005b3373ffffffffffffffffffffffffffffffffffffffff167f9f08738e168c835bbaf7483705fb1c0a04a1a3258dd9687f14d430948e04e3298383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505600a165627a7a7230582033629e2b0bba53f7b5c49769e7e360f2803ae85ac80e69dd61c7bb48f9f401f30029"
        }, ADDRESS_HEX), PRIVATE_KEY)

        console.log("result:"+util.inspect(result,true,null,true))
        contractAddress = result.receipt.transaction.contract_address
        console.log("contractAddress:"+util.inspect(contractAddress,true,null,true))
        // this.timeout(10000)
        contract = await tronWeb.contract().at(contractAddress)

    });

    describe('#constructor()', function () {

        it('should have been set a full instance in tronWeb', function () {

            assert.instanceOf(tronWeb.event, TronWeb.Event);
        });

    });

    describe("#getEventsByTransactionID", async function () {


        it('should emit an unconfirmed event and get it', async function () {
            tronWeb.setPrivateKey(PRIVATE_KEY)
            let account = await tronWeb.trx.getAccount();
            console.log("account:"+util.inspect(account,true,null,true))
            let txId = await contract.emitNow(accounts.hex[2], 2000).send({
                from: accounts.hex[1]
            })
            eventLength++
            let events
            while(true) {
                events = await tronWeb.event.getEventsByTransactionID(txId)
                if (events.length) {
                    break
                }
                await wait(0.5)
            }

            console.log("events:"+util.inspect(events,true,null,true))
            assert.equal(events[0].resourceNode, 'fullNode')
            if (!JSON.stringify('_receiver' in events[0].result)) {
                assert.equal(events[0].result._receiver.substring(2), accounts.hex[2].substring(2))
                assert.equal(events[0].result._sender.substring(2), ADDRESS_HEX.substring(2).toLowerCase())
            }
        })

        it('should emit an event, wait for confirmation and get it', async function () {
            tronWeb.setPrivateKey(PRIVATE_KEY)
            const emptyAccount1 = await TronWeb.createAccount();
            await tronWeb.trx.sendTrx(emptyAccount1.address.hex,100000000,{privateKey: PRIVATE_KEY})
            let output = await contract.emitNow(emptyAccount1.address.hex, 20).send({
                from: ADDRESS_HEX,
                shouldPollResponse: true,
                rawResponse: true
            })
            eventLength++

            await wait(60)
            let txId = output.id
            console.log("txId:"+txId)
            let events
            while(true) {
                events = await tronWeb.event.getEventsByTransactionID(txId)
                if (events.length) {
                    break
                }
                await wait(0.5)
            }

            console.log("events:"+util.inspect(events,true,null,true))
            assert.equal(events[0].result._receiver.substring(2), emptyAccount1.address.hex.substring(2).toLowerCase())
            assert.equal(events[0].result._sender.substring(2), ADDRESS_HEX.substring(2).toLowerCase())
            assert.equal(events[0].result._amount, "20")
            assert.equal(events[0].resourceNode, 'solidityNode')

        })

    });

    describe("#getEventsByContractAddress", async function () {

        it('should emit an event and wait for it', async function () {

            this.timeout(60000)
            tronWeb.setPrivateKey(accounts.pks[3])
            await contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3]
            })
            eventLength++
            let events
            while(true) {
                events = await tronWeb.event.getEventsByContractAddress(contractAddress, {
                    eventName: 'SomeEvent',
                    sort: 'block_timestamp'
                })
                if (events.length === eventLength) {
                    break
                }
                await wait(0.5)
            }

            const event = events[events.length - 1]

            assert.equal(event.result._receiver.substring(2), accounts.hex[4].substring(2))
            assert.equal(event.result._sender.substring(2), accounts.hex[3].substring(2))
            assert.equal(event.resourceNode, 'fullNode')

        })

    });

    describe('#contract.method.watch', async function () {

        it('should watch for an event', async function () {
            
            this.timeout(20000)
            tronWeb.setPrivateKey(accounts.pks[3])

            let watchTest = await contract.SomeEvent().watch((err, res) => {
                if(res) {
                    assert.equal(res.result._sender, accounts.hex[3])
                    assert.equal(res.result._receiver, accounts.hex[4])
                    assert.equal(res.result._amount, 4000)
                    
                    watchTest.stop() // Calls stop on itself when successful
                }
            })
            
            contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3]
            })

        })

        it('should only watch for an event with given filters',  async function () {

            this.timeout(20000)
            tronWeb.setPrivateKey(accounts.pks[3])
            
            let watchTest = await contract.SomeEvent().watch({filters: {"_amount": "4000"}}, (err, res) => {
                if(res) { 
                    assert.equal(res.result._sender, accounts.hex[3])
                    assert.equal(res.result._receiver, accounts.hex[4])
                    assert.equal(res.result._amount, 4000)

                    watchTest.stop() // Calls stop on itself when successful
                }
            })
            
            contract.emitNow(accounts.hex[4], 4000).send({
                from: accounts.hex[3]
            })
        })

        it('should only watch for an event with size',  async function () {
            let index = 0
            contract = await tronWeb.contract().at("41ea51342dabbb928ae1e576bd39eff8aaf070a8c6")
            let watchTest = await contract.Transfer().watch({size: "2"}, (err, res) => {
                if(res) {
                    index++
                    console.log("res:"+util.inspect(res))
                    if (index == 2) {
                        watchTest.stop() // Calls stop on itself when successful
                    }
                }
            })

        })
    })
});
