import { tLightMode } from "../contexts/SystemContext";

//KEYS
export const LS_LIGHT_MODE_KEY = "LIGHT_MODE";

const myStorage = {
    userPreferences: {
        setLightMode: (lightMode: tLightMode) => {
            localStorage.setItem(LS_LIGHT_MODE_KEY, lightMode);
        },
        getLightMode: (): tLightMode => {
            const unknowMode = localStorage.getItem(LS_LIGHT_MODE_KEY);
            const possibleValues: tLightMode[] = ["dark", "light"];

            if (possibleValues.includes(unknowMode as tLightMode)) return unknowMode as tLightMode;
            else return "light";
        },
    },
};

export default myStorage;
