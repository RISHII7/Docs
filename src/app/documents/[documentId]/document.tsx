'use client'

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { Room } from "@/app/documents/[documentId]/room";
import { Editor } from "@/app/documents/[documentId]/editor";
import { Navbar } from "@/app/documents/[documentId]/navbar";
import { Toolbar } from "@/app/documents/[documentId]/toolbar";


interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
};

export const Document = ({ preloadedDocument }: DocumentProps) => {
    const document = usePreloadedQuery(preloadedDocument);

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFB] print:hidden">
                    <Navbar data={document} />
                    <Toolbar />
                </div>
                <div className="pt-[114px] print:pt-0">
                    <Editor initialContent={document.initialContent} />
                </div>
            </div>
        </Room>
    );
}
