/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "./DataTableLite";
import { Column } from "./DataTableLiteTypes";
import { withConfiguration } from '@pega/cosmos-react-core';
import { getDisbursementEmbeddedData } from './utils';
import CheckCross from './CellRenderers/CheckCross';
import { Link, NoValue } from '@pega/cosmos-react-core';
import linkRenderers from './CellRenderers/Link';

type DataTableProps = {
  heading: string;
  children: any;
  dataPage: string;
  embedDataPage: string;
  getPConnect: any;
  paginationSize: string;
  prefill: any;
}

// Utility function to transform camelCase strings to a more readable format
const formatHeader = (key: string) => {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2') // Add a space before each capital letter
            .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
};

export const PegaExtensionsDataTableLite = (props: DataTableProps) => {
  const { heading, children, dataPage, embedDataPage, getPConnect, paginationSize, prefill } = props;

  const [disbursementTableData, setDisbursementTableData] = useState<any[]>([]);
  const [pageRef, setPageRef] = useState('');

  const refreshTableData = () => {
    if (embedDataPage) {
      getDisbursementEmbeddedData(getPConnect, embedDataPage).then((embeddedData) => {
        const mainDataArray = embeddedData as any[];
        if (mainDataArray && mainDataArray.length > 0) {
          setDisbursementTableData(mainDataArray);
          console.log('Fetched and set Disbursement Table Data: ', mainDataArray);
        } else {
          console.warn('Embedded data is empty or undefined.');
        }
      });
    } else {
      console.warn('embedDataPage is not provided');
    }

    console.log('paginationSizeProp: ', paginationSize);
    console.log('prefillProp: ', prefill);
  };

  useEffect(() => {
    refreshTableData();
    if (!pageRef && getPConnect) {
      setPageRef(getPConnect().getPageReference());
    }
  }, []);

  useEffect(() => {
    console.log('Updated Disbursement Table Data:', disbursementTableData);
  }, [disbursementTableData]);

const columns: Column<any>[] = useMemo(() => {
  if (disbursementTableData.length === 0) return [];

  // Get the keys from the first object in the data array, excluding "id" and "classID"
  const keys = Object.keys(disbursementTableData[0]).filter(key => key !== "id" && key !== "classID");

  // Iterate over keys to log key and type of their value
  keys.forEach(key => {
    const value = disbursementTableData[0][key];
    const valueType = typeof value;
    console.log(`Key: ${key}, Type: ${valueType}`);
  });

  // Map over the keys to create column definitions with different renderCells
  return keys.map((key) => {
    // Determine the renderCell based on key or value type
    let renderCell: (value: any) => JSX.Element = (value) => <span>{value}</span>;

    // Use specific renderers for different cases
    if (key.toLowerCase().includes("price") || key.toLowerCase().includes("amount")) {
      renderCell = (value) => <span>${value.toFixed(2)}</span>; // Example for currency formatting
    } else if (key.toLowerCase().includes("link") || key.toLowerCase().includes("url")) {
      renderCell = (value) => linkRenderers.URL({ value }); // Use the imported LinkRenderer for URLs
    } else if (key.toLowerCase().includes("email")) {
      renderCell = (value) => linkRenderers.Email({ value }); // Use the imported LinkRenderer for Emails
    } else if (key.toLowerCase().includes("phone")) {
      renderCell = (value) => linkRenderers.Phone({ value }); // Use the imported LinkRenderer for Phone numbers
    } else if (typeof disbursementTableData[0][key] === "boolean") {
      renderCell = (value) => <CheckCross value={value} />; // Use CheckCross for boolean values
    }

    // Return the column definition
    return {
      header: formatHeader(key),
      accessor: key,
      renderCell,
      width: '200px' // Set a default width for all columns
    };
  });
}, [disbursementTableData]);

  const renderExpandPane = (row: typeof disbursementTableData[0]) => (
    <div>
      {children}
    </div>
  );

  return (
    <DataTable
      data={disbursementTableData}
      columns={columns}
      renderExpandPane={renderExpandPane}
    />
  );
};

export default withConfiguration(PegaExtensionsDataTableLite);
