const {ADDRESS_HEX, ADDRESS_BASE58} = require('../util/config');
const tronWebBuilder = require('../util/tronWebBuilder');
const publicMethod = require('../util/PublicMethod');
const assertThrow = require('../util/assertThrow');
const tronWeb = tronWebBuilder.createInstance();
const ethersWallet = tronWeb.utils.ethersUtils.ethersWallet;
const chai = require('chai');
const assert = chai.assert;

describe('TronWeb.utils.accounts', function () {

    describe('#generateAccount()', function () {

        it("should generate a new account", async function () {
           const newAccount = await tronWeb.utils.accounts.generateAccount();
            assert.equal(newAccount.privateKey.length, 64);
            assert.equal(newAccount.publicKey.length, 130);
            let address = tronWeb.address.fromPrivateKey(newAccount.privateKey);
            assert.equal(address, newAccount.address.base58);

            assert.equal(tronWeb.address.toHex(address), newAccount.address.hex.toLowerCase());
        });
    });

    describe('#generateRandom()', function () {
        describe('should generate a mnemonic phrase and an account', function () {
            it("should generate an account when options param is a positive interger", async function () {
                const options = 12;
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("should generate an account when options param is {}", async function () {
                const options = {};
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, "m/44'/195'/0'/0/0");
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with params is null", async function () {
                const path = "m/44'/195'/0'/0/0";
                const newAccount = await tronWeb.utils.accounts.generateRandom();
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });
        });

        describe('generateRandom with path', function () {
            const wordlist = 'en';
            it("generateRandom with path account 、chain and index is null", async function () {
                const path = "m/44'/195'";
                const options = { path: path };
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with path account isn't null, chain and index is null", async function () {
                const path = "m/44'/195'/0'";
                const options = { path: path };
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with path account and chain isn't null, index is null", async function () {
                const path = "m/44'/195'/0'/1";
                const options = { path: path };
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with path account is 0 and index is 13", async function () {
                const path = "m/44'/195'/0'/0/13";
                const options = { path: path };
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with path account is 3 and index is 99", async function () {
                const path = "m/44'/195'/3'/0/99";
                const options = { path: path };
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("should throw when options param has a bip39 path of an another chain", async function () {
                const options = { path: "m/44'/60'/0'/0/0" };

                try {
                    await tronWeb.utils.accounts.generateRandom(options)
                } catch (err) {
                    let errMsg = err.message
                    assert.notEqual(errMsg.indexOf('Invalid tron path provided'), -1)
                }
            });

            it("should throw when options param has an invalid bip39 path", async function () {
                const options = { path: 12 };

                try {
                    await tronWeb.createRandom(options)
                } catch (err) {
                    let errMsg = err.message
                    assert.notEqual(errMsg.indexOf('Invalid tron path provided'), -1)
                }
            });
        });

        describe('generateRandom with local', function () {
            it("generateRandom with wordlist is zh_cn", async function () {
                const wordlist = 'zh_cn';
                const path = "m/44'/195'/0'/0/13";
                const options = { path: path, locale: wordlist};
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase, wordlist));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with wordlist is zh_tw", async function () {
                const wordlist = 'zh_tw';
                const path = "m/44'/195'/3'/0/99";
                const options = { path: path, locale: wordlist};
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase, wordlist));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with wordlist is ko", async function () {
                const wordlist = 'ko';
                const path = "m/44'/195'/2'/0/123";
                const options = { path: path, locale: wordlist};
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase, wordlist));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
            });

            it("generateRandom with wordlist is ja", async function () {
                const wordlist = 'ja';
                const path = "m/44'/195'/1'/1/2";
                const options = { path: path, locale: wordlist};
                const newAccount = await tronWeb.createRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase, wordlist));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
                console.log(newAccount.mnemonic.phrase+", "+newAccount.mnemonic.path+", "+newAccount.mnemonic.locale+", "+newAccount.privateKey+", "+newAccount.address)
            });

            it("generateRandom with wordlist is it", async function () {
                const wordlist = 'it';
                const path = "m/44'/195'/1'/2/3";
                const options = { path: path, locale: wordlist};
                const newAccount = await tronWeb.utils.accounts.generateRandom(options);
                assert.equal(newAccount.privateKey.substring(2).length, 64);
                assert.equal(newAccount.publicKey.substring(2).length, 130);
                assert.isTrue(tronWeb.utils.ethersUtils.isValidMnemonic(newAccount.mnemonic.phrase, wordlist));
                let address = tronWeb.address.fromPrivateKey(newAccount.privateKey.replace(/^0x/, ''));
                assert.equal(address, newAccount.address);
                assert.equal(tronWeb.address.toHex(address), tronWeb.address.toHex(newAccount.address));

                const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);
                assert.equal(newAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                assert.equal(newAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                publicMethod.equalIgnoreCase(tronWeb.address.toHex(newAccount.address).substring(2), ethAccount.address.substring(2));
            });

            it("should throw when wordlist is nonexistent", async function () {
                const wordlist = 'itsf';
                const path = "m/44'/195'/1'/2/3";
                const options = { path: path, locale: wordlist};

                try {
                    await tronWeb.createRandom(options)
                } catch (err) {
                    let errMsg = err.message
                    assert.notEqual(errMsg.indexOf('unknown locale (argument="wordlist", value="itsf"'), -1)
                }
            });

            it("should throw when wordlist is '' ", async function () {
                const path = "m/44'/195'/1'/2/3";
                const options = { path: path, locale: ''};

                try {
                    await tronWeb.utils.accounts.generateRandom(options)
                } catch (err) {
                    let errMsg = err.message
                    assert.notEqual(errMsg.indexOf('unknown locale (argument="wordlist", value=""'), -1)
                }
            });
        });
    });

    describe('#generateAccountWithMnemonic()', function () {
        describe('should generate an account of the given mnemonic phrase', function () {
            describe('generateAccountWithMnemonic with path', function () {
                it("generateAccountWithMnemonic with correct path", async function () {
                    const path = "m/44'/195'/0'/0/68";
                    const options = { path: path };
                    const newAccount = await tronWeb.createRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path);

                    const tronAccount = await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, path);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with truncated path", async function () {
                    const path = "m/44'/195'";
                    const options = { path: path };
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path);

                    const tronAccount = await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase, path);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with path is not same", async function () {
                    const path = "m/44'/195'/0'";
                    const options = { path: path };
                    const newAccount = await tronWeb.createRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path);

                    const tronAccount = await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, "m/44'/195'/0'/1");

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.notEqual(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.notEqual(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with path is null", async function () {
                    const path = "m/44'/195'/0'/0/0";
                    const options = { path: path };
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path);

                    const tronAccount = await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("should throw when options param has a bip39 path of an another chain", async function () {
                    const options = { path: "m/44'/195'/0'/0/0"};
                    const newAccount = await tronWeb.createRandom(options);

                    try {
                        await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, "m/44'/196'/1'/2/3")
                    } catch (err) {
                        let errMsg = err.message
                        assert.notEqual(errMsg.indexOf("Invalid tron path provided"), -1)
                    }
                });
            });

            describe('generateAccountWithMnemonic with local', function () {
                it("generateAccountWithMnemonic with wordlist is zh_cn", async function () {
                    const wordlist = 'zh_cn';
                    const path = "m/44'/195'/0'/0/13";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    const tronAccount = await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with wordlist is zh_tw", async function () {
                    const wordlist = 'zh_tw';
                    const path = "m/44'/195'/3'/0/99";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.createRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    const tronAccount = await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with wordlist is ko", async function () {
                    const wordlist = 'ko';
                    const path = "m/44'/195'/2'/0/123";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    const tronAccount = await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                });

                it("generateAccountWithMnemonic with wordlist is ja", async function () {
                    const wordlist = 'ja';
                    const path = "m/44'/195'/1'/1/2";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.createRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    const tronAccount = await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                    console.log(tronAccount.mnemonic.phrase+", "+tronAccount.mnemonic.path+", "+tronAccount.mnemonic.locale+", "+tronAccount.privateKey+", "+tronAccount.address)
                });

                it("generateAccountWithMnemonic with wordlist is it", async function () {
                    const wordlist = 'it';
                    const path = "m/44'/195'/1'/2/3";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    const ethAccount = await ethersWallet.fromMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    const tronAccount = await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase, path, wordlist);

                    assert.equal(tronAccount.mnemonic.phrase, ethAccount.mnemonic.phrase);
                    assert.equal(tronAccount.privateKey.substring(2), ethAccount.privateKey.substring(2));
                    assert.equal(tronAccount.publicKey.substring(2), ethAccount.publicKey.substring(2));
                    publicMethod.equalIgnoreCase(tronWeb.address.toHex(tronAccount.address).substring(2), ethAccount.address.substring(2));
                });

                it("should throw when wordlist is unmatch", async function () {
                    const wordlist = 'it';
                    const path = "m/44'/195'/1'/2/3";
                    const options = { path: path, locale: wordlist};
                    const newAccount = await tronWeb.createRandom(options);

                    try {
                        await tronWeb.fromMnemonic(newAccount.mnemonic.phrase, path, "en")
                    } catch (err) {
                        let errMsg = err.message
                        assert.notEqual(errMsg.indexOf("invalid mnemonic"), -1)
                    }
                });

                it("should throw when wordlist is nonexistent", async function () {
                    const path = "m/44'/195'/1'/2/3";
                    const options = { path: path};
                    const newAccount = await tronWeb.utils.accounts.generateRandom(options);

                    try {
                        await tronWeb.utils.accounts.generateAccountWithMnemonic(newAccount.mnemonic.phrase, path, "jwerfa")
                    } catch (err) {
                        let errMsg = err.message
                        assert.notEqual(errMsg.indexOf('unknown locale (argument="wordlist", value="jwerfa"'), -1)
                    }
                });

                //errMsg本身返回不稳定，可能出现下面两种情况。
                it("should throw when params is null", async function () {
                    try {
                        await tronWeb.fromMnemonic()
                    } catch (err) {
                        let errMsg = err.message
                        console.log("errMsg: ",errMsg);
                        //Cannot read properties of undefined (reading 'toLowerCase')
                        assert.notEqual(errMsg.indexOf("Cannot read property 'toLowerCase' of undefined"), -1)
                    }
                });
            });
        });
    });
});
