import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './styles.css'
interface ModalFormProps {
  setShowCupom: Dispatch<SetStateAction<boolean>>
  bgPopupForm: string
  cupomValue: number
  text: string
  placeName: string
  placeEmail: string
  textTermos: string
  logo: string
  title: string
  subTitle: string
}
interface FormData {
  nome: string
  email: string
}
interface UserRegistration {
  id: string
}
const ModalForm = ({
  setShowCupom,
  bgPopupForm,
  cupomValue,
  textTermos,
  placeName,
  placeEmail,
  logo,
  title,
  subTitle,
}: ModalFormProps) => {
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '' })
  const [loading, setLoading] = useState(false)
  async function checkUserExists(email: string): Promise<UserRegistration[]> {
    const response = await fetch(`/api/dataentities/CP/search?email=${email}`)
    const data = response.json()
    return data
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const { nome, email } = formData
    const isInvalidInfo = isFieldEmpty(nome) || isFieldEmpty(email)
    if (isInvalidInfo) {
      alert('Por favor, preencha seu nome e e-mail corretamente.')
      setFormData({ email: '', nome: '' })
      setLoading(false)
      return
    }
    let url = '/api/dataentities/CP/documents'
    const userRegistrationExists = await checkUserExists(email)
    if (userRegistrationExists.length) {
      url = `/api/dataentities/CP/documents/${userRegistrationExists[0].id}`
    }
    let options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10 json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
    try {
      fetch(url, options)
        .then(() => {
          setShowCupom(true)
          window.localStorage.setItem('shouldShowModal', 'false')
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
          setLoading(false)
        })
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      nome: e.target?.value,
    }))
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      email: e.target?.value,
    }))
  }
  const isFieldEmpty = (str: string) => {
    return !str || str.length === 0
  }

  function createTextTermo() {
    const __html =
      typeof textTermos == 'string' ? textTermos.replace(/\n/g, '<br />') : ''
    return { __html }
  }
  return (
    <>
      <div className={styles.modalLeadContainer}>
        <div className={styles.modalLeadHead}>
          <img src={logo} alt="pop-up-logo" className={styles.modalLeadLogo} />
          <div className={styles.modalLeadTitleContainer}>
            <h3 className={styles.modalLeadTitle}> {title}</h3>
            <h4 className={styles.modalLeadSubTitle}> {subTitle} </h4>
          </div>
        </div>
      </div>
      <div
        className={styles.modalLeadFormContainer}
        style={{ backgroundImage: `url(${bgPopupForm})` }}
      >
        <p className={styles.modalLeadFormTitle}>
          Ganhe {cupomValue}% de desconto <br />
          na sua primeira compra
        </p>
        <form onSubmit={e => handleSubmit(e)} className={styles.modalLeadForm}>
          <div className={styles.modalLeadFormInputs}>
            <input
              className={styles.modalLeadFormInput}
              onChange={e => {
                e.persist()
                handleNameChange(e)
              }}
              type="text"
              placeholder={placeName}
              required={true}
            />
            <input
              className={styles.modalLeadFormInput}
              onChange={e => {
                e.persist()
                handleEmailChange(e)
              }}
              type="email"
              placeholder={placeEmail}
              required={true}
              minLength={8}
            />
          </div>
          <button className={styles.modalLeadSend} type="submit">
            {loading ? (
              <img
                style={{ width: '15px', height: '15px' }}
                src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                alt="spinner"
              />
            ) : (
              'ENVIAR'
            )}
          </button>
          <div className={styles.modalLeadFormAcceptContainer}>
            <input
              name="accept"
              id="accept"
              type="checkbox"
              defaultChecked={true}
            />
            <label
              htmlFor="accept"
              dangerouslySetInnerHTML={createTextTermo()}
              className={styles.modalLeadFormAcceptLabel}
            />
          </div>
        </form>
      </div>
    </>
  )
}
export default ModalForm
