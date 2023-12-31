import React, { useContext, createContext, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "./tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
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
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.parseUnits(price, 18),
        {
          value: ethers.parseUnits(price, 18),
        }
      );
      await createItem.wait();
    } catch (e) {
      console.log("error while creating", e);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions(); 
      const allShipments = shipments.map((shipment) => {
        return {
          sender: shipment?.sender,
          receiver: shipment?.received,
          price: ethers.formatEther(shipment?.prive),
          pickupTime: Number(shipment?.pickupTime),
          deliveryTime: Number(shipment?.deliveryTime),
          distance: Number(shipment?.distance),
          isPaid: shipment?.isPaid,
          status: shipment?.status,
        };
      });
      return allShipments;
    } catch (e) {
      console.log("error in allshipments", e);
    }
  };

  const getShipmentCount = async () => {
    try {
      if (!window.ethereum) return "install metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentCount = await contract.getShipmentCount(accounts[0]);
      return Number(shipmentCount);
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
      const signer = await provider.getSigner();
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
      console.log(transaction);
    } catch (e) {
      console.log(e);
    }
  };

  const getShipment = async (index) => {
    try {
      if (!window.ethereum) return "install metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: Number(shipment[2]),
        deliveryTime: Number(shipment[3]),
        distance: Number(shipment[4]),
        price: ethers.formatEther(shipment[5]?.toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
      return SingleShipment;
    } catch (e) {
      console.log(e);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;
    try {
      if (!window.ethereum) return "install metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );
      await shipment.wait();
    } catch (e) {
      console.log("sory no shipment", e);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (e) {
      console.log("not connected");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (e) {
      console.log("went wrong");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        dappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

const useTrackingContext = () => useContext(TrackingContext);

export { useTrackingContext, TrackingContextProvider };
