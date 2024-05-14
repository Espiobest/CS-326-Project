import crypto from 'crypto';

export const saltHashPassword = (password) => {
    const salt = randomString();
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {salt: salt, passwordHash: value};
}

const randomString = () => {
    return crypto.randomBytes(4).toString('hex');
}

export const validatePassword = (password, salt, hash) => {
    console.log("password: ", password, "salt: ", salt, "hash: ", hash);
    const hashVerify = crypto.createHmac('sha512', salt);
    hashVerify.update(password);
    const value = hashVerify.digest('hex');
    return value === hash;
}