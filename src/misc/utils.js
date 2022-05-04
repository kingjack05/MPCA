import { DateTime } from "luxon"

export const readableTimeString = (ISOString) => {
	const inputDt = DateTime.fromISO(ISOString)
	const now = DateTime.now()

	if (inputDt.year === now.year) {
		return inputDt.toFormat("LL'/'dd HH':'mm")
	} else if (inputDt.year !== now.year) {
		return inputDt.toFormat("yyyy LL'/'dd HH':'mm")
	}
}
