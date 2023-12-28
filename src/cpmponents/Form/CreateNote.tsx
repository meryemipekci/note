import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../../types";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
//partial sayasinde sunu yapmis olduk
//farkli bir type in butun degerlerini bu "createnoteprops"
/* type ina aktardik ayni zamnda partials kullandıgımız için 
hepsi ? ile tanımlanmis gibi bazı durumlarda undefined olabilir*/
const CreateNote = ({
  availableTags,
  onSubmit,
  createTag,
}: CreateNoteProps) => {
  console.log(CreateNote);
  return (
    <div className="container py-4">
      <h1>Create new note</h1>
      <NoteForm
        availableTags={availableTags}
        createTag={createTag}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreateNote;
