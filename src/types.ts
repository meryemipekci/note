export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
// verileri local de tutarken kullanacagımız veri tipi
// verileri veri tabanlarinden tutrken dizide elemanlar genelde
// sadece id lerini tutmayı tercih ederiz
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
