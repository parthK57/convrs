const LoginForm = () => {
    return(<>
        <form action="" autoComplete="off" className="bg-slate-100 p-8 rounded-[25px] shadow-sm flex flex-col w-[350px]">
            <div className="text-3xl text-center mb-8 border-b border-black pb-2">
                Login
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input type="text"  className="px-2 py-1"/>
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" className="px-2 py-1"/>
            </div>
            <div className="flex justify-between items-center">
                <button type="submit" className="btn px-3 py-1 bg-[#0373fc] hover:bg-[#2587ff] text-white rounded-lg">Login</button>
                <p>Forgot password?</p>
            </div>
        </form>
    </>)
}

export default LoginForm;