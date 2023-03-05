//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AuthorsListContract {

    // State Variables
    mapping(address => address) public subscriberMap;

    /**
    * Function that adds an author to the list of all authors
    *
    */
    function addAuthor(address authorName, address authorContractAddress) public{
        subscriberMap[authorName] = authorContractAddress;
    }
}