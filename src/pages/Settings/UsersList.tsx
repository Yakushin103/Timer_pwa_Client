import { memo, useEffect, useState } from 'react'

import Icon from '../../components/Icon'

import { deleteUserApi, getStoreApi } from '../../api/usersApi'
import { useAppDispatch } from '../../store/hooks'
import { setLoading } from '../../store/reducer'
import { errorSignOut } from '../../store/thunk'

import { UsersListProps } from '../../modules/pages/Settings'
import { StoreDataItem } from '../../modules/api/Users'

function UsersList({ handlePage }: UsersListProps) {
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

  async function deleteUser(id: number) {
    dispatch(setLoading(true))

    try {
      const { success, message } = await deleteUserApi(id)

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
        <div className="title">All Users</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_user')}
          >
            Add User
          </button>
        </div>
      </div>

      {
        !!report.length &&
        <div className="__show-on-wide">
          <div className="row">
            <table className="table">
              <tr>
                <th>Login</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Updated At</th>
                <th>Updated By</th>
                <th>Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td> {item.login} </td>

                    <td> {item.role} </td>

                    <td> {item.first_name} </td>

                    <td> {item.last_name} </td>

                    <td> {item.created_at} </td>

                    <td> {item.created_by} </td>

                    <td> {item.updated_at} </td>

                    <td> {item.updated_by} </td>

                    <td>
                      <div
                        className="action delete"
                        onClick={() => deleteUser(item.id)}
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
                <th>Login / Role</th>
                <th>First / Last Name</th>
                <th>Created At / By</th>
                <th>Updated At / By</th>
                <th>Delete</th>
              </tr>

              {
                report.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className='col'>
                        <div> {item.login} </div>
                        <div> {item.role} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.first_name} </div>
                        <div> {item.last_name} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.created_at} </div>
                        <div> {item.created_by} </div>
                      </div>
                    </td>

                    <td>
                      <div className='col'>
                        <div> {item.updated_at} </div>
                        <div> {item.updated_by} </div>
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
                          onClick={() => deleteUser(item.id)}
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
                      <span className='name'>Login:</span>

                      <span className='value'> {item.login} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Role:</span>

                      <span className='value'> {item.role} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>First Name:</span>

                      <span className='value'> {item.first_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Last Name:</span>

                      <span className='value'> {item.last_name} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Created At:</span>

                      <span className='value'> {item.created_at} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Created By:</span>

                      <span className='value'> {item.created_by} </span>
                    </div>
                  </div>

                  <div className="right">
                    <div className='row-mobile'>
                      <span className='name'>Updated At:</span>

                      <span className='value'> {item.updated_at} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Updated By:</span>

                      <span className='value'> {item.updated_by} </span>
                    </div>

                    <div className='row-mobile'>
                      <span className='name'>Delete:</span>

                      <div
                        className="action delete"
                        onClick={() => deleteUser(item.id)}
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

export default memo(UsersList)