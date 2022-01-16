const urlAPI = 'https://class-api-ndk.herokuapp.com';
const urlLocalAPI = 'http://127.0.0.1:3000';
const CurrentUrlAPI = urlLocalAPI;

const urlUI = 'https://class-api-ndk.herokuapp.com';
const urlLocalUI = 'http://127.0.0.1:3001';
const CurrentUrlUI = urlLocalUI;

// const urlSignIn = 'https://classrom-api-ntk.herokuapp.com/login';
const urlSignIn = CurrentUrlAPI + '/login';

// const urlSignUp = 'https://classrom-api-ntk.herokuapp.com/signup';
const urlSignUp = CurrentUrlAPI + '/signup';

function getUrlGetJoinedClasses(userID) {
    return CurrentUrlAPI + '/users/' + userID + '/class-user?role=student'
};

function getUrlGetCreatedClasses(userID) {
    return CurrentUrlAPI + '/users/' + userID + '/class-user?role=teacher'
};

function getUrlCreateClasseForUser(userID) {
    return CurrentUrlAPI + '/users/' + userID + '/class-user'
};

function getUrlAddUserToClass(userID) {
    return CurrentUrlAPI + '/users/' + userID + '/class-user'
};

function getUrlRemoveUserFromClass(userID, classID) {
    return CurrentUrlAPI + '/users/' + userID + '/class-user/' + classID;
};

function getUrlGetDetailClass(userID, classID) {
    return CurrentUrlAPI + '/classes/' + classID;
};

function getUrlGetPeopleInClass(classID) {
    return CurrentUrlAPI + '/classes/' + classID + '/class-user/';
};
function getUrlGetStudentInClass(classID) {
    return CurrentUrlAPI + '/classes/' + classID + '/student/';
};
function getUrlAddStudentToClass(classID, studentID) {
    return CurrentUrlAPI + '/classes/' + classID + '/student/' + studentID;
};
function getUrlInvitePeople(classID) {
    return CurrentUrlAPI + '/join-class/invitations';
};

function getUrlUpdateUser(userID) {
    return CurrentUrlAPI + '/users/' + userID;
};

function getUrlGetUserByEmail(email) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return CurrentUrlAPI + '/users/?email=' + email + '&typeSearch=single';
};

function getUrlConfirmJoinClass(classID) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return CurrentUrlAPI + '/join-class/confirm/' + classID;
};

function getUrlGetGradeStructOfClass(classID) {
    return CurrentUrlAPI + '/grade-struct/class/' + classID;
}
function getUrlGetGradesOfClass(classID) {
    return CurrentUrlAPI + '/gradeClass/class/' + classID;
}
function getUrlEditGradesOfClass(classID, userID, rank) {
    return CurrentUrlAPI + '/gradeClass/user/' + userID + '/class/' + classID + '/rank/' + rank;
}
function getUrlEditGradeStructOfClass(ClassID, rank) {
    return CurrentUrlAPI + '/grade-struct/class/' + ClassID + '/rank/' + rank;
}
function getUrlEditComment(ClassID, userID, rank) {
    return CurrentUrlAPI + '/gradeClass/comment/user/' + userID + '/class/' + ClassID + '/rank/' + rank;;
}
function getUrlAddOrGetNoti(userID) {
    return CurrentUrlAPI + '/noti/user/' + userID;
}
function getUrlEditNoti(notiID) {
    return CurrentUrlAPI + '/noti/' + notiID;
}

// ===================================================

function getAccessToken() {
    return window.localStorage.getItem('token');
}

function setAccessToken(strToken) {
    window.localStorage.setItem('token', strToken);
}


function removeAccessToken() {
    window.localStorage.removeItem('token');
}

function setRefreshToken(strToken) {
    window.localStorage.setItem('refreshToken', strToken);
}

function getRefreshToken(strToken) {
    window.localStorage.getItem('refreshToken');
}

function removeRefreshToken() {
    window.localStorage.removeItem('refreshToken');
}





function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export {
    CurrentUrlAPI,
    CurrentUrlUI,
    urlSignIn,
    urlSignUp,

    getUrlGetJoinedClasses,
    getUrlGetCreatedClasses,
    getUrlAddStudentToClass,
    getUrlCreateClasseForUser,
    getUrlAddUserToClass,
    getUrlGetStudentInClass,
    getUrlRemoveUserFromClass,

    getUrlGetDetailClass,
    getUrlGetPeopleInClass,
    getUrlInvitePeople,
    getUrlConfirmJoinClass,

    getUrlGetGradeStructOfClass,
    getUrlGetGradesOfClass,
    getUrlEditGradesOfClass,
    getUrlEditGradeStructOfClass,
    getUrlEditComment,

    getUrlAddOrGetNoti,
    getUrlEditNoti,

    getUrlUpdateUser,
    getUrlGetUserByEmail,

    getAccessToken,
    setAccessToken,
    removeAccessToken,
    parseJwt,


    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
}