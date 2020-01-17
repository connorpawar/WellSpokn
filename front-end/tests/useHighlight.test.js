import { useHighlight } from './src/CustomHooks/useHighlight'
import { act, renderHook } from '@testing-library/react-hooks'

describe("onDragOver", () => {
	it("sets highlight to true", () => {
		const { result } = renderHook(useHighlight)

		act(() => {
			result.current.onDragOver(event)
		})

		expect(result.current.highlight).toBe(true);
	})
})