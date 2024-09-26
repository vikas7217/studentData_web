import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
    }

    handelReload = () => {
        window.location.reload()
    }


    render() {
        if (this.state.hasError) {
            return (

                <>

                    <Grid sx={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Grid sx={{}} >

                            <Typography variant="body1" color="error">
                                Something went wrong: {this.state.error.message}
                            </Typography>
                            <Typography>
                                {this.state.errorInfo}
                            </Typography>

                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant='contained' onClick={this.handelReload}>
                                    Reload
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </>

            );

        }

        return this.props.children;
    }
}

export default ErrorBoundary;
