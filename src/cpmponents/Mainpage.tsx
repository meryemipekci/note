import { Button, Stack, Form, Row, Col } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState, useMemo } from "react";
import NoteCard from "./Form/NoteCard";

export type MainProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  //  filtreleme yapma
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //notun basligi arttigim metni iceriyorsa notlari dondur
          (note.title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          //sectigim etiketlerin tamamı notta varsa notu getir
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => tag.id === noteTag.id)
            ))
        );
      }),
    [title, selectedTags, notes]
  );
  console.log(filtredNotes);
  return (
    <div className="container py-5">
      {/* baslik */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button> Create </Button>
        </Link>
      </Stack>

      {/* filtreleme */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search by title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search by tag</Form.Label>
              <ReactSelect
                // value={selectedTags.map((tag) => ({
                //   label: tag.label,
                //   value: tag.id,
                // }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                isMulti
                className="shadow"
                //daha onceden olusturulanları listele
                options={availableTags.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* notlar */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col>
            <NoteCard key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
