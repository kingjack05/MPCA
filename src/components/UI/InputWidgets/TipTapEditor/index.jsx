import "./styles.scss"

import {
	ListBoxes,
	ListBulleted,
	ListNumbered,
	Redo,
	TextBold,
	TextClearFormat,
	TextHighlight,
	TextItalic,
	TextStrikethrough,
	TextWrap,
	Undo,
} from "@carbon/icons-react"
import { Box, Flex } from "@chakra-ui/react"
import { Fragment } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"

/**
 * Controlled Input. Use with Controller
 */
export const TipTapEditor = ({ value, placeholder = "", onChange = (newValue) => {} }) => {
	const editor = useEditor({
		extensions: [
			Image,
			StarterKit,
			Highlight,
			TaskItem,
			TaskList,
			Placeholder.configure({ placeholder }),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getJSON())
		},
	})

	if (!editor) {
		return null
	}

	return (
		<>
			{editor && <MenuBar editor={editor} />}
			<EditorContent editor={editor} />
		</>
	)
}

export const TipTapRenderer = ({ content }) => {
	const editor = useEditor({
		extensions: [Image, StarterKit, Highlight, TaskItem, TaskList],
		editable: false,
		content,
	})

	if (!editor) {
		return null
	}

	return (
		<>
			<EditorContent editor={editor} />
		</>
	)
}

const MenuBar = ({ editor }) => {
	const MenuIconSize = 24
	const items = [
		{
			icon: <Undo size={MenuIconSize} />,
			title: "Undo",
			action: () => editor.chain().focus().undo().run(),
		},
		{
			icon: <Redo size={MenuIconSize} />,
			title: "Redo",
			action: () => editor.chain().focus().redo().run(),
		},
		{
			type: "divider",
		},
		{
			icon: <TextBold size={MenuIconSize} />,
			title: "Bold",
			action: () => editor.chain().focus().toggleBold().run(),
			isActive: () => editor.isActive("bold"),
		},
		{
			icon: <TextItalic size={MenuIconSize} />,
			title: "Italic",
			action: () => editor.chain().focus().toggleItalic().run(),
			isActive: () => editor.isActive("italic"),
		},
		{
			icon: <TextStrikethrough size={MenuIconSize} />,
			title: "Strike",
			action: () => editor.chain().focus().toggleStrike().run(),
			isActive: () => editor.isActive("strike"),
		},
		{
			icon: <TextHighlight size={MenuIconSize} />,
			title: "Highlight",
			action: () => editor.chain().focus().toggleHighlight().run(),
			isActive: () => editor.isActive("highlight"),
		},
		{
			type: "divider",
		},
		{
			icon: <ListBulleted size={MenuIconSize} />,
			title: "Bullet List",
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: () => editor.isActive("bulletList"),
		},
		{
			icon: <ListNumbered size={MenuIconSize} />,
			title: "Ordered List",
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: () => editor.isActive("orderedList"),
		},
		{
			icon: <ListBoxes size={MenuIconSize} />,
			title: "Task List",
			action: () => editor.chain().focus().toggleTaskList().run(),
			isActive: () => editor.isActive("taskList"),
		},
		{
			type: "divider",
		},
		{
			icon: <TextWrap size={MenuIconSize} />,
			title: "Hard Break",
			action: () => editor.chain().focus().setHardBreak().run(),
		},
		{
			icon: <TextClearFormat size={MenuIconSize} />,
			title: "Clear Format",
			action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
		},
	]

	return (
		<Flex alignItems="center" borderBottom="2px solid #0d0d0d">
			{items.map((item, index) => (
				<Fragment key={index}>
					{item.type === "divider" ? (
						<Box bg="gray.300" w="2px" h="1.25rem" ml="0.5rem" mr="0.75rem" />
					) : (
						<MenuItem {...item} />
					)}
				</Fragment>
			))}
		</Flex>
	)
}

const MenuItem = ({ icon, title, action, isActive = null }) => {
	const activeStyles = { backgroundColor: "#0d0d0d", color: "#fff" }
	const activeStylesPropGetter = (isActive) => {
		if (isActive && isActive()) {
			return activeStyles
		}
	}
	return (
		<Box
			onClick={action}
			title={title}
			bg="transparent"
			h="1.75rem"
			w="1.75rem"
			p="2px"
			mr="0.25rem"
			borderRadius="0.4rem"
			{...activeStylesPropGetter(isActive)}
			_hover={activeStyles}
		>
			{icon}
		</Box>
	)
}
