import { pipe } from '../func'
import * as Str from '../str'

describe('str', () => {
  test('should work', () => {
    expect(pipe('test', Str.upper())).toMatchInlineSnapshot('"TEST"')
    expect(pipe('Blue / 500', Str.camel())).toMatchInlineSnapshot('"blue500"')
    expect(pipe('Blue / 500', Str.kebab())).toMatchInlineSnapshot('"blue-500"')
    expect(pipe('Blue / 500', Str.snake())).toMatchInlineSnapshot('"blue_500"')
    expect(pipe('Blue / 500', Str.strip())).toMatchInlineSnapshot('"blue 500"')
    expect(pipe('Blue / 500', Str.strip())).toMatchInlineSnapshot('"blue 500"')
    expect(pipe('Blue / Beast', Str.pascal())).toMatchInlineSnapshot(
      '"BlueBeast"'
    )
    expect(pipe('Blue / Beast', Str.camel())).toMatchInlineSnapshot(
      '"blueBeast"'
    )
  })
})
