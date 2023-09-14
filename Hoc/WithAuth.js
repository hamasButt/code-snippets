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











// IMPORTANT

const withAuth = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== 'undefined') {
            const Router = useRouter()

            const accessToken = localStorage.getItem('Auth')

            // If there is no access token we redirect to "/" page.
            if (!accessToken) {
                Router.replace('/')
                return null
            }

            // If this is an accessToken we just render the component that was passed with all its props

            return <WrappedComponent {...props} />
        }

        // If we are on server, return null
        return null
    }
}
