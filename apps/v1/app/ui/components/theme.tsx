"use client"
import ThemeContext from "@/app/store/hooks";
import { Moon, SunMoon } from "lucide-react";
import { useContext } from "react";

export function DarkLight ({
    onClick
} : {
    onClick: (theme: string) => void
}) {
    const theme = useContext(ThemeContext);
    const className = "w-6 h-6 text-orange-100 " + theme;
    return (
        <div 
            className="-translate-x-6 flex items-center"
        >
            {
                theme === "dark" ? (
                <button type="button" title="dark">
                    <Moon
                        className={className}
                        onClick={() => onClick("light")}
                    />
                </button>
            ): (
                <button type="button" title="light">
                    <SunMoon 
                        className={className}
                        onClick={() => onClick("dark")}
                    />
                </button >
            )
            
        }
        </div>
    );
}