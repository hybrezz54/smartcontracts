const Wrestler = artifacts.require("Wrestler");

contract('Wrestler', async (accounts) => {

  let instance;

  before(async () => {
    instance = await Wrestler.deployed();
  });

  it("wrestler1 should be set", async () => {
    let wrestler1 = await instance.wrestler1.call();
    assert.equal(wrestler1, accounts[0]);
  });

  it("wrestler2 should be set and game started", async () => {
    let receipt = await instance.registerAsAnOpponent({from: accounts[1]});
    let wrestler2 = await instance.wrestler2.call();
    let winner = await instance.winner.call();
    assert.equal(wrestler2, accounts[1]);
    assert.equal(winner, 0);
  });

  it("wrestle to finish round", async () => {
    await instance.wrestle({from: accounts[0], value: web3.toWei(2, "ether")});
    let wrestler1Played = await instance.wrestler1Played.call();
    let wrestler2Played = await instance.wrestler2Played.call();
    let winner = await instance.winner.call();
    assert(wrestler1Played == true);
    assert(wrestler2Played == false);
    assert.equal(winner, 0);

    await instance.wrestle({from: accounts[1], value: web3.toWei(3, "ether")});
    wrestler1Played = await instance.wrestler1Played.call();
    wrestler2Played = await instance.wrestler2Played.call();
    winner = await instance.winner.call();
    assert(wrestler1Played == false);
    assert(wrestler2Played == false);
    assert.equal(winner, 0);
  });

  it("wrestle to finish game", async () => {
    await instance.wrestle({from: accounts[0], value: web3.toWei(5, "ether")});
    let wrestler1Played = await instance.wrestler1Played.call();
    let wrestler2Played = await instance.wrestler2Played.call();
    let winner = await instance.winner.call();
    assert(wrestler1Played == true);
    assert(wrestler2Played == false);
    assert.equal(winner, 0);

    await instance.wrestle({from: accounts[1], value: web3.toWei(20, "ether")});
    wrestler1Played = await instance.wrestler1Played.call();
    wrestler2Played = await instance.wrestler2Played.call();
    winner = await instance.winner.call();
    assert(wrestler1Played == true);
    assert(wrestler2Played == true);
    assert.equal(winner, accounts[1]);
  });

});
