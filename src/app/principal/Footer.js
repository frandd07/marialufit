import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, haciendo una llamada a una API
    console.log("Formulario enviado");
    handleClose();
  };

  return (
    <>
      <footer
        className="bg-dark text-light py-4"
        style={{ backgroundColor: "#1f2431" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                &copy; 2025 MarialuFit. Todos los derechos reservados.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              {/* Botón de Contacto */}
              <Button
                variant="primary"
                onClick={handleShow}
                className="me-3"
                style={{
                  background: "linear-gradient(135deg, #FF6347, #FF4500)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                }}
              >
                Contacto
              </Button>
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

      {/* Modal del formulario de contacto */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                required
              />
            </Form.Group>
            <Form.Group controlId="formMensaje" className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje"
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                background: "linear-gradient(135deg, #FF6347, #FF4500)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
              }}
            >
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
