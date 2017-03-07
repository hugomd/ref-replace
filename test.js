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

const testJSONArray = {
  $ref: 'test',
  test: [
    {
      $ref: 'test',
      something: 'else'
    }
  ]
};

const testMongoArray = {
  _ref: 'test',
  test: [
    {
      _ref: 'test',
      something: 'else'
    }
  ]
};

test('Replace JSON $refs when using arrays', t => {
  const replaced = replaceRefsJSON(testJSONArray);
  t.deepEqual(replaced, testMongoArray);
});

test('Replace Mongo $refs when using arrays', t => {
  const replaced = replaceRefsMongo(testMongoArray);
  t.deepEqual(replaced, testJSONArray);
});

const testJSONNestedArray = {
  $ref: 'test',
  test: [
    {
      $ref: [
        {
          $ref: 'test'
        },
        {
          $ref: 'test'
        }
      ],
      something: 'else'
    }
  ]
};

const testMongoNestedArray = {
  _ref: 'test',
  test: [
    {
      _ref: [
        {
          _ref: 'test'
        },
        {
          _ref: 'test'
        }
      ],
      something: 'else'
    }
  ]
};

test('Replace JSON $refs when using nested arrays', t => {
  const replaced = replaceRefsJSON(testJSONNestedArray);
  t.deepEqual(replaced, testMongoNestedArray);
});

test('Replace Mongo $refs when using nested arrays', t => {
  const replaced = replaceRefsMongo(testMongoNestedArray);
  t.deepEqual(replaced, testJSONNestedArray);
});
