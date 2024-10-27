/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from '@pega/cosmos-react-core';
import React, { useState, useMemo, useCallback } from "react";
import { DataTableProps, RowProps } from "./DataTableLiteTypes";
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


interface ExpandableRowProps<T> extends RowProps<T> {
  rowIndex: number;
}

const ExpandableRow = <T,>({
  row,
  columns,
  renderExpandPane,
  rowIndex,
  isExpanded,
  toggleExpand,
}: ExpandableRowProps<T>) => {
  return (
    <>
      <tr>
        {renderExpandPane && (
          <TableData style={{ textAlign: "center" }}>
            <ExpandButton
              aria-expanded={isExpanded}
              aria-label="Expand details"
              variant='link'
              onClick={toggleExpand}
            >
              {isExpanded ?
              <Icon
                name='caret-down'
                role='img'
                aria-label='Collapse details'
                size='s'/>
              : <Icon
                  name='caret-right'
                  role='img'
                  aria-label='caret-right'
                  size='s'/>}
            </ExpandButton>
          </TableData>
        )}
        {columns.map((column, index) => (
          <TableData
            key={column.header}
            style={{
              width: column.width || (index === columns.length - 1 ? "auto" : "150px"), // Set width or make last column flexible
            }}
          >
            {column.renderCell
              ? column.renderCell(row[column.accessor])
              : (row[column.accessor] as React.ReactNode) ?? null}
          </TableData>
        ))}
      </tr>
      {isExpanded && renderExpandPane && (
        <tr>
          <TableData colSpan={columns.length + 1} style={{ padding: "16px" }}>
            {renderExpandPane(row)}
          </TableData>
        </tr>
      )}
    </>
  );
};

export default ExpandableRow;
