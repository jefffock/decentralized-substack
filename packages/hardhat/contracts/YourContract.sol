//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract {

    // State Variables
    address public authorAddress;
    string public authorName;
    string public publicationName;
    uint256 private subscriptionPrice = 0;
    mapping(address => uint) private subscriberMap;
    string[] public posts;

    // Events: a way to emit log statements from smart contract that can be listened to by external parties
    event newPost(string postAddress);
    event newExtendSubscriptionEvent(address subscriber, uint256 extensionLength);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner, string memory _authorName, string memory _publicationName, uint256 _subscriptionPrice) {
        authorAddress = _owner;
        authorName = _authorName;
        subscriptionPrice = _subscriptionPrice;
        publicationName = _publicationName;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == authorAddress, "Not the Owner");
        _;
    }

    /**
     * Function that allows anyone to Extend the subscription for the particular author
     *
     */
    function extendSubscription() public payable returns (uint256){
        // Print data to the hardhat chain console. Remove when deploying to a live network.
        console.log("Getting new subscriber - ", msg.sender);
        uint256 subscriptionIncreaseLength = 0;
        if(subscriptionPrice > 0) {
            subscriptionIncreaseLength = (msg.value/subscriptionPrice)*86400*30;
        } else {
            subscriptionIncreaseLength = 90*86400*30;
        }

        if (subscriberMap[msg.sender] < block.timestamp ) {
            subscriberMap[msg.sender] = block.timestamp + subscriptionIncreaseLength;
        } else {
            subscriberMap[msg.sender] = subscriberMap[msg.sender] + subscriptionIncreaseLength;
        }
        // emit: keyword used to trigger an event
        emit newExtendSubscriptionEvent(msg.sender, subscriptionIncreaseLength);
        return subscriberMap[msg.sender];
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() isOwner public {
        (bool success,) = authorAddress.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function publishPost(string memory postAddress) isOwner public {
        posts.push(postAddress);
    }

    /**
     * Function that allows the owner to change monthly price
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function changePrice(uint256 _newPrice) isOwner public {
        subscriptionPrice = _newPrice;
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function checkSubscriber(address _userAddress) view public returns (bool){
        if(subscriberMap[_userAddress] < block.timestamp) {
            return false;
        }
        return true;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
