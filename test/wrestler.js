const Wrestler = artifacts.require("Wrestler");

contract('Wrestler', async (accounts) => {

  let instance;

  before(async () => {
    instance = await Wrestler.deployed();
  });

  it("should not be able to withdraw ether", async () => {
    let beforeWithdraw = web3.eth.getBalance(accounts[0]);
    
    // We try to use the function withdraw from the Wrestling contract
    // It should revert because the wrestling isn't finished 
    instance.withdraw({from: accounts[0]}).then(function (val) {
      assert(false, "should revert");
    }).catch(function (err) {
      // We expect a "revert" exception from the VM, because the user 
      // should not be able to withdraw ether
      console.log('Error: ' + err);

      // how much ether the account has after running the transaction
      var afterWithdraw = web3.eth.getBalance(accounts[0]);
      var diff = beforeWithdraw - afterWithdraw;

      // The account paid for gas to execute the transaction
      console.log('Difference: ' + web3.fromWei(diff, "ether"));
    })
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
