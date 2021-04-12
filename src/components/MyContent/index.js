import React, {Component} from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { navList } from "../../common/router";

const routes = []
navList().forEach(father => {
    if (father.children) {
        father.children.forEach(child => {
            routes.push(child)
        })
    } else {
        routes.push(father)
    }

})
export default class MyContent extends Component {

    render() {
        return (
            <Switch>
                {
                    routes.map(route => {
                        return(
                            <Route path={route.to} component={route.component} key={route.name}/>
                        )
                    })
                }
                <Redirect to='/home'/>
            </Switch>
        );
    }
}
