import React, { useState, useEffect } from "react";

import { useTrackingContext } from "@/context/Tracking";

import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "@/components";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    getShipment,
    completeShipment,
    startShipment,
    getShipmentCount,
  } = useTrackingContext();
  const [createShipmentModal, setCreateShipmentModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  const [allShipmentData, setAllShipmentData] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setAllShipmentData(allData);
    };
  });

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModa={setCompleteModal}
        setGetModal={setGetModal}
        setStartModal={setStartModal}
      />
      <Table
        setCreateShipmentModal={setCreateShipmentModal}
        allShipmentData={allShipmentData}
      />
      <Form
        createShipmentModal={createShipmentModal}
        createShipment={createShipment}
        setCreateShipmentModal={setCreateShipmentModal}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModal={getModal}
        setGetModal={setGetModal}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
};

export default index;
