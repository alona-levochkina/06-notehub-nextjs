import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from './NoteDetails.client'

interface NoteDetailsProps {
    params: {
        id: string;
    };
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
    const queryClient = new QueryClient();
        await queryClient.prefetchQuery({
            queryKey: ['note', params.id],
            queryFn: () => fetchNoteById(params.id),
        })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    )
}
