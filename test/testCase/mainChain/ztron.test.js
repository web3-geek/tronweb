const {PRIVATE_KEY, FEE_LIMIT, ADDRESS_BASE58, ADDRESS_HEX, SIDE_CHAIN} = require('../util/config');
const shieldContract = require('../util/contracts').shieldContract;
const trc20Contract = require('../util/contracts').trc20Contract;
const assertThrow = require('../../helpers/assertThrow');
const tronWebBuilder = require('../util/tronWebBuilder');
const publicMethod = require('../util/PublicMethod');
const wait = require('../../helpers/wait');
const shieldedUtils = require('../util/shieldedUtils');
const {Z_TRON: zTronConfig} = require('../util/config');
const TronWeb = tronWebBuilder.TronWeb;
const chai = require('chai');
const util = require('util');
const assert = chai.assert;

//tronweb not supported any more.
describe('TronWeb ztron', function() {
    const tronWeb = tronWebBuilder.createInstance();
    let scalingFactor = 10;
    let trc20ContractAddress;
    let shieldedTRC20ContractAddress;
    // const {shieldedTRC20ContractAddress, trc20ContractAddress} = zTronConfig;
    const keysInfo = {};
    const narrowValue = 2;
    let realCost;
    let shieldedInfo;
    let shieldedInfo2;
    let newOtherAccountKey;
    let newOtherAddress;
    let ownerAddress;
    before(async function () {

        // newOtherAccount = await tronWeb.utils.accounts.generateAccount();
        // newOtherAccountKey = newOtherAccount.privateKey;
        newOtherAccountKey = "04E873F2920C6282FA70D0B5F485B7F456BBCD07771DD64FD46958B5A7C6DBA9";
        console.log("newOtherAccountKey:"+newOtherAccountKey)
        assert.equal(newOtherAccountKey.length, 64);
        newOtherAddress = tronWeb.address.fromPrivateKey(newOtherAccountKey);
        console.log("newOtherAddress:"+newOtherAddress)

        // ownerAddress
        ownerAddress = tronWeb.address.fromPrivateKey(PRIVATE_KEY);

        // deploy shieldedTRC20 contract
        console.log("000")
        trc20ContractAddress = "TEK8zvg9shh1AQ3VpDGjnK3nBZWEqPtihT";
        console.log("trc20ContractAddress:"+trc20ContractAddress)
        shieldedTRC20ContractAddress = "TH5cnDqDH46ajv3V3N94MQYjfVc9icRxPN";
        console.log("shieldedTRC20ContractAddress:"+shieldedTRC20ContractAddress)
    });

    describe('#create function', function() {
        const address = tronWeb.defaultAddress.base58;
        describe("#createMintParams", function (){
            it('should get mintParams with ovk is object', async function (){
                let trigger_contract_input = "0000000000000000000000000000000000000000000000000000000000000014294a97d540749fc9d52a9c47f94a352e9f72b151d975633a0467dc4dfa1a9a158d24a81e8fb8e16f4e6844bc05735486592e206b616499f8f4184c69b3eda1e89e30185f7f45300dcc96bcbb7e5711b06aadd3a8ac3bf4d116116bdecce71d88ab858bbf1ec34821e80a4a9e2e94933a36b09e4d930cbf42ff87d645315f506263cc88e676c8cd216d6adfc82ba6cd03a658e4c8877b307f80ae5258cca58833a513b804edf0629c69a75e559377f64bda0134796b70201c6047162b5dcaa9bc1020325383b9f1571585e4323776b4367a9c37550485fc4a3c17e7ca222cc3e1ba12e859705a98408e134dd5ebf553ff8603f93c11e227b4b6cb7af5b97afb476575d42d0a542a15f8808ba9ddf509af7abea1d7c1c250935960d17cfb9776e528f8a91d2f097e3a804d53da595b0890acb02f186b86f00634fe2dd91f6bbb594ca25256655d3a42856dd156d74dbdf7e95496dba96015e0c10b4b0f6eef1d050a6b32eb131c4a80494dc69f410e091bb3033ad11036059344bbf23979bb6b8d016dc30916b3240e6345abe74d0a0e8b03089751783e90a90a4b725b056c722d61875ec2087b87b7c6f7f7b5b5c639ccb17a41fd2d0beea82f69af3c9c8421de81f1fd42f93d3b296956b4a91e2bbdcb88f2a3bb978b168d4b006d2c446884d235c13dc8518d78e090044c4cd86610b18fea583849865036bca9b5bf1043402c3fc762af89381a44bcc44448941bbe4443254299fc6d4061fc7c2f0845bd55a20b882a8b41ff0e2c64e8a025dbc5cbe17aa3733bd03bed45e49c7037dceaad3665f67ce0fc32e68c15e799ad8b8c3ec6340da3617ef4c6dec6e3e044509bb20450977931112900b5be26926163bfdff200bd9c7f5c4bde00a5c145c8893baa4bee54c6547140b1891316b81bcb338930db00bef7946ac9f2fc33d39ef98488e8d54fb53a9150831d4d29131ae079225ea95df904c1176c3908615a569b3c154bf3b519b5468d67b5a22bbff118b96070c134c2c0987f80b6f97badd70f9475f208c74db1f95f43dc92b752ebfeb0cc4d60fbc77566426f36aa5cb27f2614504d07aae0f48f364275a3edd51d5fa6f97be37eb6e868636014a0797faaf69e7243c09d50d8e7f2fbe01bb4dbb82c4a4fa1e954d09bca05cb69dfeddd18a7ae6682f13d162b6aa42aeb6ccd1f84a852173fabd63ccf8da406d2fde7d987632f7ab8fc9772bd384aaae2f660078b5d5d0d99ff9bc41148f7289662f01d0e9190c628bc94795f0067c4998131188a656241b04bd8a5370fbf6b0ba43fc176d5dd24a40294b97687008f74e668b2906b3e016c28bacb7411a94e19b79cc18947989350a81c39f3a5e2805d7d667c3638664eb2be6acaceecb2089d8fa4db6009f3bf6a154fd7609e640bd817de61fced51dc56a6b96c4b000000000000000000000000";

                // createMintParams
                for(let i = 0; i < 1; i++){
                    const options = {
                        shieldedParameter: trigger_contract_input
                    }
                    const createTx = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                    createTxId = createTx.transaction.txID;
                    console.log("createTxId: "+createTxId)
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0) {
                            await wait(3);
                            continue;
                        } else {
                            console.log("createInfo:"+util.inspect(createInfo,true,null,true))
                            break;
                        }
                    }
                    assert.equal(createInfo.result, "SUCCESS");
                }
            })
        })

        describe("#createMintParamsWithoutAsk", function (){

            it('should get mintParams with ovk is object', async function (){
                let trigger_contract_input1 = "00000000000000000000000000000000000000000000000000000000000000149d04b34d0d676bd55dff60136cf7bc338e2accd99ceae17cc367f576dfe1632b03ac4fded69df508228a0462eed9e50c4e60bbaee7b50847bc2c83465a2ed2cf5b55bfec6b408b02601c5984275d443f860829407c1abae23b5331c10ce9cfae9296b12512c7a90170b49697ffe72712244872065af260202ce0e304d374a7f2f06a988d283a3104e2640cfeef6f0853a0cbb8c731e244ca7b23d19a5d3f1d7df1d5c7cf43a4a5555a559c6976d37f3fd16ebb98c14af579a0b8c8768baff76e1302e8212f651a57e445d7e4c5de5da5ff5c8a164fbe433f24e57e23f4ec5c69d185d894bf78a3ae69eb64ca4d891ef380fc2c16e7a735c36888c8a965b846d30b43ad65d6b97671bb6fbf18ee6ee0280b74b700fc9fdfb05d2f319872dc795d31ac838091fb0e87d9fdbcc619e9751cd703339a985b97bcb3e7dc80a47a16068f20a94087648d8d234717b2994c0c6fc85bdaf933925578f5adb19a24467804bfbb33b4240126490b1520c34dae23f3f9f4cc0d80f6e03e23c4a1e8ffdbc49b57dd0fe0297e9841cd8038d515e874ce331cee9546b1e1bdb446f4827545b5374d04e47c2961de9cc2ccee0021b3d0e48e507cd84014bb4c72a65559422299529d1e152edb2654fb794caf76b3f2ec3aae16f1833938338678d746d4df5b90457844f7f39db3a63a49e63e5ae1b8ff7b3055f4eee0218d0b916d1a81a2c011e35ee6ea17950da4e283f9675bf506a0278265c6d906ede2a3b8aa971d0144d5f5d9bcd63de988bfc8b2a93d24e39134ac6cc5738c1d4fc41cf454da30d129adf91b22e953eaece1461d0b6b9eb69331a501e6aa2bee328b85a2f81f515e7375a6ce35826145c106f9e3d24db0cee0dd747c61102090c04e877aef5fc1cd090cf892ea58299d880747648a4e84bb95a3b121949b9464748a22e3a1b99378ca85a48299811113bfc45e361a632fa6b919f75c6dba3105e365b8d5243a350f5201d6fb880f38cfd9616136b02e4e898b1a1e731c9b88bfd5fa3d2702a79b89714026cf415f0ce671c1ba33446999af36aeed3de1834cdb2f60bd9fc1dfd28d324b5228b0c62c58c8ea158ffe4b24d88f3127a2d1156eaeb7d002220d8ae234b31c68319c83f54b688adf338f1b0266df40bae0919ddceb33faaef7769497aac186ebd4aa259052f7acc2143a80bcf7536470068f110258379f288056221d8bf69bf4096d66b6c2521aa9696a2cda68f9c654e27011ee96cd69987148ca8da516ecd80d2fe95ffef8ad75b9e3324736176ad6fbe84c1f6c8ba54e3f4e2630f80bba3fbadf111ac9ba4f24baeded3821bd1d200f325881d0360f3c3656848cd0eacdc0f7e772c5014089ce580678960d3be2c138c9f98d1d298b57cf8172ac4fb4da9d1029bfd90603e352a4d23950dc67b07aa34e10ed000000000000000000000000";
                let trigger_contract_input2 = "00000000000000000000000000000000000000000000000000000000000000142f29ea1a205210aa68d66d7c6039b66378f0921d488a3dae17f5610458bca9378baeb59a625359d560fceda345085e98b410362c6e1de735997c8586ca9e02d83a5e727d66bfd8aa65eef2e886923d770f9ededf0db28f71730bc6d7237d70cf981e4a205fc1971170be56bb847f9cefe67ac623b351a232e31eac1f0dfa362560f521610d1237c41e0dded4b2789d0cb351d89dd7a72f1aa18c791e132b98976914206b53a6456b5f362262a3c9c9a66a942e015dfb6d22d5025bcd0b62ad7f073cdf3bd61b9c9be8e7e04cb5f9f42455049766b9e14727ee012f52d12d37c3c60965be9548b3960b3c43f46909874ba613ffd4324299eaffbce26720d3f52da05c894b7e1fbb364d5b613e0a761d97e330b219c38b54b2304e039eb6e3314dade9a52283177233b507e9e2cc9d002324f07eb4643d8172e2277312d7c6e32a9836bdb7bf36cc017d9283693963c5118b433e8b6541e86f36d90dd85fed7407597376ac7c870b9bc51401bc5c997f166b64bfd187b5554b75acac2a6430d25df323025f6319104ece2c15074cc294b2145a010686f1ec985533c21fd0279fab873d96ca78484852f29dc089bafcc78074aa5cc3a5ecbc4744c1e8f3585d40d630b87a0278f48ac80261a0aaddbb2bb4be507287c4ab963bcb95fcbdcd86a6dfdebe2dbae048c16ac7f0e13d577a5a91d9537ea1cbbce4bc066866e2e7cf866a0fea07a14468f33ace21da2109d7d502b5d55acd268ea8728e9ab011c572647e2f31172a1828cdee293f16a99c45fa793928dd01a91ebf2f3bb9202ace8c1bbc57f0cd974d02f294efa06c8d837155aacf706038ff94360f3f4a20021ac819c0480d436a473fcba8237696db516a205b22e374dd33460f6f14e19965ca976cc97df2eb863a6794e22a074e262e77fe30d5b4768b0b8d91882487b77e47b4aad45f85f9bd91f16247eb0946226f47cd3087bba6231359310c8f29aeb11506793418c854900cc5718de05341fe7cf587e7c914ffa5bd5d4449a55b3e85237e30faec66e581a56f6beb732788baa2b78dc9afe5a57b87d6e80953e0b1a65bae13171b5458b7e95171775deec013274270111b3ff1ffb27177d34c6948602ab120a935801f76899dd9bf0461049b02922ec19c304996253259e2829eaf9839ae44745f8fe4635053c2c76e7dc76e1d718c9538d13c087db9d50c1fdf3170cd1ea763d3849ad136bc8d7706382a006b1237efb1e4c44e0bb44e2991b189a2701cdfa7ec6f656784299642d097300a7f90807d28d8bdf75e7cd16deadc8ed20d0aec00fea389aa8165484540ce0028b040af208d892577b313f5592d18233e9dc9c0f21df535f9d77f2739399753af44a5e412eec104097d1c93ea39677299483ae5372f86613eb42fb4fd32d0f2e6c26ccf3b0161006e000000000000000000000000";

                const options = {
                    shieldedParameter: trigger_contract_input1
                }
                const createTx1 = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                createTxId1 = createTx1.transaction.txID;
                console.log("createTxId1: "+createTxId1)
                assert.equal(createTxId1.length, 64);
                const options2 = {
                    shieldedParameter: trigger_contract_input2
                }
                const createTx2 = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress, 'mint(uint256,bytes32[9],bytes32[2],bytes32[21])', options, [], address);
                createTxId2 = createTx2.transaction.txID;
                console.log("createTxId2: "+createTxId2)
                assert.equal(createTxId2.length, 64);
                let createInfo1;
                let createInfo2;
                while (true) {
                    createInfo1 = await tronWeb.trx.getTransactionInfo(createTxId1);
                    createInfo2 = await tronWeb.trx.getTransactionInfo(createTxId2);
                    if (Object.keys(createInfo1).length === 0 || Object.keys(createInfo2).length === 0) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo1:"+util.inspect(createInfo1))
                        console.log("createInfo2:"+util.inspect(createInfo2))
                        break;
                    }
                }
                assert.equal(createInfo1.receipt.result, "SUCCESS");
                assert.equal(createInfo2.receipt.result, "SUCCESS");

            })
        })

        describe("#createTransferParams", function (){
            it('should get transferParams with ask is object', async function (){
                let trigger_contract_input = "00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002808b8456a65e5eb304be215f921a59ad5d0325ea59a7604d96719d52ab11e40a523e302fb1c6ff080c432e0e6d35871ac2717306eb9b3ca169eaee594e3050200500000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000001e59fe9999480c307566856ed0c3b961f7fb3e254512b921e3f2ccdba79a859550b3fe21fa20555998ed951df15d1392428a83c0721bfd33efabd029828c8ad6659212bfac13d7f244a8e91f1d75c990f7d33c77da77055854c7ac0c4e6722bc79e2903e611481c039ebcf1ceb65a998daad8734650f296843199490935af381587a88b7ff0a917df58ec1c92ad5cb4ad7495d4cb5813e44806a310707cb8b38e88c034192144fa91c8674880bbaf57b685361d919c366eb1806901b5a35e7deb6afda2fddca3aefaacc38454316bc266a87141700490c8234bffdef74eeb45830cd278b722ea3090cb074aaec4cf6298d204bed662f5cb973050108483bb9826aa5c0da8d4852e272fc9baa5c7555187a582bc117dc028b99c45e1babebe380c00f875f5d96c1a25d2386e39972e48a6747074c9b60e516742cce48b6116f1c300000000000000000000000000000000000000000000000000000000000000015d005b66093704554ca2526e7486df25a97528012f90af153ef1be22db0a204d6172d149fcb68069cdf330df524c1c48bade5976e7d9c565285df19b5d7b3f000000000000000000000000000000000000000000000000000000000000000001ea3e57e1eb9d31551eb3dcf4eb387f1fa74f3a42ade174ebc68abaefa59fe93511c99171b81ae1b8d462a92b78f5fcfc1186acb1d4d096afcb1cef231c69b3495f94b3f410a37c1985cf6a5ab973ee9ffb12759a797ec45976331e556e5a353f8717a0d37cec7faa6c8a42e3d6eb1475e2a0e66e0e964ab34381af90c494bd54f7943c08e615925b343806dc78043afa8be088574a191818e527bed33afd4c4cd334835125d7acc9ee50e87baf6f12088072bb0716c25cb1971ec9097b4bd599049eee40c8ca4c8e63b17ff0dbe460eb041290300b54aae2bdb0615997a5d852bd8404cedeca29f29aec66256495aa7e890b42f0cec0a5bd3dcd1a9dc864d110ccd2a4fd0cfa17c4764f5ffe0425e8d2ddaf28c3bfdf382c4d51c516b2ed70b5000000000000000000000000000000000000000000000000000000000000000113ee76d4aa1adb1842d886a2dc8a36036fe655a2f39427f0d1fc93cec18b4eb16537ba00b9a18317007459fc71f8c81fa1b05b2bd2535fd042791d430f77f2a210df4f430dbbdb544c41d1c0f58b6569be5f9743f1c8c21edd08f97d234cf53b384957aba1b0c8cf376e24bf20ed84d4a8aeba277827f1e86e2fd335b0addb017a68f13768e5fba72a908c8aa7b9a77619c715f081df25d8350d202ae254d60c456c63ebe090d968d880c56ebc564f3b433418df2dea3a78946703f61fa2a60fede6f6190e8e56a4d1130ab3fc8a025c2746c05ceeea2ec7ec3187a89b70f12d004ba5234eb6e92ce7dcd6f1818cdd388ada915d95ca2d53307ced2ba5ae440dfe4519838f237222e4c7234f950cd821c7f8eee81497b17b039cc800886fb49fb83beb3b981d533c4a1d60ef1b6c446417f809f1d7b84309e0fb0a53eca78ecebc19e7a783567b5b1aa551ddb86511aa0fe5caf36bf6ac0603bbd8f8769024d0cbf62c0ba46348d4ee29f1321dbaf96c98f73bd158ef21428cddfd299eeafd02f340b1a66c265de0e9be729d19dd4ece80972f7223e6098741c6e4b1d456ac52b2df9e2a4342ca9fb8e1ff0c840ff1237d4d0aa13f1b4d1dfe3d3dd9709534403a1a1da4e3153b9ffbdeef656b87f895ffab788d9d80af8ab710a132a6c0372d9c82cab6817ddba58f058308dcacbbfe408bf46b9fa10a926467eec328b3b86a6364b02a869aa847a4889eb384a53a771c34ee79003b5004665127a9f218e213ad5e86791358e9fab85ac98ccca3adc31a836687a48bc6fe3a4d56bca429e509ac1d555369bc1a48d1acf48df2df531c0e84c0116f41faa82c20cb53a0a50bda8f3e34aabac775e3347130e86f52101ab1add845f351ccd0e89f9208992480c64847d5cb5320aff2464cf5208903a6afa0659142000000000000000000000000";
                const options = {
                    shieldedParameter: trigger_contract_input
                };
                console.log("options: "+util.inspect(options,true,null,true))
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                assert.ok(transactionResult && transactionResult.result);
                createTxId = transactionResult.transaction.txID;
                console.log("createTxId: "+createTxId)
                assert.equal(createTxId.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                    if (Object.keys(createInfo).length === 0 ) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                assert.equal(createInfo.receipt.result, "SUCCESS");

            })
        })

        describe("#createTransferParamsWithoutAsk", function (){
            let transferTriggerContractInput;

            it('should get transferParams without ask, ak is an object', async function (){
                const options = {
                    shieldedParameter: "00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000028024f29711036cc24284af83ec568a0e73593a92076b6b521c735f363a0398cb159916c317965bde94992cc874d297675239488669bdb348c5c74f7aee3321cf0a00000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000001f6125a6c7fe185e1696a2857eba009e05fdd74881611c2cec0189dbf1a91db7664a9fb97d926d518a6938a690212864c90a1fbe6f1909fa19d7d0b098b11df12767d97119672684dc02a26679761753dcb0da4d5b04a36328223f7997def41b5559f2e608e8a4db9c818eb4e11cdadf6d70be267146e1d4322c758223daf4a40a485c9ac6b90f0277ca94c66d9d799f241114f10969dd4131084000a50fcca587e6d73ba5245cd7bdd9c356fb119b30fb1d69284b8c046bedc605ba1e45e2756c1c39c28afbb2688400429a4646145e56579a0678652f2f45fb8fa3f39a6375e1929db7a5eba7977befab248729dc0db837a33b780a26fffced7decabbbc466a8e2125d3f30f51459c92b1fe99c3391ba77ea43864d0884cfc106e9d1e4cdf201c34f8618547e1956fee1c31b649f3a7335b01a6bab3b20290ba05e27a16e8e70000000000000000000000000000000000000000000000000000000000000001d1864e7d85ee1d237f0300eb83ce02e03d8f2961353ff6d8fa1f45f71d12e0a77f7690b95d64c43b8b0bf6a2eb6247486cb0f8f7e8007c26dc1b88360fb0c1080000000000000000000000000000000000000000000000000000000000000001c93e6b283de7d4018b356bea54096b48c8b7d14687434d7955633f587317c859962d773f958023ffab47b14741c3950a1e13b03c1b0df919155f8eca7b318e192ca3a56c1e6a81463e10a0dae4ef73c5c0753a862d90fdffa38c66b103e331beb745ccfd252477fbcfc6c6558e248a2b2de47cf9cefd577c22c6e2a6702da9e30f9a13cc5017e622821f701a4a259f8996a85ec3a95bcf04fa6b8d45fb9c6408787db203c78e55f059351b8f5f7422f31f7754b48914cad06e67ae272d812b4c1121b7239511adc731c15390118164d3d06a54237446c7e66a8798b696909f0855f03762bddaeb65c2493b113ecc93ca90b80413fb6b9f8774fea9948a095f49d241992d5447a8ca7f15bbb4fe953e99cb82a8162b8ca6bdb7236637aa3562070000000000000000000000000000000000000000000000000000000000000001c940099a10d28af679d043be4cfa54658e539b64d18cbd7f9afd784676a9ba7c4ecff2a9b8113babbff9a79ec4b21c788bf7b7586e04620b55d3847a366e74069fe8a6e94b83249ff6ac72dc3d2e08b5bae79e7f52de36df706705d6c0f626e2fc89b99e0caf3ac0fe9f639da00ef44247505312dfc2554ade13310107e06932028b1ac2205bf4b3c8291c8c36b1533128005f8dfbbead549cee1e14486367665a8948e62d0677ac22fbaf84e08e3a0529d2ad63e8256a13f4be746aca4df546f800e62282c0abee317e78a45421aa28bede3c37ca8789e8496acfba5d412a6b9ad0663d0464be30459dd8a390370f929053d3b8f1b5f7f8b61df1f995488bc95d86dfde580c43173fa9d782eb2af8b4d92ea05b2bef763de09fbf8a41fd545ec462bf0f2a157de6895045dfe61604653d9c6a5fb2a2c35987ab5023fd0b166ac77381c9cac4c091cd648b9e9f0d0e7aa72b3409ea9a80a58f696c586e102277a18e8f436b4cf45a68ff0c4765840d220a45fb5fb568f981c55637003cf9464e41fc3ca9b685280453f16375a20ea8402f577a6ba17f9c4c587810bf24059a7fa355c61e1109dab103606598992fc45427c4d71ece566a6e33a3648f66c1a5265aab8b62962f4655b4dd57157b6d4944795182d9217c890582e7296c439706c3325e77ae9dfc89a99d92e4edba575d0454adbd8ff273a6bb2299e90376dca8a5d15b98cd4462d42f1bfa151e18553b488020a6e43e21a7e04740aa68e066313fb5645671938b7f3388eca40776286453111b63a928a0f14f7412a9871096f8300493ade7ea160dbd180422d43d01429e422d3b575f0aceb4e1eb5fcdf6ffa5c3c899a570cddea3cdda97ae0d243475a46cebd7787b7647be3fe6429eddfbf6cc9af2b9143094cbc991910f4bf21ae1f0219424f9000000000000000000000000"
                };
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'transfer(bytes32[10][],bytes32[2][],bytes32[9][],bytes32[2],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                assert.ok(transactionResult);
                assert.ok(transactionResult.result);
                createTxId = transactionResult.transaction.txID;
                console.log("createTxId: "+createTxId)
                assert.equal(createTxId.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                    if (Object.keys(createInfo).length === 0 ) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                assert.equal(createInfo.receipt.result, "SUCCESS");
            })
        })

        describe("#createBurnParams", function (){
            it('should get burnParams with ask is object', async function (){
                const options = {
                    shieldedParameter: "838d3f8024d506a4d2ab2d1d151842c30e6426e98947f78d65b4cbfb837258674f3c4a5a307096a2a515867c3512d87402700ec30c73f740b0dcc0af94c8b1002bc1c0505355eabb2941483bda3fe55dec9d81e4e448494be201e3051dd3129a64e07f34164ea7a3866d2caca65cdc795c76cf73daa93c7e0825c507d91abcb396e3ae22687701650e5e44eb8ca372fe61ab9cb2c745df4035869715cfcd5ea8cd0c122a2a2e33bde3b34afc6c0eb3bea0d7ea8c00c654cebf09d8318a510af13572f176ba1138f1de786ae9298915589a66a22d16f75638aad20cce2b69cbb705bea5e8026360ddc1f99b655b401b10daa4bc919a5921824214c01f59ec73e07d57a1aca711c8c59fe149dbce1ee4a7ae5abfeda4527204f3b9c4146acd783eebaa594f9487818f5da2cf05f0aff92fdd7ed71f34adbfd0802e91570f4f87585dd984e0e96d2502713fbbb8cec807c32e08ecf702544fbbcc5c66c4b77ee5d95010df3af25841487c454566681567880a9089d83a6a19269bc5dc342703b50c000000000000000000000000000000000000000000000000000000000000000a4dacf9276142969e6a256a65ed17b6a0ddd28b72f86489063f4e084657a45182bff4e77603a1a9e3a2f56d0c62dcb9e2e871ca98efa76e48ab82c89ca08bb1000000000000000000000000415624c12e308b03a1a6b21d9b86e3942fac1ab92b2d45e71add19e02efc1093b01fbe8f6abcf74eea7b8c48f14424c7973a2015706f35719be5063da0d833175ba43dc4cb9c36e61434bf3149ce4ab470e3d61fda92fe66df9794a427e94ea4c8b428c7770000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000000000013a6518fb31cc00290ea4a30d4976e3432ffa7525587fbb8af8eb55b497a7ea5ce75d0395fe02551720df9ce74025b712af71fc56065248b2d750bd0bd96aa79af9699c412314e4c14b7529888c414896e84ed4204256c5ea99387a50dcc2821b92aae8e78d07ccc903ab2125c6cb153f459f11b700aa0fc852c1c10e2499bfc10132351a7e092b5abd9f997ff953881d9579f64579708c7767f75aa178916cb955de8f3bebac32fddb68e6fe30d4d860af920c1531fa2e4aa06b2f311c131e3e0236f2ed16189620513dd1b4f78ef4f3ebb886a5e2b12a320bb036101394a03ef96042e2cff92fdf70d68efaf052e9e890f340160c53fed29d45e8a573b829b658ad9c1107e137ac3016525af4bf93c3194cf5262d00f03bb0fd7d525cdfb6a6000000000000000000000000000000000000000000000000000000000000000186992ab4262aac3967db7106ce0b0454e886d4a22ef9cbc100ca5848149c600f6ca27ddc38496a713a46b035a0c68b725471dcc3460b77dcdd6464750be23340ffd081d218acddb9f850f6becd3d0b073ba658c04d3b605b3e4d6933ab6f1c175f68b67a7db4309b697fddbe3804a5cd99ae8ef065cd1d323f6afe50a0dc22ce7d09fa45e8aeec718d7e2a3b485106139e26c853a0c5e065d4c40cc1745e87bae1408ebb3eb794386c97ea2174e4dd649637c061a91629ba8145f68ba5883831eb58ed67f99c6a2485d8012a155ce4e0fcd8ef63d4942c8e9a7673abc723635c526dc0ff3377fce28fa847aab0928b532e013f91f8ebd7ada6f7a59d90cbc91fc8221cd4ce8a23b87d836cdffdd4a551c76beb5df59c93b7ada5ddcfde2f000e0832ff4de48d85f2233a112920f21a14e0a81dea821fb0e52ae70a272146e21b9d6f2fba3c91cedbd822a5d4437f00d8194f6ffc514877c969dd6f9cc500140b9f4a639a6d095beec2b0a5e19ebe2cb61cb1643dcff76aaf79e0a1ccec26d7d9b123057e0c1a4e6390e6ee23c9b1311180bc416c07c06522a75444203905ce884a42dc9ab18532cddc4383329b271a8fbdd50e1942e4088135224ea855868973efd2f8f5129519d7c07f4b47146b9fd21d1a6804ca67475d92e491d299da3f00517a0b73301931af4fb0011253a2ede53ff49ba7d3f3d96379ce85af91a92d90a165d93ae9f1096708af8cfc43ccebf6ce644b994ea43b8e6669d766ba93b8c0111ccd9b446396a8e6bf1ad86c7d6cf5e1cfc971bbbfb2d1855f751d71f414c17d95780f866251323170c4354ae8933c0f05c9beff18ce19db7c45a3f90d12a842a11e753be862639088578cf3672cc2b525c79d1c79b608ee30e6668657d870738fc234f77160ccdc7b4d681ba06561ca78cd5f000000000000000000000000"
                }
                const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                    'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                assert.ok(transactionResult && transactionResult.result);
                createTxId = transactionResult.transaction.txID;
                console.log("createTxId: "+createTxId)
                assert.equal(createTxId.length, 64);
                let createInfo;
                while (true) {
                    createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                    if (Object.keys(createInfo).length === 0 ) {
                        await wait(3);
                        continue;
                    } else {
                        console.log("createInfo:"+util.inspect(createInfo))
                        break;
                    }
                }
                assert.equal(createInfo.receipt.result, "SUCCESS");
            })
        })

        describe("#createBurnParamsWithoutAsk chain", function (){
            let burnTriggerContractInput;

            describe('#createBurnParamsWithoutAsk', function (){
                it('should get burnParams without ask, ak is an object', async function (){
                    // makeAndSendTransaction
                    options = {
                        feeLimit:FEE_LIMIT,
                        shieldedParameter: "6ff60819cb4f028fd17dc076a41d9e3f9442ef4c58693ab24517316cf83546809a5da3553948b3f82beda3b2cd45463ea82b924c758c389f54776838de11240b1bac2c4c068c2fd908115d9cb7d67ce12bfbc59938eb489d72af281adf7443251a3a7c136753f9f178a4fd7708efc1a8f91db6eb91596d9586456e4bda72d50ea4cfca09ff2a08dd99dce954ad77adc1e975cf82e19787b1bf047edb25d004a4421d9db05a680be0c303dc1070d6194db1494484e931968b46d1e9262c5b20a54320c61e13b5b4c0c44e730b925ad976709ad2435e3cdfc1129c52b9faa6631a0c784a7e898de4a3735a238630acb930549074b75c5ef10deeeb212e52e813d3985016a6a8d560a3f0feee39c39cfad5b3d57fcdb28b30655e71601eeb27b79b4b799ece1cbe858bb3ad4963926e95de83f13de5543f7b100fab2ec58fff507ed92ce670d7a175898560bdbfc9285d9b014f74b267377e8c0fb0f55f3cc823101b7f731da49970a72499afa356abeeec1abb8cd58cb70a68a03343be56cf8701000000000000000000000000000000000000000000000000000000000000000a11a1fdda6e7b77f80ba8824936304feb6f3db02874d13c51522d2989fc455e65e7da336d09fff1e1783742183f623fa73f486f010a730da37db06752cfb0510c0000000000000000000000415624c12e308b03a1a6b21d9b86e3942fac1ab92b50ce775e3066f989a427f8da0b37e94ddfaf85e4494798a67a1c28b7140f800ec9b352d569c7b9567a0a54340eb5045b3d0182c2b46c0c6cf10e2a41e8a1dd5061cbbd938b916bec0f1612c9f53333910000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000150155e880328831f2f1ac44b0ae09dae96afe2d81cbfd282af1ea217379e24624c2e1f52bc82c63219f7dd914c926652cca89c025c4ddf68949184488b3c6407feb944d7fa269b5ddb70990368f3c72786880139931afbad1852df833b4a56afb8fc5ad27c9e6b93a8432b75e8d7d4e4748da5012cd8944287798c0b2b279ea507df5d9a66ef14b345f432f30fcde75dab381ccc7f75d2c7996b809462c26298b16f37ecda10d2db68a19dc1d61ea83aa219eefd499846c0a031c483374afce917d55cf86003a2a085264572472f8b9fe6a64054936a7c56b6dfd8f45f4d90fb6219a1960c921def82af5b1b952064dfa075d8c2a4e168b216c7b9f7c32508a0bb8482fd8e1cff65a054ca88ce895f2a2d7d2438875a1875d4cc4de1842aae470000000000000000000000000000000000000000000000000000000000000001a8331894f43cb8524a95978831b17d968e65c79193590690ab6c4c96acd083dd294be13ccba4c780d4edd2de57527797a67140fc65024118cdc8964cbc2076bcccac83ada8a42c2445944a5d43a3ef19c80f6d618a0ae2baaa026cd19efdf85eebc3e18a68f249d5ed5af6bf4779715eb4aeef4f00c7214ffd7aa2ba16f19bfc651c16fe675102d4e01eb64ee9bb48f75394cb04d10c33360a442fabb001f67d519c6b8c068a06a8d2e78c857a694f95159f4cd48a6d0bd8d57d0691e10a237bd7927cca11f8636217a6516b09332486570de92261e9a2c98c47ec21d92c964010ce189a96afa7f9fe0c5e46a26a2cd38c12c42a5792de17e9d2063a90384437f586ba1eb541fd313647af5c6e6b0df9baf788aca21658baa542eac52ec076ac4107062c154ce6ef8df4d35903d5ef3e299c6352206810c800bc4873f7905da6909a09183e64e08aff3a650b6cc4ff17f277011bba8f7808ff800dfe22e35c6d14b9be554e7459db16c75825bdf5ebe328e8dbcabcee1e0bae729e2f858dedf3af3cad12ca52a9983e11982392578363d3160cd9559e74957f15c5b6e4a29545e911dacde61e66ccf30ce88b4fe14d02e2b82b39ec9cc59fe12d61e9d58412e3de95f8d5ba5145dfc0aeff23a45ba2e6fba548ebaddf2c85f8ae8f887334951fe495c89959787c4b42c5e2100be12bf825f633aa1d40a2366b2516378e1804ac7026497b9f6655eb1337cf12ddc6fe94c63201288d73d1bcfedb797ce041715677ec09a845f17d689c034af2e41ea5d6ec9a5f8dfce1ed06d46ef66610a16491fb23db2f5a8906102fc0df5bae0b927b3c5af6235e29ad5c24631449e4919bf8285980d0d2730b870c5cedc4a22ffa9dabf628c039e0be0098f58b19351ab51a5ca7a6c63eb00efc66009cd276d34bec9e1ab7c9000000000000000000000000"
                    }
                    const transactionResult = await shieldedUtils.makeAndSendTransaction(tronWeb, shieldedTRC20ContractAddress,
                        'burn(bytes32[10],bytes32[2],uint256,bytes32[2],address,bytes32[3],bytes32[9][],bytes32[21][])', options, [], tronWeb.defaultAddress.base58);
                    console.log("transactionResult: "+util.inspect(transactionResult,true,null,true))
                    assert.ok(transactionResult && transactionResult.result);
                    createTxId = transactionResult.transaction.txID;
                    console.log("createTxId: "+createTxId)
                    assert.equal(createTxId.length, 64);
                    let createInfo;
                    while (true) {
                        createInfo = await tronWeb.trx.getTransactionInfo(createTxId);
                        if (Object.keys(createInfo).length === 0 ) {
                            await wait(3);
                            continue;
                        } else {
                            console.log("createInfo:"+util.inspect(createInfo))
                            break;
                        }
                    }
                    assert.equal(createInfo.receipt.result, "SUCCESS");
                })
            })
        })
    });
});
