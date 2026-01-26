/**
 * 二つの数値を足し算する関数
 */
export function add(a: number, b: number): number {
  return a + b
}

/**
 * 複数の数値を足し算する関数
 */
export function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0)
}
