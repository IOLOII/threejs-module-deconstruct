import { atom, useAtom } from "jotai"
import { useEffect, useRef, useState } from "react"
import { Howl, Howler } from 'howler'
export const exploredAtom = atom(false)

const UI = () => {
  // 使用jotai状态管理库
  const [explored, setExplored] = useAtom(exploredAtom)

  // 使用howler添加音频
  const [openingSound] = useState(() => {
    return new Howl({
      src: ['./sounds/debrisOpening.mp3'],
      volume: 0.3
    })
  })
  const [closingSound] = useState(() => {
    return new Howl({
      src: ['./sounds/debrisClosing.mp3'],
      volume: 0.3
    })
  })


  const firstRender = useRef(true)

  useEffect(() => {
    // 防止多次连续刷新
    if (!firstRender.current) {
      // 如果改变，得到对应的音频播放
      if (explored) {
        openingSound.play()
      } else {
        closingSound.play()
      }
    }
    firstRender.current = false
  }, [explored])

  return (
    <div className="ui">
      {/* 当点击时改变explored的值 */}
      <button className="explode-button" onClick={() => setExplored(!explored)}>
        SPACE to {explored ? 'IMPLODE' : 'EXPLODE'}
      </button>
    </div>
  )
}

export default UI