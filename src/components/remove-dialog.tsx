'use client'

import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog";


interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
    name?: string;
};

export const RemoveDialog = ({ children, documentId, name }: RemoveDialogProps) => {
    const router = useRouter();
    const [isRemoving, setIsRemoving] = useState(false);

    const remove = useMutation(api.documents.removeById);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            remove({ id: documentId })
                                .catch(() => toast.error("Something went wrong"))
                                .then(() => {
                                    toast.success(`${name ?? Document} Removed`)
                                    router.push("/")
                                })
                                .finally(() => setIsRemoving(false))
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};