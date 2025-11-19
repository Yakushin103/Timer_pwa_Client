import { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import classNames from "classnames"

import Icon from './Icon'

import '../styles/components/Select.scss'

interface SelectComponentProps {
  id: number | string
  options: { id: number | string, name: string }[]
  handleSelect: (value: number | string) => void
  disabled?: boolean
}

export default function SelectIdsComponent({ id, options, handleSelect, disabled }: SelectComponentProps) {
  const nodeRef = useRef(null)

  const [active, setActive] = useState(false)

  function getName(id: number | string) {
    let name = ''

    options.forEach(item => {
      if (item.id === id) {
        name = item.name
      }
    })

    return name
  }

  return (
    <div
      className="select"
    >
      <button
        disabled={!!disabled}
        className='select-btn'
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setActive(!active)
        }}
        // onBlur={() => setActive(false)}
      >
        <span>
          {getName(id)}
        </span>

        <Icon
          viewBox="0 0 12 12"
          className={classNames({ _flipped: active })}
          icon="down-1"
        />
      </button>

      <Transition nodeRef={nodeRef} in={active} mountOnEnter={true} unmountOnExit={true} timeout={210}>
        {(state) => (
          <div className={classNames("options-list-wrapper", `transition-fade-${state}`)}>
            {
              options.map((item, index) => (
                <button
                  key={index}
                  className={classNames({
                    __active: item.id === id
                  })}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    handleSelect(item.id)
                    setActive(false)
                  }}
                >
                  {item.name}
                </button>
              ))
            }
          </div>
        )}
      </Transition>
    </div>
  )
}