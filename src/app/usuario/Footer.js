import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className=" text-light py-4" style={{ backgroundColor: "#202434" }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; 2025 MarialuFit. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a
              href="https://wa.me/34635160202?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20tus%20servicios"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
            <a
              href="https://instagram.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://tiktok.com"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
