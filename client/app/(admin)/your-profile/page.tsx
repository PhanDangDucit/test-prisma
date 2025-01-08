"use client"
import conan from "@/public/conan.jpg";
import { useAdminInfoContext } from "@/stores/admin/admin-info";
import Image from "next/image";
import Link from "next/link";

export default function Page() {

    const { adminInfo } = useAdminInfoContext();

    return (
        <div className="relative">
            <section className="relative block h-[500px] w-full">
                <Image 
                    src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80" 
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    alt=""
                    width={100}
                    height={100}
                />
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <Image 
                                src={adminInfo.avatar ?? conan} 
                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                alt={adminInfo.fullname ?? "avatar"}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                            <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                Connect
                            </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                            </div>
                            <div className="lg:mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            Jenna Stones
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                            Los Angeles, California
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />Solution Manager - Creative Tim Officer
                        </div>
                        <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400" />University of Computer Science
                        </div>
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                An artist of considerable range, Jenna the name taken by
                                Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                performs and records all of his own music, giving it a
                                warm, intimate feel with a solid groove structure. An
                                artist of considerable range.
                            </p>
                            <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                    <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                            Made with <Link href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</Link> by <Link href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</Link>.
                        </div>
                        </div>
                    </div>
                    </div>
                </footer>
            </section>
        </div>
    )
}