const initialState = {
    companyToWg: [],
    editModal: false,
    edit_status: false,
    comp_to_wg: {

        type: '',
        id: '',
        companyname: '',
        company_id: '',
        bank_wg_name: '',
        bank_wg_id: '',
        wg_name: '',
        wg_id: '',

        addWGinput: 'none',
        addWGselect: '',

        list_company: [],
        list_wg_bank: [],

        showOldWg: false,
        checked_wg: false,

        showCheck: ''


    },
    check_comp_to_wg: new Map(),
}

export default function companyToWg(state = initialState, action) {

    if (action.type === "CONF_COMPANY_TOWG_ADMIN") {
        state.companyToWg = action.data;
        return {
            companyToWg: action.data,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
        };
    }
    if (action.type === "SHOW_COMP_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: true,
        };
    }
    if (action.type === "CREATE_COMP_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        state.comp_to_wg.showCheck = '';
        state.comp_to_wg.type = 'INSERT';
        state.comp_to_wg.id = '';
        state.comp_to_wg.companyname = '';
        state.comp_to_wg.company_id = '';
        state.comp_to_wg.bank_wg_name = '';
        state.comp_to_wg.bank_wg_id = '';
        state.comp_to_wg.wg_name = '';
        state.comp_to_wg.wg_id = '';

        state.comp_to_wg.addWGinput = '';
        state.comp_to_wg.addWGselect = 'none';
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            edit_status: false,
            check_comp_to_wg: state.check_comp_to_wg,
        };
    }
    if (action.type === "EDIT_COMP_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        state.comp_to_wg.type = 'UPDATE';
        state.comp_to_wg.showCheck = 'none';
        state.comp_to_wg.id = action.data.companytowg_id;
        state.comp_to_wg.companyname = action.data.companyname;
        state.comp_to_wg.company_id = action.data.company_id;
        state.comp_to_wg.bank_wg_name = action.data.bankwg_name;
        state.comp_to_wg.bank_wg_id = action.data.bank_wg_id;
        state.comp_to_wg.wg_name = action.data.wg_name;
        state.comp_to_wg.wg_id = action.data.companytowg_wg_id;

        state.comp_to_wg.addWGinput = 'none';
        state.comp_to_wg.addWGselect = '';
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            edit_status: true,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
        };
    }
    if (action.type === "SET_COMPANY_COMP_TO_WG_ADMIN") {
        if (action.data.event === '---') { state.comp_to_wg.checked_wg = false; state.comp_to_wg.list_company = [] }
        state.comp_to_wg.companyname = action.data.event;
        state.comp_to_wg.company_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].companyname === action.data.event) {
                    return action.data.data[key].company_id;
                }
            }
        })();
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        };
    }
    if (action.type === "SET_WGBANK_COMP_TO_WG_ADMIN") {
        state.comp_to_wg.bank_wg_name = action.data.event;
        state.comp_to_wg.bank_wg_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].wg_name === action.data.event) {
                    return action.data.data[key].id;
                }
            }
        })();
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        };
    }
    if (action.type === "SET_WG_COMP_TO_WG_ADMIN") {
        state.comp_to_wg.wg_name = action.data.event;
        state.comp_to_wg.wg_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].wg_name === action.data.event) {
                    return action.data.data[key].id;
                }
            }
        })();
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        };
    }
    if (action.type === "SET_WG_INPUT_COMP_TO_WG_ADMIN") {
        state.comp_to_wg.wg_name = action.data;
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        };
    }
    if (action.type === "SET_COMP_LIST_TO_WG_ADMIN") {
        state.comp_to_wg.list_company = action.data;
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        };
    }
    if (action.type === "CHECK_COMP_TO_WG_ADMIN") {
        state.check_comp_to_wg.set(action.data.id, action.data.status);
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        }
    }
    if (action.type === "SHOW_OLD_WG_COMP_TO_WG_ADMIN") {
        if (state.comp_to_wg.addWGinput === '') {
            state.comp_to_wg.addWGinput = 'none';
            state.comp_to_wg.addWGselect = '';
            state.comp_to_wg.checked_wg = true;
        }
        else {
            state.comp_to_wg.addWGinput = '';
            state.comp_to_wg.addWGselect = 'none';
            state.comp_to_wg.checked_wg = false;
        }
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        }
    }
    if (action.type === "UNCHECK_COMP_TO_WG_ADMIN") {
        state.check_comp_to_wg.clear();
        return {
            companyToWg: state.companyToWg,
            editModal: state.editModal,
            comp_to_wg: state.comp_to_wg,
            check_comp_to_wg: state.check_comp_to_wg,
            edit_status: state.edit_status,
        }
    }
    return state;
}