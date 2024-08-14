import {
    useCallback,
    useEffect,
    useState,
    useRef
} from "react";
import { MultiRangeSliderProps } from "@/helpers/definitions";  
import {
    useSearchParams,
    useRouter,
    usePathname
} from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
    min,
    max
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleMinViewChange = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        if(minVal) {
            params.set('min-view', String(minVal));
        } else {
            params.delete('min-view');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200)
    const handleMaxViewChange = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        if(maxVal) {
            params.set('max-view', String(maxVal));
        } else {
            params.delete('max-view');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200)

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number
            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    return (
        <div className="view-range">
            <h1 className='text-base mt-6'>Views</h1>
            <div className="container flex items-center justify-center h-12">
                <input
                    title="min"
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = Math.min(+event.target.value, maxVal - 1);
                            setMinVal(value);
                            event.target.value = value.toString();
                            handleMinViewChange();
                        }
                    }
                    className={
                        minVal <= max - 100 
                            ? 'thumb thumb--zindex-3'
                            :'thumb thumb--zindex-5'
                    }
                />
                <input
                    title="max"
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = Math.max(+event.target.value, minVal + 1);
                            setMaxVal(value);
                            event.target.value = value.toString();
                            handleMaxViewChange();
                        }
                    }
                    className="thumb thumb--zindex-4"
                />
                <div className="slider">
                    <div className="slider__track w-full z-1 bg-blue-200"></div>
                    <div ref={range} className="slider__range"></div>
                    <div className="slider__left-value text-gray-500 mt-5 text-xs">{minVal}</div>
                    <div className="slider__right-value text-gray-500 mt-5 text-xs">{maxVal}</div>
                </div>
            </div>
        </div>
    );
};
