// Auth for react using server side

// nookies from next cookies
async function getServerSideProps(ctx) {
    // Parse
    const cookies = nookies.get(ctx);
    if (cookies.nameofcookie) {
        return { props: {} };
    }

    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
    // Destroy
    // nookies.destroy(ctx, 'cookieName')
}


const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


function requireAuthentication(gssp) {
    return async (context) => {
        const { req, res } = context;
        const token = req.cookies.userToken;

        if (!token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/admin/login',
                    statusCode: 302
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}
const getServerSideProps = requireAuthentication(context => {
    // Your normal `getServerSideProps` code here
})