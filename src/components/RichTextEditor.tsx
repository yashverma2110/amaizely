'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import { faBold, faCode, faItalic, faList, faUnderline, faListNumeric } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IRichTextEditorProps {
  value?: string,
  placeholder?: string,
  size?: "sm" | "md" | "lg",
  message?: string,
  limit?: number,
  onUpdate: (value: string) => void,
  disableCode?: boolean,
  disableLists?: boolean
}

const RichTextEditor = ({ value, placeholder, size = "md", message, limit, onUpdate, disableCode = false, disableLists = false }: IRichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({
        limit,
      }),
    ],
    immediatelyRender: false,
    content: value,
    editorProps: { attributes: { class: 'focus:outline-none p-2 text-sm md:text-base' } },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    }
  })

  function getHeight() {
    switch (size) {
      case "sm":
        return "h-24 max-h-24"
      case "md":
        return "h-48 max-h-48"
      default:
        return "h-96 max-h-96"
    }
  }

  const toolbarButtons = [
    { icon: faBold, onClick: toggleBold, isActive: editor?.isActive('bold'), hide: false },
    { icon: faItalic, onClick: toggleItalic, isActive: editor?.isActive('italic'), hide: false },
    { icon: faUnderline, onClick: toggleUnderline, isActive: editor?.isActive('underline'), hide: false },
    { icon: faCode, onClick: toggleCode, isActive: editor?.isActive('code'), hide: disableCode },
    { icon: faListNumeric, onClick: toggleOrderedList, isActive: editor?.isActive('orderedList'), hide: disableLists },
    { icon: faList, onClick: toggleBulletList, isActive: editor?.isActive('bulletList'), hide: disableLists }
  ]

  function isCharacterLimitAlmostReached() {
    if (!limit) return false;

    return editor?.storage.characterCount.characters() > limit - 30;
  }

  function getBorderRadius() {
    if (isCharacterLimitAlmostReached()) {
      return "rounded-t-lg"
    };

    return "rounded-lg";
  }

  function toggleBold() {
    editor?.chain().focus().toggleBold().run()
  }

  function toggleItalic() {
    editor?.chain().focus().toggleItalic().run()
  }

  function toggleUnderline() {
    editor?.chain().focus().toggleUnderline().run()
  }

  function toggleCode() {
    editor?.chain().focus().toggleCode().run()
  }

  function toggleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run()
  }

  function toggleBulletList() {
    editor?.chain().focus().toggleBulletList().run()
  }

  return (
    <div className="flex flex-col">
      <div className={`w-full flex flex-col relative overflow-hidden border border-neutral-300 ${getBorderRadius()} ${getHeight()}`}>
        <div className="font-toolbar sticky top-0 z-10 border-b border-neutral-300 flex items-center gap-1 bg-white">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              className={`btn btn-square btn-sm btn-ghost md:btn-md rounded-none ${button.isActive ? 'btn-active' : ''} ${button.hide ? 'hidden' : ''}`}
              onClick={button.onClick}
            >
              <FontAwesomeIcon icon={button.icon} />
            </button>
          ))}
      </div>
        <section className="flex-1 shadow-inner overflow-y-auto">
        <EditorContent editor={editor} />
        </section>
      </div>
      <div className={`flex items-center justify-between text-xs px-1 h-4`}>
        <span className="text-error">{message}</span>
        {isCharacterLimitAlmostReached() && <span>{(limit ?? 0) - editor?.storage.characterCount.characters()} characters left</span>}
      </div>
    </div>
  )
}

export default RichTextEditor
