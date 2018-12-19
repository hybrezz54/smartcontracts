var Counter = artifacts.require("./Counter.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Counter);
};
