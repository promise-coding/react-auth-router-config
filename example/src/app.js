import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter, Link } from "react-router-dom";
import { authMatchRoutes, authCallbackMatchRoutes,
    authRenderRoutes, authCallbackRenderRoutes } from '../../src/index';
import MyComponent from './MyComponent';
import authImg from './image/auth.png';
import normalImg from './image/normal.png';
import noMatch from './image/noMatch.png';
import callbackChild from './image/callbackChild.png';

function testMatchRoutes() {
    const routeList = [
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

    const branch = authCallbackMatchRoutes(authCallback, routeList, "/child/23");
    console.log(branch);
}

function authCallback(permissions) {
    return permissions.includes('master');
}

const CustomizedComponent = () => (
    <div>
        <h1>This is my forbidden page</h1>
    </div>
);

const Root = ({ route }) => (
    <div>
        <h1><Link to="/">Root</Link></h1>
        {/* child routes won't render without this */}
        {authRenderRoutes(route.routes, true)}
    </div>
);

const Home = ({ route }) => (
    <div style={{padding: '0 20px'}}>
        <h4>1、Auth RenderRoutes Demo</h4>
        <ul>
            <li>
                <Link to="/child/1">Normal Child</Link>
            </li>
            <li>
                <Link to="/child/1/grand-child">Normal GrandChild Component</Link>
            </li>
            <li>
                <Link to="/child/1/grand-child-render">Normal GrandChild Render</Link>
            </li>
            <li>
                <Link to="/child/1/customized-forbidden-page">Customized Forbidden Page</Link>
            </li>
            <li>
                <Link to="/child/1/auth-render-routes">Auth RenderRoutes</Link>
            </li>
            <li>
                <Link to="/child/1/auth-callback-render-routes">AuthCallback RenderRoutes</Link>
            </li>
        </ul>

        <div>
            <div style={{marginTop: '20px'}}>
                <h4>2、Auth MatchRoutes</h4>
            </div>
            <div>
                <div>
                    <h5 onClick={testMatchRoutes}>(1) Normal MatchRoutes</h5>
                    <div style={{padding: '0 20px'}}>
                        <pre>
                            {
                                'const routes = [\n' +
                                '  {\n' +
                                '    component: Root,\n' +
                                '    routes: [\n' +
                                '      {\n' +
                                '        path: "/",\n' +
                                '        exact: true,\n' +
                                '        component: Home\n' +
                                '      },\n' +
                                '      {\n' +
                                '        path: "/child/:id",\n' +
                                '        component: Child,\n' +
                                '        routes: [\n' +
                                '          {\n' +
                                '            path: "/child/:id/grand-child",\n' +
                                '            component: GrandChild\n' +
                                '          }\n' +
                                '        ]\n' +
                                '      }\n' +
                                '    ]\n' +
                                '  }\n' +
                                '];\n'
                            }
                        </pre>
                        <h6>
                            const branch = authMatchRoutes(true, routes, "/child/23");
                        </h6>
                        <div>
                            <img src={normalImg}/>
                        </div>
                    </div>
                </div>

                <div>
                    <h5>(2) Auth MatchRoutes</h5>
                    <div style={{padding: '0 20px'}}>
                        <pre>
                            {
                                'const routes = [\n' +
                                '  {\n' +
                                '    component: Root,\n' +
                                '    routes: [\n' +
                                '      {\n' +
                                '        path: "/",\n' +
                                '        exact: true,\n' +
                                '        component: Home\n' +
                                '      },\n' +
                                '      {\n' +
                                '        path: "/child/:id",\n' +
                                '        component: Child,\n' +
                                '        noAuth: true,\n' +
                                '        routes: [\n' +
                                '          {\n' +
                                '            path: "/child/:id/grand-child",\n' +
                                '            component: GrandChild\n' +
                                '          }\n' +
                                '        ]\n' +
                                '      }\n' +
                                '    ]\n' +
                                '  }\n' +
                                '];\n'
                            }
                        </pre>
                        <h6>
                            const branch = authMatchRoutes(false, routes, "/child/23");
                        </h6>
                        <div>
                            <img src={authImg}/>
                        </div>
                    </div>
                </div>

                <div>
                    <h5>(3) AuthCallback MatchRoutes</h5>
                    <div style={{padding: '0 20px'}}>
                        <pre>
                            {
                                'const routes = [\n' +
                                '        {\n' +
                                '            component: Root,\n' +
                                '            routes: [\n' +
                                '                {\n' +
                                '                    path: "/",\n' +
                                '                    exact: true,\n' +
                                '                    permissions: [],\n' +
                                '                    component: Home\n' +
                                '                },\n' +
                                '                {\n' +
                                '                    path: "/test/:id",\n' +
                                '                    component: Child,\n' +
                                '                    noAuth: true,\n' +
                                '                    permissions: [\'test\'],\n' +
                                '                    routes: [\n' +
                                '                        {\n' +
                                '                            path: "/test/:id/test-child",\n' +
                                '                            component: GrandChild\n' +
                                '                        }\n' +
                                '                    ]\n' +
                                '                },\n' +
                                '                {\n' +
                                '                    path: "/child/:id",\n' +
                                '                    component: Child,\n' +
                                '                    permissions: [\'master\'],\n' +
                                '                    routes: [\n' +
                                '                        {\n' +
                                '                            path: "/child/:id/grand-child",\n' +
                                '                            component: GrandChild\n' +
                                '                        }\n' +
                                '                    ]\n' +
                                '                }\n' +
                                '            ]\n' +
                                '        }\n' +
                                '    ]'
                            }
                        </pre>
                        <pre>
                            {
                                'function authCallback(permissions) {\n' +
                                '    return permissions.includes(\'master\');\n' +
                                '}\n'
                            }
                        </pre>
                        <h6>
                            const branch = authCallbackMatchRoutes(authCallback, routes, "/child/23");
                        </h6>
                        <div>
                            <img src={callbackChild}/>
                        </div>

                        <h6>
                            const branch = authCallbackMatchRoutes(authCallback, routes, "/test/23");
                        </h6>
                        <div>
                            <img src={noMatch}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

const Child = ({ route }) => (
    <div>
        <h2>Child</h2>
        {/* child routes won't render without this */}
        {authRenderRoutes(route.routes, true, void 0, { someProp: "these extra props are optional" })}
    </div>
);

const GrandChild = ({ route }) => (
    <div>
        <h3>Grand Child Component</h3>
    </div>
);

const CustomizedPageChild = ({ route }) => (
    <div>
        <h3>Customized Forbidden Page</h3>

        <ul>
            <li>
                <Link to="/child/1/customized-forbidden-page/withoutPermitPage">customized component page</Link>
            </li>
        </ul>

        {/* you could set customized component(class component OR functional component)*/}
        {/*{authRenderRoutes(route.routes, false, CustomizedComponent)}*/}

        {/* child routes won't render without this */}
        {authRenderRoutes(route.routes, false, MyComponent)}
    </div>
);

const AuthChild = ({ route }) => (
    <div>
        <h3>Grand Child Component</h3>

        <h4>AuthRenderRoutes</h4>
        <ul>
            <li>
                <Link to="/child/1/auth-render-routes/authWithPermit">authWithPermit</Link>
            </li>
            <li>
                <Link to="/child/1/auth-render-routes/authWithoutPermit">authWithoutPermit</Link>
            </li>
        </ul>
        {/* child routes won't render without this */}
        {authRenderRoutes(route.routes, false)}
    </div>
);

const AuthCallbackChild = ({ route }) => (
    <div>
        <h3>Grand Child Component</h3>

        <h4>AuthCallbackRenderRoutes</h4>
        <ul>
            <li>
                <Link to="/child/1/auth-callback-render-routes/authCallbackWithPermit">authCallbackWithPermit</Link>
            </li>
            <li>
                <Link to="/child/1/auth-callback-render-routes/authCallbackWithoutPermit">authCallbackWithoutPermit</Link>
            </li>
        </ul>
        {/* child routes won't render without this */}
        {authCallbackRenderRoutes(route.routes, authCallback)}
    </div>
);

const AuthChildWithoutPermit = () => (
    <div>
        <h3>AuthChild without permit</h3>
    </div>
);

const AuthChildWithPermit = () => (
    <div>
        <h3>AuthChild with permit</h3>
    </div>
);

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
                    },
                    {
                        path: "/child/:id/grand-child",
                        component: GrandChild,
                        routes: [
                            {
                                path: "/child/:id/grand-child/authCallbackWithoutPermit",
                                exact: true,
                                permissions: ['test'],
                                component: AuthChildWithoutPermit
                            },
                            {
                                path: "/child/:id/grand-child/authCallbackWithPermit",
                                exact: true,
                                permissions: ['add', 'edit', 'master'],
                                component: AuthChildWithPermit
                            }
                        ]
                    },
                    {
                        path: "/child/:id/customized-forbidden-page",
                        component: CustomizedPageChild,
                        routes: [
                            {
                                path: "/child/:id/customized-forbidden-page/withoutPermitPage",
                                exact: true,
                                component: AuthChildWithoutPermit
                            }
                        ]
                    },
                    {
                        path: "/child/:id/auth-render-routes",
                        component: AuthChild,
                        routes: [
                            {
                                path: "/child/:id/auth-render-routes/authWithoutPermit",
                                exact: true,
                                component: AuthChildWithoutPermit
                            },
                            {
                                path: "/child/:id/auth-render-routes/authWithPermit",
                                exact: true,
                                noAuth: true,
                                component: AuthChildWithPermit
                            }
                        ]
                    },
                    {
                        path: "/child/:id/auth-callback-render-routes",
                        component: AuthCallbackChild,
                        routes: [
                            {
                                path: "/child/:id/auth-callback-render-routes/authCallbackWithoutPermit",
                                exact: true,
                                permissions: ['test'],
                                component: AuthChildWithoutPermit
                            },
                            {
                                path: "/child/:id/auth-callback-render-routes/authCallbackWithPermit",
                                exact: true,
                                permissions: ['add', 'edit', 'master'],
                                component: AuthChildWithPermit
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

render(
    <BrowserRouter basename={'/react-auth-router-config'}>
        {authRenderRoutes(routes, true)}
    </BrowserRouter>,
    document.getElementById('root'));
