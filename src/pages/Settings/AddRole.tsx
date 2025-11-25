import { memo, useEffect, useState } from "react";

import { addRoleApi } from "../../api/rolesApi";
import { useAppDispatch } from "../../store/hooks";
import { setLoading } from "../../store/reducer";
import { errorSignOut } from "../../store/thunk";

import { AddRolesProps } from "../../modules/pages/Settings";

function AddRole({ handlePage }: AddRolesProps) {
  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    name: '',
    short_name: '',
  })

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {

    } catch (error) { }
  }

  async function handleAddRole() {
    dispatch(setLoading(true))
    try {
      const { success, message } = await addRoleApi(data)

      if (success) {
        handlePage('roles_list')
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          setData({
            name: '',
            short_name: '',
          })
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      setData({
        name: '',
        short_name: '',
      })

      dispatch(setLoading(false))
    }
  }

  function handleClear() {
    setData({
      name: '',
      short_name: '',
    })
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">New Role</div>

        <button
          className="white"
          onClick={() => handlePage('roles_list')}
        >
          Back
        </button>
      </div>

      <div className="row sb gap">
        <div className="field">
          <span>Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div className="field">
          <span>Short Name</span>

          <input
            type="text"
            className="input-text-add"
            value={data.short_name}
            onChange={(event) => setData({ ...data, short_name: event.target.value })}
          />
        </div>
      </div>

      <div className="row-buttons gap flex-end">
        <button
          className="white delete"
          disabled={!data.name && !data.short_name}
          onClick={() => handleClear()}
        >
          Clear
        </button>

        <button
          className="white save"
          disabled={!data.name && !data.short_name}
          onClick={() => handleAddRole()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default memo(AddRole)