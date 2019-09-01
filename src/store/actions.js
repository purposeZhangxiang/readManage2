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
            sessionStorage.setItem("level", res.level);
            sessionStorage.setItem("username", res.user)
            if (res.level == 2) {
                sessionStorage.setItem("id", res.id)
            }
            router.push("/home");
        });
    },
}