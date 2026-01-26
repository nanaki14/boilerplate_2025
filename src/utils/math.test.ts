import { describe, it, expect } from 'vitest'
import { add, sum } from './math'

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(10, 20)).toBe(30)
  })

  it('should add negative numbers', () => {
    expect(add(-1, -2)).toBe(-3)
    expect(add(-10, 5)).toBe(-5)
  })

  it('should add zero', () => {
    expect(add(0, 0)).toBe(0)
    expect(add(5, 0)).toBe(5)
    expect(add(0, 5)).toBe(5)
  })

  it('should add decimal numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3)
    expect(add(1.5, 2.5)).toBe(4)
  })
})

describe('sum', () => {
  it('should sum multiple numbers', () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15)
    expect(sum(10, 20, 30)).toBe(60)
  })

  it('should return 0 for empty array', () => {
    expect(sum()).toBe(0)
  })

  it('should sum single number', () => {
    expect(sum(5)).toBe(5)
  })

  it('should sum negative numbers', () => {
    expect(sum(-1, -2, -3)).toBe(-6)
    expect(sum(10, -5, 3)).toBe(8)
  })
})
