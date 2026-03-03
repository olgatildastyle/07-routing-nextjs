import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!NOTEHUB_TOKEN) {
  throw new Error('NoteHub token is missing');
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
  sortBy?: 'created' | 'updated';
};

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
  sortBy = 'created',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search.trim() || undefined,
      tag,
      sortBy,
    },
  });

  return response.data;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
