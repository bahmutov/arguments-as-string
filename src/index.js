'use strict'

function isArrayLike (a) {
  return a && typeof a.length === 'number'
}

function toStringArray (arr) {
  return `array with ${arr.length} items.\n[${arr.map(toString).join(', ')}]
`
}

function isPrimitive (arg) {
  return (
    typeof arg === 'string' ||
    typeof arg === 'number' ||
    typeof arg === 'boolean'
  )
}

/*
  custom JSON.stringify replacer to make sure we do not
  hide properties that have value "undefined"
  var o = {
    foo: 42,
    bar: undefined
  }
  // standard JSON.stringify returns '{"foo": 42}'
  // this replacer returns '{"foo": 42, "bar": null}'
*/
function replacer (key, value) {
  return value === undefined ? null : value
}

function toString (arg, k) {
  let argString

  if (isPrimitive(arg)) {
    return JSON.stringify(arg)
  }

  if (arg instanceof Error) {
    return arg.name + ' ' + arg.message
  }

  if (Array.isArray(arg)) {
    return toStringArray(arg)
  }

  if (isArrayLike(arg)) {
    return toStringArray(Array.from(arg))
  }

  try {
    argString = JSON.stringify(arg, replacer, 2)
  } catch (err) {
    argString = `{ cannot stringify arg ${k}, it has type "${typeof arg}"`
    if (typeof arg === 'object') {
      argString += ` with keys ${Object.keys(arg).join(', ')}`
    }
    argString += ' }'
  }

  return argString
}

function endsWithNewLine (s) {
  return /\n$/.test(s)
}

/**
 * Converts arbitrary number of arguments into single string
 *
 * @param {any} args
 * @returns {string}
 */
function argumentsAsString (...args) {
  if (args.length === 0) {
    return '[]'
  }

  const msg = args.reduce(function (total, arg, k) {
    if (k && !endsWithNewLine(total)) {
      total += ' '
    }
  
    if (typeof arg === 'string') {
      return total + arg
    }
  
    if (typeof arg === 'function') {
      var fnResult

      try {
        fnResult = arg()
      } catch (err) {
        // ignore the error
        fnResult = `[function ${arg.name} threw error!]`
      }

      return total + fnResult
    }

    const argString = toString(arg, k)

    return total + argString
  }, '')

  return msg
}

module.exports = argumentsAsString
