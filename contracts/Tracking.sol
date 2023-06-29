// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    struct Shipment {
        address sender;
        address received;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 prive;
        ShipmentStatus status;
        bool isPaid;
    }
    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TypeShipment {
        address sender;
        address received;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 prive;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] typeShipments;
}
