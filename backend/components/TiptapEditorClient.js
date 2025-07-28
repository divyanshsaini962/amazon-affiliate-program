import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

export default function TiptapEditorClient({ value, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure value is always a string
  const safeValue = typeof value === 'string' ? value : '';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
      Color,
      Highlight,
      Link,
    ],
    content: safeValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(typeof html === 'string' ? html : '');
    },
    editorProps: {
      attributes: {
        class: 'tiptap',
        style:
          'min-height: 600px; width: 100%; outline: none; font-size: 2rem; font-family: \'Inter\', \'Segoe UI\', \'Roboto\', \'Arial\', sans-serif; background: #fff; border-radius: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 28px 32px; border: 1px solid #e0e0e0; margin-top: 8px;',
      },
    },
    immediatelyRender: false,
    transformPastedHTML: (html) => {
      // Remove all inline styles and classes from pasted HTML
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const cleanNode = (node) => {
        if (node.nodeType === 1) { // Element
          node.removeAttribute('style');
          node.removeAttribute('class');
          for (let i = 0; i < node.childNodes.length; i++) {
            cleanNode(node.childNodes[i]);
          }
        }
      };
      Array.from(doc.body.childNodes).forEach(cleanNode);
      return doc.body.innerHTML;
    },
  });

  if (!mounted || !editor) return null;

  // Toolbar handler for image upload
  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Toolbar handler for Buy on Amazon button
  const addBuyOnAmazon = () => {
    const url = window.prompt('Enter Amazon product URL');
    if (url) {
      editor.chain().focus().insertContent(
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="amazon-buy-btn">Buy on Amazon</a>`
      ).run();
    }
  };

  // Enhanced toolbar button style
  const buttonStyle = {
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    padding: '8px',
    margin: '0 2px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background 0.2s, box-shadow 0.2s',
    color: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    minWidth: '36px',
    minHeight: '36px',
  };
  const buttonActive = {
    background: '#e3e8ff',
    color: '#2a3cff',
    boxShadow: '0 1px 4px rgba(42,60,255,0.08)',
  };
  const buttonHover = {
    background: '#f4f6fb',
  };

  // Helper to check if a mark is active
  const isActive = (fn) => (fn ? fn() : false);

  // Toolbar icons (SVG for crisp look)
  const icons = {
    bold: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 4h4a3 3 0 0 1 0 6H7zm0 6h5a3 3 0 0 1 0 6H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    italic: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 4h4M6 16h4m2-12-6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    underline: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 4v5a4 4 0 0 0 8 0V4M5 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    paragraph: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><text x="4" y="16" fontSize="16" fill="currentColor">¶</text></svg>,
    h1: <span style={{ fontWeight: 700, fontSize: '1.1em' }}>H1</span>,
    h2: <span style={{ fontWeight: 700, fontSize: '1.05em' }}>H2</span>,
    h3: <span style={{ fontWeight: 700 }}>H3</span>,
    bullet: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="6" cy="10" r="1.5" fill="currentColor" /><rect x="9" y="9" width="7" height="2" rx="1" fill="currentColor" /></svg>,
    ordered: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><text x="3" y="13" fontSize="10" fill="currentColor">1.</text><rect x="9" y="9" width="7" height="2" rx="1" fill="currentColor" /></svg>,
    image: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="7" cy="9" r="1.5" fill="currentColor" /><path d="M17 15 13 11l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    undo: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 10h8a4 4 0 1 1 0 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 10V6m0 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    redo: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M16 10H8a4 4 0 1 0 0 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 10V6m0 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    buy: <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><text x="6" y="14" fontSize="8" fill="currentColor">Buy</text></svg>,
    delete: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect x="5" y="9" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 11v3M12 11v3M7 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 6h14" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  };

  // Button rendering helper
  const renderButton = (icon, onClick, isActiveBtn, isDisabled, title) => (
    <button
      style={{
        ...buttonStyle,
        ...(isActiveBtn ? buttonActive : {}),
      }}
      onClick={onClick}
      disabled={isDisabled}
      title={title}
      onMouseOver={e => (e.currentTarget.style.background = '#f4f6fb')}
      onMouseOut={e => (e.currentTarget.style.background = isActiveBtn ? '#e3e8ff' : 'none')}
    >
      {icon}
    </button>
  );

  return (
    <div style={{ width: '100%', margin: '32px auto', background: '#fff', borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', padding: '32px 24px' }}>
      {/* Toolbar */}
      <div style={{
        marginBottom: 16,
        display: 'flex',
        gap: 4,
        flexWrap: 'nowrap',
        overflowX: 'auto',
        background: '#f7f8fa',
        borderRadius: 12,
        padding: '10px 14px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        border: '1px solid #e0e0e0',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '48px',
      }}>
        {renderButton(icons.bold, () => editor.chain().focus().toggleBold().run(), isActive(() => editor.isActive('bold')), !editor.can().chain().focus().toggleBold().run(), 'Bold')}
        {renderButton(icons.italic, () => editor.chain().focus().toggleItalic().run(), isActive(() => editor.isActive('italic')), !editor.can().chain().focus().toggleItalic().run(), 'Italic')}
        {renderButton(icons.underline, () => editor.chain().focus().toggleUnderline().run(), isActive(() => editor.isActive('underline')), !editor.can().chain().focus().toggleUnderline().run(), 'Underline')}
        {renderButton(icons.paragraph, () => editor.chain().focus().setParagraph().run(), isActive(() => editor.isActive('paragraph')), false, 'Paragraph')}
        {renderButton(icons.h1, () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive(() => editor.isActive('heading', { level: 1 })), false, 'Heading 1')}
        {renderButton(icons.h2, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive(() => editor.isActive('heading', { level: 2 })), false, 'Heading 2')}
        {renderButton(icons.h3, () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive(() => editor.isActive('heading', { level: 3 })), false, 'Heading 3')}
        {renderButton(icons.bullet, () => editor.chain().focus().toggleBulletList().run(), isActive(() => editor.isActive('bulletList')), false, 'Bullet List')}
        {renderButton(icons.ordered, () => editor.chain().focus().toggleOrderedList().run(), isActive(() => editor.isActive('orderedList')), false, 'Ordered List')}
        {renderButton(icons.image, addImage, false, false, 'Insert Image')}
        {renderButton(icons.buy, addBuyOnAmazon, false, false, 'Buy on Amazon')}
        {renderButton(icons.delete, () => editor.chain().focus().deleteSelection().run(), false, false, 'Delete selection')}
        {renderButton(icons.undo, () => editor.chain().focus().undo().run(), false, !editor.can().chain().focus().undo().run(), 'Undo')}
        {renderButton(icons.redo, () => editor.chain().focus().redo().run(), false, !editor.can().chain().focus().redo().run(), 'Redo')}
      </div>
      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 