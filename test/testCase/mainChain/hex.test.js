const tronWebBuilder = require('../util/tronWebBuilder');
const wait = require('../util/wait');
const util = require('util');
const {PRIVATE_KEY} = require('../util/config');

describe("#SignTransaction with visible", async function () {
    const tronWeb = tronWebBuilder.createInstance();

    /**
     * Need to execute java-tron2.HttpTestSmartContract001.test2DeployContract() to get transaction
     */
    it('sign with create smartContract transaction', async function () {
        var priKey = "6a0901466817c2cefc1bfbf98e988cb5d90206251bae2570f99f6665e40ad9cc";
        let transaction1 ={"visible":true,"txID":"0f75d8ec3cb0178af40530fdb8eb3bd04c41befb233a4babbd5bd27a15b32d09","contract_address":"419b9b7a569b7cc76d99cc0392284bba3713fce846","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000652,"owner_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"d828","ref_block_hash":"6780b7325f594a06","expiration":1671534744000,"fee_limit":1000000000,"timestamp":1671534685546},"raw_data_hex":"0a02d82822086780b7325f594a0640c0a3f0f9d2305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a15418dd795dff57d5d17986f498c6b4533826803a1df12fc040a15418dd795dff57d5d17986f498c6b4533826803a1df1adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d0620cc893d70eadaecf9d23090018094ebdc03"}
        ;
        let transaction2 ={"visible":true,"txID":"0f75d8ec3cb0178af40530fdb8eb3bd04c41befb233a4babbd5bd27a15b32d09","contract_address":"419b9b7a569b7cc76d99cc0392284bba3713fce846","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000652,"owner_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"d828","ref_block_hash":"6780b7325f594a06","expiration":1671534744000,"fee_limit":1000000000,"timestamp":1671534685546},"raw_data_hex":"0a02d82822086780b7325f594a0640c0a3f0f9d2305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a15418dd795dff57d5d17986f498c6b4533826803a1df12fc040a15418dd795dff57d5d17986f498c6b4533826803a1df1adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d0620cc893d70eadaecf9d23090018094ebdc03"}
        ;

        // broadcast transaction
        let signedTransaction = await tronWeb.trx.sign(
            transaction1, priKey, false,false,false);
        console.log("signedTransaction1: "+util.inspect(signedTransaction,true,null,true))

        let result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result1: "+util.inspect(result,true,null,true))

        signedTransaction = await tronWeb.trx.sign(
            transaction2, priKey, false,false,false);
        console.log("signedTransaction2: "+util.inspect(signedTransaction,true,null,true))

        result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result2: "+util.inspect(result,true,null,true))
    });

    /**
     * Need to execute java-tron2.HttpTestSmartContract001.test1DeployContract()&test3TriggerContract() to get transaction
     */
    it('sign with trigger smartContract transaction', async function () {
        var priKey = "e6b078a5fcbacf4631889cfe075d3c79b5ae2aa3dcb2a52e30853387464c5faa";
        let transaction1 ={"result":{"result":true},"transaction":{"visible":true,"txID":"cddb89e4f0aea1731ff92ddb248c0fa008b60d97315fd024f9e0bb70907cdec4","raw_data":{"contract":[{"parameter":{"value":{"data":"3be9ece70000000000000000000000004d1ba3b9836f5611265b8f11dde00cd9ec7840b000000000000000000000000000000000000000000000000000000000000f44ce0000000000000000000000000000000000000000000000000000000000000001","token_id":1000654,"owner_address":"TA5Hx7vgR2DHZDYDL7ZJWGvjkDwX8SB76w","call_token_value":20,"contract_address":"TY5nTuUNqvsqf3yPughPfomKNtMUFiRxX5","call_value":10},"type_url":"type.googleapis.com/protocol.TriggerSmartContract"},"type":"TriggerSmartContract"}],"ref_block_bytes":"d864","ref_block_hash":"8a27fcf540cc8911","expiration":1671534936000,"fee_limit":1000000000,"timestamp":1671534878287},"raw_data_hex":"0a02d86422088a27fcf540cc891140c0fffbf9d2305ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a15410126a09468cf2c23bfe95fee4d1a7aeca54f1b81121541f29132480932d5edf2a8de0c6b8f28c2d2980c99180a22643be9ece70000000000000000000000004d1ba3b9836f5611265b8f11dde00cd9ec7840b000000000000000000000000000000000000000000000000000000000000f44ce0000000000000000000000000000000000000000000000000000000000000001281430ce893d70cfbcf8f9d23090018094ebdc03"}}
        ;
        let transaction2 ={"visible":true,"txID":"0f75d8ec3cb0178af40530fdb8eb3bd04c41befb233a4babbd5bd27a15b32d09","contract_address":"419b9b7a569b7cc76d99cc0392284bba3713fce846","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000652,"owner_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"TNuCYFG1jeBaeZrRM3iNakH53SyJUXDzAT","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"d828","ref_block_hash":"6780b7325f594a06","expiration":1671534744000,"fee_limit":1000000000,"timestamp":1671534685546},"raw_data_hex":"0a02d82822086780b7325f594a0640c0a3f0f9d2305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a15418dd795dff57d5d17986f498c6b4533826803a1df12fc040a15418dd795dff57d5d17986f498c6b4533826803a1df1adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d0620cc893d70eadaecf9d23090018094ebdc03"}
        ;

        // broadcast transaction
        let signedTransaction = await tronWeb.trx.sign(
            transaction1.transaction, priKey, false,false,false);
        console.log("signedTransaction1: "+util.inspect(signedTransaction,true,null,true))

        let result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result1: "+util.inspect(result,true,null,true))

        signedTransaction = await tronWeb.trx.sign(
            transaction2.transaction, priKey, false,false,false);
        console.log("signedTransaction2: "+util.inspect(signedTransaction,true,null,true))

        result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result2: "+util.inspect(result,true,null,true))
    });

    /**
     * Need to execute java-tron2.HttpTestSendCoin001.test1SendCoin() to get transaction
     */
    it('sign with sendcoin transaction', async function () {
        var transaction1 ={"visible":true,"txID":"7351189dd82dce8964790f1d3a389c42a8de171c91f0bf6bb67b2ef269f2f56d","raw_data":{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"THph9K2M2nLvkianrMGswRhz5hjSA9fuH7","to_address":"TMb1ugErA15uWDZ9AT5Nzuri2Da16WEoAb"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"d893","ref_block_hash":"c788d37fa5c3dbb2","expiration":1671535089000,"timestamp":1671535029268},"raw_data_hex":"0a02d8932208c788d37fa5c3dbb240e8aa85fad2305a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15415624c12e308b03a1a6b21d9b86e3942fac1ab92b1215417f6f19344166def04ef697a949f42bb775999e1d18e8077094d881fad230"}
        ;
        var transaction2 ={"visible":true,"txID":"7351189dd82dce8964790f1d3a389c42a8de171c91f0bf6bb67b2ef269f2f56d","raw_data":{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"THph9K2M2nLvkianrMGswRhz5hjSA9fuH7","to_address":"TMb1ugErA15uWDZ9AT5Nzuri2Da16WEoAb"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"d893","ref_block_hash":"c788d37fa5c3dbb2","expiration":1671535089000,"timestamp":1671535029268},"raw_data_hex":"0a02d8932208c788d37fa5c3dbb240e8aa85fad2305a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15415624c12e308b03a1a6b21d9b86e3942fac1ab92b1215417f6f19344166def04ef697a949f42bb775999e1d18e8077094d881fad230"}
        ;

        // broadcast transaction
        let signedTransaction = await tronWeb.trx.sign(
            transaction1, priKey, false,false,false);
        console.log("signedTransaction1: "+util.inspect(signedTransaction,true,null,true))

        let result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result1: "+util.inspect(result,true,null,true))

        signedTransaction = await tronWeb.trx.sign(
            transaction2, priKey, false,false,false);
        console.log("signedTransaction2: "+util.inspect(signedTransaction,true,null,true))

        result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result2: "+util.inspect(result,true,null,true))
    });
})
