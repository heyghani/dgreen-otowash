"use client";

import { useEffect, useState } from "react";
import { IService } from "@/libs/interfaces/order";
import TableService from "@/components/pages/services/tableService";
import axios from "axios";
import TableSearch from "@/components/table/search";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@mui/material";

export default function ServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<IService[]>("/api/services");
      setServices(response.data.data);
      if (response.status == 200) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Services</h1>

      <div className="container-card">
        <div className="flex flex-row items-center justify-between">
          <Button
            color="primary"
            variant="contained"
            startIcon={<Plus />}
            onClick={() => setShowModal(true)}
          >
            New
          </Button>
          <TableSearch />
        </div>

        <TableService
          data={services}
          isLoading={isLoading}
          totalData={services.length}
          page={1}
          totalPage={10}
        />
      </div>
    </div>
  );
}
