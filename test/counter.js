const Counter = artifacts.require("Counter");

contract('Counter', async (accounts) => {

    let instance;

    before(async () => {
        instance = await Counter.deployed();
    });

    it("Initial value of counter should be zero", async () => {
        let count = await instance.getCount.call({from: accounts[0]});
        assert.equal(count, 0);
    });

    it("Should increment counter", async () => {
        await instance.incrementCounter({from: accounts[0]});
        let count = await instance.getCount.call({from: accounts[0]});
        assert.equal(count, 1);
    });

    it("Should emit event on increment counter", async () => {
        let receipt = await instance.incrementCounter({from: accounts[0]});
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].args.count, 2);
    });

    it("Should decrement counter", async () => {
        let count = await instance.getCount.call({from: accounts[0]});
        await instance.decrementCounter({from: accounts[0]});
        let newCount = await instance.getCount.call({from: accounts[0]});
        assert.equal(newCount, count - 1);
    });

    it("Should emit event on decrement counter", async () => {
        let receipt = await instance.decrementCounter({from: accounts[0]});
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].args.count, 0);
    });

});