// Import necessary components and modules from 'react'
import { ReactNode, createContext, useMemo, useState } from "react";

// Define the prop types for the StyleProvider component
//5
interface StyleProviderPropTypes {
    children: ReactNode;
}

// Define the types for the context values
//4
interface ContextTypes {
    bg: string;
    color: string;
    updateContext: (newContext: ContextTypes) => void;
}

//1
// Define the default context values
const initialContext: ContextTypes = {
    bg: 'green',
    color: 'white',
    updateContext: () => { }, // Placeholder function, it will be replaced by useState
};

//2
// Create a context with the specified types and default values
export const MyContextStyle = createContext<ContextTypes>(initialContext);

//3
// Create the StyleProvider component that wraps its children with the context provider
const StyleProvider = ({ children }: StyleProviderPropTypes) => {
    // Use useState to manage dynamic updates to the context values
    const [context, setContext] = useState<ContextTypes>(initialContext);

    // Use useMemo to memoize the context value
    const memoizedContext = useMemo(() => ({
        ...context,
        updateContext: (newContext: ContextTypes) => {
            setContext(newContext);
        },
    }), [context]);

    return (
        <MyContextStyle.Provider value={memoizedContext}>
            {children}
        </MyContextStyle.Provider>
    );
}

export default StyleProvider


//WITHOUT STATE UPDATE
// // Import necessary components and modules from 'react'
// import { ReactNode, createContext } from "react";

// //5
// // Define the prop types for the StyleProvider component
// interface StyleProviderPropTypes {
//     children: ReactNode;
// }

// //4
// // Define the types for the context values
// interface ContextTypes {
//     bg: string;
//     color: string;
// }

// //1
// // Define the default context values
// const context = {
//     bg: 'green',
//     color: 'white'
// };

// //2
// // Create a context with the specified types and default values
// export const MyContextStyle = createContext<ContextTypes>(context);

// //3
// // Create the StyleProvider component that wraps its children with the context provider
// const StyleProvider = ({ children }: StyleProviderPropTypes) => {
//     return (
//         <MyContextStyle.Provider value={context}>
//             {children}
//         </MyContextStyle.Provider>
//     );
// }

// // Export the StyleProvider component as the default export of this module
// export default StyleProvider;
