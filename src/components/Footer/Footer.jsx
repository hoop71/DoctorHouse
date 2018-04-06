import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className={'footer' + (this.props.transparent !== undefined ? ' footer-transparent' : '')}>
                <div className={'container' + (this.props.fluid !== undefined ? '-fluid' : '')}>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a>Home</a>
                            </li>
                            <li>
                                <a>Clientes</a>
                            </li>
                            <li>
                                <a>Preyectos</a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {1900 + new Date().getYear()} <a href="/">DoctorHouse</a>, made with{' '}
                        <i className="fa fa-fire fire" /> <a href="mhooper72.com">mhooper72</a>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
