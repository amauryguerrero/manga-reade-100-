import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const ImageIdentifier = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // Simulamos la identificación de la imagen
  const simulateIdentification = (file) => {
    // Aquí podrías hacer una comparación de la imagen o simular una IA básica
    // Usaremos un nombre de archivo simple para decidir qué manga es.

    if (file.name.toLowerCase().includes('berserk')) {
      return {
        name: 'Berserk',
        author: 'Kentaro Miura',
        publisher: 'Hakusensha',
        volumes: 41,
      };
    } else if (file.name.toLowerCase().includes('one-piece')) {
      return {
        name: 'One Piece',
        author: 'Eiichiro Oda',
        publisher: 'Shueisha',
        volumes: 102,
      };
    } else {
      return null; // No se encontró el manga
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    setResult(null);

    // Simulamos la "IA" que identifica el manga
    const identificationResult = simulateIdentification(image);

    if (identificationResult) {
      setResult(identificationResult);
    } else {
      setError('No se pudo identificar el manga');
    }

    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2>Sube una Imagen del Manga para Identificarlo</h2>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Selecciona la imagen</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        {imageUrl && <img src={imageUrl} alt="Vista previa" width="200" className="mb-3" />}
        <Button variant="primary" onClick={handleImageUpload} disabled={loading}>
          {loading ? 'Cargando...' : 'Identificar Manga'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {result && (
        <div className="mt-4">
          <h3>Resultado de la Identificación</h3>
          <p><strong>Nombre:</strong> {result.name}</p>
          <p><strong>Autor:</strong> {result.author}</p>
          <p><strong>Publicación:</strong> {result.publisher}</p>
          <p><strong>Tomos:</strong> {result.volumes}</p>
        </div>
      )}
    </Container>
  );
};

export default ImageIdentifier;
