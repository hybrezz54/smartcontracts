/** https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e */
pragma solidity ^0.4.22;

contract Wrestler {

    /* addresses for wrestlers */
    address public wrestler1;
    address public wrestler2;

    /* state of whether a wrestler has played already */
    bool public wrestler1Played;
    bool public wrestler2Played;

    /* amount of money each wrestler puts in */
    uint private wrestler1Deposit;
    uint private wrestler2Deposit;

    /* game status */
    bool private gameFinished;
    address public winner;
    uint gains;

    /* Define events */
    event WrestlingStartsEvent(address wrestler1, address wrestler2);
    event EndOfRoundEvent(uint wrestler1Deposit, uint wrestler2Deposit);
    event EndOfWrestlingEvent(address winner, uint gains);

    /* Init wrestler1 */
    constructor() public {
        wrestler1 = msg.sender;
    }

    /* Let another party register as wrestler2 */
    function registerAsAnOpponent() public {
        require(wrestler2 == address(0), "Game is already in play!");
        wrestler2 = msg.sender;
        emit WrestlingStartsEvent(wrestler1, wrestler2);
    }

    /* Carry out wrestle transaction */
    function wrestle() public payable {
        require(!gameFinished && (msg.sender == wrestler1 || msg.sender == wrestler2), "Game is finished or contract invoked by other parties!");

        if (msg.sender == wrestler1) {
            require(wrestler1Played == false, "Wrestler 1 has already played!");
            wrestler1Played = true;
            wrestler1Deposit = wrestler1Deposit + msg.value;
        } else if (msg.sender == wrestler2) {
            require(wrestler2Played == false, "Wrestler 2 has already played!");
            wrestler2Played = true;
            wrestler2Deposit = wrestler1Deposit + msg.value;
        }

        if (wrestler1Played && wrestler2Played) {
            if (wrestler1Deposit >= wrestler2Deposit * 2) {
                endOfGame(wrestler1);
            } else if (wrestler2Deposit >= wrestler1Deposit * 2) {
                endOfGame(wrestler2);
            } else {
                endOfRound();
            }
        }
    }

    /* Handle end of round */
    function endOfRound() internal {
        wrestler1Played = false;
        wrestler2Played = false;

        /* emit event */
        emit EndOfRoundEvent(wrestler1Deposit, wrestler2Deposit);
    }

    /* Handle end of game */
    function endOfGame(address _winner) internal {
        gameFinished = true;
        winner = _winner;
        gains = wrestler1Deposit + wrestler2Deposit;
        
        /* emit event */
        emit EndOfWrestlingEvent(winner, gains);
    }

    /**
    * The withdraw function, following the withdraw pattern shown and explained here:
    * http://solidity.readthedocs.io/en/develop/common-patterns.html#withdrawal-from-contracts
    *
    * Let winner withdraw his/her gains
    */
    function withdraw() public {
        require(gameFinished && winner == msg.sender, "Game is not finished or withdrawn not called by winner!");

        uint amount = gains;
        gains = 0;
        msg.sender.transfer(amount);
    }

}
