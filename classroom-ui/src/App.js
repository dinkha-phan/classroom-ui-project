import { React, useEffect } from "react";
import { Drawer, JoinedClasses, Main, SignIn, SignUp, People } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from './routes/Routes';
import { useLocalContext } from "./context/context";
import axios from "axios";


const classData = { className: "class Testing" };
function App() {
    const { loggedInMail,
        setPersonJoinedClass, personJoinedClass,
        tabValue, settabValue,
        setListJoinedClasses, listJoinedClasses,
        setListCreatedClasses, listCreatedClasses } = useLocalContext();


    useEffect(() => {
        if (loggedInMail) {
            const urlGetJoinedClasses = 'http://127.0.0.1:3000/users/18120127/class-user?role=student';
            const urlGetCreatesClasses = 'http://127.0.0.1:3000/users/18120116/class-user?role=teacher';

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
                            <Main classData={item} />
                        </Route>
                    ))}
                    {listJoinedClasses.map((item, index) => (
                        <Route key={index} exact path={`/student/${item.ClassID}`}>
                            {/* <Drawer />
                            <Main classData={item} /> */}
                            <h1>abcd</h1>
                            {/* {alert(`/student/${item.ClassID}`)} */}
                        </Route>
                    ))}

                    <ProtectedRoute user={loggedInMail} path="/" exact>

                        {setPersonJoinedClass("") && <></>}

                        {/* List Class */}
                        {
                            (personJoinedClass === "") &&
                            <>
                                <Drawer />
                                {<ol className="joined">
                                    {listCreatedClasses.length !== 0 && listCreatedClasses.map((item) => (
                                        <JoinedClasses classData={item} />
                                    ))}

                                    {listJoinedClasses.length !== 0 && listJoinedClasses.map((item) => (
                                        <JoinedClasses classData={item} />
                                    ))}
                                </ol>}
                            </>
                        }

                        {/* Class student detail */}
                        {
                            (personJoinedClass === "Student") &&
                            <>
                                <Drawer />
                                {tabValue === "1" ? <Main classData={classData} /> : <People />}
                            </>
                        }

                        {/* Class teacher detail */}
                        {
                            (personJoinedClass === "Teacher") &&
                            <>
                                <Drawer />
                                {tabValue === "1" ? <Main classData={classData} /> : <People />}
                            </>
                        }
                    </ProtectedRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

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
