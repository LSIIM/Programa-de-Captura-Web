import { tLightMode } from "../contexts/SystemContext";
import * as yup from "yup";

//KEYS
export const LIGHT_MODE_KEY = "LIGHT_MODE";
export const TOKENS_KEY = "TOKENS";

const myStorage = {
    userPreferences: {
        setLightMode: (lightMode: tLightMode) => {
            localStorage.setItem(LIGHT_MODE_KEY, lightMode);
        },
        getLightMode: (): tLightMode => {
            const themeMode: unknown = localStorage.getItem(LIGHT_MODE_KEY);
            const possibleValues: tLightMode[] = ["dark", "light"];

            if (possibleValues.includes(themeMode as tLightMode)) return themeMode as tLightMode;
            else return "light";
        },
    },
    userSession: {
        saveTokens: (tokens: { access: string; refresh: string }) => {
            localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
        },
        getTokens: () => {
            const unknownTokens = JSON.parse(localStorage.getItem(TOKENS_KEY) ?? "{}");

            const validTokensSchema: yup.ObjectSchema<{ access: string; refresh: string }> = yup.object({
                access: yup.string().required(),
                refresh: yup.string().required(),
            });

            const validTokens = validTokensSchema.validateSync(unknownTokens);
            return validTokens;
        },
        clearTokens: () => {
            localStorage.removeItem(TOKENS_KEY);
        }
    },
};

export default myStorage;
