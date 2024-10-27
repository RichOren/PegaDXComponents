// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
import { Input, Button  } from "@pega/cosmos-react-core";
import { type themeDefinition } from '@pega/cosmos-react-core';

export default styled.div(() => {
  return css`
    margin: 0px 0;
  `;
});

export const DataTableWrapper = styled.div(() => {
  return css`
    width: 100%;
  `;
});

export const FilterInput = styled(Input)(() => {
  return css`
    margin-bottom: 10px;
    padding: 8px;
    width: 250px;
  `;
});

export const Table = styled.table(({ theme }: { theme: typeof themeDefinition }) => {
  return css`
    width: 100%;
    border: 0.0625rem solid ${theme.base.palette['border-line']};
    border-collapse: collapse;
  `;
});

export const TableHead = styled.th(({ theme }: { theme: typeof themeDefinition }) => {
  return css`
    border: 0.0625rem solid ${theme.base.palette['border-line']};
    background: ${theme.components.table.header['background-color']};
    text-align: start;
    padding: 11px 8px;
    cursor: pointer;
  `;
});

export const DetailsHeader = styled(TableHead)(() => {
  return css`
    width: 50px;
  `;
});

export const TableData = styled.td(({ theme }: { theme: typeof themeDefinition }) => {
  return css`
    padding: 8px;
    border: 0.0625rem solid ${theme.base.palette['border-line']};
  `;
});

export const ExpandButton = styled(Button)(() => {
  return css`
    cursor: pointer;
    background: none;
    border: none;
  `;
});

export const PaginationWrapper = styled.div(() => {
  return css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  `;
});



export const PaginationButton = styled(Button)(() => {
  return css`
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    &:disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  `;
});
