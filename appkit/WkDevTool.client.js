import { useEffect, useRef } from 'react'
// import { FPSControl } from './Framerate'
// import Stats from './Stats'

const TargetIds = {
  Reloader: 'reloader',
  Animation: 'animation',
  FPS: 'fps',
}

const Icons = {
  [TargetIds.Reloader]: (
    <svg
      viewBox='0 0 17.2559 23.3691'
      style={{
        width: 22,
        height: 22,
        color: `rgba(2, 98, 242, 0.89)`,
        fontSize: '16px',
        lineHeight: '24px',
        zIndex: -1,
        // pointerEvents: 'none',
      }}
    >
      <path
        d='M0 12.3828C0 17.1777 3.84766 21.0254 8.63281 21.0254C13.418 21.0254 17.2559 17.1777 17.2559 12.3828C17.2559 11.9141 16.9238 11.5723 16.4453 11.5723C15.9863 11.5723 15.6836 11.9141 15.6836 12.3828C15.6836 16.3086 12.5488 19.4531 8.63281 19.4531C4.7168 19.4531 1.57227 16.3086 1.57227 12.3828C1.57227 8.4668 4.7168 5.33203 8.63281 5.33203C9.375 5.33203 10.0684 5.39062 10.6445 5.52734L7.72461 8.41797C7.57812 8.57422 7.5 8.76953 7.5 8.97461C7.5 9.42383 7.83203 9.75586 8.27148 9.75586C8.51562 9.75586 8.70117 9.67773 8.83789 9.53125L12.8613 5.48828C13.0371 5.32227 13.1055 5.12695 13.1055 4.90234C13.1055 4.6875 13.0176 4.47266 12.8613 4.31641L8.83789 0.234375C8.70117 0.078125 8.50586 0 8.27148 0C7.83203 0 7.5 0.351562 7.5 0.800781C7.5 1.00586 7.57812 1.20117 7.71484 1.35742L10.3125 3.92578C9.80469 3.82812 9.22852 3.75977 8.63281 3.75977C3.84766 3.75977 0 7.59766 0 12.3828Z'
        fill='currentcolor'
      />
    </svg>
  ),
}

const Pointer = {
  PointerDown: 'pointerdown',
  PointerUp: 'pointerup',
  PointerLeave: 'pointerleave',
  PointerCancel: 'pointercancel',
}
const Mouse = {
  MouseOver: 'mouseover',
}

const BackgroundColors = {
  // root: `rgba(100,110,120,.0)`,
  // root: `rgba(1, 53, 131, 0.04)`,
  // root: `rgba(1, 5,20, 0.6)`,
  root: `rgba(0,0,0, 0.8)`,
  container: `rgba(1, 53, 131, 0)`,
  none: `rgba(0,0,0,0.2)`,
  pressed: `rgba(0,0,0, .7)`,
  hovered: `rgba(0,0,0, .5)`,
}

const Transforms = {
  initial: 'rotate(40deg)',
  complete: 'rotate(400deg)',
}

const Position = 'bottom-right'
// var rAF = window.requestAnimationFrame

// if (typeof window != 'undefined' && !window.__FPS_ON) {
// window.__FPS_ON = true

// function run() {
//     const stats = new Stats()
//     stats.showPanel(1)
//     document.getElementById(TargetIds.FPS).appendChild(stats.dom)

//     var canvas = document.createElement('canvas')
//     Object.assign(canvas.style, {
//         position: 'absolute',
//         top: '0px',
//         left: '0px',
//         zIndex: 9999,
//         // transform: 'translate3d(100%, 0px,0px)',
//     })
//     const Config = {
//         width: 40,
//         height: 40,
//     }
//     canvas.width = Config.width
//     canvas.height = Config.height
//     document.getElementById(TargetIds.Animation).appendChild(canvas)

//     var context = canvas.getContext('2d')
//     context.fillStyle = 'rgba(2, 98, 242, 0.04)'

//     function animate() {
//         var time = performance.now() / 1000

//         context.clearRect(0, 0, Config.width, Config.height)

//         stats.begin()

//         for (var i = 0; i < 2000; i++) {
//             var x =
//                 Math.cos(time + i * 0.01) * (Config.width / 2 - 9) +
//                 Config.width / 2
//             var y =
//                 Math.sin(time + i * 0.01234) * (Config.height / 2 - 9) +
//                 Config.height / 2

//             context.beginPath()
//             context.arc(x, y, 0.5, 0, Math.PI * 2, true)
//             context.fill()
//         }

//         stats.end()

//         requestAnimationFrame(animate)
//     }
//     animate()
// }

// setTimeout(() => run(), 3000)
// var fpsElement = document.getElementById('fps')
// var prev = 60
// var then = performance.now() / 1000
// function render() {
//   var now = performance.now() / 1000

//   if (now > then + 0.02) {
//     // compute time since last frame
//     var elapsedTime = now - then

//     // compute fps
//     var fps = 1 / elapsedTime

//     // let nextText = fps

//     fpsElement.innerText = fps

//     // if (Math.abs(nextText - prev) > 10) {
//     // }
//     // prev = nextText
//   }
//   then = now
//   window.requestAnimationFrame(render)
// }

// document.addEventListener(
//   'click',
//   (e) => {
//     console.log('start fps')

//     window.requestAnimationFrame(render)
//   },
//   { once: true, capture: true, passive: false }
// )
// }
// var frame = 0
// var allFrameCount = 0
// var lastTime = performance.now()
// var lastFameTime = performance.now()

// function loop() {
//   let now = performance.now()
//   let fs = now - lastFameTime
//   let fps = 1000 / fs

