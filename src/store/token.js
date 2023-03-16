import { defineStore } from 'pinia'
import {computed, ref} from "vue";
export const useCounterStore = defineStore('mytoken', () => {
// ref 相当于 state
    const tokenJson = ref("")
// computed 相当于 getters
    const token = computed (() => {
        try {
            return JSON.parse(tokenJson.value ||
                window.localStorage.getItem("TokenInfo") ||
                "{}")
        } catch (err) {
            //EIMessage.error("josn字符串格式不对,转化对象时失败..")
            window.localStorage.setItem("TokenInfo","")
            console.log(err)
        }
    })
    //function 相当于 actions
    function saveToken(data) {
        tokenJson.value = data
        window.localStorage.setItem("TokenInfo",data)
    }
    //相外暴露
    return {token,saveToken}
})
