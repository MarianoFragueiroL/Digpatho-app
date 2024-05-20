export const allUrl ={
    homeUrl : '/',
    loginUrl : '/auth/login',
    uploadki67 : '/ki67/uploadki67',
    logoutUrl : '/auth/login',
    profileUrl : '/auth/userdetails',
    bkUpdateUserProfile: '/api/users/me/',
    bkUpdateki67ImageData: '/api/ki67/imagedata/',
    bkProcesski67ImageData: '/api/ki67/processki67',
}

export interface SomePageProps {
    isAuthenticated: boolean;
  }