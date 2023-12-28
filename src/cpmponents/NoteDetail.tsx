import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import ReactMarkDown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  //outlet ile gonderilen proplari alma
  const props: Note = useOutletContext();

  // Perform a null check on the props object
  // if (!props) {
  //   return null; // or handle the case when props is null or undefined
  // }

  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{props?.title}</h1>

          <Stack direction="horizontal" gap={3} className="flex-wrap">
            {props?.tags?.map((tag) => (
              <Badge className="fs-6">{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="align-items-center">
            {/* "/" kullanmazsak varolan routun devamına ekleme yapar  */}
            <Link to="edit">
              <Button>Edit </Button>
            </Link>
            <Button
              onClick={() => deleteNote(props.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to={"/new"}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkDown className={"my-5"}>{props?.markdown}</ReactMarkDown>
    </div>
  );
};

export default NoteDetail;
