"use client";

import React from "react";

import Table from "@/components/table";

import { IHeadCell } from "@/components/table/table.types";
import { IOrder } from "@/libs/interfaces/order";
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
    id: "customerName",
    align: "left",
    disablePadding: false,
    sort: false,
    label: "Name",
  },
  {
    id: "unitName",
    align: "left",
    disablePadding: false,
    sort: false,
    label: "Unit",
  },
  {
    id: "unitNumber",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Unit Number",
  },
  {
    id: "startTime",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Start Time",
  },
  {
    id: "finishTime",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Finish Time",
  },
  {
    id: "status",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Status",
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
  data: IOrder[];
  page: number;
  totalPage: number;
  totalData: number;
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
}

const TableContent: React.FC<TableContentProps> = (
  props: TableContentProps
) => {
  const TableAction = (id: number) => {
    return (
      <>
        <button
          onClick={() => {
            props.onClickEdit(id);
          }}
          className="bg-[#fbc02d] text-white px-3 py-2 mr-2 shadow-lg rounded-lg"
        >
          <PencilSimple size={16} />
        </button>
        <button
          onClick={() => {
            props.onClickDelete(id);
          }}
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
