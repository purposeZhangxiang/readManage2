export default {
    binary(arr) {
        arr.sort((x, y) => x - y);
        for (let i = 0; i < 8; i++) {
            arr[i] !== i + 1 ? arr.splice(i, 0, 0) : arr.splice(i, 1, 1);
        }
        return arr.reverse().join("");
    }
}