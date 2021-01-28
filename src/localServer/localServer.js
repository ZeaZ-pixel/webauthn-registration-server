import base64url from "webauthn/client/base64url";
import {generateRandomBuffer} from "./helper";

let db = {
    'addUser': (username, struct) => {
        let userHandleToUsername = localStorage.getItem('userHandleToUsername');
        if(!userHandleToUsername)
            userHandleToUsername = '{}';

        userHandleToUsername = JSON.parse(userHandleToUsername);

        userHandleToUsername[struct.id] = username;

        localStorage.setItem(username, JSON.stringify(struct))
        localStorage.setItem('userHandleToUsername', JSON.stringify(userHandleToUsername))
    },
    'getUser': (username) => {
        let userJSON = localStorage.getItem(username);
        if(!userJSON)
            throw new Error(`Username "${username}" does not exist!`);

        return JSON.parse(userJSON)
    },

    'getUserByUserHandle': (userHandle) => {
        let userHandleToUsername = localStorage.getItem('userHandleToUsername');
        if(!userHandleToUsername)
            userHandleToUsername = '{}';

        userHandleToUsername = JSON.parse(userHandleToUsername);

        let username = userHandleToUsername[userHandle];

        let userJSON = localStorage.getItem(username);
        if(!userJSON)
            throw new Error(`Username "${username}" does not exist!`);

        return JSON.parse(userJSON)
    },
    'userExists': (username) => {
        let userJSON = localStorage.getItem(username);
        if(!userJSON)
            return false

        return true
    },
    'updateUser': (username, struct) => {
        let userJSON = localStorage.getItem(username);
        if(!userJSON)
            throw new Error(`Username "${username}" does not exist!`);

        localStorage.setItem(username, JSON.stringify(struct))
    },
    'deleteUser': (username) => {
        localStorage.removeItem(username)
    }
}
let session = {}

export let startPasswordlessEnrolment = (payload) => {
    session = {};
    if(db.userExists(payload.username) && db.getUser(payload.username).registrationComplete)
        return Promise.reject({'status': 'failed', 'errorMessage': 'User already exists!'})

    db.deleteUser(payload.username)

    payload.id = base64url.encode(generateRandomBuffer(32));
    payload.credentials = [];

    db.addUser(payload.username, payload)

    session.username = payload.username;
    session.uv = true;

    return Promise.resolve({'status': 'startFIDOEnrolmentPasswordless'})
}

export let getMakeCredentialChallenge = (options) => {
    if(!session.username)
        return Promise.reject({'status': 'failed', 'errorMessage': 'Access denied!'})

    let user = db.getUser(session.username);
    session.challenge = base64url.encode(generateRandomBuffer(32));

    let publicKey = {
        'challenge': session.challenge,

        'rp': {
            'name': 'Example Inc.'
        },

        'user': {
            'id': user.id,
            'name': user.username,
            'displayName': user.displayName
        },

        'pubKeyCredParams': [
            { 'type': 'public-key', 'alg': -7   },
            { 'type': 'public-key', 'alg': -35  },
            { 'type': 'public-key', 'alg': -36  },
            { 'type': 'public-key', 'alg': -257 },
            { 'type': 'public-key', 'alg': -258 },
            { 'type': 'public-key', 'alg': -259 },
            { 'type': 'public-key', 'alg': -37  },
            { 'type': 'public-key', 'alg': -38  },
            { 'type': 'public-key', 'alg': -39  },
            { 'type': 'public-key', 'alg': -8   }
        ],

        'status': 'ok'
    }

    if(options) {
        if(!publicKey.authenticatorSelection)
            publicKey.authenticatorSelection = {};

        if(options.attestation)
            publicKey.attestation = options.attestation;

        if(options.rpId)
            publicKey.rp.id = options.rpId;

        if(options.uv)
            publicKey.authenticatorSelection.userVerification = 'required';
    }

    if(session.rk) {
        if(!publicKey.authenticatorSelection)
            publicKey.authenticatorSelection = {};

        publicKey.authenticatorSelection.requireResidentKey = true;
    }

    return Promise.resolve(publicKey)
}

export let makeCredentialResponse = (payload) => {
    if(!session.username)
        return Promise.reject({'status': 'failed', 'errorMessage': 'Access denied!'})

    let user = db.getUser(session.username);

    /* server processing and verifying response, blah blah blah */
    user.registrationComplete = true;
    user.credentials.push(payload.id);

    db.updateUser(session.username, user);

    session = {};

    return Promise.resolve({'status': 'ok'})
}

export let startAuthenticationPasswordless = (payload) => {
    if(!db.userExists(payload.username))
        return Promise.reject('Wrong username or password!');

    session.username = payload.username;
    session.uv = true;

    return Promise.resolve({'status': 'startFIDOAuthentication'})
}

export let getGetAssertionChallenge = () => {
    session.challenge = base64url.encode(generateRandomBuffer(32));

        let publicKey = {
        'challenge': session.challenge,
        'status': 'ok'
    }

    if(session.username) {
        let user = db.getUser(session.username);
        publicKey.allowCredentials = user.credentials.map((credId) => {
            return { 'type': 'public-key', 'id': credId }
        })
    }

    if(session.rk) {
        delete publicKey.allowCredentials
    }

    if(session.uv) {
        publicKey.userVerification = 'required';
    }

    return Promise.resolve(publicKey)
}

export let getAssertionResponse = (payload) => {
    if(!session.username && !db.getUserByUserHandle(payload.response.userHandle))
        return Promise.reject({'status': 'failed', 'errorMessage': 'Access denied!'})

    /* server processing and verifying response, blah blah blah */

    session = {};

    return Promise.resolve({'status': 'ok'})
}