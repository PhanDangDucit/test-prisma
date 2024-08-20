
const Page = async ({
    params
}: {
    params: {
        category: string
    }
}) => {

    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block uppercase">{params.category}</h1>
        </>
    );
}
 
export default Page;