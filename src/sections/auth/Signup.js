import React, { useEffect, useState } from 'react';
import { TextField, Box, Stack, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem } from '@mui/material'
import { Sign_up } from 'src/database/component/auth/SIGN_UP';
import { GET_COMPANY_LIST, GET_COMPANY_LIST_DETAIL } from 'src/database/component/auth/auth';

export function SignUpForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [fetchedCompanies, setfetchedCompanies] = useState([])

    const onClickSignUp = async () => {
        const data = fetchedCompanies.find(element => element.companyName == companyName);
        await Sign_up(name, email, password, data.companyID);
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const getCompanyList = await GET_COMPANY_LIST_DETAIL();
                await setfetchedCompanies(getCompanyList);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchCompanies()
    }, [])

    return (
        <><Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="Name"
                type="text"
                variant="filled"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Company Name</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                >
                    {fetchedCompanies.map((data, i) => {
                        return (<MenuItem key={i} value={data?.companyName}>{data?.companyName}</MenuItem>)
                    })}
                </Select>
            </FormControl>

            <TextField
                id="filled-basic"
                label="Email Address"
                type="email"
                variant="filled"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />


            <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <Button
                fullWidth size="large"
                color="inherit"
                variant="contained"
                onClick={onClickSignUp}
            >
                Signup
            </Button>
        </Stack>
        </>

    )
}