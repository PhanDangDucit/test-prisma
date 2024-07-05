
import { createContext } from "react";

const ThemeContext = createContext("");

export default ThemeContext;

// export const ThemeProvider = ({
//     children,
// }: {
//     children:React.ReactNode,
// }) => {
//     const [theme, setTheme] = useState("dark");
//     return (
//         <ThemeContext.Provider theme={theme}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

export const UserContext = createContext("");
