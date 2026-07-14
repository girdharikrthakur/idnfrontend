import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Node, Extension } from "@tiptap/core";
import { TextStyle } from "@tiptap/extension-text-style";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

// New Extensions
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Typography } from "@tiptap/extension-typography";
import { CharacterCount } from "@tiptap/extension-character-count";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";

// Icons
import {
  Bold, Italic, Strikethrough, Underline as UnderlineIcon, Highlighter,
  Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, CheckSquare,
  Quote, Code, Undo, Redo,
  Image as ImageIcon, Video, Tv, Link as LinkIcon, Unlink,
  Table as TableIcon, Heading1, Heading2, Heading3,
  Eye, Save, Send, Type, Palette, LayoutTemplate, XCircle, Grid3X3, ArrowDownToLine, ArrowRightToLine,
  Columns, Rows, Trash2
} from "lucide-react";

// --- Custom Nodes ---
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

const ImageNode = Node.create({
  name: "image",
  group: "block",
  addAttributes() {
    return {
      src: {},
      align: { default: "center" },
      width: { default: "100%" },
      caption: { default: "" },
    };
  },
  parseHTML() { return [{ tag: "img" }]; },
  renderHTML({ node }) {
    return [
      "div",
      { class: "news-image", "data-align": node.attrs.align },
      ["img", { src: node.attrs.src, style: `width:${node.attrs.width}` }],
      node.attrs.caption ? ["p", { class: "news-caption" }, node.attrs.caption] : null,
    ];
  },
});

const VideoNode = Node.create({
  name: "video",
  group: "block",
  addAttributes() { return { src: {} }; },
  parseHTML() { return [{ tag: "video" }]; },
  renderHTML({ HTMLAttributes }) {
    return ["video", { controls: true, class: "news-video rounded-xl shadow-md", ...HTMLAttributes }];
  },
});

const YoutubeNode = Node.create({
  name: "youtube",
  group: "block",
  addAttributes() { return { src: {} }; },
  parseHTML() { return [{ tag: "iframe" }]; },
  renderHTML({ HTMLAttributes }) {
    return ["iframe", { ...HTMLAttributes, width: "100%", height: "450", allowfullscreen: "true", class: "rounded-xl shadow-md my-6 border-0" }];
  },
});

