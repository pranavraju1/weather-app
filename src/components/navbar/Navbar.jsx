import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaEarthAsia } from "react-icons/fa6";
import "./styles.scss";
import { Link } from "react-router-dom";
const NavigationBar = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary-dark navigation"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <FaEarthAsia className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto links">
            <Nav.Link as={Link} to={"/"} className="link">
              <u>
                <i>Home</i>
              </u>
            </Nav.Link>
            <Nav.Link as={Link} to={"/state"} className="link">
              <u>
                <i>State</i>
              </u>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <nav>
    //   <Link to={"/"}>Home </Link>
    //   <Link to={"/state"}>State </Link>
    // </nav>
  );
};

export default NavigationBar;
