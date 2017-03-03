import test from 'ava';
import {replaceRefsJSON, replaceRefsMongo} from './';

const testJSON = {
  $ref: 'test',
  test: {
    $ref: 'test',
    test: {
      $ref: 'test'
    }
  }
};

const testMongo = {
  _ref: 'test',
  test: {
    _ref: 'test',
    test: {
      _ref: 'test'
    }
  }
};

test('Replace JSON $refs', t => {
  const replaced = replaceRefsJSON(testJSON);
  t.deepEqual(replaced, testMongo);
});

test('Replace Mongo $refs', t => {
  const replaced = replaceRefsMongo(testMongo);
  t.deepEqual(replaced, testJSON);
});
