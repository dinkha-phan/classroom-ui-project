import { React, useEffect } from "react";
import { Drawer, JoinedClasses, Main, SignIn, SignUp, People, Drag, Score, Assignment } from "./components";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from './routes/Routes';
import { useLocalContext } from "./context/context";
import axios from "axios";
import { getAccessToken, getUrlConfirmJoinClass, removeAccessToken, getUrlCreateClasseForUser, getUrlGetCreatedClasses, getUrlGetJoinedClasses, getUrlGetUserByEmail, parseJwt, CurrentUrlUI, urlLogin } from "./services/app.service";




function App() {
    const {
        setPersonJoinedClass, personJoinedClass,
        tabValue, settabValue,
        setListJoinedClasses, listJoinedClasses,
        setListCreatedClasses, listCreatedClasses,
        setLoggedInUser, setLoggedInMail,
        loggedInUser, loggedInMail } = useLocalContext();


    useEffect(() => {
        if (!loggedInMail) {
            // load data of user using token store at local storage
            const token = getAccessToken();

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
            if (token) {
                let dataUser = parseJwt(token);

                console.log(dataUser);
                setLoggedInUser(dataUser);
                setLoggedInMail(dataUser.email);

                const urlGetUserDetail = getUrlGetUserByEmail(dataUser.email);

                axios.get(urlGetUserDetail, config)
                    .then(res => {
                        dataUser.fullName = res.data[0].FullName;
                        setLoggedInUser(dataUser);
                    })
                    .catch((error) => {
                        console.log(error);
                        removeAccessToken(); 
                        window.location.href = urlLogin;
                    });
            }
            else{
                removeAccessToken(); 
                if(window.location.href != urlLogin && window.location.href != CurrentUrlUI + '/signup')window.location.href = urlLogin;
            } 
        }


        if (loggedInMail) {
            const urlGetJoinedClasses = getUrlGetJoinedClasses(loggedInUser.id);
            const urlGetCreatesClasses = getUrlGetCreatedClasses(loggedInUser.id);

            const token = getAccessToken();

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            // get AT and set it to header

            axios.get(urlGetJoinedClasses, config)
                .then(res => {
                    console.log(res.data);
                    const data = res.data;
                    setListJoinedClasses(data);
                })
                .catch((error) => {
                    console.log(error);
                    removeAccessToken(); 
                    window.location.href = urlLogin;
                });

            axios.get(urlGetCreatesClasses, config)
                .then(res => {
                    console.log(res.data);
                    const data = res.data;
                    setListCreatedClasses(data);
                })
                .catch((error) => {
                    console.log(error);
                    removeAccessToken(); 
                    window.location.href = urlLogin;
                });
        }
        // return () => { }
    }, [loggedInMail])

    return (
        <div>
            <Router>
                <Switch>
                    <IsUserRedirect
                        user={loggedInMail}
                        loggedInPath="/"
                        path="/signin"
                        exact
                    >
                        <SignIn />
                    </IsUserRedirect>

                    <IsUserRedirect
                        user={loggedInMail}
                        loggedInPath="/"
                        path="/signup"
                        exact
                    >
                        <SignUp />
                    </IsUserRedirect>

                    {listCreatedClasses.map((item, index) => (
                        <Route key={index} exact path={`/teacher/${item.ClassID}`}>
                            <Drawer />
                            {tabValue === "1" && <Main classData={item} />}
                            {tabValue === "2" && <People classData={item} />}
                            {tabValue === "3" && <Score classData={item} />}
                            {tabValue === "4" && <Assignment classData={item} />}

                        </Route>
                    ))}
                    {listJoinedClasses.map((item, index) => (
                        <Route key={index} exact path={`/student/${item.ClassID}`}>
                            <Drawer />
                            {tabValue === "1" && <Main classData={item} />}
                            {tabValue === "2" && <People classData={item} />}
                            {tabValue === "3" && <Score classData={item} />}
                            {tabValue === "4" && <Assignment classData={item} />}
                        </Route>
                    ))}


                    {listCreatedClasses.map((item, index) => (
                        <Route key={index} exact path={`/grade-struct/edit/${item.ClassID}`}>
                            <Drawer />
                            <Drag classData={item} />
                        </Route>
                    ))}


                    {/* <Route path="">

                    </Route> */}

                    {/* List Class */}
                    <ProtectedRoute user={loggedInMail} path="/" exact>
                        <Drawer />
                        <ol className="joined">
                            {listCreatedClasses.length !== 0 && listCreatedClasses.map((item) => (
                                <JoinedClasses classData={item} />
                            ))}

                            {listJoinedClasses.length !== 0 && listJoinedClasses.map((item) => (
                                <JoinedClasses classData={item} />
                            ))}
                        </ol>
                    </ProtectedRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

