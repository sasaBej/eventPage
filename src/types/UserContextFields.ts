export interface UserContextFields {
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly company: string
}

export const  defaultUser = {
 firstName: '',
 lastName: '',
 company:'',
 email:''
};