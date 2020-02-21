import React from 'react';
import { useHighlight } from '../CustomHooks/useHighlight'
import { act, renderHook } from '@testing-library/react-hooks'
import { createEvent } from "@testing-library/react";

describe("onDragOver", () => {
	it("sets highlight to true", () => {
		const { result } = renderHook(useHighlight)

		act(() => {
			const node = document.createElement('input')
			const myEvent = createEvent.click(node, { button: 2 })
			result.current.onDragOver(myEvent)
		})

		expect(result.current.highlight).toBe(true);
	})
})

describe("onDragLeave", () => {
	it("sets highlight to false", () => {
		const { result } = renderHook(useHighlight)

		act(() => {
			result.current.onDragLeave()
		})

		expect(result.current.highlight).toBe(false);
	})
})