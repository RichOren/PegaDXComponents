/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState, useMemo, useCallback } from "react";
import { Text, withConfiguration, Icon, registerIcon } from "@pega/cosmos-react-core";
import ExpandableRow from './ExpandableRow';
import {
  DataTableWrapper,
  DetailsHeader,
  ExpandButton,
  FilterInput,
  PaginationButton,
  PaginationWrapper,
  Table,
  TableData,
  TableHead,
} from "./styles";

import { DataTableProps, RowProps } from "./DataTableLiteTypes";
import * as caretDown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';
import * as caretRight from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';
import * as arrowDown from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-down.icon';
import * as arrowUp from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-up.icon';
import { margin } from 'polished';

registerIcon(caretDown);
registerIcon(caretRight);
registerIcon(arrowDown);
registerIcon(arrowUp);

export const DataTable = <T,>({
  data,
  columns,
  renderExpandPane,
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;

  const handleSort = useCallback(
    (column: keyof T) => {
      if (sortColumn === column) {
        setSortDirection((prevDirection) =>
          prevDirection === "asc" ? "desc" : "asc"
        );
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(e.target.value);
    },
    []
  );

  const toggleExpandRow = useCallback((rowIndex: number) => {
    setExpandedRows((prev) => {
      // If rowIndex is already in the array, remove it; otherwise, add it
      if (prev.includes(rowIndex)) {
        return prev.filter((index) => index !== rowIndex);
      } else {
        return [...prev, rowIndex];
      }
    });
  }, []);

  const processedData = useMemo(() => {
    let updatedData = [...data];
    if (sortColumn) {
      updatedData = updatedData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    if (filterText) {
      updatedData = updatedData.filter((row) => {
        return Object.values(row as { [key: string]: unknown }).some((value) =>
          typeof value === "string" && value.toLowerCase().includes(filterText.toLowerCase())
        );
      });
    }
    return updatedData;
  }, [data, sortColumn, sortDirection, filterText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return processedData.slice(startIndex, startIndex + rowsPerPage);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);

  return (
    <DataTableWrapper>
      <FilterInput
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={handleFilterChange}
        aria-label="Filter table data"
      />
      <Table role="grid" aria-label="User information table">
        <thead>
          <tr>
            {renderExpandPane && (
              <DetailsHeader scope="col">
                <Text variant='h6'>Details</Text>
              </DetailsHeader>
            )}
            {columns.map((column, index) => (
              <TableHead
                key={column.header}
                scope="col"
                onClick={() => handleSort(column.accessor)}
                aria-sort={
                  sortColumn === column.accessor
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                style={{
                  width: column.width || (index === columns.length - 1 ? "auto" : "150px"), // Set width or make last column flexible
                }}
              >
                <Text variant='h6'>{column.header} {sortColumn === column.accessor &&
                  (sortDirection === "asc" ?
                  <Icon
                    name='arrow-down'
                    role='img'
                    aria-label='arrow-down'
                    size='font-size'
                  /> :
                  <Icon
                  name='arrow-up'
                  role='img'
                  aria-label='arrow-up'
                  size='font-size'
                  />)}
                </Text>
              </TableHead>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <ExpandableRow<T>
              key={rowIndex}
              row={row}
              columns={columns}
              renderExpandPane={renderExpandPane}
              rowIndex={(currentPage - 1) * rowsPerPage + rowIndex}
              isExpanded={expandedRows.includes(
                (currentPage - 1) * rowsPerPage + rowIndex
              )}
              toggleExpand={() =>
                toggleExpandRow((currentPage - 1) * rowsPerPage + rowIndex)
              }
            />
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>
        <Text variant='primary' aria-live="polite">
          {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            processedData.length
          )} of ${processedData.length}`}
        </Text>
        <div style={{ marginLeft: '8px' }}>
          <PaginationButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            variant='link'
          >
              <Icon
                name='caret-left'
                role='img'
                aria-label='caret-left'
                size='s'
              />
          </PaginationButton>
          <PaginationButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            variant='link'
          >
            <Icon
              name='caret-right'
              role='img'
              aria-label='caret-right'
              size='s'
            />
          </PaginationButton>
        </div>
      </PaginationWrapper>
    </DataTableWrapper>
  );
};

export default withConfiguration(DataTable);
