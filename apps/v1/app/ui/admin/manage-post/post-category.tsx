import moment from "moment";
import { PostCategoriesType } from "@/helpers/definitions";
import DeleteCategory from "@/app/ui/admin/manage-post/delete-category";
import { CreateModalPostCategories } from "./create-modal";
import Image from "next/image";
import icon from "@/public/tree.jpg";
import { EditModalPostCategories } from "./edit-modal";

const PostCategories = ({
    categories
}:{
    categories:PostCategoriesType[]
}) => {
    return (
        <>
            <div className="flex flex-row-reverse">
                <CreateModalPostCategories/>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                {/* Head of table */}
                <thead className="bg-black text-xs uppercase text-orange-500 dark:bg-gray-700 dark:text-gray-400 border-2 border-gray-100">
                    <tr>
                        <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Priority
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Icon
                        </th>
                        <th scope="col" className="px-6 py-3">
                            created date
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* Body of table */}
                <tbody className="bg-white">
                    {
                        categories.length > 0 && categories.map((category) => (
                            <tr className="text-orange-500 border-[1px] border-gray-200"
                                key={category.id}
                            >
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {category.id}
                                </td>
                                <td className="px-6 py-4">
                                    {category.name_post_type}
                                </td>
                                <td className="px-6 py-4">
                                    {category.priority}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="col-span-2 mt-2 mb-2 border-[1px] border-gray-300 rounded-xl relative w-6 h-6">
                                        <Image
                                            src={category.icon || icon}
                                            alt="icon"
                                            fill
                                            priority
                                            className="rounded-xl"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {moment(category.created_at).format('YYYY-MM-DD HH:mm')}
                                </td>
                                <td className="px-6 py-4">
                                    <EditModalPostCategories category={category}/>
                                </td>
                                <td className="px-6 py-4">
                                    <DeleteCategory categoryId={category.id}/>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        categories.length == 0 && (
                            <tr 
                                className="text-orange-500 border-[1px] border-gray-200"
                            >
                                <td className="px-6 py-4 text-center" colSpan={7}>No category!</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}
 
export default PostCategories;