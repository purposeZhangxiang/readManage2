import { http } from '../api/http'
export default {
    data() {
        return {
            globalRoot: {},
            globalFroot: {},
            globalRootRemain: 0,
            globalFrootRemain: 0
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
                this.computedRoot()
            });
            http("/manager/fetchAgentLaveFunCode", "get", {
                rootType: "2"
            }).then(res => {
                this.globalFroot = res;
                this.computedFroot()
            });
        },
        computedRoot() {
            let sum = 0;
            for (let index in this.globalRoot) {
                sum += this.globalRoot[index].codeData.remain;
            }
            this.globalRootRemain = sum;
        },
        computedFroot() {
            let sum = 0;
            for (let index in this.globalFroot) {
                sum += this.globalFroot[index].codeData.remain;
            }
            this.globalFrootRemain = sum;

        }
    }
}