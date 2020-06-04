import JsonP from 'jsonp';
import axios from 'axios'
import { Modal } from 'antd';
class Axios {
    static jsonp(options){
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            },(err, response)=>{
                if (response.status === 'success') {
                    return resolve(response);
                }else {
                    return reject(response.message);
                }
            })
        });
    }
    static ajax(options){
        let baseURL = `http://yapi.demo.qunar.com/mock/80318`;
        return new Promise((resolve, reject) => {
            axios({
                baseURL: baseURL,
                method: 'get',
                url: options.url,
                timeout: 5000,
                param: (options.data && options.data.param) ? options.data.param : ''
            }).then(response => {
                if (response.status == '200'){
                    if (response.data.code == 0) {
                        resolve(response.data.result);
                    }else {
                        Modal.info({
                            title: '提示',
                            content: response.data.msg
                        })
                    }
                }else {
                    reject(response.data);
                }
            })
        });
    }
}

export default Axios;