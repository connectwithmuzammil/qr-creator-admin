import apis from "../../services";
import {createAsyncThunk} from "@reduxjs/toolkit";

/***********    USER REDUX APIS     ***********/
const userLogin = createAsyncThunk("Users Login", async (body) => apis.authLogin(body));
const getProfile = createAsyncThunk("Get Profile", async (id) => apis.getProfile(id));

/***********    WALLET REDUX APIS     ***********/
const getWallet = createAsyncThunk('Get Wallet Data', async (id) => await apis.getWallet(id));

/***********    STORE REDUX APIS     ***********/
// const getStoreCount = createAsyncThunk("GET Stores Count", async() => await apis.getStoreCount());
const getOneStore = createAsyncThunk("GET Store data", async (id) => await apis.getStoreDetails(id));
const getAllStore = createAsyncThunk("GET All Store data", async (id) => await apis.getStores(id));

/***********    ADMIN USER REDUX APIS     ***********/
const adminLogin = createAsyncThunk('Admin Login', async (body) => apis.adminLogin(body));

const reduxApis = {userLogin, getProfile, getWallet, adminLogin, getOneStore, getAllStore}


export default reduxApis