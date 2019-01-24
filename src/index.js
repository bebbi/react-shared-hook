import { useEffect } from 'react'

export default (hook, state) => {
  const listeners = new Set()

  const client = () => {
    const [clientState, setter] = hook(state)

    useEffect(() => {
      listeners.add(setter)
      return () => listeners.delete(setter)
    }, [])

    return clientState
  }

  const setter = newValue => {
    if (typeof newValue === 'function') {
      newValue = newValue(state)
    }
    state = newValue
    listeners.forEach(listener => listener(newValue))
  }

  return [client, setter]
}
