import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const Error = () => {
    return (
        <React.Fragment>
            <Grid container justifyContent="center">
                <Grid container item spacing={0} justifyContent="center">
                    <Typography>
                        このページは表示できません。
                    </Typography>
                </Grid>
                <Grid container item spacing={0} justifyContent="center">
                    <Link to="/">
                        <Button variant="outlined">トップ画面に戻る</Button>
                    </Link>
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}

export default Error