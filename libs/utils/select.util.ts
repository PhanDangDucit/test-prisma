import { Order, TEntity } from "@/libs/types/find-type";

/**
 * get key and value for order
 * @param order 
 * @returns 
 */
export function findOneWithOrder<T> (order: Order<T> |undefined) {
    let colOrder: string = '';
    let asc: boolean = true;

    if(!order) {
        return {
            colOrder,
            asc
        }
    }

    /**
     * assign value if it exists
     */
    for (const value in order) {
        colOrder = value;
    }

    /**
     * assign asc if it exists
     */
    for (const col in order) {
        asc = order[col]
    }

    return {
        colOrder,
        asc
    }
}

export function findOneWithSelect<T>(where: TEntity<T> | undefined) {
    let selectCols: Array<string>|string = [];
    if(where) {
        for (const col in where) {
            selectCols = [...selectCols, where[col] as string];
        }
    } else {
        selectCols = "*"
    }
    return selectCols.toString();
}