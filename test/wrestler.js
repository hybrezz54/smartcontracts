const Wrestler = artifacts.require("Wrestler");

contract('Wrestler test', async (accounts) => {

  it("should assert true", async () => {
    let instance = await Wrestler.deployed();
    assert.isTrue(true);
  });

});
