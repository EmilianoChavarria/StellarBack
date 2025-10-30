import { 
  Contract, 
  Networks, 
  TransactionBuilder, 
  BASE_FEE, 
  Keypair,
  xdr
} from '@stellar/stellar-sdk';

export class StellarService {
  constructor(contractId, network = 'testnet') {
    this.contractId = contractId;
    this.network = network;
    this.server = new SorobanRpc.Server(
      network === 'testnet' 
        ? 'https://soroban-testnet.stellar.org' 
        : 'https://soroban-mainnet.stellar.org'
    );
    this.networkPassphrase = network === 'testnet' 
      ? Networks.TESTNET 
      : Networks.PUBLIC;
  }

  // Inicializar el contrato
  async getContract() {
    return new Contract(this.contractId);
  }

  // Invocar función hello
  async invokeHello(to, sourceSecret) {
    try {
      const sourceKeypair = Keypair.fromSecret(sourceSecret);
      const contract = await this.getContract();
      
      const transaction = new TransactionBuilder(await this.getAccount(sourceKeypair.publicKey()), {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(contract.call("hello", xdr.ScVal.scvString(to)))
        .setTimeout(30)
        .build();

      // Firmar y enviar
      transaction.sign(sourceKeypair);
      const response = await this.server.sendTransaction(transaction);
      
      return await this.waitForTransaction(response.hash);
    } catch (error) {
      console.error('Error invoking hello:', error);
      throw error;
    }
  }

  // Consultar función get_greeting
  async getGreeting(forName, sourceSecret) {
    try {
      const sourceKeypair = Keypair.fromSecret(sourceSecret);
      const contract = await this.getContract();
      
      const transaction = new TransactionBuilder(await this.getAccount(sourceKeypair.publicKey()), {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(contract.call("get_greeting", xdr.ScVal.scvString(forName)))
        .setTimeout(30)
        .build();

      transaction.sign(sourceKeypair);
      const response = await this.server.sendTransaction(transaction);
      
      const result = await this.waitForTransaction(response.hash);
      return result.returnValue;
    } catch (error) {
      console.error('Error getting greeting:', error);
      throw error;
    }
  }

  async getAccount(publicKey) {
    return await this.server.getAccount(publicKey);
  }

  async waitForTransaction(hash) {
    let response = await this.server.getTransaction(hash);
    while (response.status === 'NOT_FOUND' || response.status === 'PENDING') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      response = await this.server.getTransaction(hash);
    }
    return response;
  }
}

// Uso
export const helloWorldService = new StellarService(
  'CA55YPJMWYILLOOU4BISNYKPEUFFXCCJKYLC2FM4TPARHRIDI7ULEWYF',
  'testnet'
);