function Nav(){
    return(
        <div className="flex flex-row justify-center items-center fixed top-0 w-full z-50">
            <nav className="bg-[#333333]/40 backdrop-blur-md border border-white/10 shadow-lg p-4 w-180 rounded-full m-4 flex justify-between ">
                {/*--- Logo ---------------------*/}
                <h1 className="text-white roboto-uniquifier flex items-center justify-center ">JHalili</h1>
                <ul className="flex gap-9 text-white inter-uniquifier text-sm items-center">
                    <li>About</li>
                    <li>Experience</li>
                    <li>Projects</li>
                    <li>Stacks</li>
                    <li>Certifications</li>
                </ul>

                {/*--- night & light mode -----------------*/}
                <button className="rounded-full hover:bg-[#f0f2f5] p-1 cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-[#f0f2f5] hover:text-[#1a1a1a]">
                    <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clip-rule="evenodd" />
                    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
                    </svg>



                </button>
            </nav>
        </div>
    )
}

export default Nav;