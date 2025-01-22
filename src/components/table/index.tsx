/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import modules
import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
  useTheme,
  Chip,
} from "@mui/material";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { updatePagination } from "@/store/slices/paginationSlice";
import { TableProps, TableCustomCellProps } from "./table.types";
import TableHeader from "./header";
import moment from "moment";
import { rupiahFormatter } from "@/utils/rupiahFormatter";

const TableCustomCell = (props: TableCustomCellProps) => {
  return (
    <React.Fragment>
      {props.headCell?.map((column, idx) => {
        if (column.label.toLowerCase() === "action" && props.action) {
          return (
            <TableCell
              align={column.align}
              key={column.label + props.item.id + idx}
              sx={{ paddingY: "8px" }}
            >
              {props.action(props.item.id)}
            </TableCell>
          );
        }
        if (column.label.toLowerCase() === "start time") {
          return (
            <TableCell
              align={column.align}
              key={column.label + props.item.id + idx}
              sx={{ paddingY: "8px" }}
            >
              {moment(props.item[column.id]).format("HH:mm DD MMM YY")}
            </TableCell>
          );
        }
        if (column.label.toLowerCase() === "finish time") {
          return (
            <TableCell
              align={column.align}
              key={column.label + props.item.id + idx}
              sx={{ paddingY: "8px" }}
            >
              {props.item[column.id]
                ? moment(props.item[column.id]).format("HH:mm DD MMM YY")
                : "-"}
            </TableCell>
          );
        }
        if (column.label.toLowerCase() === "service types") {
          return (
            <TableCell
              align={column.align}
              key={column.label + props.item.id + idx}
              sx={{ paddingY: "8px" }}
            >
              {props.item[column.id].map((item: any, idx: number) => (
                <Chip
                  key={idx}
                  label={`${item.serviceType}: ${rupiahFormatter(item.price)}`}
                  sx={{
                    marginRight: "5px",
                    textTransform: "capitalize",
                  }}
                />
              ))}
            </TableCell>
          );
        }
        if (column.label.toLowerCase() === "status") {
          return (
            <TableCell
              align={column.align}
              key={column.label + props.item.id + idx}
              sx={{
                fontSize: "16px",
                paddingY: "8px",
              }}
            >
              <Chip
                label={props.item[column.id]}
                sx={{
                  background:
                    props.item[column.id] === "completed"
                      ? "#259420"
                      : "#BA8623",
                }}
              />
            </TableCell>
          );
        }
        return (
          <TableCell
            align={column.align}
            key={column.label + idx + props.item.id}
            sx={{
              fontSize: "16px",
              color: "black",
              paddingY: "8px",
            }}
          >
            {props.item[column.id]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );
};

const TableComponent: React.FC<TableProps> = (props: TableProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { pagination, filter } = useSelector((state: RootState) => state);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    dispatch(
      updatePagination({
        ...pagination,
        currentPage: newPage,
      })
    );
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      gap={2}
    >
      <Box
        sx={{
          padding: "0!important",
          width: "100%",
          display: "table",
          tableLayout: "fixed",
          overflow: "scroll",
        }}
        className={"cardComponent"}
        mt={3}
      >
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                background: theme.palette.primary.main,
                borderBottom: "1px solid #FFFFFF1A",
              }}
            >
              <TableRow>
                {props.headCell?.map((item, idx) => (
                  <TableHeader key={"head" + item.id + idx} headCell={item} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ minHeight: 640 }}>
              {!props.loading && props.tableData?.length > 0 ? (
                <>
                  {props.tableData?.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCustomCell
                        headCell={props.headCell}
                        item={item}
                        action={props.action ? props.action : undefined}
                      />
                    </TableRow>
                  ))}
                  {props.tableData.length < 15 ? (
                    <TableRow>
                      <TableCell colSpan={props.headCell.length}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          height={49 * (15 - props.tableData.length)}
                        ></Stack>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {props.loading ? (
                    <TableRow>
                      <TableCell colSpan={props.headCell.length}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          height={640}
                        >
                          <Typography fontSize="20px">Loading...</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {filter.query && props.totalData === 0 ? (
                        <TableRow>
                          <TableCell colSpan={props.headCell.length}>
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              height={640}
                            >
                              <Typography
                                fontSize="20px"
                                fontWeight={600}
                                mt={1}
                                sx={{ color: "white" }}
                              >
                                Data not found
                              </Typography>
                              <Typography
                                fontSize="16px"
                                fontWeight={400}
                                sx={{ textAlign: "center" }}
                              >
                                We couldn&apos;t find the data you&apos;re
                                looking for
                              </Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell colSpan={props.headCell.length}>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                height={640}
                              >
                                <Typography
                                  fontSize="20px"
                                  fontWeight={600}
                                  mt={2}
                                  sx={{ color: "white" }}
                                >
                                  No data available
                                </Typography>
                                <Typography
                                  fontSize="16px"
                                  fontWeight={400}
                                  sx={{ textAlign: "center" }}
                                >
                                  Once recorded, your data will showed here.
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {props.totalPage && props.totalPage > 0 && (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={5}
            py={1.5}
          >
            <Typography>
              Showing {props.tableData.length} of {props.totalData} Result
            </Typography>
            <Pagination
              color="primary"
              count={props.totalPage}
              page={props.page}
              onChange={handlePageChange}
              sx={{
                ".MuiPaginationItem-root": {
                  color: "black",
                  "&.Mui-selected": {
                    background: "primary",
                    color: "white",
                  },
                },
              }}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  components={{
                    next: CaretRight,
                    previous: CaretLeft,
                  }}
                />
              )}
            />
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

// export table component
export default TableComponent;
