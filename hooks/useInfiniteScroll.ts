"use client"

import { HTMLProps, useEffect, useRef, useState } from "react"

export const useInfiniteScroll = (element: HTMLDivElement | null) => {
    const containerRef = useRef(element);

    const  [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        console.log("What??");
        setIsVisible(entries[0].isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            callbackFunction,
            {   
                root: null,
                rootMargin: "-300px",
                threshold: 0.5
            }
        );
        if(containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    return {containerRef, isVisible}
}