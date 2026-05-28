import React, { memo, useState, useCallback, useEffect } from 'react'
import './styles.css'
import cardIcon from './assets/cardIcon.svg'
import deliveryIcon from './assets/deliveryIcon.svg'
import guaranteeIcon from './assets/guaranteeIcon.svg'
import safeIcon from './assets/safeIcon.svg'
import speedIcon from './assets/speedIcon.svg'

const benefits = [
  {
    icon: cardIcon,
    title: 'Compra 100% Segura',
    subtitle: 'Até 3x sem juros no cartão ou até 12x*',
  },
  {
    icon: speedIcon,
    title: 'Entrega Rápida',
    subtitle: 'Receba no mesmo dia SP Capital e Grande SP',
  },
  {
    icon: deliveryIcon,
    title: '50% de Desconto no Frete',
    subtitle: 'Para pedidos acima de R$ 299*',
  },
  {
    icon: safeIcon,
    title: '5% de Desconto no Pix',
    subtitle: 'Economize pagando no Pix',
  },
  {
    icon: guaranteeIcon,
    title: 'Garantia de Fábrica',
    subtitle: 'Qualidade assegurada',
  },
]

const BenefitStrip: React.FC = () => {
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before showing content (important for SSR)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Callback to track image loading
  const handleImageLoad = useCallback(() => {
    setLoadedImagesCount((prev) => prev + 1)
  }, [])

  // All images must be loaded and component mounted to avoid partial rendering and CLS
  const isReady = isMounted && loadedImagesCount === benefits.length

  // While not ready, we render the component with inline visibility: hidden.
  // This ensures it's invisible even if external CSS hasn't loaded yet,
  // preventing "broken" layouts while maintaining space to avoid CLS.
  return (
    <section
      className={`benefits-strip ${isReady ? 'benefits-strip--ready' : 'benefits-strip--loading'}`}
      style={{
        visibility: isReady ? 'visible' : 'hidden',
        minHeight: '120px',
        backgroundColor: isReady ? undefined : 'transparent',
      }}
    >
      <div className="benefits-container">
        {benefits.map((item, idx) => (
          <div key={idx} className="benefit-item">
            <img
              src={item.icon}
              alt={item.title}
              className="benefit-icon"
              width={32}
              height={32}
              onLoad={handleImageLoad}
              loading="eager" // Load icons immediately as they are critical for the component's "ready" state
            />
            <div className="benefit-text">
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="benefits-note">*Consulte condições</p>
    </section>
  )
}

/**
 * BenefitStrip component optimized for performance and initial load experience.
 * - Prevents CLS by reserving space while loading.
 * - Avoids partial rendering by waiting for all icons and mounting.
 * - Optimized with React.memo to prevent unnecessary re-renders.
 */
export default memo(BenefitStrip)
