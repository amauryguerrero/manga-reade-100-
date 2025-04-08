import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function HomePage() {
  // Datos de ejemplo de mangas
  const mangas = [
    { id: 1, title: 'Sailor Moon', cover: 'https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_164t9vugvd595426b8qera4040/-S897-FWEBP' },
    { id: 2, title: 'Shingeki no Kyojin', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fB3WhnzKW6ppY0_Xbncx2vkBSgsJlbgqYhIw9-NY_s18ixrlC9jFTqllvC83MDKlVTI&usqp=CAU' },
    { id: 3, title: 'Dragon Ball', cover: 'https://ramenparados.com/wp-content/uploads/2014/09/normal_Dragon_Ball_SD-300x464.jpg' },
    { id: 4, title: 'Vinland Saga', cover: 'https://www.planetadelibros.com.mx/usuaris/libros/fotos/206/m_libros/205030_vinland-saga-n01_9788416051816.jpg' },
    { id: 5, title: 'komi san', cover: 'https://cdn.agapea.com/Ivrea-editorial/Komi-san-no-puede-comunicarse-n-01-i1n21006525.jpg' },
  ];

  return (
    <Container>
      {/* Sección de Quiénes somos */}
      <Row className="my-4">
        <Col>
          <h1>¿Quiénes somos?</h1>
          <p>Somos una plataforma para leer y descargar mangas online. Explora una variedad de mangas y disfruta de tus historias favoritas.</p>
        </Col>
      </Row>

      {/* Sección de mangas */}
      <Row>
        {mangas.map((manga) => (
          <Col key={manga.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={manga.cover} />
              <Card.Body>
                <Card.Title>{manga.title}</Card.Title>
                <Button variant="primary" className="me-2">Leer</Button>
                <Button variant="secondary">Descargar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
