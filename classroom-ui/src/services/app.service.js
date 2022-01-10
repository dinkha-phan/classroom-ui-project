const urlAPI = 'https://class-api-ndk.herokuapp.com';
const urlLocalAPI = 'http://127.0.0.1:3000';

// const urlSignIn = 'https://classrom-api-ntk.herokuapp.com/login';
const urlSignIn = urlLocalAPI + '/login';

// const urlSignUp = 'https://classrom-api-ntk.herokuapp.com/signup';
const urlSignUp = urlLocalAPI + '/signup';

function getUrlGetJoinedClasses(userID) {
    return urlLocalAPI + '/users/' + userID + '/class-user?role=student'
};

function getUrlGetCreatedClasses(userID) {
    return urlLocalAPI + '/users/' + userID + '/class-user?role=teacher'
};

function getUrlCreateClasseForUser(userID) {
    return urlLocalAPI + '/users/' + userID + '/class-user'
};

function getUrlAddUserToClass(userID) {
    return urlLocalAPI + '/users/' + userID + '/class-user'
};

function getUrlRemoveUserFromClass(userID, classID) {
    return urlLocalAPI + '/users/' + userID + '/class-user/' + classID;
};

function getUrlGetDetailClass(userID, classID) {
    return urlLocalAPI + '/classes/' + classID;
};

function getUrlGetPeopleInClass(classID) {
    return urlLocalAPI + '/classes/' + classID + '/class-user/';
};
function getUrlGetStudentInClass(classID) {
    return urlLocalAPI + '/classes/' + classID + '/student/';
};
function getUrlAddStudentToClass(classID, studentID) {
    return urlLocalAPI + '/classes/' + classID + '/student/' + studentID;
};
function getUrlInvitePeople(classID) {
    return urlLocalAPI + '/join-class/invitations';
};

function getUrlUpdateUser(userID) {
    return urlLocalAPI + '/users/' + userID;
};

function getUrlGetUserByEmail(email) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return urlLocalAPI + '/users/?email=' + email + '&typeSearch=single';
};

function getUrlConfirmJoinClass(classID) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return urlLocalAPI + '/join-class/confirm/' + classID;
};

function getUrlGetGradeStructOfClass(classID){
    return urlLocalAPI + '/grade-struct/class/' + classsID;
}
function getUrlGetGradesOfClass(classID){
    return urlLocalAPI + '/gradeClass/class/' + classID;
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
    urlLocalAPI,
    urlAPI,

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