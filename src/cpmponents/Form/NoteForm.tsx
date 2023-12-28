import { FormEvent, useRef, useState } from "react";
import { Button, FormControl, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { CreateNoteProps } from "./CreateNote";
import { Tag } from "../../types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  markdown = "",
  tags = [],
  title = "",
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };
  console.log(selectedTags);
  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                //daha once secilen etiketler
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                //her degişimde olmasi gereken
                onChange={(note_tags) =>
                  setSelectedTags(
                    note_tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                //yeni etiket olustugunda locale kaydet
                onCreateOption={(label) => {
                  console.log(label);
                  // yeni obje tanımla
                  const newTag: Tag = { id: v4(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                //daha onceden olusturulanları listele
                options={availableTags.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
                className="shadow"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown" className="my-4">
          <Form.Label>Content</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            required
            className="shadow"
            style={{ minHeight: "300px" }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button type="submit">Save</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default NoteForm;
