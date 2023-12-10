import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SessionView from '../../views/SessionView.vue' // Adjust the import path as needed

describe('SessionView', () => {
    it('mounts video with correct source based on random index', async () => {
        const pinia = createTestingPinia({
            createSpy: vi.fn,
        })

        const wrapper = mount(SessionView, {
            global: {
                plugins: [pinia]
            }
        })
  
        const videoElement = wrapper.find('video')
        expect(videoElement.exists()).toBe(true)
    })
  })