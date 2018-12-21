var Counter = artifacts.require("Counter");
var Greeter = artifacts.require("Greeter");
var Wrestler = artifacts.require("Wrestler");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Counter);
  deployer.deploy(Greeter, "Hello World!");
  deployer.deploy(Wrestler);
};
