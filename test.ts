
// type FindOneEntityQuery<T> = {
//     [Properties in keyof T]: string|number;
// }


// function findOneEntity<T>(obj: FindOneEntityQuery<T>) {
//     return obj;
// }

// type UserFake = {
//     name: string;
//     age: number;
// }

// const result = findOneEntity<UserFake>({name: "duc", age: 25});

// console.log(result);

/**
 * 
 */
type TEntity<T> = {[Property in keyof Partial<T>]: T[Property]};

type Order<T> = {asc: boolean} & TEntity<T>;

type FindOneEntityQuery<T> = {
    where: TEntity<T>,
    order: Order<T>,  
    limit: number
}

// type D<T> = {
//     [Property in keyof FindOneEntityQuery<keyof T>]: string
// }

function findOneEntity<T>(entity:string, query: FindOneEntityQuery<T>){
    console.log(entity);
    console.log();
}

type TUserFake = {
    id: number,
    name: string;
    age: number;
}

type TPost = {
    id: number,
    title: string
}

const result = findOneEntity<TUserFake>("User",{
    where: {
        name: "duc"
    },
    order: {id:1, asc: false},
    limit: 1
});

const result1 = findOneEntity<TPost>("Post", {
    where: {
        title: "duc"
    },
    order: {
        id:1,
        asc: false
    },
    limit: 1
})
console.log(result); // Output will be "duc"
