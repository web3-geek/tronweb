module.exports = {
    testDeployRevert: {
        contractName: "contractUnknownException",
        abi: [
            {
                "inputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"constructor"
            }
        ],
        bytecode: "0x60806040526000600a6040516012906087565b6040518091039082f080158015602c573d6000803e3d6000fd5b5090509050806001600160a01b031663946644cd6040518163ffffffff1660e01b8152600401600060405180830381600087803b158015606b57600080fd5b505af1158015607e573d6000803e3d6000fd5b50505050506092565b60078060dc83390190565b603d80609f6000396000f3fe6080604052600080fdfea26474726f6e5820ec9f264886a0a6be93041d24b4fe16bccd2e9784596c51c231ca1e223d1f05fd64736f6c634300050c00316080604052fefe"
    },
    testTriggerError: {
        contractName: "Test",
        abi: [
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"x",
                        "type":"uint256"
                    }],
                "name":"testOutOfMem",
                "outputs":[
                    {
                        "name":"r",
                        "type":"bytes32"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"testBadJumpDestination",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5061011f8061003a6000396000f30060806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416634ef5a0088114604d5780639093b95b14608c575b600080fd5b348015605857600080fd5b50d38015606457600080fd5b50d28015607057600080fd5b50607a60043560b8565b60408051918252519081900360200190f35b348015609757600080fd5b50d3801560a357600080fd5b50d2801560af57600080fd5b5060b660ee565b005b600060608260405190808252806020026020018201604052801560e5578160200160208202803883390190505b50905050919050565b6001805600a165627a7a7230582092ba162087e13f41c6d6c00ba493edc5a5a6250a3840ece5f99aa38b66366a700029"
    },
    trc20Contract: {
        contractName: "trc20Contract",
        abi: [
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "_addressFounder",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }, {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_spender",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "Approval",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                }, {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "Transfer",
                "type": "event"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }, {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "allowance",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "address",
                    "name": "_spender",
                    "type": "address"
                }, {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "approve",
                "outputs": [{
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "burn",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }],
                "name": "setName",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "start",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "stop",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "stopped",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }, {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "transfer",
                "outputs": [{
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                }, {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }, {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "transferFrom",
                "outputs": [{
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }],
        bytecode: "60c060405260066080819052650a8e4dedcd2f60d31b60a09081526100279160009190610135565b5060408051808201909152600580825264054524332360dc1b602090920191825261005491600191610135565b5060066002819055600060055580546001600160a81b031916905534801561007b57600080fd5b50d3801561008857600080fd5b50d2801561009557600080fd5b50604051610b09380380610b09833981810160405260208110156100b857600080fd5b505160068054610100600160a81b0319163361010002179055655af3107a400060058190556001600160a01b0382166000818152600360209081526040808320859055805194855251929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3506101d0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017657805160ff19168380011785556101a3565b828001600101855582156101a3579182015b828111156101a3578251825591602001919060010190610188565b506101af9291506101b3565b5090565b6101cd91905b808211156101af57600081556001016101b9565b90565b61092a806101df6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101045760003560e01c806370a08231116100a6578063a9059cbb11610080578063a9059cbb1461027b578063be9a6555146102a7578063c47f0027146102af578063dd62ed3e1461035557610104565b806370a082311461024557806375f12b211461026b57806395d89b411461027357610104565b806318160ddd116100e257806318160ddd146101d057806323b872dd146101ea578063313ce5671461022057806342966c681461022857610104565b806306fdde031461010957806307da68f514610186578063095ea7b314610190575b600080fd5b610111610383565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561014b578181015183820152602001610133565b50505050905090810190601f1680156101785780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61018e610411565b005b6101bc600480360360408110156101a657600080fd5b506001600160a01b038135169060200135610439565b604080519115158252519081900360200190f35b6101d86104ee565b60408051918252519081900360200190f35b6101bc6004803603606081101561020057600080fd5b506001600160a01b038135811691602081013590911690604001356104f4565b6101d861060f565b61018e6004803603602081101561023e57600080fd5b5035610615565b6101d86004803603602081101561025b57600080fd5b50356001600160a01b03166106ac565b6101bc6106be565b6101116106c7565b6101bc6004803603604081101561029157600080fd5b506001600160a01b038135169060200135610721565b61018e6107e9565b61018e600480360360208110156102c557600080fd5b8101906020810181356401000000008111156102e057600080fd5b8201836020820111156102f257600080fd5b8035906020019184600183028401116401000000008311171561031457600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061080e945050505050565b6101d86004803603604081101561036b57600080fd5b506001600160a01b038135811691602001351661083e565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104095780601f106103de57610100808354040283529160200191610409565b820191906000526020600020905b8154815290600101906020018083116103ec57829003601f168201915b505050505081565b60065461010090046001600160a01b0316331461042a57fe5b6006805460ff19166001179055565b60065460009060ff161561044957fe5b3361045057fe5b81158061047e57503360009081526004602090815260408083206001600160a01b0387168452909152902054155b61048757600080fd5b3360008181526004602090815260408083206001600160a01b03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60055481565b60065460009060ff161561050457fe5b3361050b57fe5b6001600160a01b03841660009081526003602052604090205482111561053057600080fd5b6001600160a01b038316600090815260036020526040902054828101101561055757600080fd5b6001600160a01b038416600090815260046020908152604080832033845290915290205482111561058757600080fd5b6001600160a01b03808416600081815260036020908152604080832080548801905593881680835284832080548890039055600482528483203384528252918490208054879003905583518681529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35060019392505050565b60025481565b3360009081526003602052604090205481111561063157600080fd5b336000818152600360209081526040808320805486900390558280527f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350565b60036020526000908152604090205481565b60065460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104095780601f106103de57610100808354040283529160200191610409565b60065460009060ff161561073157fe5b3361073857fe5b3360009081526003602052604090205482111561075457600080fd5b6001600160a01b038316600090815260036020526040902054828101101561077b57600080fd5b336000818152600360209081526040808320805487900390556001600160a01b03871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350600192915050565b60065461010090046001600160a01b0316331461080257fe5b6006805460ff19169055565b60065461010090046001600160a01b0316331461082757fe5b805161083a90600090602084019061085b565b5050565b600460209081526000928352604080842090915290825290205481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061089c57805160ff19168380011785556108c9565b828001600101855582156108c9579182015b828111156108c95782518255916020019190600101906108ae565b506108d59291506108d9565b5090565b6108f391905b808211156108d557600081556001016108df565b9056fea26474726f6e5820b6dfbf7d9fafd8751ff6c41564fd16f53ec48884e57e72d342297d68a9a29d9564736f6c634300050f0031"
    },
    trc721Contract: {
        contractName: "trc721",
        abi: [
            {
                "constant":true,
                "inputs":[
                ],
                "name":"name",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"getApproved",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"approve",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"gateway",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"from",
                        "type":"address"
                    },
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"transferFrom",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"mint",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    },
                    {
                        "name":"txData",
                        "type":"bytes"
                    }],
                "name":"withdrawal",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"ownerOf",
                "outputs":[
                    {
                        "name":"",
                        "type":"address"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"owner",
                        "type":"address"
                    }],
                "name":"balanceOf",
                "outputs":[
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                ],
                "name":"symbol",
                "outputs":[
                    {
                        "name":"",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"approved",
                        "type":"bool"
                    }],
                "name":"setApprovalForAll",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"transfer",
                "outputs":[
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },
            {
                "constant":true,
                "inputs":[
                    {
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "name":"operator",
                        "type":"address"
                    }],
                "name":"isApprovedForAll",
                "outputs":[
                    {
                        "name":"",
                        "type":"bool"
                    }],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },
            {
                "inputs":[
                    {
                        "name":"_gateway",
                        "type":"address"
                    },
                    {
                        "name":"_name",
                        "type":"string"
                    },
                    {
                        "name":"_symbol",
                        "type":"string"
                    }],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"constructor"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"from",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"to",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"Transfer",
                "type":"event"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"approved",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"tokenId",
                        "type":"uint256"
                    }],
                "name":"Approval",
                "type":"event"
            },
            {
                "anonymous":false,
                "inputs":[
                    {
                        "indexed":true,
                        "name":"owner",
                        "type":"address"
                    },
                    {
                        "indexed":true,
                        "name":"operator",
                        "type":"address"
                    },
                    {
                        "indexed":false,
                        "name":"approved",
                        "type":"bool"
                    }],
                "name":"ApprovalForAll",
                "type":"event"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604051610d84380380610d8483398101604090815281516020808401519284015160048054600160a060020a031916600160a060020a0385161790559284018051929490930191610082916005919085019061009f565b50805161009690600690602084019061009f565b5050505061013a565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100e057805160ff191683800117855561010d565b8280016001018555821561010d579182015b8281111561010d5782518255916020019190600101906100f2565b5061011992915061011d565b5090565b61013791905b808211156101195760008155600101610123565b90565b610c3b806101496000396000f3006080604052600436106100c45763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100c9578063081812fc1461016d578063095ea7b3146101bb578063116191b6146101fb57806323b872dd1461022a57806340c10f191461026e57806349e11893146102ac5780636352211e1461032457806370a082311461035657806395d89b41146103a3578063a22cb465146103d2578063a9059cbb14610412578063e985e9c514610450575b600080fd5b3480156100d557600080fd5b50d380156100e257600080fd5b50d280156100ef57600080fd5b506100f86104a5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013257818101518382015260200161011a565b50505050905090810190601f16801561015f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017957600080fd5b50d3801561018657600080fd5b50d2801561019357600080fd5b5061019f600435610533565b60408051600160a060020a039092168252519081900360200190f35b3480156101c757600080fd5b50d380156101d457600080fd5b50d280156101e157600080fd5b506101f9600160a060020a0360043516602435610565565b005b34801561020757600080fd5b50d3801561021457600080fd5b50d2801561022157600080fd5b5061019f61061b565b34801561023657600080fd5b50d3801561024357600080fd5b50d2801561025057600080fd5b506101f9600160a060020a036004358116906024351660443561062a565b34801561027a57600080fd5b50d3801561028757600080fd5b50d2801561029457600080fd5b506101f9600160a060020a036004351660243561064f565b3480156102b857600080fd5b50d380156102c557600080fd5b50d280156102d257600080fd5b5060408051602060046024803582810135601f81018590048502860185019096528585526101f99583359536956044949193909101919081908401838280828437509497506107269650505050505050565b34801561033057600080fd5b50d3801561033d57600080fd5b50d2801561034a57600080fd5b5061019f600435610896565b34801561036257600080fd5b50d3801561036f57600080fd5b50d2801561037c57600080fd5b50610391600160a060020a03600435166108c0565b60408051918252519081900360200190f35b3480156103af57600080fd5b50d380156103bc57600080fd5b50d280156103c957600080fd5b506100f86108f3565b3480156103de57600080fd5b50d380156103eb57600080fd5b50d280156103f857600080fd5b506101f9600160a060020a0360043516602435151561094e565b34801561041e57600080fd5b50d3801561042b57600080fd5b50d2801561043857600080fd5b506101f9600160a060020a03600435166024356109d2565b34801561045c57600080fd5b50d3801561046957600080fd5b50d2801561047657600080fd5b50610491600160a060020a03600435811690602435166109e1565b604080519115158252519081900360200190f35b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561052b5780601f106105005761010080835404028352916020019161052b565b820191906000526020600020905b81548152906001019060200180831161050e57829003601f168201915b505050505081565b600061053e82610a0f565b151561054957600080fd5b50600090815260016020526040902054600160a060020a031690565b600061057082610896565b9050600160a060020a03838116908216141561058b57600080fd5b33600160a060020a03821614806105a757506105a781336109e1565b15156105b257600080fd5b600082815260016020526040808220805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600454600160a060020a031681565b6106343382610a2c565b151561063f57600080fd5b61064a838383610a8b565b505050565b600454600160a060020a0316331461066657600080fd5b600160a060020a038216151561067b57600080fd5b61068481610a0f565b1561068e57600080fd5b600081815260208181526040808320805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038716908117909155835260029091529020546106db906001610ba6565b600160a060020a0383166000818152600260205260408082209390935591518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60045460009061073f90600160a060020a0316846109d2565b600480546040517fcb912b1e0000000000000000000000000000000000000000000000000000000081523392810183815260248201879052606060448301908152865160648401528651600160a060020a039094169463cb912b1e949093899389939092909160840190602085019080838360005b838110156107cc5781810151838201526020016107b4565b50505050905090810190601f1680156107f95780820380516001836020036101000a031916815260200191505b50945050505050602060405180830381600087803b15801561081a57600080fd5b505af115801561082e573d6000803e3d6000fd5b505050506040513d602081101561084457600080fd5b505190507fffffffff0000000000000000000000000000000000000000000000000000000081167fcb912b1e000000000000000000000000000000000000000000000000000000001461064a57600080fd5b600081815260208190526040812054600160a060020a03168015156108ba57600080fd5b92915050565b6000600160a060020a03821615156108d757600080fd5b50600160a060020a031660009081526002602052604090205490565b6006805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561052b5780601f106105005761010080835404028352916020019161052b565b600160a060020a03821633141561096457600080fd5b336000818152600360209081526040808320600160a060020a03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b6109dd338383610a8b565b5050565b600160a060020a03918216600090815260036020908152604080832093909416825291909152205460ff1690565b600090815260208190526040902054600160a060020a0316151590565b600080610a3883610896565b905080600160a060020a031684600160a060020a03161480610a73575083600160a060020a0316610a6884610533565b600160a060020a0316145b80610a835750610a8381856109e1565b949350505050565b82600160a060020a0316610a9e82610896565b600160a060020a031614610ab157600080fd5b600160a060020a0382161515610ac657600080fd5b610acf81610bb3565b600160a060020a038316600090815260026020526040902054610af990600163ffffffff610bfd16565b600160a060020a038085166000908152600260205260408082209390935590841681522054610b2f90600163ffffffff610ba616565b600160a060020a03808416600081815260026020908152604080832095909555858252819052838120805473ffffffffffffffffffffffffffffffffffffffff1916831790559251849391928716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b818101828110156108ba57fe5b600081815260016020526040902054600160a060020a031615610bfa576000818152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff191690555b50565b600082821115610c0957fe5b509003905600a165627a7a72305820fd4516641e72b9245cd9ec59332d38dae59860fc29fb28933cbf477cb46c1cba0029"
    },
    transferTokenContract: {
        contractName: "transferTokenContract",
        abi: [
            {
                "constant":false,
                "inputs":[
                ],
                "name":"getResultInCon",
                "outputs":[
                    {
                        "name":"",
                        "type":"trcToken"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                    {
                        "name":"toAddress",
                        "type":"address"
                    },
                    {
                        "name":"id",
                        "type":"trcToken"
                    },
                    {
                        "name":"amount",
                        "type":"uint256"
                    }],
                "name":"TransferTokenTo",
                "outputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "constant":false,
                "inputs":[
                ],
                "name":"msgTokenValueAndTokenIdTest",
                "outputs":[
                    {
                        "name":"",
                        "type":"trcToken"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    },
                    {
                        "name":"",
                        "type":"uint256"
                    }],
                "payable":true,
                "stateMutability":"payable",
                "type":"function"
            },
            {
                "inputs":[
                ],
                "payable":true,
                "stateMutability":"payable",
                "type":"constructor"
            }
        ],
        bytecode: "6080604052d3600055d2600155346002556101418061001f6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c24200811461005b5780633be9ece71461008157806371dc08ce146100aa575b600080fd5b6100636100b2565b60408051938452602084019290925282820152519081900360600190f35b6100a873ffffffffffffffffffffffffffffffffffffffff600435166024356044356100c0565b005b61006361010d565b600054600154600254909192565b60405173ffffffffffffffffffffffffffffffffffffffff84169082156108fc029083908590600081818185878a8ad0945050505050158015610107573d6000803e3d6000fd5b50505050565bd3d2349091925600a165627a7a72305820a2fb39541e90eda9a2f5f9e7905ef98e66e60dd4b38e00b05de418da3154e7570029"
    },
    testRevert: {
        /*
        pragma solidity ^0.4.18;
        contract TestRevert {
            address owner;
            constructor() public {
            }
            function setOwner(address addr) public {
                require(addr != 0xb6e447d1d576dE6c7f767C32a649F0AD50aE5975, "Address forbidden :-)");
                // TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs
                owner = addr;
            }
            function getOwner(uint check) public view returns (address) {
                require(check == 1, "Wrong check");
                return owner;
            }
            function getOwner2(uint check) public view returns (address) {
                require(check == 1);
                return owner;
            }
        }
        */
        contractName: "TestRevert",
        abi: [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "setOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner2",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b5061037d806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461005c578063877333461461009f578063c41a360a1461010c575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610179565b005b3480156100ab57600080fd5b506100ca60048036038101908080359060200190929190505050610274565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561011857600080fd5b50610137600480360381019080803590602001909291905050506102ae565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73b6e447d1d576de6c7f767c32a649f0ad50ae597573ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610231576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f41646472657373206d75737420626520213d203078000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060018214151561028557600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600182141515610328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f57726f6e6720636865636b00000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690509190505600a165627a7a7230582070775fabe424bfe924ea8b9a9f4863306d35202b9c074f195334273994260ef20029"
    },
    testConstant: {
        contractName: "testConstantContract",
        abi: [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "name": "testPure",
                "outputs": [
                    {
                        "name": "z",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060e5806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307fb8ea6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b50608e600480360381019080803590602001909291908035906020019092919050505060a4565b6040518082815260200191505060405180910390f35b600080600190508284820101915050929150505600a165627a7a72305820ba2dba126dd3285cfaee13187fa53bf7d9bc09517d6afd04cd7d71098a1f90ee0029"
    },
    testSetVal: {
        "contractName": "SetVal",
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_val",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "0x60806040526000805534801561001457600080fd5b50d3801561002157600080fd5b50d2801561002e57600080fd5b5060e08061003d6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146062575b600080fd5b608b60048036036020811015607657600080fd5b810190808035906020019092919050505060a1565b6040518082815260200191505060405180910390f35b600081600081905550600054905091905056fea165627a7a72305820392f2cf7f1b37873349bf7ce496fb370bc80c6539de204bded6197106c530e700029"
    },
    testEmptyAbi: {
        "contractName": "SetVal",
        "abi": [],
        "bytecode": "0x60806040526000805534801561001457600080fd5b50d3801561002157600080fd5b50d2801561002e57600080fd5b5060e08061003d6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146062575b600080fd5b608b60048036036020811015607657600080fd5b810190808035906020019092919050505060a1565b6040518082815260200191505060405180910390f35b600081600081905550600054905091905056fea165627a7a72305820392f2cf7f1b37873349bf7ce496fb370bc80c6539de204bded6197106c530e700029"
    },
    arrayParam: {
        "contractName": "ArrayParam",
        "abi": [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "addresses",
                        "type": "address[]"
                    },
                    {
                        "name": "initialBalances",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ],
        "bytecode": "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516102a83803806102a88339810180604052604081101561004d57600080fd5b81019080805164010000000081111561006557600080fd5b8281019050602081018481111561007b57600080fd5b815185602082028301116401000000008211171561009857600080fd5b505092919060200180516401000000008111156100b457600080fd5b828101905060208101848111156100ca57600080fd5b81518560208202830111640100000000821117156100e757600080fd5b5050929190505050600082511115156100ff57600080fd5b8051825114151561010f57600080fd5b60008090505b825181101561019c57818181518110151561012c57fe5b90602001906020020151600080858481518110151561014757fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610115565b50505060fb806101ad6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806327e235e3146062575b600080fd5b60a160048036036020811015607657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505060b7565b6040518082815260200191505060405180910390f35b6000602052806000526040600020600091509050548156fea165627a7a723058207d447cc574baeda0c964d154c92f29b2c72be467d5118d30741788a8c03c185d0029"
    },
    shieldContract: {
        contractName: "shield",
        abi: [
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "trc20ContractAddress",
                    "type": "address"
                }, {
                    "internalType": "uint256",
                    "name": "scalingFactorExponent",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "BurnNewLeaf",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "MintNewLeaf",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "nf",
                    "type": "bytes32"
                }],
                "name": "NoteSpent",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[3]",
                    "name": "ciphertext",
                    "type": "bytes32[3]"
                }],
                "name": "TokenBurn",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                }, {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }],
                "name": "TokenMint",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cm",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "cv",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "epk",
                    "type": "bytes32"
                }, {
                    "indexed": false,
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "TransferNewLeaf",
                "type": "event"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "bytes32[10]",
                    "name": "input",
                    "type": "bytes32[10]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "spendAuthoritySignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "uint256",
                    "name": "rawValue",
                    "type": "uint256"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "address",
                    "name": "payTo",
                    "type": "address"
                }, {
                    "internalType": "bytes32[3]",
                    "name": "burnCipher",
                    "type": "bytes32[3]"
                }, {
                    "internalType": "bytes32[9][]",
                    "name": "output",
                    "type": "bytes32[9][]"
                }, {
                    "internalType": "bytes32[21][]",
                    "name": "c",
                    "type": "bytes32[21][]"
                }],
                "name": "burn",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "position",
                    "type": "uint256"
                }],
                "name": "getPath",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }, {
                    "internalType": "bytes32[32]",
                    "name": "",
                    "type": "bytes32[32]"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "latestRoot",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "leafCount",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "rawValue",
                    "type": "uint256"
                }, {
                    "internalType": "bytes32[9]",
                    "name": "output",
                    "type": "bytes32[9]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "bytes32[21]",
                    "name": "c",
                    "type": "bytes32[21]"
                }],
                "name": "mint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "noteCommitment",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "nullifiers",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "name": "roots",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "scalingFactor",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "internalType": "bytes32[10][]",
                    "name": "input",
                    "type": "bytes32[10][]"
                }, {
                    "internalType": "bytes32[2][]",
                    "name": "spendAuthoritySignature",
                    "type": "bytes32[2][]"
                }, {
                    "internalType": "bytes32[9][]",
                    "name": "output",
                    "type": "bytes32[9][]"
                }, {
                    "internalType": "bytes32[2]",
                    "name": "bindingSignature",
                    "type": "bytes32[2]"
                }, {
                    "internalType": "bytes32[21][]",
                    "name": "c",
                    "type": "bytes32[21][]"
                }],
                "name": "transfer",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "name": "tree",
                "outputs": [{
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "6104806040527f010000000000000000000000000000000000000000000000000000000000000060809081527f817de36ab2d57feb077634bca77819c8e0bd298c04f6fed0e6a83cc1356ca15560a0527fffe9fc03f18b176c998806439ff0bb8ad193afdb27b2ccbc88856916dd804e3460c0527fd8283386ef2ef07ebdbb4383c12a739a953a4d6e0d6fb1139a4036d693bfbb6c60e0527fe110de65c907b9dea4ae0bd83a4b0a51bea175646a64c12b4c9f931b2cb31b49610100527f912d82b2c2bca231f71efcf61737fbf0a08befa0416215aeef53e8bb6d23390a610120527f8ac9cf9c391e3fd42891d27238a81a8a5c1d3a72b1bcbea8cf44a58ce7389613610140527fd6c639ac24b46bd19341c91b13fdcab31581ddaf7f1411336a271f3d0aa52813610160527f7b99abdc3730991cc9274727d7d82d28cb794edbc7034b4f0053ff7c4b680444610180527f43ff5457f13b926b61df552d4e402ee6dc1463f99a535f9a713439264d5b616b6101a0527fba49b659fbd0b7334211ea6a9d9df185c757e70aa81da562fb912b84f49bce726101c0527f4777c8776a3b1e69b73a62fa701fa4f7a6282d9aee2c7a6b82e7937d7081c23c6101e0527fec677114c27206f5debc1c1ed66f95e2b1885da5b7be3d736b1de98579473048610200527f1b77dac4d24fb7258c3c528704c59430b630718bec486421837021cf75dab651610220527fbd74b25aacb92378a871bf27d225cfc26baca344a1ea35fdd94510f3d157082c610240527fd6acdedf95f608e09fa53fb43dcd0990475726c5131210c9e5caeab97f0e642f610260527f1ea6675f9551eeb9dfaaa9247bc9858270d3d3a4c5afa7177a984d5ed1be2451610280527f6edb16d01907b759977d7650dad7e3ec049af1a3d875380b697c862c9ec5d51c6102a0527fcd1c8dbf6e3acc7a80439bc4962cf25b9dce7c896f3a5bd70803fc5a0e33cf006102c0527f6aca8448d8263e547d5ff2950e2ed3839e998d31cbc6ac9fd57bc6002b1592166102e0527f8d5fa43e5a10d11605ac7430ba1f5d81fb1b68d29a640405767749e841527673610300527f08eeab0c13abd6069e6310197bf80f9c1ea6de78fd19cbae24d4a520e6cf3023610320527f0769557bc682b1bf308646fd0b22e648e8b9e98f57e29f5af40f6edb833e2c49610340527f4c6937d78f42685f84b43ad3b7b00f81285662f85c6a68ef11d62ad1a3ee0850610360527ffee0e52802cb0c46b1eb4d376c62697f4759f6c8917fa352571202fd778fd712610380527f16d6252968971a83da8521d65382e61f0176646d771c91528e3276ee45383e4a6103a0527fd2e1642c9a462229289e5b0e3b7f9008e0301cbb93385ee0e21da2545073cb586103c0527fa5122c08ff9c161d9ca6fc462073396c7d7d38e8ee48cdb3bea7e2230134ed6a6103e0527f28e7b841dcbc47cceb69d7cb8d94245fb7cb2ba3a7a6bc18f13f945f7dbd6e2a610400527fe1f34b034d4a3cd28557e2907ebf990c918f64ecb50a94f01d6fda5ca5c7ef72610420527f12935f14b676509b81eb49ef25f39269ed72309238b4c145803544b646dca62d610440527fb2eed031d4d6a4f02a097f80b54cc1541d4163c6b6f5971f88b6e41d35c5381461046052620004b390602890602062000580565b50348015620004c157600080fd5b50d38015620004cf57600080fd5b50d28015620004dd57600080fd5b506040516200354738038062003547833981016040819052620005009162000615565b604d811062000546576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200053d90620006b5565b60405180910390fd5b600a0a60005560488054336001600160a01b031991821617909155604980549091166001600160a01b039290921691909117905562000713565b8260208101928215620005b1579160200282015b82811115620005b157825182559160200191906001019062000594565b50620005bf929150620005c3565b5090565b620005e091905b80821115620005bf5760008155600101620005ca565b90565b8051620005f081620006ee565b620005fb81620006d0565b9392505050565b80516200060f8162000708565b92915050565b600080604083850312156200062957600080fd5b6000620006378585620005e3565b92505060206200064a8582860162000602565b9150509250929050565b600062000663602a83620006c7565b7f546865207363616c696e67466163746f724578706f6e656e74206973206f757481527f206f662072616e67652100000000000000000000000000000000000000000000602082015260400192915050565b602080825281016200060f8162000654565b90815260200190565b60006001600160a01b0382166200060f565b6001600160a81b031690565b620006f981620006e2565b81146200070557600080fd5b50565b620006f981620005e0565b612e2480620007236000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100c35760003560e01c80639110a55b1161008b5780639110a55b14610134578063ae6dead714610147578063cc1058751461015a578063d7b0fef11461016d578063e176507314610175578063ed3437f814610196576100c3565b80632997e86b146100c85780632a6bb45a146100f157806330e69fc314610104578063313529361461010c578063855d175e1461011f575b600080fd5b6100db6100d6366004611c30565b61019e565b6040516100e89190612a7d565b60405180910390f35b6100db6100ff366004611c30565b6101b0565b6100db6101c2565b6100db61011a366004611c30565b6101c8565b61013261012d366004611c6c565b6101da565b005b610132610142366004611a3d565b6105a9565b6100db610155366004611c30565b610bd4565b610132610168366004611b22565b610be6565b6100db61106c565b610188610183366004611c30565b611072565b6040516100e8929190612a8b565b6100db6111c5565b60036020526000908152604090205481565b60066020526000908152604090205481565b60015481565b60056020526000908152604090205481565b6049546040516323b872dd60e01b815233916000916001600160a01b03909116906323b872dd9061021390859030908b90600401612852565b602060405180830381600087803b15801561022d57600080fd5b505af1158015610241573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506102659190810190611c12565b90508061028d5760405162461bcd60e51b815260040161028490612ad8565b60405180910390fd5b8435600090815260066020526040902054156102bb5760405162461bcd60e51b815260040161028490612b58565b60006102c6876111cb565b905060006002308389886040516020016102e394939291906127fc565b60408051601f19818403018152908290526102fd91612846565b602060405180830381855afa15801561031a573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525061033d9190810190611c4e565b90506060630100000188888585600760015460405161036196959493929190612a1d565b600060405180830381855afa15801561037e573d6000803e3d6000fd5b5050503d80600081146103ad576040519150601f19603f3d011682016040523d82523d6000602084013e6103b2565b606091505b5090506000816000815181106103c457fe5b602002602001015160001c9050806001146103f15760405162461bcd60e51b815260040161028490612b68565b60008260018151811061040057fe5b60209081029190910181015160015463ffffffff016000818152600590935260409092208c359055915081610435578a356007555b60015b826001018110156104aa576002600019830104915084816001018151811061045c57fe5b60200260200101516005600084815260200190815260200160002081905550828114156104a2576000828152600560205260409020546007846021811061049f57fe5b01555b600101610438565b508382600201815181106104ba57fe5b60209081029190910181015160028190556000818152600490925260408220558b906020020135600660008d81602090810291909101358252810191909152604001600090812091909155600180548082019091557fbe22cbc129fd01d04b02a7b3258b72e8c8ae5bfcf054d7f0359779be627a6b27918d9060200201358d600160200201358e600260200201358d60405161055a959493929190612bb8565b60405180910390a17f36bf5aa3964be01dbd95a0154a8930793fe68353bdc580871ffb2c911366bbc7888d60405161059392919061287a565b60405180910390a1505050505050505050505050565b600188108015906105bb575060028811155b6105d75760405162461bcd60e51b815260040161028490612b98565b8786146105f65760405162461bcd60e51b815260040161028490612b08565b60018410801590610608575060028411155b6106245760405162461bcd60e51b815260040161028490612b18565b8381146106435760405162461bcd60e51b815260040161028490612b38565b60005b8881101561070757600360008b8b8481811061065e57fe5b905061014002016000600a811061067157fe5b60200201358152602001908152602001600020546000801b146106a65760405162461bcd60e51b815260040161028490612ba8565b600460008b8b848181106106b657fe5b905061014002016001600a81106106c957fe5b60200201358152602001908152602001600020546000801b14156106ff5760405162461bcd60e51b815260040161028490612af8565b600101610646565b5060005b84811015610773576006600087878481811061072357fe5b9050610120020160006009811061073657fe5b60200201358152602001908152602001600020546000801b1461076b5760405162461bcd60e51b815260040161028490612ae8565b60010161070b565b5060006002308b8b898988886040516020016107959796959493929190612751565b60408051601f19818403018152908290526107af91612846565b602060405180830381855afa1580156107cc573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052506107ef9190810190611c4e565b9050606063010000028b8b8b8b8b8b8b896000600760015460405161081e9b9a999897969594939291906128bd565b600060405180830381855afa15801561083b573d6000803e3d6000fd5b5050503d806000811461086a576040519150601f19603f3d011682016040523d82523d6000602084013e61086f565b606091505b50905060008160008151811061088157fe5b602002602001015160001c9050806001146108ae5760405162461bcd60e51b815260040161028490612b68565b600160005b888110156109d95760008483806001019450815181106108cf57fe5b602090810291909101015160015490915063ffffffff018b8b848181106108f257fe5b9050610120020160006009811061090557fe5b60008381526005602090815260409091209102919091013590558161094c578b8b8481811061093057fe5b9050610120020160006009811061094357fe5b60200201356007555b60015b826001018110156109c4576002600019830104915086858060010196508151811061097657fe5b60200260200101516005600084815260200190815260200160002081905550828114156109bc57600082815260056020526040902054600784602181106109b957fe5b01555b60010161094f565b505060018054810181559190910190506108b3565b508281815181106109e657fe5b60209081029190910181015160028190556000818152600490925260408220555b8c811015610a8f5760008e8e83818110610a1d57fe5b905061014002016000600a8110610a3057fe5b602002013590508060036000838152602001908152602001600020819055507fd13faa8100906cf559aebacf9c16532cfc9708645c198c8f15798ee049dbcfc181604051610a7e9190612a7d565b60405180910390a150600101610a07565b5060005b88811015610bc457898982818110610aa757fe5b90506101200201600060098110610aba57fe5b6020020135600660008c8c85818110610acf57fe5b90506101200201600060098110610ae257fe5b60200201358152602001908152602001600020819055507f0f190e6ff1f0e1c1f4ec51aecdafdd02278c568898b57df5ca7dccba83a8181c818b8b905003600154038b8b84818110610b3057fe5b90506101200201600060098110610b4357fe5b60200201358c8c85818110610b5457fe5b90506101200201600160098110610b6757fe5b60200201358d8d86818110610b7857fe5b90506101200201600260098110610b8b57fe5b60200201358b8b87818110610b9c57fe5b90506102a00201604051610bb4959493929190612bb8565b60405180910390a1600101610a93565b5050505050505050505050505050565b60046020526000908152604090205481565b6000610bf1896111cb565b905060006002308d888888888e89604051602001610c16989796959493929190612795565b60408051601f1981840301815290829052610c3091612846565b602060405180830381855afa158015610c4d573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250610c709190810190611c4e565b8c356000818152600360209081526040909120549293509091908e01359015610cab5760405162461bcd60e51b815260040161028490612ba8565b600081815260046020526040902054610cd65760405162461bcd60e51b815260040161028490612af8565b6001871115610cf75760405162461bcd60e51b815260040161028490612b28565b868514610d165760405162461bcd60e51b815260040161028490612b88565b86610d9d57600063010000038f8f878f88604051610d389594939291906129cc565b602060405180830381855afa158015610d55573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250610d789190810190611c12565b905080610d975760405162461bcd60e51b815260040161028490612b68565b50610f21565b610f218e600a806020026040519081016040528092919082600a60200280828437600081840152601f19601f8201169050808301925050505050508e6002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050868e6002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050878d8d808060200260200160405190810160405280939291908181526020016000905b82821015610eae576040805161012081810190925290808402870190600990839083908082843760009201919091525050508152600190910190602001610e6c565b50505050508c8c808060200260200160405190810160405280939291908181526020016000905b82821015610f1757604080516102a081810190925290808402870190601590839083908082843760009201919091525050508152600190910190602001610ed5565b505050505061124e565b60008281526003602052604090819020839055517fd13faa8100906cf559aebacf9c16532cfc9708645c198c8f15798ee049dbcfc190610f62908490612a7d565b60405180910390a16000604960009054906101000a90046001600160a01b03166001600160a01b031663a9059cbb8c8f6040518363ffffffff1660e01b8152600401610faf92919061287a565b602060405180830381600087803b158015610fc957600080fd5b505af1158015610fdd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506110019190810190611c12565b9050806110205760405162461bcd60e51b815260040161028490612b48565b7f1daf70c304f467a9efbc9ac1ca7bfe859a478aa6c4b88131b4dbb1547029b9728b8e8c60405161105393929190612895565b60405180910390a1505050505050505050505050505050565b60025481565b600061107c611842565b600154831061109d5760405162461bcd60e51b815260040161028490612b78565b63ffffffff83016110ac611842565b60006110b7866115ab565b905060006110c587836115fa565b905060005b60208163ffffffff1610156111b4578263ffffffff168163ffffffff16141561110d57818482601f0363ffffffff166020811061110357fe5b60200201526111a2565b600285066111415760056000600187038152602001908152602001600020548482601f0363ffffffff166020811061110357fe5b60018501600090815260056020526040902054156111715760018501600090815260056020526040902054611187565b60288163ffffffff166020811061118457fe5b01545b8482601f0363ffffffff166020811061119c57fe5b60200201525b600260001986010494506001016110ca565b505060025494509092505050915091565b60005481565b60008082116111ec5760405162461bcd60e51b815260040161028490612ac8565b60005461120090839063ffffffff61174c16565b1561121d5760405162461bcd60e51b815260040161028490612ab8565b6000805461123290849063ffffffff61179516565b9050677fffffffffffffff811061124857600080fd5b92915050565b60008260008151811061125d57fe5b602002602001015160006009811061127157fe5b6020020151905060066000828152602001908152602001600020546000801b146112ad5760405162461bcd60e51b815260040161028490612ae8565b604080516001808252818301909252606091816020015b6112cc611861565b8152602001906001900390816112c457905050905088816000815181106112ef57fe5b6020908102919091010152604080516001808252818301909252606091816020015b611319611880565b815260200190600190039081611311579050509050888160008151811061133c57fe5b6020026020010181905250606063010000028383888b8b8e600760015460405161136d98979695949392919061294e565b600060405180830381855afa15801561138a573d6000803e3d6000fd5b5050503d80600081146113b9576040519150601f19603f3d011682016040523d82523d6000602084013e6113be565b606091505b5090506000816000815181106113d057fe5b602002602001015160001c9050806001146113fd5760405162461bcd60e51b815260040161028490612b68565b60008260018151811061140c57fe5b60209081029190910181015160015463ffffffff016000818152600590935260409092208890559150816114405760078790555b60015b826001018110156114b5576002600019830104915084816001018151811061146757fe5b60200260200101516005600084815260200190815260200160002081905550828114156114ad57600082815260056020526040902054600784602181106114aa57fe5b01555b600101611443565b508382600201815181106114c557fe5b602090810291909101810151600281905560008181526004835260408082209290925589815260069092528120889055600180548082019091558a517f3814d251636df4a739162facca3862684b45af01ce54bcc56ea488fa6a69412d928a918d919061152e57fe5b602002602001015160016009811061154257fe5b60200201518c60008151811061155457fe5b602002602001015160026009811061156857fe5b60200201518c60008151811061157a57fe5b6020026020010151604051611593959493929190612bfb565b60405180910390a15050505050505050505050505050565b60015460009063ffffffff83019063fffffffe01825b60026000198301046002600019850104146115f25760026000198401049250600260001983010491506001016115c1565b949350505050565b60015463fffffffe0160008181526005602052604081205490918291829163ffffffff8088019290871661167b578183101561163c5794506112489350505050565b8183141561167b576002830661166b575050600019016000908152600560205260409020549250611248915050565b5050602854935061124892505050565b60005b8763ffffffff168163ffffffff16101561174057600283066116ba576000198301600090815260056020526040902054955090935083906116d5565b81955060288163ffffffff16602081106116d057fe5b015494505b63010000048187876040516116ec93929190612c3e565b602060405180830381855afa158015611709573d6000803e3d6000fd5b5050506040513d601f19601f8201168201806040525061172c9190810190611c4e565b91506002600019840104925060010161167e565b50979650505050505050565b600061178e83836040518060400160405280601881526020017f536166654d6174683a206d6f64756c6f206279207a65726f00000000000000008152506117d7565b9392505050565b600061178e83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061180b565b600081836117f85760405162461bcd60e51b81526004016102849190612aa7565b5082848161180257fe5b06949350505050565b6000818361182c5760405162461bcd60e51b81526004016102849190612aa7565b50600083858161183857fe5b0495945050505050565b6040518061040001604052806020906020820280388339509192915050565b604051806101400160405280600a906020820280388339509192915050565b60405180604001604052806002906020820280388339509192915050565b80356118a981612d93565b61178e81612cbd565b60008083601f8401126118c457600080fd5b50813567ffffffffffffffff8111156118dc57600080fd5b602083019150836101408202830111156118f557600080fd5b9250929050565b60008083601f84011261190e57600080fd5b50813567ffffffffffffffff81111561192657600080fd5b602083019150836102a08202830111156118f557600080fd5b60008083601f84011261195157600080fd5b50813567ffffffffffffffff81111561196957600080fd5b6020830191508360408202830111156118f557600080fd5b60008083601f84011261199357600080fd5b50813567ffffffffffffffff8111156119ab57600080fd5b602083019150836101208202830111156118f557600080fd5b80610140810183101561124857600080fd5b806102a0810183101561124857600080fd5b806040810183101561124857600080fd5b806060810183101561124857600080fd5b80610120810183101561124857600080fd5b805161124881612daa565b803561124881612db3565b805161124881612db3565b600080600080600080600080600060c08a8c031215611a5b57600080fd5b893567ffffffffffffffff811115611a7257600080fd5b611a7e8c828d016118b2565b995099505060208a013567ffffffffffffffff811115611a9d57600080fd5b611aa98c828d0161193f565b975097505060408a013567ffffffffffffffff811115611ac857600080fd5b611ad48c828d01611981565b95509550506060611ae78c828d016119e8565b93505060a08a013567ffffffffffffffff811115611b0457600080fd5b611b108c828d016118fc565b92509250509295985092959850929598565b6000806000806000806000806000806102a08b8d031215611b4257600080fd5b6000611b4e8d8d6119c4565b9a5050610140611b608d828e016119e8565b995050610180611b728d828e01611a27565b9850506101a0611b848d828e016119e8565b9750506101e0611b968d828e0161189e565b965050610200611ba88d828e016119f9565b9550506102608b013567ffffffffffffffff811115611bc657600080fd5b611bd28d828e01611981565b94509450506102808b013567ffffffffffffffff811115611bf257600080fd5b611bfe8d828e016118fc565b92509250509295989b9194979a5092959850565b600060208284031215611c2457600080fd5b60006115f28484611a1c565b600060208284031215611c4257600080fd5b60006115f28484611a27565b600060208284031215611c6057600080fd5b60006115f28484611a32565b6000806000806104208587031215611c8357600080fd5b6000611c8f8787611a27565b9450506020611ca087828801611a0a565b935050610140611cb2878288016119e8565b925050610180611cc4878288016119d6565b91505092959194509250565b6000611cdc838361203e565b50506101400190565b6000611cdc838361204f565b6000611cfd83836120a3565b50506102a00190565b6000611d1283836120fc565b505060400190565b6000611d128383612154565b6000611d32838361224b565b50506101200190565b6000611d328383612258565b6000611d5383836122a4565b505060200190565b611d6481612cbd565b82525050565b611d64611d7682612cbd565b612d55565b6000611d878385612cab565b9350611d9282612c59565b8060005b85811015611dc857611da88284612cb9565b611db28882611cd0565b9750611dbd83612c8a565b925050600101611d96565b509495945050505050565b6000611ddf8385612cb4565b9350611dea82612c59565b8060005b85811015611dc857611e008284612cb9565b611e0a8882611cd0565b9750611e1583612c8a565b925050600101611dee565b6000611e2b82612c62565b611e358185612cab565b9350611e4083612c5c565b8060005b83811015611dc8578151611e588882611ce5565b9750611e6383612c5c565b925050600101611e44565b6000611e7a8385612cb4565b9350611e8582612c59565b8060005b85811015611dc857611e9b8284612cb9565b611ea58882611cf1565b9750611eb083612c91565b925050600101611e89565b6000611ec78385612cab565b9350611ed282612c59565b8060005b85811015611dc857611ee88284612cb9565b611ef28882611d06565b9750611efd83612c98565b925050600101611ed6565b6000611f1382612c62565b611f1d8185612cab565b9350611f2883612c5c565b8060005b83811015611dc8578151611f408882611d1a565b9750611f4b83612c5c565b925050600101611f2c565b6000611f628385612cab565b9350611f6d82612c59565b8060005b85811015611dc857611f838284612cb9565b611f8d8882611d26565b9750611f9883612c9e565b925050600101611f71565b6000611faf8385612cb4565b9350611fba82612c59565b8060005b85811015611dc857611fd08284612cb9565b611fda8882611d26565b9750611fe583612c9e565b925050600101611fbe565b6000611ffb82612c62565b6120058185612cab565b935061201083612c5c565b8060005b83811015611dc85781516120288882611d3b565b975061203383612c5c565b925050600101612014565b61204b6101408383612d06565b5050565b61205881612c66565b6120628184612cb4565b925061206d82612c59565b8060005b8381101561209b5781516120858782611d47565b965061209083612c5c565b925050600101612071565b505050505050565b61204b6102a08383612d06565b6120b981612c6c565b6120c38184612cb4565b92506120ce82612c59565b8060005b8381101561209b5781516120e68782611d47565b96506120f183612c5c565b9250506001016120d2565b61204b60408383612d06565b61211181612c72565b61211b8184612cb4565b925061212682612c59565b8060005b8381101561209b57815161213e8782611d47565b965061214983612c5c565b92505060010161212a565b61215d81612c72565b6121678184612cb4565b925061217282612c59565b8060005b8381101561209b57815161218a8782611d47565b965061219583612c5c565b925050600101612176565b6121a981612c78565b6121b38184612cb4565b92506121be82612c59565b8060005b8381101561209b5781516121d68782611d47565b96506121e183612c5c565b9250506001016121c2565b6121f581612c7e565b6121ff8184612cb4565b925061220a82612c59565b8060005b8381101561209b5761221f82612d71565b6122298782611d47565b965061223483612ca5565b92505060010161220e565b61204b60608383612d06565b61204b6101208383612d06565b61226181612c84565b61226b8184612cb4565b925061227682612c59565b8060005b8381101561209b57815161228e8782611d47565b965061229983612c5c565b92505060010161227a565b611d6481612c59565b60006122b882612c62565b6122c28185612cb4565b93506122d2818560208601612d12565b9290920192915050565b611d6481612cfb565b60006122f082612c62565b6122fa8185612cab565b935061230a818560208601612d12565b61231381612d7d565b9093019392505050565b600061232a603183612cab565b7f56616c7565206d75737420626520696e7465676572206d756c7469706c6573208152706f66207363616c696e67466163746f722160781b602082015260400192915050565b600061237d601783612cab565b7f56616c7565206d75737420626520706f73697469766521000000000000000000815260200192915050565b60006123b6601483612cab565b735472616e7366657246726f6d206661696c65642160601b815260200192915050565b60006123e6601983612cab565b7f4475706c6963617465206e6f7465436f6d6d69746d656e742100000000000000815260200192915050565b600061241f601683612cab565b7554686520616e63686f72206d7573742065786973742160501b815260200192915050565b6000612451603d83612cab565b7f496e707574206e756d626572206d75737420626520657175616c20746f20737081527f656e64417574686f726974795369676e6174757265206e756d62657221000000602082015260400192915050565b60006124b0601d83612cab565b7f4f7574707574206e756d626572206d7573742062652031206f72203221000000815260200192915050565b60006124e9601e83612cab565b7f4f7574707574206e756d6265722063616e6e6f74206578636565642031210000815260200192915050565b6000612522602883612cab565b7f4f7574707574206e756d626572206d75737420626520657175616c20746f2063815267206e756d6265722160c01b602082015260400192915050565b600061256c601083612cab565b6f5472616e73666572206661696c65642160801b815260200192915050565b6000612598601a83612cab565b7f4475706c6963617465206e6f7465436f6d6d69746d656e747321000000000000815260200192915050565b60006125d1603f83612cab565b7f5468652070726f6f6620616e64207369676e61747572652068617665206e6f7481527f206265656e2076657269666965642062792074686520636f6e74726163742100602082015260400192915050565b6000612630602a83612cab565b7f506f736974696f6e2073686f756c6420626520736d616c6c6572207468616e208152696c656166436f756e742160b01b602082015260400192915050565b600061267c602b83612cab565b7f4f7574707574206e756d626572206d75737420626520657175616c20746f206c81526a656e677468206f6620632160a81b602082015260400192915050565b60006126c9601c83612cab565b7f496e707574206e756d626572206d7573742062652031206f7220322100000000815260200192915050565b6000612702602083612cab565b7f546865206e6f74652068617320616c7265616479206265656e207370656e7421815260200192915050565b611d6481612ce5565b611d6481612cee565b611d6461274c82612cee565b612d66565b600061275d828a611d6a565b60148201915061276e82888a611dd3565b915061277b828688611fa3565b9150612788828486611e6e565b9998505050505050505050565b60006127a1828b611d6a565b6014820191506127b1828a61203e565b610140820191506127c382888a611fa3565b91506127d0828688611e6e565b91506127dc8285611d6a565b6014820191506127ec8284612740565b5060080198975050505050505050565b60006128088287611d6a565b6014820191506128188286612740565b600882019150612828828561224b565b6101208201915061283982846120a3565b506102a001949350505050565b600061178e82846122ad565b606081016128608286611d5b565b61286d6020830185611d5b565b6115f260408301846122a4565b604081016128888285611d5b565b61178e60208301846122a4565b60a081016128a38286611d5b565b6128b060208301856122a4565b6115f2604083018461223f565b61052080825281016128d0818d8f611d7b565b905081810360208301526128e5818b8d611ebb565b905081810360408301526128fa81898b611f56565b905061290960608301886120fc565b61291660a08301876122a4565b61292360c08301866122dc565b61293060e08301856121ec565b61293e6105008301846122a4565b9c9b505050505050505050505050565b6105208082528101612960818b611e20565b90508181036020830152612974818a611f08565b905081810360408301526129888189611ff0565b90506129976060830188612108565b6129a460a08301876122a4565b6129b160c0830186612737565b6129be60e08301856121ec565b6127886105008301846122a4565b61020081016129db828861203e565b6129e96101408301876120fc565b6129f7610180830186612737565b612a056101a08301856120fc565b612a136101e08301846122a4565b9695505050505050565b6105e08101612a2c828961224b565b612a3a6101208301886120fc565b612a48610160830187612737565b612a566101808301866122a4565b612a646101a08301856121ec565b612a726105c08301846122a4565b979650505050505050565b6020810161124882846122a4565b6104208101612a9a82856122a4565b61178e60208301846121a0565b6020808252810161178e81846122e5565b602080825281016112488161231d565b6020808252810161124881612370565b60208082528101611248816123a9565b60208082528101611248816123d9565b6020808252810161124881612412565b6020808252810161124881612444565b60208082528101611248816124a3565b60208082528101611248816124dc565b6020808252810161124881612515565b602080825281016112488161255f565b602080825281016112488161258b565b60208082528101611248816125c4565b6020808252810161124881612623565b602080825281016112488161266f565b60208082528101611248816126bc565b60208082528101611248816126f5565b6103208101612bc782886122a4565b612bd460208301876122a4565b612be160408301866122a4565b612bee60608301856122a4565b612a1360808301846120a3565b6103208101612c0a82886122a4565b612c1760208301876122a4565b612c2460408301866122a4565b612c3160608301856122a4565b612a1360808301846120b0565b60608101612c4c828661272e565b61286d60208301856122a4565b90565b60200190565b5190565b50600a90565b50601590565b50600290565b50602090565b50602190565b50600990565b6101400190565b6102a00190565b60400190565b6101200190565b60010190565b90815260200190565b919050565b5090565b600061124882612ccd565b151590565b6001600160a01b031690565b6001600160a81b031690565b63ffffffff1690565b67ffffffffffffffff1690565b600061124882612cee565b82818337506000910152565b60005b83811015612d2d578181015183820152602001612d15565b83811115612d3c576000848401525b50505050565b6000611248612d5083612c59565b612c59565b600061124882600061124882612d8d565b600061124882612d87565b60006112488254612d42565b601f01601f191690565b60c01b90565b60601b90565b612d9c81612cd9565b8114612da757600080fd5b50565b612d9c81612cc8565b612d9c81612c5956fea36474726f6e58207ef421e01e827fa1d2e384579b655503e18aef0f4bf9ff3e5176a254c97da9036c6578706572696d656e74616cf564736f6c637828302e352e31322d646576656c6f702e323032302e362e31352b636f6d6d69742e34323336323638380065"
    },
    fallbackOldVersionTest: {
        contractName: "Test0",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            }, {
                "indexed": false,
                "internalType": "bytes",
                "name": "msg",
                "type": "bytes"
            }],
            "name": "FallbackCall",
            "type": "event"
        }, {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101d98061003a6000396000f3fe60c0604052600860808190526766616c6c6261636b60c01b60a0908152610029916000919061010a565b506040805181815260008054600260001961010060018416150201909116049282018390527f1f0af026fd1015e37743a803fa8c7b92c09a6fc99890b1681a1e3c888427c25e9290918291369190819060208201906060830190869080156100d25780601f106100a7576101008083540402835291602001916100d2565b820191906000526020600020905b8154815290600101906020018083116100b557829003601f168201915b50508381038252848152602001858580828437600083820152604051601f909101601f191690920182900397509095505050505050a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014b57805160ff1916838001178555610178565b82800160010185558215610178579182015b8281111561017857825182559160200191906001019061015d565b50610184929150610188565b5090565b6101a291905b80821115610184576000815560010161018e565b9056fea26474726f6e5820e77b862582c00095aa34fd5c2839c0d8f209bdac194c0adeec660fa15a08fbe464736f6c634300050f0031"
    },
    fallbackOldversionCall: {
        contractName: "Call",
        abi:[{
            "constant": false,
            "inputs": [{
                "internalType": "contract Test0",
                "name": "test",
                "type": "address"
            }],
            "name": "call",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101748061003a6000396000f3fe60806040526004361061001e5760003560e01c8063f55332ab14610023575b600080fd5b6100496004803603602081101561003957600080fd5b50356001600160a01b031661005d565b604080519115158252519081900360200190f35b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716939092909182918083835b602083106100c25780518252601f1990920191602091820191016100a3565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610124576040519150601f19603f3d011682016040523d82523d6000602084013e610129565b606091505b505090508061013757600080fd5b5060019291505056fea26474726f6e58203498e1c23a661ae640e44836405d25839850ec79748cabd2dab945fd13ee0c7c64736f6c634300050f0031"
    },
    Caller: {
        contractName: "Caller",
        abi:[{
            "inputs": [{
                "internalType": "contract Test0",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest0",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest1",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "test",
                "type": "address"
            }],
            "name": "callTest2",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "contract TestPayable",
                "name": "test",
                "type": "address"
            }],
            "name": "callTestPayable1",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5061045e8061003a6000396000f3fe60806040526004361061003f5760003560e01c80637b09404c1461004457806381cd8690146100a557806383d9d8e2146100cb578063fd8a3f72146100e1575b600080fd5b34801561005057600080fd5b50d3801561005d57600080fd5b50d2801561006a57600080fd5b506100916004803603602081101561008157600080fd5b50356001600160a01b0316610130565b604080519115158252519081900360200190f35b610091600480360360208110156100bb57600080fd5b50356001600160a01b031661026e565b6100916004803603602081101561008157600080fd5b3480156100ed57600080fd5b50d380156100fa57600080fd5b50d2801561010757600080fd5b5061012e6004803603602081101561011e57600080fd5b50356001600160a01b031661034d565b005b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716939092909182918083835b602083106101955780518252601f199092019160209182019101610176565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146101f7576040519150601f19603f3d011682016040523d82523d6000602084013e6101fc565b606091505b505090508061020a57600080fd5b6040516001600160a01b03841690600081818181865af19150503d8060008114610250576040519150601f19603f3d011682016040523d82523d6000602084013e610255565b606091505b5050809150508061026557600080fd5b50600192915050565b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b1781529151815160009384936001600160a01b038716936103e893919290918291908083835b602083106102d85780518252601f1990920191602091820191016102b9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461033a576040519150601f19603f3d011682016040523d82523d6000602084013e61033f565b606091505b505090508061026557600080fd5b60408051600481526024810182526020810180516001600160e01b031663f85396d760e01b178152915181516000936001600160a01b0386169392918291908083835b602083106103af5780518252601f199092019160209182019101610390565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610411576040519150601f19603f3d011682016040523d82523d6000602084013e610416565b606091505b505090508061042457600080fd5b505056fea2646970667358221220a8ba92701840ebc55cfbea4dde793d8c6d1dea0ad717bb4b990a64ad6a3f6d6a64736f6c63430006000033"
    },
    Test0: {
        contractName: "Test0",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "a",
                "type": "uint256"
            }],
            "name": "FuncCalled",
            "type": "event"
        }],
        bytecode:"6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b50603f8060356000396000f3fe6080604052600080fdfea264697066735822122024bb1ec3ccbbf5f175773883eecb29e15f63a9ac8ea21b2b896824c218b5e4ac64736f6c63430006000033"
    },
    Test1: {
        contractName: "Test1",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "a",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "nonpayable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101db8061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040805180820190915260088082526766616c6c6261636b60c01b602090920191825261005a9160009161010a565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100fa5780601f106100cf576101008083540402835291602001916100fa565b820191906000526020600020905b8154815290600101906020018083116100dd57829003601f168201915b50509250505060405180910390a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014b57805160ff1916838001178555610178565b82800160010185558215610178579182015b8281111561017857825182559160200191906001019061015d565b50610184929150610188565b5090565b6101a291905b80821115610184576000815560010161018e565b9056fea2646970667358221220ffc66ea2b1cb16a6d7d26da40c280f75e73eac93c7e707ce82e6b2a42af6d67e64736f6c63430006000033"
    },
    Test2: {
        contractName: "Test2",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "data",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "payable",
            "type": "fallback"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101aa8061003a6000396000f3fe60c0604052600860808190526766616c6c6261636b60c01b60a090815261002991600091906100d9565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100c95780601f1061009e576101008083540402835291602001916100c9565b820191906000526020600020905b8154815290600101906020018083116100ac57829003601f168201915b50509250505060405180910390a1005b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011a57805160ff1916838001178555610147565b82800160010185558215610147579182015b8281111561014757825182559160200191906001019061012c565b50610153929150610157565b5090565b61017191905b80821115610153576000815560010161015d565b9056fea2646970667358221220f97a67f88304f8e5520cb93af2e3fbb6382554f5af816510e623146ae22df8b464736f6c63430006000033"
    },
    TestPayable: {
        contractName: "TestPayable",
        abi:[{
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "a",
                "type": "string"
            }],
            "name": "FuncCalled",
            "type": "event"
        }, {
            "stateMutability": "payable",
            "type": "fallback"
        }, {
            "stateMutability": "payable",
            "type": "receive"
        }],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101e38061003a6000396000f3fe6080604052366100e757604080518082019091526007808252667265636569766560c81b602090920191825261003791600091610112565b5060408051602080825260008054600260001961010060018416150201909116049183018290527f10c0f70f19b90dec441dc2d497deea85691c944270c9b00cb5743d55f60644ec939092918291820190849080156100d75780601f106100ac576101008083540402835291602001916100d7565b820191906000526020600020905b8154815290600101906020018083116100ba57829003601f168201915b50509250505060405180910390a1005b6040805180820190915260088082526766616c6c6261636b60c01b6020909201918252610037916000915b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015357805160ff1916838001178555610180565b82800160010185558215610180579182015b82811115610180578251825591602001919060010190610165565b5061018c929150610190565b5090565b6101aa91905b8082111561018c5760008155600101610196565b9056fea2646970667358221220475f9be6275cfaeda61b73a80462165b5fcc0051f77b4749c029bfc07eb73c5564736f6c63430006000033"
    },
    rawParam: {
        /*
            pragma solidity ^0.4.18;
            contract rawParam {
                uint256 public check;

                constructor(uint256 _check) public {
                    check = _check;
                }

                function setCheck(uint256 _check) public {
                    check = _check;
                }
            }
        */
        contractName: "rawParam",
        abi: [
            {
                constant: false,
                inputs: [
                    {
                        name: "_check",
                        type: "uint256",
                    },
                ],
                name: "setCheck",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "check",
                outputs: [
                    {
                        name: "",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    /**
     * contract TronToken {

    string public name = "Tronix";      //  token name
    string public symbol = "TRX";           //  token symbol
    uint256 public decimals = 6;            //  token digit

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    uint256 public totalSupply = 0;
    bool public stopped = false;

    address owner = address(0x0);

    modifier isOwner {
        assert(owner == msg.sender);
        _;
    }

    modifier validAddress {
        assert(address(0x0) != msg.sender);
        _;
    }

    constructor(address _addressFounder,uint256 valueFounder) public {
        owner = msg.sender;
        totalSupply = valueFounder;
        balanceOf[_addressFounder] = valueFounder;
        emit Transfer(address(0x0), _addressFounder, valueFounder);
    }

    function transfer(address _to, uint256 _value) validAddress public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) validAddress public returns (bool success) {
        require(_value == 0 || allowance[msg.sender][_spender] == 0);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function setName(string memory _name) isOwner public {
        name = _name;
    }

    function burn(uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[address(0x0)] += _value;
        emit Transfer(msg.sender, address(0x0), _value);
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
     */
    tronToken: {
        contractName: "TronToken",
        abi:[{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_spender",
                "type": "address"
            }, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "approve",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_value",
                "type": "uint256"
            }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stopped",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_to",
                "type": "address"
            }, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transfer",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "_name",
                "type": "string"
            }],
            "name": "setName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "address"
            }, {
                "name": "",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "name": "_addressFounder",
                "type": "address"
            }, {
                "name": "valueFounder",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_from",
                "type": "address"
            }, {
                "indexed": true,
                "name": "_to",
                "type": "address"
            }, {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_owner",
                "type": "address"
            }, {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            }, {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Approval",
            "type": "event"
        }],
        bytecode:"60c0604052600660808190527f54726f6e6978000000000000000000000000000000000000000000000000000060a090815261003e9160009190610168565b506040805180820190915260038082527f5452580000000000000000000000000000000000000000000000000000000000602090920191825261008391600191610168565b5060066002819055600060055580546001600160a81b03191690553480156100aa57600080fd5b50d380156100b757600080fd5b50d280156100c457600080fd5b50604051610931380380610931833981810160405260408110156100e757600080fd5b50805160209182015160068054610100600160a81b031916336101000217905560058190556001600160a01b03821660008181526003855260408082208490558051848152905194959394929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35050610203565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101a957805160ff19168380011785556101d6565b828001600101855582156101d6579182015b828111156101d65782518255916020019190600101906101bb565b506101e29291506101e6565b5090565b61020091905b808211156101e257600081556001016101ec565b90565b61071f806102126000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100c35760003560e01c806370a082311161008b57806370a08231146101c657806375f12b21146101ec57806395d89b41146101f4578063a9059cbb146101fc578063c47f002714610228578063dd62ed3e146102ce576100c3565b806306fdde03146100c8578063095ea7b31461014557806318160ddd14610185578063313ce5671461019f57806342966c68146101a7575b600080fd5b6100d06102fc565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561010a5781810151838201526020016100f2565b50505050905090810190601f1680156101375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101716004803603604081101561015b57600080fd5b506001600160a01b03813516906020013561038a565b604080519115158252519081900360200190f35b61018d610431565b60408051918252519081900360200190f35b61018d610437565b6101c4600480360360208110156101bd57600080fd5b503561043d565b005b61018d600480360360208110156101dc57600080fd5b50356001600160a01b03166104d4565b6101716104e6565b6100d06104ef565b6101716004803603604081101561021257600080fd5b506001600160a01b038135169060200135610549565b6101c46004803603602081101561023e57600080fd5b81019060208101813564010000000081111561025957600080fd5b82018360208201111561026b57600080fd5b8035906020019184600183028401116401000000008311171561028d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610603945050505050565b61018d600480360360408110156102e457600080fd5b506001600160a01b0381358116916020013516610633565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103825780601f1061035757610100808354040283529160200191610382565b820191906000526020600020905b81548152906001019060200180831161036557829003601f168201915b505050505081565b60003361039357fe5b8115806103c157503360009081526004602090815260408083206001600160a01b0387168452909152902054155b6103ca57600080fd5b3360008181526004602090815260408083206001600160a01b03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60055481565b60025481565b3360009081526003602052604090205481111561045957600080fd5b336000818152600360209081526040808320805486900390558280527f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff805486019055805185815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350565b60036020526000908152604090205481565b60065460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103825780601f1061035757610100808354040283529160200191610382565b60003361055257fe5b3360009081526003602052604090205482111561056e57600080fd5b6001600160a01b038316600090815260036020526040902054828101101561059557600080fd5b336000818152600360209081526040808320805487900390556001600160a01b03871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a350600192915050565b60065461010090046001600160a01b0316331461061c57fe5b805161062f906000906020840190610650565b5050565b600460209081526000928352604080842090915290825290205481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061069157805160ff19168380011785556106be565b828001600101855582156106be579182015b828111156106be5782518255916020019190600101906106a3565b506106ca9291506106ce565b5090565b6106e891905b808211156106ca57600081556001016106d4565b9056fea26474726f6e5820beed41f928b5943738d1025b93669ec2de5bf400228e6c96355cc6540fc16f4664736f6c63430005090031"
    },
    /**
     *contract TestAddressArray {
    string public name = "Tronix";
    string public symbol = "TRX";
    uint256 public decimals = 6;

    mapping (address => uint256) public balanceOf;
    uint256 public totalSupply = 0;
    uint256 constant valueFounder = 100000000000000000;
    address owner = address(0x0);

    constructor(address[3] memory _addressFounders) public {
        owner = msg.sender;
        totalSupply = valueFounder;
        for (uint i = 0; i < 3; i++) {
            balanceOf[_addressFounders[i]] = 100000000;
            emit Transfer(address(0x0), _addressFounders[i], 100000000);
        }
        balanceOf[owner] = valueFounder;
        emit Transfer(address(0x0), owner, valueFounder);
    }

    function transferWith2(address[2] memory _to, uint256[2] memory _value) public returns (bool success) {
        for (uint i = 0; i < 2; i++) {
            require(balanceOf[msg.sender] >= _value[i]);
            require(balanceOf[_to[i]] + _value[i] >= balanceOf[_to[i]]);
            balanceOf[msg.sender] -= _value[i];
            balanceOf[_to[i]] += _value[i];
            emit Transfer(msg.sender, _to[i], _value[i]);
        }
        return true;
    }

    function transferWithArray(address[] memory _to, uint256[] memory _value) public returns (bool success) {
        for (uint i = 0; i < _to.length; i++) {
            require(balanceOf[msg.sender] >= _value[i]);
            require(balanceOf[_to[i]] + _value[i] >= balanceOf[_to[i]]);
            balanceOf[msg.sender] -= _value[i];
            balanceOf[_to[i]] += _value[i];
            emit Transfer(msg.sender, _to[i], _value[i]);
        }
        return true;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    }
     */
    testAddressArray: {
        contractName: "TestAddressArray",
        abi:[{
            "inputs": [{
                "internalType": "address[3]",
                "name": "_addressFounders",
                "type": "address[3]"
            }],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            }, {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "name",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address[2]",
                "name": "_to",
                "type": "address[2]"
            }, {
                "internalType": "uint256[2]",
                "name": "_value",
                "type": "uint256[2]"
            }],
            "name": "transferWith2",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address[]",
                "name": "_to",
                "type": "address[]"
            }, {
                "internalType": "uint256[]",
                "name": "_value",
                "type": "uint256[]"
            }],
            "name": "transferWithArray",
            "outputs": [{
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        bytecode:"60c060405260066080819052650a8e4dedcd2f60d31b60a090815261002791600091906101cf565b50604080518082019091526003808252620a8a4b60eb1b6020909201918252610052916001916101cf565b5060066002556000600455600580546001600160a01b031916905534801561007957600080fd5b50d3801561008657600080fd5b50d2801561009357600080fd5b50604051610a90380380610a90833981810160405260608110156100b657600080fd5b50600580546001600160a01b0319163317905567016345785d8a000060045560005b6003811015610175576305f5e100600360008484600381106100f657fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000208190555081816003811061012b57fe5b60200201516001600160a01b031660006001600160a01b0316600080516020610a708339815191526305f5e1006040518082815260200191505060405180910390a36001016100d8565b50600580546001600160a01b03908116600090815260036020908152604080832067016345785d8a0000908190559454815195865290519316939192600080516020610a708339815191529281900390910190a350610262565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061021057805160ff191683800117855561023d565b8280016001018555821561023d579182015b8281111561023d578251825591602001919060010190610222565b5061024992915061024d565b5090565b5b80821115610249576000815560010161024e565b6107ff806102716000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100975760003560e01c8063442c0d0a11610075578063442c0d0a1461013b57806361267ff2146101c357806370a08231146102ea57806395d89b411461031057610097565b806306fdde031461009c57806318160ddd14610119578063313ce56714610133575b600080fd5b6100a4610318565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100de5781810151838201526020016100c6565b50505050905090810190601f16801561010b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101216103a6565b60408051918252519081900360200190f35b6101216103ac565b6101af6004803603608081101561015157600080fd5b6040805180820182529183019291818301918390600290839083908082843760009201919091525050604080518082018252929594938181019392509060029083908390808284376000920191909152509194506103b29350505050565b604080519115158252519081900360200190f35b6101af600480360360408110156101d957600080fd5b8101906020810181356401000000008111156101f457600080fd5b82018360208201111561020657600080fd5b8035906020019184602083028401116401000000008311171561022857600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929594936020810193503591505064010000000081111561027857600080fd5b82018360208201111561028a57600080fd5b803590602001918460208302840111640100000000831117156102ac57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610575945050505050565b6101216004803603602081101561030057600080fd5b50356001600160a01b031661075d565b6100a461076f565b6000805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b505050505081565b60045481565b60025481565b6000805b600281101561056b578281600281106103cb57fe5b602002015160036000336001600160a01b03166001600160a01b0316815260200190815260200160002054101561040157600080fd5b6003600085836002811061041157fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000205483826002811061044357fe5b60200201516003600087856002811061045857fe5b60200201516001600160a01b03166001600160a01b031681526020019081526020016000205401101561048a57600080fd5b82816002811061049657fe5b602090810291909101513360009081526003909252604090912080549190910390558281600281106104c457fe5b6020020151600360008684600281106104d957fe5b602090810291909101516001600160a01b031682528101919091526040016000208054909101905583816002811061050d57fe5b60200201516001600160a01b0316337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85846002811061054957fe5b60200201516040518082815260200191505060405180910390a36001016103b6565b5060019392505050565b6000805b835181101561056b5782818151811061058e57fe5b602002602001015160036000336001600160a01b03166001600160a01b031681526020019081526020016000205410156105c757600080fd5b600360008583815181106105d757fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205483828151811061060c57fe5b60200260200101516003600087858151811061062457fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000205401101561065957600080fd5b82818151811061066557fe5b602090810291909101810151336000908152600390925260409091208054919091039055825183908290811061069757fe5b6020026020010151600360008684815181106106af57fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600082825401925050819055508381815181106106f057fe5b60200260200101516001600160a01b0316336001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85848151811061073857fe5b60200260200101516040518082815260200191505060405180910390a3600101610579565b60036020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561039e5780601f106103735761010080835404028352916020019161039e56fea26469706673582212208d688f20093b0a2c7c148046aa5eec414133ef86914a378392414d6df3cb1e5764736f6c63430007000033ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    },
    /**
     * contract trcTokenTest{
     trcToken idCon = 0;
     uint256 tokenValueCon=0;
     uint256 callValueCon = 0;

     function TransferTokenTo(address payable toAddress, trcToken id, uint256 amount) public payable{
         toAddress.transferToken(amount,id);
     }

     constructor(address payable toAddress, trcToken id, uint256 amount) public payable {
         idCon = msg.tokenid;
         tokenValueCon = msg.tokenvalue;
         callValueCon = msg.value;
         toAddress.transferToken(amount, id);
     }

     function getResultInCon() public payable returns(trcToken, uint256, uint256) {
         return (idCon, tokenValueCon, callValueCon);
     }
    }
     */
    trcTokenTest070: {
        contractName: "trcTokenTest",
        abi:[{
            "inputs": [{
                "internalType": "address payable",
                "name": "toAddress",
                "type": "address"
            }, {
                "internalType": "trcToken",
                "name": "id",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "constructor"
        }, {
            "inputs": [{
                "internalType": "address payable",
                "name": "toAddress",
                "type": "address"
            }, {
                "internalType": "trcToken",
                "name": "id",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "TransferTokenTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getResultInCon",
            "outputs": [{
                "internalType": "trcToken",
                "name": "",
                "type": "trcToken"
            }, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "function"
        }],
        bytecode:"608060405260008055600060015560006002556040516102143803806102148339818101604052606081101561003457600080fd5b5080516020820151604090920151d3600055d2600155346002559091906001600160a01b03831681156108fc0282848015801561007057600080fd5b50806780000000000000001115801561008857600080fd5b5080620f42401015801561009b57600080fd5b50604051600081818185878a8ad09450505050501580156100c0573d6000803e3d6000fd5b50505050610141806100d36000396000f3fe6080604052600436106100295760003560e01c806305c242001461002e5780633be9ece714610054575b600080fd5b610036610088565b60408051938452602084019290925282820152519081900360600190f35b6100866004803603606081101561006a57600080fd5b506001600160a01b038135169060208101359060400135610096565b005b600054600154600254909192565b6001600160a01b03831681156108fc028284801580156100b557600080fd5b5080678000000000000000111580156100cd57600080fd5b5080620f4240101580156100e057600080fd5b50604051600081818185878a8ad0945050505050158015610105573d6000803e3d6000fd5b5050505056fea2646970667358221220a6d3097688ad04359dcb76e491a45f7c4f39a04739bd5209ad46ac46937ddb0f64736f6c63430007000033"
    },
    trcTokenTest059: {
        contractName: "trcTokenTest",
        abi:[{
            "constant": false,
            "inputs": [],
            "name": "getResultInCon",
            "outputs": [{
                "name": "",
                "type": "trcToken"
            }, {
                "name": "",
                "type": "uint256"
            }, {
                "name": "",
                "type": "uint256"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "toAddress",
                "type": "address"
            }, {
                "name": "id",
                "type": "trcToken"
            }, {
                "name": "amount",
                "type": "uint256"
            }],
            "name": "TransferTokenTo",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [{
                "name": "toAddress",
                "type": "address"
            }, {
                "name": "id",
                "type": "trcToken"
            }, {
                "name": "amount",
                "type": "uint256"
            }],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        }],
        bytecode:"608060405260008055600060015560006002556040516102123803806102128339818101604052606081101561003457600080fd5b5080516020820151604090920151d3600055d2600155346002559091906001600160a01b03831681156108fc0282848015801561007057600080fd5b50806780000000000000001115801561008857600080fd5b5080620f42401015801561009b57600080fd5b50604051600081818185878a8ad09450505050501580156100c0573d6000803e3d6000fd5b5050505061013f806100d36000396000f3fe6080604052600436106100295760003560e01c806305c242001461002e5780633be9ece714610054575b600080fd5b610036610088565b60408051938452602084019290925282820152519081900360600190f35b6100866004803603606081101561006a57600080fd5b506001600160a01b038135169060208101359060400135610096565b005b600054600154600254909192565b6001600160a01b03831681156108fc028284801580156100b557600080fd5b5080678000000000000000111580156100cd57600080fd5b5080620f4240101580156100e057600080fd5b50604051600081818185878a8ad0945050505050158015610105573d6000803e3d6000fd5b5050505056fea26474726f6e5820b3903cb5f98dfab275d27fa71f437645d2ff94eac94d9a0c30c2c9836819ab7d64736f6c63430005090031"
    },
    funcABIV2: {
        /*
            pragma solidity ^0.4.18;
            contract funcABIV2 {
                uint256 public check;

                constructor(uint256 _check) public {
                    check = _check;
                }

                function setCheck(uint256 _check) public {
                    check = _check;
                }
            }
        */
        contractName: "funcABIV2",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_check",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "check",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_check",
                        "type": "uint256"
                    }
                ],
                "name": "setCheck",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    funcABIV2_2: {
        "bytecode": "0x6060604052341561000f57600080fd5b6102888061001e6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
        "result": "0x0000000000000000000000001d39a67ed2fcff49d955aefef526e36995453e870000000000000000000000001a8d6d77ba7102532ce756c64ecbd6d20b36257f000000000000000000000000cfff478412982dc11d3700747fa1972815853776",
        "interface": "[{\"constant\":true,\"inputs\":[],\"name\":\"test\",\"outputs\":[{\"components\":[{\"name\":\"a\",\"type\":\"address\"},{\"name\":\"b\",\"type\":\"address\"},{\"name\":\"c\",\"type\":\"address\"}],\"name\":\"r0\",\"type\":\"tuple\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"}]",
        "name": "random-0",
        "runtimeBytecode": "0x606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
        "source": "// Test: random-0\n// Comnpiler: 0.4.18+commit.9cf6e910\n// [{\"type\":\"tuple\",\"name\":\"Struct47985BF5FB\",\"struct\":\"    struct Struct47985BF5FB {\\n        address a;\\n        address b;\\n        address c;\\n    }\\n\",\"value\":[{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]\n \npragma experimental ABIEncoderV2;\npragma solidity ^0.4.18;\n\ncontract Test {\n    struct Struct47985BF5FB {\n        address a;\n        address b;\n        address c;\n    }\n\n    function test() pure returns (Struct47985BF5FB r0) {\n        r0.a = address(0x1D39a67eD2fcfF49D955aEfEF526e36995453E87);\n        r0.b = address(0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f);\n        r0.c = address(0xcFfF478412982dc11d3700747FA1972815853776);\n    }\n}\n",
        "types": "[\"tuple(address,address,address)\"]",
        "values": "[{\"type\":\"tuple\",\"value\":[{\"type\":\"string\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"string\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"string\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]",
        "version": "0.4.18+commit.9cf6e910"
    },
    funcABIV2_3: {
        /*
          pragma experimental ABIEncoderV2;
          contract Test {
            struct Struct47985BF5FB {
              address a;
              address b;
              address c;
            }
            mapping (uint256 => Struct47985BF5FB) public s;

            function setStruct(Struct47985BF5FB calldata _s)  public {
              s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
            }

            function get1() public view returns(Struct47985BF5FB memory s2){
                s2 = s[0];

            }
        */
        contractName: "funcABIV2_3",
        abi: [
            {
                "inputs": [],
                "name": "get1",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "b",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "s2",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "s",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "b",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "c",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "b",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "_s",
                        "type": "tuple"
                    }
                ],
                "name": "setStruct",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106bd8061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c8063054c1a75146100605780630de3848f1461007e57806352efd6851461009a575b600080fd5b6100686100cc565b60405161007591906105d7565b60405180910390f35b610098600480360381019061009391906104e6565b6101f8565b005b6100b460048036038101906100af9190610513565b610378565b6040516100c3939291906105a0565b60405180910390f35b6100d4610402565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b604051806060016040528082600001602081019061021691906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182602001602081019061024491906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182604001602081019061027291906104b9565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008135905061047481610659565b61047d816105f2565b905092915050565b60006060828403121561049b5761049a61064f565b5b81905092915050565b6000813590506104b381610670565b92915050565b6000602082840312156104cf576104ce610654565b5b60006104dd84828501610465565b91505092915050565b6000606082840312156104fc576104fb610654565b5b600061050a84828501610485565b91505092915050565b60006020828403121561052957610528610654565b5b6000610537848285016104a4565b91505092915050565b610549816105f2565b82525050565b610558816105f2565b82525050565b6060820160008201516105746000850182610540565b5060208201516105876020850182610540565b50604082015161059a6040850182610540565b50505050565b60006060820190506105b5600083018661054f565b6105c2602083018561054f565b6105cf604083018461054f565b949350505050565b60006060820190506105ec600083018461055e565b92915050565b60006105fd82610604565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b61066281610624565b811461066d57600080fd5b50565b61067981610645565b811461068457600080fd5b5056fea26474726f6e5822122033b02c1792f1c2b017ea3cc155a5c31bdd6eff931f11f2a9095eb6c3bfc56c9764736f6c63430008060033",
    },
    funcABIV2_4: {
        /*
          pragma experimental ABIEncoderV2;
          contract Test {
            struct Struct47985BF5FB {
              address a;
              trcToken b;
              address c;
            }
            mapping (uint256 => Struct47985BF5FB) public s;

            function setStruct(Struct47985BF5FB calldata _s)  public {
              s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
            }

            function get() public view returns(Struct47985BF5FB memory s2){
                s2 = s[0];
            }

          }
        */
        contractName: "funcABIV2_4",
        abi: [
            {
                "inputs": [],
                "name": "get",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "b",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "s2",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "s",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "b",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "c",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "a",
                                "type": "address"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "b",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "address",
                                "name": "c",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct Test.Struct47985BF5FB",
                        "name": "_s",
                        "type": "tuple"
                    }
                ],
                "name": "setStruct",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106028061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c806352efd685146100605780635aeccbe6146100925780636d4ce63c146100ae575b600080fd5b61007a60048036038101906100759190610430565b6100cc565b604051610089939291906104db565b60405180910390f35b6100ac60048036038101906100a79190610403565b610136565b005b6100b6610255565b6040516100c39190610512565b60405180910390f35b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b604051806060016040528082600001602081019061015491906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681526020018260200135815260200182604001602081019061018c91906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b61025d610335565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000813590506103918161059e565b61039a8161052d565b905092915050565b6000606082840312156103b8576103b7610594565b5b81905092915050565b6000813590506103d0816105b5565b92915050565b6000602082840312156103ec576103eb610599565b5b60006103fa84828501610382565b91505092915050565b60006060828403121561041957610418610599565b5b6000610427848285016103a2565b91505092915050565b60006020828403121561044657610445610599565b5b6000610454848285016103c1565b91505092915050565b6104668161052d565b82525050565b6104758161052d565b82525050565b606082016000820151610491600085018261045d565b5060208201516104a460208501826104bd565b5060408201516104b7604085018261045d565b50505050565b6104c68161053f565b82525050565b6104d58161053f565b82525050565b60006060820190506104f0600083018661046c565b6104fd60208301856104cc565b61050a604083018461046c565b949350505050565b6000606082019050610527600083018461047b565b92915050565b600061053882610549565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b6105a781610569565b81146105b257600080fd5b50565b6105be8161058a565b81146105c957600080fd5b5056fea26474726f6e5822122003e6f6fe8adb4a16e48e773436d2d36d3bcf3d16227953199ec68896e85b82b264736f6c63430008060033",
    },
    abiV2Test1: {
        /*
        pragma experimental ABIEncoderV2;

        contract viewCall {
            bool stopped = false;
            int i = 32482989;
            int i2 = - 32482989;
            address public origin = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
            mapping(uint => string[]) public map1;
            mapping(uint => bytes[]) public map2;

            trcToken public token =1000002;
            string[] public strs = ["1","2","3"];
            bytes[] public bys;
            struct S {
                uint256 a;
            }
            S[] public structArray;
            struct Data {
                mapping(uint => string[]) val1;
                mapping(uint => bytes[]) val2;
                S val3;
                uint[] val4;
                address addr;
                trcToken token;
            }
            struct Info {
                S val3;
                uint[] val4;
                address addr;
                trcToken token;
            }
            struct SanCeng {
                Info infoValue;
            }
            struct SiCeng {
                SanCeng sanCengValue;
            }
            uint numData;
            mapping (uint => Data) public data;
            event log(int);
            event log(bool);
            event log(address);
            event log(bytes[]);
            event log(string[]);
            event log(S[]);

            constructor(S memory param,address addr,trcToken t,string[] memory s,bytes[] memory b) public{
                structArray.push(S(param.a));
                origin=addr;
                token=t;
                strs=s;
                bys=b;
            }

            function changeMapAll(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,S memory svalue,uint[] memory val4value,address addr,trcToken tokenid) public returns(uint,address,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = addr;
                d.val3 = svalue;
                d.val4 = val4value;
                d.token = tokenid;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (numDataID,d.addr,d.val4);
            }

            function changeMapAll2(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,SanCeng memory param) public returns(trcToken,address,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = param.infoValue.addr;
                d.val3 = param.infoValue.val3;
                d.val4 = param.infoValue.val4;
                d.token = param.infoValue.token;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (d.token,d.addr,d.val4);
            }

            function changeMapAll3(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,SiCeng memory param) public returns(trcToken,address,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = param.sanCengValue.infoValue.addr;
                d.val3 = param.sanCengValue.infoValue.val3;
                d.val4 = param.sanCengValue.infoValue.val4;
                d.token = param.sanCengValue.infoValue.token;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (d.token,d.addr,d.val4);
            }

            function changeStructArray(S calldata param1,S calldata param2) public returns (S[] memory){
                structArray.push(S(param1.a));
                structArray.push(S(param2.a));
                emit log(structArray);
                return structArray;
            }

            function getStructArray() public view returns (S[] memory){
                return structArray;
            }

            function changeStrs(string[] memory param) public returns (string[] memory){
                strs = param;
                emit log(strs);
                return strs;
            }

            function getStrs() public view returns (string[] memory){
                return strs;
            }

            function changeBys(bytes[] memory param) public returns (bytes[] memory){
                bys = param;
                emit log(bys);
                return bys;
            }

            function getBys() public view returns (bytes[] memory){
                return bys;
            }

            function changeBool(bool param) public returns (bool){
                stopped = param;
                emit log(stopped);
                return stopped;
            }

            function getBool() public view returns (bool){
                return stopped;
            }

            function changeInt(int param) public returns (int){
                i = param;
                emit log(i);
                return i;
            }

            function getInt() public view returns (int){
                return i;
            }

            function changeNegativeInt(int param) public returns (int){
                i2 = param;
                emit log(i2);
                return i2;
            }

            function getNegativeInt() public view returns (int){
                return i2;
            }


        }
         */
        contractName: "abiV2Test1",
        abi:[
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "t",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "string[]",
                        "name": "s",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "b",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "indexed": false,
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bys",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bool",
                        "name": "param",
                        "type": "bool"
                    }
                ],
                "name": "changeBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "param",
                        "type": "bytes[]"
                    }
                ],
                "name": "changeBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "svalue",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "val4value",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "tokenid",
                        "type": "trcToken"
                    }
                ],
                "name": "changeMapAll",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "components": [
                                            {
                                                "internalType": "uint256",
                                                "name": "a",
                                                "type": "uint256"
                                            }
                                        ],
                                        "internalType": "struct viewCall.S",
                                        "name": "val3",
                                        "type": "tuple"
                                    },
                                    {
                                        "internalType": "uint256[]",
                                        "name": "val4",
                                        "type": "uint256[]"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "addr",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "token",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct viewCall.Info",
                                "name": "infoValue",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct viewCall.SanCeng",
                        "name": "param",
                        "type": "tuple"
                    }
                ],
                "name": "changeMapAll2",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "components": [
                                            {
                                                "components": [
                                                    {
                                                        "internalType": "uint256",
                                                        "name": "a",
                                                        "type": "uint256"
                                                    }
                                                ],
                                                "internalType": "struct viewCall.S",
                                                "name": "val3",
                                                "type": "tuple"
                                            },
                                            {
                                                "internalType": "uint256[]",
                                                "name": "val4",
                                                "type": "uint256[]"
                                            },
                                            {
                                                "internalType": "address",
                                                "name": "addr",
                                                "type": "address"
                                            },
                                            {
                                                "internalType": "trcToken",
                                                "name": "token",
                                                "type": "trcToken"
                                            }
                                        ],
                                        "internalType": "struct viewCall.Info",
                                        "name": "infoValue",
                                        "type": "tuple"
                                    }
                                ],
                                "internalType": "struct viewCall.SanCeng",
                                "name": "sanCengValue",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct viewCall.SiCeng",
                        "name": "param",
                        "type": "tuple"
                    }
                ],
                "name": "changeMapAll3",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string[]",
                        "name": "param",
                        "type": "string[]"
                    }
                ],
                "name": "changeStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param1",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param2",
                        "type": "tuple"
                    }
                ],
                "name": "changeStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "data",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "val3",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "token",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map2",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "origin",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "strs",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "structArray",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "a",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:
            "608060405260008060006101000a81548160ff0219169083151502179055506301efa6ad6001557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe10595360025573dcad3a6d3569df655070ded06cb7a1b2ccd1d3af600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620f424260065560405180606001604052806040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f320000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f33000000000000000000000000000000000000000000000000000000000000008152508152506007906003620001729291906200028d565b503480156200018057600080fd5b50d380156200018e57600080fd5b50d280156200019c57600080fd5b5060405162003f2b38038062003f2b8339818101604052810190620001c291906200090e565b6009604051806020016040528087600001518152509080600181540180825580915050600190039060005260206000200160009091909190915060008201518160000155505083600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600681905550816007908051906020019062000268929190620002f4565b508060089080519060200190620002819291906200035b565b50505050505062000cad565b828054828255906000526020600020908101928215620002e1579160200282015b82811115620002e0578251829080519060200190620002cf929190620003c2565b5091602001919060010190620002ae565b5b509050620002f0919062000453565b5090565b82805482825590600052602060002090810192821562000348579160200282015b828111156200034757825182908051906020019062000336929190620003c2565b509160200191906001019062000315565b5b50905062000357919062000453565b5090565b828054828255906000526020600020908101928215620003af579160200282015b82811115620003ae5782518290805190602001906200039d9291906200047b565b50916020019190600101906200037c565b5b509050620003be91906200050c565b5090565b828054620003d09062000b66565b90600052602060002090601f016020900481019282620003f4576000855562000440565b82601f106200040f57805160ff191683800117855562000440565b8280016001018555821562000440579182015b828111156200043f57825182559160200191906001019062000422565b5b5090506200044f919062000534565b5090565b5b808211156200047757600081816200046d919062000553565b5060010162000454565b5090565b828054620004899062000b66565b90600052602060002090601f016020900481019282620004ad5760008555620004f9565b82601f10620004c857805160ff1916838001178555620004f9565b82800160010185558215620004f9579182015b82811115620004f8578251825591602001919060010190620004db565b5b50905062000508919062000534565b5090565b5b8082111562000530576000818162000526919062000599565b506001016200050d565b5090565b5b808211156200054f57600081600090555060010162000535565b5090565b508054620005619062000b66565b6000825580601f1062000575575062000596565b601f01602090049060005260206000209081019062000595919062000534565b5b50565b508054620005a79062000b66565b6000825580601f10620005bb5750620005dc565b601f016020900490600052602060002090810190620005db919062000534565b5b50565b6000620005f6620005f084620009fd565b620009d4565b905080838252602082019050828560208602820111156200061c576200061b62000c3a565b5b60005b858110156200067157815167ffffffffffffffff81111562000646576200064562000c30565b5b80860162000655898262000837565b855260208501945060208401935050506001810190506200061f565b5050509392505050565b6000620006926200068c8462000a2c565b620009d4565b90508083825260208201905082856020860282011115620006b857620006b762000c3a565b5b60005b858110156200070d57815167ffffffffffffffff811115620006e257620006e162000c30565b5b808601620006f189826200086a565b85526020850194506020840193505050600181019050620006bb565b5050509392505050565b60006200072e620007288462000a5b565b620009d4565b9050828152602081018484840111156200074d576200074c62000c3f565b5b6200075a84828562000b30565b509392505050565b600062000779620007738462000a91565b620009d4565b90508281526020810184848401111562000798576200079762000c3f565b5b620007a584828562000b30565b509392505050565b600081519050620007be8162000c5f565b620007c98162000ac7565b905092915050565b600082601f830112620007e957620007e862000c30565b5b8151620007fb848260208601620005df565b91505092915050565b600082601f8301126200081c576200081b62000c30565b5b81516200082e8482602086016200067b565b91505092915050565b600082601f8301126200084f576200084e62000c30565b5b81516200086184826020860162000717565b91505092915050565b600082601f83011262000882576200088162000c30565b5b81516200089484826020860162000762565b91505092915050565b600060208284031215620008b657620008b562000c35565b5b620008c26020620009d4565b90506000620008d484828501620008f7565b60008301525092915050565b600081519050620008f18162000c79565b92915050565b600081519050620009088162000c93565b92915050565b600080600080600060a086880312156200092d576200092c62000c49565b5b60006200093d888289016200089d565b95505060206200095088828901620007ad565b94505060406200096388828901620008e0565b935050606086015167ffffffffffffffff81111562000987576200098662000c44565b5b620009958882890162000804565b925050608086015167ffffffffffffffff811115620009b957620009b862000c44565b5b620009c788828901620007d1565b9150509295509295909350565b6000620009e0620009f3565b9050620009ee828262000b9c565b919050565b6000604051905090565b600067ffffffffffffffff82111562000a1b5762000a1a62000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a4a5762000a4962000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a795762000a7862000c01565b5b62000a848262000c4e565b9050602081019050919050565b600067ffffffffffffffff82111562000aaf5762000aae62000c01565b5b62000aba8262000c4e565b9050602081019050919050565b600062000ad48262000ae5565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000b5057808201518184015260208101905062000b33565b8381111562000b60576000848401525b50505050565b6000600282049050600182168062000b7f57607f821691505b6020821081141562000b965762000b9562000bd2565b5b50919050565b62000ba78262000c4e565b810181811067ffffffffffffffff8211171562000bc95762000bc862000c01565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b62000c6a8162000b05565b811462000c7657600080fd5b50565b62000c848162000adb565b811462000c9057600080fd5b50565b62000c9e8162000b26565b811462000caa57600080fd5b50565b61326e8062000cbd6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101675760003560e01c80637cd4f4ba116100dd578063d9e0b46c11610096578063d9e0b46c14610420578063e0ed46b214610452578063f0ba844014610482578063f1676e05146104b4578063f895c66a146104e4578063fc0c546a1461051657610167565b80637cd4f4ba146103365780638fd0cf7d1461036657806392bbd4d614610384578063938b5f32146103b4578063974f3e53146103d2578063d123b9ed146103f057610167565b80633cbf8c281161012f5780633cbf8c281461024a578063417b05361461027a57806353340aba146102ac57806354bf7f1a146102ca57806362738998146102e85780636d6897791461030657610167565b80630f634b741461016c57806312a7b9141461019c5780631f659d8c146101ba5780633316f634146101ea57806337f4af441461021a575b600080fd5b610186600480360381019061018191906120e8565b610534565b6040516101939190612c10565b60405180910390f35b6101a461055e565b6040516101b19190612b06565b60405180910390f35b6101d460048036038101906101cf91906123bd565b610574565b6040516101e19190612b21565b60405180910390f35b61020460048036038101906101ff91906120a8565b61062d565b6040516102119190612ac2565b60405180910390f35b610234600480360381019061022f9190612005565b610759565b6040516102419190612a7e565b60405180910390f35b610264600480360381019061025f91906123bd565b610883565b6040516102719190612b5e565b60405180910390f35b610294600480360381019061028f91906122ee565b61093c565b6040516102a393929190612bd2565b60405180910390f35b6102b4610b6b565b6040516102c19190612b43565b60405180910390f35b6102d2610b75565b6040516102df9190612ac2565b60405180910390f35b6102f0610bda565b6040516102fd9190612b43565b60405180910390f35b610320600480360381019061031b919061204e565b610be4565b60405161032d9190612b06565b60405180910390f35b610350600480360381019061034b9190611fbc565b610c58565b60405161035d9190612a3a565b60405180910390f35b61036e610d82565b60405161037b9190612a7e565b60405180910390f35b61039e600480360381019061039991906120e8565b610e5b565b6040516103ab9190612b21565b60405180910390f35b6103bc610f07565b6040516103c99190612a1f565b60405180910390f35b6103da610f2d565b6040516103e79190612a3a565b60405180910390f35b61040a6004803603810190610405919061207b565b611006565b6040516104179190612b43565b60405180910390f35b61043a6004803603810190610435919061221f565b611052565b60405161044993929190612bd2565b60405180910390f35b61046c600480360381019061046791906120e8565b611271565b6040516104799190612b5e565b60405180910390f35b61049c600480360381019061049791906120e8565b61131d565b6040516104ab93929190612b80565b60405180910390f35b6104ce60048036038101906104c9919061207b565b61137b565b6040516104db9190612b43565b60405180910390f35b6104fe60048036038101906104f99190612115565b6113c7565b60405161050d93929190612c2b565b60405180910390f35b61051e6115c5565b60405161052b9190612bb7565b60405180910390f35b6009818154811061054457600080fd5b906000526020600020016000915090508060000154905081565b60008060009054906101000a900460ff16905090565b6005602052816000526040600020818154811061059057600080fd5b906000526020600020016000915091505080546105ac9061302c565b80601f01602080910402602001604051908101604052809291908181526020018280546105d89061302c565b80156106255780601f106105fa57610100808354040283529160200191610625565b820191906000526020600020905b81548152906001019060200180831161060857829003601f168201915b505050505081565b606060096040518060200160405280856000013581525090806001815401808255809150506001900390600052602060002001600090919091909150600082015181600001555050600960405180602001604052808460000135815250908060018154018082558091505060019003906000526020600020016000909190919091506000820151816000015550507f0ffb2719457225b3496d50086fa280375d58c6a11277df800a678473547c089660096040516106eb9190612ae4565b60405180910390a16009805480602002602001604051908101604052809291908181526020016000905b8282101561074d5783829060005260206000200160405180602001604052908160008201548152505081526020019060010190610715565b50505050905092915050565b606081600790805190602001906107719291906115cb565b507f45eae716480be83ee40dd1cb77b31470f66ba3cc313fe0fa5b2ae2a1cdc65e1960076040516107a29190612aa0565b60405180910390a16007805480602002602001604051908101604052809291908181526020016000905b828210156108785783829060005260206000200180546107eb9061302c565b80601f01602080910402602001604051908101604052809291908181526020018280546108179061302c565b80156108645780601f1061083957610100808354040283529160200191610864565b820191906000526020600020905b81548152906001019060200180831161084757829003601f168201915b5050505050815260200190600101906107cc565b505050509050919050565b6004602052816000526040600020818154811061089f57600080fd5b906000526020600020016000915091505080546108bb9061302c565b80601f01602080910402602001604051908101604052809291908181526020018280546108e79061302c565b80156109345780601f1061090957610100808354040283529160200191610934565b820191906000526020600020905b81548152906001019060200180831161091757829003601f168201915b505050505081565b60008060606000600a6000815480929190610956906130a9565b91905055905087600460008b815260200190815260200160002090805190602001906109839291906115cb565b50856005600089815260200190815260200160002090805190602001906109ab92919061162b565b506000600b60008381526020019081526020016000209050856000015160000151604001518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600001516000015160000151816002016000820151816000015590505085600001516000015160200151816003019080519060200190610a5492919061168b565b50856000015160000151606001518160050181905550600460008b8152602001908152602001600020816000016000848152602001908152602001600020908054610aa09291906116d8565b5060056000898152602001908152602001600020816001016000848152602001908152602001600020908054610ad7929190611740565b5080600501548160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168260030180805480602002602001604051908101604052809291908181526020018280548015610b5157602002820191906000526020600020905b815481526020019060010190808311610b3d575b505050505090509450945094505050955095509592505050565b6000600254905090565b60606009805480602002602001604051908101604052809291908181526020016000905b82821015610bd15783829060005260206000200160405180602001604052908160008201548152505081526020019060010190610b99565b50505050905090565b6000600154905090565b6000816000806101000a81548160ff0219169083151502179055507f32458eed3feca62a69292a55ca8a755ae4e6cdc57a38d15c298330064467fdd760008054906101000a900460ff16604051610c3b9190612b06565b60405180910390a160008054906101000a900460ff169050919050565b60608160089080519060200190610c7092919061162b565b507f3e7e0752aafa67c79b222ee5298c3795ceb90ad2b4eac91f47e5b0046867ff716008604051610ca19190612a5c565b60405180910390a16008805480602002602001604051908101604052809291908181526020016000905b82821015610d77578382906000526020600020018054610cea9061302c565b80601f0160208091040260200160405190810160405280929190818152602001828054610d169061302c565b8015610d635780601f10610d3857610100808354040283529160200191610d63565b820191906000526020600020905b815481529060010190602001808311610d4657829003601f168201915b505050505081526020019060010190610ccb565b505050509050919050565b60606007805480602002602001604051908101604052809291908181526020016000905b82821015610e52578382906000526020600020018054610dc59061302c565b80601f0160208091040260200160405190810160405280929190818152602001828054610df19061302c565b8015610e3e5780601f10610e1357610100808354040283529160200191610e3e565b820191906000526020600020905b815481529060010190602001808311610e2157829003601f168201915b505050505081526020019060010190610da6565b50505050905090565b60088181548110610e6b57600080fd5b906000526020600020016000915090508054610e869061302c565b80601f0160208091040260200160405190810160405280929190818152602001828054610eb29061302c565b8015610eff5780601f10610ed457610100808354040283529160200191610eff565b820191906000526020600020905b815481529060010190602001808311610ee257829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606008805480602002602001604051908101604052809291908181526020016000905b82821015610ffd578382906000526020600020018054610f709061302c565b80601f0160208091040260200160405190810160405280929190818152602001828054610f9c9061302c565b8015610fe95780601f10610fbe57610100808354040283529160200191610fe9565b820191906000526020600020905b815481529060010190602001808311610fcc57829003601f168201915b505050505081526020019060010190610f51565b50505050905090565b6000816002819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef86002546040516110409190612b43565b60405180910390a16002549050919050565b60008060606000600a600081548092919061106c906130a9565b91905055905087600460008b815260200190815260200160002090805190602001906110999291906115cb565b50856005600089815260200190815260200160002090805190602001906110c192919061162b565b506000600b600083815260200190815260200160002090508560000151604001518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856000015160000151816002016000820151816000015590505085600001516020015181600301908051906020019061115e92919061168b565b508560000151606001518160050181905550600460008b81526020019081526020016000208160000160008481526020019081526020016000209080546111a69291906116d8565b50600560008981526020019081526020016000208160010160008481526020019081526020016000209080546111dd929190611740565b5080600501548160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826003018080548060200260200160405190810160405280929190818152602001828054801561125757602002820191906000526020600020905b815481526020019060010190808311611243575b505050505090509450945094505050955095509592505050565b6007818154811061128157600080fd5b90600052602060002001600091509050805461129c9061302c565b80601f01602080910402602001604051908101604052809291908181526020018280546112c89061302c565b80156113155780601f106112ea57610100808354040283529160200191611315565b820191906000526020600020905b8154815290600101906020018083116112f857829003601f168201915b505050505081565b600b60205280600052604060002060009150905080600201604051806020016040529081600082015481525050908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050154905083565b6000816001819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef86001546040516113b59190612b43565b60405180910390a16001549050919050565b60008060606000600a60008154809291906113e1906130a9565b9190505590508a600460008e8152602001908152602001600020908051906020019061140e9291906115cb565b5088600560008c8152602001908152602001600020908051906020019061143692919061162b565b506000600b60008381526020019081526020016000209050868160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550888160020160008201518160000155905050878160030190805190602001906114bb92919061168b565b50858160050181905550600460008e81526020019081526020016000208160000160008481526020019081526020016000209080546114fb9291906116d8565b50600560008c8152602001908152602001600020816001016000848152602001908152602001600020908054611532929190611740565b50818160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301808054806020026020016040519081016040528092919081815260200182805480156115a857602002820191906000526020600020905b815481526020019060010190808311611594575b505050505090509450945094505050985098509895505050505050565b60065481565b82805482825590600052602060002090810192821561161a579160200282015b828111156116195782518290805190602001906116099291906117a8565b50916020019190600101906115eb565b5b509050611627919061182e565b5090565b82805482825590600052602060002090810192821561167a579160200282015b82811115611679578251829080519060200190611669929190611852565b509160200191906001019061164b565b5b50905061168791906118d8565b5090565b8280548282559060005260206000209081019282156116c7579160200282015b828111156116c65782518255916020019190600101906116ab565b5b5090506116d491906118fc565b5090565b82805482825590600052602060002090810192821561172f5760005260206000209182015b8281111561172e5782829080546117139061302c565b61171e929190611919565b50916001019190600101906116fd565b5b50905061173c919061182e565b5090565b8280548282559060005260206000209081019282156117975760005260206000209182015b8281111561179657828290805461177b9061302c565b6117869291906119a6565b5091600101919060010190611765565b5b5090506117a491906118d8565b5090565b8280546117b49061302c565b90600052602060002090601f0160209004810192826117d6576000855561181d565b82601f106117ef57805160ff191683800117855561181d565b8280016001018555821561181d579182015b8281111561181c578251825591602001919060010190611801565b5b50905061182a91906118fc565b5090565b5b8082111561184e57600081816118459190611a33565b5060010161182f565b5090565b82805461185e9061302c565b90600052602060002090601f01602090048101928261188057600085556118c7565b82601f1061189957805160ff19168380011785556118c7565b828001600101855582156118c7579182015b828111156118c65782518255916020019190600101906118ab565b5b5090506118d491906118fc565b5090565b5b808211156118f857600081816118ef9190611a73565b506001016118d9565b5090565b5b808211156119155760008160009055506001016118fd565b5090565b8280546119259061302c565b90600052602060002090601f0160209004810192826119475760008555611995565b82601f106119585780548555611995565b8280016001018555821561199557600052602060002091601f016020900482015b82811115611994578254825591600101919060010190611979565b5b5090506119a291906118fc565b5090565b8280546119b29061302c565b90600052602060002090601f0160209004810192826119d45760008555611a22565b82601f106119e55780548555611a22565b82800160010185558215611a2257600052602060002091601f016020900482015b82811115611a21578254825591600101919060010190611a06565b5b509050611a2f91906118fc565b5090565b508054611a3f9061302c565b6000825580601f10611a515750611a70565b601f016020900490600052602060002090810190611a6f91906118fc565b5b50565b508054611a7f9061302c565b6000825580601f10611a915750611ab0565b601f016020900490600052602060002090810190611aaf91906118fc565b5b50565b6000611ac6611ac184612c8e565b612c69565b90508083825260208201905082856020860282011115611ae957611ae8613193565b5b60005b85811015611b3757813567ffffffffffffffff811115611b0f57611b0e61317f565b5b808601611b1c8982611d82565b85526020850194506020840193505050600181019050611aec565b5050509392505050565b6000611b54611b4f84612cba565b612c69565b90508083825260208201905082856020860282011115611b7757611b76613193565b5b60005b85811015611bc557813567ffffffffffffffff811115611b9d57611b9c61317f565b5b808601611baa8982611dc5565b85526020850194506020840193505050600181019050611b7a565b5050509392505050565b6000611be2611bdd84612ce6565b612c69565b90508083825260208201905082856020860282011115611c0557611c04613193565b5b60005b85811015611c355781611c1b8882611fa7565b845260208401935060208301925050600181019050611c08565b5050509392505050565b6000611c52611c4d84612d12565b612c69565b905082815260208101848484011115611c6e57611c6d613198565b5b611c79848285612fea565b509392505050565b6000611c94611c8f84612d43565b612c69565b905082815260208101848484011115611cb057611caf613198565b5b611cbb848285612fea565b509392505050565b600081359050611cd2816131c5565b611cdb81612f6d565b905092915050565b600082601f830112611cf857611cf761317f565b5b8135611d08848260208601611ab3565b91505092915050565b600082601f830112611d2657611d2561317f565b5b8135611d36848260208601611b41565b91505092915050565b600082601f830112611d5457611d5361317f565b5b8135611d64848260208601611bcf565b91505092915050565b600081359050611d7c816131dc565b92915050565b600082601f830112611d9757611d9661317f565b5b8135611da7848260208601611c3f565b91505092915050565b600081359050611dbf816131f3565b92915050565b600082601f830112611dda57611dd961317f565b5b8135611dea848260208601611c81565b91505092915050565b600060808284031215611e0957611e08613189565b5b611e136080612c69565b90506000611e2384828501611ea6565b600083015250602082013567ffffffffffffffff811115611e4757611e4661318e565b5b611e5384828501611d3f565b6020830152506040611e6784828501611cc3565b6040830152506060611e7b84828501611f92565b60608301525092915050565b600060208284031215611e9d57611e9c613184565b5b81905092915050565b600060208284031215611ebc57611ebb613189565b5b611ec66020612c69565b90506000611ed684828501611fa7565b60008301525092915050565b600060208284031215611ef857611ef7613189565b5b611f026020612c69565b9050600082013567ffffffffffffffff811115611f2257611f2161318e565b5b611f2e84828501611df3565b60008301525092915050565b600060208284031215611f5057611f4f613189565b5b611f5a6020612c69565b9050600082013567ffffffffffffffff811115611f7a57611f7961318e565b5b611f8684828501611ee2565b60008301525092915050565b600081359050611fa18161320a565b92915050565b600081359050611fb681613221565b92915050565b600060208284031215611fd257611fd16131a2565b5b600082013567ffffffffffffffff811115611ff057611fef61319d565b5b611ffc84828501611ce3565b91505092915050565b60006020828403121561201b5761201a6131a2565b5b600082013567ffffffffffffffff8111156120395761203861319d565b5b61204584828501611d11565b91505092915050565b600060208284031215612064576120636131a2565b5b600061207284828501611d6d565b91505092915050565b600060208284031215612091576120906131a2565b5b600061209f84828501611db0565b91505092915050565b600080604083850312156120bf576120be6131a2565b5b60006120cd85828601611e87565b92505060206120de85828601611e87565b9150509250929050565b6000602082840312156120fe576120fd6131a2565b5b600061210c84828501611fa7565b91505092915050565b600080600080600080600080610100898b031215612136576121356131a2565b5b60006121448b828c01611fa7565b985050602089013567ffffffffffffffff8111156121655761216461319d565b5b6121718b828c01611d11565b97505060406121828b828c01611fa7565b965050606089013567ffffffffffffffff8111156121a3576121a261319d565b5b6121af8b828c01611ce3565b95505060806121c08b828c01611ea6565b94505060a089013567ffffffffffffffff8111156121e1576121e061319d565b5b6121ed8b828c01611d3f565b93505060c06121fe8b828c01611cc3565b92505060e061220f8b828c01611f92565b9150509295985092959890939650565b600080600080600060a0868803121561223b5761223a6131a2565b5b600061224988828901611fa7565b955050602086013567ffffffffffffffff81111561226a5761226961319d565b5b61227688828901611d11565b945050604061228788828901611fa7565b935050606086013567ffffffffffffffff8111156122a8576122a761319d565b5b6122b488828901611ce3565b925050608086013567ffffffffffffffff8111156122d5576122d461319d565b5b6122e188828901611ee2565b9150509295509295909350565b600080600080600060a0868803121561230a576123096131a2565b5b600061231888828901611fa7565b955050602086013567ffffffffffffffff8111156123395761233861319d565b5b61234588828901611d11565b945050604061235688828901611fa7565b935050606086013567ffffffffffffffff8111156123775761237661319d565b5b61238388828901611ce3565b925050608086013567ffffffffffffffff8111156123a4576123a361319d565b5b6123b088828901611f3a565b9150509295509295909350565b600080604083850312156123d4576123d36131a2565b5b60006123e285828601611fa7565b92505060206123f385828601611fa7565b9150509250929050565b6000612409838361279e565b905092915050565b600061241d8383612810565b905092915050565b6000612431838361289f565b905092915050565b60006124458383612911565b905092915050565b60006124598383612991565b60208301905092915050565b600061247183836129c9565b60208301905092915050565b60006124898383612a01565b60208301905092915050565b61249e81612f6d565b82525050565b60006124af82612e1d565b6124b98185612edb565b9350836020820285016124cb85612d74565b8060005b8581101561250757848403895281516124e885826123fd565b94506124f383612e80565b925060208a019950506001810190506124cf565b50829750879550505050505092915050565b600061252482612e28565b61252e8185612edb565b93508360208202850161254085612d84565b8060005b8581101561257b5784840389528161255c8582612411565b945061256783612e8d565b925060208a01995050600181019050612544565b50829750879550505050505092915050565b600061259882612e33565b6125a28185612eec565b9350836020820285016125b485612d99565b8060005b858110156125f057848403895281516125d18582612425565b94506125dc83612e9a565b925060208a019950506001810190506125b8565b50829750879550505050505092915050565b600061260d82612e3e565b6126178185612eec565b93508360208202850161262985612da9565b8060005b85811015612664578484038952816126458582612439565b945061265083612ea7565b925060208a0199505060018101905061262d565b50829750879550505050505092915050565b600061268182612e49565b61268b8185612efd565b935061269683612dbe565b8060005b838110156126c75781516126ae888261244d565b97506126b983612eb4565b92505060018101905061269a565b5085935050505092915050565b60006126df82612e54565b6126e98185612efd565b93506126f483612dce565b8060005b83811015612724578161270b8882612465565b975061271683612ec1565b9250506001810190506126f8565b5085935050505092915050565b600061273c82612e5f565b6127468185612f0e565b935061275183612de3565b8060005b83811015612782578151612769888261247d565b975061277483612ece565b925050600181019050612755565b5085935050505092915050565b61279881612f7f565b82525050565b60006127a982612e6a565b6127b38185612f1f565b93506127c3818560208601612ff9565b6127cc816131a7565b840191505092915050565b60006127e282612e6a565b6127ec8185612f30565b93506127fc818560208601612ff9565b612805816131a7565b840191505092915050565b6000815461281d8161302c565b6128278186612f1f565b94506001821660008114612842576001811461285457612887565b60ff1983168652602086019350612887565b61285d85612df3565b60005b8381101561287f57815481890152600182019150602081019050612860565b808801955050505b50505092915050565b61289981612f8b565b82525050565b60006128aa82612e75565b6128b48185612f41565b93506128c4818560208601612ff9565b6128cd816131a7565b840191505092915050565b60006128e382612e75565b6128ed8185612f52565b93506128fd818560208601612ff9565b612906816131a7565b840191505092915050565b6000815461291e8161302c565b6129288186612f41565b94506001821660008114612943576001811461295557612988565b60ff1983168652602086019350612988565b61295e85612e08565b60005b8381101561298057815481890152600182019150602081019050612961565b808801955050505b50505092915050565b6020820160008201516129a76000850182612a01565b50505050565b6020820160008201516129c36000850182612a01565b50505050565b6020820160008083015490506129de8161305e565b6129eb6000860182612a01565b5050505050565b6129fb81612f95565b82525050565b612a0a81612fe0565b82525050565b612a1981612fe0565b82525050565b6000602082019050612a346000830184612495565b92915050565b60006020820190508181036000830152612a5481846124a4565b905092915050565b60006020820190508181036000830152612a768184612519565b905092915050565b60006020820190508181036000830152612a98818461258d565b905092915050565b60006020820190508181036000830152612aba8184612602565b905092915050565b60006020820190508181036000830152612adc8184612676565b905092915050565b60006020820190508181036000830152612afe81846126d4565b905092915050565b6000602082019050612b1b600083018461278f565b92915050565b60006020820190508181036000830152612b3b81846127d7565b905092915050565b6000602082019050612b586000830184612890565b92915050565b60006020820190508181036000830152612b7881846128d8565b905092915050565b6000606082019050612b9560008301866129ad565b612ba26020830185612495565b612baf60408301846129f2565b949350505050565b6000602082019050612bcc60008301846129f2565b92915050565b6000606082019050612be760008301866129f2565b612bf46020830185612495565b8181036040830152612c068184612731565b9050949350505050565b6000602082019050612c256000830184612a10565b92915050565b6000606082019050612c406000830186612a10565b612c4d6020830185612495565b8181036040830152612c5f8184612731565b9050949350505050565b6000612c73612c84565b9050612c7f8282613078565b919050565b6000604051905090565b600067ffffffffffffffff821115612ca957612ca8613150565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612cd557612cd4613150565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612d0157612d00613150565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612d2d57612d2c613150565b5b612d36826131a7565b9050602081019050919050565b600067ffffffffffffffff821115612d5e57612d5d613150565b5b612d67826131a7565b9050602081019050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000819050919050565b6000612f7882612f9f565b9050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015613017578082015181840152602081019050612ffc565b83811115613026576000848401525b50505050565b6000600282049050600182168061304457607f821691505b6020821081141561305857613057613121565b5b50919050565b600061307161306c836131b8565b612f63565b9050919050565b613081826131a7565b810181811067ffffffffffffffff821117156130a05761309f613150565b5b80604052505050565b60006130b482612fe0565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156130e7576130e66130f2565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b6131ce81612fbf565b81146131d957600080fd5b50565b6131e581612f7f565b81146131f057600080fd5b50565b6131fc81612f8b565b811461320757600080fd5b50565b61321381612f95565b811461321e57600080fd5b50565b61322a81612fe0565b811461323557600080fd5b5056fea26474726f6e5822122009560de55eed27318074a66d858bf2cedabf5df1a46ad755f7ae15e22eea867a64736f6c63430008060033",
    },
    abiV2Test2: {
        contractName: "SaiValuesAggregator",
        abi:[
            {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "sin",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "skr",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "gov",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "tub",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "lad",
                    "type": "address"
                }, {
                    "name": "safe",
                    "type": "bool"
                }, {
                    "name": "r",
                    "type": "uint256[]"
                }],
                "constant": true,
                "inputs": [{
                    "name": "cup",
                    "type": "bytes32"
                }],
                "name": "aggregateCDPValues",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "vox",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "gem",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "sai",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "pipVal",
                    "type": "bytes32"
                }, {
                    "name": "pipSet",
                    "type": "bool"
                }, {
                    "name": "pepVal",
                    "type": "bytes32"
                }, {
                    "name": "pepSet",
                    "type": "bool"
                }, {
                    "name": "sStatus",
                    "type": "bool[]"
                }, {
                    "name": "sValues",
                    "type": "uint256[]"
                }, {
                    "name": "tValues",
                    "type": "uint256[]"
                }],
                "constant": true,
                "inputs": [{
                    "name": "addr",
                    "type": "address"
                }, {
                    "name": "proxy",
                    "type": "address"
                }],
                "name": "aggregateValues",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "name": "blockNumber",
                    "type": "uint256"
                }, {
                    "name": "saiContracts",
                    "type": "address[]"
                }, {
                    "name": "proxy",
                    "type": "address"
                }],
                "constant": true,
                "inputs": [{
                    "name": "proxyRegistry",
                    "type": "address"
                }, {
                    "name": "addr",
                    "type": "address"
                }],
                "name": "getContractsAddrs",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pep",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pip",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "pit",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "tap",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "outputs": [{
                    "type": "address"
                }],
                "constant": true,
                "name": "top",
                "stateMutability": "View",
                "type": "Function"
            }, {
                "inputs": [{
                    "name": "_top",
                    "type": "address"
                }],
                "stateMutability": "Nonpayable",
                "type": "Constructor"
            }
        ],
        bytecode:
    "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516020806200355c833981016040525160008054600160a060020a03909216600160a060020a03199092169190911790556134ee806200006e6000396000f3006080604052600436106100c15763ffffffff60e060020a600035041663071bafb581146100c65780630f8a771e1461011157806312d43a511461014057806334e70cc21461016f5780633fdb36281461019e57806367550a351461024f5780637bd2bea71461027e5780639166cba4146102ad5780639f184dd5146102dc578063a47b1a6c1461042c578063ace237f5146104e1578063d741e2f914610510578063f03c7c6e1461053f578063fd2210311461056e578063fe6dcdba1461059d575b600080fd5b3480156100d257600080fd5b50d380156100df57600080fd5b50d280156100ec57600080fd5b506100f56105cc565b60408051600160a060020a039092168252519081900360200190f35b34801561011d57600080fd5b50d3801561012a57600080fd5b50d2801561013757600080fd5b506100f5610644565b34801561014c57600080fd5b50d3801561015957600080fd5b50d2801561016657600080fd5b506100f561068b565b34801561017b57600080fd5b50d3801561018857600080fd5b50d2801561019557600080fd5b506100f56106d2565b3480156101aa57600080fd5b50d380156101b757600080fd5b50d280156101c457600080fd5b506101d0600435610726565b6040518085815260200184600160a060020a0316600160a060020a031681526020018315151515815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015610238578181015183820152602001610220565b505050509050019550505050505060405180910390f35b34801561025b57600080fd5b50d3801561026857600080fd5b50d2801561027557600080fd5b506100f56112d4565b34801561028a57600080fd5b50d3801561029757600080fd5b50d280156102a457600080fd5b506100f561131b565b3480156102b957600080fd5b50d380156102c657600080fd5b50d280156102d357600080fd5b506100f5611362565b3480156102e857600080fd5b50d380156102f557600080fd5b50d2801561030257600080fd5b5061031d600160a060020a03600435811690602435166113a9565b6040805189815260208082018a90528815159282019290925260608101879052851515608082015261010060a0820181815286519183019190915285519192909160c084019160e0850191610120860191898101910280838360005b83811015610391578181015183820152602001610379565b50505050905001848103835286818151815260200191508051906020019060200280838360005b838110156103d05781810151838201526020016103b8565b50505050905001848103825285818151815260200191508051906020019060200280838360005b8381101561040f5781810151838201526020016103f7565b505050509050019b50505050505050505050505060405180910390f35b34801561043857600080fd5b50d3801561044557600080fd5b50d2801561045257600080fd5b5061046d600160a060020a0360043581169060243516612e10565b604051808481526020018060200183600160a060020a0316600160a060020a03168152602001828103825284818151815260200191508051906020019060200280838360005b838110156104cb5781810151838201526020016104b3565b5050505090500194505050505060405180910390f35b3480156104ed57600080fd5b50d380156104fa57600080fd5b50d2801561050757600080fd5b506100f5613197565b34801561051c57600080fd5b50d3801561052957600080fd5b50d2801561053657600080fd5b506100f56131de565b34801561054b57600080fd5b50d3801561055857600080fd5b50d2801561056557600080fd5b506100f5613225565b34801561057a57600080fd5b50d3801561058757600080fd5b50d2801561059457600080fd5b506100f561326c565b3480156105a957600080fd5b50d380156105b657600080fd5b50d280156105c357600080fd5b506100f56132c0565b60006105d66106d2565b600160a060020a031663071bafb56040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b505af1158015610627573d6000803e3d6000fd5b505050506040513d602081101561063d57600080fd5b5051905090565b600061064e6106d2565b600160a060020a0316630f8a771e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006106956106d2565b600160a060020a03166312d43a516040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60008060009054906101000a9004600160a060020a0316600160a060020a03166334e70cc26040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b6040805160088082526101208201909252439160009182916060918391829182918291829160208201610100803883390190505095506107646106d2565b945061076e6112d4565b604080517ffdac0025000000000000000000000000000000000000000000000000000000008152600481018d90529051919550600160a060020a0387169163fdac0025916024808201926080929091908290030181600087803b1580156107d457600080fd5b505af11580156107e8573d6000803e3d6000fd5b505050506040513d60808110156107fe57600080fd5b508051602082015160408301516060909301518951929391928a90600090811061082457fe5b9060200190602002018a600181518110151561083c57fe5b9060200190602002018b600281518110151561085457fe5b60209081029091010192909252919052529750600160a060020a038816156112c857604080517fe95823ad000000000000000000000000000000000000000000000000000000008152600481018c90529051600160a060020a0387169163e95823ad9160248083019260209291908290030181600087803b1580156108d857600080fd5b505af11580156108ec573d6000803e3d6000fd5b505050506040513d602081101561090257600080fd5b5051604080517f51f9106600000000000000000000000000000000000000000000000000000000815290519198506109b091600160a060020a038816916351f910669160048083019260209291908290030181600087803b15801561096657600080fd5b505af115801561097a573d6000803e3d6000fd5b505050506040513d602081101561099057600080fd5b50518751889060009081106109a157fe5b906020019060200201516132cf565b604080517ff7c8d634000000000000000000000000000000000000000000000000000000008152600481018d90529051919450600160a060020a0387169163f7c8d634916024808201926020929091908290030181600087803b158015610a1657600080fd5b505af1158015610a2a573d6000803e3d6000fd5b505050506040513d6020811015610a4057600080fd5b5051604080517f495d32cb0000000000000000000000000000000000000000000000000000000081529051919350600091600160a060020a0387169163495d32cb91600480830192602092919082900301818787803b158015610aa257600080fd5b505af1158015610ab6573d6000803e3d6000fd5b505050506040513d6020811015610acc57600080fd5b5051118015610adb5750600082115b610ae6576000610bed565b610bed83610be886600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610b2b57600080fd5b505af1158015610b3f573d6000803e3d6000fd5b505050506040513d6020811015610b5557600080fd5b810190808051906020019092919050505088600160a060020a031663f7c8d6348f6040518263ffffffff1660e060020a028152600401808260001916600019168152602001915050602060405180830381600087803b158015610bb757600080fd5b505af1158015610bcb573d6000803e3d6000fd5b505050506040513d6020811015610be157600080fd5b50516132cf565b613312565b866003815181101515610bfc57fe5b60209081029091010152868015610c7c5750600085600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610c4e57600080fd5b505af1158015610c62573d6000803e3d6000fd5b505050506040513d6020811015610c7857600080fd5b5051115b8015610cf15750600084600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610cc357600080fd5b505af1158015610cd7573d6000803e3d6000fd5b505050506040513d6020811015610ced57600080fd5b5051115b610cfc576000610e63565b610e63610dd084610dcb88600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610d4457600080fd5b505af1158015610d58573d6000803e3d6000fd5b505050506040513d6020811015610d6e57600080fd5b5051604080517f495d32cb0000000000000000000000000000000000000000000000000000000081529051600160a060020a038b169163495d32cb9160048083019260209291908290030181600087803b158015610bb757600080fd5b613332565b604080517ff7c8d634000000000000000000000000000000000000000000000000000000008152600481018e90529051600160a060020a0389169163f7c8d6349160248083019260209291908290030181600087803b158015610e3257600080fd5b505af1158015610e46573d6000803e3d6000fd5b505050506040513d6020811015610e5c57600080fd5b505161334e565b866004815181101515610e7257fe5b9060200190602002018181525050600085600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610ec057600080fd5b505af1158015610ed4573d6000803e3d6000fd5b505050506040513d6020811015610eea57600080fd5b505111610ef8576000610fed565b610fed610f7e610f408488600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b86600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b86600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610fbc57600080fd5b505af1158015610fd0573d6000803e3d6000fd5b505050506040513d6020811015610fe657600080fd5b5051613332565b905086610ffb57600061114a565b600086600181518110151561100c57fe5b90602001906020020151116110395785600081518110151561102a57fe5b9060200190602002015161114a565b6000811161104857600061114a565b61114a86600081518110151561105a57fe5b9060200190602002015186600160a060020a031663f000c1bb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156110a257600080fd5b505af11580156110b6573d6000803e3d6000fd5b505050506040513d60208110156110cc57600080fd5b505183116111435786600160a060020a031663f000c1bb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561111257600080fd5b505af1158015611126573d6000803e3d6000fd5b505050506040513d602081101561113c57600080fd5b5051611145565b825b61334e565b86600581518110151561115957fe5b6020908102909101015285516111be908790600590811061117657fe5b9060200190602002015186600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b8660068151811015156111cd57fe5b6020908102909101015285516000908790829081106111e857fe5b906020019060200201511180156111ff5750600082115b61120a5760006112ae565b6112ae6112906112528488600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b87600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610fbc57600080fd5b87600081518110151561129f57fe5b90602001906020020151613312565b8660078151811015156112bd57fe5b602090810290910101525b50505050509193509193565b60006112de6106d2565b600160a060020a03166367550a356040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006113256106d2565b600160a060020a0316637bd2bea76040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600061136c6106d2565b600160a060020a0316639166cba46040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b43600080808060608080836113bc6131de565b600160a060020a03166359e02dd76040518163ffffffff1660e060020a0281526004016040805180830381600087803b1580156113f857600080fd5b505af115801561140c573d6000803e3d6000fd5b505050506040513d604081101561142257600080fd5b5080516020909101519098509650611438613197565b600160a060020a03166359e02dd76040518163ffffffff1660e060020a0281526004016040805180830381600087803b15801561147457600080fd5b505af1158015611488573d6000803e3d6000fd5b505050506040513d604081101561149e57600080fd5b50805160209182015160408051600480825260a08201909252929950909750909182016080803883390190505093506114d56106d2565b600160a060020a0316636626b26d6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561151257600080fd5b505af1158015611526573d6000803e3d6000fd5b505050506040513d602081101561153c57600080fd5b505184518590600090811061154d57fe5b9115156020928302909101909101526115646106d2565b600160a060020a031663b2a1449b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156115a157600080fd5b505af11580156115b5573d6000803e3d6000fd5b505050506040513d60208110156115cb57600080fd5b50518451859060019081106115dc57fe5b9115156020928302909101909101526116c86115f6610644565b600160a060020a03166370a0823161160c6106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561165757600080fd5b505af115801561166b573d6000803e3d6000fd5b505050506040513d602081101561168157600080fd5b505161168b6106d2565b600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b90506116d26105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561170f57600080fd5b505af1158015611723573d6000803e3d6000fd5b505050506040513d602081101561173957600080fd5b50518451908210908590600290811061174e57fe5b9115156020928302909101909101526118166117686105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156117a557600080fd5b505af11580156117b9573d6000803e3d6000fd5b505050506040513d60208110156117cf57600080fd5b50516117d96106d2565b600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610bb757600080fd5b81101584600381518110151561182857fe5b9115156020928302919091018201526040805160138082526102808201909252918201610260803883390190505092506118606106d2565b600160a060020a031663509bf2bf6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561189d57600080fd5b505af11580156118b1573d6000803e3d6000fd5b505050506040513d60208110156118c757600080fd5b50518351849060009081106118d857fe5b602090810290910101526118ea6106d2565b600160a060020a031663ab0783da6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561192757600080fd5b505af115801561193b573d6000803e3d6000fd5b505050506040513d602081101561195157600080fd5b505183518490600190811061196257fe5b602090810290910101526119746106d2565b600160a060020a031663355274ea6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156119b157600080fd5b505af11580156119c5573d6000803e3d6000fd5b505050506040513d60208110156119db57600080fd5b50518351849060029081106119ec57fe5b602090810290910101526119fe6106d2565b600160a060020a031663c8e13bb46040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611a3b57600080fd5b505af1158015611a4f573d6000803e3d6000fd5b505050506040513d6020811015611a6557600080fd5b5051835184906003908110611a7657fe5b60209081029091010152611a886106d2565b600160a060020a03166399c8d5566040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611ac557600080fd5b505af1158015611ad9573d6000803e3d6000fd5b505050506040513d6020811015611aef57600080fd5b5051835184906004908110611b0057fe5b60209081029091010152611b126106d2565b600160a060020a031663ddca3f436040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611b4f57600080fd5b505af1158015611b63573d6000803e3d6000fd5b505050506040513d6020811015611b7957600080fd5b5051835184906005908110611b8a57fe5b60209081029091010152611b9c6106d2565b600160a060020a031663c92aecc46040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611bd957600080fd5b505af1158015611bed573d6000803e3d6000fd5b505050506040513d6020811015611c0357600080fd5b5051835184906006908110611c1457fe5b60209081029091010152611c266106d2565b600160a060020a031663338a02616040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611c6357600080fd5b505af1158015611c77573d6000803e3d6000fd5b505050506040513d6020811015611c8d57600080fd5b5051835184906007908110611c9e57fe5b60209081029091010152611cb06106d2565b600160a060020a03166320aba08b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611ced57600080fd5b505af1158015611d01573d6000803e3d6000fd5b505050506040513d6020811015611d1757600080fd5b5051835184906008908110611d2857fe5b60209081029091010152611d3a6106d2565b600160a060020a0316636c32c0a66040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611d7757600080fd5b505af1158015611d8b573d6000803e3d6000fd5b505050506040513d6020811015611da157600080fd5b5051835184906009908110611db257fe5b60209081029091010152611dc46106d2565b600160a060020a03166351f910666040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611e0157600080fd5b505af1158015611e15573d6000803e3d6000fd5b505050506040513d6020811015611e2b57600080fd5b505183518490600a908110611e3c57fe5b60209081029091010152611e4e6106d2565b600160a060020a0316637ec9c3b86040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611e8b57600080fd5b505af1158015611e9f573d6000803e3d6000fd5b505050506040513d6020811015611eb557600080fd5b505183518490600b908110611ec657fe5b60209081029091010152611ed86112d4565b600160a060020a031663495d32cb6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611f1557600080fd5b505af1158015611f29573d6000803e3d6000fd5b505050506040513d6020811015611f3f57600080fd5b505183518490600c908110611f5057fe5b60209081029091010152611f626112d4565b600160a060020a0316635d6542af6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015611f9f57600080fd5b505af1158015611fb3573d6000803e3d6000fd5b505050506040513d6020811015611fc957600080fd5b505183518490600d908110611fda57fe5b60209081029091010152611fec6112d4565b600160a060020a031663143e55e06040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561202957600080fd5b505af115801561203d573d6000803e3d6000fd5b505050506040513d602081101561205357600080fd5b505183518490600e90811061206457fe5b6020908102909101015261207661326c565b600160a060020a031663a551878e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156120b357600080fd5b505af11580156120c7573d6000803e3d6000fd5b505050506040513d60208110156120dd57600080fd5b505183518490600f9081106120ee57fe5b6020908102909101015261210061326c565b600160a060020a0316636c32c0a66040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561213d57600080fd5b505af1158015612151573d6000803e3d6000fd5b505050506040513d602081101561216757600080fd5b505183518490601090811061217857fe5b602090810290910101526040805160148082526102a08201909252908160200160208202803883390190505091508a600160a060020a0316318260008151811015156121c057fe5b602090810290910101526121d261131b565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561220f57600080fd5b505af1158015612223573d6000803e3d6000fd5b505050506040513d602081101561223957600080fd5b505182518390600190811061224a57fe5b6020908102909101015261225c61131b565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156122b657600080fd5b505af11580156122ca573d6000803e3d6000fd5b505050506040513d60208110156122e057600080fd5b50518251839060029081106122f157fe5b6020908102909101015261230361131b565b600160a060020a03166370a082316123196106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561236457600080fd5b505af1158015612378573d6000803e3d6000fd5b505050506040513d602081101561238e57600080fd5b505182518390600390811061239f57fe5b602090810290910101526123b161131b565b600160a060020a03166370a082316123c761326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561241257600080fd5b505af1158015612426573d6000803e3d6000fd5b505050506040513d602081101561243c57600080fd5b505182518390600490811061244d57fe5b6020908102909101015261245f61068b565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561249c57600080fd5b505af11580156124b0573d6000803e3d6000fd5b505050506040513d60208110156124c657600080fd5b50518251839060059081106124d757fe5b602090810290910101526124e961068b565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561254357600080fd5b505af1158015612557573d6000803e3d6000fd5b505050506040513d602081101561256d57600080fd5b505182518390600690811061257e57fe5b6020908102909101015261259061068b565b600160a060020a03166370a082316125a6613225565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156125f157600080fd5b505af1158015612605573d6000803e3d6000fd5b505050506040513d602081101561261b57600080fd5b505182518390600790811061262c57fe5b6020908102909101015261263e61068b565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152600160a060020a038e811660048301528d811660248301529151929091169163dd62ed3e916044808201926020929091908290030181600087803b1580156126ac57600080fd5b505af11580156126c0573d6000803e3d6000fd5b505050506040513d60208110156126d657600080fd5b50518251839060089081106126e757fe5b602090810290910101526126f9610644565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561273657600080fd5b505af115801561274a573d6000803e3d6000fd5b505050506040513d602081101561276057600080fd5b505182518390600990811061277157fe5b60209081029091010152612783610644565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b1580156127dd57600080fd5b505af11580156127f1573d6000803e3d6000fd5b505050506040513d602081101561280757600080fd5b505182518390600a90811061281857fe5b6020908102909101015261282a610644565b600160a060020a03166370a082316128406106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561288b57600080fd5b505af115801561289f573d6000803e3d6000fd5b505050506040513d60208110156128b557600080fd5b505182518390600b9081106128c657fe5b602090810290910101526128d8610644565b600160a060020a03166370a082316128ee61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561293957600080fd5b505af115801561294d573d6000803e3d6000fd5b505050506040513d602081101561296357600080fd5b505182518390600c90811061297457fe5b60209081029091010152612986611362565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b1580156129c357600080fd5b505af11580156129d7573d6000803e3d6000fd5b505050506040513d60208110156129ed57600080fd5b505182518390600d9081106129fe57fe5b60209081029091010152612a10611362565b600160a060020a03166370a082318c6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612a6a57600080fd5b505af1158015612a7e573d6000803e3d6000fd5b505050506040513d6020811015612a9457600080fd5b505182518390600e908110612aa557fe5b60209081029091010152612ab7611362565b600160a060020a03166370a08231612acd61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612b1857600080fd5b505af1158015612b2c573d6000803e3d6000fd5b505050506040513d6020811015612b4257600080fd5b505182518390600f908110612b5357fe5b60209081029091010152612b65611362565b604080517fdd62ed3e000000000000000000000000000000000000000000000000000000008152600160a060020a038e811660048301528d811660248301529151929091169163dd62ed3e916044808201926020929091908290030181600087803b158015612bd357600080fd5b505af1158015612be7573d6000803e3d6000fd5b505050506040513d6020811015612bfd57600080fd5b5051825183906010908110612c0e57fe5b60209081029091010152612c206105cc565b600160a060020a03166318160ddd6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015612c5d57600080fd5b505af1158015612c71573d6000803e3d6000fd5b505050506040513d6020811015612c8757600080fd5b5051825183906011908110612c9857fe5b60209081029091010152612caa6105cc565b600160a060020a03166370a08231612cc06106d2565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612d0b57600080fd5b505af1158015612d1f573d6000803e3d6000fd5b505050506040513d6020811015612d3557600080fd5b5051825183906012908110612d4657fe5b60209081029091010152612d586105cc565b600160a060020a03166370a08231612d6e61326c565b6040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015612db957600080fd5b505af1158015612dcd573d6000803e3d6000fd5b505050506040513d6020811015612de357600080fd5b5051825183906013908110612df457fe5b9060200190602002018181525050509295985092959890939650565b60408051600c8082526101a08201909252439160609160009160208201610180803883395050600080548351939550600160a060020a0316928592508110612e5457fe5b600160a060020a03909216602092830290910190910152612e736106d2565b826001815181101515612e8257fe5b600160a060020a03909216602092830290910190910152612ea161326c565b826002815181101515612eb057fe5b600160a060020a03909216602092830290910190910152612ecf6112d4565b826003815181101515612ede57fe5b600160a060020a03909216602092830290910190910152612efd613225565b826004815181101515612f0c57fe5b600160a060020a03909216602092830290910190910152612f2b6131de565b826005815181101515612f3a57fe5b600160a060020a03909216602092830290910190910152612f59613197565b826006815181101515612f6857fe5b600160a060020a03909216602092830290910190910152612f8761131b565b826007815181101515612f9657fe5b600160a060020a03909216602092830290910190910152612fb561068b565b826008815181101515612fc457fe5b600160a060020a03909216602092830290910190910152612fe3610644565b826009815181101515612ff257fe5b600160a060020a03909216602092830290910190910152613011611362565b82600a81518110151561302057fe5b600160a060020a0390921660209283029091019091015261303f6105cc565b82600b81518110151561304e57fe5b600160a060020a039283166020918202909201810191909152604080517fc4552791000000000000000000000000000000000000000000000000000000008152878416600482015290519288169263c4552791926024808401939192918290030181600087803b1580156130c157600080fd5b505af11580156130d5573d6000803e3d6000fd5b505050506040513d60208110156130eb57600080fd5b50519050600160a060020a03811615801590613181575083600160a060020a031681600160a060020a0316638da5cb5b6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561314a57600080fd5b505af115801561315e573d6000803e3d6000fd5b505050506040513d602081101561317457600080fd5b5051600160a060020a0316145b61318c57600061318e565b805b90509250925092565b60006131a16106d2565b600160a060020a031663ace237f56040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60006131e86106d2565b600160a060020a031663d741e2f96040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600061322f6106d2565b600160a060020a031663f03c7c6e6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b60008060009054906101000a9004600160a060020a0316600160a060020a031663fd2210316040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561061357600080fd5b600054600160a060020a031681565b60006b033b2e3c9fd0803ce80000006133016132eb85856133c6565b60026b033b2e3c9fd0803ce80000005b04613450565b81151561330a57fe5b049392505050565b60008161330161332a85670de0b6b3a76400006133c6565b6002856132fb565b60008161330161332a856b033b2e3c9fd0803ce80000006133c6565b808203828111156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b92915050565b60008115806133e35750508082028282828115156133e057fe5b04145b15156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b808201828110156133c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd00a165627a7a72305820ac5fab73cd78e020005cb35dc1cb004506054df66bbfd35dc7640dcee1e8f976002900000000000000000000004166b807a4f17d984b163438c9b0f9243c54650c87",
},
    funcContractTypesCall: {
//         pragma experimental ABIEncoderV2;
// contract contractTypesCall {
//     bool stopped = false;
//     int i = 32482989;
//     int i2 = - 32482989;
//     uint ui = 23487823;
//     address origin = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
//     bytes32 b32 = bytes32(uint256(0xdCad3a6d3569DF655070DEd0));
//     bytes bs = new bytes(3);
//     string s = "123qwe";
// enum ActionChoices {GoLeft, GoRight, GoStraight, SitStill}
//     ActionChoices choice = ActionChoices.GoRight;
//     int64[] b = [- 1, 2, - 3];
//     uint32[2][] tmp_h = [[1, 2], [3, 4], [5, 6]];
//     uint256[2][2] tmp_i = [[11, 22], [33, 44]];
//     mapping(address => uint256) public mapa;
//     mapping(uint => string[]) public map1;
//     mapping(uint => bytes[]) public map2;
//
//     trcToken tokens = 1000002;
//     string[] strs = ["1","2","3"];
//     bytes[] bys;
//
//     event log(int);
//     event log(uint);
//     event log(bool);
//     event log(address);
//     event log(bytes32);
//     event log(bytes);
//     event log(string);
//     event log(ActionChoices);
//     event log(int64[]);
//     event log(uint32[2][]);
//     event log(uint256[2][2]);
//     event log(bytes[]);
//     event log(string[]);
//
//     constructor(address addr,trcToken token,string[] memory strs,bytes[] memory bys) payable public{
//         origin=addr;
//         token=token;
//         strs=strs;
//         bys=bys;
//     }
//
//     function changeInt(int param) public returns (int){
//         i = param;
//         emit log(i);
//         return i;
//     }
//
//     function getInt() public view returns (int){
//         return i;
//     }
//
//     function changeNegativeInt(int param) public returns (int){
//         i2 = param;
//         emit log(i2);
//         return i2;
//     }
//
//     function getNegativeInt() public view returns (int){
//         return i2;
//     }
//
//     function changeUint(uint param) public returns (uint){
//         ui = param;
//         emit log(ui);
//         return ui;
//     }
//
//     function getUint() public view returns (uint){
//         return ui;
//     }
//
//     function changeAddress(address param) public returns (address){
//         origin = param;
//         emit log(origin);
//         return origin;
//     }
//
//     function getAddress() public view returns (address){
//         return origin;
//     }
//
//     function changeBytes32(bytes32 param) public returns (bytes32){
//         b32 = param;
//         emit log(b32);
//         return b32;
//     }
//
//     function getBytes32() public view returns (bytes32){
//         return b32;
//     }
//
//     function changeBytes(bytes memory param) public returns (bytes memory){
//         bs = param;
//         emit log(bs);
//         return bs;
//     }
//
//     function getBytes() public view returns (bytes memory){
//         return bs;
//     }
//
//     function changeString(string memory param) public returns (string memory){
//         s = param;
//         emit log(s);
//         return s;
//     }
//
//     function getString() public view returns (string memory){
//         return s;
//     }
//
//     function changeActionChoices(ActionChoices param) public returns (ActionChoices){
//         choice = param;
//         emit log(choice);
//         return choice;
//     }
//
//     function getActionChoices() public view returns (ActionChoices){
//         return choice;
//     }
//
//     function changeInt64NegativeArray(int64[] memory param) public returns (int64[] memory){
//         b = param;
//         emit log(b);
//         return b;
//     }
//
//     function getInt64NegativeArray() public view returns (int64[] memory){
//         return b;
//     }
//
//     function changeInt32Array(uint32[2][] memory param) public returns (uint32[2][] memory){
//         tmp_h = param;
//         emit log(tmp_h);
//         return tmp_h;
//     }
//
//     function getInt32Array() public view returns (uint32[2][] memory){
//         return tmp_h;
//     }
//
//     function changeInt256Array(uint256[2][2] memory param) public returns (uint256[2][2] memory){
//         tmp_i = param;
//         emit log(tmp_i);
//         return tmp_i;
//     }
//
//     function getInt256Array() public view returns (uint256[2][2] memory){
//         return tmp_i;
//     }
//
//     function setMappinga(uint256 param) public returns (uint256){
//         mapa[msg.sender] = param;
//         return mapa[msg.sender];
//     }
//
//     function getMappinga(address a) public view returns (uint256){
//         return mapa[a];
//     }
// }
        contractName: "contractTypesCall",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "token",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "string[]",
                        "name": "strs",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "bys",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int64[]",
                        "name": "",
                        "type": "int64[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint32[2][]",
                        "name": "",
                        "type": "uint32[2][]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256[2][2]",
                        "name": "",
                        "type": "uint256[2][2]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "param",
                        "type": "uint8"
                    }
                ],
                "name": "changeActionChoices",
                "outputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "param",
                        "type": "address"
                    }
                ],
                "name": "changeAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes",
                        "name": "param",
                        "type": "bytes"
                    }
                ],
                "name": "changeBytes",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "param",
                        "type": "bytes32"
                    }
                ],
                "name": "changeBytes32",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "param",
                        "type": "uint256[2][2]"
                    }
                ],
                "name": "changeInt256Array",
                "outputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "",
                        "type": "uint256[2][2]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "param",
                        "type": "uint32[2][]"
                    }
                ],
                "name": "changeInt32Array",
                "outputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "",
                        "type": "uint32[2][]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int64[]",
                        "name": "param",
                        "type": "int64[]"
                    }
                ],
                "name": "changeInt64NegativeArray",
                "outputs": [
                    {
                        "internalType": "int64[]",
                        "name": "",
                        "type": "int64[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "param",
                        "type": "string"
                    }
                ],
                "name": "changeString",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "param",
                        "type": "uint256"
                    }
                ],
                "name": "changeUint",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getActionChoices",
                "outputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBytes",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBytes32",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt256Array",
                "outputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "",
                        "type": "uint256[2][2]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt32Array",
                "outputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "",
                        "type": "uint32[2][]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt64NegativeArray",
                "outputs": [
                    {
                        "internalType": "int64[]",
                        "name": "",
                        "type": "int64[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    }
                ],
                "name": "getMappinga",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNegativeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getString",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getUint",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map2",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "mapa",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "param",
                        "type": "uint256"
                    }
                ],
                "name": "setMappinga",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:"0x608060405260008060006101000a81548160ff0219169083151502179055506301efa6ad6001557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe105953600255630166654f60035573dcad3a6d3569df655070ded06cb7a1b2ccd1d3af600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506bdcad3a6d3569df655070ded060001b600555600367ffffffffffffffff811115620000d857620000d762000f00565b5b6040519080825280601f01601f1916602001820160405280156200010b5781602001600182028036833780820191505090505b5060069080519060200190620001239291906200043e565b506040518060400160405280600681526020017f31323371776500000000000000000000000000000000000000000000000000008152506007908051906020019062000171929190620004cf565b506001600860006101000a81548160ff021916908360038111156200019b576200019a62000ea2565b5b021790555060405180606001604052807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60000b8152602001600260000b81526020017ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd60000b81525060099060036200021792919062000560565b5060405180606001604052806040518060400160405280600160ff168152602001600260ff1681525081526020016040518060400160405280600360ff168152602001600460ff1681525081526020016040518060400160405280600560ff168152602001600660ff16815250815250600a9060036200029992919062000626565b5060405180604001604052806040518060400160405280600b60ff168152602001601660ff1681525081526020016040518060400160405280602160ff168152602001602c60ff16815250815250600b906002620002f992919062000688565b50620f424260125560405180606001604052806040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f320000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f33000000000000000000000000000000000000000000000000000000000000008152508152506013906003620003cd929190620006df565b506040516200405e3803806200405e8339818101604052810190620003f3919062000bfe565b83600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505062000f8d565b8280546200044c9062000e36565b90600052602060002090601f016020900481019282620004705760008555620004bc565b82601f106200048b57805160ff1916838001178555620004bc565b82800160010185558215620004bc579182015b82811115620004bb5782518255916020019190600101906200049e565b5b509050620004cb919062000746565b5090565b828054620004dd9062000e36565b90600052602060002090601f0160209004810192826200050157600085556200054d565b82601f106200051c57805160ff19168380011785556200054d565b828001600101855582156200054d579182015b828111156200054c5782518255916020019190600101906200052f565b5b5090506200055c919062000746565b5090565b82805482825590600052602060002090600301600490048101928215620006135791602002820160005b83821115620005db57835183826101000a81548167ffffffffffffffff021916908360000b67ffffffffffffffff16021790555092602001926008016020816007010492830192600103026200058a565b8015620006115782816101000a81549067ffffffffffffffff0219169055600801602081600701049283019260010302620005db565b505b50905062000622919062000746565b5090565b82805482825590600052602060002090810192821562000675579160200282015b8281111562000674578251829060026200066392919062000765565b509160200191906001019062000647565b5b5090506200068491906200080c565b5090565b82600280028101928215620006cc579160200282015b82811115620006cb57825182906002620006ba92919062000834565b50916020019190600201906200069e565b5b509050620006db91906200087e565b5090565b82805482825590600052602060002090810192821562000733579160200282015b828111156200073257825182908051906020019062000721929190620004cf565b509160200191906001019062000700565b5b509050620007429190620008a6565b5090565b5b808211156200076157600081600090555060010162000747565b5090565b826002600701600890048101928215620007f95791602002820160005b83821115620007c557835183826101000a81548163ffffffff021916908360ff160217905550926020019260040160208160030104928301926001030262000782565b8015620007f75782816101000a81549063ffffffff0219169055600401602081600301049283019260010302620007c5565b505b50905062000808919062000746565b5090565b5b80821115620008305760008181620008269190620008ce565b506001016200080d565b5090565b82600281019282156200086b579160200282015b828111156200086a578251829060ff1690559160200191906001019062000848565b5b5090506200087a919062000746565b5090565b5b80821115620008a25760008181620008989190620008d5565b506002016200087f565b5090565b5b80821115620008ca5760008181620008c09190620008e3565b50600101620008a7565b5090565b5060009055565b506000815560010160009055565b508054620008f19062000e36565b6000825580601f1062000905575062000926565b601f01602090049060005260206000209081019062000925919062000746565b5b50565b6000620009406200093a8462000cd7565b62000cae565b9050808382526020820190508285602086028201111562000966576200096562000f34565b5b60005b85811015620009bb57815167ffffffffffffffff81111562000990576200098f62000f2f565b5b8086016200099f898262000b81565b8552602085019450602084019350505060018101905062000969565b5050509392505050565b6000620009dc620009d68462000d06565b62000cae565b9050808382526020820190508285602086028201111562000a025762000a0162000f34565b5b60005b8581101562000a5757815167ffffffffffffffff81111562000a2c5762000a2b62000f2f565b5b80860162000a3b898262000bb4565b8552602085019450602084019350505060018101905062000a05565b5050509392505050565b600062000a7862000a728462000d35565b62000cae565b90508281526020810184848401111562000a975762000a9662000f39565b5b62000aa484828562000e00565b509392505050565b600062000ac362000abd8462000d6b565b62000cae565b90508281526020810184848401111562000ae25762000ae162000f39565b5b62000aef84828562000e00565b509392505050565b60008151905062000b088162000f59565b62000b138162000da1565b905092915050565b600082601f83011262000b335762000b3262000f2f565b5b815162000b4584826020860162000929565b91505092915050565b600082601f83011262000b665762000b6562000f2f565b5b815162000b78848260208601620009c5565b91505092915050565b600082601f83011262000b995762000b9862000f2f565b5b815162000bab84826020860162000a61565b91505092915050565b600082601f83011262000bcc5762000bcb62000f2f565b5b815162000bde84826020860162000aac565b91505092915050565b60008151905062000bf88162000f73565b92915050565b6000806000806080858703121562000c1b5762000c1a62000f43565b5b600062000c2b8782880162000af7565b945050602062000c3e8782880162000be7565b935050604085015167ffffffffffffffff81111562000c625762000c6162000f3e565b5b62000c708782880162000b4e565b925050606085015167ffffffffffffffff81111562000c945762000c9362000f3e565b5b62000ca28782880162000b1b565b91505092959194509250565b600062000cba62000ccd565b905062000cc8828262000e6c565b919050565b6000604051905090565b600067ffffffffffffffff82111562000cf55762000cf462000f00565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000d245762000d2362000f00565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000d535762000d5262000f00565b5b62000d5e8262000f48565b9050602081019050919050565b600067ffffffffffffffff82111562000d895762000d8862000f00565b5b62000d948262000f48565b9050602081019050919050565b600062000dae8262000dbf565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b8381101562000e2057808201518184015260208101905062000e03565b8381111562000e30576000848401525b50505050565b6000600282049050600182168062000e4f57607f821691505b6020821081141562000e665762000e6562000ed1565b5b50919050565b62000e778262000f48565b810181811067ffffffffffffffff8211171562000e995762000e9862000f00565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b62000f648162000ddf565b811462000f7057600080fd5b50565b62000f7e8162000db5565b811462000f8a57600080fd5b50565b6130c18062000f9d6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101c25760003560e01c80635dd8e1c911610113578063c1187969116100b1578063f1676e051161008b578063f1676e0514610551578063f9632ae714610581578063fe64d6ff146105b1578063ff51980b146105e1576101c2565b8063c1187969146104d3578063d123b9ed14610503578063da8ee0bc14610533576101c2565b806389ea642f116100ed57806389ea642f146104255780639e0c5f2214610443578063a0e29df614610473578063bcc0351a146104a3576101c2565b80635dd8e1c9146103b957806362738998146103e95780637d5ce2f014610407576101c2565b806336612181116101805780633ac387d21161015a5780633ac387d21461031d5780633cbf8c281461034d57806348e357ea1461037d57806353340aba1461039b576101c2565b806336612181146102b157806336d98083146102e157806338cc4831146102ff576101c2565b80620267a4146101c7578063078799b3146101e55780630bcd3b331461021557806311c8aec0146102335780631f659d8c146102635780631f90303714610293575b600080fd5b6101cf610611565b6040516101dc919061286d565b60405180910390f35b6101ff60048036038101906101fa9190611b62565b61061b565b60405161020c91906126d6565b60405180910390f35b61021d6106ea565b60405161022a91906127af565b60405180910390f35b61024d60048036038101906102489190611d3a565b61077c565b60405161025a919061286d565b60405180910390f35b61027d60048036038101906102789190611d67565b610809565b60405161028a91906127af565b60405180910390f35b61029b6108c2565b6040516102a89190612794565b60405180910390f35b6102cb60048036038101906102c69190611b8f565b6108cc565b6040516102d8919061270c565b60405180910390f35b6102e96109d5565b6040516102f691906127f3565b60405180910390f35b6103076109ec565b60405161031491906126bb565b60405180910390f35b61033760048036038101906103329190611c21565b610a16565b6040516103449190612794565b60405180910390f35b61036760048036038101906103629190611d67565b610a62565b6040516103749190612829565b60405180910390f35b610385610b1b565b6040516103929190612750565b60405180910390f35b6103a3610b99565b6040516103b0919061280e565b60405180910390f35b6103d360048036038101906103ce9190611cf1565b610ba3565b6040516103e09190612829565b60405180910390f35b6103f1610c86565b6040516103fe919061280e565b60405180910390f35b61040f610c90565b60405161041c91906126d6565b60405180910390f35b61042d610d13565b60405161043a9190612829565b60405180910390f35b61045d60048036038101906104589190611c97565b610da5565b60405161046a91906127f3565b60405180910390f35b61048d60048036038101906104889190611d3a565b610e2e565b60405161049a919061286d565b60405180910390f35b6104bd60048036038101906104b89190611bd8565b610e7a565b6040516104ca9190612750565b60405180910390f35b6104ed60048036038101906104e89190611b35565b610f49565b6040516104fa919061286d565b60405180910390f35b61051d60048036038101906105189190611cc4565b610f61565b60405161052a919061280e565b60405180910390f35b61053b610fad565b604051610548919061270c565b60405180910390f35b61056b60048036038101906105669190611cc4565b611065565b604051610578919061280e565b60405180910390f35b61059b60048036038101906105969190611c4e565b6110b1565b6040516105a891906127af565b60405180910390f35b6105cb60048036038101906105c69190611b35565b611194565b6040516105d891906126bb565b60405180910390f35b6105fb60048036038101906105f69190611b35565b61125a565b604051610608919061286d565b60405180910390f35b6000600354905090565b6106236112a3565b81600b9060026106349291906112d0565b507f7243a5c57e9004f964b64f34645d5d6039cc92f9610f0529f249a30f4c5d1ff7600b60405161066591906126f1565b60405180910390a1600b600280602002604051908101604052809291906000905b828210156106df578382600202016002806020026040519081016040528092919082600280156106cb576020028201915b8154815260200190600101908083116106b7575b505050505081526020019060010190610686565b505050509050919050565b6060600680546106f990612cf6565b80601f016020809104026020016040519081016040528092919081815260200182805461072590612cf6565b80156107725780601f1061074757610100808354040283529160200191610772565b820191906000526020600020905b81548152906001019060200180831161075557829003601f168201915b5050505050905090565b600081600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6011602052816000526040600020818154811061082557600080fd5b9060005260206000200160009150915050805461084190612cf6565b80601f016020809104026020016040519081016040528092919081815260200182805461086d90612cf6565b80156108ba5780601f1061088f576101008083540402835291602001916108ba565b820191906000526020600020905b81548152906001019060200180831161089d57829003601f168201915b505050505081565b6000600554905090565b606081600a90805190602001906108e4929190611320565b507fdca1bb120a4e1b84b5482f833b8e3ea7e92c3be62a16e90611058106e4332e58600a604051610915919061272e565b60405180910390a1600a805480602002602001604051908101604052809291908181526020016000905b828210156109ca578382906000526020600020016002806020026040519081016040528092919082600280156109b6576020028201916000905b82829054906101000a900463ffffffff1663ffffffff16815260200190600401906020826003010492830192600103820291508084116109795790505b50505050508152602001906001019061093f565b505050509050919050565b6000600860009054906101000a900460ff16905090565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000816005819055507f27b7cf8513ac6b65cae720183e1e60e67f8a9d92c01286c19d51d4e30aa269da600554604051610a509190612794565b60405180910390a16005549050919050565b60106020528160005260406000208181548110610a7e57600080fd5b90600052602060002001600091509150508054610a9a90612cf6565b80601f0160208091040260200160405190810160405280929190818152602001828054610ac690612cf6565b8015610b135780601f10610ae857610100808354040283529160200191610b13565b820191906000526020600020905b815481529060010190602001808311610af657829003601f168201915b505050505081565b60606009805480602002602001604051908101604052809291908181526020018280548015610b8f57602002820191906000526020600020906000905b82829054906101000a900460070b60070b81526020019060080190602082600701049283019260010382029150808411610b585790505b5050505050905090565b6000600254905090565b60608160079080519060200190610bbb92919061137b565b507f41304facd9323d75b11bcdd609cb38effffdb05710f7caf0e9b16c6d9d709f506007604051610bec919061284b565b60405180910390a160078054610c0190612cf6565b80601f0160208091040260200160405190810160405280929190818152602001828054610c2d90612cf6565b8015610c7a5780601f10610c4f57610100808354040283529160200191610c7a565b820191906000526020600020905b815481529060010190602001808311610c5d57829003601f168201915b50505050509050919050565b6000600154905090565b610c986112a3565b600b600280602002604051908101604052809291906000905b82821015610d0a57838260020201600280602002604051908101604052809291908260028015610cf6576020028201915b815481526020019060010190808311610ce2575b505050505081526020019060010190610cb1565b50505050905090565b606060078054610d2290612cf6565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4e90612cf6565b8015610d9b5780601f10610d7057610100808354040283529160200191610d9b565b820191906000526020600020905b815481529060010190602001808311610d7e57829003601f168201915b5050505050905090565b600081600860006101000a81548160ff02191690836003811115610dcc57610dcb612eab565b5b02179055507f5ddf586f10053ca0b2028c82acf5cde750bc7c084e1171f639ec37da3aa87196600860009054906101000a900460ff16604051610e0f91906127f3565b60405180910390a1600860009054906101000a900460ff169050919050565b6000816003819055507ff82c50f1848136e6c140b186ea0c768b7deda5efffe42c25e96336a90b26c744600354604051610e68919061286d565b60405180910390a16003549050919050565b60608160099080519060200190610e92929190611401565b507f0aaee4b5e3ebacf33d494e3b60f9e6ca64f7e9166f36c23367988afa575a9ab06009604051610ec39190612772565b60405180910390a16009805480602002602001604051908101604052809291908181526020018280548015610f3d57602002820191906000526020600020906000905b82829054906101000a900460070b60070b81526020019060080190602082600701049283019260010382029150808411610f065790505b50505050509050919050565b600f6020528060005260406000206000915090505481565b6000816002819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef8600254604051610f9b919061280e565b60405180910390a16002549050919050565b6060600a805480602002602001604051908101604052809291908181526020016000905b8282101561105c57838290600052602060002001600280602002604051908101604052809291908260028015611048576020028201916000905b82829054906101000a900463ffffffff1663ffffffff168152602001906004019060208260030104928301926001038202915080841161100b5790505b505050505081526020019060010190610fd1565b50505050905090565b6000816001819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef860015460405161109f919061280e565b60405180910390a16001549050919050565b606081600690805190602001906110c99291906114c0565b507f0be77f5642494da7d212b92a3472c4f471abb24e17467f41788e7de7915d623860066040516110fa91906127d1565b60405180910390a16006805461110f90612cf6565b80601f016020809104026020016040519081016040528092919081815260200182805461113b90612cf6565b80156111885780601f1061115d57610100808354040283529160200191611188565b820191906000526020600020905b81548152906001019060200180831161116b57829003601f168201915b50505050509050919050565b600081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f2c2ecbc2212ac38c2f9ec89aa5fcef7f532a5db24dbf7cad1f48bc82843b7428600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161122891906126bb565b60405180910390a1600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60405180604001604052806002905b6112ba611546565b8152602001906001900390816112b25790505090565b8260028002810192821561130f579160200282015b8281111561130e578251829060026112fe929190611568565b50916020019190600201906112e5565b5b50905061131c91906115a8565b5090565b82805482825590600052602060002090810192821561136a579160200282015b82811115611369578251829060026113599291906115cc565b5091602001919060010190611340565b5b509050611377919061166f565b5090565b82805461138790612cf6565b90600052602060002090601f0160209004810192826113a957600085556113f0565b82601f106113c257805160ff19168380011785556113f0565b828001600101855582156113f0579182015b828111156113ef5782518255916020019190600101906113d4565b5b5090506113fd9190611693565b5090565b828054828255906000526020600020906003016004900481019282156114af5791602002820160005b8382111561147957835183826101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff160217905550926020019260080160208160070104928301926001030261142a565b80156114ad5782816101000a81549067ffffffffffffffff0219169055600801602081600701049283019260010302611479565b505b5090506114bc9190611693565b5090565b8280546114cc90612cf6565b90600052602060002090601f0160209004810192826114ee5760008555611535565b82601f1061150757805160ff1916838001178555611535565b82800160010185558215611535579182015b82811115611534578251825591602001919060010190611519565b5b5090506115429190611693565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b8260028101928215611597579160200282015b8281111561159657825182559160200191906001019061157b565b5b5090506115a49190611693565b5090565b5b808211156115c857600081816115bf91906116b0565b506002016115a9565b5090565b82600260070160089004810192821561165e5791602002820160005b8382111561162c57835183826101000a81548163ffffffff021916908363ffffffff16021790555092602001926004016020816003010492830192600103026115e8565b801561165c5782816101000a81549063ffffffff021916905560040160208160030104928301926001030261162c565b505b50905061166b9190611693565b5090565b5b8082111561168f576000818161168691906116be565b50600101611670565b5090565b5b808211156116ac576000816000905550600101611694565b5090565b506000815560010160009055565b5060009055565b60006116d86116d3846128ad565b612888565b905080828560408602820111156116f2576116f1612f50565b5b60005b8581101561172257816117088882611a05565b8452602084019350604083019250506001810190506116f5565b5050509392505050565b600061173f61173a846128d3565b612888565b9050808382526020820190508285604086028201111561176257611761612f50565b5b60005b8581101561179257816117788882611a30565b845260208401935060408301925050600181019050611765565b5050509392505050565b60006117af6117aa846128ff565b612888565b905080838252602082019050828560208602820111156117d2576117d1612f50565b5b60005b8581101561180257816117e88882611ac8565b8452602084019350602083019250506001810190506117d5565b5050509392505050565b600061181f61181a8461292b565b612888565b9050808285602086028201111561183957611838612f50565b5b60005b85811015611869578161184f8882611b0b565b84526020840193506020830192505060018101905061183c565b5050509392505050565b600061188661188184612951565b612888565b905080828560208602820111156118a05761189f612f50565b5b60005b858110156118d057816118b68882611b20565b8452602084019350602083019250506001810190506118a3565b5050509392505050565b60006118ed6118e884612977565b612888565b90508281526020810184848401111561190957611908612f55565b5b611914848285612cb4565b509392505050565b600061192f61192a846129a8565b612888565b90508281526020810184848401111561194b5761194a612f55565b5b611956848285612cb4565b509392505050565b60008135905061196d81612ff1565b61197681612c01565b905092915050565b600082601f83011261199357611992612f4b565b5b60026119a08482856116c5565b91505092915050565b600082601f8301126119be576119bd612f4b565b5b81356119ce84826020860161172c565b91505092915050565b600082601f8301126119ec576119eb612f4b565b5b81356119fc84826020860161179c565b91505092915050565b600082601f830112611a1a57611a19612f4b565b5b6002611a2784828561180c565b91505092915050565b600082601f830112611a4557611a44612f4b565b5b6002611a52848285611873565b91505092915050565b600081359050611a6a81613008565b92915050565b600082601f830112611a8557611a84612f4b565b5b8135611a958482602086016118da565b91505092915050565b600081359050611aad8161301f565b92915050565b600081359050611ac28161302f565b92915050565b600081359050611ad781613046565b92915050565b600082601f830112611af257611af1612f4b565b5b8135611b0284826020860161191c565b91505092915050565b600081359050611b1a8161305d565b92915050565b600081359050611b2f81613074565b92915050565b600060208284031215611b4b57611b4a612f5f565b5b6000611b598482850161195e565b91505092915050565b600060808284031215611b7857611b77612f5f565b5b6000611b868482850161197e565b91505092915050565b600060208284031215611ba557611ba4612f5f565b5b600082013567ffffffffffffffff811115611bc357611bc2612f5a565b5b611bcf848285016119a9565b91505092915050565b600060208284031215611bee57611bed612f5f565b5b600082013567ffffffffffffffff811115611c0c57611c0b612f5a565b5b611c18848285016119d7565b91505092915050565b600060208284031215611c3757611c36612f5f565b5b6000611c4584828501611a5b565b91505092915050565b600060208284031215611c6457611c63612f5f565b5b600082013567ffffffffffffffff811115611c8257611c81612f5a565b5b611c8e84828501611a70565b91505092915050565b600060208284031215611cad57611cac612f5f565b5b6000611cbb84828501611a9e565b91505092915050565b600060208284031215611cda57611cd9612f5f565b5b6000611ce884828501611ab3565b91505092915050565b600060208284031215611d0757611d06612f5f565b5b600082013567ffffffffffffffff811115611d2557611d24612f5a565b5b611d3184828501611add565b91505092915050565b600060208284031215611d5057611d4f612f5f565b5b6000611d5e84828501611b0b565b91505092915050565b60008060408385031215611d7e57611d7d612f5f565b5b6000611d8c85828601611b0b565b9250506020611d9d85828601611b0b565b9150509250929050565b6000611db38383612186565b60408301905092915050565b6000611dcb83836121dd565b60408301905092915050565b6000611de3838361223b565b60408301905092915050565b6000611dfb8383612292565b60408301905092915050565b6000611e1383836125c6565b60208301905092915050565b6000611e2b838361268e565b60208301905092915050565b6000611e4383836126ac565b60208301905092915050565b611e5881612c01565b82525050565b611e6781612a89565b611e718184612b75565b9250611e7c826129d9565b8060005b83811015611ead578151611e948782611da7565b9650611e9f83612b0d565b925050600181019050611e80565b505050505050565b611ebe81612a94565b611ec88184612b75565b9250611ed3826129e3565b8060005b83811015611f035781611eea8782611dbf565b9650611ef583612b1a565b925050600181019050611ed7565b505050505050565b6000611f1682612a9f565b611f208185612b80565b9350611f2b836129ed565b8060005b83811015611f5c578151611f438882611dd7565b9750611f4e83612b27565b925050600181019050611f2f565b5085935050505092915050565b6000611f7482612aaa565b611f7e8185612b80565b9350611f89836129fd565b8060005b83811015611fb95781611fa08882611def565b9750611fab83612b34565b925050600181019050611f8d565b5085935050505092915050565b6000611fd182612ab5565b611fdb8185612b91565b9350611fe683612a12565b8060005b83811015612017578151611ffe8882611e07565b975061200983612b41565b925050600181019050611fea565b5085935050505092915050565b600061202f82612ac0565b6120398185612b91565b93508361204584612a22565b60006001156120d2575b836001600403820110156120d15781546120718861206c83612d28565b6125c6565b6020880197506120898861208483612e46565b6125c6565b6020880197506120a18861209c83612d90565b6125c6565b6020880197506120b9886120b483612dde565b6125c6565b6020880197506001830192505060048101905061204f565b5b60011561217957815484821015612102576120f5886120f083612d28565b6125c6565b6020880197506001820191505b848210156121295761211c8861211783612e46565b6125c6565b6020880197506001820191505b84821015612150576121438861213e83612d90565b6125c6565b6020880197506001820191505b848210156121775761216a8861216583612dde565b6125c6565b6020880197506001820191505b505b8694505050505092915050565b61218f81612acb565b6121998184612ba2565b92506121a482612a37565b8060005b838110156121d55781516121bc8782611e1f565b96506121c783612b4e565b9250506001810190506121a8565b505050505050565b6121e681612ad6565b6121f08184612ba2565b92506121fb82612a41565b8060005b838110156122335761221082612f38565b61221a8782611e1f565b965061222583612b5b565b9250506001810190506121ff565b505050505050565b61224481612ae1565b61224e8184612bad565b925061225982612a4b565b8060005b8381101561228a5781516122718782611e37565b965061227c83612b68565b92505060018101905061225d565b505050505050565b61229b81612aec565b6122a58184612bad565b9250826122b183612a55565b6000801561239d575b8360016008038201101561239c5781546122dc876122d783612d5c565b6126ac565b6020870196506122f4876122ef83612e2c565b6126ac565b60208701965061230c8761230783612e60565b6126ac565b6020870196506123248761231f83612d76565b6126ac565b60208701965061233c8761233783612daa565b6126ac565b6020870196506123548761234f83612dc4565b6126ac565b60208701965061236c8761236783612df8565b6126ac565b6020870196506123848761237f83612e12565b6126ac565b602087019650600183019250506008810190506122ba565b5b6001156124d85781546001156123cc576123bf876123ba83612d5c565b6126ac565b6020870196506001820191505b6001156123f2576123e5876123e083612e2c565b6126ac565b6020870196506001820191505b6000156124185761240b8761240683612e60565b6126ac565b6020870196506001820191505b60001561243e576124318761242c83612d76565b6126ac565b6020870196506001820191505b600015612464576124578761245283612daa565b6126ac565b6020870196506001820191505b60001561248a5761247d8761247883612dc4565b6126ac565b6020870196506001820191505b6000156124b0576124a38761249e83612df8565b6126ac565b6020870196506001820191505b6000156124d6576124c9876124c483612e12565b6126ac565b6020870196506001820191505b505b505050505050565b6124e981612c13565b82525050565b60006124fa82612af7565b6125048185612bb8565b9350612514818560208601612cc3565b61251d81612f64565b840191505092915050565b6000815461253581612cf6565b61253f8186612bb8565b9450600182166000811461255a576001811461256c5761259f565b60ff198316865260208601935061259f565b61257585612a5f565b60005b8381101561259757815481890152600182019150602081019050612578565b808801955050505b50505092915050565b6125b181612ca2565b82525050565b6125c081612c30565b82525050565b6125cf81612c3a565b82525050565b60006125e082612b02565b6125ea8185612bc9565b93506125fa818560208601612cc3565b61260381612f64565b840191505092915050565b6000815461261b81612cf6565b6126258186612bc9565b94506001821660008114612640576001811461265257612685565b60ff1983168652602086019350612685565b61265b85612a74565b60005b8381101561267d5781548189015260018201915060208101905061265e565b808801955050505b50505092915050565b61269781612c88565b82525050565b6126a681612c88565b82525050565b6126b581612c92565b82525050565b60006020820190506126d06000830184611e4f565b92915050565b60006080820190506126eb6000830184611e5e565b92915050565b60006080820190506127066000830184611eb5565b92915050565b600060208201905081810360008301526127268184611f0b565b905092915050565b600060208201905081810360008301526127488184611f69565b905092915050565b6000602082019050818103600083015261276a8184611fc6565b905092915050565b6000602082019050818103600083015261278c8184612024565b905092915050565b60006020820190506127a960008301846124e0565b92915050565b600060208201905081810360008301526127c981846124ef565b905092915050565b600060208201905081810360008301526127eb8184612528565b905092915050565b600060208201905061280860008301846125a8565b92915050565b600060208201905061282360008301846125b7565b92915050565b6000602082019050818103600083015261284381846125d5565b905092915050565b60006020820190508181036000830152612865818461260e565b905092915050565b6000602082019050612882600083018461269d565b92915050565b60006128926128a3565b905061289e8282612e7a565b919050565b6000604051905090565b600067ffffffffffffffff8211156128c8576128c7612f09565b5b602082029050919050565b600067ffffffffffffffff8211156128ee576128ed612f09565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561291a57612919612f09565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561294657612945612f09565b5b602082029050919050565b600067ffffffffffffffff82111561296c5761296b612f09565b5b602082029050919050565b600067ffffffffffffffff82111561299257612991612f09565b5b61299b82612f64565b9050602081019050919050565b600067ffffffffffffffff8211156129c3576129c2612f09565b5b6129cc82612f64565b9050602081019050919050565b6000819050919050565b6000819050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050919050565b6000819050919050565b6000819050919050565b6000819050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600060029050919050565b600060029050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600060029050919050565b600060029050919050565b600060029050919050565b600060029050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600282019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b60008160070b9050919050565b6000819050919050565b600063ffffffff82169050919050565b6000612c0c82612c47565b9050919050565b6000819050919050565b6000819050612c2b82612fdd565b919050565b6000819050919050565b60008160070b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b6000612cad82612c1d565b9050919050565b82818337600083830152505050565b60005b83811015612ce1578082015181840152602081019050612cc6565b83811115612cf0576000848401525b50505050565b60006002820490506001821680612d0e57607f821691505b60208210811415612d2257612d21612eda565b5b50919050565b6000612d3b612d3683612f75565b612bda565b9050919050565b6000612d55612d5083612f75565b612be7565b9050919050565b6000612d6f612d6a83612f75565b612bf1565b9050919050565b6000612d89612d8483612fd0565b612bf1565b9050919050565b6000612da3612d9e83612f82565b612bda565b9050919050565b6000612dbd612db883612f82565b612bf1565b9050919050565b6000612dd7612dd283612f8f565b612bf1565b9050919050565b6000612df1612dec83612f9c565b612bda565b9050919050565b6000612e0b612e0683612f9c565b612bf1565b9050919050565b6000612e25612e2083612fa9565b612bf1565b9050919050565b6000612e3f612e3a83612fb6565b612bf1565b9050919050565b6000612e59612e5483612fc3565b612bda565b9050919050565b6000612e73612e6e83612fc3565b612bf1565b9050919050565b612e8382612f64565b810181811067ffffffffffffffff82111715612ea257612ea1612f09565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000612f448254612d42565b9050919050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b60008160801c9050919050565b60008160a01c9050919050565b60008160c01c9050919050565b60008160e01c9050919050565b60008160201c9050919050565b60008160401c9050919050565b60008160601c9050919050565b60048110612fee57612fed612eab565b5b50565b612ffa81612c67565b811461300557600080fd5b50565b61301181612c13565b811461301c57600080fd5b50565b6004811061302c57600080fd5b50565b61303881612c30565b811461304357600080fd5b50565b61304f81612c3a565b811461305a57600080fd5b50565b61306681612c88565b811461307157600080fd5b50565b61307d81612c92565b811461308857600080fd5b5056fea26474726f6e5822122090a07422206afc141c92b4a157c0f4196c6c7c2efb44ed2e403161686e02024364736f6c63430008060033"
    },
    outputNameTest1: {
        /*
        pragma experimental ABIEncoderV2;

        contract viewCall {
            bool stopped = false;
            int i = 32482989;
            int i2 = - 32482989;
            address public origin = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
            mapping(uint => string[]) public map1;
            mapping(uint => bytes[]) public map2;

            trcToken public token =1000002;
            string[] public strs = ["1","2","3"];
            bytes[] public bys;
            struct S {
                uint256 a;
            }
            S[] public structArray;
            struct Data {
                mapping(uint => string[]) val1;
                mapping(uint => bytes[]) val2;
                S val3;
                uint[] val4;
                address addr;
                trcToken token;
            }
            struct Info {
                S val3;
                uint[] val4;
                address addr;
                trcToken token;
            }
            struct SanCeng {
                Info infoValue;
            }
            struct SiCeng {
                SanCeng sanCengValue;
            }
            uint numData;
            mapping (uint => Data) public data;
            event log(int);
            event log(bool);
            event log(address);
            event log(bytes[]);
            event log(string[]);
            event log(S[]);

            constructor(S memory param,address addr,trcToken t,string[] memory s,bytes[] memory b) public{
                structArray.push(S(param.a));
                origin=addr;
                token=t;
                strs=s;
                bys=b;
            }

            function changeMapAll(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,S memory svalue,uint[] memory val4value,address addr,trcToken tokenid) public returns(uint uintData,address addressData,uint[] memory uintArrayDate){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = addr;
                d.val3 = svalue;
                d.val4 = val4value;
                d.token = tokenid;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (numDataID,d.addr,d.val4);
            }

            function changeMapAll2(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,SanCeng memory param) public returns(trcToken tokenData,address addressData,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = param.infoValue.addr;
                d.val3 = param.infoValue.val3;
                d.val4 = param.infoValue.val4;
                d.token = param.infoValue.token;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (d.token,d.addr,d.val4);
            }

            function changeMapAll3(uint val1key,string[] memory val1value,uint val2key,bytes[] memory val2value,SiCeng memory param) public returns(trcToken tokenData,address,uint[] memory){
                uint numDataID = numData++;
                map1[val1key]=val1value;
                map2[val2key]=val2value;

                Data storage d = data[numDataID];
                d.addr = param.sanCengValue.infoValue.addr;
                d.val3 = param.sanCengValue.infoValue.val3;
                d.val4 = param.sanCengValue.infoValue.val4;
                d.token = param.sanCengValue.infoValue.token;
                d.val1[numDataID] = map1[val1key];
                d.val2[numDataID] = map2[val2key];
                return (d.token,d.addr,d.val4);
            }

            function changeStructArray(S calldata param1,S calldata param2) public returns (S[] memory structArrayData){
                structArray.push(S(param1.a));
                structArray.push(S(param2.a));
                emit log(structArray);
                return structArray;
            }

            function getStructArray() public view returns (S[] memory structArrayData){
                return structArray;
            }

            function changeStrs(string[] memory param) public returns (string[] memory stringArrayData){
                strs = param;
                emit log(strs);
                return strs;
            }

            function getStrs() public view returns (string[] memory stringArrayData){
                return strs;
            }

            function changeBys(bytes[] memory param) public returns (bytes[] memory bytesArrayData){
                bys = param;
                emit log(bys);
                return bys;
            }

            function getBys() public view returns (bytes[] memory bytesArrayData){
                return bys;
            }

            function changeBool(bool param) public returns (bool boolData){
                stopped = param;
                emit log(stopped);
                return stopped;
            }

            function getBool() public view returns (bool boolData){
                return stopped;
            }
            function changeInt(int param) public returns (int intData){
                i = param;
                emit log(i);
                return i;
            }

            function getInt() public view returns (int intData){
                return i;
            }

        }
         */
        contractName: "outputNameTest1",
        abi:[
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "t",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "string[]",
                        "name": "s",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "b",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "indexed": false,
                        "internalType": "struct viewCall.S[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bys",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bool",
                        "name": "param",
                        "type": "bool"
                    }
                ],
                "name": "changeBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "boolData",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "param",
                        "type": "bytes[]"
                    }
                ],
                "name": "changeBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "bytesArrayData",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "intData",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "svalue",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "val4value",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "tokenid",
                        "type": "trcToken"
                    }
                ],
                "name": "changeMapAll",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "uintData",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "addressData",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "uintArrayDate",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "components": [
                                            {
                                                "internalType": "uint256",
                                                "name": "a",
                                                "type": "uint256"
                                            }
                                        ],
                                        "internalType": "struct viewCall.S",
                                        "name": "val3",
                                        "type": "tuple"
                                    },
                                    {
                                        "internalType": "uint256[]",
                                        "name": "val4",
                                        "type": "uint256[]"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "addr",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "token",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct viewCall.Info",
                                "name": "infoValue",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct viewCall.SanCeng",
                        "name": "param",
                        "type": "tuple"
                    }
                ],
                "name": "changeMapAll2",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "tokenData",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "addressData",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "val1key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "val1value",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "val2key",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "val2value",
                        "type": "bytes[]"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "components": [
                                            {
                                                "components": [
                                                    {
                                                        "internalType": "uint256",
                                                        "name": "a",
                                                        "type": "uint256"
                                                    }
                                                ],
                                                "internalType": "struct viewCall.S",
                                                "name": "val3",
                                                "type": "tuple"
                                            },
                                            {
                                                "internalType": "uint256[]",
                                                "name": "val4",
                                                "type": "uint256[]"
                                            },
                                            {
                                                "internalType": "address",
                                                "name": "addr",
                                                "type": "address"
                                            },
                                            {
                                                "internalType": "trcToken",
                                                "name": "token",
                                                "type": "trcToken"
                                            }
                                        ],
                                        "internalType": "struct viewCall.Info",
                                        "name": "infoValue",
                                        "type": "tuple"
                                    }
                                ],
                                "internalType": "struct viewCall.SanCeng",
                                "name": "sanCengValue",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct viewCall.SiCeng",
                        "name": "param",
                        "type": "tuple"
                    }
                ],
                "name": "changeMapAll3",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "tokenData",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string[]",
                        "name": "param",
                        "type": "string[]"
                    }
                ],
                "name": "changeStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "stringArrayData",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param1",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "param2",
                        "type": "tuple"
                    }
                ],
                "name": "changeStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "structArrayData",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "data",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S",
                        "name": "val3",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "token",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBool",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "boolData",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBys",
                "outputs": [
                    {
                        "internalType": "bytes[]",
                        "name": "bytesArrayData",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "intData",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStrs",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "stringArrayData",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getStructArray",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "a",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct viewCall.S[]",
                        "name": "structArrayData",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map2",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "origin",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "strs",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "structArray",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "a",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "trcToken",
                        "name": "",
                        "type": "trcToken"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:
            "608060405260008060006101000a81548160ff0219169083151502179055506301efa6ad6001557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe10595360025573dcad3a6d3569df655070ded06cb7a1b2ccd1d3af600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620f424260065560405180606001604052806040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f320000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f33000000000000000000000000000000000000000000000000000000000000008152508152506007906003620001729291906200028d565b503480156200018057600080fd5b50d380156200018e57600080fd5b50d280156200019c57600080fd5b5060405162003e7138038062003e718339818101604052810190620001c291906200090e565b6009604051806020016040528087600001518152509080600181540180825580915050600190039060005260206000200160009091909190915060008201518160000155505083600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600681905550816007908051906020019062000268929190620002f4565b508060089080519060200190620002819291906200035b565b50505050505062000cad565b828054828255906000526020600020908101928215620002e1579160200282015b82811115620002e0578251829080519060200190620002cf929190620003c2565b5091602001919060010190620002ae565b5b509050620002f0919062000453565b5090565b82805482825590600052602060002090810192821562000348579160200282015b828111156200034757825182908051906020019062000336929190620003c2565b509160200191906001019062000315565b5b50905062000357919062000453565b5090565b828054828255906000526020600020908101928215620003af579160200282015b82811115620003ae5782518290805190602001906200039d9291906200047b565b50916020019190600101906200037c565b5b509050620003be91906200050c565b5090565b828054620003d09062000b66565b90600052602060002090601f016020900481019282620003f4576000855562000440565b82601f106200040f57805160ff191683800117855562000440565b8280016001018555821562000440579182015b828111156200043f57825182559160200191906001019062000422565b5b5090506200044f919062000534565b5090565b5b808211156200047757600081816200046d919062000553565b5060010162000454565b5090565b828054620004899062000b66565b90600052602060002090601f016020900481019282620004ad5760008555620004f9565b82601f10620004c857805160ff1916838001178555620004f9565b82800160010185558215620004f9579182015b82811115620004f8578251825591602001919060010190620004db565b5b50905062000508919062000534565b5090565b5b8082111562000530576000818162000526919062000599565b506001016200050d565b5090565b5b808211156200054f57600081600090555060010162000535565b5090565b508054620005619062000b66565b6000825580601f1062000575575062000596565b601f01602090049060005260206000209081019062000595919062000534565b5b50565b508054620005a79062000b66565b6000825580601f10620005bb5750620005dc565b601f016020900490600052602060002090810190620005db919062000534565b5b50565b6000620005f6620005f084620009fd565b620009d4565b905080838252602082019050828560208602820111156200061c576200061b62000c3a565b5b60005b858110156200067157815167ffffffffffffffff81111562000646576200064562000c30565b5b80860162000655898262000837565b855260208501945060208401935050506001810190506200061f565b5050509392505050565b6000620006926200068c8462000a2c565b620009d4565b90508083825260208201905082856020860282011115620006b857620006b762000c3a565b5b60005b858110156200070d57815167ffffffffffffffff811115620006e257620006e162000c30565b5b808601620006f189826200086a565b85526020850194506020840193505050600181019050620006bb565b5050509392505050565b60006200072e620007288462000a5b565b620009d4565b9050828152602081018484840111156200074d576200074c62000c3f565b5b6200075a84828562000b30565b509392505050565b600062000779620007738462000a91565b620009d4565b90508281526020810184848401111562000798576200079762000c3f565b5b620007a584828562000b30565b509392505050565b600081519050620007be8162000c5f565b620007c98162000ac7565b905092915050565b600082601f830112620007e957620007e862000c30565b5b8151620007fb848260208601620005df565b91505092915050565b600082601f8301126200081c576200081b62000c30565b5b81516200082e8482602086016200067b565b91505092915050565b600082601f8301126200084f576200084e62000c30565b5b81516200086184826020860162000717565b91505092915050565b600082601f83011262000882576200088162000c30565b5b81516200089484826020860162000762565b91505092915050565b600060208284031215620008b657620008b562000c35565b5b620008c26020620009d4565b90506000620008d484828501620008f7565b60008301525092915050565b600081519050620008f18162000c79565b92915050565b600081519050620009088162000c93565b92915050565b600080600080600060a086880312156200092d576200092c62000c49565b5b60006200093d888289016200089d565b95505060206200095088828901620007ad565b94505060406200096388828901620008e0565b935050606086015167ffffffffffffffff81111562000987576200098662000c44565b5b620009958882890162000804565b925050608086015167ffffffffffffffff811115620009b957620009b862000c44565b5b620009c788828901620007d1565b9150509295509295909350565b6000620009e0620009f3565b9050620009ee828262000b9c565b919050565b6000604051905090565b600067ffffffffffffffff82111562000a1b5762000a1a62000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a4a5762000a4962000c01565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000a795762000a7862000c01565b5b62000a848262000c4e565b9050602081019050919050565b600067ffffffffffffffff82111562000aaf5762000aae62000c01565b5b62000aba8262000c4e565b9050602081019050919050565b600062000ad48262000ae5565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000b5057808201518184015260208101905062000b33565b8381111562000b60576000848401525b50505050565b6000600282049050600182168062000b7f57607f821691505b6020821081141562000b965762000b9562000bd2565b5b50919050565b62000ba78262000c4e565b810181811067ffffffffffffffff8211171562000bc95762000bc862000c01565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b62000c6a8162000b05565b811462000c7657600080fd5b50565b62000c848162000adb565b811462000c9057600080fd5b50565b62000c9e8162000b26565b811462000caa57600080fd5b50565b6131b48062000cbd6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106101515760003560e01c80637cd4f4ba116100d2578063d9e0b46c11610096578063d9e0b46c146103bc578063e0ed46b2146103ee578063f0ba84401461041e578063f1676e0514610450578063f895c66a14610480578063fc0c546a146104b257610151565b80637cd4f4ba146103025780638fd0cf7d1461033257806392bbd4d614610350578063938b5f3214610380578063974f3e531461039e57610151565b80633cbf8c28116101195780633cbf8c2814610234578063417b05361461026457806354bf7f1a1461029657806362738998146102b45780636d689779146102d257610151565b80630f634b741461015657806312a7b914146101865780631f659d8c146101a45780633316f634146101d457806337f4af4414610204575b600080fd5b610170600480360381019061016b919061202e565b6104d0565b60405161017d9190612b56565b60405180910390f35b61018e6104fa565b60405161019b9190612a4c565b60405180910390f35b6101be60048036038101906101b99190612303565b610510565b6040516101cb9190612a67565b60405180910390f35b6101ee60048036038101906101e99190611fee565b6105c9565b6040516101fb9190612a08565b60405180910390f35b61021e60048036038101906102199190611f4b565b6106f5565b60405161022b91906129c4565b60405180910390f35b61024e60048036038101906102499190612303565b61081f565b60405161025b9190612aa4565b60405180910390f35b61027e60048036038101906102799190612234565b6108d8565b60405161028d93929190612b18565b60405180910390f35b61029e610b07565b6040516102ab9190612a08565b60405180910390f35b6102bc610b6c565b6040516102c99190612a89565b60405180910390f35b6102ec60048036038101906102e79190611f94565b610b76565b6040516102f99190612a4c565b60405180910390f35b61031c60048036038101906103179190611f02565b610bea565b6040516103299190612980565b60405180910390f35b61033a610d14565b60405161034791906129c4565b60405180910390f35b61036a6004803603810190610365919061202e565b610ded565b6040516103779190612a67565b60405180910390f35b610388610e99565b6040516103959190612965565b60405180910390f35b6103a6610ebf565b6040516103b39190612980565b60405180910390f35b6103d660048036038101906103d19190612165565b610f98565b6040516103e593929190612b18565b60405180910390f35b6104086004803603810190610403919061202e565b6111b7565b6040516104159190612aa4565b60405180910390f35b6104386004803603810190610433919061202e565b611263565b60405161044793929190612ac6565b60405180910390f35b61046a60048036038101906104659190611fc1565b6112c1565b6040516104779190612a89565b60405180910390f35b61049a6004803603810190610495919061205b565b61130d565b6040516104a993929190612b71565b60405180910390f35b6104ba61150b565b6040516104c79190612afd565b60405180910390f35b600981815481106104e057600080fd5b906000526020600020016000915090508060000154905081565b60008060009054906101000a900460ff16905090565b6005602052816000526040600020818154811061052c57600080fd5b9060005260206000200160009150915050805461054890612f72565b80601f016020809104026020016040519081016040528092919081815260200182805461057490612f72565b80156105c15780601f10610596576101008083540402835291602001916105c1565b820191906000526020600020905b8154815290600101906020018083116105a457829003601f168201915b505050505081565b606060096040518060200160405280856000013581525090806001815401808255809150506001900390600052602060002001600090919091909150600082015181600001555050600960405180602001604052808460000135815250908060018154018082558091505060019003906000526020600020016000909190919091506000820151816000015550507f0ffb2719457225b3496d50086fa280375d58c6a11277df800a678473547c089660096040516106879190612a2a565b60405180910390a16009805480602002602001604051908101604052809291908181526020016000905b828210156106e957838290600052602060002001604051806020016040529081600082015481525050815260200190600101906106b1565b50505050905092915050565b6060816007908051906020019061070d929190611511565b507f45eae716480be83ee40dd1cb77b31470f66ba3cc313fe0fa5b2ae2a1cdc65e19600760405161073e91906129e6565b60405180910390a16007805480602002602001604051908101604052809291908181526020016000905b8282101561081457838290600052602060002001805461078790612f72565b80601f01602080910402602001604051908101604052809291908181526020018280546107b390612f72565b80156108005780601f106107d557610100808354040283529160200191610800565b820191906000526020600020905b8154815290600101906020018083116107e357829003601f168201915b505050505081526020019060010190610768565b505050509050919050565b6004602052816000526040600020818154811061083b57600080fd5b9060005260206000200160009150915050805461085790612f72565b80601f016020809104026020016040519081016040528092919081815260200182805461088390612f72565b80156108d05780601f106108a5576101008083540402835291602001916108d0565b820191906000526020600020905b8154815290600101906020018083116108b357829003601f168201915b505050505081565b60008060606000600a60008154809291906108f290612fef565b91905055905087600460008b8152602001908152602001600020908051906020019061091f929190611511565b5085600560008981526020019081526020016000209080519060200190610947929190611571565b506000600b60008381526020019081526020016000209050856000015160000151604001518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856000015160000151600001518160020160008201518160000155905050856000015160000151602001518160030190805190602001906109f09291906115d1565b50856000015160000151606001518160050181905550600460008b8152602001908152602001600020816000016000848152602001908152602001600020908054610a3c92919061161e565b5060056000898152602001908152602001600020816001016000848152602001908152602001600020908054610a73929190611686565b5080600501548160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168260030180805480602002602001604051908101604052809291908181526020018280548015610aed57602002820191906000526020600020905b815481526020019060010190808311610ad9575b505050505090509450945094505050955095509592505050565b60606009805480602002602001604051908101604052809291908181526020016000905b82821015610b635783829060005260206000200160405180602001604052908160008201548152505081526020019060010190610b2b565b50505050905090565b6000600154905090565b6000816000806101000a81548160ff0219169083151502179055507f32458eed3feca62a69292a55ca8a755ae4e6cdc57a38d15c298330064467fdd760008054906101000a900460ff16604051610bcd9190612a4c565b60405180910390a160008054906101000a900460ff169050919050565b60608160089080519060200190610c02929190611571565b507f3e7e0752aafa67c79b222ee5298c3795ceb90ad2b4eac91f47e5b0046867ff716008604051610c3391906129a2565b60405180910390a16008805480602002602001604051908101604052809291908181526020016000905b82821015610d09578382906000526020600020018054610c7c90612f72565b80601f0160208091040260200160405190810160405280929190818152602001828054610ca890612f72565b8015610cf55780601f10610cca57610100808354040283529160200191610cf5565b820191906000526020600020905b815481529060010190602001808311610cd857829003601f168201915b505050505081526020019060010190610c5d565b505050509050919050565b60606007805480602002602001604051908101604052809291908181526020016000905b82821015610de4578382906000526020600020018054610d5790612f72565b80601f0160208091040260200160405190810160405280929190818152602001828054610d8390612f72565b8015610dd05780601f10610da557610100808354040283529160200191610dd0565b820191906000526020600020905b815481529060010190602001808311610db357829003601f168201915b505050505081526020019060010190610d38565b50505050905090565b60088181548110610dfd57600080fd5b906000526020600020016000915090508054610e1890612f72565b80601f0160208091040260200160405190810160405280929190818152602001828054610e4490612f72565b8015610e915780601f10610e6657610100808354040283529160200191610e91565b820191906000526020600020905b815481529060010190602001808311610e7457829003601f168201915b505050505081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606008805480602002602001604051908101604052809291908181526020016000905b82821015610f8f578382906000526020600020018054610f0290612f72565b80601f0160208091040260200160405190810160405280929190818152602001828054610f2e90612f72565b8015610f7b5780601f10610f5057610100808354040283529160200191610f7b565b820191906000526020600020905b815481529060010190602001808311610f5e57829003601f168201915b505050505081526020019060010190610ee3565b50505050905090565b60008060606000600a6000815480929190610fb290612fef565b91905055905087600460008b81526020019081526020016000209080519060200190610fdf929190611511565b5085600560008981526020019081526020016000209080519060200190611007929190611571565b506000600b600083815260200190815260200160002090508560000151604001518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600001516000015181600201600082015181600001559050508560000151602001518160030190805190602001906110a49291906115d1565b508560000151606001518160050181905550600460008b81526020019081526020016000208160000160008481526020019081526020016000209080546110ec92919061161e565b5060056000898152602001908152602001600020816001016000848152602001908152602001600020908054611123929190611686565b5080600501548160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826003018080548060200260200160405190810160405280929190818152602001828054801561119d57602002820191906000526020600020905b815481526020019060010190808311611189575b505050505090509450945094505050955095509592505050565b600781815481106111c757600080fd5b9060005260206000200160009150905080546111e290612f72565b80601f016020809104026020016040519081016040528092919081815260200182805461120e90612f72565b801561125b5780601f106112305761010080835404028352916020019161125b565b820191906000526020600020905b81548152906001019060200180831161123e57829003601f168201915b505050505081565b600b60205280600052604060002060009150905080600201604051806020016040529081600082015481525050908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050154905083565b6000816001819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef86001546040516112fb9190612a89565b60405180910390a16001549050919050565b60008060606000600a600081548092919061132790612fef565b9190505590508a600460008e81526020019081526020016000209080519060200190611354929190611511565b5088600560008c8152602001908152602001600020908051906020019061137c929190611571565b506000600b60008381526020019081526020016000209050868160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550888160020160008201518160000155905050878160030190805190602001906114019291906115d1565b50858160050181905550600460008e815260200190815260200160002081600001600084815260200190815260200160002090805461144192919061161e565b50600560008c8152602001908152602001600020816001016000848152602001908152602001600020908054611478929190611686565b50818160040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301808054806020026020016040519081016040528092919081815260200182805480156114ee57602002820191906000526020600020905b8154815260200190600101908083116114da575b505050505090509450945094505050985098509895505050505050565b60065481565b828054828255906000526020600020908101928215611560579160200282015b8281111561155f57825182908051906020019061154f9291906116ee565b5091602001919060010190611531565b5b50905061156d9190611774565b5090565b8280548282559060005260206000209081019282156115c0579160200282015b828111156115bf5782518290805190602001906115af929190611798565b5091602001919060010190611591565b5b5090506115cd919061181e565b5090565b82805482825590600052602060002090810192821561160d579160200282015b8281111561160c5782518255916020019190600101906115f1565b5b50905061161a9190611842565b5090565b8280548282559060005260206000209081019282156116755760005260206000209182015b8281111561167457828290805461165990612f72565b61166492919061185f565b5091600101919060010190611643565b5b5090506116829190611774565b5090565b8280548282559060005260206000209081019282156116dd5760005260206000209182015b828111156116dc5782829080546116c190612f72565b6116cc9291906118ec565b50916001019190600101906116ab565b5b5090506116ea919061181e565b5090565b8280546116fa90612f72565b90600052602060002090601f01602090048101928261171c5760008555611763565b82601f1061173557805160ff1916838001178555611763565b82800160010185558215611763579182015b82811115611762578251825591602001919060010190611747565b5b5090506117709190611842565b5090565b5b80821115611794576000818161178b9190611979565b50600101611775565b5090565b8280546117a490612f72565b90600052602060002090601f0160209004810192826117c6576000855561180d565b82601f106117df57805160ff191683800117855561180d565b8280016001018555821561180d579182015b8281111561180c5782518255916020019190600101906117f1565b5b50905061181a9190611842565b5090565b5b8082111561183e576000818161183591906119b9565b5060010161181f565b5090565b5b8082111561185b576000816000905550600101611843565b5090565b82805461186b90612f72565b90600052602060002090601f01602090048101928261188d57600085556118db565b82601f1061189e57805485556118db565b828001600101855582156118db57600052602060002091601f016020900482015b828111156118da5782548255916001019190600101906118bf565b5b5090506118e89190611842565b5090565b8280546118f890612f72565b90600052602060002090601f01602090048101928261191a5760008555611968565b82601f1061192b5780548555611968565b8280016001018555821561196857600052602060002091601f016020900482015b8281111561196757825482559160010191906001019061194c565b5b5090506119759190611842565b5090565b50805461198590612f72565b6000825580601f1061199757506119b6565b601f0160209004906000526020600020908101906119b59190611842565b5b50565b5080546119c590612f72565b6000825580601f106119d757506119f6565b601f0160209004906000526020600020908101906119f59190611842565b5b50565b6000611a0c611a0784612bd4565b612baf565b90508083825260208201905082856020860282011115611a2f57611a2e6130d9565b5b60005b85811015611a7d57813567ffffffffffffffff811115611a5557611a546130c5565b5b808601611a628982611cc8565b85526020850194506020840193505050600181019050611a32565b5050509392505050565b6000611a9a611a9584612c00565b612baf565b90508083825260208201905082856020860282011115611abd57611abc6130d9565b5b60005b85811015611b0b57813567ffffffffffffffff811115611ae357611ae26130c5565b5b808601611af08982611d0b565b85526020850194506020840193505050600181019050611ac0565b5050509392505050565b6000611b28611b2384612c2c565b612baf565b90508083825260208201905082856020860282011115611b4b57611b4a6130d9565b5b60005b85811015611b7b5781611b618882611eed565b845260208401935060208301925050600181019050611b4e565b5050509392505050565b6000611b98611b9384612c58565b612baf565b905082815260208101848484011115611bb457611bb36130de565b5b611bbf848285612f30565b509392505050565b6000611bda611bd584612c89565b612baf565b905082815260208101848484011115611bf657611bf56130de565b5b611c01848285612f30565b509392505050565b600081359050611c188161310b565b611c2181612eb3565b905092915050565b600082601f830112611c3e57611c3d6130c5565b5b8135611c4e8482602086016119f9565b91505092915050565b600082601f830112611c6c57611c6b6130c5565b5b8135611c7c848260208601611a87565b91505092915050565b600082601f830112611c9a57611c996130c5565b5b8135611caa848260208601611b15565b91505092915050565b600081359050611cc281613122565b92915050565b600082601f830112611cdd57611cdc6130c5565b5b8135611ced848260208601611b85565b91505092915050565b600081359050611d0581613139565b92915050565b600082601f830112611d2057611d1f6130c5565b5b8135611d30848260208601611bc7565b91505092915050565b600060808284031215611d4f57611d4e6130cf565b5b611d596080612baf565b90506000611d6984828501611dec565b600083015250602082013567ffffffffffffffff811115611d8d57611d8c6130d4565b5b611d9984828501611c85565b6020830152506040611dad84828501611c09565b6040830152506060611dc184828501611ed8565b60608301525092915050565b600060208284031215611de357611de26130ca565b5b81905092915050565b600060208284031215611e0257611e016130cf565b5b611e0c6020612baf565b90506000611e1c84828501611eed565b60008301525092915050565b600060208284031215611e3e57611e3d6130cf565b5b611e486020612baf565b9050600082013567ffffffffffffffff811115611e6857611e676130d4565b5b611e7484828501611d39565b60008301525092915050565b600060208284031215611e9657611e956130cf565b5b611ea06020612baf565b9050600082013567ffffffffffffffff811115611ec057611ebf6130d4565b5b611ecc84828501611e28565b60008301525092915050565b600081359050611ee781613150565b92915050565b600081359050611efc81613167565b92915050565b600060208284031215611f1857611f176130e8565b5b600082013567ffffffffffffffff811115611f3657611f356130e3565b5b611f4284828501611c29565b91505092915050565b600060208284031215611f6157611f606130e8565b5b600082013567ffffffffffffffff811115611f7f57611f7e6130e3565b5b611f8b84828501611c57565b91505092915050565b600060208284031215611faa57611fa96130e8565b5b6000611fb884828501611cb3565b91505092915050565b600060208284031215611fd757611fd66130e8565b5b6000611fe584828501611cf6565b91505092915050565b60008060408385031215612005576120046130e8565b5b600061201385828601611dcd565b925050602061202485828601611dcd565b9150509250929050565b600060208284031215612044576120436130e8565b5b600061205284828501611eed565b91505092915050565b600080600080600080600080610100898b03121561207c5761207b6130e8565b5b600061208a8b828c01611eed565b985050602089013567ffffffffffffffff8111156120ab576120aa6130e3565b5b6120b78b828c01611c57565b97505060406120c88b828c01611eed565b965050606089013567ffffffffffffffff8111156120e9576120e86130e3565b5b6120f58b828c01611c29565b95505060806121068b828c01611dec565b94505060a089013567ffffffffffffffff811115612127576121266130e3565b5b6121338b828c01611c85565b93505060c06121448b828c01611c09565b92505060e06121558b828c01611ed8565b9150509295985092959890939650565b600080600080600060a08688031215612181576121806130e8565b5b600061218f88828901611eed565b955050602086013567ffffffffffffffff8111156121b0576121af6130e3565b5b6121bc88828901611c57565b94505060406121cd88828901611eed565b935050606086013567ffffffffffffffff8111156121ee576121ed6130e3565b5b6121fa88828901611c29565b925050608086013567ffffffffffffffff81111561221b5761221a6130e3565b5b61222788828901611e28565b9150509295509295909350565b600080600080600060a086880312156122505761224f6130e8565b5b600061225e88828901611eed565b955050602086013567ffffffffffffffff81111561227f5761227e6130e3565b5b61228b88828901611c57565b945050604061229c88828901611eed565b935050606086013567ffffffffffffffff8111156122bd576122bc6130e3565b5b6122c988828901611c29565b925050608086013567ffffffffffffffff8111156122ea576122e96130e3565b5b6122f688828901611e80565b9150509295509295909350565b6000806040838503121561231a576123196130e8565b5b600061232885828601611eed565b925050602061233985828601611eed565b9150509250929050565b600061234f83836126e4565b905092915050565b60006123638383612756565b905092915050565b600061237783836127e5565b905092915050565b600061238b8383612857565b905092915050565b600061239f83836128d7565b60208301905092915050565b60006123b7838361290f565b60208301905092915050565b60006123cf8383612947565b60208301905092915050565b6123e481612eb3565b82525050565b60006123f582612d63565b6123ff8185612e21565b93508360208202850161241185612cba565b8060005b8581101561244d578484038952815161242e8582612343565b945061243983612dc6565b925060208a01995050600181019050612415565b50829750879550505050505092915050565b600061246a82612d6e565b6124748185612e21565b93508360208202850161248685612cca565b8060005b858110156124c1578484038952816124a28582612357565b94506124ad83612dd3565b925060208a0199505060018101905061248a565b50829750879550505050505092915050565b60006124de82612d79565b6124e88185612e32565b9350836020820285016124fa85612cdf565b8060005b858110156125365784840389528151612517858261236b565b945061252283612de0565b925060208a019950506001810190506124fe565b50829750879550505050505092915050565b600061255382612d84565b61255d8185612e32565b93508360208202850161256f85612cef565b8060005b858110156125aa5784840389528161258b858261237f565b945061259683612ded565b925060208a01995050600181019050612573565b50829750879550505050505092915050565b60006125c782612d8f565b6125d18185612e43565b93506125dc83612d04565b8060005b8381101561260d5781516125f48882612393565b97506125ff83612dfa565b9250506001810190506125e0565b5085935050505092915050565b600061262582612d9a565b61262f8185612e43565b935061263a83612d14565b8060005b8381101561266a578161265188826123ab565b975061265c83612e07565b92505060018101905061263e565b5085935050505092915050565b600061268282612da5565b61268c8185612e54565b935061269783612d29565b8060005b838110156126c85781516126af88826123c3565b97506126ba83612e14565b92505060018101905061269b565b5085935050505092915050565b6126de81612ec5565b82525050565b60006126ef82612db0565b6126f98185612e65565b9350612709818560208601612f3f565b612712816130ed565b840191505092915050565b600061272882612db0565b6127328185612e76565b9350612742818560208601612f3f565b61274b816130ed565b840191505092915050565b6000815461276381612f72565b61276d8186612e65565b94506001821660008114612788576001811461279a576127cd565b60ff19831686526020860193506127cd565b6127a385612d39565b60005b838110156127c5578154818901526001820191506020810190506127a6565b808801955050505b50505092915050565b6127df81612ed1565b82525050565b60006127f082612dbb565b6127fa8185612e87565b935061280a818560208601612f3f565b612813816130ed565b840191505092915050565b600061282982612dbb565b6128338185612e98565b9350612843818560208601612f3f565b61284c816130ed565b840191505092915050565b6000815461286481612f72565b61286e8186612e87565b94506001821660008114612889576001811461289b576128ce565b60ff19831686526020860193506128ce565b6128a485612d4e565b60005b838110156128c6578154818901526001820191506020810190506128a7565b808801955050505b50505092915050565b6020820160008201516128ed6000850182612947565b50505050565b6020820160008201516129096000850182612947565b50505050565b60208201600080830154905061292481612fa4565b6129316000860182612947565b5050505050565b61294181612edb565b82525050565b61295081612f26565b82525050565b61295f81612f26565b82525050565b600060208201905061297a60008301846123db565b92915050565b6000602082019050818103600083015261299a81846123ea565b905092915050565b600060208201905081810360008301526129bc818461245f565b905092915050565b600060208201905081810360008301526129de81846124d3565b905092915050565b60006020820190508181036000830152612a008184612548565b905092915050565b60006020820190508181036000830152612a2281846125bc565b905092915050565b60006020820190508181036000830152612a44818461261a565b905092915050565b6000602082019050612a6160008301846126d5565b92915050565b60006020820190508181036000830152612a81818461271d565b905092915050565b6000602082019050612a9e60008301846127d6565b92915050565b60006020820190508181036000830152612abe818461281e565b905092915050565b6000606082019050612adb60008301866128f3565b612ae860208301856123db565b612af56040830184612938565b949350505050565b6000602082019050612b126000830184612938565b92915050565b6000606082019050612b2d6000830186612938565b612b3a60208301856123db565b8181036040830152612b4c8184612677565b9050949350505050565b6000602082019050612b6b6000830184612956565b92915050565b6000606082019050612b866000830186612956565b612b9360208301856123db565b8181036040830152612ba58184612677565b9050949350505050565b6000612bb9612bca565b9050612bc58282612fbe565b919050565b6000604051905090565b600067ffffffffffffffff821115612bef57612bee613096565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612c1b57612c1a613096565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612c4757612c46613096565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612c7357612c72613096565b5b612c7c826130ed565b9050602081019050919050565b600067ffffffffffffffff821115612ca457612ca3613096565b5b612cad826130ed565b9050602081019050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000819050919050565b6000612ebe82612ee5565b9050919050565b60008115159050919050565b6000819050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612f5d578082015181840152602081019050612f42565b83811115612f6c576000848401525b50505050565b60006002820490506001821680612f8a57607f821691505b60208210811415612f9e57612f9d613067565b5b50919050565b6000612fb7612fb2836130fe565b612ea9565b9050919050565b612fc7826130ed565b810181811067ffffffffffffffff82111715612fe657612fe5613096565b5b80604052505050565b6000612ffa82612f26565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561302d5761302c613038565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b61311481612f05565b811461311f57600080fd5b50565b61312b81612ec5565b811461313657600080fd5b50565b61314281612ed1565b811461314d57600080fd5b50565b61315981612edb565b811461316457600080fd5b50565b61317081612f26565b811461317b57600080fd5b5056fea26474726f6e582212208c515e8fc58d67fd7b2b02bec89ffbaf8fc7e15ef09fa65dc7ff83c4c2ce15bf64736f6c63430008060033",
    },
    outputNameTest2: {
       /* pragma experimental ABIEncoderV2;

        contract contractTypesCall {
            bool stopped = false;
            int i = 32482989;
            int i2 = - 32482989;
            uint ui = 23487823;
            address origin = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
            bytes32 b32 = bytes32(uint256(0xdCad3a6d3569DF655070DEd0));
            bytes bs = new bytes(3);
            string s = "123qwe";
        enum ActionChoices {GoLeft, GoRight, GoStraight, SitStill}
            ActionChoices choice = ActionChoices.GoRight;
            int64[] b = [- 1, 2, - 3];
            uint32[2][] tmp_h = [[1, 2], [3, 4], [5, 6]];
            uint256[2][2] tmp_i = [[11, 22], [33, 44]];
            mapping(address => uint256) public mapa;
            mapping(uint => string[]) public map1;
            mapping(uint => bytes[]) public map2;

            trcToken tokens = 1000002;
            string[] strs = ["1","2","3"];
            bytes[] bys;

            event log(int);
            event log(uint);
            event log(bool);
            event log(address);
            event log(bytes32);
            event log(bytes);
            event log(string);
            event log(ActionChoices);
            event log(int64[]);
            event log(uint32[2][]);
            event log(uint256[2][2]);
            event log(bytes[]);
            event log(string[]);

            constructor(address addr,trcToken token,string[] memory strs,bytes[] memory bys) payable public{
                origin=addr;
                token=token;
                strs=strs;
                bys=bys;
            }

            function changeInt(int param) public returns (int intData){
                i = param;
                emit log(i);
                return i;
            }

            function getInt() public view returns (int intData){
                return i;
            }

            function changeUint(uint param) public returns (uint uintData){
                ui = param;
                emit log(ui);
                return ui;
            }

            function getUint() public view returns (uint uintData){
                return ui;
            }

            function changeAddress(address param) public returns (address addressData){
                origin = param;
                emit log(origin);
                return origin;
            }

            function getAddress() public view returns (address addressData){
                return origin;
            }

            function changeBytes32(bytes32 param) public returns (bytes32 bytes32Data){
                b32 = param;
                emit log(b32);
                return b32;
            }

            function getBytes32() public view returns (bytes32 bytes32Data){
                return b32;
            }

            function changeBytes(bytes memory param) public returns (bytes memory bytesData){
                bs = param;
                emit log(bs);
                return bs;
            }

            function getBytes() public view returns (bytes memory bytesData){
                return bs;
            }

            function changeString(string memory param) public returns (string memory stringData){
                s = param;
                emit log(s);
                return s;
            }

            function getString() public view returns (string memory stringData){
                return s;
            }

            function changeActionChoices(ActionChoices param) public returns (ActionChoices enumData){
                choice = param;
                emit log(choice);
                return choice;
            }

            function getActionChoices() public view returns (ActionChoices enumData){
                return choice;
            }

            function changeInt64NegativeArray(int64[] memory param) public returns (int64[] memory int64Data){
                b = param;
                emit log(b);
                return b;
            }

            function getInt64NegativeArray() public view returns (int64[] memory int64Data){
                return b;
            }

            function changeInt32Array(uint32[2][] memory param) public returns (uint32[2][] memory uint32ArrayData){
                tmp_h = param;
                emit log(tmp_h);
                return tmp_h;
            }

            function getInt32Array() public view returns (uint32[2][] memory uint32ArrayData){
                return tmp_h;
            }

            function changeInt256Array(uint256[2][2] memory param) public returns (uint256[2][2] memory uint256ArrayData){
                tmp_i = param;
                emit log(tmp_i);
                return tmp_i;
            }

            function getInt256Array() public view returns (uint256[2][2] memory uint256ArrayData){
                return tmp_i;
            }

            function setMappinga(uint256 param) public returns (uint256 uint256Data){
                mapa[msg.sender] = param;
                return mapa[msg.sender];
            }

            function getMappinga(address a) public view returns (uint256 uint256Data){
                return mapa[a];
            }
        }*/
        contractName: "outputNameTest2",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "trcToken",
                        "name": "token",
                        "type": "trcToken"
                    },
                    {
                        "internalType": "string[]",
                        "name": "strs",
                        "type": "string[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "bys",
                        "type": "bytes[]"
                    }
                ],
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int256",
                        "name": "",
                        "type": "int256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "int64[]",
                        "name": "",
                        "type": "int64[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint32[2][]",
                        "name": "",
                        "type": "uint32[2][]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256[2][2]",
                        "name": "",
                        "type": "uint256[2][2]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes[]",
                        "name": "",
                        "type": "bytes[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "name": "log",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "param",
                        "type": "uint8"
                    }
                ],
                "name": "changeActionChoices",
                "outputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "enumData",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "param",
                        "type": "address"
                    }
                ],
                "name": "changeAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "addressData",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes",
                        "name": "param",
                        "type": "bytes"
                    }
                ],
                "name": "changeBytes",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "bytesData",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "param",
                        "type": "bytes32"
                    }
                ],
                "name": "changeBytes32",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "bytes32Data",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int256",
                        "name": "param",
                        "type": "int256"
                    }
                ],
                "name": "changeInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "intData",
                        "type": "int256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "param",
                        "type": "uint256[2][2]"
                    }
                ],
                "name": "changeInt256Array",
                "outputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "uint256ArrayData",
                        "type": "uint256[2][2]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "param",
                        "type": "uint32[2][]"
                    }
                ],
                "name": "changeInt32Array",
                "outputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "uint32ArrayData",
                        "type": "uint32[2][]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "int64[]",
                        "name": "param",
                        "type": "int64[]"
                    }
                ],
                "name": "changeInt64NegativeArray",
                "outputs": [
                    {
                        "internalType": "int64[]",
                        "name": "int64Data",
                        "type": "int64[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "param",
                        "type": "string"
                    }
                ],
                "name": "changeString",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "stringData",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "param",
                        "type": "uint256"
                    }
                ],
                "name": "changeUint",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "uintData",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getActionChoices",
                "outputs": [
                    {
                        "internalType": "enum contractTypesCall.ActionChoices",
                        "name": "enumData",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "addressData",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBytes",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "bytesData",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBytes32",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "bytes32Data",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt",
                "outputs": [
                    {
                        "internalType": "int256",
                        "name": "intData",
                        "type": "int256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt256Array",
                "outputs": [
                    {
                        "internalType": "uint256[2][2]",
                        "name": "uint256ArrayData",
                        "type": "uint256[2][2]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt32Array",
                "outputs": [
                    {
                        "internalType": "uint32[2][]",
                        "name": "uint32ArrayData",
                        "type": "uint32[2][]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getInt64NegativeArray",
                "outputs": [
                    {
                        "internalType": "int64[]",
                        "name": "int64Data",
                        "type": "int64[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "a",
                        "type": "address"
                    }
                ],
                "name": "getMappinga",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "uint256Data",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getString",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "stringData",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getUint",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "uintData",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map1",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "map2",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "mapa",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "param",
                        "type": "uint256"
                    }
                ],
                "name": "setMappinga",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "uint256Data",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode:"608060405260008060006101000a81548160ff0219169083151502179055506301efa6ad6001557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe105953600255630166654f60035573dcad3a6d3569df655070ded06cb7a1b2ccd1d3af600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506bdcad3a6d3569df655070ded060001b600555600367ffffffffffffffff811115620000d857620000d762000f00565b5b6040519080825280601f01601f1916602001820160405280156200010b5781602001600182028036833780820191505090505b5060069080519060200190620001239291906200043e565b506040518060400160405280600681526020017f31323371776500000000000000000000000000000000000000000000000000008152506007908051906020019062000171929190620004cf565b506001600860006101000a81548160ff021916908360038111156200019b576200019a62000ea2565b5b021790555060405180606001604052807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60000b8152602001600260000b81526020017ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd60000b81525060099060036200021792919062000560565b5060405180606001604052806040518060400160405280600160ff168152602001600260ff1681525081526020016040518060400160405280600360ff168152602001600460ff1681525081526020016040518060400160405280600560ff168152602001600660ff16815250815250600a9060036200029992919062000626565b5060405180604001604052806040518060400160405280600b60ff168152602001601660ff1681525081526020016040518060400160405280602160ff168152602001602c60ff16815250815250600b906002620002f992919062000688565b50620f424260125560405180606001604052806040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f320000000000000000000000000000000000000000000000000000000000000081525081526020016040518060400160405280600181526020017f33000000000000000000000000000000000000000000000000000000000000008152508152506013906003620003cd929190620006df565b5060405162003f8438038062003f848339818101604052810190620003f3919062000bfe565b83600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505062000f8d565b8280546200044c9062000e36565b90600052602060002090601f016020900481019282620004705760008555620004bc565b82601f106200048b57805160ff1916838001178555620004bc565b82800160010185558215620004bc579182015b82811115620004bb5782518255916020019190600101906200049e565b5b509050620004cb919062000746565b5090565b828054620004dd9062000e36565b90600052602060002090601f0160209004810192826200050157600085556200054d565b82601f106200051c57805160ff19168380011785556200054d565b828001600101855582156200054d579182015b828111156200054c5782518255916020019190600101906200052f565b5b5090506200055c919062000746565b5090565b82805482825590600052602060002090600301600490048101928215620006135791602002820160005b83821115620005db57835183826101000a81548167ffffffffffffffff021916908360000b67ffffffffffffffff16021790555092602001926008016020816007010492830192600103026200058a565b8015620006115782816101000a81549067ffffffffffffffff0219169055600801602081600701049283019260010302620005db565b505b50905062000622919062000746565b5090565b82805482825590600052602060002090810192821562000675579160200282015b8281111562000674578251829060026200066392919062000765565b509160200191906001019062000647565b5b5090506200068491906200080c565b5090565b82600280028101928215620006cc579160200282015b82811115620006cb57825182906002620006ba92919062000834565b50916020019190600201906200069e565b5b509050620006db91906200087e565b5090565b82805482825590600052602060002090810192821562000733579160200282015b828111156200073257825182908051906020019062000721929190620004cf565b509160200191906001019062000700565b5b509050620007429190620008a6565b5090565b5b808211156200076157600081600090555060010162000747565b5090565b826002600701600890048101928215620007f95791602002820160005b83821115620007c557835183826101000a81548163ffffffff021916908360ff160217905550926020019260040160208160030104928301926001030262000782565b8015620007f75782816101000a81549063ffffffff0219169055600401602081600301049283019260010302620007c5565b505b50905062000808919062000746565b5090565b5b80821115620008305760008181620008269190620008ce565b506001016200080d565b5090565b82600281019282156200086b579160200282015b828111156200086a578251829060ff1690559160200191906001019062000848565b5b5090506200087a919062000746565b5090565b5b80821115620008a25760008181620008989190620008d5565b506002016200087f565b5090565b5b80821115620008ca5760008181620008c09190620008e3565b50600101620008a7565b5090565b5060009055565b506000815560010160009055565b508054620008f19062000e36565b6000825580601f1062000905575062000926565b601f01602090049060005260206000209081019062000925919062000746565b5b50565b6000620009406200093a8462000cd7565b62000cae565b9050808382526020820190508285602086028201111562000966576200096562000f34565b5b60005b85811015620009bb57815167ffffffffffffffff81111562000990576200098f62000f2f565b5b8086016200099f898262000b81565b8552602085019450602084019350505060018101905062000969565b5050509392505050565b6000620009dc620009d68462000d06565b62000cae565b9050808382526020820190508285602086028201111562000a025762000a0162000f34565b5b60005b8581101562000a5757815167ffffffffffffffff81111562000a2c5762000a2b62000f2f565b5b80860162000a3b898262000bb4565b8552602085019450602084019350505060018101905062000a05565b5050509392505050565b600062000a7862000a728462000d35565b62000cae565b90508281526020810184848401111562000a975762000a9662000f39565b5b62000aa484828562000e00565b509392505050565b600062000ac362000abd8462000d6b565b62000cae565b90508281526020810184848401111562000ae25762000ae162000f39565b5b62000aef84828562000e00565b509392505050565b60008151905062000b088162000f59565b62000b138162000da1565b905092915050565b600082601f83011262000b335762000b3262000f2f565b5b815162000b4584826020860162000929565b91505092915050565b600082601f83011262000b665762000b6562000f2f565b5b815162000b78848260208601620009c5565b91505092915050565b600082601f83011262000b995762000b9862000f2f565b5b815162000bab84826020860162000a61565b91505092915050565b600082601f83011262000bcc5762000bcb62000f2f565b5b815162000bde84826020860162000aac565b91505092915050565b60008151905062000bf88162000f73565b92915050565b6000806000806080858703121562000c1b5762000c1a62000f43565b5b600062000c2b8782880162000af7565b945050602062000c3e8782880162000be7565b935050604085015167ffffffffffffffff81111562000c625762000c6162000f3e565b5b62000c708782880162000b4e565b925050606085015167ffffffffffffffff81111562000c945762000c9362000f3e565b5b62000ca28782880162000b1b565b91505092959194509250565b600062000cba62000ccd565b905062000cc8828262000e6c565b919050565b6000604051905090565b600067ffffffffffffffff82111562000cf55762000cf462000f00565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000d245762000d2362000f00565b5b602082029050602081019050919050565b600067ffffffffffffffff82111562000d535762000d5262000f00565b5b62000d5e8262000f48565b9050602081019050919050565b600067ffffffffffffffff82111562000d895762000d8862000f00565b5b62000d948262000f48565b9050602081019050919050565b600062000dae8262000dbf565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b8381101562000e2057808201518184015260208101905062000e03565b8381111562000e30576000848401525b50505050565b6000600282049050600182168062000e4f57607f821691505b6020821081141562000e665762000e6562000ed1565b5b50919050565b62000e778262000f48565b810181811067ffffffffffffffff8211171562000e995762000e9862000f00565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b62000f648162000ddf565b811462000f7057600080fd5b50565b62000f7e8162000db5565b811462000f8a57600080fd5b50565b612fe78062000f9d6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061018c5760003560e01c80635dd8e1c9116100f8578063bcc0351a116100b1578063f1676e051161008b578063f1676e05146104cd578063f9632ae7146104fd578063fe64d6ff1461052d578063ff51980b1461055d5761018c565b8063bcc0351a1461044f578063c11879691461047f578063da8ee0bc146104af5761018c565b80635dd8e1c91461036557806362738998146103955780637d5ce2f0146103b357806389ea642f146103d15780639e0c5f22146103ef578063a0e29df61461041f5761018c565b8063366121811161014a578063366121811461027b57806336d98083146102ab57806338cc4831146102c95780633ac387d2146102e75780633cbf8c281461031757806348e357ea146103475761018c565b80620267a414610191578063078799b3146101af5780630bcd3b33146101df57806311c8aec0146101fd5780631f659d8c1461022d5780631f9030371461025d575b600080fd5b61019961058d565b6040516101a69190612793565b60405180910390f35b6101c960048036038101906101c49190611a88565b610597565b6040516101d691906125fc565b60405180910390f35b6101e7610666565b6040516101f491906126d5565b60405180910390f35b61021760048036038101906102129190611c60565b6106f8565b6040516102249190612793565b60405180910390f35b61024760048036038101906102429190611c8d565b610785565b60405161025491906126d5565b60405180910390f35b61026561083e565b60405161027291906126ba565b60405180910390f35b61029560048036038101906102909190611ab5565b610848565b6040516102a29190612632565b60405180910390f35b6102b3610951565b6040516102c09190612719565b60405180910390f35b6102d1610968565b6040516102de91906125e1565b60405180910390f35b61030160048036038101906102fc9190611b47565b610992565b60405161030e91906126ba565b60405180910390f35b610331600480360381019061032c9190611c8d565b6109de565b60405161033e919061274f565b60405180910390f35b61034f610a97565b60405161035c9190612676565b60405180910390f35b61037f600480360381019061037a9190611c17565b610b15565b60405161038c919061274f565b60405180910390f35b61039d610bf8565b6040516103aa9190612734565b60405180910390f35b6103bb610c02565b6040516103c891906125fc565b60405180910390f35b6103d9610c85565b6040516103e6919061274f565b60405180910390f35b61040960048036038101906104049190611bbd565b610d17565b6040516104169190612719565b60405180910390f35b61043960048036038101906104349190611c60565b610da0565b6040516104469190612793565b60405180910390f35b61046960048036038101906104649190611afe565b610dec565b6040516104769190612676565b60405180910390f35b61049960048036038101906104949190611a5b565b610ebb565b6040516104a69190612793565b60405180910390f35b6104b7610ed3565b6040516104c49190612632565b60405180910390f35b6104e760048036038101906104e29190611bea565b610f8b565b6040516104f49190612734565b60405180910390f35b61051760048036038101906105129190611b74565b610fd7565b60405161052491906126d5565b60405180910390f35b61054760048036038101906105429190611a5b565b6110ba565b60405161055491906125e1565b60405180910390f35b61057760048036038101906105729190611a5b565b611180565b6040516105849190612793565b60405180910390f35b6000600354905090565b61059f6111c9565b81600b9060026105b09291906111f6565b507f7243a5c57e9004f964b64f34645d5d6039cc92f9610f0529f249a30f4c5d1ff7600b6040516105e19190612617565b60405180910390a1600b600280602002604051908101604052809291906000905b8282101561065b57838260020201600280602002604051908101604052809291908260028015610647576020028201915b815481526020019060010190808311610633575b505050505081526020019060010190610602565b505050509050919050565b60606006805461067590612c1c565b80601f01602080910402602001604051908101604052809291908181526020018280546106a190612c1c565b80156106ee5780601f106106c3576101008083540402835291602001916106ee565b820191906000526020600020905b8154815290600101906020018083116106d157829003601f168201915b5050505050905090565b600081600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b601160205281600052604060002081815481106107a157600080fd5b906000526020600020016000915091505080546107bd90612c1c565b80601f01602080910402602001604051908101604052809291908181526020018280546107e990612c1c565b80156108365780601f1061080b57610100808354040283529160200191610836565b820191906000526020600020905b81548152906001019060200180831161081957829003601f168201915b505050505081565b6000600554905090565b606081600a9080519060200190610860929190611246565b507fdca1bb120a4e1b84b5482f833b8e3ea7e92c3be62a16e90611058106e4332e58600a6040516108919190612654565b60405180910390a1600a805480602002602001604051908101604052809291908181526020016000905b8282101561094657838290600052602060002001600280602002604051908101604052809291908260028015610932576020028201916000905b82829054906101000a900463ffffffff1663ffffffff16815260200190600401906020826003010492830192600103820291508084116108f55790505b5050505050815260200190600101906108bb565b505050509050919050565b6000600860009054906101000a900460ff16905090565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000816005819055507f27b7cf8513ac6b65cae720183e1e60e67f8a9d92c01286c19d51d4e30aa269da6005546040516109cc91906126ba565b60405180910390a16005549050919050565b601060205281600052604060002081815481106109fa57600080fd5b90600052602060002001600091509150508054610a1690612c1c565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4290612c1c565b8015610a8f5780601f10610a6457610100808354040283529160200191610a8f565b820191906000526020600020905b815481529060010190602001808311610a7257829003601f168201915b505050505081565b60606009805480602002602001604051908101604052809291908181526020018280548015610b0b57602002820191906000526020600020906000905b82829054906101000a900460070b60070b81526020019060080190602082600701049283019260010382029150808411610ad45790505b5050505050905090565b60608160079080519060200190610b2d9291906112a1565b507f41304facd9323d75b11bcdd609cb38effffdb05710f7caf0e9b16c6d9d709f506007604051610b5e9190612771565b60405180910390a160078054610b7390612c1c565b80601f0160208091040260200160405190810160405280929190818152602001828054610b9f90612c1c565b8015610bec5780601f10610bc157610100808354040283529160200191610bec565b820191906000526020600020905b815481529060010190602001808311610bcf57829003601f168201915b50505050509050919050565b6000600154905090565b610c0a6111c9565b600b600280602002604051908101604052809291906000905b82821015610c7c57838260020201600280602002604051908101604052809291908260028015610c68576020028201915b815481526020019060010190808311610c54575b505050505081526020019060010190610c23565b50505050905090565b606060078054610c9490612c1c565b80601f0160208091040260200160405190810160405280929190818152602001828054610cc090612c1c565b8015610d0d5780601f10610ce257610100808354040283529160200191610d0d565b820191906000526020600020905b815481529060010190602001808311610cf057829003601f168201915b5050505050905090565b600081600860006101000a81548160ff02191690836003811115610d3e57610d3d612dd1565b5b02179055507f5ddf586f10053ca0b2028c82acf5cde750bc7c084e1171f639ec37da3aa87196600860009054906101000a900460ff16604051610d819190612719565b60405180910390a1600860009054906101000a900460ff169050919050565b6000816003819055507ff82c50f1848136e6c140b186ea0c768b7deda5efffe42c25e96336a90b26c744600354604051610dda9190612793565b60405180910390a16003549050919050565b60608160099080519060200190610e04929190611327565b507f0aaee4b5e3ebacf33d494e3b60f9e6ca64f7e9166f36c23367988afa575a9ab06009604051610e359190612698565b60405180910390a16009805480602002602001604051908101604052809291908181526020018280548015610eaf57602002820191906000526020600020906000905b82829054906101000a900460070b60070b81526020019060080190602082600701049283019260010382029150808411610e785790505b50505050509050919050565b600f6020528060005260406000206000915090505481565b6060600a805480602002602001604051908101604052809291908181526020016000905b82821015610f8257838290600052602060002001600280602002604051908101604052809291908260028015610f6e576020028201916000905b82829054906101000a900463ffffffff1663ffffffff1681526020019060040190602082600301049283019260010382029150808411610f315790505b505050505081526020019060010190610ef7565b50505050905090565b6000816001819055507f2d5b6cb95ba2d00a93cd4ffa61ec07ef4bb1694f20c02a3cccb170a38df81ef8600154604051610fc59190612734565b60405180910390a16001549050919050565b60608160069080519060200190610fef9291906113e6565b507f0be77f5642494da7d212b92a3472c4f471abb24e17467f41788e7de7915d6238600660405161102091906126f7565b60405180910390a16006805461103590612c1c565b80601f016020809104026020016040519081016040528092919081815260200182805461106190612c1c565b80156110ae5780601f10611083576101008083540402835291602001916110ae565b820191906000526020600020905b81548152906001019060200180831161109157829003601f168201915b50505050509050919050565b600081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f2c2ecbc2212ac38c2f9ec89aa5fcef7f532a5db24dbf7cad1f48bc82843b7428600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161114e91906125e1565b60405180910390a1600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60405180604001604052806002905b6111e061146c565b8152602001906001900390816111d85790505090565b82600280028101928215611235579160200282015b828111156112345782518290600261122492919061148e565b509160200191906002019061120b565b5b50905061124291906114ce565b5090565b828054828255906000526020600020908101928215611290579160200282015b8281111561128f5782518290600261127f9291906114f2565b5091602001919060010190611266565b5b50905061129d9190611595565b5090565b8280546112ad90612c1c565b90600052602060002090601f0160209004810192826112cf5760008555611316565b82601f106112e857805160ff1916838001178555611316565b82800160010185558215611316579182015b828111156113155782518255916020019190600101906112fa565b5b50905061132391906115b9565b5090565b828054828255906000526020600020906003016004900481019282156113d55791602002820160005b8382111561139f57835183826101000a81548167ffffffffffffffff021916908360070b67ffffffffffffffff1602179055509260200192600801602081600701049283019260010302611350565b80156113d35782816101000a81549067ffffffffffffffff021916905560080160208160070104928301926001030261139f565b505b5090506113e291906115b9565b5090565b8280546113f290612c1c565b90600052602060002090601f016020900481019282611414576000855561145b565b82601f1061142d57805160ff191683800117855561145b565b8280016001018555821561145b579182015b8281111561145a57825182559160200191906001019061143f565b5b50905061146891906115b9565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b82600281019282156114bd579160200282015b828111156114bc5782518255916020019190600101906114a1565b5b5090506114ca91906115b9565b5090565b5b808211156114ee57600081816114e591906115d6565b506002016114cf565b5090565b8260026007016008900481019282156115845791602002820160005b8382111561155257835183826101000a81548163ffffffff021916908363ffffffff160217905550926020019260040160208160030104928301926001030261150e565b80156115825782816101000a81549063ffffffff0219169055600401602081600301049283019260010302611552565b505b50905061159191906115b9565b5090565b5b808211156115b557600081816115ac91906115e4565b50600101611596565b5090565b5b808211156115d25760008160009055506001016115ba565b5090565b506000815560010160009055565b5060009055565b60006115fe6115f9846127d3565b6127ae565b9050808285604086028201111561161857611617612e76565b5b60005b85811015611648578161162e888261192b565b84526020840193506040830192505060018101905061161b565b5050509392505050565b6000611665611660846127f9565b6127ae565b9050808382526020820190508285604086028201111561168857611687612e76565b5b60005b858110156116b8578161169e8882611956565b84526020840193506040830192505060018101905061168b565b5050509392505050565b60006116d56116d084612825565b6127ae565b905080838252602082019050828560208602820111156116f8576116f7612e76565b5b60005b85811015611728578161170e88826119ee565b8452602084019350602083019250506001810190506116fb565b5050509392505050565b600061174561174084612851565b6127ae565b9050808285602086028201111561175f5761175e612e76565b5b60005b8581101561178f57816117758882611a31565b845260208401935060208301925050600181019050611762565b5050509392505050565b60006117ac6117a784612877565b6127ae565b905080828560208602820111156117c6576117c5612e76565b5b60005b858110156117f657816117dc8882611a46565b8452602084019350602083019250506001810190506117c9565b5050509392505050565b600061181361180e8461289d565b6127ae565b90508281526020810184848401111561182f5761182e612e7b565b5b61183a848285612bda565b509392505050565b6000611855611850846128ce565b6127ae565b90508281526020810184848401111561187157611870612e7b565b5b61187c848285612bda565b509392505050565b60008135905061189381612f17565b61189c81612b27565b905092915050565b600082601f8301126118b9576118b8612e71565b5b60026118c68482856115eb565b91505092915050565b600082601f8301126118e4576118e3612e71565b5b81356118f4848260208601611652565b91505092915050565b600082601f83011261191257611911612e71565b5b81356119228482602086016116c2565b91505092915050565b600082601f8301126119405761193f612e71565b5b600261194d848285611732565b91505092915050565b600082601f83011261196b5761196a612e71565b5b6002611978848285611799565b91505092915050565b60008135905061199081612f2e565b92915050565b600082601f8301126119ab576119aa612e71565b5b81356119bb848260208601611800565b91505092915050565b6000813590506119d381612f45565b92915050565b6000813590506119e881612f55565b92915050565b6000813590506119fd81612f6c565b92915050565b600082601f830112611a1857611a17612e71565b5b8135611a28848260208601611842565b91505092915050565b600081359050611a4081612f83565b92915050565b600081359050611a5581612f9a565b92915050565b600060208284031215611a7157611a70612e85565b5b6000611a7f84828501611884565b91505092915050565b600060808284031215611a9e57611a9d612e85565b5b6000611aac848285016118a4565b91505092915050565b600060208284031215611acb57611aca612e85565b5b600082013567ffffffffffffffff811115611ae957611ae8612e80565b5b611af5848285016118cf565b91505092915050565b600060208284031215611b1457611b13612e85565b5b600082013567ffffffffffffffff811115611b3257611b31612e80565b5b611b3e848285016118fd565b91505092915050565b600060208284031215611b5d57611b5c612e85565b5b6000611b6b84828501611981565b91505092915050565b600060208284031215611b8a57611b89612e85565b5b600082013567ffffffffffffffff811115611ba857611ba7612e80565b5b611bb484828501611996565b91505092915050565b600060208284031215611bd357611bd2612e85565b5b6000611be1848285016119c4565b91505092915050565b600060208284031215611c0057611bff612e85565b5b6000611c0e848285016119d9565b91505092915050565b600060208284031215611c2d57611c2c612e85565b5b600082013567ffffffffffffffff811115611c4b57611c4a612e80565b5b611c5784828501611a03565b91505092915050565b600060208284031215611c7657611c75612e85565b5b6000611c8484828501611a31565b91505092915050565b60008060408385031215611ca457611ca3612e85565b5b6000611cb285828601611a31565b9250506020611cc385828601611a31565b9150509250929050565b6000611cd983836120ac565b60408301905092915050565b6000611cf18383612103565b60408301905092915050565b6000611d098383612161565b60408301905092915050565b6000611d2183836121b8565b60408301905092915050565b6000611d3983836124ec565b60208301905092915050565b6000611d5183836125b4565b60208301905092915050565b6000611d6983836125d2565b60208301905092915050565b611d7e81612b27565b82525050565b611d8d816129af565b611d978184612a9b565b9250611da2826128ff565b8060005b83811015611dd3578151611dba8782611ccd565b9650611dc583612a33565b925050600181019050611da6565b505050505050565b611de4816129ba565b611dee8184612a9b565b9250611df982612909565b8060005b83811015611e295781611e108782611ce5565b9650611e1b83612a40565b925050600181019050611dfd565b505050505050565b6000611e3c826129c5565b611e468185612aa6565b9350611e5183612913565b8060005b83811015611e82578151611e698882611cfd565b9750611e7483612a4d565b925050600181019050611e55565b5085935050505092915050565b6000611e9a826129d0565b611ea48185612aa6565b9350611eaf83612923565b8060005b83811015611edf5781611ec68882611d15565b9750611ed183612a5a565b925050600181019050611eb3565b5085935050505092915050565b6000611ef7826129db565b611f018185612ab7565b9350611f0c83612938565b8060005b83811015611f3d578151611f248882611d2d565b9750611f2f83612a67565b925050600181019050611f10565b5085935050505092915050565b6000611f55826129e6565b611f5f8185612ab7565b935083611f6b84612948565b6000600115611ff8575b83600160040382011015611ff7578154611f9788611f9283612c4e565b6124ec565b602088019750611faf88611faa83612d6c565b6124ec565b602088019750611fc788611fc283612cb6565b6124ec565b602088019750611fdf88611fda83612d04565b6124ec565b60208801975060018301925050600481019050611f75565b5b60011561209f578154848210156120285761201b8861201683612c4e565b6124ec565b6020880197506001820191505b8482101561204f576120428861203d83612d6c565b6124ec565b6020880197506001820191505b84821015612076576120698861206483612cb6565b6124ec565b6020880197506001820191505b8482101561209d576120908861208b83612d04565b6124ec565b6020880197506001820191505b505b8694505050505092915050565b6120b5816129f1565b6120bf8184612ac8565b92506120ca8261295d565b8060005b838110156120fb5781516120e28782611d45565b96506120ed83612a74565b9250506001810190506120ce565b505050505050565b61210c816129fc565b6121168184612ac8565b925061212182612967565b8060005b838110156121595761213682612e5e565b6121408782611d45565b965061214b83612a81565b925050600181019050612125565b505050505050565b61216a81612a07565b6121748184612ad3565b925061217f82612971565b8060005b838110156121b05781516121978782611d5d565b96506121a283612a8e565b925050600181019050612183565b505050505050565b6121c181612a12565b6121cb8184612ad3565b9250826121d78361297b565b600080156122c3575b836001600803820110156122c2578154612202876121fd83612c82565b6125d2565b60208701965061221a8761221583612d52565b6125d2565b6020870196506122328761222d83612d86565b6125d2565b60208701965061224a8761224583612c9c565b6125d2565b6020870196506122628761225d83612cd0565b6125d2565b60208701965061227a8761227583612cea565b6125d2565b6020870196506122928761228d83612d1e565b6125d2565b6020870196506122aa876122a583612d38565b6125d2565b602087019650600183019250506008810190506121e0565b5b6001156123fe5781546001156122f2576122e5876122e083612c82565b6125d2565b6020870196506001820191505b6001156123185761230b8761230683612d52565b6125d2565b6020870196506001820191505b60001561233e576123318761232c83612d86565b6125d2565b6020870196506001820191505b600015612364576123578761235283612c9c565b6125d2565b6020870196506001820191505b60001561238a5761237d8761237883612cd0565b6125d2565b6020870196506001820191505b6000156123b0576123a38761239e83612cea565b6125d2565b6020870196506001820191505b6000156123d6576123c9876123c483612d1e565b6125d2565b6020870196506001820191505b6000156123fc576123ef876123ea83612d38565b6125d2565b6020870196506001820191505b505b505050505050565b61240f81612b39565b82525050565b600061242082612a1d565b61242a8185612ade565b935061243a818560208601612be9565b61244381612e8a565b840191505092915050565b6000815461245b81612c1c565b6124658186612ade565b945060018216600081146124805760018114612492576124c5565b60ff19831686526020860193506124c5565b61249b85612985565b60005b838110156124bd5781548189015260018201915060208101905061249e565b808801955050505b50505092915050565b6124d781612bc8565b82525050565b6124e681612b56565b82525050565b6124f581612b60565b82525050565b600061250682612a28565b6125108185612aef565b9350612520818560208601612be9565b61252981612e8a565b840191505092915050565b6000815461254181612c1c565b61254b8186612aef565b945060018216600081146125665760018114612578576125ab565b60ff19831686526020860193506125ab565b6125818561299a565b60005b838110156125a357815481890152600182019150602081019050612584565b808801955050505b50505092915050565b6125bd81612bae565b82525050565b6125cc81612bae565b82525050565b6125db81612bb8565b82525050565b60006020820190506125f66000830184611d75565b92915050565b60006080820190506126116000830184611d84565b92915050565b600060808201905061262c6000830184611ddb565b92915050565b6000602082019050818103600083015261264c8184611e31565b905092915050565b6000602082019050818103600083015261266e8184611e8f565b905092915050565b600060208201905081810360008301526126908184611eec565b905092915050565b600060208201905081810360008301526126b28184611f4a565b905092915050565b60006020820190506126cf6000830184612406565b92915050565b600060208201905081810360008301526126ef8184612415565b905092915050565b60006020820190508181036000830152612711818461244e565b905092915050565b600060208201905061272e60008301846124ce565b92915050565b600060208201905061274960008301846124dd565b92915050565b6000602082019050818103600083015261276981846124fb565b905092915050565b6000602082019050818103600083015261278b8184612534565b905092915050565b60006020820190506127a860008301846125c3565b92915050565b60006127b86127c9565b90506127c48282612da0565b919050565b6000604051905090565b600067ffffffffffffffff8211156127ee576127ed612e2f565b5b602082029050919050565b600067ffffffffffffffff82111561281457612813612e2f565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156128405761283f612e2f565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561286c5761286b612e2f565b5b602082029050919050565b600067ffffffffffffffff82111561289257612891612e2f565b5b602082029050919050565b600067ffffffffffffffff8211156128b8576128b7612e2f565b5b6128c182612e8a565b9050602081019050919050565b600067ffffffffffffffff8211156128e9576128e8612e2f565b5b6128f282612e8a565b9050602081019050919050565b6000819050919050565b6000819050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050919050565b6000819050919050565b6000819050919050565b6000819050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600060029050919050565b600060029050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600060029050919050565b600060029050919050565b600060029050919050565b600060029050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600282019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b60008160070b9050919050565b6000819050919050565b600063ffffffff82169050919050565b6000612b3282612b6d565b9050919050565b6000819050919050565b6000819050612b5182612f03565b919050565b6000819050919050565b60008160070b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b6000612bd382612b43565b9050919050565b82818337600083830152505050565b60005b83811015612c07578082015181840152602081019050612bec565b83811115612c16576000848401525b50505050565b60006002820490506001821680612c3457607f821691505b60208210811415612c4857612c47612e00565b5b50919050565b6000612c61612c5c83612e9b565b612b00565b9050919050565b6000612c7b612c7683612e9b565b612b0d565b9050919050565b6000612c95612c9083612e9b565b612b17565b9050919050565b6000612caf612caa83612ef6565b612b17565b9050919050565b6000612cc9612cc483612ea8565b612b00565b9050919050565b6000612ce3612cde83612ea8565b612b17565b9050919050565b6000612cfd612cf883612eb5565b612b17565b9050919050565b6000612d17612d1283612ec2565b612b00565b9050919050565b6000612d31612d2c83612ec2565b612b17565b9050919050565b6000612d4b612d4683612ecf565b612b17565b9050919050565b6000612d65612d6083612edc565b612b17565b9050919050565b6000612d7f612d7a83612ee9565b612b00565b9050919050565b6000612d99612d9483612ee9565b612b17565b9050919050565b612da982612e8a565b810181811067ffffffffffffffff82111715612dc857612dc7612e2f565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000612e6a8254612c68565b9050919050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b60008160801c9050919050565b60008160a01c9050919050565b60008160c01c9050919050565b60008160e01c9050919050565b60008160201c9050919050565b60008160401c9050919050565b60008160601c9050919050565b60048110612f1457612f13612dd1565b5b50565b612f2081612b8d565b8114612f2b57600080fd5b50565b612f3781612b39565b8114612f4257600080fd5b50565b60048110612f5257600080fd5b50565b612f5e81612b56565b8114612f6957600080fd5b50565b612f7581612b60565b8114612f8057600080fd5b50565b612f8c81612bae565b8114612f9757600080fd5b50565b612fa381612bb8565b8114612fae57600080fd5b5056fea26474726f6e582212201942d5f704c3e287319d938d5bf874ab15dfe7e994cff197612a13ff916e399464736f6c63430008060033"
    },
    testConstantParameters: {
        "contractName": "testConstantParameters",
            "abi": [
            {
                "inputs": [],
                "name": "getm",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokenValue",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokenid",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
            "bytecode": "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506101a08061003a6000396000f3fe6080604052600436106100345760003560e01c80631ec7e34514610039578063785d06f51461007e5780637d6aab0a1461009d575b600080fd5b34801561004557600080fd5b50d3801561005257600080fd5b50d2801561005f57600080fd5b506100686100e2565b604051610075919061011c565b60405180910390f35b6100866100e8565b604051610094929190610137565b60405180910390f35b3480156100a957600080fd5b50d380156100b657600080fd5b50d280156100c357600080fd5b506100cc610107565b6040516100d9919061011c565b60405180910390f35b60015481565b600080d3600081905550d2600181905550600154600054915091509091565b60005481565b61011681610160565b82525050565b6000602082019050610131600083018461010d565b92915050565b600060408201905061014c600083018561010d565b610159602083018461010d565b9392505050565b600081905091905056fea26474726f6e58221220ba3836dfa3c05991716d429ab90ab838a07c35673846cdba2dec6ac369197d3064736f6c63430008060033"
    },
    typedDataTest1:{
        // SPDX-License-Identifier: MIT
        //
        // pragma solidity ^0.8.0;
        //
        // /**
        //  * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
        //  *
        //  * These functions can be used to verify that a message was signed by the holder
        //  * of the private keys of a given address.
        //  */
        // library ECDSA {
        //     enum RecoverError {
        //         NoError,
        //         InvalidSignature,
        //         InvalidSignatureLength,
        //         InvalidSignatureS,
        //         InvalidSignatureV
        //     }
        //
        //     function _throwError(RecoverError error) private pure {
        //         if (error == RecoverError.NoError) {
        //             return; // no error: do nothing
        //         } else if (error == RecoverError.InvalidSignature) {
        //             revert("ECDSA: invalid signature");
        //         } else if (error == RecoverError.InvalidSignatureLength) {
        //             revert("ECDSA: invalid signature length");
        //         } else if (error == RecoverError.InvalidSignatureS) {
        //             revert("ECDSA: invalid signature 's' value");
        //         } else if (error == RecoverError.InvalidSignatureV) {
        //             revert("ECDSA: invalid signature 'v' value");
        //         }
        //     }
        //
        //     /**
        //      * @dev Returns the address that signed a hashed message (`hash`) with
        //      * `signature` or error string. This address can then be used for verification purposes.
        //      *
        //      * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //      * this function rejects them by requiring the `s` value to be in the lower
        //      * half order, and the `v` value to be either 27 or 28.
        //      *
        //      * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //      * verification to be secure: it is possible to craft signatures that
        //      * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //      * this is by receiving a hash of the original message (which may otherwise
        //      * be too long), and then calling {toEthSignedMessageHash} on it.
        //      *
        //      * Documentation for signature generation:
        //      * - with https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js]
        //      * - with https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers]
        //      *
        //      * _Available since v4.3._
        //      */
        //     function tryRecover(bytes32 hash, bytes memory signature)
        //         internal
        //         pure
        //         returns (address, RecoverError)
        //     {
        //         // Check the signature length
        //         // - case 65: r,s,v signature (standard)
        //         // - case 64: r,vs signature (cf https://eips.ethereum.org/EIPS/eip-2098) _Available since v4.1._
        //         if (signature.length == 65) {
        //             bytes32 r;
        //             bytes32 s;
        //             uint8 v;
        //             // ecrecover takes the signature parameters, and the only way to get them
        //             // currently is to use assembly.
        //             /// @solidity memory-safe-assembly
        //             assembly {
        //                 r := mload(add(signature, 0x20))
        //                 s := mload(add(signature, 0x40))
        //                 v := byte(0, mload(add(signature, 0x60)))
        //             }
        //             return tryRecover(hash, v, r, s);
        //         } else if (signature.length == 64) {
        //             bytes32 r;
        //             bytes32 vs;
        //             // ecrecover takes the signature parameters, and the only way to get them
        //             // currently is to use assembly.
        //             /// @solidity memory-safe-assembly
        //             assembly {
        //                 r := mload(add(signature, 0x20))
        //                 vs := mload(add(signature, 0x40))
        //             }
        //             return tryRecover(hash, r, vs);
        //         } else {
        //             return (address(0), RecoverError.InvalidSignatureLength);
        //         }
        //     }
        //
        //     /**
        //      * @dev Returns the address that signed a hashed message (`hash`) with
        //      * `signature`. This address can then be used for verification purposes.
        //      *
        //      * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //      * this function rejects them by requiring the `s` value to be in the lower
        //      * half order, and the `v` value to be either 27 or 28.
        //      *
        //      * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //      * verification to be secure: it is possible to craft signatures that
        //      * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //      * this is by receiving a hash of the original message (which may otherwise
        //      * be too long), and then calling {toEthSignedMessageHash} on it.
        //      */
        //     function recover(bytes32 hash, bytes memory signature)
        //         internal
        //         pure
        //         returns (address)
        //     {
        //         (address recovered, RecoverError error) = tryRecover(hash, signature);
        //         _throwError(error);
        //         return recovered;
        //     }
        //
        //     /**
        //      * @dev Overload of {ECDSA-tryRecover} that receives the `r` and `vs` short-signature fields separately.
        //      *
        //      * See https://eips.ethereum.org/EIPS/eip-2098[EIP-2098 short signatures]
        //      *
        //      * _Available since v4.3._
        //      */
        //     function tryRecover(
        //         bytes32 hash,
        //         bytes32 r,
        //         bytes32 vs
        //     ) internal pure returns (address, RecoverError) {
        //         bytes32 s = vs &
        //             bytes32(
        //                 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        //             );
        //         uint8 v = uint8((uint256(vs) >> 255) + 27);
        //         return tryRecover(hash, v, r, s);
        //     }
        //
        //     /**
        //      * @dev Overload of {ECDSA-recover} that receives the `r and `vs` short-signature fields separately.
        //      *
        //      * _Available since v4.2._
        //      */
        //     function recover(
        //         bytes32 hash,
        //         bytes32 r,
        //         bytes32 vs
        //     ) internal pure returns (address) {
        //         (address recovered, RecoverError error) = tryRecover(hash, r, vs);
        //         _throwError(error);
        //         return recovered;
        //     }
        //
        //     /**
        //      * @dev Overload of {ECDSA-tryRecover} that receives the `v`,
        //      * `r` and `s` signature fields separately.
        //      *
        //      * _Available since v4.3._
        //      */
        //     function tryRecover(
        //         bytes32 hash,
        //         uint8 v,
        //         bytes32 r,
        //         bytes32 s
        //     ) internal pure returns (address, RecoverError) {
        //         // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        //         // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        //         // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        //         // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //         //
        //         // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        //         // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        //         // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        //         // these malleable signatures as well.
        //         if (
        //             uint256(s) >
        //             0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        //         ) {
        //             return (address(0), RecoverError.InvalidSignatureS);
        //         }
        //         if (v != 27 && v != 28) {
        //             return (address(0), RecoverError.InvalidSignatureV);
        //         }
        //
        //         // If the signature is valid (and not malleable), return the signer address
        //         address signer = ecrecover(hash, v, r, s);
        //         if (signer == address(0)) {
        //             return (address(0), RecoverError.InvalidSignature);
        //         }
        //
        //         return (signer, RecoverError.NoError);
        //     }
        //
        //     /**
        //      * @dev Overload of {ECDSA-recover} that receives the `v`,
        //      * `r` and `s` signature fields separately.
        //      */
        //     function recover(
        //         bytes32 hash,
        //         uint8 v,
        //         bytes32 r,
        //         bytes32 s
        //     ) internal pure returns (address) {
        //         (address recovered, RecoverError error) = tryRecover(hash, v, r, s);
        //         _throwError(error);
        //         return recovered;
        //     }
        //
        //     /**
        //      * @dev Returns an Ethereum Signed Message, created from a `hash`. This
        //      * produces hash corresponding to the one signed with the
        //      * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //      * JSON-RPC method as part of EIP-191.
        //      *
        //      * See {recover}.
        //      */
        //     function toEthSignedMessageHash(bytes32 hash)
        //         internal
        //         pure
        //         returns (bytes32)
        //     {
        //         // 32 is the length in bytes of hash,
        //         // enforced by the type signature above
        //         return
        //             keccak256(
        //                 abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        //             );
        //     }
        //
        //     /**
        //      * @dev Returns an Ethereum Signed Message, created from `s`. This
        //      * produces hash corresponding to the one signed with the
        //      * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //      * JSON-RPC method as part of EIP-191.
        //      *
        //      * See {recover}.
        //      */
        //     function toEthSignedMessageHash(bytes memory s)
        //         internal
        //         pure
        //         returns (bytes32)
        //     {
        //         return
        //             keccak256(
        //                 abi.encodePacked("\x19Ethereum Signed Message:\n", s.length, s)
        //             );
        //     }
        //
        //     /**
        //      * @dev Returns an Ethereum Signed Typed Data, created from a
        //      * `domainSeparator` and a `structHash`. This produces hash corresponding
        //      * to the one signed with the
        //      * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`]
        //      * JSON-RPC method as part of EIP-712.
        //      *
        //      * See {recover}.
        //      */
        //     function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash)
        //         internal
        //         pure
        //         returns (bytes32)
        //     {
        //         return
        //             keccak256(
        //                 abi.encodePacked("\x19\x01", domainSeparator, structHash)
        //             );
        //     }
        // }
        //
        // abstract contract EIP712 {
        //     bytes32 public _CACHED_DOMAIN_SEPARATOR;
        //     uint256 public _CACHED_CHAIN_ID;
        //     address public _CACHED_THIS;
        //
        //     bytes32 public _HASHED_NAME;
        //     bytes32 public _HASHED_VERSION;
        //     bytes32 public _TYPE_HASH;
        //
        //     /**
        //      * @dev Initializes the domain separator and parameter caches.
        //      *
        //      * The meaning of `name` and `version` is specified in
        //      * https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator[EIP 712]:
        //      *
        //      * - `name`: the user readable name of the signing domain, i.e. the name of the DApp or the protocol.
        //      * - `version`: the current major version of the signing domain.
        //      *
        //      * NOTE: These parameters cannot be changed except through a xref:learn::upgrading-smart-contracts.adoc[smart
        //      * contract upgrade].
        //      */
        //     constructor(string memory name, string memory version) {
        //         bytes32 hashedName = keccak256(bytes(name));
        //         bytes32 hashedVersion = keccak256(bytes(version));
        //         bytes32 typeHash = keccak256(
        //             "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        //         );
        //         _HASHED_NAME = hashedName;
        //         _HASHED_VERSION = hashedVersion;
        //         _CACHED_CHAIN_ID = block.chainid;
        //         _CACHED_THIS = 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC;
        //         _TYPE_HASH = typeHash;
        //     }
        //
        //     /**
        //      * @dev Returns the domain separator for the current chain.
        //      */
        //     function _domainSeparatorV4() internal view returns (bytes32) {
        //         return _buildDomainSeparator(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION);
        //     }
        //
        //     function _buildDomainSeparator(
        //         bytes32 typeHash,
        //         bytes32 nameHash,
        //         bytes32 versionHash
        //     ) private view returns (bytes32) {
        //         return
        //             keccak256(
        //                 abi.encode(
        //                     typeHash,
        //                     nameHash,
        //                     versionHash,
        //                     _CACHED_CHAIN_ID,
        //                     _CACHED_THIS
        //                 )
        //             );
        //     }
        //
        //     /**
        //      * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this
        //      * function returns the hash of the fully encoded EIP712 message for this domain.
        //      *
        //      * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:
        //      *
        //      * ```solidity
        //      * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        //      *     keccak256("Mail(address to,string contents)"),
        //      *     mailTo,
        //      *     keccak256(bytes(mailContents))
        //      * )));
        //      * address signer = ECDSA.recover(digest, signature);
        //      * ```
        //      */
        //     function _hashTypedDataV4(bytes32 structHash)
        //         internal
        //         view
        //         virtual
        //         returns (bytes32)
        //     {
        //         return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
        //     }
        // }
        //
        // contract TIP712 is EIP712 {
        //     constructor() EIP712("TrcToken Test", "1") {}
        //
        //     function domainSeparatorV4() public view returns (bytes32) {
        //         return _domainSeparatorV4();
        //     }
        //
        //     struct FromPerson {
        //         string name;
        //         address wallet;
        //         trcToken trcTokenId;
        //     }
        //     struct ToPerson {
        //         string name;
        //         address wallet;
        //         trcToken[] trcTokenArr;
        //     }
        //     struct Mail {
        //         FromPerson from;
        //         ToPerson to;
        //         string contents;
        //         address[] tAddr;
        //         trcToken trcTokenId;
        //         trcToken[] trcTokenArr;
        //     }
        //
        //     string public constant FROMPERSON_TYPE =
        //         "FromPerson(string name,address wallet,trcToken trcTokenId)";
        //     bytes32 private constant FROMPERSON_TYPE_HASH =
        //         keccak256(bytes(FROMPERSON_TYPE));
        //
        //     string public constant TOPERSON_TYPE =
        //         "ToPerson(string name,address wallet,trcToken[] trcTokenArr)";
        //     bytes32 private constant TOPERSON_TYPE_HASH =
        //         keccak256(bytes(TOPERSON_TYPE));
        //
        //     string public constant MAIN_TYPE =
        //         "Mail(FromPerson from,ToPerson to,string contents,address[] tAddr,trcToken trcTokenId,trcToken[] trcTokenArr)FromPerson(string name,address wallet,trcToken trcTokenId)ToPerson(string name,address wallet,trcToken[] trcTokenArr)";
        //     bytes32 private constant MAIN_TYPE_HASH = keccak256(bytes(MAIN_TYPE));
        //
        //     function hash(FromPerson memory person) internal pure returns (bytes32) {
        //         return
        //             keccak256(
        //                 abi.encode(
        //                     FROMPERSON_TYPE_HASH,
        //                     keccak256(bytes(person.name)),
        //                     person.wallet,
        //                     person.trcTokenId
        //                 )
        //             );
        //     }
        //
        //     function hash(ToPerson memory person) internal pure returns (bytes32) {
        //         return
        //             keccak256(
        //                 abi.encode(
        //                     TOPERSON_TYPE_HASH,
        //                     keccak256(bytes(person.name)),
        //                     person.wallet,
        //                     keccak256(abi.encode(person.trcTokenArr[0],person.trcTokenArr[1]))
        //                 )
        //             );
        //     }
        //
        //     function hash(Mail memory mail) internal pure returns (bytes32) {
        //         return
        //             keccak256(
        //                 abi.encode(
        //                     MAIN_TYPE_HASH,
        //                     hash(mail.from),
        //                     hash(mail.to),
        //                     keccak256(bytes(mail.contents)),
        //                     keccak256(abi.encode(mail.tAddr[0],mail.tAddr[1])),
        //                     mail.trcTokenId,
        //                     keccak256(abi.encode(mail.trcTokenArr[0],mail.trcTokenArr[1]))
        //                 )
        //             );
        //     }
        //
        //     function hash() public view returns (bytes32) {
        //         // Example signed message
        //         address[] memory tAddr = new address[](2);
        //         tAddr[0] = 0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB;
        //         tAddr[1] = 0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB;
        //
        //         trcToken[] memory trcTokenArr = new trcToken[](2);
        //         trcTokenArr[0] = 1002000;
        //         trcTokenArr[1] = 1002000;
        //
        //         Mail memory mail = Mail({
        //             from: FromPerson({
        //                 name: "Cow",
        //                 wallet: 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826,
        //                 trcTokenId: 1002000
        //             }),
        //             to: ToPerson({
        //                 name: "Bob",
        //                 wallet: 0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB,
        //                 trcTokenArr: trcTokenArr
        //             }),
        //             contents: "Hello, Bob!",
        //             tAddr: tAddr,
        //             trcTokenId: 1002000,
        //             trcTokenArr: trcTokenArr
        //         });
        //
        //         return _hashTypedDataV4(hash(mail));
        //     }
        //
        //     function verifyMail(
        //         address sender,
        //         Mail calldata mail,
        //         uint8 v,
        //         bytes32 r,
        //         bytes32 s
        //     ) public view returns (bool) {
        //         bytes32 digest = _hashTypedDataV4(hash(mail));
        //         return sender == ECDSA.recover(digest, v, r, s);
        //     }
        // }
        contractName:"typedDataTest1",
        abi:[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "FROMPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAIN_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "TOPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_CHAIN_ID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_DOMAIN_SEPARATOR",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_THIS",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_NAME",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_VERSION",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_TYPE_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "domainSeparatorV4",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hash",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "trcTokenId",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct TIP712.FromPerson",
                                "name": "from",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken[]",
                                        "name": "trcTokenArr",
                                        "type": "trcToken[]"
                                    }
                                ],
                                "internalType": "struct TIP712.ToPerson",
                                "name": "to",
                                "type": "tuple"
                            },
                            {
                                "internalType": "string",
                                "name": "contents",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "tAddr",
                                "type": "address[]"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "trcTokenId",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "trcToken[]",
                                "name": "trcTokenArr",
                                "type": "trcToken[]"
                            }
                        ],
                        "internalType": "struct TIP712.Mail",
                        "name": "mail",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "verifyMail",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:"608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604080518082018252600d81526c151c98d51bdad95b8815195cdd609a1b602080830191825283518085019094526001808552603160f81b9490910193909352905190206003557fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660045577d698d4192c56cb6be724a558448e2684802de4d6cd8690dc9055600280546001600160a01b031916735ab90009b529c5406b4f8a6fc4dab8a2bc778c751790557f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6005556112178061010a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100ce5760003560e01c806378e890ba1161008b57806378e890ba1461013e578063a9e91e5414610146578063caac6c821461014e578063d559af0b14610156578063da28b5271461015e578063f816bac314610173576100ce565b806309bd5a60146100d35780632b437d48146100f15780633dbfe627146100f95780635d2dab0b14610119578063712ac56d1461012157806371f534ad14610129575b600080fd5b6100db61017b565b6040516100e89190610d4b565b60405180910390f35b6100db6103ba565b61010c610107366004610c7e565b6103c0565b6040516100e89190610d40565b6100db610405565b6100db61040b565b610131610411565b6040516100e89190610df2565b6100db61042e565b6100db61043d565b6100db610443565b610131610449565b610166610465565b6040516100e89190610d12565b610131610474565b6040805160028082526060820183526000928392919060208301908036833701905050905073d1e7a6bc354106cb410e65ff8b181c600ff14292816000815181106101d657634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b03168152505073d1e7a6bc354106cb410e65ff8b181c600ff142928160018151811061022c57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050620f4a108160008151811061028c57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050620f4a10816001815181106102bd57634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051610160810182526003610120820181815262436f7760e81b61014084015260c0830190815273cd2a3d9f938e13cd947ec05abc7fe734df8dd82660e0840152620f4a106101008401819052908352835160a080820186526060828101948552622137b160e91b60808481019190915294835273d1e7a6bc354106cb410e65ff8b181c600ff14292838901528287018990528588019290925285518087018752600b81526a48656c6c6f2c20426f622160a81b978101979097529484019590955293820186905281019290925281018290526103b26103ad82610490565b610613565b935050505090565b60015481565b6000806103d76103ad6103d288610f93565b610490565b90506103e58186868661062c565b6001600160a01b0316876001600160a01b03161491505095945050505050565b60055481565b60045481565b60405180610120016040528060e1815260200161108c60e1913981565b6000610438610654565b905090565b60005481565b60035481565b6040518060600160405280603a815260200161116d603a913981565b6002546001600160a01b031681565b6040518060600160405280603b81526020016111a7603b913981565b600060405180610120016040528060e1815260200161108c60e19139805190602001206104c08360000151610667565b6104cd84602001516106a8565b84604001518051906020012085606001516000815181106104fe57634e487b7160e01b600052603260045260246000fd5b6020026020010151866060015160018151811061052b57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001610544929190610d26565b6040516020818303038152906040528051906020012086608001518760a0015160008151811061058457634e487b7160e01b600052603260045260246000fd5b60200260200101518860a001516001815181106105b157634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016105ca929190610f37565b604051602081830303815290604052805190602001206040516020016105f69796959493929190610d78565b604051602081830303815290604052805190602001209050919050565b6000610626610620610654565b8361076f565b92915050565b600080600061063d878787876107a2565b9150915061064a81610882565b5095945050505050565b60006104386005546003546004546109bb565b60006040518060600160405280603a815260200161116d603a9139805160209182012083518051908301208483015160408087015190516105f69501610d54565b60006040518060600160405280603b81526020016111a7603b9139805190602001208260000151805190602001208360200151846040015160008151811061070057634e487b7160e01b600052603260045260246000fd5b6020026020010151856040015160018151811061072d57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001610746929190610f37565b604051602081830303815290604052805190602001206040516020016105f69493929190610d54565b60008282604051602001610784929190610cf7565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156107d95750600090506003610879565b8460ff16601b141580156107f157508460ff16601c14155b156108025750600090506004610879565b6000600187878787604051600081526020016040526040516108279493929190610dd4565b6020604051602081039080840390855afa158015610849573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661087257600060019250925050610879565b9150600090505b94509492505050565b60008160048111156108a457634e487b7160e01b600052602160045260246000fd5b14156108af576109b8565b60018160048111156108d157634e487b7160e01b600052602160045260246000fd5b14156108f85760405162461bcd60e51b81526004016108ef90610e45565b60405180910390fd5b600281600481111561091a57634e487b7160e01b600052602160045260246000fd5b14156109385760405162461bcd60e51b81526004016108ef90610e7c565b600381600481111561095a57634e487b7160e01b600052602160045260246000fd5b14156109785760405162461bcd60e51b81526004016108ef90610eb3565b600481600481111561099a57634e487b7160e01b600052602160045260246000fd5b14156109b85760405162461bcd60e51b81526004016108ef90610ef5565b50565b6001546002546040516000926109e79287928792879290916001600160a01b0390911690602001610da8565b6040516020818303038152906040528051906020012090509392505050565b600081356001600160a81b0381168114610a1e578182fd5b6001600160a01b031692915050565b600082601f830112610a3d578081fd5b81356020610a52610a4d83610f6f565b610f45565b8281528181019085830183850287018401881015610a6e578586fd5b855b85811015610a9357610a8182610a06565b84529284019290840190600101610a70565b5090979650505050505050565b600082601f830112610ab0578081fd5b81356020610ac0610a4d83610f6f565b8281528181019085830183850287018401881015610adc578586fd5b855b85811015610a9357813584529284019290840190600101610ade565b600082601f830112610b0a578081fd5b813567ffffffffffffffff811115610b2457610b24611075565b610b37601f8201601f1916602001610f45565b818152846020838601011115610b4b578283fd5b816020850160208301379081016020019190915292915050565b600060608284031215610b76578081fd5b6040516060810167ffffffffffffffff8282108183111715610b9a57610b9a611075565b816040528293508435915080821115610bb257600080fd5b50610bbf85828601610afa565b825250610bce60208401610a06565b6020820152604083013560408201525092915050565b600060608284031215610bf5578081fd5b6040516060810167ffffffffffffffff8282108183111715610c1957610c19611075565b816040528293508435915080821115610c3157600080fd5b610c3d86838701610afa565b8352610c4b60208601610a06565b60208401526040850135915080821115610c6457600080fd5b50610c7185828601610aa0565b6040830152505092915050565b600080600080600060a08688031215610c95578081fd5b610c9e86610a06565b9450602086013567ffffffffffffffff811115610cb9578182fd5b860160c08189031215610cca578182fd5b9350604086013560ff81168114610cdf578182fd5b94979396509394606081013594506080013592915050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b901515815260200190565b90815260200190565b93845260208401929092526001600160a01b03166040830152606082015260800190565b968752602087019590955260408601939093526060850191909152608084015260a083015260c082015260e00190565b9485526020850193909352604084019190915260608301526001600160a01b0316608082015260a00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015610e1e57858101830151858201604001528201610e02565b81811115610e2f5783604083870101525b50601f01601f1916929092016040019392505050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff81118282101715610f6757610f67611075565b604052919050565b600067ffffffffffffffff821115610f8957610f89611075565b5060209081020190565b600060c08236031215610fa4578081fd5b610fae60c0610f45565b823567ffffffffffffffff80821115610fc5578384fd5b610fd136838701610b65565b83526020850135915080821115610fe6578384fd5b610ff236838701610be4565b6020840152604085013591508082111561100a578384fd5b61101636838701610afa565b6040840152606085013591508082111561102e578384fd5b61103a36838701610a2d565b60608401526080850135608084015260a085013591508082111561105c578384fd5b5061106936828601610aa0565b60a08301525092915050565b634e487b7160e01b600052604160045260246000fdfe4d61696c2846726f6d506572736f6e2066726f6d2c546f506572736f6e20746f2c737472696e6720636f6e74656e74732c616464726573735b5d2074416464722c747263546f6b656e20747263546f6b656e49642c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e41727229a26469706673582212209dffc27824f06f531b0b88d9733b9f0fd6392a834a92a72ecaca657fa1650e1464736f6c63430008000033"
    },
    typedDataTest2:{
        //// SPDX-License-Identifier: MIT
        // pragma solidity ^0.8.0;
        //
        //  /**
        //   * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
        //   *
        //   * These functions can be used to verify that a message was signed by the holder
        //   * of the private keys of a given address.
        //   */
        //  library ECDSA {
        //      enum RecoverError {
        //          NoError,
        //          InvalidSignature,
        //          InvalidSignatureLength,
        //          InvalidSignatureS,
        //          InvalidSignatureV
        //      }
        //
        //      function _throwError(RecoverError error) private pure {
        //          if (error == RecoverError.NoError) {
        //              return; // no error: do nothing
        //          } else if (error == RecoverError.InvalidSignature) {
        //              revert("ECDSA: invalid signature");
        //          } else if (error == RecoverError.InvalidSignatureLength) {
        //              revert("ECDSA: invalid signature length");
        //          } else if (error == RecoverError.InvalidSignatureS) {
        //              revert("ECDSA: invalid signature 's' value");
        //          } else if (error == RecoverError.InvalidSignatureV) {
        //              revert("ECDSA: invalid signature 'v' value");
        //          }
        //      }
        //
        //      /**
        //       * @dev Returns the address that signed a hashed message (`hash`) with
        //       * `signature` or error string. This address can then be used for verification purposes.
        //       *
        //       * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //       * this function rejects them by requiring the `s` value to be in the lower
        //       * half order, and the `v` value to be either 27 or 28.
        //       *
        //       * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //       * verification to be secure: it is possible to craft signatures that
        //       * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //       * this is by receiving a hash of the original message (which may otherwise
        //       * be too long), and then calling {toEthSignedMessageHash} on it.
        //       *
        //       * Documentation for signature generation:
        //       * - with https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js]
        //       * - with https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers]
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(bytes32 hash, bytes memory signature)
        //          internal
        //          pure
        //          returns (address, RecoverError)
        //      {
        //          // Check the signature length
        //          // - case 65: r,s,v signature (standard)
        //          // - case 64: r,vs signature (cf https://eips.ethereum.org/EIPS/eip-2098) _Available since v4.1._
        //          if (signature.length == 65) {
        //              bytes32 r;
        //              bytes32 s;
        //              uint8 v;
        //              // ecrecover takes the signature parameters, and the only way to get them
        //              // currently is to use assembly.
        //              /// @solidity memory-safe-assembly
        //              assembly {
        //                  r := mload(add(signature, 0x20))
        //                  s := mload(add(signature, 0x40))
        //                  v := byte(0, mload(add(signature, 0x60)))
        //              }
        //              return tryRecover(hash, v, r, s);
        //          } else if (signature.length == 64) {
        //              bytes32 r;
        //              bytes32 vs;
        //              // ecrecover takes the signature parameters, and the only way to get them
        //              // currently is to use assembly.
        //              /// @solidity memory-safe-assembly
        //              assembly {
        //                  r := mload(add(signature, 0x20))
        //                  vs := mload(add(signature, 0x40))
        //              }
        //              return tryRecover(hash, r, vs);
        //          } else {
        //              return (address(0), RecoverError.InvalidSignatureLength);
        //          }
        //      }
        //
        //      /**
        //       * @dev Returns the address that signed a hashed message (`hash`) with
        //       * `signature`. This address can then be used for verification purposes.
        //       *
        //       * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //       * this function rejects them by requiring the `s` value to be in the lower
        //       * half order, and the `v` value to be either 27 or 28.
        //       *
        //       * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //       * verification to be secure: it is possible to craft signatures that
        //       * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //       * this is by receiving a hash of the original message (which may otherwise
        //       * be too long), and then calling {toEthSignedMessageHash} on it.
        //       */
        //      function recover(bytes32 hash, bytes memory signature)
        //          internal
        //          pure
        //          returns (address)
        //      {
        //          (address recovered, RecoverError error) = tryRecover(hash, signature);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-tryRecover} that receives the `r` and `vs` short-signature fields separately.
        //       *
        //       * See https://eips.ethereum.org/EIPS/eip-2098[EIP-2098 short signatures]
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(
        //          bytes32 hash,
        //          bytes32 r,
        //          bytes32 vs
        //      ) internal pure returns (address, RecoverError) {
        //          bytes32 s = vs &
        //              bytes32(
        //                  0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        //              );
        //          uint8 v = uint8((uint256(vs) >> 255) + 27);
        //          return tryRecover(hash, v, r, s);
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-recover} that receives the `r and `vs` short-signature fields separately.
        //       *
        //       * _Available since v4.2._
        //       */
        //      function recover(
        //          bytes32 hash,
        //          bytes32 r,
        //          bytes32 vs
        //      ) internal pure returns (address) {
        //          (address recovered, RecoverError error) = tryRecover(hash, r, vs);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-tryRecover} that receives the `v`,
        //       * `r` and `s` signature fields separately.
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(
        //          bytes32 hash,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) internal pure returns (address, RecoverError) {
        //          // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        //          // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        //          // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        //          // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //          //
        //          // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        //          // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        //          // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        //          // these malleable signatures as well.
        //          if (
        //              uint256(s) >
        //              0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        //          ) {
        //              return (address(0), RecoverError.InvalidSignatureS);
        //          }
        //          if (v != 27 && v != 28) {
        //              return (address(0), RecoverError.InvalidSignatureV);
        //          }
        //
        //          // If the signature is valid (and not malleable), return the signer address
        //          address signer = ecrecover(hash, v, r, s);
        //          if (signer == address(0)) {
        //              return (address(0), RecoverError.InvalidSignature);
        //          }
        //
        //          return (signer, RecoverError.NoError);
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-recover} that receives the `v`,
        //       * `r` and `s` signature fields separately.
        //       */
        //      function recover(
        //          bytes32 hash,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) internal pure returns (address) {
        //          (address recovered, RecoverError error) = tryRecover(hash, v, r, s);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Message, created from a `hash`. This
        //       * produces hash corresponding to the one signed with the
        //       * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //       * JSON-RPC method as part of EIP-191.
        //       *
        //       * See {recover}.
        //       */
        //      function toEthSignedMessageHash(bytes32 hash)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          // 32 is the length in bytes of hash,
        //          // enforced by the type signature above
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        //              );
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Message, created from `s`. This
        //       * produces hash corresponding to the one signed with the
        //       * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //       * JSON-RPC method as part of EIP-191.
        //       *
        //       * See {recover}.
        //       */
        //      function toEthSignedMessageHash(bytes memory s)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19Ethereum Signed Message:\n", s.length, s)
        //              );
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Typed Data, created from a
        //       * `domainSeparator` and a `structHash`. This produces hash corresponding
        //       * to the one signed with the
        //       * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`]
        //       * JSON-RPC method as part of EIP-712.
        //       *
        //       * See {recover}.
        //       */
        //      function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19\x01", domainSeparator, structHash)
        //              );
        //      }
        //  }
        //
        //  abstract contract EIP712 {
        //      bytes32 public _CACHED_DOMAIN_SEPARATOR;
        //      uint256 public _CACHED_CHAIN_ID;
        //      address public _CACHED_THIS;
        //      bytes32 public _SALT_HASH;
        //
        //      bytes32 public _HASHED_NAME;
        //      bytes32 public _HASHED_VERSION;
        //      bytes32 public _TYPE_HASH;
        //
        //
        //      /**
        //       * @dev Initializes the domain separator and parameter caches.
        //       *
        //       * The meaning of `name` and `version` is specified in
        //       * https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator[EIP 712]:
        //       *
        //       * - `name`: the user readable name of the signing domain, i.e. the name of the DApp or the protocol.
        //       * - `version`: the current major version of the signing domain.
        //       *
        //       * NOTE: These parameters cannot be changed except through a xref:learn::upgrading-smart-contracts.adoc[smart
        //       * contract upgrade].
        //       */
        //      constructor(string memory name, string memory version) {
        //          bytes32 hashedName = keccak256(bytes(name));
        //          bytes32 hashedVersion = keccak256(bytes(version));
        //          bytes32 typeHash = keccak256(
        //              "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"
        //          );
        //          _HASHED_NAME = hashedName;
        //          _HASHED_VERSION = hashedVersion;
        //         //  _CACHED_CHAIN_ID = block.chainid;
        //          _CACHED_CHAIN_ID = 0xd698d4192c56cb6be724a558448e2684802de4d6cd8690dc;
        //          _CACHED_THIS = 0x5AB90009b529c5406B4F8a6fc4dab8a2bc778C75;
        //          _TYPE_HASH = typeHash;
        //          _SALT_HASH = 0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558;
        //      }
        //
        //      /**
        //       * @dev Returns the domain separator for the current chain.
        //       */
        //      function _domainSeparatorV4() internal view returns (bytes32) {
        //          return _buildDomainSeparator(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION);
        //      }
        //
        //      function _buildDomainSeparator(
        //          bytes32 typeHash,
        //          bytes32 nameHash,
        //          bytes32 versionHash
        //      ) private view returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      typeHash,
        //                      nameHash,
        //                      versionHash,
        //                      _CACHED_CHAIN_ID,
        //                      _CACHED_THIS,
        //                      _SALT_HASH
        //                  )
        //              );
        //      }
        //
        //      /**
        //       * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this
        //       * function returns the hash of the fully encoded EIP712 message for this domain.
        //       *
        //       * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:
        //       *
        //       * ```solidity
        //       * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        //       *     keccak256("Mail(address to,string contents)"),
        //       *     mailTo,
        //       *     keccak256(bytes(mailContents))
        //       * )));
        //       * address signer = ECDSA.recover(digest, signature);
        //       * ```
        //       */
        //      function _hashTypedDataV4(bytes32 structHash)
        //          internal
        //          view
        //          virtual
        //          returns (bytes32)
        //      {
        //          return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
        //      }
        //  }
        //
        //  contract TIP712 is EIP712 {
        //      constructor() EIP712("TrcToken Test", "1") {}
        //
        //      function domainSeparatorV4() public view returns (bytes32) {
        //          return _domainSeparatorV4();
        //      }
        //
        //      struct FromPerson {
        //          string name;
        //          address wallet;
        //          trcToken trcTokenId;
        //      }
        //      struct ToPerson {
        //          string name;
        //          address wallet;
        //          trcToken[] trcTokenArr;
        //      }
        //      struct Mail {
        //          FromPerson from;
        //          ToPerson to;
        //          string contents;
        //          address[] tAddr;
        //          trcToken trcTokenId;
        //          trcToken[] trcTokenArr;
        //      }
        //
        //      string public constant FROMPERSON_TYPE =
        //          "FromPerson(string name,address wallet,trcToken trcTokenId)";
        //      bytes32 private constant FROMPERSON_TYPE_HASH =
        //          keccak256(bytes(FROMPERSON_TYPE));
        //
        //      string public constant TOPERSON_TYPE =
        //          "ToPerson(string name,address wallet,trcToken[] trcTokenArr)";
        //      bytes32 private constant TOPERSON_TYPE_HASH =
        //          keccak256(bytes(TOPERSON_TYPE));
        //
        //      string public constant MAIN_TYPE =
        //          "Mail(FromPerson from,ToPerson to,string contents,address[] tAddr,trcToken trcTokenId,trcToken[] trcTokenArr)FromPerson(string name,address wallet,trcToken trcTokenId)ToPerson(string name,address wallet,trcToken[] trcTokenArr)";
        //      bytes32 private constant MAIN_TYPE_HASH = keccak256(bytes(MAIN_TYPE));
        //
        //      function hash(FromPerson memory person) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      FROMPERSON_TYPE_HASH,
        //                      keccak256(bytes(person.name)),
        //                      person.wallet,
        //                      person.trcTokenId
        //                  )
        //              );
        //      }
        //
        //      function hash(ToPerson memory person) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      TOPERSON_TYPE_HASH,
        //                      keccak256(bytes(person.name)),
        //                      person.wallet,
        //                      keccak256(abi.encode(person.trcTokenArr[0],person.trcTokenArr[1]))
        //                  )
        //              );
        //      }
        //
        //      function hash(Mail memory mail) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      MAIN_TYPE_HASH,
        //                      hash(mail.from),
        //                      hash(mail.to),
        //                      keccak256(bytes(mail.contents)),
        //                      keccak256(abi.encode(mail.tAddr[0],mail.tAddr[1])),
        //                      mail.trcTokenId,
        //                      keccak256(abi.encode(mail.trcTokenArr[0],mail.trcTokenArr[1]))
        //                  )
        //              );
        //      }
        //
        //      function hash() public view returns (bytes32) {
        //          // Example signed message
        //          address[] memory tAddr = new address[](2);
        //          tAddr[0] = 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292;
        //          tAddr[1] = 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292;
        //
        //          trcToken[] memory trcTokenArr = new trcToken[](2);
        //          trcTokenArr[0] = 1002000;
        //          trcTokenArr[1] = 1002000;
        //
        //          Mail memory mail = Mail({
        //              from: FromPerson({
        //                  name: "Cow",
        //                  wallet: 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826,
        //                  trcTokenId: 1002000
        //              }),
        //              to: ToPerson({
        //                  name: "Bob",
        //                  wallet: 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292,
        //                  trcTokenArr: trcTokenArr
        //              }),
        //              contents: "Hello, Bob!",
        //              tAddr: tAddr,
        //              trcTokenId: 1002000,
        //              trcTokenArr: trcTokenArr
        //          });
        //
        //          return _hashTypedDataV4(hash(mail));
        //      }
        //
        //      function verifyMail(
        //          address sender,
        //          Mail calldata mail,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) public view returns (bool) {
        //          bytes32 digest = _hashTypedDataV4(hash(mail));
        //          return sender == ECDSA.recover(digest, v, r, s);
        //      }
        //  }
        contractName:"typedDataTest2",
        abi:[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "FROMPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAIN_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "TOPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_CHAIN_ID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_DOMAIN_SEPARATOR",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_THIS",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_NAME",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_VERSION",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_SALT_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_TYPE_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "domainSeparatorV4",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hash",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "trcTokenId",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct TIP712.FromPerson",
                                "name": "from",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken[]",
                                        "name": "trcTokenArr",
                                        "type": "trcToken[]"
                                    }
                                ],
                                "internalType": "struct TIP712.ToPerson",
                                "name": "to",
                                "type": "tuple"
                            },
                            {
                                "internalType": "string",
                                "name": "contents",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "tAddr",
                                "type": "address[]"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "trcTokenId",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "trcToken[]",
                                "name": "trcTokenArr",
                                "type": "trcToken[]"
                            }
                        ],
                        "internalType": "struct TIP712.Mail",
                        "name": "mail",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "verifyMail",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:"0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604080518082018252600d81526c151c98d51bdad95b8815195cdd609a1b602080830191825283518085019094526001808552603160f81b9490910193909352905190206004557fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660055577d698d4192c56cb6be724a558448e2684802de4d6cd8690dc9055600280546001600160a01b031916735ab90009b529c5406b4f8a6fc4dab8a2bc778c751790557fd87cd6ef79d4e2b95e15ce8abf732db51ec771f1ca2edccf22a46c729ac564726006557ff2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a5586003556112468061012e6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100e95760003560e01c806378e890ba116100a6578063ceaa21da11610080578063ceaa21da14610171578063d559af0b14610179578063da28b52714610181578063f816bac314610196576100e9565b806378e890ba14610159578063a9e91e5414610161578063caac6c8214610169576100e9565b806309bd5a60146100ee5780632b437d481461010c5780633dbfe627146101145780635d2dab0b14610134578063712ac56d1461013c57806371f534ad14610144575b600080fd5b6100f661019e565b6040516101039190610d75565b60405180910390f35b6100f66103dd565b610127610122366004610ca8565b6103e3565b6040516101039190610d6a565b6100f6610428565b6100f661042e565b61014c610434565b6040516101039190610e21565b6100f6610451565b6100f6610460565b6100f6610466565b6100f661046c565b61014c610472565b61018961048e565b6040516101039190610d3c565b61014c61049d565b6040805160028082526060820183526000928392919060208301908036833701905050905073d1e7a6bc354106cb410e65ff8b181c600ff14292816000815181106101f957634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b03168152505073d1e7a6bc354106cb410e65ff8b181c600ff142928160018151811061024f57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050620f4a10816000815181106102af57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050620f4a10816001815181106102e057634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051610160810182526003610120820181815262436f7760e81b61014084015260c0830190815273cd2a3d9f938e13cd947ec05abc7fe734df8dd82660e0840152620f4a106101008401819052908352835160a080820186526060828101948552622137b160e91b60808481019190915294835273d1e7a6bc354106cb410e65ff8b181c600ff14292838901528287018990528588019290925285518087018752600b81526a48656c6c6f2c20426f622160a81b978101979097529484019590955293820186905281019290925281018290526103d56103d0826104b9565b61063c565b935050505090565b60015481565b6000806103fa6103d06103f588610fc2565b6104b9565b905061040881868686610655565b6001600160a01b0316876001600160a01b03161491505095945050505050565b60065481565b60055481565b60405180610120016040528060e181526020016110bb60e1913981565b600061045b61067d565b905090565b60005481565b60045481565b60035481565b6040518060600160405280603a815260200161119c603a913981565b6002546001600160a01b031681565b6040518060600160405280603b81526020016111d6603b913981565b600060405180610120016040528060e181526020016110bb60e19139805190602001206104e98360000151610690565b6104f684602001516106d1565b846040015180519060200120856060015160008151811061052757634e487b7160e01b600052603260045260246000fd5b6020026020010151866060015160018151811061055457634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161056d929190610d50565b6040516020818303038152906040528051906020012086608001518760a001516000815181106105ad57634e487b7160e01b600052603260045260246000fd5b60200260200101518860a001516001815181106105da57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016105f3929190610f66565b6040516020818303038152906040528051906020012060405160200161061f9796959493929190610da2565b604051602081830303815290604052805190602001209050919050565b600061064f61064961067d565b83610798565b92915050565b6000806000610666878787876107cb565b91509150610673816108ab565b5095945050505050565b600061045b6006546004546005546109e4565b60006040518060600160405280603a815260200161119c603a91398051602091820120835180519083012084830151604080870151905161061f9501610d7e565b60006040518060600160405280603b81526020016111d6603b9139805190602001208260000151805190602001208360200151846040015160008151811061072957634e487b7160e01b600052603260045260246000fd5b6020026020010151856040015160018151811061075657634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161076f929190610f66565b6040516020818303038152906040528051906020012060405160200161061f9493929190610d7e565b600082826040516020016107ad929190610d21565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561080257506000905060036108a2565b8460ff16601b1415801561081a57508460ff16601c14155b1561082b57506000905060046108a2565b6000600187878787604051600081526020016040526040516108509493929190610e03565b6020604051602081039080840390855afa158015610872573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661089b576000600192509250506108a2565b9150600090505b94509492505050565b60008160048111156108cd57634e487b7160e01b600052602160045260246000fd5b14156108d8576109e1565b60018160048111156108fa57634e487b7160e01b600052602160045260246000fd5b14156109215760405162461bcd60e51b815260040161091890610e74565b60405180910390fd5b600281600481111561094357634e487b7160e01b600052602160045260246000fd5b14156109615760405162461bcd60e51b815260040161091890610eab565b600381600481111561098357634e487b7160e01b600052602160045260246000fd5b14156109a15760405162461bcd60e51b815260040161091890610ee2565b60048160048111156109c357634e487b7160e01b600052602160045260246000fd5b14156109e15760405162461bcd60e51b815260040161091890610f24565b50565b600154600254600354604051600093610a1193889388938893926001600160a01b03169190602001610dd2565b6040516020818303038152906040528051906020012090509392505050565b600081356001600160a81b0381168114610a48578182fd5b6001600160a01b031692915050565b600082601f830112610a67578081fd5b81356020610a7c610a7783610f9e565b610f74565b8281528181019085830183850287018401881015610a98578586fd5b855b85811015610abd57610aab82610a30565b84529284019290840190600101610a9a565b5090979650505050505050565b600082601f830112610ada578081fd5b81356020610aea610a7783610f9e565b8281528181019085830183850287018401881015610b06578586fd5b855b85811015610abd57813584529284019290840190600101610b08565b600082601f830112610b34578081fd5b813567ffffffffffffffff811115610b4e57610b4e6110a4565b610b61601f8201601f1916602001610f74565b818152846020838601011115610b75578283fd5b816020850160208301379081016020019190915292915050565b600060608284031215610ba0578081fd5b6040516060810167ffffffffffffffff8282108183111715610bc457610bc46110a4565b816040528293508435915080821115610bdc57600080fd5b50610be985828601610b24565b825250610bf860208401610a30565b6020820152604083013560408201525092915050565b600060608284031215610c1f578081fd5b6040516060810167ffffffffffffffff8282108183111715610c4357610c436110a4565b816040528293508435915080821115610c5b57600080fd5b610c6786838701610b24565b8352610c7560208601610a30565b60208401526040850135915080821115610c8e57600080fd5b50610c9b85828601610aca565b6040830152505092915050565b600080600080600060a08688031215610cbf578081fd5b610cc886610a30565b9450602086013567ffffffffffffffff811115610ce3578182fd5b860160c08189031215610cf4578182fd5b9350604086013560ff81168114610d09578182fd5b94979396509394606081013594506080013592915050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b901515815260200190565b90815260200190565b93845260208401929092526001600160a01b03166040830152606082015260800190565b968752602087019590955260408601939093526060850191909152608084015260a083015260c082015260e00190565b9586526020860194909452604085019290925260608401526001600160a01b0316608083015260a082015260c00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015610e4d57858101830151858201604001528201610e31565b81811115610e5e5783604083870101525b50601f01601f1916929092016040019392505050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff81118282101715610f9657610f966110a4565b604052919050565b600067ffffffffffffffff821115610fb857610fb86110a4565b5060209081020190565b600060c08236031215610fd3578081fd5b610fdd60c0610f74565b823567ffffffffffffffff80821115610ff4578384fd5b61100036838701610b8f565b83526020850135915080821115611015578384fd5b61102136838701610c0e565b60208401526040850135915080821115611039578384fd5b61104536838701610b24565b6040840152606085013591508082111561105d578384fd5b61106936838701610a57565b60608401526080850135608084015260a085013591508082111561108b578384fd5b5061109836828601610aca565b60a08301525092915050565b634e487b7160e01b600052604160045260246000fdfe4d61696c2846726f6d506572736f6e2066726f6d2c546f506572736f6e20746f2c737472696e6720636f6e74656e74732c616464726573735b5d2074416464722c747263546f6b656e20747263546f6b656e49642c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e41727229a2646970667358221220a3543660ab4cc8e2ad093a86597c392cb6639a095ad05f1425480cebb78b41ac64736f6c63430008000033"
    },
    typedDataTest3:{
        contractName:"typedDataTest3",
        abi:[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "FROMPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAIN_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "TOPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_CHAIN_ID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_DOMAIN_SEPARATOR",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_THIS",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_NAME",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_VERSION",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_SALT_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_TYPE_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "domainSeparatorV4",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hash",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "trcTokenId",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct TIP712.FromPerson",
                                "name": "from",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken[]",
                                        "name": "trcTokenArr",
                                        "type": "trcToken[]"
                                    }
                                ],
                                "internalType": "struct TIP712.ToPerson",
                                "name": "to",
                                "type": "tuple"
                            },
                            {
                                "internalType": "string",
                                "name": "contents",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "tAddr",
                                "type": "address[]"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "trcTokenId",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "trcToken[]",
                                "name": "trcTokenArr",
                                "type": "trcToken[]"
                            }
                        ],
                        "internalType": "struct TIP712.Mail",
                        "name": "mail",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "verifyMail",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:"0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604080518082018252600d81526c151c98d51bdad95b8815195cdd609a1b6020808301918252835180850190945260018452603160f81b9301929092525190206004557fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66005557fb03948446334eb9b2196d5eb166f69b9d49403eb4a12f36de8d3f9f3cb8e15c3600655611215806100c56000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100e95760003560e01c806378e890ba116100a6578063ceaa21da11610080578063ceaa21da14610171578063d559af0b14610179578063da28b52714610181578063f816bac314610196576100e9565b806378e890ba14610159578063a9e91e5414610161578063caac6c8214610169576100e9565b806309bd5a60146100ee5780632b437d481461010c5780633dbfe627146101145780635d2dab0b14610134578063712ac56d1461013c57806371f534ad14610144575b600080fd5b6100f661019e565b6040516101039190610d5f565b60405180910390f35b6100f66103dd565b610127610122366004610c92565b6103e3565b6040516101039190610d54565b6100f6610428565b6100f661042e565b61014c610434565b6040516101039190610df0565b6100f6610451565b6100f6610460565b6100f6610466565b6100f661046c565b61014c610472565b61018961048e565b6040516101039190610d26565b61014c61049d565b6040805160028082526060820183526000928392919060208301908036833701905050905073d1e7a6bc354106cb410e65ff8b181c600ff14292816000815181106101f957634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b03168152505073d1e7a6bc354106cb410e65ff8b181c600ff142928160018151811061024f57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050620f4a10816000815181106102af57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050620f4a10816001815181106102e057634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051610160810182526003610120820181815262436f7760e81b61014084015260c0830190815273cd2a3d9f938e13cd947ec05abc7fe734df8dd82660e0840152620f4a106101008401819052908352835160a080820186526060828101948552622137b160e91b60808481019190915294835273d1e7a6bc354106cb410e65ff8b181c600ff14292838901528287018990528588019290925285518087018752600b81526a48656c6c6f2c20426f622160a81b978101979097529484019590955293820186905281019290925281018290526103d56103d0826104b9565b61063c565b935050505090565b60015481565b6000806103fa6103d06103f588610f91565b6104b9565b905061040881868686610655565b6001600160a01b0316876001600160a01b03161491505095945050505050565b60065481565b60055481565b60405180610120016040528060e1815260200161108a60e1913981565b600061045b61067d565b905090565b60005481565b60045481565b60035481565b6040518060600160405280603a815260200161116b603a913981565b6002546001600160a01b031681565b6040518060600160405280603b81526020016111a5603b913981565b600060405180610120016040528060e1815260200161108a60e19139805190602001206104e98360000151610690565b6104f684602001516106d1565b846040015180519060200120856060015160008151811061052757634e487b7160e01b600052603260045260246000fd5b6020026020010151866060015160018151811061055457634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161056d929190610d3a565b6040516020818303038152906040528051906020012086608001518760a001516000815181106105ad57634e487b7160e01b600052603260045260246000fd5b60200260200101518860a001516001815181106105da57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016105f3929190610f35565b6040516020818303038152906040528051906020012060405160200161061f9796959493929190610da2565b604051602081830303815290604052805190602001209050919050565b600061064f61064961067d565b83610798565b92915050565b6000806000610666878787876107cb565b91509150610673816108ab565b5095945050505050565b600061045b6006546004546005546109e4565b60006040518060600160405280603a815260200161116b603a91398051602091820120835180519083012084830151604080870151905161061f9501610d68565b60006040518060600160405280603b81526020016111a5603b9139805190602001208260000151805190602001208360200151846040015160008151811061072957634e487b7160e01b600052603260045260246000fd5b6020026020010151856040015160018151811061075657634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161076f929190610f35565b6040516020818303038152906040528051906020012060405160200161061f9493929190610d68565b600082826040516020016107ad929190610d0b565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561080257506000905060036108a2565b8460ff16601b1415801561081a57508460ff16601c14155b1561082b57506000905060046108a2565b6000600187878787604051600081526020016040526040516108509493929190610dd2565b6020604051602081039080840390855afa158015610872573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661089b576000600192509250506108a2565b9150600090505b94509492505050565b60008160048111156108cd57634e487b7160e01b600052602160045260246000fd5b14156108d8576109e1565b60018160048111156108fa57634e487b7160e01b600052602160045260246000fd5b14156109215760405162461bcd60e51b815260040161091890610e43565b60405180910390fd5b600281600481111561094357634e487b7160e01b600052602160045260246000fd5b14156109615760405162461bcd60e51b815260040161091890610e7a565b600381600481111561098357634e487b7160e01b600052602160045260246000fd5b14156109a15760405162461bcd60e51b815260040161091890610eb1565b60048160048111156109c357634e487b7160e01b600052602160045260246000fd5b14156109e15760405162461bcd60e51b815260040161091890610ef3565b50565b60008383836040516020016109fb93929190610d8c565b6040516020818303038152906040528051906020012090509392505050565b600081356001600160a81b0381168114610a32578182fd5b6001600160a01b031692915050565b600082601f830112610a51578081fd5b81356020610a66610a6183610f6d565b610f43565b8281528181019085830183850287018401881015610a82578586fd5b855b85811015610aa757610a9582610a1a565b84529284019290840190600101610a84565b5090979650505050505050565b600082601f830112610ac4578081fd5b81356020610ad4610a6183610f6d565b8281528181019085830183850287018401881015610af0578586fd5b855b85811015610aa757813584529284019290840190600101610af2565b600082601f830112610b1e578081fd5b813567ffffffffffffffff811115610b3857610b38611073565b610b4b601f8201601f1916602001610f43565b818152846020838601011115610b5f578283fd5b816020850160208301379081016020019190915292915050565b600060608284031215610b8a578081fd5b6040516060810167ffffffffffffffff8282108183111715610bae57610bae611073565b816040528293508435915080821115610bc657600080fd5b50610bd385828601610b0e565b825250610be260208401610a1a565b6020820152604083013560408201525092915050565b600060608284031215610c09578081fd5b6040516060810167ffffffffffffffff8282108183111715610c2d57610c2d611073565b816040528293508435915080821115610c4557600080fd5b610c5186838701610b0e565b8352610c5f60208601610a1a565b60208401526040850135915080821115610c7857600080fd5b50610c8585828601610ab4565b6040830152505092915050565b600080600080600060a08688031215610ca9578081fd5b610cb286610a1a565b9450602086013567ffffffffffffffff811115610ccd578182fd5b860160c08189031215610cde578182fd5b9350604086013560ff81168114610cf3578182fd5b94979396509394606081013594506080013592915050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b901515815260200190565b90815260200190565b93845260208401929092526001600160a01b03166040830152606082015260800190565b9283526020830191909152604082015260600190565b968752602087019590955260408601939093526060850191909152608084015260a083015260c082015260e00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015610e1c57858101830151858201604001528201610e00565b81811115610e2d5783604083870101525b50601f01601f1916929092016040019392505050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff81118282101715610f6557610f65611073565b604052919050565b600067ffffffffffffffff821115610f8757610f87611073565b5060209081020190565b600060c08236031215610fa2578081fd5b610fac60c0610f43565b823567ffffffffffffffff80821115610fc3578384fd5b610fcf36838701610b79565b83526020850135915080821115610fe4578384fd5b610ff036838701610bf8565b60208401526040850135915080821115611008578384fd5b61101436838701610b0e565b6040840152606085013591508082111561102c578384fd5b61103836838701610a41565b60608401526080850135608084015260a085013591508082111561105a578384fd5b5061106736828601610ab4565b60a08301525092915050565b634e487b7160e01b600052604160045260246000fdfe4d61696c2846726f6d506572736f6e2066726f6d2c546f506572736f6e20746f2c737472696e6720636f6e74656e74732c616464726573735b5d2074416464722c747263546f6b656e20747263546f6b656e49642c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e41727229a2646970667358221220ec9e18c5c76dbe8cf6419160496cdf2894047b4527f124ff3e3976bc9e7760eb64736f6c63430008000033"
    },
    typedDataTest4:{
        contractName:"typedDataTest4",
        abi:[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "FROMPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAIN_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "TOPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_CHAIN_ID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_DOMAIN_SEPARATOR",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_THIS",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_NAME",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_VERSION",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_SALT_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_TYPE_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "domainSeparatorV4",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hash",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "trcTokenId",
                                        "type": "trcToken"
                                    }
                                ],
                                "internalType": "struct TIP712.FromPerson",
                                "name": "from",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken[]",
                                        "name": "trcTokenArr",
                                        "type": "trcToken[]"
                                    }
                                ],
                                "internalType": "struct TIP712.ToPerson",
                                "name": "to",
                                "type": "tuple"
                            },
                            {
                                "internalType": "string",
                                "name": "contents",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "tAddr",
                                "type": "address[]"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "trcTokenId",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "trcToken[]",
                                "name": "trcTokenArr",
                                "type": "trcToken[]"
                            }
                        ],
                        "internalType": "struct TIP712.Mail",
                        "name": "mail",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "verifyMail",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:"0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604080518082018252600d81526c151c98d51bdad95b8815195cdd609a1b602091820152815180830190925260018252603160f81b9101527f20bcc3f8105eea47d067386e42e60246e89393cd61c512edd1e87688890fb9146006556111fb806100966000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100e95760003560e01c806378e890ba116100a6578063ceaa21da11610080578063ceaa21da14610171578063d559af0b14610179578063da28b52714610181578063f816bac314610196576100e9565b806378e890ba14610159578063a9e91e5414610161578063caac6c8214610169576100e9565b806309bd5a60146100ee5780632b437d481461010c5780633dbfe627146101145780635d2dab0b14610134578063712ac56d1461013c57806371f534ad14610144575b600080fd5b6100f661019e565b6040516101039190610d5b565b60405180910390f35b6100f66103dd565b610127610122366004610c8e565b6103e3565b6040516101039190610d50565b6100f6610428565b6100f661042e565b61014c610434565b6040516101039190610dd6565b6100f6610451565b6100f6610460565b6100f6610466565b6100f661046c565b61014c610472565b61018961048e565b6040516101039190610d22565b61014c61049d565b6040805160028082526060820183526000928392919060208301908036833701905050905073d1e7a6bc354106cb410e65ff8b181c600ff14292816000815181106101f957634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b03168152505073d1e7a6bc354106cb410e65ff8b181c600ff142928160018151811061024f57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050620f4a10816000815181106102af57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050620f4a10816001815181106102e057634e487b7160e01b600052603260045260246000fd5b60209081029190910181019190915260408051610160810182526003610120820181815262436f7760e81b61014084015260c0830190815273cd2a3d9f938e13cd947ec05abc7fe734df8dd82660e0840152620f4a106101008401819052908352835160a080820186526060828101948552622137b160e91b60808481019190915294835273d1e7a6bc354106cb410e65ff8b181c600ff14292838901528287018990528588019290925285518087018752600b81526a48656c6c6f2c20426f622160a81b978101979097529484019590955293820186905281019290925281018290526103d56103d0826104b9565b61063c565b935050505090565b60015481565b6000806103fa6103d06103f588610f77565b6104b9565b905061040881868686610655565b6001600160a01b0316876001600160a01b03161491505095945050505050565b60065481565b60055481565b60405180610120016040528060e1815260200161107060e1913981565b600061045b61067d565b905090565b60005481565b60045481565b60035481565b6040518060600160405280603a8152602001611151603a913981565b6002546001600160a01b031681565b6040518060600160405280603b815260200161118b603b913981565b600060405180610120016040528060e1815260200161107060e19139805190602001206104e98360000151610690565b6104f684602001516106d1565b846040015180519060200120856060015160008151811061052757634e487b7160e01b600052603260045260246000fd5b6020026020010151866060015160018151811061055457634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161056d929190610d36565b6040516020818303038152906040528051906020012086608001518760a001516000815181106105ad57634e487b7160e01b600052603260045260246000fd5b60200260200101518860a001516001815181106105da57634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016105f3929190610f1b565b6040516020818303038152906040528051906020012060405160200161061f9796959493929190610d88565b604051602081830303815290604052805190602001209050919050565b600061064f61064961067d565b83610798565b92915050565b6000806000610666878787876107cb565b91509150610673816108ab565b5095945050505050565b600061045b6006546004546005546109e4565b60006040518060600160405280603a8152602001611151603a91398051602091820120835180519083012084830151604080870151905161061f9501610d64565b60006040518060600160405280603b815260200161118b603b9139805190602001208260000151805190602001208360200151846040015160008151811061072957634e487b7160e01b600052603260045260246000fd5b6020026020010151856040015160018151811061075657634e487b7160e01b600052603260045260246000fd5b602002602001015160405160200161076f929190610f1b565b6040516020818303038152906040528051906020012060405160200161061f9493929190610d64565b600082826040516020016107ad929190610d07565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561080257506000905060036108a2565b8460ff16601b1415801561081a57508460ff16601c14155b1561082b57506000905060046108a2565b6000600187878787604051600081526020016040526040516108509493929190610db8565b6020604051602081039080840390855afa158015610872573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661089b576000600192509250506108a2565b9150600090505b94509492505050565b60008160048111156108cd57634e487b7160e01b600052602160045260246000fd5b14156108d8576109e1565b60018160048111156108fa57634e487b7160e01b600052602160045260246000fd5b14156109215760405162461bcd60e51b815260040161091890610e29565b60405180910390fd5b600281600481111561094357634e487b7160e01b600052602160045260246000fd5b14156109615760405162461bcd60e51b815260040161091890610e60565b600381600481111561098357634e487b7160e01b600052602160045260246000fd5b14156109a15760405162461bcd60e51b815260040161091890610e97565b60048160048111156109c357634e487b7160e01b600052602160045260246000fd5b14156109e15760405162461bcd60e51b815260040161091890610ed9565b50565b6000836040516020016109f79190610d5b565b6040516020818303038152906040528051906020012090509392505050565b600081356001600160a81b0381168114610a2e578182fd5b6001600160a01b031692915050565b600082601f830112610a4d578081fd5b81356020610a62610a5d83610f53565b610f29565b8281528181019085830183850287018401881015610a7e578586fd5b855b85811015610aa357610a9182610a16565b84529284019290840190600101610a80565b5090979650505050505050565b600082601f830112610ac0578081fd5b81356020610ad0610a5d83610f53565b8281528181019085830183850287018401881015610aec578586fd5b855b85811015610aa357813584529284019290840190600101610aee565b600082601f830112610b1a578081fd5b813567ffffffffffffffff811115610b3457610b34611059565b610b47601f8201601f1916602001610f29565b818152846020838601011115610b5b578283fd5b816020850160208301379081016020019190915292915050565b600060608284031215610b86578081fd5b6040516060810167ffffffffffffffff8282108183111715610baa57610baa611059565b816040528293508435915080821115610bc257600080fd5b50610bcf85828601610b0a565b825250610bde60208401610a16565b6020820152604083013560408201525092915050565b600060608284031215610c05578081fd5b6040516060810167ffffffffffffffff8282108183111715610c2957610c29611059565b816040528293508435915080821115610c4157600080fd5b610c4d86838701610b0a565b8352610c5b60208601610a16565b60208401526040850135915080821115610c7457600080fd5b50610c8185828601610ab0565b6040830152505092915050565b600080600080600060a08688031215610ca5578081fd5b610cae86610a16565b9450602086013567ffffffffffffffff811115610cc9578182fd5b860160c08189031215610cda578182fd5b9350604086013560ff81168114610cef578182fd5b94979396509394606081013594506080013592915050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b901515815260200190565b90815260200190565b93845260208401929092526001600160a01b03166040830152606082015260800190565b968752602087019590955260408601939093526060850191909152608084015260a083015260c082015260e00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015610e0257858101830151858201604001528201610de6565b81811115610e135783604083870101525b50601f01601f1916929092016040019392505050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff81118282101715610f4b57610f4b611059565b604052919050565b600067ffffffffffffffff821115610f6d57610f6d611059565b5060209081020190565b600060c08236031215610f88578081fd5b610f9260c0610f29565b823567ffffffffffffffff80821115610fa9578384fd5b610fb536838701610b75565b83526020850135915080821115610fca578384fd5b610fd636838701610bf4565b60208401526040850135915080821115610fee578384fd5b610ffa36838701610b0a565b60408401526060850135915080821115611012578384fd5b61101e36838701610a3d565b60608401526080850135608084015260a0850135915080821115611040578384fd5b5061104d36828601610ab0565b60a08301525092915050565b634e487b7160e01b600052604160045260246000fdfe4d61696c2846726f6d506572736f6e2066726f6d2c546f506572736f6e20746f2c737472696e6720636f6e74656e74732c616464726573735b5d2074416464722c747263546f6b656e20747263546f6b656e49642c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e496429546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e41727229a2646970667358221220e7bbf1c483ec00c07797c77f90b073d8edb4af543868101907bbc2398646ae0f64736f6c63430008000033"
    },
    typedDataTest5:{
        //// SPDX-License-Identifier: MIT
        // pragma solidity ^0.8.0;
        //
        //  /**
        //   * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
        //   *
        //   * These functions can be used to verify that a message was signed by the holder
        //   * of the private keys of a given address.
        //   */
        //  library ECDSA {
        //      enum RecoverError {
        //          NoError,
        //          InvalidSignature,
        //          InvalidSignatureLength,
        //          InvalidSignatureS,
        //          InvalidSignatureV
        //      }
        //
        //      function _throwError(RecoverError error) private pure {
        //          if (error == RecoverError.NoError) {
        //              return; // no error: do nothing
        //          } else if (error == RecoverError.InvalidSignature) {
        //              revert("ECDSA: invalid signature");
        //          } else if (error == RecoverError.InvalidSignatureLength) {
        //              revert("ECDSA: invalid signature length");
        //          } else if (error == RecoverError.InvalidSignatureS) {
        //              revert("ECDSA: invalid signature 's' value");
        //          } else if (error == RecoverError.InvalidSignatureV) {
        //              revert("ECDSA: invalid signature 'v' value");
        //          }
        //      }
        //
        //      /**
        //       * @dev Returns the address that signed a hashed message (`hash`) with
        //       * `signature` or error string. This address can then be used for verification purposes.
        //       *
        //       * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //       * this function rejects them by requiring the `s` value to be in the lower
        //       * half order, and the `v` value to be either 27 or 28.
        //       *
        //       * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //       * verification to be secure: it is possible to craft signatures that
        //       * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //       * this is by receiving a hash of the original message (which may otherwise
        //       * be too long), and then calling {toEthSignedMessageHash} on it.
        //       *
        //       * Documentation for signature generation:
        //       * - with https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js]
        //       * - with https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers]
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(bytes32 hash, bytes memory signature)
        //          internal
        //          pure
        //          returns (address, RecoverError)
        //      {
        //          // Check the signature length
        //          // - case 65: r,s,v signature (standard)
        //          // - case 64: r,vs signature (cf https://eips.ethereum.org/EIPS/eip-2098) _Available since v4.1._
        //          if (signature.length == 65) {
        //              bytes32 r;
        //              bytes32 s;
        //              uint8 v;
        //              // ecrecover takes the signature parameters, and the only way to get them
        //              // currently is to use assembly.
        //              /// @solidity memory-safe-assembly
        //              assembly {
        //                  r := mload(add(signature, 0x20))
        //                  s := mload(add(signature, 0x40))
        //                  v := byte(0, mload(add(signature, 0x60)))
        //              }
        //              return tryRecover(hash, v, r, s);
        //          } else if (signature.length == 64) {
        //              bytes32 r;
        //              bytes32 vs;
        //              // ecrecover takes the signature parameters, and the only way to get them
        //              // currently is to use assembly.
        //              /// @solidity memory-safe-assembly
        //              assembly {
        //                  r := mload(add(signature, 0x20))
        //                  vs := mload(add(signature, 0x40))
        //              }
        //              return tryRecover(hash, r, vs);
        //          } else {
        //              return (address(0), RecoverError.InvalidSignatureLength);
        //          }
        //      }
        //
        //      /**
        //       * @dev Returns the address that signed a hashed message (`hash`) with
        //       * `signature`. This address can then be used for verification purposes.
        //       *
        //       * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
        //       * this function rejects them by requiring the `s` value to be in the lower
        //       * half order, and the `v` value to be either 27 or 28.
        //       *
        //       * IMPORTANT: `hash` _must_ be the result of a hash operation for the
        //       * verification to be secure: it is possible to craft signatures that
        //       * recover to arbitrary addresses for non-hashed data. A safe way to ensure
        //       * this is by receiving a hash of the original message (which may otherwise
        //       * be too long), and then calling {toEthSignedMessageHash} on it.
        //       */
        //      function recover(bytes32 hash, bytes memory signature)
        //          internal
        //          pure
        //          returns (address)
        //      {
        //          (address recovered, RecoverError error) = tryRecover(hash, signature);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-tryRecover} that receives the `r` and `vs` short-signature fields separately.
        //       *
        //       * See https://eips.ethereum.org/EIPS/eip-2098[EIP-2098 short signatures]
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(
        //          bytes32 hash,
        //          bytes32 r,
        //          bytes32 vs
        //      ) internal pure returns (address, RecoverError) {
        //          bytes32 s = vs &
        //              bytes32(
        //                  0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        //              );
        //          uint8 v = uint8((uint256(vs) >> 255) + 27);
        //          return tryRecover(hash, v, r, s);
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-recover} that receives the `r and `vs` short-signature fields separately.
        //       *
        //       * _Available since v4.2._
        //       */
        //      function recover(
        //          bytes32 hash,
        //          bytes32 r,
        //          bytes32 vs
        //      ) internal pure returns (address) {
        //          (address recovered, RecoverError error) = tryRecover(hash, r, vs);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-tryRecover} that receives the `v`,
        //       * `r` and `s` signature fields separately.
        //       *
        //       * _Available since v4.3._
        //       */
        //      function tryRecover(
        //          bytes32 hash,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) internal pure returns (address, RecoverError) {
        //          // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        //          // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        //          // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        //          // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //          //
        //          // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        //          // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        //          // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        //          // these malleable signatures as well.
        //          if (
        //              uint256(s) >
        //              0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        //          ) {
        //              return (address(0), RecoverError.InvalidSignatureS);
        //          }
        //          if (v != 27 && v != 28) {
        //              return (address(0), RecoverError.InvalidSignatureV);
        //          }
        //
        //          // If the signature is valid (and not malleable), return the signer address
        //          address signer = ecrecover(hash, v, r, s);
        //          if (signer == address(0)) {
        //              return (address(0), RecoverError.InvalidSignature);
        //          }
        //
        //          return (signer, RecoverError.NoError);
        //      }
        //
        //      /**
        //       * @dev Overload of {ECDSA-recover} that receives the `v`,
        //       * `r` and `s` signature fields separately.
        //       */
        //      function recover(
        //          bytes32 hash,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) internal pure returns (address) {
        //          (address recovered, RecoverError error) = tryRecover(hash, v, r, s);
        //          _throwError(error);
        //          return recovered;
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Message, created from a `hash`. This
        //       * produces hash corresponding to the one signed with the
        //       * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //       * JSON-RPC method as part of EIP-191.
        //       *
        //       * See {recover}.
        //       */
        //      function toEthSignedMessageHash(bytes32 hash)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          // 32 is the length in bytes of hash,
        //          // enforced by the type signature above
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        //              );
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Message, created from `s`. This
        //       * produces hash corresponding to the one signed with the
        //       * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
        //       * JSON-RPC method as part of EIP-191.
        //       *
        //       * See {recover}.
        //       */
        //      function toEthSignedMessageHash(bytes memory s)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19Ethereum Signed Message:\n", s.length, s)
        //              );
        //      }
        //
        //      /**
        //       * @dev Returns an Ethereum Signed Typed Data, created from a
        //       * `domainSeparator` and a `structHash`. This produces hash corresponding
        //       * to the one signed with the
        //       * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`]
        //       * JSON-RPC method as part of EIP-712.
        //       *
        //       * See {recover}.
        //       */
        //      function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash)
        //          internal
        //          pure
        //          returns (bytes32)
        //      {
        //          return
        //              keccak256(
        //                  abi.encodePacked("\x19\x01", domainSeparator, structHash)
        //              );
        //      }
        //  }
        //
        //  abstract contract EIP712 {
        //      bytes32 public _CACHED_DOMAIN_SEPARATOR;
        //      uint256 public _CACHED_CHAIN_ID;
        //      address public _CACHED_THIS;
        //      bytes32 public _SALT_HASH;
        //
        //      bytes32 public _HASHED_NAME;
        //      bytes32 public _HASHED_VERSION;
        //      bytes32 public _TYPE_HASH;
        //
        //
        //      /**
        //       * @dev Initializes the domain separator and parameter caches.
        //       *
        //       * The meaning of `name` and `version` is specified in
        //       * https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator[EIP 712]:
        //       *
        //       * - `name`: the user readable name of the signing domain, i.e. the name of the DApp or the protocol.
        //       * - `version`: the current major version of the signing domain.
        //       *
        //       * NOTE: These parameters cannot be changed except through a xref:learn::upgrading-smart-contracts.adoc[smart
        //       * contract upgrade].
        //       */
        //      constructor(string memory name, string memory version) {
        //          bytes32 hashedName = keccak256(bytes(name));
        //          bytes32 hashedVersion = keccak256(bytes(version));
        //          bytes32 typeHash = keccak256(
        //              "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"
        //          );
        //          _HASHED_NAME = hashedName;
        //          _HASHED_VERSION = hashedVersion;
        //         //  _CACHED_CHAIN_ID = block.chainid;
        //          _CACHED_CHAIN_ID = 0xd698d4192c56cb6be724a558448e2684802de4d6cd8690dc;
        //          _CACHED_THIS = 0x5AB90009b529c5406B4F8a6fc4dab8a2bc778C75;
        //          _TYPE_HASH = typeHash;
        //          _SALT_HASH = 0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558;
        //
        //      }
        //
        //      /**
        //       * @dev Returns the domain separator for the current chain.
        //       */
        //      function _domainSeparatorV4() internal view returns (bytes32) {
        //          return _buildDomainSeparator(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION);
        //      }
        //
        //      function _buildDomainSeparator(
        //          bytes32 typeHash,
        //          bytes32 nameHash,
        //          bytes32 versionHash
        //      ) private view returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      typeHash,
        //                      nameHash,
        //                      versionHash,
        //                      _CACHED_CHAIN_ID,
        //                      _CACHED_THIS,
        //                      _SALT_HASH
        //                  )
        //              );
        //      }
        //
        //      /**
        //       * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this
        //       * function returns the hash of the fully encoded EIP712 message for this domain.
        //       *
        //       * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:
        //       *
        //       * ```solidity
        //       * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        //       *     keccak256("Mail(address to,string contents)"),
        //       *     mailTo,
        //       *     keccak256(bytes(mailContents))
        //       * )));
        //       * address signer = ECDSA.recover(digest, signature);
        //       * ```
        //       */
        //      function _hashTypedDataV4(bytes32 structHash)
        //          internal
        //          view
        //          virtual
        //          returns (bytes32)
        //      {
        //          return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
        //      }
        //  }
        //
        //  contract TIP712 is EIP712 {
        //      constructor() EIP712("TrcToken Test", "1") {}
        //
        //      function domainSeparatorV4() public view returns (bytes32) {
        //          return _domainSeparatorV4();
        //      }
        //
        //      struct FromPerson {
        //          string name;
        //          address wallet;
        //          trcToken trcTokenId;
        //          bool flag;
        //          uint256 amount;
        //          uint256[] ams;
        //          bytes9[2][] bytesNine;
        //      }
        //      struct ToPerson {
        //          string name;
        //          address wallet;
        //          trcToken[] trcTokenArr;
        //          bool flag;
        //      }
        //      struct Mail {
        //          FromPerson from;
        //          ToPerson to;
        //          string contents;
        //          address[] tAddr;
        //          trcToken trcTokenId;
        //          trcToken[] trcTokenArr;
        //          bool kl;
        //      }
        //
        //      string public constant FROMPERSON_TYPE =
        //          "FromPerson(string name,address wallet,trcToken trcTokenId,bool flag,uint256 amount,uint256[] ams,bytes9[2][] bytesNine)";
        //      bytes32 private constant FROMPERSON_TYPE_HASH =
        //          keccak256(bytes(FROMPERSON_TYPE));
        //
        //      string public constant TOPERSON_TYPE =
        //          "ToPerson(string name,address wallet,trcToken[] trcTokenArr,bool flag)";
        //      bytes32 private constant TOPERSON_TYPE_HASH =
        //          keccak256(bytes(TOPERSON_TYPE));
        //
        //      string public constant MAIN_TYPE =
        //          "Mail(FromPerson from,ToPerson to,string contents,address[] tAddr,trcToken trcTokenId,trcToken[] trcTokenArr,bool kl)FromPerson(string name,address wallet,trcToken trcTokenId,bool flag,uint256 amount,uint256[] ams,bytes9[2][] bytesNine)ToPerson(string name,address wallet,trcToken[] trcTokenArr,bool flag)";
        //      bytes32 private constant MAIN_TYPE_HASH = keccak256(bytes(MAIN_TYPE));
        //
        //      function hash(FromPerson memory person) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      FROMPERSON_TYPE_HASH,
        //                      keccak256(bytes(person.name)),
        //                      person.wallet,
        //                      person.trcTokenId,
        //                      person.flag,
        //                      person.amount,
        //                      keccak256(abi.encode(person.ams[0],person.ams[1],person.ams[2])),
        //                      keccak256(abi.encode(
        //                          keccak256(abi.encode(person.bytesNine[0][0],person.bytesNine[0][1])),
        //                      keccak256(abi.encode(person.bytesNine[1][0],person.bytesNine[1][1])),
        //                      keccak256(abi.encode(person.bytesNine[2][0],person.bytesNine[2][1]))))
        //                  )
        //              );
        //      }
        //
        //      function hash(ToPerson memory person) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      TOPERSON_TYPE_HASH,
        //                      keccak256(bytes(person.name)),
        //                      person.wallet,
        //                      keccak256(abi.encode(person.trcTokenArr[0],person.trcTokenArr[1])),
        //                      person.flag
        //                  )
        //              );
        //      }
        //
        //      function hash(Mail memory mail) internal pure returns (bytes32) {
        //          return
        //              keccak256(
        //                  abi.encode(
        //                      MAIN_TYPE_HASH,
        //                      hash(mail.from),
        //                      hash(mail.to),
        //                      keccak256(bytes(mail.contents)),
        //                      keccak256(abi.encode(mail.tAddr[0],mail.tAddr[1])),
        //                      mail.trcTokenId,
        //                      keccak256(abi.encode(mail.trcTokenArr[0],mail.trcTokenArr[1])),
        //                      mail.kl
        //                  )
        //              );
        //      }
        //
        //      function hash() public view returns (bytes32) {
        //          // Example signed message
        //          address[] memory tAddr = new address[](2);
        //          tAddr[0] = 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292;
        //          tAddr[1] = 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292;
        //
        //          trcToken[] memory trcTokenArr = new trcToken[](2);
        //          trcTokenArr[0] = 1002000;
        //          trcTokenArr[1] = 1002000;
        //
        //          uint256[] memory ms = new uint256[](3);
        //          ms[0] = 11056554404658930133150874045898657776356285215494026110264991123212628047076;
        //          ms[1] = 28642429005959472156842324419307827288639989824857677552763720238605764979095;
        //          ms[2] = 60726410065911965915389471010958483980331937590671913817781923654636547669698;
        //
        //          bytes9[2][] memory bys = new bytes9[2][](3);
        //          bys[0][0] = 0x984ed0dffc8163a771;
        //          bys[0][1] = 0xcf6f8e49e5a45099e7;
        //          bys[1][0] = 0xed139eddc5ccd6e349;
        //          bys[1][1] = 0xbaca9a31329f9011f9;
        //          bys[2][0] = 0xda39ed4979f3beb331;
        //          bys[2][1] = 0x37822de88e0dcdf499;
        //
        //          Mail memory mail = Mail({
        //              from: FromPerson({
        //                  name: "Cow----\'\"\\",
        //                  wallet: 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826,
        //                  trcTokenId: 1002000,
        //                  flag: true,
        //                  amount: 100,
        //                  ams: ms,
        //                  bytesNine: bys
        //              }),
        //              to: ToPerson({
        //                  name: "Bob!@@#$%%^^&*())+{}{].,,",
        //                  wallet: 0xd1e7a6BC354106Cb410e65fF8B181C600FF14292,
        //                  trcTokenArr: trcTokenArr,
        //                  flag: false
        //              }),
        //              contents: "Hello, ___====$$###^&**!@@Bob!",
        //              tAddr: tAddr,
        //              trcTokenId: 1002000,
        //              trcTokenArr: trcTokenArr,
        //              kl: false
        //          });
        //
        //          return _hashTypedDataV4(hash(mail));
        //      }
        //
        //      function verifyMail(
        //          address sender,
        //          Mail calldata mail,
        //          uint8 v,
        //          bytes32 r,
        //          bytes32 s
        //      ) public view returns (bool) {
        //          bytes32 digest = _hashTypedDataV4(hash(mail));
        //          return sender == ECDSA.recover(digest, v, r, s);
        //      }
        //  }
        contractName:"typedDataTest5",
        abi: [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "FROMPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAIN_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "TOPERSON_TYPE",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_CHAIN_ID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_DOMAIN_SEPARATOR",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_CACHED_THIS",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_NAME",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_HASHED_VERSION",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_SALT_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "_TYPE_HASH",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "domainSeparatorV4",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hash",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken",
                                        "name": "trcTokenId",
                                        "type": "trcToken"
                                    },
                                    {
                                        "internalType": "bool",
                                        "name": "flag",
                                        "type": "bool"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "amount",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256[]",
                                        "name": "ams",
                                        "type": "uint256[]"
                                    },
                                    {
                                        "internalType": "bytes9[2][]",
                                        "name": "bytesNine",
                                        "type": "bytes9[2][]"
                                    }
                                ],
                                "internalType": "struct TIP712.FromPerson",
                                "name": "from",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "wallet",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "trcToken[]",
                                        "name": "trcTokenArr",
                                        "type": "trcToken[]"
                                    },
                                    {
                                        "internalType": "bool",
                                        "name": "flag",
                                        "type": "bool"
                                    }
                                ],
                                "internalType": "struct TIP712.ToPerson",
                                "name": "to",
                                "type": "tuple"
                            },
                            {
                                "internalType": "string",
                                "name": "contents",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "tAddr",
                                "type": "address[]"
                            },
                            {
                                "internalType": "trcToken",
                                "name": "trcTokenId",
                                "type": "trcToken"
                            },
                            {
                                "internalType": "trcToken[]",
                                "name": "trcTokenArr",
                                "type": "trcToken[]"
                            },
                            {
                                "internalType": "bool",
                                "name": "kl",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct TIP712.Mail",
                        "name": "mail",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "name": "verifyMail",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode:"0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604080518082018252600d81526c151c98d51bdad95b8815195cdd609a1b602080830191825283518085019094526001808552603160f81b9490910193909352905190206004557fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660055577d698d4192c56cb6be724a558448e2684802de4d6cd8690dc9055600280546001600160a01b031916735ab90009b529c5406b4f8a6fc4dab8a2bc778c751790557fd87cd6ef79d4e2b95e15ce8abf732db51ec771f1ca2edccf22a46c729ac564726006557ff2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558600355611c558061012e6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50600436106100e95760003560e01c806378e890ba116100a6578063ceaa21da11610080578063ceaa21da14610171578063d559af0b14610179578063da28b52714610181578063f816bac314610196576100e9565b806378e890ba14610159578063a9e91e5414610161578063caac6c8214610169576100e9565b806309bd5a60146100ee5780632b437d481461010c578063503babc8146101145780635d2dab0b14610134578063712ac56d1461013c57806371f534ad14610144575b600080fd5b6100f661019e565b6040516101039190611659565b60405180910390f35b6100f661080e565b61012761012236600461158c565b610814565b604051610103919061164e565b6100f6610859565b6100f661085f565b61014c610865565b6040516101039190611789565b6100f6610884565b6100f6610893565b6100f6610899565b6100f661089f565b61014c6108a5565b6101896108c1565b6040516101039190611620565b61014c6108d0565b6040805160028082526060820183526000928392919060208301908036833701905050905073d1e7a6bc354106cb410e65ff8b181c600ff14292816000815181106101f957634e487b7160e01b600052603260045260246000fd5b60200260200101906001600160a01b031690816001600160a01b03168152505073d1e7a6bc354106cb410e65ff8b181c600ff142928160018151811061024f57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050620f4a10816000815181106102af57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050620f4a10816001815181106102e057634e487b7160e01b600052603260045260246000fd5b6020908102919091010152604080516003808252608082019092526000918160200160208202803683370190505090507f1871c9bc081e263b9a4e5dd2dfbd2c8532bef4e0dc1719f08af07b619b36b4e48160008151811061035257634e487b7160e01b600052603260045260246000fd5b6020026020010181815250507f3f530a52653422f2d656c2e926f9beb77313a5a92e882b219e898a2d8730e997816001815181106103a057634e487b7160e01b600052603260045260246000fd5b6020026020010181815250507f8641ee1941a82686b1843b6f0e582b898fde9b4d1ce4ef95db41add97c44fec2816002815181106103ee57634e487b7160e01b600052603260045260246000fd5b602090810291909101015260408051600380825260808201909252600091816020015b6104196111c2565b81526020019060019003908161041157905050905068984ed0dffc8163a77160b81b8160008151811061045c57634e487b7160e01b600052603260045260246000fd5b602002602001015160006002811061048457634e487b7160e01b600052603260045260246000fd5b6001600160b81b03199092166020929092020152805168cf6f8e49e5a45099e760b81b9082906000906104c757634e487b7160e01b600052603260045260246000fd5b60200260200101516001600281106104ef57634e487b7160e01b600052603260045260246000fd5b6001600160b81b03199092166020929092020152805168ed139eddc5ccd6e34960b81b908290600190811061053457634e487b7160e01b600052603260045260246000fd5b602002602001015160006002811061055c57634e487b7160e01b600052603260045260246000fd5b6001600160b81b03199092166020929092020152805168baca9a31329f9011f960b81b90829060019081106105a157634e487b7160e01b600052603260045260246000fd5b60200260200101516001600281106105c957634e487b7160e01b600052603260045260246000fd5b6001600160b81b03199092166020929092020152805168da39ed4979f3beb33160b81b908290600290811061060e57634e487b7160e01b600052603260045260246000fd5b602002602001015160006002811061063657634e487b7160e01b600052603260045260246000fd5b6001600160b81b0319909216602092909202015280516837822de88e0dcdf49960b81b908290600290811061067b57634e487b7160e01b600052603260045260246000fd5b60200260200101516001600281106106a357634e487b7160e01b600052603260045260246000fd5b6001600160b81b0319909216602092830291909101526040805161020081018252600a6101c082019081526910dbddcb4b4b4b49c89760b21b6101e083015260e0820190815273cd2a3d9f938e13cd947ec05abc7fe734df8dd826610100830152620f4a1061012083018190526001610140840152606461016084015261018083018790526101a08301869052908252825160c08181018552601960808381019182527f426f62214040232425255e5e262a2829292b7b7d7b5d2e2c2c0000000000000060a08581019190915291845273d1e7a6bc354106cb410e65ff8b181c600ff14292848901528387018b905260006060858101829052878a019590955287518089018952601e81527f48656c6c6f2c205f5f5f3d3d3d3d24242323235e262a2a214040426f6221000099810199909952968601979097529184018a9052948301919091528101869052918201526108046107ff826108ec565b610a78565b9550505050505090565b60015481565b60008061082b6107ff6108268861192a565b6108ec565b905061083981868686610a91565b6001600160a01b0316876001600160a01b03161491505095945050505050565b60065481565b60055481565b6040518061016001604052806101308152602001611af0610130913981565b600061088e610ab9565b905090565b60005481565b60045481565b60035481565b6040518060a0016040528060778152602001611a796077913981565b6002546001600160a01b031681565b604051806080016040528060458152602001611a346045913981565b60006040518061016001604052806101308152602001611af061013091398051906020012061091e8360000151610acc565b61092b8460200151610e5d565b846040015180519060200120856060015160008151811061095c57634e487b7160e01b600052603260045260246000fd5b6020026020010151866060015160018151811061098957634e487b7160e01b600052603260045260246000fd5b60200260200101516040516020016109a2929190611634565b6040516020818303038152906040528051906020012086608001518760a001516000815181106109e257634e487b7160e01b600052603260045260246000fd5b60200260200101518860a00151600181518110610a0f57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001610a289291906118ce565b604051602081830303815290604052805190602001208860c00151604051602001610a5a9897969594939291906116e7565b6040516020818303038152906040528051906020012090505b919050565b6000610a8b610a85610ab9565b83610f2a565b92915050565b6000806000610aa287878787610f5d565b91509150610aaf8161103d565b5095945050505050565b600061088e600654600454600554611176565b60006040518060a0016040528060778152602001611a79607791398051906020012082600001518051906020012083602001518460400151856060015186608001518760a00151600081518110610b3357634e487b7160e01b600052603260045260246000fd5b60200260200101518860a00151600181518110610b6057634e487b7160e01b600052603260045260246000fd5b60200260200101518960a00151600281518110610b8d57634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001610ba7939291906116d1565b604051602081830303815290604052805190602001208860c00151600081518110610be257634e487b7160e01b600052603260045260246000fd5b6020026020010151600060028110610c0a57634e487b7160e01b600052603260045260246000fd5b60200201518960c00151600081518110610c3457634e487b7160e01b600052603260045260246000fd5b6020026020010151600160028110610c5c57634e487b7160e01b600052603260045260246000fd5b6020020151604051602001610c7292919061176e565b604051602081830303815290604052805190602001208960c00151600181518110610cad57634e487b7160e01b600052603260045260246000fd5b6020026020010151600060028110610cd557634e487b7160e01b600052603260045260246000fd5b60200201518a60c00151600181518110610cff57634e487b7160e01b600052603260045260246000fd5b6020026020010151600160028110610d2757634e487b7160e01b600052603260045260246000fd5b6020020151604051602001610d3d92919061176e565b604051602081830303815290604052805190602001208a60c00151600281518110610d7857634e487b7160e01b600052603260045260246000fd5b6020026020010151600060028110610da057634e487b7160e01b600052603260045260246000fd5b60200201518b60c00151600281518110610dca57634e487b7160e01b600052603260045260246000fd5b6020026020010151600160028110610df257634e487b7160e01b600052603260045260246000fd5b6020020151604051602001610e0892919061176e565b60405160208183030381529060405280519060200120604051602001610e30939291906116d1565b60405160208183030381529060405280519060200120604051602001610a5a989796959493929190611690565b6000604051806080016040528060458152602001611a34604591398051906020012082600001518051906020012083602001518460400151600081518110610eb557634e487b7160e01b600052603260045260246000fd5b60200260200101518560400151600181518110610ee257634e487b7160e01b600052603260045260246000fd5b6020026020010151604051602001610efb9291906118ce565b604051602081830303815290604052805190602001208560600151604051602001610a5a959493929190611662565b60008282604051602001610f3f929190611605565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610f945750600090506003611034565b8460ff16601b14158015610fac57508460ff16601c14155b15610fbd5750600090506004611034565b600060018787878760405160008152602001604052604051610fe29493929190611750565b6020604051602081039080840390855afa158015611004573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661102d57600060019250925050611034565b9150600090505b94509492505050565b600081600481111561105f57634e487b7160e01b600052602160045260246000fd5b141561106a57611173565b600181600481111561108c57634e487b7160e01b600052602160045260246000fd5b14156110b35760405162461bcd60e51b81526004016110aa906117dc565b60405180910390fd5b60028160048111156110d557634e487b7160e01b600052602160045260246000fd5b14156110f35760405162461bcd60e51b81526004016110aa90611813565b600381600481111561111557634e487b7160e01b600052602160045260246000fd5b14156111335760405162461bcd60e51b81526004016110aa9061184a565b600481600481111561115557634e487b7160e01b600052602160045260246000fd5b14156111735760405162461bcd60e51b81526004016110aa9061188c565b50565b6001546002546003546040516000936111a393889388938893926001600160a01b0316919060200161171f565b6040516020818303038152906040528051906020012090509392505050565b60405180604001604052806002906020820280368337509192915050565b600081356001600160a81b03811681146111f8578182fd5b6001600160a01b031692915050565b600082601f830112611217578081fd5b8135602061122c61122783611906565b6118dc565b8281528181019085830183850287018401881015611248578586fd5b855b8581101561126d5761125b826111e0565b8452928401929084019060010161124a565b5090979650505050505050565b6000601f838184011261128b578182fd5b8235602061129b61122783611906565b828152818101908683016040808602890185018a10156112b9578788fd5b875b86811015611332578a888401126112d0578889fd5b6112d9826118dc565b80848486018e8111156112ea578c8dfd5b8c5b600281101561131e5782356001600160b81b03198116811461130c578e8ffd5b8552938a0193918a01916001016112ec565b5091885250958701959350506001016112bb565b50919998505050505050505050565b600082601f830112611351578081fd5b8135602061136161122783611906565b828152818101908583018385028701840188101561137d578586fd5b855b8581101561126d5781358452928401929084019060010161137f565b80358015158114610a7357600080fd5b600082601f8301126113bb578081fd5b813567ffffffffffffffff8111156113d5576113d5611a1d565b6113e8601f8201601f19166020016118dc565b8181528460208386010111156113fc578283fd5b816020850160208301379081016020019190915292915050565b600060e08284031215611427578081fd5b61143160e06118dc565b9050813567ffffffffffffffff8082111561144b57600080fd5b611457858386016113ab565b8352611465602085016111e0565b6020840152604084013560408401526114806060850161139b565b60608401526080840135608084015260a08401359150808211156114a357600080fd5b6114af85838601611341565b60a084015260c08401359150808211156114c857600080fd5b506114d58482850161127a565b60c08301525092915050565b6000608082840312156114f2578081fd5b6040516080810167ffffffffffffffff828210818311171561151657611516611a1d565b81604052829350843591508082111561152e57600080fd5b61153a868387016113ab565b8352611548602086016111e0565b6020840152604085013591508082111561156157600080fd5b5061156e85828601611341565b6040830152506115806060840161139b565b60608201525092915050565b600080600080600060a086880312156115a3578081fd5b6115ac866111e0565b9450602086013567ffffffffffffffff8111156115c7578182fd5b860160e081890312156115d8578182fd5b9350604086013560ff811681146115ed578182fd5b94979396509394606081013594506080013592915050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b901515815260200190565b90815260200190565b94855260208501939093526001600160a01b0391909116604084015260608301521515608082015260a00190565b97885260208801969096526001600160a01b0394909416604087015260608601929092521515608085015260a084015260c083015260e08201526101000190565b9283526020830191909152604082015260600190565b978852602088019690965260408701949094526060860192909252608085015260a084015260c0830152151560e08201526101000190565b9586526020860194909452604085019290925260608401526001600160a01b0316608083015260a082015260c00190565b93845260ff9290921660208401526040830152606082015260800190565b6001600160b81b031992831681529116602082015260400190565b6000602080835283518082850152825b818110156117b557858101830151858201604001528201611799565b818111156117c65783604083870101525b50601f01601f1916929092016040019392505050565b60208082526018908201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604082015260600190565b6020808252601f908201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604082015260600190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604082015261756560f01b606082015260800190565b60208082526022908201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604082015261756560f01b606082015260800190565b918252602082015260400190565b60405181810167ffffffffffffffff811182821017156118fe576118fe611a1d565b604052919050565b600067ffffffffffffffff82111561192057611920611a1d565b5060209081020190565b600060e0823603121561193b578081fd5b61194560e06118dc565b823567ffffffffffffffff8082111561195c578384fd5b61196836838701611416565b8352602085013591508082111561197d578384fd5b611989368387016114e1565b602084015260408501359150808211156119a1578384fd5b6119ad368387016113ab565b604084015260608501359150808211156119c5578384fd5b6119d136838701611207565b60608401526080850135608084015260a08501359150808211156119f3578384fd5b50611a0036828601611341565b60a083015250611a1260c0840161139b565b60c082015292915050565b634e487b7160e01b600052604160045260246000fdfe546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722c626f6f6c20666c61672946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e49642c626f6f6c20666c61672c75696e7432353620616d6f756e742c75696e743235365b5d20616d732c6279746573395b325d5b5d2062797465734e696e65294d61696c2846726f6d506572736f6e2066726f6d2c546f506572736f6e20746f2c737472696e6720636f6e74656e74732c616464726573735b5d2074416464722c747263546f6b656e20747263546f6b656e49642c747263546f6b656e5b5d20747263546f6b656e4172722c626f6f6c206b6c2946726f6d506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e20747263546f6b656e49642c626f6f6c20666c61672c75696e7432353620616d6f756e742c75696e743235365b5d20616d732c6279746573395b325d5b5d2062797465734e696e6529546f506572736f6e28737472696e67206e616d652c616464726573732077616c6c65742c747263546f6b656e5b5d20747263546f6b656e4172722c626f6f6c20666c616729a26469706673582212209698a2c2b93341594325d45a42205218bbe30c57528f3f7e45de71872d7d085064736f6c63430008000033"
    },

    /*// SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.8.4 <0.9.0;
    contract TestCustomError {
        uint256 number;
        error CustomError(uint256 available, uint256 required);
        constructor() {}
        function test(uint256 num) public {
            if((true ? 1 : 2) + (true ? 1 : 2) > 0)
                revert CustomError({
                available: num,
                required: number
            });
            number = 1;
        }
    }*/
    TestCustomError: {
        "contractName": "TestCustomError",
        "abi": [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "available",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "required",
                        "type": "uint256"
                    }
                ],
                "name": "CustomError",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    }
                ],
                "name": "test",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "608060405234801561001057600080fd5b50610258806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806329e99f0714610030575b600080fd5b61004a60048036038101906100459190610107565b61004c565b005b6000600161005b57600261005e565b60015b600161006b57600261006e565b60015b6100789190610170565b60ff1611156100c1578060016040517fa66886d30000000000000000000000000000000000000000000000000000000081526004016100b89291906101f9565b60405180910390fd5b600160008190555050565b600080fd5b6000819050919050565b6100e4816100d1565b81146100ef57600080fd5b50565b600081359050610101816100db565b92915050565b60006020828403121561011d5761011c6100cc565b5b600061012b848285016100f2565b91505092915050565b600060ff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061017b82610134565b915061018683610134565b9250828201905060ff81111561019f5761019e610141565b5b92915050565b6101ae816100d1565b82525050565b6000819050919050565b6000819050919050565b60006101e36101de6101d9846101b4565b6101be565b6100d1565b9050919050565b6101f3816101c8565b82525050565b600060408201905061020e60008301856101a5565b61021b60208301846101ea565b939250505056fea26469706673582212202b185bfa2794c0b915ea0c07855db187e645058c720a88c8dc41bcf60da9d72c64736f6c63430008110033"
    },
}
