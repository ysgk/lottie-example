import lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web'
import React from 'react'

type Options = {
  animationData: any
}

const useLottie = (options: Options) => {
  const { animationData } = options
  const animationInstanceRef = React.useRef<AnimationItem | null>(null)
  const animationContainerRef = React.useRef<HTMLDivElement | null>(null)

  const replay = (): void => {
    animationInstanceRef.current?.goToAndPlay(0)
  }

  const hide = (): void => {
    animationInstanceRef.current?.hide()
  }

  const show = (): void => {
    animationInstanceRef.current?.show()
  }

  React.useEffect(() => {
    // Return if the container ref is null
    if (animationContainerRef.current == null) {
      return
    }

    // Destroy any previous instance
    animationInstanceRef.current?.destroy()

    // Build the animation configuration
    const config: AnimationConfigWithData = {
      loop: false,
      autoplay: false,
      animationData,
      container: animationContainerRef.current,
    }

    // Save the animation instance
    animationInstanceRef.current = lottie.loadAnimation(config)
    hide()
  }, [animationData])

  React.useEffect(() => {
    const listeners = [
      {
        name: 'complete',
        handler: () => {
          hide()
        },
      },
      {
        name: 'enterFrame',
        handler: () => {
          show()
        },
      },
    ].filter(({ handler }) => !!handler)

    if (listeners.length === 0) {
      return
    }
    const deregisterList = listeners.map((listener) => {
      animationInstanceRef.current?.addEventListener(listener.name as any, listener.handler as any)

      return () => {
        animationInstanceRef.current?.removeEventListener(listener.name as any, listener.handler as any)
      }
    })

    // Deregister listeners on unmount
    return () => {
      deregisterList.forEach((deregister) => deregister())
    }
  }, [])

  const render = () => {
    return <div ref={animationContainerRef} style={{ width: 42, height: 42 }} />
  }

  return {
    render,
    replay,
  }
}

export default useLottie
