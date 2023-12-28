import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateNote from "./cpmponents/Form/CreateNote";
import EditNote from "./cpmponents/Form/EditNote";
import { UseLocalStorage } from "./cpmponents/Form/UseLocalStorage";
import { v4 } from "uuid";
import { RawNote, NoteData, Tag } from "./types";
import { useMemo } from "react";
import MainPage from "./cpmponents/Mainpage";
import NoteDetail from "./cpmponents/NoteDetail";
import Layout from "./cpmponents/Layout";
function App() {
  const [notes, setNotes] = UseLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = UseLocalStorage<Tag[]>("tags", []);

  //lokalden aldigimiz notlarda etiket ismi yerine id geliyor
  //bizim yapacagimiz id lerin herbirine karsillik gelen etiketleri bulucaz
  //ve objeye eklicez
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  console.log(notes, noteWithTags);
  //yeni note olustur
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          //elemanin etiketlerini don idlerini diziye aktar
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };
  // yeni etiket olustur
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };
  //note'u sil
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  //note u duzenle
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    //bir nnote alicaz
    //notu state de tuttugumuz dizideki halini bulucaz
    //dizideki eski versiyonu kaldiricaz
    //yerine aldigimiz yeni notu koyucaz
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );
    setNotes(updated);
  };
  console.log(updateNote);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />} />
        <Route index element={<NoteDetail deleteNote={deleteNote} />} />
        <Route
          path="edit"
          element={
            <EditNote
              onSubmit={updateNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
