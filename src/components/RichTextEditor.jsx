import { EditorContent, findParentNode, posToDOMRect, useEditor, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'

export default function RichTextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
      <ul>
        <li>Select any item to display a global menu</li>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    `,
    })

    const [showMenu, setShowMenu] = React.useState(true)
    const [isEditable, setIsEditable] = React.useState(true)

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable)
        }
    }, [isEditable, editor])

    useEditorState({
        editor,
        selector: ctx => ({
            isBold: ctx.editor.isActive('bold'),
            isItalic: ctx.editor.isActive('italic'),
            isStrikethrough: ctx.editor.isActive('strike'),
        }),
    })



    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setShowMenu(old => !old)
                    editor.commands.focus()
                }}
            >
                Toggle menu
            </button>
            <div className="control-group">
                <label>
                    <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
                    Editable
                </label>
            </div>

            {editor && showMenu && (
                <>
                    <BubbleMenu editor={editor} options={{ placement: 'bottom', offset: 8, flip: true }}>
                        <div className="bubble-menu">
                            {/* TEXT */}
                            <button onClick={() => editor.chain().focus().toggleBold().run()}>
                                Bold
                            </button>

                            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                                Italic
                            </button>

                            <button onClick={() => editor.chain().focus().toggleStrike().run()}>
                                Strike
                            </button>

                            {/* HEADINGS */}
                            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                                H1
                            </button>

                            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                                H2
                            </button>

                            {/* LISTS */}
                            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                                • List
                            </button>

                            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                                1. List
                            </button>

                            {/* BLOCK */}
                            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                                ❝
                            </button>

                            <button onClick={() => editor.chain().focus().toggleCode().run()}>
                                {'</>'}
                            </button>

                            {/* ALIGN */}
                            <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                                ⬅
                            </button>

                            <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                                ⬆
                            </button>

                            <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                                ➡
                            </button>

                            {/* LINK 
                            <button onClick={setLink}>
                                🔗
                            </button>

                            <button onClick={() => editor.chain().focus().unsetLink().run()}>
                                ❌🔗
                            </button>
                            */}

                            {/* CLEAR */}
                            <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
                                Clear
                            </button>
                        </div>
                    </BubbleMenu>

                    <BubbleMenu
                        editor={editor}
                        shouldShow={() => editor.isActive('bulletList') || editor.isActive('orderedList')}
                        getReferencedVirtualElement={() => {
                            const parentNode = findParentNode(
                                node => node.type.name === 'bulletList' || node.type.name === 'orderedList',
                            )(editor.state.selection)
                            if (parentNode) {
                                const domRect = posToDOMRect(editor.view, parentNode.start, parentNode.start + parentNode.node.nodeSize)
                                return {
                                    getBoundingClientRect: () => domRect,
                                    getClientRects: () => [domRect],
                                }
                            }
                            return null
                        }}
                        options={{ placement: 'top-start', offset: 8 }}
                    >
                        <div className="bubble-menu">
                            <button
                                onClick={() => {
                                    const chain = editor.chain().focus()
                                    if (editor.isActive('bulletList')) {
                                        chain.toggleOrderedList()
                                    } else {
                                        chain.toggleBulletList()
                                    }
                                    chain.run()
                                }}
                                type="button"
                            >
                                Toggle list type
                            </button>
                        </div>
                    </BubbleMenu>
                </>
            )}
            <EditorContent editor={editor} />
        </>
    )
}
