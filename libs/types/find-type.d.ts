export type TEntity<T> = {
    [Property in keyof Partial<T>]: T[Property]
};


/**
 * order: {
 *      id: flase,
 *      name: true
 * }
 */

export type Order<T> = {
    [Property in keyof Partial<T>]: boolean
};

/**
 * 
 */
export type FindOneEntityQuery<T> = {
    where?: TEntity<T>,
    order?: Order<T>,
    limit: number
}


// const { data, error } = await supabase
//   .from('countries')
//   .select('id', 'name')
//   .order('id', { ascending: false })