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
import jsPDF from "jspdf";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  console.log("room", JSON.stringify(room, null, 2));
  // Assuming you have a Y.Text object in your Yjs document
  // const textType = doc?.getText("default"); // Retrieve Y.Text stored in 'default'
  // const content = textType?.toString(); // Convert Y.Text to a plain string
  // console.log("Document content:", content);
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

  // Serialize Yjs document to Uint8Array for storage
  const encodedState = Y.encodeStateAsUpdate(doc); // `doc` is your Y.Doc instance
  Y.applyUpdate(doc, encodedState);
  console.log(doc);
  console.log(encodedState);
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
  const handleLogContent = () => {
    if (editor) {
      const content = editor.getJSON();
      console.log("Editor Content: ", content);
    }
  };

  // we are creating the new instance of yjs docs  so the written content will come here in the form of json
  // this is the function that takes out written text in an editor
  function ExtractFiles(nodes: any) {
    let textContent = "";
    console.log("this is a nodes", nodes);
    nodes.forEach((temp: any) => {
      if (temp.type === "paragraph") {
        temp?.content?.forEach((item: any) => {
          if (item.type === "text") {
            textContent += item.text + " ";
          }
        });
      } else if (temp.type === "orderedList") {
        temp?.content?.forEach((OrderedItem: any) => {
          if (OrderedItem.type === "listItem") {
            OrderedItem.content.forEach((items: any) => {
              if (items.type === "paragraph") {
                items?.content.forEach((textItem: any) => {
                  if (textItem?.type === "text") {
                    textContent += textItem.text + " ";
                  }
                });
              }
            });
          }
        });
      }
      textContent += "\n";
      console.log("temp.content", JSON.stringify(temp.content, null, 2));
      if (!temp.content) {
        textContent += "\n";
      }
    });
    return textContent;
  }

  const handleDownloadPdf = () => {
    if (editor) {
      const data = editor.getJSON();
      let res = data.content;
      const extractedText = ExtractFiles(res);
      const pdf = new jsPDF();
      pdf.text(extractedText, 10, 10);
      pdf.save("text-file.pdf");
    }
  };
  // Object structure of data in aur app
  // const data = [
  //   {
  //     type: "paragraph",
  //     content: [{ type: "text", text: "Hi I am Rohit Singh Khetwal" }]
  //   },
  //   {
  //     type: "orderedList",
  //     content: [
  //       { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "learn about nodejs authentication" }] }] },
  //       { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "study about 3 pointer in data structure " }] }] },
  //       { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "maximun sub tree" }] }] },
  //       { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "I know nothing " }] }] },
  //       // More items...
  //     ]
  //   }
  // ];

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
        <Avatars />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
      <Button onClick={handleLogContent}>Log Content</Button>
      <button
        onClick={handleDownloadPdf}
        className="bg-violet-400 px-3 py-1 rounded mb-2"
      >
        Download as Pdf
      </button>
    </div>
  );
}
