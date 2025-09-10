import { useEffect, useState } from "react";

import Icon from "../../components/Icon";

import { deletePaymentMethodApi, editPaymentMethodApi, getPaymentMethodStoreApi } from "../../api/paymentMethodApi";

import { PaymentMethodListProps, PaymentMethodProps } from "../../modules/pages/Settings";

export default function PaymentMethodList({ handlePage }: PaymentMethodListProps) {
  const [list, setList] = useState<PaymentMethodProps[] | null>(null)

  const [edit, setEdit] = useState<PaymentMethodProps | null>(null)

  useEffect(() => {
    getStore()
  }, [])

  async function getStore() {
    try {
      const { success, data } = await getPaymentMethodStoreApi()

      if (success) {
        setList(data)
      } else {
        setList([])
      }
    } catch (error) {
      setList([])
    }
  }

  async function deletePaymentMethod(id: number) {
    try {
      const { success } = await deletePaymentMethodApi(id)

      if (success) {
        getStore()
      }
    } catch (error) {
      getStore()
    }
  }


  async function editPaymentMethod() {
    try {
      if (edit) {
        const { success } = await editPaymentMethodApi(edit)

        if (success) {
          setEdit(null)
          getStore()
        }
      }
    } catch (error) {
      getStore()
    }
  }

  return (
    <div className="companies-list">
      <div className="row sb">
        <div className="title">All Payment Method</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_payment_method')}
          >
            Add Payment Method
          </button>
        </div>
      </div>

      <div className="row">
        {
          list &&
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Period</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>

            {
              list.map(item => (
                <tr key={item.id}>
                  <td>
                    {
                      edit && edit.id === item.id ?
                        <input
                          type="text"
                          className="input-text"
                          value={edit.name}
                          onChange={(event) => setEdit({ ...edit, name: event.target.value })}
                        /> :
                        item.name
                    }
                  </td>

                  <td>
                    {
                      edit && edit.id === item.id ?
                        <input
                          type="text"
                          className="input-text"
                          value={edit.description}
                          onChange={(event) => setEdit({ ...edit, description: event.target.value })}
                        /> :
                        item.description
                    }
                  </td>

                  <td>
                    {
                      edit && edit.id === item.id ?
                        <input
                          type="text"
                          className="input-text"
                          value={edit.period}
                          onChange={(event) => setEdit({ ...edit, period: event.target.value })}
                        /> :
                        item.period
                    }
                  </td>

                  <td>
                    {
                      !!edit && edit.id === item.id &&
                      <div
                        className="action save"
                        onClick={() => editPaymentMethod()}
                      >
                        <Icon
                          icon="save-1"
                        />
                      </div>
                    }

                    {
                      !edit &&
                      <div
                        className="action edit"
                        onClick={() => setEdit(item)}
                      >
                        <Icon
                          icon="pencil-1"
                        />
                      </div>
                    }
                  </td>

                  <td>
                    {
                      !!edit && edit.id === item.id &&
                      <div
                        className="action delete"
                        onClick={() => setEdit(null)}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    }

                    {
                      !edit &&
                      <div
                        className="action delete"
                        onClick={() => deletePaymentMethod(item.id)}
                      >
                        <Icon
                          icon="delete-1"
                          viewBox="0 0 128 128"
                        />
                      </div>
                    }
                  </td>
                </tr>
              ))
            }
          </table>
        }
      </div>
    </div>
  )
}
