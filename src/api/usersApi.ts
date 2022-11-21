import {$api} from './date';
import {AxiosResponse} from 'axios';
import {ResponseType, UserType} from './authApi';
import {GridSelectionModel} from '@mui/x-data-grid';

export const usersApi = {
    getUser(id: number) {
        return $api.get<AxiosResponse, AxiosResponse<UserType>>(`/users/${id}`);
    },
    getAllUser() {
        return $api.get<AxiosResponse, AxiosResponse<UserType[]>>(`/users`);
    },
    updateUsers(data:UpdateUsersValueType) {
        return $api.put<AxiosResponse, AxiosResponse<ResponseType>>(`/users`, data);
    },
    deleteUsers(data:GridSelectionModel) {
        return $api.post<AxiosResponse, AxiosResponse<ResponseType>>(`/users`, data);
    }
}

export type UpdateUsersValueType = {
    users: GridSelectionModel
    isBlocked: boolean
}