import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseCookies } from 'nookies'
import jwt from 'jsonwebtoken';

const withAuth = (Component) => {

    const AuthenticatedComponent = () => {
        const router = useRouter();

        const cookies = parseCookies()
        const isAuthenticated = !cookies.isAuthenticated ? false : cookies.isAuthenticated
        let user;
        if(isAuthenticated){
            console.log("=>(WithAuth.js:13) isAuthenticated", isAuthenticated);

            try{
                user = jwt.verify(isAuthenticated,'secretKey')
            }catch (error){
                throw new Error('Invalid token: ' + error.message);
            }

        }
        const [ isAuth, setIsAuth ] = useState(false)

        useEffect(() => {

            const getUser = async () => {
                if (!user) {
                    router.push('/login');
                } else {
                    setIsAuth(true)
                }
            };
            getUser();
        }, [isAuthenticated, router]);

        return !!isAuth ? <Component /> : null; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default withAuth