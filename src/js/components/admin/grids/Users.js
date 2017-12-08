import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, currentMenu, deleteUsers, usergroups } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';
import { DropdownButton, MenuItem, Alert } from "react-bootstrap";

class Users extends Component {
    createUser() {
        this.props.createUser();
    }
    onRowClick(row) {
        this.props.editUser(row);
    }
    closeModal() {
        this.props.showUser();
    }
    setCheckBlock(e) {
        this.props.setCheckBlock(e.target.checked);
    }
    setLogin() {
        this.props.setLogin(this.login.value);
    }
    setPass() {
        this.props.setPass(this.pass.value);
    }
    setDisplayname() {
        this.props.setDisplayname(this.displayname.value);
    }
    setEmail() {
        this.props.setEmail(this.email.value);
    }
    setCompany(e) {
        let id;
        for (var key in this.props.store.company.company) {
            if (this.props.store.company.company[key].companyname === e.target.value) {
                id = this.props.store.company.company[key].company_id;
                break;
            }
        }
        this.props.setCompanyUser({ id: id, companyname: e.target.value });
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.checkUser({ id: isSelected.id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.users.check_users;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteUsers(trueArr);
        this.props.currentMenu();

    }
    saveToDBUser() {
        let check_user_input = false;
        for (var key in this.props.user) {
            if (key !== 'usergroups' && key !== 'type' && key !== 'id') {
                if (key === 'login') {
                    if (this.props.user[key].length < 4) {
                        alert("Логин должен содержать не менее 4 символов");
                        check_user_input = true;
                        break;
                    }
                    let check_user = false;
                    for (let key2 in this.props.store.users.users) {
                        if (this.props.store.users.users[key2].username.toUpperCase() === this.props.user[key].toUpperCase()) {
                            check_user = true;
                            break;
                        }
                    }
                    if (check_user && this.props.user.type === 'INSERT') { alert("Пользователь с указаным лоигном уже существует"); check_user_input = true; break; }
                }
                if (key === 'pass') {
                    if (this.props.user[key] !== null) {
                        if (this.props.user.type === 'INSERT' && this.props.user[key].length === 0) {
                            alert("Не заполнено поле 'пароль'");
                            check_user_input = true;
                            break;
                        }
                        if (this.props.user[key].length >= 1 && this.props.user[key].length < 5) {
                            alert("Длина пароля должна быть не менее 5 символов");
                            check_user_input = true;
                            break;
                        }
                    }
                }
                if (key === 'displayname' && this.props.user[key].length === 0) { alert("Не заполнено поле 'Отображаемое имя'"); check_user_input = true; break; }
                if (key === 'email') {
                    if (this.props.user[key].length === 0) { alert("Не заполнено поле 'email'"); check_user_input = true; break; }
                    let email = this.props.user[key].split('@');
                    if (email.length > 1) {
                        if (email[1] === '') { alert("Поле 'email' заполнено не корректно"); check_user_input = true; break; }
                        let domen = email[1].split('.');
                        if (domen.length === 1 || domen[1] === '') { alert("Поле 'email' заполнено не корректно"); check_user_input = true; break; }
                    }
                }
                if (key === 'companyname') {
                    if (this.props.user[key] === null) { alert("Не выбрана 'Компания'"); check_user_input = true; break; }
                    if (this.props.user[key].length === 0) { alert("Не выбрана 'Компания'"); check_user_input = true; break; }

                }
            }
        }
        if (!check_user_input) {
            this.props.saveUser(this.props.user);
            this.props.currentMenu();
            this.props.showUser();
        }
    }
    formatDate(cell, row) {
        var date = new Date(Number(cell) * 1000);
        var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
        var min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
        var month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
        var year = date.getFullYear();
        var formated_date = day + "-" + month + "-" + year + " " + hours + ":" + min;
        return formated_date;
    }
    statusFormatter(cell, row) {
        if (cell === 1) { return 'Активный' }
        else { return 'Блокирован'; }
    }

    render() {
        const options = {
            sizePerPage: 10,
            onRowClick: this.onRowClick.bind(this),
        };
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect.bind(this),
            onSelectAll: this.handleRowSelect.bind(this)
        };
        const usergroups = this.props.user.usergroups.map((item, i) => {
            return item.wg_name;
        }).join('\n');
        // console.log(this.props.store);
        return (
            <div className='col-lg-12 col-md-12'>
                <button className="btn btn-success" onClick={this.createUser.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.users.users}
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn dataField='id' width='12%' isKey={true} filter={{ type: 'TextFilter' }} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' filter={{ type: 'TextFilter' }} >Логин</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataFormat={this.statusFormatter.bind(this)} filter={{ type: 'TextFilter' }}>Статус</TableHeaderColumn>
                    <TableHeaderColumn dataField='displayname' width='15%' filter={{ type: 'TextFilter' }}>Отображаемое имя</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' filter={{ type: 'TextFilter' }}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='created_at' width='20%' dataFormat={this.formatDate.bind(this)} filter={{ type: 'TextFilter' }}>Создан</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }}>Компания</TableHeaderColumn>
                </BootstrapTable>

                <Modal isOpen={this.props.users.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '440px' } }}
                >
                    <div id="headerUsersAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <label>Блокирован <input type="checkbox" checked={this.props.user.block} onChange={this.setCheckBlock.bind(this)} /></label>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Логин<span>*</span></span>
                            <input type='text'
                                value={this.props.user.login}
                                className='form-control'
                                ref={(login) => { this.login = login }}
                                onChange={this.setLogin.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Пароль<span>*</span></span>
                            <input type='password'
                                value={this.props.user.pass}
                                className='form-control'
                                ref={(pass) => { this.pass = pass }}
                                onChange={this.setPass.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Отображаемое имя<span>*</span></span>
                            <input type='text'
                                value={this.props.user.displayname}
                                className='form-control'
                                ref={(displayname) => { this.displayname = displayname }}
                                onChange={this.setDisplayname.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Email<span>*</span></span>
                            <input type='email'
                                value={this.props.user.email}
                                className='form-control'
                                data-toggle="validator"
                                ref={(email) => { this.email = email }}
                                onChange={this.setEmail.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Компания<span>*</span></span>
                            <select className='form-control' value={this.props.user.companyname || '---'} onChange={this.setCompany.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.company.company.map((item, i) => {
                                        return <option key={i} value={item.companyname}>{item.companyname}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-lg-9 col-md-12 col-sm-12'>
                            <span>Рабочие группы пользователя</span>
                            <textarea
                                disabled
                                rows="3"
                                cols="20"
                                name="text"
                                value={this.props.user.usergroups.map((item, i) => { return item.wg_name; }).join('\n') || ''}>
                            </textarea>
                        </div>
                    </div>
                    <button id="saveModal" className="btn btn-primary" onClick={this.saveToDBUser.bind(this)}>Сохранить</button>
                </Modal>

            </div>

        )
    }
}
export default connect(
    state => ({
        store: state,
        users: state.users,
        user: state.users.user
    }),
    dispatch => ({
        showUser: () => {
            dispatch({ type: 'SHOW_USER_ADMIN' });
        },
        setCheckBlock: (check) =>{
            dispatch({ type: 'SET_BLOCK_USER_ADMIN', data: check })
        },
        setLogin: (login) => {
            dispatch({ type: 'SET_LOGIN_USER_ADMIN', data: login })
        },
        setPass: (pass) => {
            dispatch({ type: 'SET_PASS_USER_ADMIN', data: pass })
        },
        setDisplayname: (dn) => {
            dispatch({ type: 'SET_DN_USER_ADMIN', data: dn })
        },
        setEmail: (email) => {
            dispatch({ type: 'SET_EMAIL_USER_ADMIN', data: email })
        },
        createUser: () => {
            dispatch({ type: 'CREATE_USER_ADMIN' });
        },
        editUser: (user) => {
            dispatch({ type: 'EDIT_USER_ADMIN', data: user });
            dispatch(usergroups(user.id));
        },
        setCompanyUser: (company) => {
            dispatch({ type: 'SET_COMPANY_USER_ADMIN', data: company });
        },
        checkUser: (user) => {
            dispatch({ type: 'CHECK_USER_ADMIN', data: user });
        },
        saveUser: (user) => {
            dispatch(saveUser(user));
            dispatch(currentMenu('users'));
        },
        deleteUsers: (users) => {
            dispatch(deleteUsers(users));
        },
        currentMenu: () => {
            dispatch(currentMenu('users'));
        }
    })
)(Users);