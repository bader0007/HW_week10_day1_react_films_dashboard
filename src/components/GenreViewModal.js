import { Button, ListGroup, Modal } from "react-bootstrap"

function GenreViewModal(props) {
  const { show, setShow, film } = props
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ListGroup.Item>
            <strong> Genre: </strong> {film.genres.name}
          </ListGroup.Item>
          </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GenreViewModal 