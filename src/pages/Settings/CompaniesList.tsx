import { CompaniesListProps } from "../../modules/pages/Settings";

export default function CompaniesList({ handlePage }: CompaniesListProps) {
  return (
    <div className="companies-list">
      <div className="row sb">
        <div className="title">All Companies</div>

        <div className="row-action">
          <button
            className="white"
            onClick={() => handlePage('')}
          >
            Back
          </button>

          <button
            className="white"
            onClick={() => handlePage('add_company')}
          >
            Add Company
          </button>
        </div>
      </div>

      <div className="row">222</div>
    </div>
  )
}
