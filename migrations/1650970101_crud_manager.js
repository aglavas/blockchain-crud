const CrudManager = artifacts.require("CrudManager");

module.exports = function(deployer) {
  deployer.deploy(CrudManager);
};