import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Collapse, Button } from 'react-bootstrap';
import { currentMenu } from 'Actions/admin/actionAdmin';

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.props.currentMenu('users');
        this.state = {
            checkedValue: true,
            collapse: true,
            width: '16.6%',

            hideClassName: 'fa fa-angle-left fa-2x',

            iconFilters: 'fa fa-bars',
            iconFilter1: 'fa fa-hand-spock-o',
            iconFilter2: 'fa fa-university',
            iconFilter3: 'fa fa-link',
            iconFilter4: 'fa fa-tasks',
            iconFilter5: 'fa fa-sign-in',
            iconFilter6: 'fa fa-tasks',
            iconFilter7: 'fa fa-tasks',

            nameFilters: 'Меню',
            nameFilter1: 'Типы услуг',
            nameFilter2: 'Компании',
            nameFilter3: 'Пользователи РГ портала',
            nameFilter4: 'РГ портала',
            nameFilter5: 'Пользователи',
            nameFilter6: 'РГ банка',
            nameFilter7: 'Заявки',

        };
        this.handleCheckedMenu = this.handleCheckedMenu.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    handleCheckedMenu() {
        this.setState({
            checkedValue: !this.state.checkedValue,
        });

        if (this.state.checkedValue == true) {
            this.setState({
                width: '16.6%',

                hideClassName: 'fa fa-angle-left fa-2x',

                nameFilters: 'Меню',
                nameFilter1: 'Типы услуг',
                nameFilter2: 'Компании',
                nameFilter3: 'Пользователи РГ портала',
                nameFilter4: 'РГ портала',
                nameFilter5: 'Пользователи',
                nameFilter6: 'РГ банка',
                nameFilter7: 'Заявки',

            });
        }
        else {
            this.setState({
                width: '40px',

                hideClassName: 'fa fa-angle-right fa-2x',

                nameFilters: '',
                nameFilter1: '',
                nameFilter2: '',
                nameFilter3: '',
                nameFilter4: '',
                nameFilter5: '',
                nameFilter6: '',
                nameFilter7: '',

            });
        }
    }
    handleChecked() {
        // заглушка
    }
    hendleMenu(value, num) {
        this.props.currentMenu(value);
        this.props.activeFilter(num);
        this.setState({});
    }
    render() {
        // Ширина меню
        const width = { width: this.state.width };

        return (
            <div className="leftMenu" style={width}>
                <div className="menuFilters">
                    <Button onClick={this.toggle}><i className={this.state.iconFilters}></i>{' '}{this.state.nameFilters}</Button>
                    <Collapse in={this.state.collapse}>
                        <Nav bsStyle="pills">
                            <NavItem eventKey={2} href="#" className={this.props.transp.left_menu.filter3} onClick={this.hendleMenu.bind(this, 'company', 2)}><i className={this.state.iconFilter2}></i>{' '}{this.state.nameFilter2}</NavItem>
                            <NavItem eventKey={5} href="#" className={this.props.transp.left_menu.filter1} onClick={this.hendleMenu.bind(this, 'users', 0)} ><i className={this.state.iconFilter5}></i>{' '}{this.state.nameFilter5}</NavItem>
                            <NavItem eventKey={3} href="#" className={this.props.transp.left_menu.filter4} onClick={this.hendleMenu.bind(this, 'usertowg', 3)}><i className={this.state.iconFilter3}></i>{' '}{this.state.nameFilter3}</NavItem>
                            <NavItem eventKey={6} href="#" className={this.props.transp.left_menu.filter6} onClick={this.hendleMenu.bind(this, 'wgbank', 5)} ><i className={this.state.iconFilter6}></i>{' '}{this.state.nameFilter6}</NavItem>
                            <NavItem eventKey={4} href="#" className={this.props.transp.left_menu.filter5} onClick={this.hendleMenu.bind(this, 'wg', 4)}><i className={this.state.iconFilter4}></i>{' '}{this.state.nameFilter4}</NavItem>
                            <NavItem eventKey={1} href="#" className={this.props.transp.left_menu.filter2} onClick={this.hendleMenu.bind(this, 'st', 1)}><i className={this.state.iconFilter1}></i>{' '}{this.state.nameFilter1}</NavItem>

                            <NavItem eventKey={7} href="#" onClick={this.hendleMenu.bind(this, 'orderlist', 6)}><i className={this.state.iconFilter7}></i>{' '}{this.state.nameFilter7}</NavItem>

                        </Nav>
                    </Collapse>
                </div>
                <label>
                    <div className="hideLeftMenu">
                        <input type="checkbox"
                            checked={this.state.checkedValue}
                            onClick={this.handleCheckedMenu}
                            onChange={this.handleChecked}
                        />
                        {<i className={this.state.hideClassName}></i>}
                    </div>
                </label>

            </div>
        );
    }
}

export default connect(
    state => ({
        transp: state
    }),
    dispatch => ({
        currentMenu: (value) => {
            dispatch(currentMenu(value));
        },
        activeFilter: (num) => {
            dispatch({ type: 'FILETER_ACTIVE', data: num })
        },
    })
)(LeftMenu);
