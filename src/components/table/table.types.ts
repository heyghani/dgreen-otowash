/* eslint-disable @typescript-eslint/no-explicit-any */
// import modules
import React from "react";
import { TableCellProps } from "@mui/material";

export interface TableProps {
  title: string;
  page: number | undefined;
  totalPage: number | undefined;
  totalData: number | undefined;
  headCell: readonly IHeadCell[];
  tableData: any;
  placeholder?: string;
  loading?: boolean;
  toggleData?: any[];
  withFilter: boolean;
  action?: (props: any) => React.JSX.Element;
}

// define head cell
export interface IHeadCell {
  id: string;
  align: TableCellProps["align"];
  disablePadding: boolean;
  label: string;
  sort?: boolean;
  width?: string;
  render?: any;
}

// define table filter props
export interface TableFilterProps {
  placeholder?: string;
}

// define table header props
export interface TableHeaderProps {
  headCell: IHeadCell;
}

// define table custom cell props
export interface TableCustomCellProps {
  headCell: readonly IHeadCell[];
  item: any;
  action?: (id: string | number, type?: string | number) => React.JSX.Element;
}
