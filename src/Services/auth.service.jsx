import Axios from "axios";

export function login(credentials) {
    let url = "http://candidates-dev.us-east-1.elasticbeanstalk.com/login";

    return Axios.post(url, credentials)
}

export function signup(credentials) {
  let url = "http://candidates-dev.us-east-1.elasticbeanstalk.com/users";

  return Axios.post(url, credentials)
}


export function getUsers(token){
    let url = "http://candidates-dev.us-east-1.elasticbeanstalk.com/users"

    return Axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
}