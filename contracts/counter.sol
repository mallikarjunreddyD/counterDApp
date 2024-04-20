//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

contract counterDAPP {
    //Create a counter varaible
    //Do CRUD operations

    uint public counter;
    event counterUpdate(uint counter);

    constructor(uint _initialValue) {
        counter = _initialValue;
    }

    function getCounterValue() public view returns(uint c) {
        return counter;
    }

    function incrementCounter() public {
        counter++;
        emit counterUpdate(counter);
    }

    function decrementCounter() public  {
        counter--;
        emit counterUpdate(counter);
    }

    function incrementBy(uint value) public  {
        counter = counter + value;
        emit counterUpdate(counter);
    }

    function decrementBy(uint value) public  {
        counter = counter - value;
        emit counterUpdate(counter);
    }

    function reset() public {
        counter = 0;
        emit counterUpdate(counter);
    }
}
