import axios, { type AxiosResponse } from "axios";
import type { Note, CreateNoteData } from "@/types/note";

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

const API_BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search && search.trim()) {
    queryParams.append("search", search.trim());
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get(
    `/notes?${queryParams}`
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<NoteResponse> = await api.post(
    "/notes",
    noteData
  );
  return response.data.note;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<NoteResponse> = await api.delete(
    `/notes/${noteId}`
  );
  return response.data.note;
};
