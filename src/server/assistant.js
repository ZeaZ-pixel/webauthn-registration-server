import base64url from "webauthn/client/base64url";

export let generateRandomBuffer = (length) => {
    if(!length)
        length = 32;

    let randomBuff = new Uint8Array(length);
    window.crypto.getRandomValues(randomBuff);
    return randomBuff
}

export let preformatMakeCredReq = (makeCredReq) => {
    makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
    makeCredReq.user.id   = base64url.decode(makeCredReq.user.id);

    return makeCredReq
}

export let publicKeyCredentialToJSON = (pubKeyCred) => {
    if(pubKeyCred instanceof Array) {
        let arr = [];
        for(let i of pubKeyCred)
            arr.push(publicKeyCredentialToJSON(i));

        return arr
    }

    if(pubKeyCred instanceof ArrayBuffer) {
        return base64url.encode(pubKeyCred)
    }

    if(pubKeyCred instanceof Object) {
        let obj = {};

        for (let key in pubKeyCred) {
            obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
        }

        return obj
    }

    return pubKeyCred
}

export let preformatGetAssertReq = (getAssert) => {
    getAssert.challenge = base64url.decode(getAssert.challenge);

    if(getAssert.allowCredentials) {
        for(let allowCred of getAssert.allowCredentials) {
            allowCred.id = base64url.decode(allowCred.id);
        }
    }

    return getAssert
}


