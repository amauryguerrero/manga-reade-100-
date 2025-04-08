import React, { useState } from 'react';   
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => e.preventDefault();

  // Lista reducida para uso general
  const mangas = [
    { id: 1, title: "Sailor Moon", cover: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_164t9vugvd595426b8qera4040/-S897-FWEBP", tomos: 12, author: "Naoko Takeuchi", genre: "Shojo, Magical Girl" },
    { id: 2, title: "Shingeki no Kyojin", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fB3WhnzKW6ppY0_Xbncx2vkBSgsJlbgqYhIw9-NY_s18ixrlC9jFTqllvC83MDKlVTI&usqp=CAU", tomos: 34, author: "Hajime Isayama", genre: "Shonen, Acción, Fantasía oscura" },
    { id: 3, title: "Dragon Ball", cover: "https://ramenparados.com/wp-content/uploads/2014/09/normal_Dragon_Ball_SD-300x464.jpg", tomos: 70, author: "Akira Toriyama", genre: "Shonen, Acción, Aventura" },
    { id: 4, title: "Vinland Saga", cover: "https://www.planetadelibros.com.mx/usuaris/libros/fotos/206/m_libros/205030_vinland-saga-n01_9788416051816.jpg", tomos: 25, author: "Makoto Yukimura", genre: "Seinen, Histórico, Acción" },
    { id: 5, title: "Komi San", cover: "https://cdn.agapea.com/Ivrea-editorial/Komi-san-no-puede-comunicarse-n-01-i1n21006525.jpg", tomos: 30, author: "Tomohito Oda", genre: "Shonen, Comedia, Romance" }
  ];

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Manga Reader</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quien-somos">Quiénes Somos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/ia-identificar">IA para Identificar Mangas</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Buscar Manga"
              className="mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">Buscar</Button>
          </Form>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home mangas={mangas} searchQuery={searchQuery} />} />
        <Route path="/manga/:nombre" element={<MangaDetail mangas={mangas} />} />
        <Route path="/quien-somos" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/ia-identificar" element={<IAIdentificar />} />
      </Routes>
    </Router>
  );
}

function Home({ mangas, searchQuery }) {
  const filteredMangas = mangas.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container mt-4">
      <h2>Bienvenidos a Manga Reader</h2>
      <h3>Títulos de Manga</h3>
      <div className="row">
        {filteredMangas.length > 0 ? filteredMangas.map((manga) => (
          <div className="col-md-4" key={manga.id}>
            <div className="card mb-4">
              <img src={manga.cover} className="card-img-top" alt={manga.title} />
              <div className="card-body">
                <h5 className="card-title">{manga.title}</h5>
                <p>{manga.author} - {manga.genre}</p>
                <Button as={Link} to={`/manga/${encodeURIComponent(manga.title)}`} variant="primary">Leer</Button>
              </div>
            </div>
          </div>
        )) : <p>No se encontró el manga.</p>}
      </div>
    </div>
  );
}

