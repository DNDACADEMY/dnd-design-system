type HandlerOptions = {
  originPreventDefault?: boolean
  originStopPropagation?: boolean
}

/**
 * @description 컴포넌트에서 정의한 이벤트 핸들러와 사용자가 정의한 이벤트 핸들러를 조합합니다.
 * 사용자는 event.preventDefault()를 통해 라이브러리 핸들러의 실행을 막을 수 있습니다.
 *
 * @param userHandler 사용자가 제공한 이벤트 핸들러
 * @param libHandler 라이브러리에서 제공하는 이벤트 핸들러
 * @param options 이벤트 제어 옵션
 */
export function composeHandler<E extends React.SyntheticEvent | Event>(
  userHandler: ((event: E) => unknown) | undefined,
  libHandler: ((event: E) => unknown) | undefined,
  options: HandlerOptions = {
    originPreventDefault: false,
    originStopPropagation: false
  }
): (event: E) => void {
  return (event) => {
    if (options.originPreventDefault) {
      event.preventDefault()
    }
    if (options.originStopPropagation) {
      event.stopPropagation()
    }

    libHandler?.(event)
    if (!event.defaultPrevented) {
      userHandler?.(event)
    }
  }
}
