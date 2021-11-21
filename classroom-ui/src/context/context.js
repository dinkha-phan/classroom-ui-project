import { useState, useContext, useEffect, createContext } from "react";

const AddContext = createContext();

export function useLocalContext() {
    return useContext(AddContext);
}

export function ConxtextProvider({ children }) {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInMail, setLoggedInMail] = useState(null);



    const login = () => {
        // login
        // get Access Token -> send to API server
        const authUser = {
            UserID: '123435',
            FullName: 'Dinh-Kha Phan',
            Email: 'dinhkha123@gmail.com',
            AvatarUrl: '',
            DateOfBirth: '01-03-2000'
        }

        setLoggedInUser(authUser);
        setLoggedInMail('dinhkha123@gmail.com');
    }

    const logout = () => {
        // remove Access Token -> redirect to login/register
    }



    useEffect(() => {
        // temp user
        // const authUser = {
        //     UserID: '123435',
        //     FullName: 'Dinh-Kha Phan',
        //     Email: 'dinhkha123@gmail.com',
        //     AvatarUrl: '',
        //     DateOfBirth: '01-03-2000'
        // }

        // setLoggedInUser(authUser);
        // setLoggedInMail('dinhkha123@gmail.com');

        // const unsubscribe = auth.onAuthStateChanged((authUser) => {
        //     if (authUser) {
        //         setLoggedInMail(authUser.email);
        //         setLoggedInUser(authUser);
        //     } else {
        //         setLoggedInMail(null);
        //         setLoggedInUser(null);
        //     }
        // });
        // return () => unsubscribe();
    }, []);


    const value = {
        createClassDialog, setCreateClassDialog,
        joinClassDialog, setJoinClassDialog,
        login, logout,
        loggedInMail, loggedInUser,
    }

    return (
        <AddContext.Provider value={value}>
            {children}
        </AddContext.Provider>
    )
}