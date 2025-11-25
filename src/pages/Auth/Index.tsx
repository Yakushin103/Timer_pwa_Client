import { useEffect, useState } from "react"

import { singInApi } from "../../api/usersApi"
import { useAppDispatch } from "../../store/hooks"
import { setAccessToken, setLoading } from "../../store/reducer"

import '../../styles/pages/Auth.scss'

export default function Index() {
  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    login: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!!errorMessage) {
      setErrorMessage('')
    }
  }, [data.login, data.password])

  async function handleLogin() {
    dispatch(setLoading(true))
    try {
      const { success, token, message } = await singInApi(data)
      if (success) {
        dispatch(setAccessToken(token))
      } else {
        setErrorMessage(message)
      }

      dispatch(setLoading(false))
    } catch (error) {
      setErrorMessage(error as string)
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="auth-block">
      <div className="auth">
        <div className="col">
          <div className="field">
            <span>Login</span>

            <input
              type="text"
              className="input-text-add"
              value={data.login}
              onChange={(event) => setData({ ...data, login: event.target.value })}
            />
          </div>

          <div className="field">
            <span>Password</span>

            <input
              type="password"
              className="input-text-add"
              value={data.password}
              onChange={(event) => setData({ ...data, password: event.target.value })}
            />
          </div>

          {
            !!errorMessage &&
            <p> {errorMessage} </p>
          }
        </div>

        <div className="auth-button">
          <button
            className="white"
            disabled={!data.login || !data.password}
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
