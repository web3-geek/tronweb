const chai = require('chai');
const tronWebBuilder = require('../util/tronWebBuilder');
const { loadTests } = require('../util/disk-utils');
const assert = chai.assert;
const {ADDRESS_BASE58,PRIVATE_KEY} = require('../util/config');


describe('TronWeb.utils.typedData', function () {
    describe('#EIP-712', function () {
        const TronWeb = tronWebBuilder.TronWeb;
        const tests = loadTests('eip712');
        tests.forEach((test) => {
            it(`encoding ${test.name}`, function () {
                const encoder = TronWeb.utils._TypedDataEncoder.from(test.types);
                assert.equal(
                    encoder.primaryType,
                    test.primaryType,
                    'instance.primaryType'
                );
                assert.equal(
                    encoder.encode(test.data),
                    test.encoded,
                    'instance.encode()'
                );
                assert.equal(
                    TronWeb.utils._TypedDataEncoder.getPrimaryType(test.types),
                    test.primaryType,
                    'getPrimaryType'
                );
                assert.equal(
                    TronWeb.utils._TypedDataEncoder.hash(
                        test.domain,
                        test.types,
                        test.data
                    ),
                    test.digest,
                    'digest'
                );
            });
        });
    });

    describe('#EIP-712 Signature and Verification',async function () {
        const TronWeb = tronWebBuilder.TronWeb;
        tronWeb = tronWebBuilder.createInstance();
        const tests = loadTests('eip712');
        tests.forEach( (test) => {
            it(`encoding ${test.name} Signature and Verification`,async function () {
                const signature = await tronWeb.trx._signTypedData(test.domain, test.types, test.data, PRIVATE_KEY);
                const result = await tronWeb.trx.verifyTypedData(test.domain, test.types, test.data, signature,ADDRESS_BASE58);
                assert.isTrue(signature.startsWith('0x'));
                assert.isTrue(result);
            });
        });
    });

    describe('#EIP-712 with trcToken', function () {
        //bytecode from https://nile.tronscan.org/#/contract/TBsRXfm94zoXVc2ZayZpc25Y2VEDmeciJ8/code
        const TronWeb = tronWebBuilder.TronWeb;

        const domain = {
            name: 'TrcToken Test',
            version: '1',
            chainId: '0xd698d4192c56cb6be724a558448e2684802de4d6cd8690dc',
            verifyingContract: '0x5ab90009b529c5406b4f8a6fc4dab8a2bc778c75',
            salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558",
        };

        const types = {
            FromPerson: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
                { name: 'trcTokenId', type: 'trcToken' },
            ],
            ToPerson: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
                { name: 'trcTokenArr', type: 'trcToken[]' },
            ],
            Mail: [
                { name: 'from', type: 'FromPerson' },
                { name: 'to', type: 'ToPerson' },
                { name: 'contents', type: 'string' },
                { name: 'tAddr', type: 'address[]' },
                { name: 'trcTokenId', type: 'trcToken' },
                { name: 'trcTokenArr', type: 'trcToken[]' },
            ],
        };

        const value = {
            from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                trcTokenId: '1002000',
            },
            to: {
                name: 'Bob',
                wallet: '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
                trcTokenArr: ['1002000', '1002000'],
            },
            contents: 'Hello, Bob!',
            tAddr: [
                '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
                '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
            ],
            trcTokenId: '1002000',
            trcTokenArr: ['1002000', '1002000'],
        };

        it('should be the correct hash domain', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashDomain(domain),
                '0x386c29f5a78395fbf19723fa491bd1a28ea8d1036d653c28cb49563ffca3ec00'
            );
        });

        it('should be the correct hash struct', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct(
                    'FromPerson',
                    types,
                    value.from
                ),
                '0x73b79ecc2530586800050c46ee7361ed28c013dfa3d062ed216295cbd5e6a55d'
            );
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct(
                    'ToPerson',
                    types,
                    value.to
                ),
                '0xcf70da7edc68556245231d76401fdbc5622e3388466e0a088e668766879f2404'
            );
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hashStruct('Mail', types, value),
                '0x5f3caedfeb1e096d359db31f0924f23acdfc72f21e5f3c59af3eec03cdf2a5f7'
            );
        });

        it('should be the correct hash', function () {
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hash(domain, types, value),
                '0x659ab4906c8bff9cb393df578d620fb8cd7a2b6544e861896a3da5cff7a73548'
            );
        });

        it('Change parameters ,should be the correct hash',function () {
            const value1 = {
                from: {
                    name: 'Cow----\'\"\\',
                    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                    trcTokenId: '1002000',
                },
                to: {
                    name: 'Bob!@@#$%%^^&*())+{}{].,,',
                    wallet: '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
                    trcTokenArr: ['1002000', '1002000'],
                },
                contents: 'Hello, ___====$$###^&**!@@Bob!',
                tAddr: [
                    '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
                    '0xd1e7a6bc354106cb410e65ff8b181c600ff14292',
                ],
                trcTokenId: '1002000',
                trcTokenArr: ['1002000', '1002000'],
            };
            assert.equal(
                TronWeb.utils._TypedDataEncoder.hash(domain, types, value1),
                '0xb3857c4712b229ead81002827194dc5070036238a338d679972e5c3aef687d51'
            );

        })
    });


});
