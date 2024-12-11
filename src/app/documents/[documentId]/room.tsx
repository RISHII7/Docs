"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    return (
        <LiveblocksProvider publicApiKey={"pk_dev_BgeE9pq35VkXdp0WI-2pmKWtnZfJbsPrLEYdwA-5W6ZB66Jr_R4taI5ho_D84mT2"}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}