import "./styles.css"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"

/**
 * Controlled Input. Use with Controller
 */
export const TipTapEditor = ({ value, onChange = (newValue) => {} }) => {
	const editor = useEditor({
		extensions: [Image, StarterKit, Placeholder.configure({ placeholder: "Annotation..." })],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getJSON())
		},
	})

	if (!editor) {
		return null
	}

	return <EditorContent editor={editor} />
}

export const TipTapRenderer = ({ content }) => {
	const editor = useEditor({
		extensions: [Image, StarterKit],
		editable: false,
		content,
	})

	if (!editor) {
		return null
	}

	return <EditorContent editor={editor} />
}
