import React, { useContext, createContext, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "./tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) => {
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
};

const TrackingContext = createContext();

const TrackingContextProvider = ({ children }) => {
  const dappName = "Shipment Tracker";
  const [currentUser, setCurrentUser] = useState("");
  const createShipment = async (items) => {
    const { receiver, pickupTime, distance, price } = items;
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime,
        distance,
        ethers.parseUnits(price, 18),
        {
          value: ethers.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log("createdITem", createItem);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
      return allShipments;
    } catch (e) {
      console.log(e);
    }
  };

  const getShipmentCount = async () => {
    try {
      if (!window.ethereum) return "install metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentCount = await contract.getShipmentCount(accounts[0]);
      return shipmentCount.toNumber();
    } catch (e) {
      console.log(e);
    }
  };

  const completeShipment = async (completeShip) => {
    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "install metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );
      transaction.wait();
      console.log(transaction)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TrackingContext.Provider value={{ fetchContract }}>
      {children}
    </TrackingContext.Provider>
  );
};

const useTrackingContext = () => useContext(TrackingContext);

export { useTrackingContext, TrackingContextProvider };