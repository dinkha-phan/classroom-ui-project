const urlAPI = 'https://class-api-ndk.herokuapp.com';
const urlLocalAPI = 'http://127.0.0.1:3000';

// const urlSignIn = 'https://classrom-api-ntk.herokuapp.com/login';
const urlSignIn = urlAPI + '/login';

// const urlSignUp = 'https://classrom-api-ntk.herokuapp.com/signup';
const urlSignUp = urlAPI + '/signup';

function getUrlGetJoinedClasses(userID) {
    return urlAPI + '/users/' + userID + '/class-user?role=student'
};

function getUrlGetCreatedClasses(userID) {
    return urlAPI + '/users/' + userID + '/class-user?role=teacher'
};

function getUrlCreateClasseForUser(userID) {
    return urlAPI + '/users/' + userID + '/class-user'
};

function getUrlAddUserToClass(userID) {
    return urlAPI + '/users/' + userID + '/class-user'
};

function getUrlRemoveUserFromClass(userID, classID) {
    return urlAPI + '/users/' + userID + '/class-user/' + classID;
};

function getUrlGetDetailClass(userID, classID) {
    return urlAPI + '/classes/' + classID;
};

function getUrlGetPeopleInClass(classID) {
    return urlAPI + '/classes/' + classID + '/class-user/';
};

function getUrlInvitePeople(classID) {
    return urlAPI + '/join-class/invitations';
};

function getUrlUpdateUser(userID) {
    return urlAPI + '/users/' + userID;
};

function getUrlGetUserByEmail(email) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return urlAPI + '/users/?email=' + email + '&typeSearch=single';
};

function getUrlConfirmJoinClass(classID) {
    // http://127.0.0.1:3000/users?email=b@c.com&typeSearch=single
    return urlAPI + '/join-class/confirm/' + classID;
};



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

    getUrlCreateClasseForUser,
    getUrlAddUserToClass,

    getUrlRemoveUserFromClass,

    getUrlGetDetailClass,
    getUrlGetPeopleInClass,
    getUrlInvitePeople,
    getUrlConfirmJoinClass,

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