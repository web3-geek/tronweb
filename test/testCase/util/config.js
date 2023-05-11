// const fullHost = "http://127.0.0.1:" + (process.env.HOST_PORT || 9090)
const fullHost = "http://39.107.81.225:8190"

module.exports = {

    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONSUME_USER_RESOURCE_PERCENT: 30,
    FEE_LIMIT: 1000000000,
    FULL_NODE_API: fullHost,
    SOLIDITY_NODE_API: fullHost,
    EVENT_API: fullHost,
    NETWORK_ID: "*",
    /**
     * docker fund account
     */
    // ADDRESS_HEX: '41928c9af0651632157ef27a2cf17ca72c575a4d21',
    // ADDRESS_BASE58: 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY',
    /**
     * testGroup002&003/nileex fund account
     */
    ADDRESS_HEX: '415624c12e308b03a1a6b21d9b86e3942fac1ab92b',
    ADDRESS_BASE58: 'THph9K2M2nLvkianrMGswRhz5hjSA9fuH7',
    // ADDRESS_HEX: '412ac4526930de490bdde77f98a56bd23626e9ea6a',
    // ADDRESS_BASE58: 'TDsLZoTfrnN4cSzsqAatYn9PRhYEwR1z6z',
    /*ADDRESS_HEX: '415ab90009b529c5406b4f8a6fc4dab8a2bc778c75',
    ADDRESS_BASE58: 'TJEuSMoC7tbs99XkbGhSDk7cM1xnxR931s',*/
    /*ADDRESS_HEX: '41d1e7a6bc354106cb410e65ff8b181c600ff14292',
    ADDRESS_BASE58: 'TV75jZpdmP2juMe1dRwGrwpV6AMU6mr1EU',*/
    /*ADDRESS_HEX: '4125c34b27ca968abbcd343cc4214c01d970b9440e',
    ADDRESS_BASE58: 'TDQsxPhq9bgmnw9CeDSrXsYjqt2rb1b3pg',*/
    /**
     * testGroup002&003/nileex witness account
     */
    WITNESS_ACCOUNT: 'TB4B1RMhoPeivkj4Hebm6tttHjRY9yQFes',
    WITNESS_KEY: '369F095838EB6EED45D4F6312AF962D5B9DE52927DA9F04174EE49F9AF54BC77',
    WITNESS_ACCOUNT2: 'TT1smsmhxype64boboU8xTuNZVCKP1w6qT',
    WITNESS_KEY2: '9fd8e129de181ea44c6129f727a6871440169568ade002943ead0e7a16d8edac',
    // freezebalance
    ACTIVE_PERMISSION_OPERATIONS: '7fff1fc0037e0300000000000000000000000000000000000000000000000000',
    // freezebalanceV2
    // ACTIVE_PERMISSION_OPERATIONS: '7fff1fc0037efb07000000000000000000000000000000000000000000000000',
    UPDATED_TEST_TOKEN_OPTIONS: {
        description: 'Very useless utility token',
        url: 'https://none.example.com',
        freeBandwidth: 10,
        freeBandwidthLimit: 100
    },
    /**
     * Shasta
     */
    TEST_TRON_GRID_API: 'http://47.252.84.138:29086',
    TEST_TRON_HEADER_API_KEY: '826c74b6-8f97-465f-99c1-e7ea5db0b9fd',
    TEST_TRON_HEADER_API_KEY2: '5788c434-8f78-459b-95dd-4d977ee080ba',
    TEST_TRON_HEADER_API_JWT_KEY: '4dc82750-57a1-4176-9ffe-8de7a2b5018a',
    TEST_TRON_HEADER_JWT_ID: '008f572b88cd44adb17d4bc3536d2d9c',
    TEST_TRON_HEADER_JWT_PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA9AjO5R+uCIcP58OddqZ3MNyrltDMw8wotdzJBFEUrsyL/ug/
EG2ciQ4PAfcml+yL17XzJr4P5DJJZ1TsYa27aSLB+7xWcgPACanYZegAPtpSF4e+
ZpNmKknBVt1KFMD4hTHWWcFcv6eqMlMAW2qAXqiT5XnQdW+oQBDwyZt6DzjicBrP
hAOA5NwjJJF5RvITCI5OR/ZjhZYjruPSpQGUlmNrxBoKvfSENAfBfp8W2ojOVgyF
64h/yHfXc0GcSVtC5zifrvRGki1c7ZXHSOplQ8uFzfOxk5QiZblNdM2YI3AEWvph
TEjyvhrZne6CT2gcjND4xWsmedq7hlrHYsVA7QIDAQABAoIBACMyEgThqMv6DsUy
ZUdzgsU9TlIWEzI6A7UW/rbsqrr7LUW6YT4RUP5DVM7Hwn0u1Ixr5YG0773NsuCA
UwdTczAanzebVixjdhLuuBMafs6R1j0misNohteag5PvnnuXyUAMjAmt5Z6Oo/FW
HzsQBSuhzJLQGsyVKgLzboblMZl4Jrciech9uBno0ZzGddBCmsjknHEmxhWUb0qJ
EgKCj4FJCr2bNg0Q1rtI24VjDoSboxjY3e1zP6zcp2ZYdQDvqL7glGcF9Anba6nm
RrW6FZ/HCe+2t/Vs2nhQFgHLtFPg4YaPt20bngH/p7/dRgh59zIvDMfHr543UPWo
HxOA3oECgYEA+2ML0Fp59pqgJjkXExEzUFr4KZz0ODhsLtbIiEsgqrMRmiejtosJ
vvwfIiPOQPzyFP49jc/IVJJufqE49tCVuYmzxkMIs8WpHIAILxCmXT56K1yDTp43
uAja5bUMH21wK1w0Q1utQnc26NiMKGqeJhcqJY3+geqy+3nMxe4CaJkCgYEA+IM4
yjao1WCimI6F69LuPOVJusZwXlGJmCK9rDDNrvT2tPBDGEf26Nud5wNRbxAfq3Z4
AgM8E1+8vuafJNaSyhUBdMmRWq9/OhvQh8Cj7VHJIKABkRsmCIDEcy6JupdOrciu
HuSAFi2aVRqeGgkwrMlV0TCWJvH8w0XV6+g/63UCgYAD29tckWb54BnBPHMcOdFd
1Gemy9/71PHkLivZ271eoW0NvroGnU/C/L/FmGMcIEXfCKANQzlCAxVrIDJtp3oE
5RY7XuANUmVsKJL3lfvXxpO9gqgJVuhoDMq/Z+4NtXJZWAr9VbTtJkNTg69zF1/i
Gczt0qYrfFzO+2mnSCYFUQKBgQCfi8d682qjSx44aVALXek7yUzzj5D2zMxUkwFI
ujBjAbwd4B6DSTh4uP6AIL44Wpaqgy16xU7ddVp9CRzlDqlA+glsTDh4izFYQiE3
9nKH2zkQLAm1ekOJs/nrpNYhqCCIK8214admFbL+rk8QkhPg6oWg/tt3d2Z6i6xS
f1ICPQKBgQDE/F482n9DemzFiqleHAW1AhfSUKKUYs7kHuYVStlJ1iEcPS9aezLU
rH4WZ2xKqbSvQNcyrdAP5TUORcJWc7zg6GCkRJdjXPOqk78n4tDmh2jtG826DAwY
6EcJbGmCAhqQNMDDF1dw8bvP2XGPVLD3hWjl+NqJCV0KXZdkZLqTbA==
-----END RSA PRIVATE KEY-----`,

    getTokenOptions: () => {
        const rnd = Math.random().toString(36).substr(2);
        return {
            name: `Token${rnd}`,
            abbreviation: `T${rnd.substring(2).toUpperCase()}`,
            description: 'Useless utility token',
            url: `https://example-${rnd}.com/`,
            totalSupply: 100000000,
            saleEnd: Date.now() + 2592000000, // 1 minute
            frozenAmount: 5,
            frozenDuration: 1,
            trxRatio: 10,
            tokenRatio: 2,
            saleStart: Date.now() + 600,
            freeBandwidth: 100,
            freeBandwidthLimit: 1000
        }
    },
    isProposalApproved: async (tronWeb, proposal) => {
        let chainParameters = await tronWeb.trx.getChainParameters()
        for(let param of chainParameters) {
            if(param.key === proposal) {
                return param.value
            }
        }

        return false
    },
    SUN_NETWORK: process.env.SUN_NETWORK,
    SIDE_CHAIN: {
        /**
         * docker
         */
        fullNode: 'http://39.107.81.225:8190',
        solidityNode: 'http://39.107.81.225:8197',
        eventServer: 'http://39.107.81.225:8193',
        /**
         * nileex
         * mainChain:event.test.js;
         * index.test.index.js;
         * other.test.js-testTronGrid()
         */
        //fullNode: 'https://api.nileex.io',
        //solidityNode: 'https://api.nileex.io',
        //eventServer: 'https://nile.trongrid.io',
        sideOptions: {
            /**
             * tronex
             */
            /*fullNode: 'https://suntest.tronex.io',
            solidityNode: 'https://suntest.tronex.io',
            eventServer: 'https://suntest.tronex.io',
            mainGatewayAddress: 'TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU',
            mainGatewayAddress_hex: '413af23f37da0d48234fdd43d89931e98e1144481b',
            sideGatewayAddress: 'TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX',
            sideGatewayAddress_hex: '41a74544b896f6a50f8ef1c2d64803c462cbdb019d',
            sideChainId: '413AF23F37DA0D48234FDD43D89931E98E1144481B'*/
            /**
             * docker
             */
            fullNode: 'http://39.107.81.225:9190',
            solidityNode: 'http://39.107.81.225:9197',
            eventServer: 'http://39.107.81.225:9193',
            mainGatewayAddress: 'TAhbanXSof8S4GdYbXdgKyQieD2b4bVKyv',
            mainGatewayAddress_hex: '410804520ADB883D15D6E074BB616400E3892A00D2',
            sideGatewayAddress: 'TPFp5W3zjtxdz6dLa4vqiU52vr1ZbPmmdf',
            sideGatewayAddress_hex: '4191BD92302BD7A084C8963201E30627BC76C347CC',
            sideChainId: '41F7AFFF7316CDA1E1BC9B21B7CC98BB84A4EA5510'
        }
    },
    TOKEN_ID: 1000001,
    DEPOSIT_FEE: 0,
    MAPPING_FEE: 0,
    WITHDRAW_FEE: 0,
    RETRY_MAPPING_FEE: 0,
    RETRY_DEPOSIT_FEE: 0,
    RETRY_WITHDRAW_FEE: 0,
    ORACLE_PRIVATE_KEY: "324a2052e491e99026442d81df4d2777292840c1b3949e20696c49096c6bacb7",
    NONCE: 35,

    HASH20: '340736d60acb72d31f3ccf2f239e3037466ad593fe1a810604869ffb37408368',
    CONTRACT_ADDRESS20: 'TKzAbWH9gzPA2SrjSbv6wKsu7JrYwX5ABC',
    CONTRACT_ADDRESS20_HEX: '416ddfaa50bcb0c96cbaf1b5579821aedb87846ddf',

    ADDRESS20_MAPPING: 'TWKgfWi4cLHSEwAfuqMvLE1f8DeUbZrtJx',
    ADDRESS20_MAPPING_HEX: '41df41ed44271678b166ad6bf0434e0b4055b98346',

    HASH721: 'dec0b5e73b4a3ad5061337b9277701ea8a7c1f4dd5ff14e11b9c9eef00c72562',
    CONTRACT_ADDRESS721: 'THczcX2D1mqCDRN1JgkhxyDeEqPBz8oBSR',
    CONTRACT_ADDRESS721_HEX: '4153ee58746945a21c22384ef9b71c04465a5db889',

    ADDRESS721_MAPPING: 'TVG2vHBeWac6AxLCJE5MjuKtD7JVKRKkPn',
    ADDRESS721_MAPPING_HEX: '41d3990b7d3342cdef07d15c59111faea207286aab',
    TRC721_ID: 1001,

    Z_TRON: {
        fullNode: 'https://api.nileex.io/',
        solidityNode: 'https://api.nileex.io/',
        shieldedTRC20ContractAddress: 'TS9HZjJW11Uqj84GBtgCRitw9Fduzo3rqt',
        trc20ContractAddress: 'TKWMMoosiQ28196tuLMMw8AiuvHTXwPwkm',
        transParentToAddress: 'THph9K2M2nLvkianrMGswRhz5hjSA9fuH7'
    },

    accounts: {
               b58: [
                 'TGLRhYkQdLJ5kRZc5DG4xCdXMmSo1cEv33',
                 'TSG1pK3Ybuc5wk4npb9SWDX84bxUYjvN8Q',
                 'TMmuqi7xy5H7YYQAKpxoLQHNf3tLhdfr3L',
                 'TWgciQJGBsk443YPQ3yfhUSL2H52AoWveq',
                 'TSsxxEgE92CobhrtGBTdjfmsA68UWzyX2G',
                 'TN4Xep7sAzyRFE1svCye31i5duCUidZEKd',
                 'TPUEYjyk4iXHtAuE39btP7iyUApGjVtys3',
                 'TT9Jxyi8c5qFcWaugqJJktaMSY3o5SDUcb',
                 'TRzHXYWpGjgv2mp1znxw39v6oLF3MNjjD7',
                 'TVNWbba1UBWQQaKHKK2MWbdwPBi9jZVrLW',
                 'TQc8yZ3VkYnSaZUvaewoLqcfvgciJJ2hMH',
                 'TSTFduezuKtfJDX4tqhpjkZ4vkfyihCWL3',
                 'TJiuJNMMTXCoRzz5o6Ef7BnKf73ccHzMnL',
                 'TFeaNNmA8KgRueHip6gmw87B3EYvSCD34d',
                 'TTLkLRGSQmAvTLKNUcvwyLMeeZyGTFSN6E',
                 'TKCDGsq2wt9XVGJ2qWgCd3ieuh5bicsich',
                 'TEY9JgcBpRZT6QfnRtFnQYgygmtoL3mjnj',
                 'TDg7XGPS2Aioji2Fja3KxKEasnnXpfL5GM',
                 'TENUSmbi3iCmYtgjgtXJFqRPJ1FzggrvXN',
                 'TWjM2pdYMFNJrXtsaVB6uMdERrdY1jTPL3',
                 'TCNyEXoo5beLVmze3VeCcqB5kpYG2MdUbF',
                 'TUVnYHxwMAzwQFQ4nmPNR19VwW8VuuRrvA',
                 'TMA7UnXbkvUHo5bmrB675PkVRBf5TdXPua',
                 'TEekAUxXgotDKCqEXirYf2Wcx9MnGb431h',
                 'TRuAuTxkZrWQ3yfEBfqvFf6H3ZkPCDKxzk',
                 'TNBUtsUoVSYu32thXaXB66vkMZNC1LK7ub',
                 'TDt18ZBaENeCgH9GpkNWGgDjVauStZsXH9',
                 'TTyzzZwfcSUmxH9PFpWSHQLYjKqcFNKFos',
                 'TRMPSBkSCoxrrXQtngS11jvG5hMu5KCsyM',
               ],
               hex: [
                 '4145d416f8a8a36544504ad42df72fc1ce39c41c87',
                 '41b2afbf335856bf7d27309a3ae257a77e0e3f35c6',
                 '41817e9bbefa637020e063f1e08a4b8edf75452acc',
                 '41e3375d54adcc0f4aeb4c9b3edf895a2cd4a803b9',
                 '41b97c54cef6355aa06a7b3bdd4afb98ea525ce4cc',
                 '4184a32881c92bc9842fe387406bf454e4265a1e80',
                 '419416fd23f8dfae2efe36a4082cb828dd2c68956b',
                 '41bc6346cbcfd866d0941c089db94ef21b6f7a09f0',
                 '41afb634cf4bce5bd538095e98285bd26f7c263a12',
                 '41d4d2a51d671093b28b55b4826943dad8c3514c4b',
                 '41a08dca759098e9845edbed4c30f2335bcd6a57fa',
                 '41b4cfdbfdc210a2c44c6944c4699ea34d70b4e97e',
                 '41600488362f4bfca9fb6d38ecee8f7a96c0e510f2',
                 '413e4ab02a7e21fe6a0594b7ad11e5e0fe060c23ff',
                 '41be8d0797a997aa60e64927750fb8b1248e345f00',
                 '41652ec4686ac65c95ced42d797edc8fdef2e8c0b0',
                 '41321b24fe2ef8c58f2c32a2ae2cb4515d56dfe491',
                 '4128a4dba52b45c9434c1f786f16a380b954591e3c',
                 '413046f62fa7052fc480e4c2e2791d329f0726cfa5',
                 '41e3bb857c92c81259af5385535d924b062629fd99',
                 '411a6ebdf03ece1b102ea9cdedd3a548eb51f6ebec',
                 '41cb3abd508daba03e10e3cf814a1c0ee368b90979',
                 '417ab9598671e009d1e21cb71ea17efe66ebbe8c3a',
                 '41335abd203d9cc6b501bbd2afac6f00f42464f892',
                 '41aebe9942d43ba71851047759655f50de48a28534',
                 '4185f3c49cb7ba1c7cfaa3181184594d3f9091728e',
                 '412ae4839dbe9e11050a58ea0b263ef6f2991c7320',
                 '41c598a7ea4e63c4999ed82b810ca0bb15595a9006',
                 '41a8bbbf443d3f4b291968c6efa84e80bc8a1e8c87',
               ],
               pks: [
                 '5A3D86C05B64106C1A1619BCAB9AA82682496552E6D99153ABF3FD37058462B6',
                 'ECB611BCFE0963BCBD82B1E2734DCEFDF15DAD6EAA0DE83AFBF2811202CA5A95',
                 'D6DB5E7A5FE3D02FD14EA5B3674CAD715019655A7A085D56FBB7679CD518217C',
                 'A6E8CEF978C27B0E7396B3099ABB2DF9F19B6565497E5F07E49F01B210D0B497',
                 '2AFD8CF67841E212496F9A9F2892DC54AA96B291310289BF9BC1969B9DEB2CCE',
                 'F40298CC3FF3EFB304615DE080DEA93B4003D9A2C4D142FFAE8511B4D0B87E91',
                 'A99A9423EFAB8A1E9D4DD29A3B87677E25D00AC1A834276B2499CAC3B7289642',
                 'AFDF9477275A408411F5B5AE3DB329259D25C8E9D39221AA45E09A3F46A0D287',
                 'B429467D1A58A1DCC317DFF30675B0417549533FE2154E4792994EC81BC2AB08',
                 'FD63B93663DDD6E08E1AF8D8C8289FAF315A8B872D0085F373CABFC1525588B4',
                 'BD9867EF34CA46B5766EE712EC26FEF3E95D9313A2C02BB3D3D7082FA3C45EA1',
                 'DAD32A5DE726B3981C980E4EB9C5EECFF7DF43AD4855CDFCE8CD15DBE6F2DD3E',
                 '31F01041500C42EB9D2ED0FE7351D967357D6D1E6362883B38CDA4C31C5A179E',
                 'ABCA5C527B38413E7DFB6772FFC84E03B80BFDB6302203BAEDFD8B1E52CE869F',
                 '2B0A75049DA919E467563801E3DDF9BACE1FD0C6924D7E0280E08CA2EB550808',
                 '20B28CE2C24A0D2D0C951209749721CDADDF9E219D8A29262A76EB9156F45E49',
                 '3F874FB132B9910619CCFBDDAD4AE9A4D9DC9BA4292C901C8C08FA9F8A2CC5C6',
                 '3A6F9B6D83B4976EEAEBEE42EF48CFDAB22BCE6323A14DBDDD5C891002D0EA64',
                 'DD1C9EE2DDDD2D28A38C6ABC492FC4BF1CB43388A1437104ACA6757631D3AFD2',
                 'C33D32236F0CA6F5C80D2B2D10B3DC40574C35F7A1500A876044076DD9B2D36D',
                 'B84D571DB5D79BF9922FC4EF6DDAA459631D8E505E7DBA7E9FC0807B3618A5D7',
                 '55DE98681684267B171FC529ECCFA6E3332CB3E8309D8243E3F8ACD86A5A0C65',
                 '5BA8888B5A10A28C7580A1F058DF06D50759AE4D06598AE8AECA18EA3A44400F',
                 '6A8131051F0694376808A2DB68D1AB047C030694850E416F42A3BCC980C43FC3',
                 'AE43E50E72EA689F9B936D634851AF66C085E116E85FEF00AAB318AA8C143A28',
                 '1CE6003B1FA81DFCB43CC0F4B37BC6AA0234F7096208C4822EE06703DBF7840A',
                 '14DA59880D646B968F68BA238E10CC499BC704FD97CE9471C888A9549E9A7571',
                 'FBC6191418C11A7EEE294A2F958E065EEEB758E11213A06AC0B87566F3555F04',
                 '1C00079F9B78524EDED33AA62712A3AE2D3A033E13746D3422E24D4B37AE57A6',
               ]
             }
}
