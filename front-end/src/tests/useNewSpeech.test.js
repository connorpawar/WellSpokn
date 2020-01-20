import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks'
import { useNewSpeech } from '../CustomHooks/useNewSpeech';

describe("handleClickOpen", () => {
	it("sets open to true", () => {
		const { result } = renderHook(useNewSpeech)

		act(() => {
			result.current.handleClickOpen()
		})

		expect(result.current.open).toBeTruthy();
	})
})

describe("handleClose", () => {
	it("sets open to false", () => {
		const { result } = renderHook(useNewSpeech)

		act(() => {
			result.current.handleClose("test value")
		})

		expect(result.current.open).toBeFalsy();
	})

	it("sets value correctly", () => {
		const { result } = renderHook(useNewSpeech)

		act(() => {
			result.current.handleClose("test value")
		})

		expect(result.current.selectedValue).toBe("test value");
	})
})
