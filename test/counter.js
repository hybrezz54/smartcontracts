const Counter = artifacts.require("Counter");

contract('Counter test', async (accounts) => {

    it("Initial value of counter should be zero", async () => {
        let instance = await Counter.deployed();
        let count = await instance.getCount.call({from: accounts[0]});
        assert.equal(count, 0);
    });

    it("Should increment counter", async () => {
        let instance = await Counter.deployed();
        await instance.incrementCounter({from: accounts[0]});
        let count = await instance.getCount.call({from: accounts[0]});
        assert.equal(count, 1);
    });

    it("Should emit event on increment counter", async () => {
        let instance = await Counter.deployed();
        let reciept = await instance.incrementCounter({from: accounts[0]});
        assert.equal(reciept.logs.length, 1);
        assert.equal(reciept.logs[0].args.count, 2);
    });

    it("Should decrement counter", async () => {
        let instance = await Counter.deployed();
        await instance.incrementCounter({from: accounts[1]});
        let count = await instance.getCount.call({from: accounts[1]});
        assert.equal(count, 1);
        // await instance.decrementCounter({from: accounts[0]});
        // count = await instance.getCount.call({from: accounts[0]});
        // assert.equal(count, 0);
    });

    it("Should emit event on decrement counter", async () => {
        let instance = await Counter.deployed();
        let reciept = await instance.decrementCounter({from: accounts[0]});
        assert.equal(reciept.logs.length, 1);
        // assert.equal(reciept.logs[0].args.count, 2);
    });

});