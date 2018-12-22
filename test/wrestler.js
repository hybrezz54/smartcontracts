const Wrestler = artifacts.require("Wrestler");

contract('Wrestler test', async (accounts) => {

  let instance;

  before(async () => {
    instance = await Wrestler.deployed();
  });

  it("wrestler1 address should be set", async () => {
    assert.equal(Wrestler.wrestler1, accounts[0]);
  });

});
