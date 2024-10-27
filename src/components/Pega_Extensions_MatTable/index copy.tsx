/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface Column<T> {
  header: string;
  accessor: keyof T;
  renderCell?: (value: T[keyof T]) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Array<Column<T>>;
  renderExpandPane?: (row: T) => React.ReactNode;
}

interface RowProps<T> {
  row: T;
  columns: Array<Column<T>>;
  isExpanded: boolean;
  toggleExpand: () => void;
  renderExpandPane?: (row: T) => React.ReactNode;
}

const DataTableWrapper = styled.div`
  width: 100%;
`;

const FilterInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 250px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
`;

const DetailsHeader = styled(TableHead)`
  width: 50px;
`;

const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const ExpandButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  &:disabled {
    cursor: not-allowed;
    color: #ccc;
  }
`;

const DataTable = <T,>({
  data,
  columns,
  renderExpandPane,
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
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
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  }, []);

  const processedData = useMemo(() => {
    let updatedData = [...data];
    if (sortColumn) {
      updatedData = updatedData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
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
              <DetailsHeader scope="col">Details</DetailsHeader>
            )}
            {columns.map((column) => (
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
              >
                {column.header}
                {sortColumn === column.accessor &&
                  (sortDirection === "asc" ? " ↑" : " ↓")}
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
              isExpanded={expandedRows.has(
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
        <span aria-live="polite">
          {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            processedData.length
          )} of ${processedData.length}`}
        </span>
        <div>
          <PaginationButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            &#8249;
          </PaginationButton>
          <PaginationButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            &#8250;
          </PaginationButton>
        </div>
      </PaginationWrapper>
    </DataTableWrapper>
  );
};

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
              onClick={toggleExpand}
            >
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </ExpandButton>
          </TableData>
        )}
        {columns.map((column) => (
          <TableData key={column.header}>
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

// Example Usage:
const ExampleTable: React.FC = () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Manager",
    },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Developer" },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "Designer",
    },
    { id: 6, name: "Diana Evans", email: "diana@example.com", role: "Tester" },
    { id: 7, name: "Eve Foster", email: "eve@example.com", role: "Support" },
    { id: 8, name: "Frank Green", email: "frank@example.com", role: "Admin" },
    { id: 9, name: "Grace Hall", email: "grace@example.com", role: "HR" },
    {
      id: 10,
      name: "Hank Irwin",
      email: "hank@example.com",
      role: "Developer",
    },
  ];

  const columns: Array<Column<(typeof data)[0]>> = [
    {
      header: "Name",
      accessor: "name",
      renderCell: (value: string | number) => (
        <a href={`https://example.com/users/${value}`}>{value}</a>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      renderCell: (value: string | number) => (
        <a href={`mailto:${value}`}>{value}</a>
      ),
    },
    { header: "Role", accessor: "role" },
  ];

  const renderExpandPane = (row: (typeof data)[0]) => (
    <div>
      <p>Additional details for {row.name}:</p>
      <p>Role: {row.role}</p>
    </div>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      renderExpandPane={renderExpandPane}
    />
  );
};

export default ExampleTable;
