import * as React from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {DataGrid, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import {IconButton} from '@mui/material';
import {Delete, Lock, LockOpen} from '@material-ui/icons';
import {updateUsersThunk, deleteUsersThunk, getAllUserThunk} from '../../store/reducers/usersReducer';
import {UserType} from '../../api/authApi';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'isBlocked', headerName: 'isBlocked', type: 'boolean', width: 150},
    {field: 'registered', headerName: 'Registered', width: 200},
    {field: 'lastDate', headerName: 'LastDate', width: 200}
];

export const AppTable: React.FC = () => {
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const users = useSelector<RootState, UserType[]>(state => state.users.data);
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuth) {
            dispatch(getAllUserThunk());
        }
    }, []);
    const unlockUsers = () => selectionModel.length !== 0 && dispatch(updateUsersThunk({
        users: selectionModel,
        isBlocked: false
    }));
    const blockUsers = () => selectionModel.length !== 0 && dispatch(updateUsersThunk({
        users: selectionModel,
        isBlocked: true
    }));
    const deleteUsers = () => selectionModel.length !== 0 && dispatch(deleteUsersThunk(selectionModel));

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div style={{height: 500, width: '100%'}}>
            <div style={{marginBottom: '30px'}}>
                <IconButton color="primary" onClick={unlockUsers}>
                    <LockOpen/>
                </IconButton>
                <IconButton color="secondary" onClick={blockUsers}>
                    <Lock/>
                </IconButton>
                <IconButton color="error" onClick={deleteUsers}>
                    <Delete/>
                </IconButton>
            </div>
            <DataGrid
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}

                selectionModel={selectionModel}
                rows={users}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </div>
    )
}