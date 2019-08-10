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
            // store.commit("setNav",res.level)
            console.log(res)
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("level", res.level);
            router.push("/home");
        });
    },
}