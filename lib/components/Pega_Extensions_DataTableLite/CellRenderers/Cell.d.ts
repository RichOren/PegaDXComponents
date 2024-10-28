import PropTypes from 'prop-types';
type CellProps = {
    getFormattedValue: () => any;
};
declare const Cell: {
    ({ getFormattedValue }: CellProps): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        getFormattedValue: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        getFormattedValue: () => void;
    };
};
export default Cell;
//# sourceMappingURL=Cell.d.ts.map