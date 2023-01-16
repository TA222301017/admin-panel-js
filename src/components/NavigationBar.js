import { Container, Nav, Navbar } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <div>
        <Navbar>
            <Container>
                <Navbar.Brand>TA222317</Navbar.Brand>
                <Nav>
                    <Nav.Link>Test 1</Nav.Link>
                    <Nav.Link>Test 2</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default NavigationBar