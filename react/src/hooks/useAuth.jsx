import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL, //url до сервера авторизации
  realm: import.meta.env.VITE_KEYCLOAK_REALM, // название realm
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT, // название клиента
});



const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;
