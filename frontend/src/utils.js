import Web3 from 'web3';
import CrudManager from '../../build/contracts/CrudManager.json';

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:7545'));
  });
};

const initContract = (web3) => {
  const deploymentKey = Object.keys(CrudManager.networks)[0];
  return new web3.eth.Contract(
    CrudManager.abi, 
    CrudManager
      .networks[deploymentKey]
      .address
  );
};

export { initWeb3, initContract};