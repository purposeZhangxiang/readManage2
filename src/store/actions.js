import { login, http } from '../api/http.js'
import router from '../router/router'
import state from "./state";

export default {
    /**
     * @method login 登录逻辑
     * @method
     */
    login(store, param) {
        login("/manager/login", "post", param).then(res => {
            sessionStorage.setItem("token", res.token);
            router.push("/home");
        });
    },
    alert() {
        alert('调用actions');
        console.log(state)
    }
}