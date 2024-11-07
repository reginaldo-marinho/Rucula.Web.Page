import { entityConfiguration, fragmentField, fragmentObject } from "../object/ObjectAliases";
import { TableDependency } from "../table-dependency/TableDependency";
export declare class Fragment {
    constructor(tableDependency: TableDependency);
    private tableDependency;
    objects: Array<fragmentObject>;
    fields: Array<fragmentField>;
    checkIdentity(identity: string): void;
    objects_add(object: fragmentObject): void;
    objects_getForFieldIdentity(identity: string): fragmentObject;
    objects_getForIdentity(identity: string): fragmentObject;
    objects_getForAlias(alias: string): fragmentObject;
    fields_add(field: fragmentField): void;
    fields_remove(fragment: fragmentField): void;
    fields_removeLine(objectIDentity: string, line: number): void;
    /**
 * @param {string} identity
 * @return {fragmentField}
 */
    fields_getForIdentity(identity: string): fragmentField;
    /**
     * @param {entityConfiguration} config
     * @return {fragmentField}
    */
    fields_getForAliasAndPropert(config: entityConfiguration): fragmentField;
}
