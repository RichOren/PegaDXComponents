/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import PropTypes from 'prop-types';
import { Text, FieldGroup, Grid, withConfiguration, Banner } from '@pega/cosmos-react-core';

import { Fragment, useEffect, useState } from "react";

// Import two custom React components
import MUISimpleTable from './MUISimpleTable';
import MUIComplexTable from './MUIComplexTable';
import MUIEditableSimpleTable from './MUIEditableSimpleTable';
import MUIEditableCustomerList from './MUIEditableCustomerList';
import MUIMandatoryCell from './MUIMandatoryCell';
import MUIEmbeddedData from './MUIEmbeddedData';
import MUIMasterDetailTable from './MUIMasterDetailTable';
import { StyledGridContainer } from './styles';

// Define the props
type PegaComponentsMatTableProps = {
  heading: string;
  NumCols: string;
  children: any;
  dataPage: string;
  embedDataPage: string;
  getPConnect: any;
  paginationSize: string;
  prefill: any;
};

// This props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaComponentsMatTable(props: PegaComponentsMatTableProps) {
   const { heading,
          NumCols,
          children,
          dataPage,
          embedDataPage,
          getPConnect,
          paginationSize,
          prefill,
        } = props;

  const nCols = parseInt(NumCols, 10);
  const context = getPConnect().getContextName();

  return (
    <FieldGroup name={heading}>
        <Grid
          container={{
            cols: `repeat(${nCols}, minmax(0, 1fr))`,
            gap: 2
          }}
          as={StyledGridContainer}
        >
          {/* I'm hiding the children display here so that embedded data model still in the case view but not visible in the web page */}
          {/* {children} */}

        </Grid>
        <br/>
        <Fragment>
            <Text variant='h2' status={undefined}>
                MUI Table using Embedded data (Reading from embedded page list)
            </Text>
            <MUIEmbeddedData pConnectProp={getPConnect} embedDataPageProp={embedDataPage} paginationSizeProp={paginationSize} />
            <br/><br/>
            <Text variant='h2' status={undefined}>
                MUI Master details testing table
            </Text>
            <MUIMasterDetailTable pConnectProp={getPConnect} dataPageProp={dataPage} paginationSizeProp={paginationSize}/>
        </Fragment>
    </FieldGroup>
  );
}

// Defaulting props here
PegaComponentsMatTable.defaultProps = {
  dataPage: 'D_DisbursementList',
};
// props types are defined here for required props
PegaComponentsMatTable.propTypes = {
  dataPage: PropTypes.string,
};

export default withConfiguration(PegaComponentsMatTable);