function MangaDetail({ mangas }) {
  return (
    <div className="container mt-4">
      <h2>Detalles del Manga</h2>
      {mangas.map((manga) => (
        <div key={manga.id}>
          <h3>{manga.title}</h3>
          <img src={manga.cover} alt={manga.title} className="img-fluid" />
          <h4>Tomos:</h4>
          <ul>
            {[...Array(manga.tomos)].map((_, index) => (
              <li key={index}>Tomo {index + 1}</li>
            ))}
          </ul>
          <Button variant="secondary">Leer Manga</Button>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="container mt-4">
      <h2>Quiénes Somos</h2>
      <p>Somos una plataforma para leer y descargar mangas de todo el mundo.</p>
      <img src="https://i.redd.it/ya7cblx2rwwa1.jpg" alt="Imagen de Quiénes Somos" className="img-fluid mt-4" />
    </div>
  );
}

function Contact() {
  return (
    <div className="container mt-4">
      <h2>Contacto</h2>
      <p>Correo: contacto@mangareader.com</p>
      <p>Facebook: facebook.com/mangareader</p>
      <p>Twitter: @mangareader</p>
      <img src="https://i.pinimg.com/564x/58/fb/4a/58fb4a3389ad370ea24e686fd6fa9c27.jpg" alt="Imagen de contacto" className="img-fluid mt-4" />
    </div>
  );
}

function IAIdentificar() {
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState(null);

  // Lista interna para IA con descripción
  const mangasConDescripcion = [
    { title: "Sailor Moon", author: "Naoko Takeuchi", genre: "Shojo, Magical Girl", tomos: 12, description: "Una chica con poderes mágicos lucha contra el mal." },
    { title: "Kobayashi-san Chi no Maid Dragon", author: "Cool-kyou Shinja", genre: "Comedia, Fantasía, Slice of Life", tomos: 14, description: "Una oficinista termina viviendo con una dragona convertida en sirvienta adorable y poderosa." },
    { title: "Dragon Ball", author: "Akira Toriyama", genre: "Shonen, Acción, Aventura", tomos: 70, description: "Un joven guerrero busca las esferas del dragón." },
    { title: "Vinland Saga", author: "Makoto Yukimura", genre: "Seinen, Histórico, Acción", tomos: 25, description: "Una historia épica de vikingos y venganza." },
    { title: "Komi San", author: "Tomohito Oda", genre: "Shonen, Comedia, Romance", tomos: 30, description: "Una chica tímida lucha por hacer amigos." },
    { title: "Naruto", author: "Masashi Kishimoto", genre: "Shonen, Acción, Aventura", tomos: 72, description: "Un ninja con un zorro demonio sueña con ser el líder de su aldea." },
    { title: "One Piece", author: "Eiichiro Oda", genre: "Shonen, Aventura, Comedia", tomos: 105, description: "Un chico con poderes de goma busca el tesoro One Piece para ser el Rey de los Piratas." },
    { title: "Bleach", author: "Tite Kubo", genre: "Shonen, Acción, Fantasía", tomos: 74, description: "Un joven obtiene poderes sobrenaturales para luchar contra espíritus malignos." },
    { title: "Fullmetal Alchemist", author: "Hiromu Arakawa", genre: "Shonen, Aventura, Fantasía", tomos: 27, description: "Dos hermanos alquimistas buscan recuperar sus cuerpos perdidos." },
    { title: "My Hero Academia", author: "Kohei Horikoshi", genre: "Shonen, Acción, Superhéroes", tomos: 35, description: "Un joven sin poderes recibe una habilidad poderosa y entrena para ser héroe." },
    { title: "Tokyo Ghoul", author: "Sui Ishida", genre: "Seinen, Horror, Acción", tomos: 14, description: "Un estudiante se convierte en mitad ghoul y debe adaptarse a su nueva realidad." },
    { title: "JoJo's Bizarre Adventure", author: "Hirohiko Araki", genre: "Shonen, Aventura, Acción", tomos: 120, description: "Diversas generaciones de la familia Joestar luchan contra enemigos sobrenaturales." },
    { title: "Death Note", author: "Tsugumi Ohba", genre: "Shonen, Suspenso, Psicológico", tomos: 12, description: "Un estudiante usa un cuaderno mortal para eliminar criminales." },
    { title: "One Punch Man", author: "Yusuke Murata", genre: "Shonen, Acción, Comedia", tomos: 23, description: "Un héroe abrumadoramente fuerte busca un enemigo que le dé batalla." },
    { title: "Demon Slayer", author: "Koyoharu Gotouge", genre: "Shonen, Acción, Aventura", tomos: 23, description: "Un joven combate demonios para salvar a su hermana." },
    { title: "Hunter x Hunter", author: "Yoshihiro Togashi", genre: "Shonen, Aventura, Acción", tomos: 36, description: "Un niño busca a su padre y se convierte en cazador enfrentando desafíos extremos." },
    { title: "Dragon Ball Z", author: "Akira Toriyama", genre: "Shonen, Acción, Aventura", tomos: 42, description: "Un poderoso guerrero Saiyajin protege la Tierra de amenazas cósmicas." },
    { title: "Fruits Basket", author: "Natsuki Takaya", genre: "Shojo, Romance, Comedia", tomos: 23, description: "Una chica convive con una familia que se transforma en animales del zodiaco chino." },
    { title: "Re:Zero", author: "Tappei Nagatsuki", genre: "Isekai, Acción, Fantasía", tomos: 16, description: "Un joven revive el mismo día tras morir en un mundo alterno, intentando cambiar su destino." }
  ];

  const handleIdentify = () => {
    const foundManga = mangasConDescripcion.filter(manga => manga.description.includes(keywords));
    setResult(foundManga);
  };

  return (
    <div className="container mt-4">
      <h2>IA para Identificar Manga</h2>
      <Form>
        <Form.Group controlId="formKeywords">
          <Form.Label>Ingrese una descripción del manga</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba una descripción del manga"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleIdentify} variant="primary" className="mt-3">Identificar</Button>
      </Form>

      {result && result.length > 0 && (
        <div className="mt-4">
          <h3>Resultado</h3>
          {result.map((manga, index) => (
            <div key={index}>
              <h5>{manga.title}</h5>
              <p><strong>Autor:</strong> {manga.author}</p>
              <p><strong>Género:</strong> {manga.genre}</p>
              <p><strong>Tomos:</strong> {manga.tomos}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
