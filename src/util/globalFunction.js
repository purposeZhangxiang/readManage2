export default {
    binary(arr) {
        arr.sort((x, y) => x - y);
        for (let i = 0; i < 8; i++) {
            arr[i] !== i + 1 ? arr.splice(i, 0, 0) : arr.splice(i, 1, 1);
        }
        return arr.reverse().join("");
    },
    original(str) {
        if (!str) {
            return;
        }
        let creatArr = str.split("").reverse();
        let originalData = [];
        for (let index in creatArr) {
            if (creatArr[index] != "0") {
                originalData.push(Number(index) + 1)
            }
        }
        return originalData;
    }
}