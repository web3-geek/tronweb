const tronWebBuilder = require('../util/tronWebBuilder');
const wait = require('../util/wait');
const util = require('util');
const {PRIVATE_KEY,} = require('../util/config');

describe("#SignTransaction with visible", async function () {
    const tronWeb = tronWebBuilder.createInstance();

    /**
     * Need to execute java-tron2.HttpTestSmartContract001.test1DeployContract() to get transaction
     */
    it('sign with create smartContract transaction', async function () {
        var priKey = "0efa303c1c12a5509e82cef217632be7c2ab48cf72ba8ed8419b06552a20c462";
        var transaction ={"visible":true,"txID":"e82891506ae522fb6e35b8b0037ee97e447f54d03e12758241f70f4654b5e187","contract_address":"414a363616bc54ef6d77116fd3ea2e08be2dea850f","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000074,"owner_address":"TQTnyo1vmd43iDtNTytkB9Q9ndExXwUGsP","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"TQTnyo1vmd43iDtNTytkB9Q9ndExXwUGsP","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"7e5f","ref_block_hash":"68d7dfc263a865ec","expiration":1670589519000,"fee_limit":1000000000,"timestamp":1670589461189},"raw_data_hex":"0a027e5f220868d7dfc263a865ec4098a994b7cf305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a15419ef9c57f117372537d214b0c7b2529a5e15404ed12fc040a15419ef9c57f117372537d214b0c7b2529a5e15404ed1adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d06208a853d70c5e590b7cf3090018094ebdc03"}
        ;

        // broadcast transaction
        const signedTransaction = await tronWeb.trx.sign(
            transaction, priKey, false,false,false);
        console.log("signedTransaction: "+util.inspect(signedTransaction,true,null,true))

        const result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result: "+util.inspect(result,true,null,true))
    });

    /**
     * Need to execute java-tron2.HttpTestSmartContract001.test1DeployContract()&test3TriggerContract() to get transaction
     */
    it.only('sign with trigger smartContract transaction', async function () {
        var priKey = "bfa4e495ae01e9302943032e5561f4a0336bb93237c6879a6d100baf330f9677";
        var transaction ={"result":{"result":true},"transaction":{"visible":false,"txID":"a49d06295b14008b19cbe6b10e6ab8d691e326b041d3c91788332f2b4fb50679","raw_data":{"contract":[{"parameter":{"value":{"data":"3be9ece70000000000000000000000001d56d864a3409ccb23c39a9ee777dd8f1eb6ce7100000000000000000000000000000000000000000000000000000000000f428d0000000000000000000000000000000000000000000000000000000000000001","token_id":1000077,"owner_address":"41a413ca3f00a14a0fc633c6b2038fdef3f4f89707","call_token_value":20,"contract_address":"41c2d42709e3dfe292ac58685217250ed55fb773e9","call_value":10},"type_url":"type.googleapis.com/protocol.TriggerSmartContract"},"type":"TriggerSmartContract"}],"ref_block_bytes":"7f52","ref_block_hash":"1d49acc15d209c2e","expiration":1670590296000,"fee_limit":1000000000,"timestamp":1670590237512},"raw_data_hex":"0a027f5222081d49acc15d209c2e40c0dfc3b7cf305ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a1541a413ca3f00a14a0fc633c6b2038fdef3f4f89707121541c2d42709e3dfe292ac58685217250ed55fb773e9180a22643be9ece70000000000000000000000001d56d864a3409ccb23c39a9ee777dd8f1eb6ce7100000000000000000000000000000000000000000000000000000000000f428d00000000000000000000000000000000000000000000000000000000000000012814308d853d70c896c0b7cf3090018094ebdc03"}}
        ;

        // broadcast transaction
        const signedTransaction = await tronWeb.trx.sign(
            transaction.transaction, priKey, false,false,false);
        console.log("signedTransaction: "+util.inspect(signedTransaction,true,null,true))

        const result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result: "+util.inspect(result,true,null,true))
    });

    /**
     * Need to execute java-tron2.HttpTestSendCoin001.test1SendCoin() to get transaction
     */
    it('sign with sendcoin transaction', async function () {
        var transaction ={"visible":false,"txID":"4a6a76677ff23527c14b19660c3051aacf4a02ad2573ae2acb585a64295549a8","raw_data":{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"415624c12e308b03a1a6b21d9b86e3942fac1ab92b","to_address":"41f9756ece9e90f8cf99d6dd87ff411a773edef6d5"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"7e0f","ref_block_hash":"d7e37e2a14cbee65","expiration":1670589261000,"timestamp":1670589202464},"raw_data_hex":"0a027e0f2208d7e37e2a14cbee6540c8c984b7cf305a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15415624c12e308b03a1a6b21d9b86e3942fac1ab92b121541f9756ece9e90f8cf99d6dd87ff411a773edef6d518e80770a08081b7cf30"}
        ;

        // broadcast transaction
        const signedTransaction = await tronWeb.trx.sign(
            transaction, PRIVATE_KEY, false,false,false);
        console.log("signedTransaction: "+util.inspect(signedTransaction,true,null,true))

        const result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result: "+util.inspect(result,true,null,true))
    });
})
