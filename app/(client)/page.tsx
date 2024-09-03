
import ContentHomeUser from "@/components/users/home/content-home-user";
import { Suspense } from "react";

export default function Page () {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <ContentHomeUser/>
        </Suspense>
    )
}