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

  return <div>Hello</div>;
};

export default index;
