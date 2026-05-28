import React, { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { useRuntime } from 'vtex.render-runtime'
import { Input, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import axios from 'axios'
import { formatPrice } from '../../helpers/index'
import '../../css/custom-pdp.css'

const CSS_HANDLES = [
  'shippingContainer',
  'shippingTitle',
  'shippingInputContainer',
  'shippingList',
  'shippingItem',
  'shippingItemName',
  'shippingItemDeliveryTime',
  'shippingItemPrice',
  'shippingItemFree',
  'shippingItemRadio',
  'shippingItemLabel',
] as const

interface SLA {
  id: string
  name: string
  price: number
  shippingEstimate: string
  deliveryChannel: string
}

const CustomShippingSimulator: React.FC = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const { culture } = useRuntime()
  const { orderForm, setOrderForm } = useOrderForm()
  const [zipCode, setZipCode] = useState('')
  const [shippingOptions, setShippingOptions] = useState<SLA[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSla, setSelectedSla] = useState<string | null>(null)

  const selectedSku = productContext?.selectedItem

  // Sync with orderForm on mount and changes
  React.useEffect(() => {
    const address = orderForm?.shippingData?.selectedAddresses?.[0]
    if (address?.postalCode && !zipCode) {
      setZipCode(address.postalCode.replace(/(\d{5})(\d)/, '$1-$2'))
    }

    const currentSla = orderForm?.shippingData?.logisticsInfo?.[0]?.selectedSla
    if (currentSla) {
      setSelectedSla(currentSla)
    }
  }, [orderForm])

  // Re-simulate on SKU change if zip exists
  React.useEffect(() => {
    if (selectedSku?.itemId && zipCode.length === 9) {
      simulateShipping()
    }
  }, [selectedSku?.itemId])

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2'))
  }

  const simulateShipping = async () => {
    const cleanZip = zipCode.replace('-', '')
    if (!selectedSku || cleanZip.length < 8) return

    setLoading(true)
    try {
      const response = await axios.post('/api/checkout/pub/orderForms/simulation', {
        items: [
          {
            id: selectedSku.itemId,
            quantity: 1,
            seller: selectedSku.sellers[0].sellerId,
          },
        ],
        postalCode: zipCode.replace('-', ''),
        country: culture.country,
      })

      const slas = response.data.logisticsInfo[0].slas as SLA[]

      const groupedSlas: { [key: string]: SLA } = {}

      slas.forEach((sla) => {
        const name = sla.name
        if (!groupedSlas[name] || sla.price < groupedSlas[name].price) {
          groupedSlas[name] = sla
        }
      })

      const options = Object.values(groupedSlas)

      const cheapest = [...options].sort((a, b) => a.price - b.price)[0]

      const fastest = [...options].sort(
        (a, b) =>
          parseInt(a.shippingEstimate) - parseInt(b.shippingEstimate)
      )[0]

      const bestOptions = [cheapest]

      if (fastest && fastest.id !== cheapest.id) {
        bestOptions.push(fastest)
      }

      setShippingOptions(bestOptions)

      // If we already have a selected address and SLA in the orderForm, we could sync it here
    } catch (error) {
      console.error('Error simulating shipping:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSlaSelect = async (sla: SLA) => {
    setSelectedSla(sla.id)

    try {
      if (typeof window !== 'undefined' && (window as any).vtexjs) {
        const { vtexjs } = window as any
        const address = orderForm?.shippingData?.selectedAddresses?.[0]

        if (address?.addressId) {
          await vtexjs.checkout.selectShippingSla(address.addressId, sla.id)
          // Update orderForm context
          const newOrderForm = await vtexjs.checkout.getOrderForm()
          setOrderForm(newOrderForm)
        } else {
          // If no address in orderForm, we might need to select SLA differently or wait
          await vtexjs.checkout.selectShippingSla(sla.id)
          const newOrderForm = await vtexjs.checkout.getOrderForm()
          setOrderForm(newOrderForm)
        }
      }
    } catch (err) {
      console.error('Error selecting SLA:', err)
    }
  }

  const formatDeliveryTime = (estimate: string) => {
    const amount = estimate.replace(/\D/g, '')
    const type = estimate.replace(/\d/g, '').toLowerCase()
    let typeText = ''

    switch (type) {
      case 'bd':
      case 'd':
        typeText = amount === '1' ? 'dia útil' : 'dias úteis'
        break
      case 'h':
        typeText = amount === '1' ? 'hora' : 'horas'
        break
      case 'm':
        typeText = amount === '1' ? 'minuto' : 'minutos'
        break
      default:
        typeText = amount === '1' ? 'dia' : 'dias'
    }

    return `Em até ${amount} ${typeText}`
  }

  return (
    <div className={handles.shippingContainer}>
      <div className={handles.shippingInputContainer}>
        <Input
          placeholder="00000-000"
          value={zipCode}
          onChange={handleZipCodeChange}
          maxLength={9}
        />
        <Button
          variation="primary"
          onClick={simulateShipping}
          isLoading={loading}
          disabled={zipCode.length < 9}
        >
          CALCULAR O FRETE
        </Button>
      </div>
      {shippingOptions.length > 0 && (
        <ul className={handles.shippingList}>
          {shippingOptions.map((sla) => (
            <li key={sla.id} className={handles.shippingItem}>
              <label className={handles.shippingItemLabel}>
                <input
                  type="radio"
                  name="shipping-option"
                  value={sla.id}
                  checked={selectedSla === sla.id}
                  onChange={() => handleSlaSelect(sla)}
                  className={handles.shippingItemRadio}
                />
                <span className={handles.shippingItemName}>{sla.name}</span>
                <span className={handles.shippingItemDeliveryTime}>
                  {formatDeliveryTime(sla.shippingEstimate)}
                </span>
                <span
                  className={`${handles.shippingItemPrice} ${
                    sla.price === 0 ? handles.shippingItemFree : ''
                  }`}
                >
                  {sla.price === 0 ? 'Grátis' : formatPrice(sla.price / 100)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomShippingSimulator
