"use client";

import React from "react";

import Table from "@/components/table";

import { IHeadCell } from "@/components/table/table.types";
import { IService } from "@/libs/interfaces/order";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

const headCells: IHeadCell[] = [
  {
    id: "id",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "ID",
  },
  {
    id: "serviceName",
    align: "left",
    disablePadding: false,
    sort: false,
    label: "Name",
  },
  {
    id: "serviceTypes",
    align: "left",
    disablePadding: false,
    sort: false,
    label: "Service Types",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Action",
  },
];

interface TableContentProps {
  isLoading: boolean;
  data: IService[];
  page: number;
  totalPage: number;
  totalData: number;
}

const TableContent: React.FC<TableContentProps> = (
  props: TableContentProps
) => {
  const TableAction = () => {
    return (
      <>
        <button
          onClick={() => {}}
          className="bg-[#fbc02d] text-white px-3 py-2 mr-2 shadow-lg rounded-lg"
        >
          <PencilSimple size={16} />
        </button>
        <button
          onClick={() => {}}
          className="bg-[#f44336] text-white px-3 py-2 shadow-lg rounded-lg"
        >
          <TrashSimple size={16} />
        </button>
      </>
    );
  };

  return (
    <Table
      withFilter
      headCell={headCells}
      placeholder="Search"
      tableData={props.data || []}
      page={props.page}
      totalPage={props.totalPage || 0}
      totalData={props.totalData || 0}
      title="Orders"
      action={TableAction}
      loading={props.isLoading}
    />
  );
};

export default TableContent;
