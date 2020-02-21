import React from 'react';
import { useFileDisplay } from '../CustomHooks/useFileDisplay'
import { act, renderHook } from '@testing-library/react-hooks'

describe("onFileAdded", () => {
	it("sets FileDisplay to true", () => {
		const { result } = renderHook(useFileDisplay)

		act(() => {
			let fileInput = document.createElement('input');
			fileInput.type = "file";
        	let file = fileInput.files[0];
			let event = { 
				target: { files: [ file ] }, 
				preventDefault: function () {} 
			}
			result.current.onFileAdded(event)
		})

		expect(result.current.fileDisplay).toBeTruthy();
	})
	it("sets File correctly", () => {
		const { result } = renderHook(useFileDisplay)

		act(() => {
			let fileInput = document.createElement('input');
			fileInput.type = "file";
        	let file = fileInput.files[0];
			let event = { 
				target: { files: [ file ] }, 
				preventDefault: function () {} 
			}
			result.current.onFileAdded(event)
		})

		expect(result.current.file).toBeDefined();
	})
})

describe("onDrop", () => {
	it("sets FileDisplay to true", () => {
		const { result } = renderHook(useFileDisplay)

		act(() => {
			let fileInput = document.createElement('input');
			fileInput.type = "file";
        	let file = fileInput.files[0];
			let event = { 
				dataTransfer: { files: [ file ] }, 
				preventDefault: function () {} 
			}
			result.current.onDrop(event)
		})

		expect(result.current.fileDisplay).toBeTruthy();
	})
	it("sets File correctly", () => {
		const { result } = renderHook(useFileDisplay)

		act(() => {
			let fileInput = document.createElement('input');
			fileInput.type = "file";
			let file = fileInput.files[0];
			let event = { 
				dataTransfer: { files: [ file ] }, 
				preventDefault: function () {} 
			}
			result.current.onDrop(event)
		})

		expect(result.current.file).toBeDefined();
	})
})