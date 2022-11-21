import React from 'react';
// @ts-ignore
import s from './Auth.module.css';
import {Button, Paper, TextField, Typography} from '@material-ui/core';
import {RootState, useAppDispatch} from '../../store/store';
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {loginThunk} from '../../store/reducers/authReducer';

export const Login: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    if (isAuth) return <Navigate to={'/todolist'}/>
    return (
        <div className={s.auth}>
            <Paper className={s.container} elevation={3}>
                <Typography variant="h4" component="h2" style={{marginBottom: '20px'}}>
                    Sign Up
                </Typography>

                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {email: '', password: ''};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form className={s.form} onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(loginThunk(values));
                        }}>
                            <div className={s.item}>
                                <TextField
                                    autoComplete={values.email}
                                    required
                                    error={!!errors.email && touched.email}
                                    className={s.textField}
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>


                            <div className={s.item}>
                                <TextField
                                    autoComplete={values.password}
                                    required
                                    error={!!errors.password && touched.password}
                                    className={s.textField}
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>

                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                color={'primary'}
                                variant={'outlined'}
                            >
                                Sign Up
                            </Button>

                            <NavLink className={s.link} to={'/registration'}>Don't have an account?</NavLink>
                        </form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
};