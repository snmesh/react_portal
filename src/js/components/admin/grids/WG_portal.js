import React, { Component } from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { saveCompanyToWG, currentMenu, deleteCompanyToWG, saveUserToWG, deleteUserToWG, wgincomapny, userinwg, stName } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';
import { setTimeout } from 'timers';

class Conformity extends Component {
    create_new_comp_to_wg() {
        this.props.create_new_comp_to_wg();
    }
    closeModal() {
        this.props.show_comp_to_wg();
    }
    onRowClick(row) {
        this.props.edit_comp_to_wg(row);
    }
    showOldWg(e) {
        let companyname = this.props.store.companytowgAdmin.comp_to_wg.companyname;
        if (companyname === '' || companyname === '---') {
            alert("Компания не выбрана!");
        }
        else {
            this.props.showOldWg(companyname);
        }
    }
    set_company_comp_to_wg(e) {
        let company_id = (() => {
            for (let key in this.props.store.company.company) {
                if (this.props.store.company.company[key].companyname === e.target.value) {
                    return this.props.store.company.company[key].company_id;
                }
            }
        })();
        this.props.set_company_comp_to_wg({ event: e.target.value, data: this.props.store.company.company }, company_id);
    }
    set_wg_comp_to_wg(e) {
        this.props.set_wg_comp_to_wg({ event: e.target.value, data: this.props.store.wg.wg });
    }
    set_wg_input_to_wg() {
        this.props.set_wg_input_to_wg(this.wg_input.value);
    }
    set_wgbank_comp_to_wg(e) {
        this.props.set_wgbank_comp_to_wg({ event: e.target.value, data: this.props.store.wgbank.wgbank });
    }
    saveCompanyToWG() {
        console.log(this.props.store);
        console.log(this.props.store.companytowgAdmin.comp_to_wg);
        let comp_to_wg = this.props.store.companytowgAdmin.comp_to_wg;
        let check_wg_input = false;

        for (let key in comp_to_wg) {
            if (key === 'companyname') {
                if (comp_to_wg[key].length === 0 || comp_to_wg[key] === '---') {
                    alert("Не указана компания");
                    check_wg_input = true;
                    break;
                }
            }
            if (key === 'wg_name') {
                if (comp_to_wg[key].length === 0 || comp_to_wg[key] === '---') {
                    alert("Не указана рабочая группа портала");
                    check_wg_input = true;
                    break;
                }

            }
            if (key === 'bank_wg_name') {
                if (comp_to_wg[key].length === 0 || comp_to_wg[key] === '---') {
                    alert("Не указана рабочая группа банка");
                    check_wg_input = true;
                    break;
                }

            }
        }
        // console.log('На входе',this.props.store.companytowgAdmin.comp_to_wg.company_id,this.props.store.companytowgAdmin.comp_to_wg.wg_id,this.props.store.companytowgAdmin.comp_to_wg.bank_wg_id);
        for (let key in this.props.store.companytowgAdmin.companyToWg) {
            // console.log(this.props.store.companytowgAdmin.companyToWg[key].company_id, this.props.store.companytowgAdmin.companyToWg[key].bank_wg_id,this.props.store.companytowgAdmin.companyToWg[key].companytowg_wg_id);
            if (this.props.store.companytowgAdmin.companyToWg[key].company_id === this.props.store.companytowgAdmin.comp_to_wg.company_id && this.props.store.companytowgAdmin.companyToWg[key].bank_wg_id === this.props.store.companytowgAdmin.comp_to_wg.bank_wg_id && this.props.store.companytowgAdmin.companyToWg[key].companytowg_wg_id === this.props.store.companytowgAdmin.comp_to_wg.wg_id) {
                alert("Указаная связка уже существует");
                check_wg_input = true;
                break;
            } else if (this.props.store.companytowgAdmin.companyToWg[key].bank_wg_id === this.props.store.companytowgAdmin.comp_to_wg.bank_wg_id) {
                alert("Указаная РГ банка уже используется");
                check_wg_input = true;
                break;
            }

        }
        if (!check_wg_input) {
            this.props.saveCompanyToWG(this.props.store.companytowgAdmin.comp_to_wg);
            // this.props.currentMenu();
            this.props.show_comp_to_wg();
        }
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_wg_comp_to_wg({ id: isSelected.companytowg_id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.companytowgAdmin.check_comp_to_wg;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteCompanyToWG(trueArr);
        this.props.uncheck_wg_comp_to_wg();
        // this.props.currentMenu();
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
        return (
            <div>
                <div className='col-lg-12 col-md-12'>
                    <h4>Компания - Рабочая группа</h4>
                    <button className="btn btn-success" onClick={this.create_new_comp_to_wg.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                    <BootstrapTable
                        hover
                        data={this.props.companyToWg.companyToWg}
                        selectRow={selectRow}
                        options={options}
                    >
                        <TableHeaderColumn dataField='companytowg_id' isKey={true} width='10%' filter={{ type: 'TextFilter' }} >ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }} >Компания</TableHeaderColumn>
                        <TableHeaderColumn dataField='wg_name' filter={{ type: 'TextFilter' }} >РГ портала</TableHeaderColumn>
                        <TableHeaderColumn dataField='bankwg_name' filter={{ type: 'TextFilter' }} >РГ банка</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Modal isOpen={this.props.store.companytowgAdmin.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '290px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Компания<span>*</span></span>
                            <select disabled={this.props.store.companytowgAdmin.edit_status} className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.companyname || '---'} onChange={this.set_company_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.company.company.map((item, i) => {
                                        return <option key={i} value={item.companyname}>{item.companyname}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div style={{ display: this.props.store.companytowgAdmin.comp_to_wg.showCheck }} className='col-lg-12 col-md-12 col-sm-12'>
                            <label><input type="checkbox" checked={this.props.store.companytowgAdmin.comp_to_wg.checked_wg} onClick={this.showOldWg.bind(this)} />Показать имеющиеся РГ</label>
                        </div>
                        <div style={{ display: this.props.store.companytowgAdmin.comp_to_wg.addWGinput }} className='col-lg-12 col-md-12 col-sm-12'>
                            <span>РГ портала<span>*</span></span>

                            <input
                                className='form-control'
                                ref={(wg_input) => { this.wg_input = wg_input }}
                                onChange={this.set_wg_input_to_wg.bind(this)}
                                defaultValue={this.props.store.companytowgAdmin.comp_to_wg.wg_name || '---'}
                            />
                        </div>
                        <div style={{ display: this.props.store.companytowgAdmin.comp_to_wg.addWGselect }} className='col-lg-12 col-md-12 col-sm-12'>
                            <span>РГ портала<span>*</span></span>
                            <select className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.wg_name || '---'} onChange={this.set_wg_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.companytowgAdmin.comp_to_wg.list_company.map((item, i) => {
                                        return <option key={i} value={item.wg_name}>{item.wg_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>РГ банка<span>*</span></span>
                            <select className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.bank_wg_name || '---'} onChange={this.set_wgbank_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.wgbank.wgbank.map((item, i) => {
                                        return <option key={i} value={item.wg_name}>{item.wg_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveCompanyToWG.bind(this)}>Сохранить</button>
                    </div>
                </Modal>

            </div>

        )
    }
}
export default connect(
    state => ({
        store: state,
        companyToWg: state.companytowgAdmin,
        // userToWg: state.usertowgAdmin
    }),
    dispatch => ({
        show_comp_to_wg: () => {
            dispatch({ type: 'SHOW_COMP_TO_WG_ADMIN' });
        },
        create_new_comp_to_wg: () => {
            dispatch({ type: 'CREATE_COMP_TO_WG_ADMIN' });
        },
        edit_comp_to_wg: (company) => {
            dispatch({ type: 'EDIT_COMP_TO_WG_ADMIN', data: company });
            dispatch(wgincomapny(company.company_id));
        },
        set_company_comp_to_wg: (company, company_id) => {
            dispatch({ type: 'SET_COMPANY_COMP_TO_WG_ADMIN', data: company });
            if (company_id !== undefined) { dispatch(wgincomapny(company_id)); }
        },
        set_wgbank_comp_to_wg: (wgbank) => {
            dispatch({ type: 'SET_WGBANK_COMP_TO_WG_ADMIN', data: wgbank });
        },
        set_wg_comp_to_wg: (wg) => {
            dispatch({ type: 'SET_WG_COMP_TO_WG_ADMIN', data: wg });
        },
        set_wg_input_to_wg: (wg_input) => {

            dispatch({ type: 'SET_WG_INPUT_COMP_TO_WG_ADMIN', data: wg_input });
        },
        check_wg_comp_to_wg: (company) => {
            dispatch({ type: 'CHECK_COMP_TO_WG_ADMIN', data: company });
        },
        uncheck_wg_comp_to_wg: () => {
            dispatch({ type: 'UNCHECK_COMP_TO_WG_ADMIN' });
        },
        showOldWg: () => {
            dispatch({ type: 'SHOW_OLD_WG_COMP_TO_WG_ADMIN' });
        },
        saveCompanyToWG: (company) => {
            dispatch(saveCompanyToWG(company));
            // dispatch(currentMenu('wg'));
        },
        deleteCompanyToWG: (company) => {
            dispatch(deleteCompanyToWG(company));
        },
        // currentMenu: () => {
        //     dispatch(currentMenu('wg'));
        // }
    })
)(Conformity);