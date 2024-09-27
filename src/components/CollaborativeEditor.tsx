"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import { Button } from "@mui/material";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  console.log("room", JSON.stringify(room, null, 2));
  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  console.log("userInfo", JSON.stringify(userInfo, null, 2));

  // Use a ref to hold the textType
  const textTypeRef = useRef<Y.Text | null>(null);

  // Initialize Y.Text only once
  // useEffect(() => {
  //   // Get or create the Y.Text instance
  //   const existingTextType = doc.getText("default");

  //   if (existingTextType) {
  //     textTypeRef.current = existingTextType;
  //   } else {
  //     textTypeRef.current = new Y.Text();
  //     doc.getMap("texts").set("default", textTypeRef.current); // Optionally store in a Y.Map
  //   }

  //   // Cleanup: remove the Y.Text instance if it exists on unmount
  //   return () => {
  //     if (textTypeRef.current) {
  //       doc.getMap("texts").delete("default");
  //     }
  //   };
  // }, [doc]);

  // useEffect(() => {
  //   const logContent = () => {
  //     const text = textTypeRef.current?.toString() || ""; // Convert Y.Text to string
  //     console.log("Current document content:", text);
  //   };

  //   // Log content on every update
  //   doc.on("update", logContent);

  //   // Clean up the listener
  //   return () => {
  //     doc.off("update", logContent);
  //   };
  // }, [doc]);

  // Set up editor with plugins
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: userInfo,
      }),
    ],
  });

  // const handleLogContent = () => {
  //   const text = textTypeRef.current?.toString() || ""; // Get the current content
  //   console.log("Document content:", text);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
        <Avatars />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
      {/* <Button onClick={handleLogContent}>Log Content</Button> */}
    </div>
  );
}
