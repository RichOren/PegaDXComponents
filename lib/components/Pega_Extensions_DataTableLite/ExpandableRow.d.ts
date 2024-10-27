import { RowProps } from "./DataTableLiteTypes";
interface ExpandableRowProps<T> extends RowProps<T> {
    rowIndex: number;
}
declare const ExpandableRow: <T>({ row, columns, renderExpandPane, rowIndex, isExpanded, toggleExpand, }: ExpandableRowProps<T>) => import("react/jsx-runtime").JSX.Element;
export default ExpandableRow;
//# sourceMappingURL=ExpandableRow.d.ts.map