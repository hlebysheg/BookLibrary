//config validate
const MIN_LEN = 6;
const MAX_LEN = 20;

export const isPassword = (value: string) => {

    if(value.length < MIN_LEN || value.length  > MAX_LEN){
        return true
    } else {
        return false
    }
}

export const isMail =(email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
}