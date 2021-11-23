import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// ClassID: "bbb2eed3-65c7-4677-8c07-63f3a749b741"
// Code: "bbb2eed3-65c7-4677-8c07-63f3a749b741"
// LinkToJoinClass: "https://classroom-project/joinClass/bbb2eed3-65c7-4677-8c07-63f3a749b741"
// Name: "KTPM"
// Part: ""
// Role: "student"
// Room: "Room 1"
// Title: ""
// UserID: "18120127"
const JoinedClasses = ({ classData }) => {
    return (
        <li className="joined__list">
            <div className="joined__wrapper">
                <div className="joined__container">
                    <div className="joined__imgWrapper" />
                    <div className="joined__image" />
                    <div className="joined__content">
                        <Link className="joined__title" to={`/${classData.Role}/${classData.ClassID}`}>
                            <h2>{classData.Name}</h2>
                        </Link>
                        <p className="joined__owner"> Auther class </p>
                    </div>
                </div>
                <Avatar
                    className="joined__avatar"
                    src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
                />
            </div>
            <div className="joined__bottom">
                <PermContactCalendar />
                <FolderOpen />
            </div>
        </li>
    );
};

export default JoinedClasses;