//   lastFameTime = now
//   //Do not set to 0, record the difference of this value at the beginning and end of the animation to calculate FPS
//   // allFrameCount++
//   frame++

//   if (now > 1000 + lastTime) {
//     // let FPS = Math.round((frame * 1000) / (now - lastTime))
//     let FPS = (frame * 1000) / (now - lastTime)

//     console.log('FPS:' + frame, FPS, fps)
//     frame = 0
//     lastTime = now
//   }

//   window.requestAnimationFrame(loop)
// }

// if (typeof window != 'undefined') {
//   loop()
// }

const ButtonContainer = (props) => {
  return (
    <div
      style={{
        width: 40,
        gridArea: props.area,
        height: 40,
        display: 'flex',
        borderRadius: 9999,
        backgroundColor: BackgroundColors.container,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {props.children}
    </div>
  )
}
const wait = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })

export default function WkDevTool() {
  const state = useRef({})

  const reloadRef = useRef(null)

  const handleEvent = (event) => {
    const { type, target } = event
    console.log(target.id, event)
    if (
      !target.id ||
      type == Pointer.PointerLeave ||
      type === Pointer.PointerCancel
    ) {
      if (state.current.id) {
        const pendingTarget = document.getElementById(state.current.id)

        if (pendingTarget != null) {
          pendingTarget.style.backgroundColor = BackgroundColors.none
          target.style.transform = Transforms.initial
        }
      }
      state.current.id = null
    } else {
      switch (target.id) {
        case TargetIds.Reloader: {
          if (type == Mouse.MouseOver) {
            state.current.id = TargetIds.Reloader
            target.style.backgroundColor = BackgroundColors.hovered
          } else if (type == Pointer.PointerDown) {
            state.current.id = TargetIds.Reloader
            target.style.backgroundColor = BackgroundColors.pressed
          } else if (type == Pointer.PointerUp) {
            target.style.backgroundColor = BackgroundColors.none
            target.style.transform = Transforms.complete
            state.current.id = null
            wait(300).then(() => window.location.reload())
          }
          break
        }
        default:
          break
      }
    }
  }

  const listening = useRef(false)
  useEffect(() => {
    if (reloadRef.current != null) {
      if (!listening.current) {
        listening.current = true
        Object.entries(Pointer).forEach((event) => {
          reloadRef.current.addEventListener(event[1], handleEvent)
        })
        Object.entries(Mouse).forEach((event) => {
          reloadRef.current.addEventListener(event[1], handleEvent)
        })
      }
    }
  }, [])

  const running = useRef(false)
  useEffect(() => {
    if (typeof window != 'undefined' && !running.current) {
      running.current = true
      // import('./FPSMeter.js')
      //   .then(() => {
      //     const meter = new window.FPSMeter(
      //       document.getElementById(TargetIds.FPS),
      //       {}
      //     )

      //     function tick() {
      //       meter.tick()
      //       window.requestAnimationFrame(tick)
      //     }

      //     tick()
      //   })
      //   .catch((e) => {
      //     console.error(`FPSMeter Load Error`, e)
      //   })
    }
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 2000000,
        top: '0px',
        // minWidth: '90px',
        // widt
        // minHeight: '100px',
        '--bottom-right': `translate3d(calc(100vw - 80px - max(env(safe-area-inset-right), 12px)),calc(100vh - 88px - 54px - max(env(safe-area-inset-bottom), 12px)),10px)`,
        '--bottom-left': `translate3d(calc(12px),calc(100vh - 88px - 54px - max(env(safe-area-inset-bottom), 12px)),10px)`,
        '--top-left': `translate3d(calc(12px),calc(88px + max(env(safe-area-inset-top), 4px)),10px)`,
        '--top-right': `translate3d(calc(100vw - 60px - 12px),calc(88px + max(env(safe-area-inset-top), 10px)),10px)`,
        transform: `var(--${Position})`,
        left: '0px',
        padding: 2,

        clipPath: 'inset(0px round 10px)',
        display: 'grid',
        gridTemplateColumns: '40px 40px',
        gridTemplateRows: '40px 22px',
        gridTemplateAreas: `
        "rel anim"
        "fps fps"
        `,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: BackgroundColors.root,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <ButtonContainer area={'rel'}>
        <div
          id={TargetIds.Reloader}
          //         onPointerDown={handleEvent}
          //         onPointerLeave={handleEvent}
          //         onPointerCancel={handleEvent}
          // onPointerUp={handleEvent}
          ref={reloadRef}
          // onMouseEnter={handleEvent}
          // onClick={handleEvent}
          data-pointerevents='box-only'
          tabIndex={1}
          style={{
            appearance: 'none',
            zIndex: 999999,
            // pointerEvents: 'all',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            display: 'flex',
            backgroundColor: BackgroundColors.none,
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'center',
            transform: Transforms.initial,
            transition: 'transform 500ms ease-out,background-color 200ms ease',
          }}
        >
          {Icons[TargetIds.Reloader]}
        </div>
      </ButtonContainer>
      <ButtonContainer area={'anim'}>
        <div
          id={TargetIds.Animation}
          tabIndex={1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            backgroundColor: `rgba(0,0,0,0)`,
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'center',
            transform: 'translate3d(0px,0px,0px)',
            display: 'flex',
            // display: 'none',
          }}
        ></div>
      </ButtonContainer>
      <div
        id={TargetIds.FPS}
        style={{
          zIndex: 0,
          pointerEvents: 'auto !important',
          gridArea: 'fps',
          position: 'relative',
          display: 'flex',
          // display: 'none',
          transform: 'translate3d(0px,0px,0px)',
        }}
      ></div>
    </div>
  )
}
