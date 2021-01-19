
let RegisterPrint = () => {
    let challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    let userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
    let id = Uint8Array.from(window.atob(userID), c=>c.charCodeAt(0))

    let publicKey = {
        'challenge': challenge,

        'rp': {
            'name': 'Example Inc.'
        },

        'user': {
            'id': id,
            'name': 'alice@example.com',
            'displayName': 'Alice von Wunderland'
        },

        'pubKeyCredParams': [
            { 'type': 'public-key', 'alg': -7  },
            { 'type': 'public-key', 'alg': -257 }
        ],
        "timeout": 1800000,
        'authenticatorSelection': {
            "authenticatorAttachment": "platform",
            "userVerification": "preferred" }
    }

    navigator.credentials.create({ 'publicKey': publicKey })
        .then((newCredentialInfo) => {
            alert('Open your browser console!');
            console.log('SUCCESS', newCredentialInfo)
            // eslint-disable-next-line no-undef
            console.log('ClientDataJSON: ', bufferToString(newCredentialInfo.response.clientDataJSON))
            // eslint-disable-next-line no-undef
            let attestationObject = CBOR.decode(newCredentialInfo.response.attestationObject);
            console.log('AttestationObject: ', attestationObject)
            // eslint-disable-next-line no-undef
            let authData = parseAuthData(attestationObject.authData);
            console.log('AuthData: ', authData);
            // eslint-disable-next-line no-undef
            console.log('CredID: ', bufToHex(authData.credID));
            // eslint-disable-next-line no-undef
            console.log('AAGUID: ', bufToHex(authData.aaguid));
            // eslint-disable-next-line no-undef
            console.log('PublicKey', CBOR.decode(authData.COSEPublicKey.buffer));
        })
        .catch((error) => {
            alert('Open your browser console!')
            console.log('FAIL', error)
        })


}

export default RegisterPrint;