import axios from 'axios';
import { showAlert } from './alert';

export const createData = async data => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/v1/properties',
            headers: {'Content-Type': 'multipart/form-data' },
            data,
        });

        if(res.data.status==='success'){
            showAlert('success','Property Created Successfully');
        }
        console.log(res.data);
    }
    catch(err){
        showAlert('error',err.response.data.message);
        console.log(err.response.data.message);
    }
}
