import Input from "./input"

const baseStyle = {
	...Input.baseStyle.field,
	paddingY: "8px",
	minHeight: "80px",
	lineHeight: "short",
	verticalAlign: "top",
}

const variants = {
	outline: (props) => Input.variants.outline(props).field ?? {},
	flushed: (props) => Input.variants.flushed(props).field ?? {},
	filled: (props) => Input.variants.filled(props).field ?? {},
	unstyled: Input.variants.unstyled.field ?? {},
	carbon: Input.variants.carbon.field ?? {},
}

const sizes = {
	xs: Input.sizes.xs.field ?? {},
	sm: Input.sizes.sm.field ?? {},
	md: Input.sizes.md.field ?? {},
	lg: Input.sizes.lg.field ?? {},
}

const defaultProps = {
	size: "md",
	variant: "outline",
}

const Textarea = {
	baseStyle,
	sizes,
	variants,
	defaultProps,
}
export default Textarea
