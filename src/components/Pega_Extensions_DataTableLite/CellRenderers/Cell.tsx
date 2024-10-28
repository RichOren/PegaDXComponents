import PropTypes from 'prop-types';

import { NoValue } from '@pega/cosmos-react-core';

import { isAccessibleValue } from './Utils';

type CellProps = {
  getFormattedValue: () => any;
};

const Cell = ({ getFormattedValue }: CellProps) => {
  const value = getFormattedValue?.();

  if (!isAccessibleValue(value)) return <NoValue />;
  return <>{value}</>;
};

Cell.propTypes = {
  getFormattedValue: PropTypes.func
};

Cell.defaultProps = {
  getFormattedValue: () => {}
};

export default Cell;
