import React, {useState, useEffect} from "react"
import Overlay from "../Overlay"
/* import ModalImageContainer from "./ModalImageContainer" */
import ModalContent from "./ModalContent"
import styles from "./styles.css"
/* import { canUseDOM } from 'vtex.render-runtime' */
interface ModalLeadProps {
    isActive: boolean,
    cupomName: string,
    cupomValue: number
    bgPopupForm: string
    bgPopupCupon: string
    logo: string
    title: string
    subTitle: string
    text: string
    placeName: string
    placeEmail: string
    textTermos: string
}
const ModalLead = ({isActive, cupomName, cupomValue,  bgPopupForm, logo, bgPopupCupon, title, subTitle, text, textTermos, placeName, placeEmail}: ModalLeadProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showCupom, setShowCupom] = useState<boolean>(false)
    useEffect(() => {
      const shouldShowModal = window.localStorage.getItem('shouldShowModal')
      if (shouldShowModal !== null) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }, [])
      const handleCloseIcon = () => {
        setIsOpen(false)
        window.localStorage.setItem('shouldShowModal', 'false')
      }
      const CloseIcon = () => {
        return (
          <button className={`${styles.closeModal} ${showCupom ? styles.closeModalAlt: ""}`} onClick={()=> handleCloseIcon()}>
            X
          </button>
        )
      }

    return (
        <>
            {isActive && isOpen &&
            <Overlay setIsOpen={setIsOpen}>
                <div onClick={(e) => e.stopPropagation()} className={styles.modalLeadContainerOvelay}>
                    <CloseIcon />
                    <ModalContent showCupom={showCupom} setShowCupom={setShowCupom} cupomName={cupomName} cupomValue={cupomValue}  bgPopupForm={bgPopupForm} bgPopupCupon={bgPopupCupon} logo={logo} title={title} subTitle={subTitle} text={text} textTermos={textTermos} placeName={placeName} placeEmail={placeEmail} />
                </div>
            </Overlay>}
        </>
    )
}
ModalLead.schema = {
    type: 'object',
    name: `Modal de Lead`,
    title: 'Modal Cupom Primeira Compra',
    properties: {
        text:{
          title:"Título",
          type:"string"
        },
        isActive: {
            type: 'boolean',
            title: 'Ativar ou desativar Modal de Lead',
            default: true
        },
        cupomName: {
            type: 'string',
            title: "Nome do cupom",
            description: "O nome do cupom de desconto.",
            default: "BEMVINDO10"
        },
        cupomValue: {
            type: 'number',
            title: 'Valor do cupom',
            description: "O valor de desconto do modal de lead. Usar UM número inteiro que representa o valor, por exemplo: 10, 50, 100, 75, 120",
            default: 10
        },
        title:{
          title:"Título",
          default: "RECEBA OFERTAS",
          type:"string"
        },
        subTitle:{
          title:"Sub Título",
          default: "EXCLUSIVAS POR E-MAIL",
          type:"string"
        },
        placeName:{
            title:"placeholder Nome",
            default: "Digite seu nome",
            type:"string"
          },
          placeEmail:{
            title:"placeholder Email",
            default: "Digite seu e-mail",
            type:"string"
        },
        textTermos:{
          title:"Texto de concepção dos termos",
          default: "Ao enviar, confirmo que li e aceito a Declaração de Privacidade e gostaria de receber e-mails marketing e/ou promocionais do Planeta do Bebê.\n\n*Desconto não é válido para bicos, mamadeiras, chupetas e protetor de mamilos.",
          type:"string",
          widget: {
            "ui:widget": "textarea"
            }
        },
        logo: {
            type: "string",
            title: "logo",
            default: "/arquivos/bg-popup-newsletter-logo.png",
            widget: {
            "ui:widget": "image-uploader"
            }
        },
        bgPopupForm: {
            type: "string",
            title: "Imagem de fundo popup cadastro",
            default: "/arquivos/bg-popup-newsletter-form.jpg",
            widget: {
            "ui:widget": "image-uploader"
            },
        },
        bgPopupCupon: {
          type: "string",
          title: "Imagem de fundo popup cupom",
          default: "/arquivos/bg-popup-newsletter-cupom.jpg",
          widget: {
          "ui:widget": "image-uploader"
          },
      },
      },
    }
export default ModalLead