export declare const getDataPageResults: (pConn: any, paramDataPage: string) => Promise<any>;
export declare const displayDPValues: (dataAsArray: []) => void;
export declare const getMUISimpleTableRowValues: (dataAsArray: []) => any;
export declare const getMUICustomerListRowValues: (dataAsArray: []) => any;
export declare const inspectCaseSummaryAndReturnList: (pConn: any, paramDataPage: string) => Promise<any>;
export declare const getDisbursementEmbeddedData: (paramPConn: any, paramEmbedName: string) => Promise<{
    [key: string]: any;
}[] | undefined>;
export declare const getDisbursementDataAsRowData: (dataPageResults: []) => any;
export declare const getSelectedRowIndex: (customerTableData: any, rowId: string) => Promise<any>;
//# sourceMappingURL=utils.d.ts.map