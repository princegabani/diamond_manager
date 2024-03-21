import { React, useState } from 'react';
import { TextField, Box, Button, FormControl, Stack, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { setAuth, setCompanyData, setEmployeeData } from '../../store';
import { INITSIGNIN } from 'src/database/component/auth/auth';
import { SIGNIN } from 'src/database/component';


export function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onClickLogin = async () => {
        setShowErrorMessage('')
        setLoading(true)
        if (email !== '' && password !== '') {
            // const signInData = await INITSIGNIN(email, password)
            // console.log('+++++++', signInData)

            // if (signInData !== {}) {
            //     console.log('from signin', signInData)

            //     dispatch(setAuth(signInData.auth))
            //     dispatch(setCompanyData(signInData.company))
            //     dispatch(setEmployeeData(signInData.employee ?? {}))

            //     // navigate('/dashboard');
            // } else setShowErrorMessage("Something went wrong")

            // const userData = await SIGNIN(email, password);
            // console.log('user data from signin page', userData)
            // if (userData) {
            //     console.log('got userData', userData)
            // }

            const userData = await SIGNIN(email, password);
            console.log('user data from signin page', userData)
            if (userData.success) {
                const ref = await INITSIGNIN(userData.data)
                if (ref.success) {
                    console.log(ref.success)
                    dispatch(setAuth(ref?.data?.auth))
                    dispatch(setCompanyData(ref?.data?.company))
                    dispatch(setEmployeeData(ref?.data?.employee ?? {}))
                    navigate('/dashboard');
                } else {

                    setShowErrorMessage("Something went wrong")
                }

            } else setShowErrorMessage(userData.message)
        } else setShowErrorMessage("Something went wrong")
        setLoading(false)
    }

    return (
        <>
            <Stack spacing={2}>
                {showErrorMessage &&
                    <Typography style={{ color: 'red' }}>{showErrorMessage}</Typography>
                }
                <FormControl required sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email filled-basic color-transparent"
                        type='email'
                        label='Email'
                        value={email}
                        variant="filled"
                        onChange={(event) => setEmail(event.target.value)} />
                </FormControl>
                <FormControl required sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password filled-password-input"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        variant="filled"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
                {/* <TextField
                    required
                    id="filled-basic"
                    label="Email Address"
                    type="email"
                    variant="filled"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <TextField
                    required
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                /> */}
                <LoadingButton onClick={onClickLogin} loading={loading} fullWidth size="large"
                    color="inherit"
                    variant="contained">
                    <span>Submit</span>
                </LoadingButton>
            </Stack>
        </>
    )
}
{/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Passwordss</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl> */}