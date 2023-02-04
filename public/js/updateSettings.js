import axios from 'axios';
import { showAlert } from './alert';

export const updateData = async (data,type)=>{
    try{
        const url = type === 'password' ? '/api/v1/users/updatemypassword' : '/api/v1/users/updateme';

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if(res.data.status==='success'){
            showAlert('success','Data Updated Successfully');
            if (type =="cpin" || type=="coins"){
                location.assign("/account")
            }
        }
    }
    catch(err){
        showAlert('error',err.response.data.message);
        console.log(err.response.data.message);
    }
}
  
