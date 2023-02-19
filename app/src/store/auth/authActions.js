import { api_security, api } from '../../config/axios'

import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_REQUEST,
    AUTH_CLEAR_ERROR,
    SET_CART
} from '../constants';

import localStorageUtil from "../../utils/storage"

export const loginAction = (form) => async (dispatch)=>{
    try{
        dispatch({ type: AUTH_REQUEST})
        
        const {data} = await  api_security.post('/login',form);
        
        localStorageUtil.set(data,'user');
        localStorageUtil.setToken(data.token);

        api.defaults.headers.common['Authorization'] = data.token;
        api_security.defaults.headers.common['Authorization'] = data.token;

        dispatch({ 
            type: AUTH_SUCCESS,
            payload: data
        })

    }catch( error){
        dispatch({
            type:AUTH_FAILED,
            payload: error.response?error.response.data:""
        })
    }
} 

export const setCart = (cart) => async (dispatch)=>{
   
    let mycart = localStorageUtil.get('cart')
    if(!mycart)
        mycart = [] 

    mycart.push(cart)
    localStorageUtil.set(mycart,'cart');

    dispatch({ 
        type: SET_CART,
        payload: mycart
    })
} 

export const removeCart = (cart) => async (dispatch)=>{
   
    let mycart = localStorageUtil.get('cart')
    if(!mycart)
        mycart = [] 

    mycart = mycart.filter(it=>it._id!=cart._id)
    
    localStorageUtil.set(mycart,'cart');

    dispatch({ 
        type: SET_CART,
        payload: mycart
    })
} 

export const setLogin = (data) => async(dispatch) => {

    localStorageUtil.set(data.user,'user');
    localStorageUtil.setToken(data.token);

    api.defaults.headers.common['Authorization'] = data.token;
    api_security.defaults.headers.common['Authorization'] = data.token;

    dispatch({ 
        type: AUTH_SUCCESS,
        payload: data
    })

}

export const logoutAction = () => (dispatch)=>{
        
        localStorageUtil.clearToken();
        localStorageUtil.clear('user');

        api.defaults.headers.common['Authorization'] = null;
        api_security.defaults.headers.common['Authorization'] = null;

        dispatch({ 
            type: AUTH_CLEAR_ERROR,
            payload: null
        })

} 

export const clearErrors = () => async(dispatch)=>{
    dispatch({ type: AUTH_CLEAR_ERROR})
} 