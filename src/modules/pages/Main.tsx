export interface IndexProps {
  seconds: number,
  minutes: number,
  hours: number,
  isStart: boolean
  handleStart: (value: boolean) => void
  data: DataProps
  handleData: (value: DataProps) => void
}

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