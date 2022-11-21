import {$api} from './date';
import {AxiosResponse} from 'axios';

export const authApi = {
    registration(data: RegistrationValueType) {
        return $api.post<AxiosResponse, AxiosResponse<AuthUserType>>('/auth/registration', data);
    },
    login(data: LoginValueType) {
        return $api.post<AxiosResponse, AxiosResponse<AuthUserType>>('/auth/login', data);
    },
    logout(id: number) {
        return $api.delete<AxiosResponse, AxiosResponse<ResponseType>>(`/auth/logout/${id}`);
    }
}

export type RegistrationValueType = {
    name: string
    email: string
    password: string
}
export type LoginValueType = {
    email: string
    password: string
}
export type AuthUserType = UserType & {
    accessToken: string
    refreshToken: string
}
export type UserType = {
    name: string
    id: number
    email: string
    isBlocked: boolean
    registered: string
    lastDate: string
}
export type ResponseType = {
    status: string
}