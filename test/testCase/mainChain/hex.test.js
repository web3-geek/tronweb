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
        var priKey = "6e2ad80b08aceffa6fa67c207b21c035fa45d3d823c675db44954680ab0903a8";
        let transaction1 ={"visible":false,"txID":"17a6f344ec5dea84fe68d67a0da53bff8509466748b3c51df92d9fbe18712add","contract_address":"412613a449e134b2159cf1fac038507ef1146e2ba3","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000299,"owner_address":"41b50430e7bbd999665a194a4a7b19220aaab950a0","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"41b50430e7bbd999665a194a4a7b19220aaab950a0","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"dbb3","ref_block_hash":"793ad30302b88918","expiration":1675051839000,"fee_limit":1000000000,"timestamp":1675051781042},"raw_data_hex":"0a02dbb32208793ad30302b889184098dcfa86e0305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a1541b50430e7bbd999665a194a4a7b19220aaab950a012fc040a1541b50430e7bbd999665a194a4a7b19220aaab950a01adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d0620eb863d70b297f786e03090018094ebdc03"}
        ;
        let transaction2 ={"visible":true,"txID":"74cdfc61d186d27aa8a21b78036e8e90b83c2cc0fdcac4cefbfc60bc797c2cec","contract_address":"41ed080b36653f2a67961a3928291db64084b990f3","raw_data":{"contract":[{"parameter":{"value":{"token_id":1000299,"owner_address":"TSULKyiEL3CM8G1txqeAzuP7XVqY5WxwdJ","call_token_value":100000,"new_contract":{"bytecode":"6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029","consume_user_resource_percent":100,"name":"transferTokenContract","origin_address":"TSULKyiEL3CM8G1txqeAzuP7XVqY5WxwdJ","abi":{"entrys":[{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"getResultInCon","stateMutability":"Payable","type":"Function"},{"payable":true,"inputs":[{"name":"toAddress","type":"address"},{"name":"id","type":"trcToken"},{"name":"amount","type":"uint256"}],"name":"TransferTokenTo","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"trcToken"},{"type":"uint256"},{"type":"uint256"}],"payable":true,"name":"msgTokenValueAndTokenIdTest","stateMutability":"Payable","type":"Function"},{"payable":true,"stateMutability":"Payable","type":"Constructor"}]},"origin_energy_limit":11111111111111,"call_value":5000}},"type_url":"type.googleapis.com/protocol.CreateSmartContract"},"type":"CreateSmartContract"}],"ref_block_bytes":"dbb3","ref_block_hash":"793ad30302b88918","expiration":1675051839000,"fee_limit":1000000000,"timestamp":1675051781089},"raw_data_hex":"0a02dbb32208793ad30302b889184098dcfa86e0305ad805081e12d3050a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e7472616374129e050a1541b50430e7bbd999665a194a4a7b19220aaab950a012fc040a1541b50430e7bbd999665a194a4a7b19220aaab950a01adb010a381a0e676574526573756c74496e436f6e2a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a501a0f5472616e73666572546f6b656e546f22141209746f416464726573731a0761646472657373220e120269641a08747263546f6b656e22111206616d6f756e741a0775696e743235363002380140040a451a1b6d7367546f6b656e56616c7565416e64546f6b656e4964546573742a0a1a08747263546f6b656e2a091a0775696e743235362a091a0775696e743235363002380140040a0630013801400422e0026080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e757002928882730643a157472616e73666572546f6b656e436f6e747261637440c7e3d28eb0c30218a08d0620eb863d70e197f786e03090018094ebdc03"}
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
        var priKey = "ac404cddb2d3b83560ad15d016328250d6e7aabdd1f8d5195eb4814ebf395e4b";
        let transaction1 ={"result":{"result":true},"transaction":{"visible":true,"txID":"3c18f377ba45b6972ec6cedf9ff633476d233cfbd67585c6414388059f9c7c72","raw_data":{"contract":[{"parameter":{"value":{"data":"3be9ece70000000000000000000000004c49ee8137a6c640e1c0c1e544a07f4655a92ac100000000000000000000000000000000000000000000000000000000000f436c0000000000000000000000000000000000000000000000000000000000000001","token_id":1000300,"owner_address":"TUJzGHWFkCNZaG9uk2o691ugUanaGvXkim","call_token_value":20,"contract_address":"TQeB7NVdGj3EQCGBgAYVtqVisAjyE3j7oS","call_value":10},"type_url":"type.googleapis.com/protocol.TriggerSmartContract"},"type":"TriggerSmartContract"}],"ref_block_bytes":"dbd4","ref_block_hash":"0f550ff9963855a6","expiration":1675051944000,"fee_limit":1000000000,"timestamp":1675051886499},"raw_data_hex":"0a02dbd422080f550ff9963855a640c0908187e0305ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a1541c92ff35cc0a4ccf4258e169e94e3b5fd0ea879a1121541a0f067a218741aabf523313aff8a6007f0499f5c180a22643be9ece70000000000000000000000004c49ee8137a6c640e1c0c1e544a07f4655a92ac100000000000000000000000000000000000000000000000000000000000f436c0000000000000000000000000000000000000000000000000000000000000001281430ec863d70a3cffd86e03090018094ebdc03"}}
        ;
        let transaction2 = {"result":{"result":true},"transaction":{"visible":false,"txID":"a1d6674e52bf34017fbe1cafd0ca1ab3994ebda28f2158bb5c1274e8338088fe","raw_data":{"contract":[{"parameter":{"value":{"data":"3be9ece70000000000000000000000004c49ee8137a6c640e1c0c1e544a07f4655a92ac100000000000000000000000000000000000000000000000000000000000f436c0000000000000000000000000000000000000000000000000000000000000001","token_id":1000300,"owner_address":"41c92ff35cc0a4ccf4258e169e94e3b5fd0ea879a1","call_token_value":20,"contract_address":"41a0f067a218741aabf523313aff8a6007f0499f5c","call_value":10},"type_url":"type.googleapis.com/protocol.TriggerSmartContract"},"type":"TriggerSmartContract"}],"ref_block_bytes":"dbd4","ref_block_hash":"0f550ff9963855a6","expiration":1675051944000,"fee_limit":1000000000,"timestamp":1675051886536},"raw_data_hex":"0a02dbd422080f550ff9963855a640c0908187e0305ad701081f12d2010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e7472616374129c010a1541c92ff35cc0a4ccf4258e169e94e3b5fd0ea879a1121541a0f067a218741aabf523313aff8a6007f0499f5c180a22643be9ece70000000000000000000000004c49ee8137a6c640e1c0c1e544a07f4655a92ac100000000000000000000000000000000000000000000000000000000000f436c0000000000000000000000000000000000000000000000000000000000000001281430ec863d70c8cffd86e03090018094ebdc03"}}
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
        var transaction1 ={"visible":true,"txID":"818a4c61de37683127eec0e84ee427c9025ef2d60b4b47b6857bd6fd9d1c50ba","raw_data":{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"THph9K2M2nLvkianrMGswRhz5hjSA9fuH7","to_address":"TDtiT9r5sviodiQDXmacunr2FeqMTaMFJi"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"dbeb","ref_block_hash":"6e77e1e812ed1924","expiration":1675052019000,"timestamp":1675051959482},"raw_data_hex":"0a02dbeb22086e77e1e812ed192440b8da8587e0305a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15415624c12e308b03a1a6b21d9b86e3942fac1ab92b1215412b0701c2039d5eb55b927e0443f112b07762dbfa18e80770ba898287e030"}
        ;
        var transaction2 ={"visible":false,"txID":"9ec4b5d273db3637c38e1df0526afdb3a1181d428b03e9198be3e8108679fb6e","raw_data":{"contract":[{"parameter":{"value":{"amount":1000,"owner_address":"415624c12e308b03a1a6b21d9b86e3942fac1ab92b","to_address":"412b0701c2039d5eb55b927e0443f112b07762dbfa"},"type_url":"type.googleapis.com/protocol.TransferContract"},"type":"TransferContract"}],"ref_block_bytes":"dbeb","ref_block_hash":"6e77e1e812ed1924","expiration":1675052019000,"timestamp":1675051959548},"raw_data_hex":"0a02dbeb22086e77e1e812ed192440b8da8587e0305a66080112620a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412310a15415624c12e308b03a1a6b21d9b86e3942fac1ab92b1215412b0701c2039d5eb55b927e0443f112b07762dbfa18e80770fc898287e030"}
        ;

        // broadcast transaction
        let signedTransaction = await tronWeb.trx.sign(
            transaction1, PRIVATE_KEY, false,false,false);
        console.log("signedTransaction1: "+util.inspect(signedTransaction,true,null,true))

        let result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result1: "+util.inspect(result,true,null,true))

        signedTransaction = await tronWeb.trx.sign(
            transaction2, PRIVATE_KEY, false,false,false);
        console.log("signedTransaction2: "+util.inspect(signedTransaction,true,null,true))

        result = await tronWeb.trx.broadcast(signedTransaction);
        await wait(3);
        console.log("result2: "+util.inspect(result,true,null,true))
    });
})
