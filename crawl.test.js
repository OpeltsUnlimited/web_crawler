import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('normal', () => { expect(normalizeURL("http://blog.boot.dev/path")).toBe('blog.boot.dev/path');});
test('normals', () => { expect(normalizeURL("https://blog.boot.dev/path")).toBe('blog.boot.dev/path');});
test('normal/', () => { expect(normalizeURL("http://blog.boot.dev/path/")).toBe('blog.boot.dev/path');});
test('normals/', () => { expect(normalizeURL("https://blog.boot.dev/path/")).toBe('blog.boot.dev/path');});


// Tests from original
test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })