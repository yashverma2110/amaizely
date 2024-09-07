'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RichTextEditor = ({ value, placeholder, onUpdate }: { value?: string, placeholder?: string, onUpdate: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder.configure({ placeholder })],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    }
  })

  function toggleBold() {
    editor?.chain().focus().toggleBold().run()
  }

  function toggleItalic() {
    editor?.chain().focus().toggleItalic().run()
  }

  function toggleUnderline() {
    editor?.chain().focus().toggleUnderline().run()
  }

  return (
    <div className="h-full w-full shadow-inner rounded-lg">
      <div className="flex">
        <button className="p-2" onClick={toggleBold}><FontAwesomeIcon icon={faBold} /></button>
        <button className="p-2" onClick={toggleItalic}><FontAwesomeIcon icon={faItalic} /></button>
        <button className="p-2" onClick={toggleUnderline}><FontAwesomeIcon icon={faUnderline} /></button>
      </div>
      <div className="px-2 pb-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor
