/** https://www.ethereum.org/greeter */
pragma solidity ^0.4.22;

contract Mortal {

    /* Owner of the contract */
    address owner;

    /* Sets owner of contract on init */
    constructor() public {
        owner = msg.sender;
    }

    /* Let owner kill contract to recover his/her funds */
    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(msg.sender);
        }
    }

}

contract Greeter is Mortal {

    /* Greeting to respond with */
    string greeting;

    /* Sets greeting on init */
    constructor(string memory _greeting) public {
        greeting = _greeting;
    }

    /* Return the greeting upon call */
    function greet() public view returns (string memory) {
        return greeting;
    }

}
