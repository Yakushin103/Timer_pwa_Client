
import { useState } from 'react'
import Timer from '../../components/Timer'

import '../../styles/pages/Main.scss'

export default function Index() {
  const [isStart, setIsStart] = useState(false)
  return (
    <div className="content main-page">
      <div>Select Company</div>

      <div>
        <Timer isStart={isStart}/>
      </div>

      <div className='button-start'>
        <button onClick={() => setIsStart(!isStart)}>
          {
            isStart ?
              'Stop' :
              'Start'
          }
        </button>
      </div>
    </div>
  )
}
