import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"
import StartView from "../../views/StartView.vue"

describe("StartView", () => {
  	function createMockStore(lang) { // funckja do mockowania store 
    	return createTestingPinia({
      		initialState: {
        		store: { language: lang },
      		},
      		createSpy: vi.fn
    	})
	}

  	it('displays English text when language is "en"', () => {
		const pinia = createMockStore('en')
    	const wrapper = mount(StartView, {
			global: {
				plugins: [pinia],
			},
    	})

		expect(wrapper.text()).toContain(
			"Application for performing video quality assessment"
		)
  	})

  	it('displays Polish text when language is "pl"', () => {
		const pinia = createMockStore('pl')
    	const wrapper = mount(StartView, {
			global: {
				plugins: [pinia],
			},
    	})

		expect(wrapper.text()).toContain(
			"Aplikacja do przeprowadzania badań jakości wideo"
		)
	})
})
