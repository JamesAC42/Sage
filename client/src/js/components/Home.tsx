import React, { Component } from 'react';

function TopMenu() {
    const classes = useStyles();
    
    return (
        <AppBar positions = 'fixed' className = {classes.appBar}>
            <Toolbar>
                <IconButton
                    edge = 'start'
                    className = {classes.menuButton}
                    color = 'inherit'
                    aria-label = 'menu'
                >
                    <MenuIcon />
                </IconButton>
                <MenuItem>
                    <Typography variant = 'h6' className = {classes.title}>
                        Home
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography variant = 'h6' className = {classes.title}>
                        About
                    </Typography>
                </MenuItem>
            </Toolbar>    
        </AppBar>
    );
}

export default TopMenu;

function Footer() {
    const classes = useStyles();
    return (
        <App.Bar position='fixed' className={classes.appBar}>
            <Typography variant='h6' className={classes.footer}>
                @ Copyright 2020
            </Typography>
        </AppBar>
    );
}

export default Footer;

function Main() {
    const classes = useStyles();
    
    return (
        <main className = {classes.fullWidth}>
            <div className = {classes.toolbar} />
            <div className = {classes.title}>
                <Typography variant = 'h6'>Title</Typograpy>
            </div>
            <div className = {classes.content}>
                <Typography Paragraph>
                    This is just a test design for a newbie front-end coder.
                </Typography>
            </div>
        </main>
    );
}

export default Main;

export default class Home extends Component {
    render() {
        const classes = useStyles();
        
        return(
            <div className = {classes.root}>
                <TopMenu />
                <Main />
                <Footer />
            </div>
        );
    }
}
