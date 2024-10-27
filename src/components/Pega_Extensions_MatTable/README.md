# MUI Components - Test Documentation

This project contains various Material UI (MUI) table components that can be used for different data display and editing scenarios. These components demonstrate the usage of MUI DataGrid and its related features for both simple and complex tables.

## Components Overview

### 1. MUI Editable Customer List
This component was originally created to display and edit a list of customers using MUI.

MUI Editable Customer List
MUIEditableCustomerList dataPageProp={dataPage} pConnectProp={getPConnect}

### 2. MUI Simple Table
This component demonstrates a simple table using MUI DataGrid. Uncomment to test the simple table:

MUI Simple table (@mui/x-data-grid)
MUISimpleTable dataPageProp={dataPage} pConnectProp={getPConnect}

For more details, visit the [MUI Data Grid documentation](https://mui.com/x/react-data-grid/).

### 3. MUI Editable Simple Table
This component adds editing functionality to a simple table, with support for date pickers. Uncomment to test:

MUI Editable simple table (@mui/x-data-grid)
MUIEditableSimpleTable dataPageProp={dataPage} pConnectProp={getPConnect}

For more information on editable tables, check the [Editing with Date Pickers example](https://mui.com/x/react-data-grid/recipes-editing/#system-EditingWithDatePickers.tsx).

### 4. MUI Complex Table
This table is an advanced example using MUI's premium DataGrid with complex features and conditional validation. Uncomment to test:

MUI Complex table (@mui/x-data-grid-premium)
MUIComplexTable

For more details on complex table configurations, refer to the [MUI Data Grid premium documentation](https://mui.com/x/react-data-grid/recipes-editing/#conditional-validation).

### 5. MUI Table Using Data Reference
This table example directly reads data from `DataPage` using a data reference. It supports mandatory cell editing and pagination:

MUI Table using data reference (Directly reading from DataPage)
MUIMandatoryCell pConnectProp={getPConnect} dataPageProp={dataPage} paginationSizeProp={paginationSize}

## How to Use

1. Uncomment the desired component in the code file.
2. Update the `dataPageProp`, `pConnectProp`, and any other necessary props based on your application's needs.
3. Review the [MUI Data Grid documentation](https://mui.com/x/react-data-grid/) for further customization and options.

## Links to MUI Components
- [MUI Data Grid Overview](https://mui.com/x/react-data-grid/)
- [MUI Editable Grid with Date Pickers](https://mui.com/x/react-data-grid/recipes-editing/#system-EditingWithDatePickers.tsx)
- [MUI Premium Data Grid Documentation](https://mui.com/x/react-data-grid-premium/)
