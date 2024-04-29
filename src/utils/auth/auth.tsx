
import API from '../../utils/API';

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await API.get('/api/token/verify');
        if(response.data.ok){
            return true;
        }
        else{
            return false; 
        }
    } catch (err) {
        return false;
    }
  };
  