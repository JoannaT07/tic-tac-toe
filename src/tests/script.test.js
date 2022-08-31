import { FIELD, fields, prepareFields, setFields, checkGameResult } from "../gameService.js"

test("Should prepare fields", () => {
    //given
    const expected = [
        FIELD.EMPTY, FIELD.EMPTY, FIELD.EMPTY,
        FIELD.EMPTY, FIELD.EMPTY, FIELD.EMPTY,
        FIELD.EMPTY, FIELD.EMPTY, FIELD.EMPTY
    ]
    //when
    prepareFields();
    //then
    expect(fields).toEqual(expected)
})

test.each([
    [[
        FIELD.CIRCLE, FIELD.CROSS, FIELD.EMPTY,
        FIELD.EMPTY, FIELD.CROSS, FIELD.EMPTY,
        FIELD.EMPTY, FIELD.CROSS, FIELD.CIRCLE
    ], FIELD.CROSS],
    [[
        FIELD.CIRCLE, FIELD.CROSS, FIELD.CIRCLE,
        FIELD.CIRCLE, FIELD.CIRCLE, FIELD.CROSS,
        FIELD.CROSS, FIELD.CROSS, FIELD.CROSS
    ], FIELD.CROSS],
    [[
        FIELD.CIRCLE, FIELD.CROSS, FIELD.CIRCLE,
        FIELD.CIRCLE, FIELD.CIRCLE, FIELD.CROSS,
        FIELD.CROSS, FIELD.CIRCLE, FIELD.CROSS
    ], undefined]
])("Should $preparedFields expecting $winner", (preparedFields, winner) => {
    //given
    console.log(preparedFields)
    setFields(preparedFields)
    const expected = {
        finished: true,
        winner
    }
    //when
    const actual = checkGameResult();
    //then
    expect(actual).toEqual(expected)
})