const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'YOUR SECRET PHRASES',
    'http://localhost:8545',
);

const web3 = new Web3(provider);

const deployContract = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    const contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello World!'] })
        .send({ gas: '10000000', from: accounts[0] });

    console.log('Contract deployed to', contract.options.address);
    provider.engine.stop();
}

deployContract();