const urlAPI = 'https://classrom-api-ntk.herokuapp.com';
const urlLocalAPI = 'http://127.0.0.1:3000';

const urlSignIn = 'https://classrom-api-ntk.herokuapp.com/login';
const urlSignUp = 'https://classrom-api-ntk.herokuapp.com/signup';

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





function getAccessToken() {
    return window.localStorage.getItem('token');
}

function setAccessToken(strToken) {
    window.localStorage.setItem('token', strToken);
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
    urlAPI,
    urlLocalAPI,

    urlSignIn,
    urlSignUp,

    getUrlGetJoinedClasses,
    getUrlGetCreatedClasses,

    getUrlCreateClasseForUser,
    getUrlAddUserToClass,

    getUrlRemoveUserFromClass,



    getAccessToken,
    setAccessToken,
    parseJwt,
}