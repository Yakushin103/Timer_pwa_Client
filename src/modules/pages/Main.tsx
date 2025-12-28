export interface DataProps {
  day: string,
  seconds: number,
  minutes: number,
  hours: number,
}

export interface DataUpdatedProps {
  day: string,
  seconds: number,
  minutes: number,
  hours: number,
  company_id: number,
  id: number
}

export interface AddTimeDataProps {
  day: string,
  seconds: number,
  minutes: number,
  hours: number,
  company_id: number
}