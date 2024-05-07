
import API from '../API'

export const verifyToken = async (token: string, apiUrl: string = '/api/token/verify'): Promise<boolean> => {
    try {

        const response = await API(apiUrl);
        if (response.data.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
  