export interface User {
    idUsuario: string;
    username: string;
    email: string;
    password: string;
    roles : 'ADMIN' | 'USER';

}