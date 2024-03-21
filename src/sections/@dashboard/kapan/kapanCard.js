// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { ButtonBase, Card, Grid, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

KapanCard.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    sx: PropTypes.object,
    data: PropTypes.object,
};

export default function KapanCard({ data = {}, title, total, icon, color = 'primary', sx, ...other }) {
    console.log(data, 'data kapan')
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            {/* <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                            theme.palette[color].dark,
                            0.24
                        )} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>

            <Typography variant="h3">{fShortenNumber(total)}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
            <Typography variant="h3">{data.roughName ?? ''}</Typography>
            <Typography variant="h3">{fShortenNumber(total)}</Typography> */}
            {/* <Grid > */}
            {/* <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <StyledIcon
                            sx={{
                                color: (theme) => theme.palette[color].dark,
                                backgroundImage: (theme) =>
                                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                                        theme.palette[color].dark,
                                        0.24
                                    )} 100%)`,
                            }}
                        >
                            <Iconify icon={icon} width={24} height={24} />
                        </StyledIcon>
                    </ButtonBase>
                </Grid> */}
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {data.roughName}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Full resolution 1920x1080 • JPEG
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            Remove
                        </Typography>
                    </Grid> */}
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                        $19.00
                    </Typography>
                </Grid>
            </Grid>
            {/* </Grid> */}
        </Card>

    );
}
