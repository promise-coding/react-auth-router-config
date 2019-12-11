import React from 'react';
import { matchPath, Router, Switch, Route } from 'react-router';
import {_extends,isFunction} from './util';

const ForbiddenPage = () => (
    <div>
        <h3>403 Forbidden!</h3>
    </div>
);

function authMatchRoutes(hasPermission = true, routes, pathname,
                     /*not public API*/
                     branch) {
    if (branch === void 0) {
        branch = [];
    }

    routes && routes.some(function (route) {
        let match = route.path ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
            : Router.computeRootMatch(pathname); // use default "root" match
        // default each route should be authenticated
        let noAuth = route.noAuth ? route.noAuth : false;

        if (match) {
            if (noAuth || (match && !noAuth && hasPermission)) {
                branch.push({
                    route: route,
                    match: match
                });
            }

            if (route.routes) {
                authMatchRoutes(hasPermission, route.routes, pathname, branch);
            }
        }

        return (noAuth || (!noAuth && hasPermission)) ? match : null;
    });
    return branch;
}

function _judgeRender(noAuth, hasPermission, props, extraProps, route) {
    return noAuth ? route.render(_extends({}, props, {}, extraProps, {route: route})) :
        (hasPermission ? route.render(_extends({}, props, {}, extraProps, {route: route}))
            : <ForbiddenPage/>);
}

function authRenderRoutes(routes, hasPermission, forbiddenPage = ForbiddenPage, extraProps, switchProps) {
    if (extraProps === void 0) {
        extraProps = {};
    }

    if (switchProps === void 0) {
        switchProps = {};
    }

    if (!forbiddenPage) {
        forbiddenPage = ForbiddenPage;
    }

    return routes ? React.createElement(Switch, switchProps, routes.map(function (route, i) {
        // default each route should be authenticated
        let noAuth = route.noAuth ? route.noAuth : false;

        return React.createElement(Route, {
            key: route.key || i,
            path: route.path,
            exact: route.exact,
            strict: route.strict,
            render: function render(props) {
                return route.render ? _judgeRender(noAuth, hasPermission, props, extraProps, route) :
                    React.createElement(noAuth ? route.component : (hasPermission ? route.component : forbiddenPage),
                    hasPermission ? _extends({}, props, extraProps, {route: route}) : {});
            }
        });
    })) : null;
}


function _authenticate(authCallback, route) {
    if (route.permissions && Array.isArray(route.permissions)) {
        if (authCallback && isFunction(authCallback)) {
            return authCallback(route.permissions);
        }
    }

    return true;
}

function _authPermission(authCallback, forbiddenPage, props, extraProps, route) {
    let authResult = _authenticate(authCallback, route);

    if (route.render) {
        return authResult ? route.render(_extends({}, props, {}, extraProps, {
            route: route
        })) : <ForbiddenPage/>;
    } else {
        return React.createElement(authResult ? route.component : forbiddenPage,
            authResult ? _extends({}, props, extraProps, {route: route}) : {});
    }
}

function authCallbackRenderRoutes(routes, authCallback,
                                  forbiddenPage = ForbiddenPage,
                                  extraProps, switchProps) {

    if (extraProps === void 0) {
        extraProps = {};
    }

    if (switchProps === void 0) {
        switchProps = {};
    }

    if (!forbiddenPage) {
        forbiddenPage = ForbiddenPage;
    }
    return routes ? React.createElement(Switch, switchProps, routes.map(function (route, i) {
        return React.createElement(Route, {
            key: route.key || i,
            path: route.path,
            exact: route.exact,
            strict: route.strict,
            render: function render(props) {
                return _authPermission(authCallback, forbiddenPage, props, extraProps, route);
            }
        });
    })) : null;
}

function authCallbackMatchRoutes(authCallback, routes, pathname,
                         /*not public API*/
                         branch) {
    if (branch === void 0) {
        branch = [];
    }

    routes.some(function (route) {
        let match = route.path ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
            : Router.computeRootMatch(pathname); // use default "root" match

        let authResult = _authenticate(authCallback, route);
        if (match) {
            if (authResult) {
                branch.push({
                    route: route,
                    match: match
                });
            }

            if (route.routes) {
                authCallbackMatchRoutes(authCallback, route.routes, pathname, branch);
            }
        }

        return authResult ? match : null;
    });
    return branch;
}

export { authMatchRoutes, authCallbackMatchRoutes, authRenderRoutes, authCallbackRenderRoutes };
