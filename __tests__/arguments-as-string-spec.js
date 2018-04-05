'use strict'

/* eslint-env jest */
const argumentsAsString = require('..')

describe('arguments-as-string', () => {
  it('is a function', () => {
    expect(typeof argumentsAsString).toBe('function')
  })
})
