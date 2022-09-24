# no internal modules (no-internal-modules)

本条规则用于统一某个模块的导入路径

## Rule Details

- `target` 需要禁用的路径
- `replace` 替换后的路径
- `modules` 需要替换的模块

使用以下规则：

```js
{
  ...
  'rules': {
    'import-path-plus/no-internal-modules': [
      'error',
      {
        target: '**/.umi/**',
        replace: 'umi'
      },
      {
        target: 'umi',
        replace: '@/utils/router',
        modules: ['Link', 'useHistory']
      }
    ]
  }
}
```

原代码：
```js
import { useRequest } from '@/.umi/request-plugin/request';
```

替换后为：

```js
import { useRequest } from 'umi';
```

原代码：
```js
import { Link, useModel } from 'umi';
```

替换后为：

```js
import {  useModel } from 'umi';
import { Link } from '@/utils/router';
```

