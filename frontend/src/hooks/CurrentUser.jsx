import { useEffect } from "react"
import axios from 'axios'
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../store/reducer/UserSlice"


const getCurrentUser = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user)
    useEffect(()=>{
        const fetchUser = async () =>{
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser