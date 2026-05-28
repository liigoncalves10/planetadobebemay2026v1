import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'
import BenefitStrip from '../BenefitStrip'

describe('BenefitStrip Component', () => {
  it('should start in loading state and transition to ready after images load', () => {
    const { container, getAllByRole } = render(<BenefitStrip />)
    const section = container.querySelector('section')

    // Should have loading class initially
    expect(section?.className).toContain('benefits-strip--loading')

    // Simulate all images loading
    const images = getAllByRole('img')
    act(() => {
      images.forEach((img) => {
        fireEvent.load(img)
      })
    })

    // Should now have ready class
    expect(section?.className).toContain('benefits-strip--ready')
  })

  it('should have inline styles for loading state', () => {
    const { container } = render(<BenefitStrip />)
    const section = container.querySelector('section')

    expect(section?.style.visibility).toBe('hidden')
    expect(section?.style.minHeight).toBe('120px')
    expect(section?.style.backgroundColor).toBe('transparent')
  })

  it('should render all benefit titles after loading', () => {
    const { getByText, getAllByRole } = render(<BenefitStrip />)

    // Trigger load
    const images = getAllByRole('img')
    act(() => {
      images.forEach((img) => fireEvent.load(img))
    })

    expect(getByText('Compra 100% Segura')).toBeDefined()
    expect(getByText('Entrega Rápida')).toBeDefined()
    expect(getByText('50% de Desconto no Frete')).toBeDefined()
    expect(getByText('5% de Desconto no Pix')).toBeDefined()
    expect(getByText('Garantia de Fábrica')).toBeDefined()
  })

  it('should have eager loading and correct dimensions on images', () => {
    const { getAllByRole } = render(<BenefitStrip />)
    const images = getAllByRole('img')
    images.forEach((img) => {
      expect(img.getAttribute('loading')).toBe('eager')
      expect(img.getAttribute('width')).toBe('32')
      expect(img.getAttribute('height')).toBe('32')
    })
  })
})
