// import modules
import React from "react";

// import MUI components
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

// import components
import { TableHeaderProps } from "./table.types";

// define table header
const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const { headCell } = props;

  return (
    <TableCell
      key={headCell.id + headCell.label}
      align={headCell.align}
      padding={headCell.disablePadding ? "none" : "normal"}
      sx={{
        fontSize: "16px",
        fontWeight: "600",
        paddingY: "25px",
        color: "white",
      }}
    >
      {headCell.sort ? (
        <TableSortLabel
          key={headCell.id + headCell.label}
          sx={{ fill: "white" }}
        >
          {headCell.label.toLowerCase() === "action" ? "" : headCell.label}
        </TableSortLabel>
      ) : (
        <>{headCell.label.toLowerCase() === "action" ? "" : headCell.label}</>
      )}
    </TableCell>
  );
};

// export table header
export default TableHeader;
