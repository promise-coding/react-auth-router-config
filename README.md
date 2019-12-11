
<p align="center">
      <img alt="React Auth Router Config " width = "100" height = "100" src='./example/src/image/logo.png'/>
</p> 

![NPM](https://img.shields.io/npm/l/react-auth-router-config.svg?style=popout) 
![npm](https://img.shields.io/npm/v/react-auth-router-config.svg?style=flat-square)

## react-auth-router-config

react-auth-router-config is an extension for [react-router-config](https://www.npmjs.com/package/react-router-config) which helps you authenticating access to specific routes.

- generate routes based on your own auth policy
- customize your own no-permission component/render
- matchRoutes depends on your own auth policy; 

# Installation  
`npm install react-auth-config-router`   
 
# Examples  
[basic demo](https://promise-coding.github.io/react-auth-router-config/)

# Usage  
```js   
import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter, Link } from "react-router-dom";
import { 
  authMatchRoutes, 
  authCallbackMatchRoutes,
  authRenderRoutes, 
  authCallbackRenderRoutes } from 'react-auth-config-router';

const routes = [
    {
        component: Root,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: "/child/:id",
                component: Child,
                routes: [
                    {
                        path: "/child/:id/grand-child-render",
                        exact: true,
                        render: () => <div>Grand Child Render</div>
                    }
                ]
            }
        ]
    }
];

render(
    <BrowserRouter>
        {authRenderRoutes(routes, true)}
    </BrowserRouter>,
    document.getElementById('root'));
```

# API  
## 1、authRenderRoutes 
`authRenderRoutes(routes, hasPermission, forbiddenPage, extraProps, switchProps)`  

#### Parameters  
- routes  
the route configuration  
**Note:**  
auth router config provides a route attribute `noAuth`, which helps you ignore `hasPermission` authenticating.  
routes config demo as below, and `path: "/test/:id"` will be out of `hasPermission` authenticating(it means the path has permission).
```js
const routes = [
        {
            component: Root,
            routes: [
                {
                    path: "/",
                    exact: true,
                    permissions: [],
                    component: Home
                },
                {
                    path: "/test/:id",
                    component: Child,
                    noAuth: true,
                    routes: [
                        {
                            path: "/test/:id/test-child",
                            component: GrandChild
                        }
                    ]
                },
                {
                    path: "/child/:id",
                    component: Child,
                    routes: [
                        {
                            path: "/child/:id/grand-child",
                            component: GrandChild
                        }
                    ]
                }
            ]
        }
    ];
```
- hasPermission  
this is a global param to control whether a route component/render should be presented.
- forbiddenPage   
if a route has no permission, the forbiddenPage would be presented.  
`forbiddenPage` could be functional component or class component.  
Default:   
```js
 const ForbiddenPage = () => (
      <div>
          <h3>403 Forbidden!</h3>
      </div>
);
```   
- extraProps  
Default: `{}`  
- switchProps  
Default: `{}`  

## 2、authCallbackRenderRoutes  
`authCallbackRenderRoutes(routes, authCallback, forbiddenPage,
                          extraProps, switchProps)`
#### Parameters  
all params are same as `authRenderRoutes` except `authCallback`.  
- authCallback  
we provide a route attribute `permissions` to authenticating, and `permissions` will be passed to the callback function `authCallback`.  
**Note:**   
`authCallback` must be synchronous;  
if you do not pass any callback function and it means all routes has permission;
```js
const routes = [
    {
        component: Root,
        routes: [
            {
                path: "/",
                exact: true,
                permissions: [],
                component: Home
            },
            {
                path: "/test/:id",
                component: Child,
                permissions: ['test'],
                routes: [
                    {
                        path: "/test/:id/test-child",
                        component: GrandChild
                    }
                ]
            },
            {
                path: "/child/:id",
                component: Child,
                permissions: ['master'],
                routes: [
                    {
                        path: "/child/:id/grand-child",
                        component: GrandChild
                    }
                ]
            }
        ]
    }
];

function authCallback(permissions) {
    return permissions.includes('master');
}
```

## 3、authMatchRoutes  
`authMatchRoutes(hasPermission, routes, pathname, branch)`  

### Parameters
all params are same as matchRoutes of [react-router-config](https://www.npmjs.com/package/react-router-config) except `hasPermission`;   
- hasPermission  
it is same as the param `hasPermission` of `authRenderRoutes`.  
you could go to [basic demo](https://promise-coding.github.io/react-auth-router-config/) for details.

## 3、authCallbackMatchRoutes  
`authCallbackMatchRoutes(authCallback, routes, pathname, branch)`

### Parameters  
all params are same as matchRoutes of [react-router-config](https://www.npmjs.com/package/react-router-config) except `authCallback`;     
- authCallback   
it is same as the param `hasPermission` of `authCallbackRenderRoutes`.  
you could go to [basic demo](https://promise-coding.github.io/react-auth-router-config/) for details.  
**Note:**   
`authCallback` must be synchronous;  
if you do not pass any callback function and it means all routes has permission;

