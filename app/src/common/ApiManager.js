import { BaseUrl } from "./AppSettings";

var ApiManager = {
  callPostApi: async function(apiMethod, obj) {
    var body = JSON.stringify(obj);
    const url = BaseUrl + apiMethod;
    console.log(url);
    console.log(body);
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" //'application/x-www-form-urlencoded',
      },
      body: body
    });
  },

  callPostApiWithToken: async function(apiMethod, obj, token, serialize = 1) {
    var body = JSON.stringify(obj);

    const url = BaseUrl + apiMethod;
    console.log(url);
    console.log(serialize, body);
    return await fetch(url, {
      method: "POST",
      headers: {
        passkey: token,
        "Content-Type": "application/json" //'application/x-www-form-urlencoded',
      },
      body: body
    });
  },

  callGetApiWithToken: async function(
    apiMethod,
    token = "tfwqxdftjrnplfpsbtvzrmcqdtujjlujhgm"
  ) {
    const url = BaseUrl + apiMethod;
    console.log(token,"get url -- ", url);
    return await fetch(url, {
      method: "GET",
      headers: {
        passkey: token,
        "Content-Type": "application/json" //'application/x-www-form-urlencoded',
      }
    });
  },

  callApi: async function(method, obj, token, serialize = 1) {
    var data = await this.callPostApiWithToken(method, obj, token, serialize)
      .then(response => response.json())
      .then(responseJson => {
        //console.log("response from api == ", responseJson);
        return responseJson;
      })
      .catch(error => {
        //console.log(error);
        return error;
      });
    return data;
  },

  callGetApi: async function(method) {
    var data = await this.callGetApiWithToken(method)
      .then(response => response.json())
      .then(responseJson => {
        //console.log("response from api == ", responseJson);
        return responseJson;
      })
      .catch(error => {
        //console.log(error);
        return error;
      });
    return data;
  }
};

module.exports = ApiManager;
