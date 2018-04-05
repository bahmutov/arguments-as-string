'use strict'

/* eslint-env jest */
const argumentsAsString = require('..')

describe('arguments-as-string', () => {
  it('is a function', () => {
    expect(typeof argumentsAsString).toBe('function')
  })

  it('forms a string from strings and numbers', () => {
    expect(argumentsAsString('foo', 'bar', 42, 'the last argument')).toMatchSnapshot()
  })

  it('forms string from objects', () => {
    const o = {
      foo: {
        bar: 42
      }
    }
    const p = {
      name: 'Joe'
    }
    const result = argumentsAsString(o, p)
    expect(result).toMatchSnapshot()
  })

  it('handles circular references', () => {
    const o = {
      foo: {
        bar: 42
      }
    }
    const p = {
      name: 'Joe',
    }
    p.ref = p
    const result = argumentsAsString(o, p)
    expect(result).toMatchSnapshot()
  })

  it('handles numbers', () => {
    const result = argumentsAsString(1, 2, 3, 4, 5, 6)
    expect(result).toMatchSnapshot()
  })

  it('works with functions', () => {
    // in "normal" function you have arguments
    function main() {
      return argumentsAsString(...arguments)
    }
    const result = main(42, 'foo', {name: 'bar'})
    expect(result).toMatchSnapshot()
  })

  it('works with fat arrows', () => {
    // in fat arrow functional expressions you
    // don't have "arguments", so you need to grab arguments
    // right away
    const main = (...args) => {
      return argumentsAsString(...args)
    }
    const result = main(42, 'foo', {name: 'bar'})
    expect(result).toMatchSnapshot()
  })
})
