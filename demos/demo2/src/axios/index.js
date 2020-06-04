import JsonP from 'jsonp';
import axios from 'axios'
import { Modal } from 'antd';
import Utils from '../utils/utils';

class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, (err, response) => {
                if (response.status === 'success') {
                    return resolve(response);
                } else {
                    return reject(response.message);
                }
            })
        });
    }
    // static ajax(options){
    //     let baseURL = `http://yapi.demo.qunar.com/mock/80318`;
    //     return new Promise((resolve, reject) => {
    //     axios({
    //             baseURL: baseURL,
    //             method: 'get',
    //             url: options.url,
    //             timeout: 5000,
    //             params: (options.data && options.data.params) ? options.data.params : ''
    //         }).then(response => {
    //             if (response.status == '200'){
    //                 if (response.data.code == 0) {
    //                     resolve(response.data);
    //                 }else {
    //                     Modal.info({
    //                         title: '提示',
    //                         content: response.data.msg
    //                     })
    //                 }
    //             }else {
    //                 reject(response.data);
    //             }
    //         })
    //     });
    // }


    static requestList(_this, url, params) {
        var data = { params };
        this.ajax({
            url,
            data
        }).then(res => {
            let list = res.result.itermList.map((item, index) => {
                item.key = index;
                return item;
            });
            _this.setState({
                list,
                pagination: Utils.pagination(res, current => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        }).catch(error => {
            throw new Error(error);
        });
    }
    static ajax(options) {
        let baseURL = "https://www.fastmock.site/mock/adf2114f61bec557d244bd064dd0b5d3/fastmock";
        return new Promise((resolve, reject) => {
            axios({
                baseURL: baseURL,
                method: 'get',
                url: options.url,
                timeout: 5000,
                params: (options.data && options.data.params) ? options.data.params : ''
            }).then(response => {
                if (response.status == '200') {
                    if (response.data.code == 0) {
                        resolve(response.data);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: response.data.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}

export default Axios;