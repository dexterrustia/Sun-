import React, { useState} from 'react'; 
import './App.css';  
import { Form, Button, Table, Modal } from "react-bootstrap";

const data = [
  { id:1 , title: "sample", content: "content", date: "Smaple Date" },
  { id:2 , title: "sample", content: "content", date: "Smaple Date" },
  { id:3 , title: "sample", content: "content", date: "Smaple Date" },
  { id:4 , title: "sample", content: "content", date: "Smaple Date" },
  { id:5 , title: "sample", content: "content", date: "Smaple Date" },
  { id:6 , title: "sample", content: "content", date: "Smaple Date" },
  { id:7 , title: "sample", content: "content", date: "Smaple Date" },
  { id:8 , title: "sample", content: "content", date: "Smaple Date" },
  { id:9 , title: "sample", content: "content", date: "Smaple Date" },
]

function NewActicle({
  onSubmit=f=>f
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const submitArticle = e => {
    e.preventDefault();
    console.log(`
     title => ${title}
      content => ${content}
      date => ${date}
    `);
    onSubmit({
      title,
      content,
      date
    })
  };

  return (
    <div>
      <Form onSubmit={submitArticle}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Article Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter your story"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Date Created"
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState(data)

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false)
  const [activeId, setActiveId] = useState(0)

  const addArticle = (objData) => {
    console.log('main' + objData)
    const newId = articles[articles.length -1 ].id + 1;
    setArticles([...articles, { id: newId, ...objData }]);
    handleClose();
  }
  const handleRemoved = id => { 
    setArticles(articles.filter(item => item.id !== id));
  }
  const handleEdit = id => { 
    setIsEdit(true);
    setActiveId(id) 
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="success" onClick={handleShow}>
          Create new article
        </Button>
      </header>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new article</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewActicle onSubmit={addArticle} />
        </Modal.Body>
      </Modal>
      <br />

      <Table striped bordered hover>
        <tr>
          <td>#</td>
          <td>Title</td>
          <td>Content</td>
          <td>Date Create</td>
          <td>Action</td>
        </tr>

        {articles.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>
              <span >
                {item.title}
              </span>
              <input
                type="text"
                value={item.title} />
            </td>
            <td>
              <span
                >
                {item.content}
              </span>
              <input
                type="text"
                value={item.content} />
            </td>
            <td>
              <span >
                {item.date}
              </span>
              <input
                type="text"
                value={item.date} />
            </td>
            <td>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleRemoved(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default App;
