import { http } from '../api/http'
export default {
    data() {
        return {
            globalRoot: {},
            globalFroot: {}
        }
    },
    created() {
        this.getRemain()
    },
    methods: {
        getRemain() {
            http("/manager/fetchAgentLaveFunCode", "get", {
                rootType: "1"
            }).then(res => {
                this.globalRoot = res;
            });
            http("/manager/fetchAgentLaveFunCode", "get", {
                rootType: "2"
            }).then(res => {
                this.globalFroot = res;

            });
        }
    }
}