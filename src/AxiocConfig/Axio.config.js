import axios from 'axios';

const ApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfa2V5IjoiYmFzZTY0OlZtRmtjUXZKK1AyYWZCQW9TcmRlSmVOMjVCWE56alBlZGJVaWxlMTVISE09IiwiaXNzIjoiaHR0cDovL2Ntcy5pdmVyc29mdC5jYSIsImlhdCI6MTYxMTA4NzYyNCwiZXhwIjoxNjExMTE2NDI0LCJuYmYiOjE2MTEwODc2MjQsImp0aSI6IjZWVUU5cDJhVWN3VXpBV3UifQ.OCa6XhRZ5OhQ7H-XgI4WgwWM0rsmBk5GZnfa8zGJAkc';
const authKey = localStorage.getItem('authenticationToken') || ApiKey;
const instance = axios.create({
    baseURL: '/',
    headers: {        
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authKey}`        
    }
});

export default instance;