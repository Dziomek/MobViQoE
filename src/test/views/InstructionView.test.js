import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import InstructionView from '../../views/InstructionView.vue'
import MenuComponent from '../../components/MenuComponent.vue'
import { routes } from '../../router'

vi.mock('../../routeUtils', async () => {
    const actual = await vi.importActual('../../routeUtils')
    return {
      ...actual,
      syncLanguage: vi.fn(),
      syncSessionId: vi.fn()
    }
  })
  
  vi.mock('../../cookiesUtils', async () => {
    const actual = await vi.importActual('../../cookiesUtils')
    return {
      ...actual,
      setCookieBeforeInstruction: vi.fn()
    }
  })

describe('InstructionView', () => {
  it('navigates to survey on button click', async () => {
    global.sessionStorage = createMockSessionStorage()
    
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    
    router.push = vi.fn()
    
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })

    const wrapper = mount(InstructionView, {
      global: {
        plugins: [router, pinia],
        components: { MenuComponent }
      }
    })

    await wrapper.find('button').trigger('click')

    expect(router.push).toHaveBeenCalledWith({ name: 'survey' })
  })
})

function createMockSessionStorage() {
  const storage = {}
  return {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => { storage[key] = value.toString() },
    removeItem: (key) => { delete storage[key] },
    clear: () => { Object.keys(storage).forEach(key => delete storage[key]) },
  }
}