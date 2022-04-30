import { useCallback, useRef } from "react"

export function useDoubleTap(callback, threshold = 300, options = {}) {
	const timer = useRef(null)

	const handler = useCallback(
		(event) => {
			if (!timer.current) {
				timer.current = setTimeout(() => {
					if (options.onSingleTap) {
						options.onSingleTap(event)
					}
					timer.current = null
				}, threshold)
			} else {
				clearTimeout(timer.current)
				timer.current = null
				callback && callback(event)
			}
		},
		[callback, threshold, options]
	)

	return callback
		? {
				onClick: handler,
		  }
		: {}
}
