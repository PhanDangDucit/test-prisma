
import Link from "next/link";
import { PostType } from "@/helpers/definitions";
import { fetchAllPosts } from "@/lib/data-post";
import DeletePost from "@/app/ui/post/delete-post";
import Image from "next/image";

const TablePost = async () => {
    const posts:PostType[] = await fetchAllPosts();
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Head of table */}
                <thead className="text-xs uppercase text-orange-500 dark:bg-gray-700 dark:text-gray-400 border-2 border-orange-500">
                    <tr>
                        <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thumbnail
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Post Type
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Post Status
                        </th> */}
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* Body of table */}
                <tbody>
                    {
                        posts.length > 0 && posts.map((post) => (
                            <tr className="text-orange-500 border-2 border-orange-500"
                                key={post.id}
                            >
                                <td className="w-4 p-2">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Image
                                        src={post.thumbnail || ''}
                                        alt=""
                                        width={200}
                                        height={100}
                                        priority
                                    />
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-orange-500 whitespace-nowrap dark:text-white">
                                    {post.title}
                                </td>
                                <td className="px-6 py-4">
                                    {post.post_type_id}
                                </td>
                                {/* <td className="px-6 py-4">
                                    {post.post_status_id}
                                </td> */}
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/post/${post.id}/edit`} 
                                        className="font-medium text-blue-600 dark:text-blue-500"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <DeletePost postId={post.id}/>
                                </td>
                                <td className="px-6 py-4">
                                   <Link href={`/blog/${post.slug}/`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                   </Link>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        posts.length == 0 && (
                            <tr 
                                className="text-orange-500 border-2 border-orange-500"
                            >
                                <td className="px-6 py-4 text-center" colSpan={7}> No employee!</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default TablePost;