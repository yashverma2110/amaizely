'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { faBold, faCode, faItalic, faList, faUnderline, faListNumeric, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

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

const COLORS = [
  { name: 'Default', color: '#FFFFFF' },
  { name: 'Purple', color: '#A855F7' },
  { name: 'Blue', color: '#3B82F6' },
  { name: 'Green', color: '#22C55E' },
  { name: 'Yellow', color: '#EAB308' },
  { name: 'Red', color: '#EF4444' },
  { name: 'Pink', color: '#EC4899' },
]

const RichTextEditor = ({ value, placeholder, size = "md", message, limit, onUpdate, disableCode = false, disableLists = false }: IRichTextEditorProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const colorButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function updatePosition() {
      if (showColorPicker && colorButtonRef.current) {
        const rect = colorButtonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left
        })
      }
    }

    if (showColorPicker) {
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [showColorPicker])

  useEffect(() => {
    if (showColorPicker && colorButtonRef.current) {
      const rect = colorButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
    }
  }, [showColorPicker])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorButtonRef.current && !colorButtonRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    if (showColorPicker) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showColorPicker])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Placeholder.configure({ 
        placeholder,
        emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-gray-400 before:h-0 before:float-left before:pointer-events-none' 
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    immediatelyRender: false,
    content: value,
    editorProps: { 
      attributes: { 
        class: 'prose prose-invert max-w-none focus:outline-none p-3 min-h-[inherit] text-sm md:text-base' 
      } 
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    }
  })

  function getHeight() {
    switch (size) {
      case "sm":
        return "min-h-[100px]"
      case "md":
        return "min-h-[200px]"
      default:
        return "min-h-[400px]"
    }
  }

  const toolbarButtons = [
    { icon: faBold, onClick: toggleBold, isActive: editor?.isActive('bold'), hide: false, label: 'Bold' },
    { icon: faItalic, onClick: toggleItalic, isActive: editor?.isActive('italic'), hide: false, label: 'Italic' },
    { icon: faUnderline, onClick: toggleUnderline, isActive: editor?.isActive('underline'), hide: false, label: 'Underline' },
    { icon: faCode, onClick: toggleCode, isActive: editor?.isActive('code'), hide: disableCode, label: 'Code' },
    { icon: faListNumeric, onClick: toggleOrderedList, isActive: editor?.isActive('orderedList'), hide: disableLists, label: 'Numbered List' },
    { icon: faList, onClick: toggleBulletList, isActive: editor?.isActive('bulletList'), hide: disableLists, label: 'Bullet List' }
  ]

  function isCharacterLimitAlmostReached() {
    if (!limit) return false;
    return editor?.storage.characterCount.characters() > limit - 30;
  }

  function getBorderRadius() {
    if (isCharacterLimitAlmostReached()) {
      return "rounded-t-xl"
    };
    return "rounded-xl";
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

  function setColor(color: string) {
    if (color === '#FFFFFF') {
      editor?.chain().focus().unsetColor().run()
    } else {
      editor?.chain().focus().setColor(color).run()
    }
    setShowColorPicker(false)
  }

  function getCurrentColor() {
    return editor?.getAttributes('textStyle').color || '#FFFFFF'
  }

  function toggleColorPicker(event: React.MouseEvent) {
    event.stopPropagation()
    setShowColorPicker(!showColorPicker)
  }

  const ColorDropdown = () => {
    if (!showColorPicker) return null

    return createPortal(
      <div 
        className="fixed p-2 bg-slate-800/95 rounded-lg border border-white/10 shadow-xl backdrop-blur-xl z-[60] min-w-[160px] animate-in fade-in slide-in-from-top-1"
        style={{ 
          top: `${dropdownPosition.top}px`, 
          left: `${dropdownPosition.left}px`,
          maxWidth: '200px',
          transform: 'translateZ(0)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 gap-1">
          {COLORS.map((color) => (
            <button
              key={color.color}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                getCurrentColor() === color.color ? 'bg-white/10' : ''
              }`}
              onClick={() => setColor(color.color)}
            >
              <div 
                className="w-4 h-4 rounded-full border border-white/20" 
                style={{ backgroundColor: color.color }}
              />
              <span className="text-sm text-white">{color.name}</span>
            </button>
          ))}
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className="flex flex-col">
      <div className={`w-full flex flex-col relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-white/10 ${getBorderRadius()} transition-all duration-300 group hover:border-purple-500/30 focus-within:border-purple-500/50 ${getHeight()}`}>
        {/* Toolbar */}
        <div className="font-toolbar sticky top-0 z-10 border-b border-white/5 flex items-center gap-1 bg-white/5 px-1 backdrop-blur-xl">
          {toolbarButtons.map((button, index) => !button.hide && (
            <button
              key={index}
              className={`group/btn relative flex items-center justify-center p-2 rounded-lg m-1 transition-all duration-200 hover:bg-white/10 ${
                button.isActive ? 'bg-white/10 text-purple-400' : 'text-gray-300 hover:text-white'
              }`}
              onClick={button.onClick}
              title={button.label}
            >
              <FontAwesomeIcon icon={button.icon} className="h-4 w-4" />
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {button.label}
              </span>
            </button>
          ))}

          {/* Color Picker Button */}
          <button
            ref={colorButtonRef}
            className={`group/btn relative flex items-center justify-center p-2 rounded-lg m-1 transition-all duration-200 hover:bg-white/10 ${
              showColorPicker ? 'bg-white/10 text-purple-400' : 'text-gray-300 hover:text-white'
            }`}
            onClick={toggleColorPicker}
            title="Text Color"
          >
            <FontAwesomeIcon icon={faPalette} className="h-4 w-4" />
            <div 
              className="w-2 h-2 rounded-full absolute bottom-1 right-1" 
              style={{ backgroundColor: getCurrentColor() }}
            />
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Text Color
            </span>
          </button>
        </div>

        {/* Editor Content */}
        <div className="flex-1 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
          <EditorContent editor={editor} />
        </div>

        {/* Character Count */}
        {limit && (
          <div className="absolute bottom-1 right-2 text-xs text-gray-400">
            {editor?.storage.characterCount.characters()}/{limit}
          </div>
        )}
      </div>

      {/* Error Message */}
      <div className="flex items-center justify-between text-xs px-1 h-6 mt-1">
        {message && <span className="text-red-400">{message}</span>}
        {isCharacterLimitAlmostReached() && !message && (
          <span className="text-amber-400">{(limit ?? 0) - (editor?.storage.characterCount.characters() ?? 0)} characters left</span>
        )}
      </div>

      {/* Color Dropdown Portal */}
      <ColorDropdown />
    </div>
  )
}

export default RichTextEditor
