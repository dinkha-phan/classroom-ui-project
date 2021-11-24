import { React, useEffect } from "react";
import { Drawer, JoinedClasses, Main, SignIn, SignUp, People } from "./components";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from './routes/Routes';
import { useLocalContext } from "./context/context";
import axios from "axios";
import { getAccessToken, getUrlConfirmJoinClass, getUrlCreateClasseForUser, getUrlGetCreatedClasses, getUrlGetJoinedClasses, getUrlGetUserByEmail, parseJwt, urlLocalAPI } from "./services/app.service";




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

            if (token) {
                let dataUser = parseJwt(token);

                console.log(dataUser);
                setLoggedInUser(dataUser);
                setLoggedInMail(dataUser.email);

                const urlGetUserDetail = getUrlGetUserByEmail(dataUser.email);

                axios.get(urlGetUserDetail)
                    .then(res => {
                        // console.log(res, 'asasaskdjhaskj');
                        dataUser.fullName = res.data[0].FullName;
                        setLoggedInUser(dataUser);
                    })
                    .catch(error => console.log(error));
            }
        }


        if (loggedInMail) {
            const urlGetJoinedClasses = getUrlGetJoinedClasses(loggedInUser.id);
            const urlGetCreatesClasses = getUrlGetCreatedClasses(loggedInUser.id);


            // get AT and set it to header

            axios.get(urlGetJoinedClasses)
                .then(res => {
                    console.log(res.data);
                    const data = res.data;
                    setListJoinedClasses(data);
                })
                .catch(error => console.log(error));

            axios.get(urlGetCreatesClasses)
                .then(res => {
                    console.log(res.data);
                    const data = res.data;
                    setListCreatedClasses(data);
                })
                .catch(error => console.log(error));
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
                            {tabValue === "1" ? <Main classData={item} /> : <People classData={item} />}
                        </Route>
                    ))}
                    {listJoinedClasses.map((item, index) => (
                        <Route key={index} exact path={`/student/${item.ClassID}`}>
                            <Drawer />
                            {tabValue === "1" ? <Main classData={item} /> : <People classData={item} />}
                        </Route>
                    ))}

                    <Route path="/join-class/confirm/:id" children={<Child />} />

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


function Child() {
    const {
        setLoggedInUser, setLoggedInMail,
        loggedInUser, loggedInMail } = useLocalContext();

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    useEffect(() => {
        if (!loggedInMail) {
            // load data of user using token store at local storage
            const token = getAccessToken();

            if (token) {
                let dataUser = parseJwt(getAccessToken());

                console.log(dataUser);
                setLoggedInUser(dataUser);
                setLoggedInMail(dataUser.email);

                const token = getAccessToken();

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const url = getUrlConfirmJoinClass(dataUser.email);

                const bodyParameters = {
                    "email": dataUser.email
                };

                console.log(config, bodyParameters, url);

                axios.post(
                    url,
                    bodyParameters,
                    config
                ).then(res => {
                    console.log(res.data);
                    // window.location.href = 'http://127.0.0.1:3001/'

                }).catch(e => {
                    console.log(e)
                });

            }
            else {
                window.location.href = 'http://127.0.0.1:3001/';
            }
        }

    }, [])
    let { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}
// https://v5.reactrouter.com/web/guides/quick-start
// https://v5.reactrouter.com/web/example/auth-workflow

// import React from "react";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useRouteMatch,
//     useParams
// } from "react-router-dom";

// export default function App() {
//     return (
//         <Router>
//             <div>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/topics">Topics</Link>
//                     </li>
//                 </ul>

//                 <Switch>
//                     <Route path="/about">
//                         <About />
//                     </Route>
//                     <Route path="/topics">
//                         <Topics />
//                     </Route>
//                     <Route path="/">
//                         <Home />
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// function Home() {
//     return <h2>Home</h2>;
// }

// function About() {
//     return <h2>About</h2>;
// }

// function Topics() {
//     let match = useRouteMatch();

//     return (
//         <div>
//             <h2>Topics</h2>

//             <ul>
//                 <li>
//                     <Link to={`${match.url}/components`}>Components</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/props-v-state`}>
//                         Props v. State
//                     </Link>
//                 </li>
//             </ul>

//             {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//             <Switch>
//                 <Route path={`${match.path}/:topicId`}>
//                     <Topic />
//                 </Route>
//                 <Route path={match.path}>
//                     <h3>Please select a topic.</h3>
//                 </Route>
//             </Switch>
//         </div>
//     );
// }

// function Topic() {
//     const { topicId } = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
// }