// --- Toolbar Button Component ---
const ToolBtn = ({ onClick, active, children, title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center
      ${active ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-orange-500 dark:hover:text-orange-400'}
    `}
  >
    {children}
  </button>
);

// --- Main Component ---
export default function NewsEditor() {
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  // File Inputs Refs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/tag", { withCredentials: true });
        if (response.data && response.data.data) {
          setAvailableTags(response.data.data);
        } else if (Array.isArray(response.data)) {
           setAvailableTags(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };
    fetchTags();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: "bg-slate-800 dark:bg-black text-white rounded-lg p-4 font-mono text-sm" } },
        blockquote: { HTMLAttributes: { class: "border-l-4 border-orange-500 pl-4 py-1 italic bg-orange-50 dark:bg-orange-500/5 rounded-r-lg" } },
      }),
      TextStyle,
      FontSize,
      ImageNode,
      VideoNode,
      YoutubeNode,
      Underline,
      Highlight.configure({ HTMLAttributes: { class: "bg-orange-100 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 rounded px-1" } }),
      TaskList,
      TaskItem.configure({ nested: true, HTMLAttributes: { class: "flex items-start gap-2 my-1" } }),
      Subscript,
      Superscript,
      Color,
      Table.configure({ resizable: true, HTMLAttributes: { class: "border-collapse table-auto w-full border border-slate-200 dark:border-white/10 rounded-lg shadow-sm my-4 overflow-hidden" } }),
      TableRow.configure({ HTMLAttributes: { class: "border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors" } }),
      TableHeader.configure({ HTMLAttributes: { class: "bg-slate-50 dark:bg-white/5 border-r border-slate-100 dark:border-white/5 p-3 font-semibold text-left" } }),
      TableCell.configure({ HTMLAttributes: { class: "border-r border-slate-100 dark:border-white/5 p-3" } }),
      Typography,
      CharacterCount,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-orange-500 dark:text-orange-400 underline cursor-pointer decoration-2 underline-offset-2 hover:text-orange-600 dark:hover:text-orange-300 transition-colors" } })
    ],
    content: "<p>Start writing your masterpiece...</p>",
  });

  // --- Handlers ---
  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://localhost:8080/posts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      editor.chain().focus().insertContent({ type: "image", attrs: { src: response.data } }).run();
    } catch (err) {
      alert("Failed to upload image.");
    } finally {
      e.target.value = null;
    }
  };

  const addVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://localhost:8080/posts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      editor.chain().focus().insertContent({ type: "video", attrs: { src: response.data } }).run();
    } catch (err) {
      alert("Failed to upload video.");
    } finally {
      e.target.value = null;
    }
  };

  const addYoutube = () => {
    const url = prompt("Enter YouTube URL");
    if (!url) return;
    const embed = url.replace("watch?v=", "embed/").split("&")[0];
    editor.chain().focus().insertContent({ type: "youtube", attrs: { src: embed } }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Auto-Save Draft
  useEffect(() => {
    if (!editor) return;
    const interval = setInterval(() => {
      localStorage.setItem("draft", editor.getHTML());
    }, 2000);
    return () => clearInterval(interval);
  }, [editor]);

  // Load Draft
  useEffect(() => {
    if (!editor) return;
    const saved = localStorage.getItem("draft");
    if (saved) editor.commands.setContent(saved);
  }, [editor]);

  const getCleanHTML = () => {
    return DOMPurify.sanitize(editor.getHTML(), {
      ADD_TAGS: ["iframe", "video", "source", "img"],
      ADD_ATTR: [
        "allowfullscreen", "controls", "class", "style", "data-align",
        "src", "width", "height", "target", "rel", "href"
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data|blob|mediastream):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
    });
  };

  const handlePreview = () => {
    setPreview(getCleanHTML());
  };

  const handleSave = async (isDraft) => {
    const content = getCleanHTML();
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    const postData = {
      title, content, category,
      status: isDraft ? "DRAFT" : "PUBLISHED",
      authorId: 1, categoryIds: [], tagIds: selectedTagIds,
    };
    try {
      const response = await axios.post('http://localhost:8080/posts', postData, { withCredentials: true });
      if (response.status === 200 || response.status === 201) {
        alert(isDraft ? "Draft saved successfully!" : "Published successfully!");
        if (!isDraft) localStorage.removeItem("draft");
      }
    } catch (error) {
      alert("Failed to save post.");
    }
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] p-4 md:p-8 font-sans transition-colors duration-300">
      
      {/* EDITOR CONTAINER */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg rounded-2xl overflow-hidden flex flex-col transition-colors duration-300">
        
        {/* HEADER / METADATA SECTION */}
        <div className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Amazing Article Title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white transition-all focus:ring-0"
          />
          
          <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-50 dark:hover:bg-slate-700 transition-all focus:ring-2 focus:ring-orange-500/50 cursor-pointer shadow-sm"
            >
              <option value="Technology">Technology</option>
              <option value="Politics">Politics</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>

            {availableTags.length > 0 && (
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 shadow-sm flex-grow">
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tags:</span>
                <div className="flex gap-3 flex-wrap max-h-12 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <label key={tag.id} className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTagIds.includes(tag.id)}
                        className="rounded text-orange-500 focus:ring-orange-500 bg-white dark:bg-slate-700 border-slate-300 dark:border-white/10 w-4 h-4 cursor-pointer transition-all"
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTagIds([...selectedTagIds, tag.id]);
                          else setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id));
                        }}
                      />
                      {tag.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STICKY TOOLBAR */}
        <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 p-3 shadow-sm flex flex-wrap gap-2 items-center px-6">
          
          {/* History */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} active={false}><Undo size={18} /></ToolBtn>
            <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} active={false}><Redo size={18} /></ToolBtn>
          </div>

          {/* Typography */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}><Heading1 size={18} /></ToolBtn>
            <ToolBtn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}><Heading2 size={18} /></ToolBtn>
            <ToolBtn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}><Heading3 size={18} /></ToolBtn>
          </div>

          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={18} /></ToolBtn>
            <ToolBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={18} /></ToolBtn>
            <ToolBtn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><UnderlineIcon size={18} /></ToolBtn>
            <ToolBtn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough size={18} /></ToolBtn>
            <ToolBtn title="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")}><Highlighter size={18} /></ToolBtn>
            <ToolBtn title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")}><SubscriptIcon size={18} /></ToolBtn>
            <ToolBtn title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")}><SuperscriptIcon size={18} /></ToolBtn>
            
            <div className="relative group flex items-center ml-1">
              <Palette size={18} className="text-slate-600 dark:text-slate-400" />
              <input
                type="color"
                onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
                value={editor.getAttributes("textStyle").color || "#000000"}
                className="w-6 h-6 p-0 border-0 ml-1 rounded cursor-pointer bg-transparent"
                title="Text Color"
              />
            </div>
          </div>

          {/* Lists & Blocks */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={18} /></ToolBtn>
            <ToolBtn title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered size={18} /></ToolBtn>
            <ToolBtn title="Task List" onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")}><CheckSquare size={18} /></ToolBtn>
            <ToolBtn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote size={18} /></ToolBtn>
            <ToolBtn title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code size={18} /></ToolBtn>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}><AlignLeft size={18} /></ToolBtn>
            <ToolBtn title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}><AlignCenter size={18} /></ToolBtn>
            <ToolBtn title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}><AlignRight size={18} /></ToolBtn>
            <ToolBtn title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })}><AlignJustify size={18} /></ToolBtn>
          </div>

          {/* Links & Media */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Set Link" onClick={setLink} active={editor.isActive('link')}><LinkIcon size={18} /></ToolBtn>
            <ToolBtn title="Unlink" onClick={() => editor.chain().focus().unsetLink().run()} active={false}><Unlink size={18} /></ToolBtn>
            
            <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={addImage} />
            <ToolBtn title="Insert Image" onClick={() => imageInputRef.current.click()} active={false}><ImageIcon size={18} /></ToolBtn>

            <input type="file" accept="video/*" hidden ref={videoInputRef} onChange={addVideo} />
            <ToolBtn title="Insert Video" onClick={() => videoInputRef.current.click()} active={false}><Video size={18} /></ToolBtn>

            <ToolBtn title="Insert YouTube" onClick={addYoutube} active={false}><Tv size={18} /></ToolBtn>
          </div>

          {/* Tables */}
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2">
            <ToolBtn title="Insert Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} active={editor.isActive('table')}><TableIcon size={18} /></ToolBtn>
            <ToolBtn title="Add Column" onClick={() => editor.chain().focus().addColumnAfter().run()} active={false}><Columns size={18} /></ToolBtn>
            <ToolBtn title="Add Row" onClick={() => editor.chain().focus().addRowAfter().run()} active={false}><Rows size={18} /></ToolBtn>
            <ToolBtn title="Delete Table" onClick={() => editor.chain().focus().deleteTable().run()} active={false}><Trash2 size={18} className="text-red-400 hover:text-red-600" /></ToolBtn>
          </div>

          {/* ACTION BUTTONS */}
          <div className="ml-auto flex gap-3 pl-2">
            <button
              onClick={() => handlePreview()}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl shadow-sm transition-all border border-slate-200 dark:border-white/10"
            >
              <Eye size={18} /> Preview
            </button>
            <button
              onClick={() => handleSave(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-850 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Save size={18} /> Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5 transition-all"
            >
              <Send size={18} /> Publish
            </button>
          </div>
        </div>

        {/* EDITOR CANVAS */}
        <div className="p-8 md:p-12 bg-white dark:bg-slate-900 min-h-[500px]">
          <EditorContent editor={editor} className="prose dark:prose-invert prose-lg prose-orange max-w-none focus:outline-none" />
        </div>
        
        {/* FOOTER METADATA */}
        <div className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10 p-3 text-xs text-slate-500 dark:text-slate-400 flex justify-between font-medium">
          <span>Characters: {editor.storage.characterCount.characters()}</span>
          <span>Words: {editor.storage.characterCount.words()}</span>
        </div>

      </div>

      {/* MODAL PREVIEW */}
      {preview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Eye className="text-orange-500"/> Live Preview</h2>
              <button
                onClick={() => setPreview("")}
                className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-full transition-all"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-white dark:bg-slate-900 flex-grow">
               <h1 className="text-4xl font-extrabold mb-6 text-slate-900 dark:text-white">{title}</h1>
               <div
                  className="prose dark:prose-invert prose-lg prose-orange max-w-none"
                  dangerouslySetInnerHTML={{ __html: preview }}
               />
            </div>
          </div>
        </div>
      )}

      {/* INJECTED STYLES FOR EDITOR CONTENT */}
      <style>{`
        .ProseMirror {
          min-height: 400px;
          outline: none;
        }
        
        /* Table Styles Fixes */
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        
        .ProseMirror td,
        .ProseMirror th {
          min-width: 1em;
          border: 1px solid #e5e7eb;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f9fafb;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        /* Checkbox list styles */
        ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }

        ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
        }

        ul[data-type="taskList"] li > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }
        
        ul[data-type="taskList"] li > div {
          flex: 1 1 auto;
        }

        .news-image {
          position: relative;
          display: inline-block;
          margin: 1rem 0;
        }
        
        .news-image img {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        .news-image[data-align="left"] { float: left; margin-right: 1.5rem; margin-bottom: 1rem; }
        .news-image[data-align="right"] { float: right; margin-left: 1.5rem; margin-bottom: 1rem; }
        .news-image[data-align="center"] { display: block; margin: 1.5rem auto; text-align: center; }

        .news-caption {
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
          margin-top: 0.5rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
