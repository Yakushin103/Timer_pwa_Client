import { useState } from "react";

import { AddCompanyProps } from "../../modules/pages/Settings";

export default function AddCompany({ handlePage }: AddCompanyProps) {
  const [data, setData] = useState({
    name: '',
    currency_id: 0,
    short_name: '',
    payment_method_id: 0,
  })
  
  return (
    <div className="companies-list">
      <div className="row sb">
        <div className="title">New Company</div>

        <button
          className="white"
          onClick={() => handlePage('companies_list')}
        >
          Back
        </button>
      </div>

      <div className="row"></div>

    </div>
  )
}
