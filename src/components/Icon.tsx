import { CSSProperties } from "react"

import icons from "../icons.svg"

interface Props {
  className?: string,
  icon: string,
  viewBox?: string,
  style?: CSSProperties
}

function Icon({
  className,
  icon,
  viewBox,
  style
}: Props): JSX.Element {

  return (
    <svg style={style} viewBox={viewBox || "0 0 24 24"} className={className}>
      <use xlinkHref={`${icons}#${icon}`} />
    </svg>
  )
}

export default Icon