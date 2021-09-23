import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

const Layout = props => {
    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Github Demo</Navbar.Brand>
                </Container>
            </Navbar>

            {props.children}
        </React.Fragment>
    )
};

export default Layout;

