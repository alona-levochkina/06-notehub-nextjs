export interface Note {
  id: string;
  title: string | undefined;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface NoteResponse {
  note: Note;
}
