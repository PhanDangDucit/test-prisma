import {describe, expect, test} from '@jest/globals';
import { processContentAddition, processStringContentAddition } from '@/utils/posts.util';
import {mainCommentsFakeList} from "./fixtures/comments";

describe('Test post util::', () => {
    test("Test 'processContentAddition' function", () => {
        const a = "<p>Hello guy! How are you?</p><p>Good idea</p>";
        expect(processContentAddition(a, 40)).toBe('<p>Hello guy! How are...');
    });

    test("Test 'processStringContentAddition' function", () => {
        const a = "Hello guy";
        const b = "ASCcasacascaca"
        expect(processStringContentAddition(a, 7)).toBe('Hello...');
        expect(processStringContentAddition(b, 100)).toBe('ASCcasacascaca');
    })
});

describe('Test commennts', ( ) => {
    test("Test sort mainComments", () => {
        // expect();
    })
})