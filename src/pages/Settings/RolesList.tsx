import { memo, useEffect, useState } from 'react'

import Icon from '../../components/Icon'

import { deleteRoleApi, getStoreApi } from '../../api/rolesApi'
import { useAppDispatch } from '../../store/hooks'
import { setLoading } from '../../store/reducer'
import { errorSignOut } from '../../store/thunk'

import { RolesListProps } from '../../modules/pages/Settings'
import { StoreDataItem } from '../../modules/api/Roles'

function RolesList({ handlePage }: RolesListProps) {
  const dispatch = useAppDispatch()

  const [report, setReport] = useState<StoreDataItem[]>([])

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    dispatch(setLoading(true))
    try {
      const { success, data, message } = await getStoreApi()

      if (success) {
        setReport(data)
      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          setReport([])
        }
      }

      dispatch(setLoading(false))
    } catch (error) {
      setReport([])
      dispatch(setLoading(false))
    }
  }

  async function deleteRole(id: number) {
    dispatch(setLoading(true))

    try {
      const { success, message } = await deleteRoleApi(id)

      if (success) {
        getStore()

      } else {
        if (message === 'Authorization is required') {
          dispatch(errorSignOut(''))
        } else {
          getStore()
        }
      }
    } catch (error) {
      getStore()
    }
  }

  return (
    <div className="companies-list">
      <div className="row-buttons sb">
        <div className="title">All Roles</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_role')}
          >
            Add Role
          </button>
        </div>
      </div>

      {
        !!report.length &&
        <div className="__show-on-wide">
          <div className="row">
            <table className="table">
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Updated At</th>
                <th>Updated By</th>
                <th>Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td> {item.name} </td>

                    <td> {item.short_name} </td>

                    <td> {item.created_at} </td>

                    <td> {item.created_by_name} </td>

                    <td> {item.updated_at} </td>

                    <td> {item.updated_by_name} </td>

                    <td>
                      <div
                        className="action delete"
                        onClick={() => deleteRole(item.id)}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      }

      {
        !!report.length &&
        <div className="__show-on-tablet">
          <div className="row">
            <table className="table">
              <tr>
                <th>Full / Short Name</th>
                <th>Created At / By</th>
                <th>Updated At / By</th>
                <th>Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className='col'>
                        <div> {item.name} </div>
                        <div> {item.short_name} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.created_at} </div>
                        <div> {item.created_by_name} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.updated_at} </div>
                        <div> {item.updated_by_name} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div
                          className="action save"
                        >
                        </div>

                        <div
                          className="action delete"
                          onClick={() => deleteRole(item.id)}
                        >
                          <Icon
                            icon="delete-1"
                            viewBox="0 0 128 128"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </table>
          </div>
        </div>
      }

      {
        !!report.length &&
        <div className="__show-on-mobile">
          <div className='table-mobile'>
            {
              report.map(item => (
                <div key={item.id} className="item">
                  <div className="left">
                    <div className='row-mobile'>
                      <span className='name'>Name:</span>

                      <span className='value'> {item.name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Short Name:</span>

                      <span className='value'> {item.short_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Created At:</span>

                      <span className='value'> {item.created_at} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Created By:</span>

                      <span className='value'> {item.created_by_name} </span>
                    </div>
                  </div>

                  <div className="right">
                    <div className='row-mobile'>
                      <span className='name'>Updated At:</span>

                      <span className='value'> {item.updated_at} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Updated By:</span>

                      <span className='value'> {item.updated_by_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Delete:</span>

                      <div
                        className="action delete"
                        onClick={() => deleteRole(item.id)}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default memo(RolesList)