import { initWeb3, initContract} from '../utils.js'

let Web3;
let CrudManager;
let Accounts;

export default {
    async init() {
        Web3 = await initWeb3();
        CrudManager = await initContract(Web3);
        Accounts =  await Web3.eth.getAccounts().then(result => {
            return result;
        });
    },    
    async create(name) {
        return CrudManager.methods.createUser(name).send({from: Accounts[0]});
    },
    async read(id) {
        return CrudManager.methods.readUser(id).call();
    },
    async update(id, name) {
        return CrudManager.methods.updateUser(id, name).send({from: Accounts[0]});
    },
    async delete(id) {
        return CrudManager.methods.deleteUser(id).send({from: Accounts[0]});
    }
  }
  