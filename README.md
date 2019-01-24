# react-shared-hook
A simple way to create shared state using the hook API from React.

Use-case: A library or module that serves the same state to mulitple components when it's not practical to add a provider.

This works for react hooks of the form

```js
[state, setter] = hook(initialValue)
```

For example, this could be `useState`, `useReducer`, etc.


Inspired by https://github.com/philippguertler/react-hook-shared-state

Requires at least React `16.7.0`

# Install
```sh
yarn add react-shared-hook
```

# Example

```js
import shareHook from 'react-shared-hook'

const [useSharedHook, setter] = createSharedState(useState, 'initial state')

/*
 * The state of every component will be assigned the same value.
 */
const MyComponent = () => {
  const state = useSharedHook()
  return (
    <div
      onClick={() => setter(state => state.replace('initial', 'new'))}
    >
      {state}
    </div>
  )
}

```



# API

`createSharedState(initialValue)`

Returns a tuple with two functions in this order:
* `useSharedState()` - Use this in your component. This will return the current state and cause your component to rerender when a new state is set.
* `setSharedState(nextState | (previousState) => nextState)` - Call this function to set the new shared state.
You can also pass a function which will receive the previous state as a parameter and returns the next state.