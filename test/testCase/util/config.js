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
            saleEnd: Date.now() + 60000, // 1 minute
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
        // fullNode: 'https://api.nileex.io',
        // solidityNode: 'https://api.nileex.io',
        // eventServer: 'https://nile.trongrid.io',
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
            mainGatewayAddress: 'TZDBCFaZELVgeZgDR2bpHxjXYMY69hZxg4',
            mainGatewayAddress_hex: '41FEEF35443B293715AACA7AAAC1A670995804D35A',
            sideGatewayAddress: 'TSNfUsEMAkmW1AvCGrV1Sbyf32fXf3RvfF',
            sideGatewayAddress_hex: '41B3F1AEFFBD35A1AEBDE7D2554ECE7D2CE28FD322',
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
    }
}
