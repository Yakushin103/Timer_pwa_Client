import { memo, useEffect, useState } from "react";

import SelectIdsComponent from "../../components/Select";

import { addUserApi } from "../../api/usersApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";
import { errorSignOut } from "../../store/thunk";

import { AddUserProps } from "../../modules/pages/Settings";

const roleOptions = [
  { id: 1, name: 'super_admin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'user' },
]

function AddUser({ handlePage }: AddUserProps) {
  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    login: '',
    password: '',
    role_id: 0,
  })

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {

    } catch (error) { }
  }

  async function handleAddUser() {
    dispatch(setLoading(true))
    try {
      const { success, message } = await addUserApi(data)

      if (success) {
        handlePage('users_list')
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          setData({
            first_name: '',
            last_name: '',
            login: '',
            password: '',
            role_id: 0,
          })
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      setData({
        first_name: '',
        last_name: '',
        login: '',
        password: '',
        role_id: 0,
      })

      dispatch(setLoading(false))
    }
  }

  function handleClear() {
    setData({
      first_name: '',
      last_name: '',
      login: '',
      password: '',
      role_id: 0,
    })
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">New User</div>

        <button
          className="white"
          onClick={() => handlePage('users_list')}
        >
          Back
        </button>
      </div>

      <div className="row sb gap">
        <div className="field">
          <span>First Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.first_name}
            onChange={(event) => setData({ ...data, first_name: event.target.value })}
          />
        </div>

        <div className="field">
          <span>Last Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.last_name}
            onChange={(event) => setData({ ...data, last_name: event.target.value })}
          />
        </div>
      </div>

      <div className="row sb gap">
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
            type="text"
            className="input-text-add"
            value={data.password}
            onChange={(event) => setData({ ...data, password: event.target.value })}
          />
        </div>
      </div>

      <div className="row sb gap">
        <div className="field">
          <span>Role</span>

          <SelectIdsComponent
            id={data.role_id}
            options={roleOptions.map(option => {
              return {
                id: option.id,
                name: option.name
              }
            })}
            handleSelect={(value) => setData({ ...data, role_id: value as number })}
          />
        </div>

        <div className="field">
        </div>
      </div>

      <div className="row-buttons gap flex-end">
        <button
          className="white delete"
          disabled={!data.login && !data.first_name && !data.password && !data.role_id}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={!data.login || !data.first_name || !data.password || !data.role_id}
          onClick={() => handleAddUser()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default memo(AddUser)