import React, { useState } from 'react'
import { CustomNewsletterProps } from './types'
import { schema } from './schema'
import './global.css'
import type { StorefrontFunctionComponent } from 'vtex.render-runtime'

export const CustomNewsletter: StorefrontFunctionComponent<
  CustomNewsletterProps
> = ({
  sucessMensage = 'Cadastrado com sucesso.',
  failMensage = 'Preencha os campos corretamente.',
}) => {
  const [firstName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sucessMsg, setSucessMsg] = useState(false)
  const [failMsg, setFailMsg] = useState(false)
  const [showMsg, setShowMsg] = useState(false)

  const sendToMD = (event: any) => {
    var nameInput = firstName
    var emailInput = email

    const payload = JSON.stringify({
      firstName: nameInput,
      email: emailInput,
      isNewsletterOptIn: true,
    })

    const url = '/api/dataentities/CL/documents'

    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload,
    }

    fetch(url, options)
      .then((response) => {
        if (response.status != 400) {
          setSucessMsg(true)
          setFailMsg(false)
        } else {
          setFailMsg(true)
          setSucessMsg(false)
        }
      })
      .catch((error) => {
        console.error('Newsletter error: ', error)
      })

    event.preventDefault()
  }

  return (
    <div className="news-custom-form">
      <div className="form-div">
        <form>
          <h4 className="text-novidades">
            SE INSCREVA E RECEBA<span>novidades e promos</span>
          </h4>
          <div className={`${showMsg}`}></div>
          <input
            type="text"
            id="firstName"
            onFocus={() => setShowMsg(true)}
            onBlur={() => setShowMsg(false)}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Seu Nome"
          />
          <input
            type="text"
            id="email"
            onFocus={() => setShowMsg(true)}
            onBlur={() => setShowMsg(false)}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Seu E-mail"
          />
          <input
            type="submit"
            id="button-cl-send"
            value="Cadastrar"
            onClick={sendToMD}
          />
        </form>
        <div className="mensage-div">
          <span className={`sucess-msg ${sucessMsg ? 'show-msg' : ''}`}>
            {sucessMensage}
          </span>
          <span className={`fail-msg ${failMsg ? 'show-msg' : ''}`}>
            {failMensage}
          </span>
        </div>
      </div>
    </div>
  )
}

CustomNewsletter.schema = schema
