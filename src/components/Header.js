import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import Tomato from "../icons/tomato.png"

class Header extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={Tomato}
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                    {' React Tomatoes'}
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Carefully schedule your week... will your plants see the end of the season?
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default Header