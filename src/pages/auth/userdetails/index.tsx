
import { useState, FormEvent, useEffect } from 'react';
import { ProfileProps, UserData } from '@/types/login/interfaces';
import API from '../../../utils/API';
import styles from './userdetails.module.css'
import { EyeClosedIcon, EyeOpenIcon } from '@/components/eyeicon';
import { useLoader } from '@/context/LoaderContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import loginAuth from '@/utils/auth/loginAuth';



const UserDetails: NextPage<ProfileProps> = ({ userData }) => {
    const router = useRouter();
    const { setLoading } = useLoader();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<UserData>({
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        password: userData?.password || '',
        email: userData?.email || ''
      });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try{
        setLoading(true);
        const response = await API.put('/api/users/me/',  user);
        setUser({
            first_name: response.data?.first_name || '',
            last_name: response.data?.last_name || '',
            password: response.data?.password || '',
            email: response.data?.email || ''
        });
        setLoading(false);
    } catch (err) {
        setLoading(false);
    } 
  };
  const getUserData = async ()=>{
    try {
        const response = await API('/api/users/me/');
        setUser({
            first_name: response.data?.first_name || '',
            last_name: response.data?.last_name || '',
            password: response.data?.password || '',
            email: response.data?.email || ''
        });
        setLoading(false);
    } catch (err) {
        setLoading(false);
    }
  }

    useEffect(() => {
        getUserData();
    }, [ router, getUserData]);
    return (
    <>
    {user &&(
        <div className='container'>
            <form className='m-3 p-3' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className={styles.formDataContainer+' col-4'}>
                        <label className={styles.formLabel}>Name</label>
                        <input type="text" name="first_name" value={user.first_name ? user.first_name : '' } onChange={handleChange} />
                    </div>
                    <div className={styles.formDataContainer+' col-4'}>
                        <label className={styles.formLabel}>Surname</label>
                        <input type="text" name="last_name" value={user.last_name ? user.last_name : ''} onChange={handleChange} />
                    </div>
                    <div className={styles.formDataContainer+' col-4'}>
                        <label className={styles.formLabel}>Password</label>
                        <input name="password" className={styles.formInput} type={showPassword ? "text" : "password"} 
                            value={user.password} placeholder='password' onChange={handleChange}  />
                            <button type="button" onClick={togglePasswordVisibility} className={styles.togglePasswordButton}>
                            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                            </button>
                    </div>

                    <div className={styles.formDataContainer+' col-4'}>
                        <label className={styles.formLabel}>Email</label>
                        <input type="email" name="email" value={user.email ? user.email : ''} onChange={handleChange} />
                    </div>
                    <div className='m-3'>
                        <button className={styles.buttonLogin} type="submit">Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    )}
    </>
  );
};

export default  loginAuth (UserDetails);
