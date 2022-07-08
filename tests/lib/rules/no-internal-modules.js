/**
 * @fileoverview no internal modules
 * @author Hungry
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-internal-modules'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: 'module' } });
const options = [
  {
    target: '**/.umi/**',
    replace: 'umi'
  },
  {
    target: 'umi',
    replace: '@/utils/router',
    modules: ['Link', 'useHistory']
  }
];
ruleTester.run('no-internal-modules', rule, {
  valid: [
    { code: "import { useRequest } from 'umi'", options },
    { code: "import { useModel } from 'umi'", options },
    { code: "import { useRequest, useModel } from 'umi'", options }
  ],

  invalid: [
    {
      code: "import { useRequest } from '@/.umi/request-plugin/request';",
      errors: [{ message: "replace the path '@/.umi/request-plugin/request' with 'umi' please" }],
      options,
      output: "import { useRequest } from 'umi';"
    },
    {
      code: "import { useModel } from '@/.umi/model-plugin/model';",
      errors: [{ message: "replace the path '@/.umi/model-plugin/model' with 'umi' please" }],
      options,
      output: "import { useModel } from 'umi';"
    },
    {
      code: "import { useRequest } from 'src/.umi/request-plugin/request';",
      errors: [{ message: "replace the path 'src/.umi/request-plugin/request' with 'umi' please" }],
      options,
      output: "import { useRequest } from 'umi';"
    },
    {
      code: "import { Link, useModel } from 'umi';",
      errors: [{ message: "import the module 'Link' from '@/utils/router' please" }],
      options,
      output: "import {  useModel } from 'umi';\nimport { Link } from '@/utils/router';"
    },
    {
      code: "import { Link as LinkTo, useModel } from 'umi';",
      errors: [{ message: "import the module 'Link as LinkTo' from '@/utils/router' please" }],
      options,
      output: "import {  useModel } from 'umi';\nimport { Link as LinkTo } from '@/utils/router';"
    }
  ]
});
