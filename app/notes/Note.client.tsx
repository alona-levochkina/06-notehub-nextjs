'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: debouncedSearchTerm || undefined,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 30000,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteCreated = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {notesData && notesData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={notesData.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>

      {notesData && notesData.notes.length > 0 && (
        <NoteList
          notes={notesData.notes}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onSuccess={handleNoteCreated} onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
