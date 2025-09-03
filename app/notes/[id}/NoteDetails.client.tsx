'use client';

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
    const params = useParams();
    const noteId = params.id as string;

    const { data: note, isLoading, isError, error, } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId),
        enabled: !!noteId,
    });

    if (isLoading) {
        return <p>Loading, please wait ...</p>;
    }

    if (isError || !note) {
        return <p>Something went wrong.</p>
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();

    };

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{formatDate(note.createdAt)}</p>
            </div>
        </div>
    )

}