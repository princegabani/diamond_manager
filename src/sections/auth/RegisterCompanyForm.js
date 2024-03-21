import React, { useState } from 'react';
import { TextField, Stack, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { REGISTER_COMPANY } from 'src/database/component';

export function RegisterCompanyForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const onClickSignUp = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (companyName, email, password, ownerName) {

            const data = {
                companyName: companyName,
                ownerName: ownerName,
                email: email,
                password: password
            }
            const ref = await REGISTER_COMPANY(data);
            setShowErrorMessage(ref.message)
            setLoading(false)
        }
        else {
            setShowErrorMessage('Something Wrong')
            setLoading(false)
        }
    }

    return (
        <>
            <Stack spacing={2}>
                {showErrorMessage &&
                    <Typography style={{ color: 'red' }}>{showErrorMessage}</Typography>
                }

                <TextField
                    required
                    id="outlined-required companyName"
                    label="Company Name"
                    type="text"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                />

                <TextField
                    required
                    id="outlined-required ownerName"
                    label="Owner Name"
                    type="text"
                    value={ownerName}
                    onChange={(event) => setOwnerName(event.target.value)}
                />

                <FormControl required sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email filled-basic color-transparent email"
                        type='email'
                        label='Email'
                        value={email}
                        variant="filled"
                        onChange={(event) => setEmail(event.target.value)} />
                </FormControl>

                <FormControl required sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password filled-password-input password"
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

                <LoadingButton onClick={onClickSignUp} loading={loading} fullWidth size="large"
                    color="inherit"
                    variant="contained">
                    <span>Register Company</span>
                </LoadingButton>
            </Stack>
        </>

    )
}