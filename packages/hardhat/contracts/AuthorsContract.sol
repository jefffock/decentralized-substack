//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

contract AuthorsListContract {

// State Variables
mapping(string => address) public subscriberMap;

/**
 * Function that adds an author to the list of all authors
 *
 */
function addAuthor(string memory authorName, address authorContractAddress) public{
    subscriberMap[authorName] = authorContractAddress;
}
}