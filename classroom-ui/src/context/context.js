import { useState, useContext, useEffect, createContext } from "react";
import { removeAccessToken } from "../services/app.service";

const AddContext = createContext();

export function useLocalContext() {
    return useContext(AddContext);
}

export function ConxtextProvider({ children }) {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInMail, setLoggedInMail] = useState(null);
    const [personJoinedClass, setPersonJoinedClass] = useState("");
    const [tabValue, settabValue] = useState("1");
    const [listJoinedClasses, setListJoinedClasses] = useState([]);
    const [listCreatedClasses, setListCreatedClasses] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [showInvitePeople, setShowInvitePeople] = useState(false);
    const [showGradeBoard, setShowGradeBoard] = useState(false);
    const [gradeStruct, setGradeStruct] = useState([]);
    const [classData, setClassData] = useState(null);

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
        removeAccessToken();
        setLoggedInUser(null);
        setLoggedInMail(null);
        window.location.href = '/'
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
        loggedInMail, loggedInUser, setLoggedInMail, setLoggedInUser,
        personJoinedClass, setPersonJoinedClass,
        tabValue, settabValue,
        setListJoinedClasses, setListCreatedClasses,
        listJoinedClasses, listCreatedClasses,
        showProfile, setShowProfile,
        showInvitePeople, setShowInvitePeople,
        gradeStruct, setGradeStruct,
        classData, setClassData,
    }

    return (
        <AddContext.Provider value={value}>
            {children}
        </AddContext.Provider>
    )
}