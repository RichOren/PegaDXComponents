/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "./DataTableLite";
import { Column } from "./DataTableLiteTypes";
import { withConfiguration } from '@pega/cosmos-react-core';
import { getDisbursementEmbeddedData } from './utils';

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

    // Get the keys from the first object in the data array
    const keys = Object.keys(disbursementTableData[0]);

     // Map over the keys to create column definitions
    return keys.map((key) => ({
      header: formatHeader(key),
      accessor: key,
      width: '200px' // Set a default width for all columns
    }));
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
