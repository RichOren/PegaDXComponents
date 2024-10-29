export declare const getDisbursementEmbeddedData: (paramPConn: any, paramEmbedName: string) => Promise<{
    [key: string]: any;
}[] | undefined>;
/**
 * Given the PConnect object of a Template component, retrieve the children
 * metadata of all regions.
 * @param {Function} pConnect PConnect of a Template component.
 */
export declare function getAllFields(pConnect: () => {
    (): any;
    new (): any;
    getRawMetadata: {
        (): any;
        new (): any;
    };
    resolveConfigProps: {
        (arg0: any): any;
        new (): any;
    };
    createComponent: {
        (arg0: any): any;
        new (): any;
    };
}): any;
//# sourceMappingURL=utils.d.ts.map