var Counter = artifacts.require("Counter");
var Greeter = artifacts.require("Greeter")

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Counter);
  deployer.deploy(Greeter);
};
