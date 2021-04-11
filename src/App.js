import React, {Component} from 'react';
import MyHeader from "./components/MyHeader";
import MySider from "./components/MySider";
import MyContent from "./components/MyContent";
import './app.less'

class App extends Component {
    render() {
        return (
            <div className='app'>
                <MyHeader></MyHeader>
                <section className='main'>
                    <MySider></MySider>
                    <MyContent></MyContent>
                </section>
            </div>
        )
    }

    /*render() {
        return (
            <div className='app'>
                <MyHeader></MyHeader>
                <section className='main'>
                    <MySider></MySider>
                    <MyContent></MyContent>
                </section>
            </div>
        );
    }*/
}

export default App;
