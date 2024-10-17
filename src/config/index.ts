export const ENVIRONMENT_TYPE: string = process.env.NEXT_PUBLIC_REACT_APP_ENV!;

console.log("ENVIRONMENT_TYPE", JSON.stringify(ENVIRONMENT_TYPE, null, 2));

interface configInterface {
  baseApiUrl: string;
}

interface mapInterface {
  DEV: configInterface;
  PROD: configInterface;
}

const DEV_CONFIG: configInterface = {
  baseApiUrl: "http://localhost:8081/api/v1",
};

const PROD_CONFIG: configInterface = {
  baseApiUrl: "http://localhost:8081/api/v1",
};

const CONFIG_MAP: mapInterface = {
  DEV: DEV_CONFIG,
  PROD: PROD_CONFIG,
};

const selector = () => {
  switch (ENVIRONMENT_TYPE) {
    case "DEV":
      return CONFIG_MAP.DEV;
    case "PROD":
      return CONFIG_MAP.PROD;
  }
};

export const CONFIG = selector();
