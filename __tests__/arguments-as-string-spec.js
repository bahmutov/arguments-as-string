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
})
