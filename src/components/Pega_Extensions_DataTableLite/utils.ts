import { createUID } from '@pega/cosmos-react-core';

/* Function to lookup embedded data for Disbursement Object and retrieve list objects in an array */
export const getDisbursementEmbeddedData = async (paramPConn: any, paramEmbedName: string ) => {
    try {
        // const caseSummaryObj = paramPConn().getCaseSummary();
        // const caseSummaryContentObj = caseSummaryObj.content;
        /* const embedDataPageList =  `${caseSummaryObj.content}.${paramEmbedName}`;
        console.log(embedDataPageList);   */
        // e.g. to get DisbursementList object values -> pConn().getValue(".DJCSEmbeddedPage")

        const arrayOfEmbeddedList = paramPConn().getValue(`.${paramEmbedName}`);

        console.log('arrayOfEmbeddedList', arrayOfEmbeddedList);

        /* const generateRandomId = (): string => {
            return Math.random().toString(36).substr(2, 9);
        }; */

        // const cPageReference = `${pConnectProp().getPageReference()}.${disbursementObject}`;

        const rowArray: Array<{ [key: string]: any }> = [];
        arrayOfEmbeddedList?.map((listitem: any) => {
            rowArray.push({
                id: createUID(), // Add a random ID
                ...listitem // Spread the original properties into the new object
            });
            return null; // Ensure a return value
        });
        console.log('rowArray', rowArray);
        return(rowArray);
    }
    catch (error) {
        console.log(error);
    }
}


/**
 * Given the PConnect object of a Template component, retrieve the children
 * metadata of all regions.
 * @param {Function} pConnect PConnect of a Template component.
 */
export function getAllFields(pConnect: () => { (): any; new(): any; getRawMetadata: { (): any; new(): any; }; resolveConfigProps: { (arg0: any): any; new(): any; }; createComponent: { (arg0: any): any; new(): any; }; }) {
    const metadata = pConnect().getRawMetadata();
    if (!metadata.children) {
      return [];
    }

    let allFields = [];

    const makeField = (f: { config: any; type: any; }) => ({
      ...pConnect().resolveConfigProps(f.config),
      type: f.type
    });
    // console.log('metadata', metadata);
    const hasRegions = !!metadata.children[0]?.children;
    if (hasRegions) {
      allFields = metadata.children.map((region: { children: any[]; }) =>
        region.children.map((field) => {
          // Do not resolve the config props if is status work, instead create component here as status badge and mark as status display
          if (field.config?.value === '@P .pyStatusWork') {
            field.type = 'TextInput';
            field.config.displayAsStatus = true;
            return pConnect().createComponent(field);
          }

          return makeField(field);
        })
      );
    } else {
      allFields = metadata.children.map(makeField);
    }

    return allFields;
  }
