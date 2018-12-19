/** https://medium.com/coinmonks/getting-started-with-ethereum-blockchain-development-part-1-d6543b441bea */

pragma solidity ^0.4.22;

contract Counter {
    
    event CounterIncrementedEvent(int count);
    event CounterDecrementedEvent(int count);

    int private count = 0;

    function incrementCounter() public {
        count += 1;
        emit CounterIncrementedEvent(count);
    }

    function decrementCounter() public {
        count -= 1;
        emit CounterDecrementedEvent(count);
    }

    function getCount() public view returns (int) {
        return count;
    }
}
