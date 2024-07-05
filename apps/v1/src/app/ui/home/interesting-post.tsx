import Image from "next/image";

export default function InterestingPost() {
    return (
        <div className="card w-full shadow-xl opacity-100 relative">
            <figure>
                <Image
                    className="rounded-2xl"
                    src="https://www.reuters.com/resizer/v2/Q7C72QFFQNKR3PDKMDYAAVHJ3M.jpg?auth=dd4777d21cf29ab957265152e8ac141a4ed29bddb02fce22ed8d356ac4543671&width=1920&quality=80" 
                    alt="Shoes"
                    width={1280}
                    height={500}
                />
            </figure>
            <div className="card-body absolute top-1/2 left-12">
               <a><h2 className="card-title text-white">Shoes!</h2></a>
                <p className="text-gray-200">If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    )
}